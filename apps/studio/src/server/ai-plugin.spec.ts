import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { EventEmitter } from 'node:events';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { Connect } from 'vite';
import { vividAiPlugin } from './ai-plugin';

const { streamMock, constructorMock } = vi.hoisted(() => ({
	streamMock: vi.fn(),
	constructorMock: vi.fn(),
}));

vi.mock('@anthropic-ai/sdk', () => {
	class APIError extends Error {
		status?: number;
		error?: unknown;
	}
	class Anthropic {
		static APIError = APIError;
		messages = { stream: streamMock };
		constructor(options: unknown) {
			constructorMock(options);
		}
	}
	return { default: Anthropic };
});

/** Minimal fake of the repo layout the plugin expects around config.root. */
function makeFixtureRoot(envFiles: Record<string, string> = {}): string {
	const base = mkdtempSync(join(tmpdir(), 'studio-ai-plugin-'));
	const root = join(base, 'apps', 'studio');
	mkdirSync(root, { recursive: true });
	mkdirSync(join(base, 'libs', 'components'), { recursive: true });
	writeFileSync(
		join(base, 'libs', 'components', 'metadata.json'),
		JSON.stringify({
			componentDefs: [
				{
					name: 'button',
					description: 'A button component. It does button things.',
					props: [{ attributeName: 'label', name: 'label' }],
					slots: [{ name: 'icon' }],
				},
			],
		})
	);
	for (const [name, content] of Object.entries(envFiles)) {
		writeFileSync(join(root, name), content);
	}
	return root;
}

interface FakeResponse {
	statusCode: number;
	headers: Record<string, string>;
	body: Promise<string>;
}

/** Boot the plugin against a fixture root and return a request runner. */
function createHandler(root: string) {
	const plugin = vividAiPlugin();
	(plugin.configResolved as (config: unknown) => void)({
		root,
		mode: 'development',
	});

	let handler: Connect.NextHandleFunction;
	const server = {
		middlewares: {
			use: (_route: string, fn: Connect.NextHandleFunction) => {
				handler = fn;
			},
		},
	};
	(plugin.configureServer as (server: unknown) => void)(server);

	return function request(method: string, body?: string): FakeResponse {
		const req = new EventEmitter() as Connect.IncomingMessage;
		req.method = method;

		const response: FakeResponse = {
			statusCode: 200,
			headers: {},
			body: undefined as unknown as Promise<string>,
		};
		const res = {
			get statusCode() {
				return response.statusCode;
			},
			set statusCode(code: number) {
				response.statusCode = code;
			},
			setHeader: (name: string, value: string) => {
				response.headers[name] = value;
			},
			end: undefined as unknown as (chunk: string) => void,
		};
		response.body = new Promise<string>((resolve) => {
			res.end = resolve;
		});

		handler(req, res as never, vi.fn());
		if (body !== undefined) {
			req.emit('data', Buffer.from(body));
			req.emit('end');
		}
		return response;
	};
}

function messageWithText(text: string) {
	return {
		finalMessage: async () => ({ content: [{ type: 'text', text }] }),
	};
}

const VALID_PAYLOAD = JSON.stringify({
	messages: [{ role: 'user', content: 'a button' }],
});

