import { afterEach, describe, expect, it, vi } from 'vitest';
import { generateUi } from './ai';

function mockFetchResponse(status: number, body: unknown): void {
	vi.stubGlobal(
		'fetch',
		vi.fn(async () => ({
			ok: status >= 200 && status < 300,
			status,
			json: async () => body,
		}))
	);
}

describe('generateUi', () => {
	afterEach(() => {
		vi.unstubAllGlobals();
	});

	it('posts the conversation and returns the generated html', async () => {
		mockFetchResponse(200, { html: '<vwc-button></vwc-button>' });
		const messages = [{ role: 'user' as const, content: 'a button' }];

		await expect(generateUi(messages)).resolves.toBe(
			'<vwc-button></vwc-button>'
		);
		expect(fetch).toHaveBeenCalledWith('/api/generate', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ messages }),
		});
	});

	it('throws the server-provided error message', async () => {
		mockFetchResponse(503, { error: 'No Anthropic API key found.' });
		await expect(generateUi([])).rejects.toThrow(
			'No Anthropic API key found.'
		);
	});

	it('throws a generic message when the response has no error detail', async () => {
		mockFetchResponse(500, {});
		await expect(generateUi([])).rejects.toThrow(
			'Generation failed (HTTP 500)'
		);
	});

	it('rejects a 200 response without an html payload', async () => {
		mockFetchResponse(200, { unexpected: true });
		await expect(generateUi([])).rejects.toThrow('Generation failed');
	});
});