describe('vividAiPlugin /api/generate', () => {
	let roots: string[];

	beforeEach(() => {
		roots = [];
		// Delete rather than blank: Vite's loadEnv merges process.env over
		// .env files, so an empty-string stub would mask file values.
		vi.stubEnv('ANTHROPIC_API_KEY', undefined);
		vi.stubEnv('VIVID_STUDIO_AI_MODEL', undefined);
		streamMock.mockReturnValue(messageWithText('<p>generated</p>'));
	});

	afterEach(() => {
		vi.unstubAllEnvs();
		vi.clearAllMocks();
		for (const root of roots) {
			rmSync(join(root, '..', '..'), { recursive: true, force: true });
		}
	});

	function boot(envFiles?: Record<string, string>) {
		const root = makeFixtureRoot(envFiles);
		roots.push(root);
		return createHandler(root);
	}

	it('rejects non-POST requests', async () => {
		const request = boot();
		const response = request('GET');
		expect(response.statusCode).toBe(405);
	});

	it('returns 503 when no API key is configured', async () => {
		const request = boot();
		const response = request('POST', VALID_PAYLOAD);
		expect(response.statusCode).toBe(503);
		expect(JSON.parse(await response.body).error).toContain('.env.local');
	});

	it('reads the API key from .env.local', async () => {
		const request = boot({
			'.env.local': 'ANTHROPIC_API_KEY=sk-from-file\n',
		});
		const response = request('POST', VALID_PAYLOAD);

		expect(JSON.parse(await response.body)).toEqual({
			html: '<p>generated</p>',
		});
		expect(constructorMock).toHaveBeenCalledWith({ apiKey: 'sk-from-file' });
	});

	it('prefers the key from the shell environment over env files', async () => {
		vi.stubEnv('ANTHROPIC_API_KEY', 'sk-from-shell');
		const request = boot({
			'.env.local': 'ANTHROPIC_API_KEY=sk-from-file\n',
		});
		const response = request('POST', VALID_PAYLOAD);

		await response.body;
		expect(constructorMock).toHaveBeenCalledWith({ apiKey: 'sk-from-shell' });
	});

	it('honours a model override from env files', async () => {
		const request = boot({
			'.env': 'ANTHROPIC_API_KEY=sk-x\nVIVID_STUDIO_AI_MODEL=claude-test-1\n',
		});
		await request('POST', VALID_PAYLOAD).body;

		expect(streamMock).toHaveBeenCalledWith(
			expect.objectContaining({ model: 'claude-test-1' })
		);
	});

	it('rejects malformed message payloads', async () => {
		const request = boot({ '.env.local': 'ANTHROPIC_API_KEY=sk-x\n' });
		for (const payload of [
			'{}',
			JSON.stringify({ messages: [] }),
			JSON.stringify({ messages: [{ role: 'system', content: 'x' }] }),
			JSON.stringify({ messages: [{ role: 'user', content: 42 }] }),
		]) {
			const response = request('POST', payload);
			expect(JSON.parse(await response.body).error, payload).toBe(
				'Invalid messages payload'
			);
			expect(response.statusCode, payload).toBe(400);
		}
	});

	it('strips markdown code fences from the generated html', async () => {
		streamMock.mockReturnValue(
			messageWithText('```html\n<vwc-button></vwc-button>\n```')
		);
		const request = boot({ '.env.local': 'ANTHROPIC_API_KEY=sk-x\n' });
		const response = request('POST', VALID_PAYLOAD);

		expect(JSON.parse(await response.body)).toEqual({
			html: '<vwc-button></vwc-button>',
		});
	});

	it('includes the component reference in the system prompt', async () => {
		const request = boot({ '.env.local': 'ANTHROPIC_API_KEY=sk-x\n' });
		await request('POST', VALID_PAYLOAD).body;

		const call = streamMock.mock.calls[0][0] as {
			system: { text: string; cache_control: unknown }[];
		};
		expect(call.system[0].text).toContain('<vwc-button>');
		expect(call.system[0].text).toContain('attributes: label');
		expect(call.system[0].cache_control).toEqual({ type: 'ephemeral' });
	});

	it('maps SDK failures to a 502 with detail', async () => {
		streamMock.mockReturnValue({
			finalMessage: async () => {
				throw new Error('socket hang up');
			},
		});
		const request = boot({ '.env.local': 'ANTHROPIC_API_KEY=sk-x\n' });
		const response = request('POST', VALID_PAYLOAD);

		expect(JSON.parse(await response.body).error).toBe('socket hang up');
		expect(response.statusCode).toBe(502);
	});
});
