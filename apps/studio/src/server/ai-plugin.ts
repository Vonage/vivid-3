/**
 * Vite dev-server plugin exposing POST /api/generate — a thin proxy to the
 * Claude API. Runs in Node so the ANTHROPIC_API_KEY never reaches the browser.
 *
 * The key is read from the environment or from Vite env files (.env,
 * .env.local) in this app's directory, so each developer can drop their key
 * into apps/studio/.env.local once instead of passing it on every command.
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import Anthropic from '@anthropic-ai/sdk';
import { loadEnv, type Connect, type Plugin } from 'vite';

const DEFAULT_MODEL = 'claude-opus-4-8';
const MAX_TOKENS = 32000;
const MAX_TURNS = 24;

export interface ChatTurn {
	role: 'user' | 'assistant';
	content: string;
}

/** Icon names verified against the Vivid icon catalog. */
const KNOWN_GOOD_ICONS = [
	'home-line',
	'home-solid',
	'user-line',
	'user-solid',
	'group-line',
	'gear-line',
	'search-line',
	'edit-line',
	'delete-line',
	'plus-line',
	'check-circle-solid',
	'info-solid',
	'inbox-line',
	'chart-line',
	'calendar-line',
	'envelope-line',
	'lock-line',
	'eye-line',
	'heart-solid',
	'star-line',
	'flag-line',
	'message-sent-line',
	'notification-on-line',
	'rocket-solid',
	'sparkles-line',
	'download-line',
	'upload-line',
	'copy-2-line',
	'help-line',
	'pin-line',
	'table-line',
	'apps-line',
	'flash-line',
	'megaphone-line',
	'play-line',
	'video-line',
	'mobile-line',
	'laptop-line',
	'chat-solid',
	'save-line',
	'export-line',
	'code-line',
];

interface MetadataComponentDef {
	name: string;
	description?: string;
	props: { attributeName?: string }[];
	slots: { name: string }[];
}

function buildComponentReference(metadataPath: string): string {
	const metadata = JSON.parse(readFileSync(metadataPath, 'utf-8')) as {
		componentDefs: MetadataComponentDef[];
	};
	return metadata.componentDefs
		.map((def) => {
			const attrs = def.props
				.map((p) => p.attributeName)
				.filter(Boolean)
				.join(', ');
			const slots = def.slots.map((s) => s.name).join(', ');
			const description = (def.description ?? '')
				.replace(/\s+/g, ' ')
				.split('. ')[0]
				.slice(0, 120);
			return [
				`<vwc-${def.name}>`,
				description && `  ${description}`,
				attrs && `  attributes: ${attrs}`,
				slots && `  slots: ${slots}`,
			]
				.filter(Boolean)
				.join('\n');
		})
		.join('\n');
}

function buildSystemPrompt(metadataPath: string): string {
	return `You are Vivid Studio's UI generator — an expert product designer and front-end engineer who builds polished, production-quality UI prototypes using the Vonage Vivid design system (web components, tag prefix "vwc-").

# Output contract
- Respond with ONLY an HTML fragment. No markdown code fences, no explanations, no <!DOCTYPE>, <html>, <head> or <body> tags.
- The fragment is rendered inside a page that already loads all Vivid components and design tokens.
- On follow-up requests, return the FULL updated HTML fragment (not a diff).

# Authoring rules
- Build the UI from Vivid components wherever one exists; use plain HTML elements only for layout scaffolding and text.
- Use inline styles or a single <style> block for layout. Prefer flexbox/grid with gaps.
- Use Vivid design tokens for any colors: var(--vvd-color-canvas), var(--vvd-color-canvas-text), var(--vvd-color-neutral-{50..950}), var(--vvd-color-cta-{50..900}), var(--vvd-color-success-600), var(--vvd-color-alert-600), var(--vvd-color-announcement-600). Never hardcode brand colors.
- You may add a <script> tag for simple interactivity (the preview executes scripts).
- Common attribute patterns: buttons use label/appearance(filled|outlined|ghost)/connotation(accent|cta|alert|success)/icon; form fields use label/placeholder/helper-text; cards use headline/subtitle + "graphic"/"main" slots; vwc-option uses value/text.
- Icons: <vwc-icon name="..."> or icon="..." attributes. Stick to these verified icon names: ${KNOWN_GOOD_ICONS.join(', ')}. Variants: -line (outlined) and -solid (filled).
- For page layouts use <vwc-layout gutters="medium" column-basis="medium|small|block"> or CSS grid.
- Forms: group fields in a flex column with 16px gap; constrain forms to a sensible max-inline-size (~480-560px).
- Make it feel real: plausible copy, sensible empty/filled states, realistic data — never lorem ipsum.

# Component reference (generated from the design system source)
${buildComponentReference(metadataPath)}`;
}

function readBody(req: Connect.IncomingMessage): Promise<string> {
	return new Promise((resolvePromise, reject) => {
		let body = '';
		req.on('data', (chunk: Buffer) => (body += chunk.toString()));
		req.on('end', () => resolvePromise(body));
		req.on('error', reject);
	});
}

function stripCodeFences(text: string): string {
	const trimmed = text.trim();
	const match = trimmed.match(/^```(?:html)?\n([\s\S]*?)\n```$/);
	return match ? match[1] : trimmed;
}

export function vividAiPlugin(): Plugin {
	let systemPrompt: string | undefined;
	let metadataPath: string;
	let apiKey: string | undefined;
	let model: string = DEFAULT_MODEL;

	return {
		name: 'vivid-studio-ai',
		configResolved(config) {
			metadataPath = resolve(
				config.root,
				'../../libs/components/metadata.json'
			);
			// Shell environment wins; .env / .env.local in this app's
			// directory is the fallback. These stay server-side only.
			const fileEnv = loadEnv(config.mode, config.root, [
				'ANTHROPIC_',
				'VIVID_STUDIO_',
			]);
			apiKey = process.env.ANTHROPIC_API_KEY || fileEnv.ANTHROPIC_API_KEY;
			model =
				process.env.VIVID_STUDIO_AI_MODEL ||
				fileEnv.VIVID_STUDIO_AI_MODEL ||
				DEFAULT_MODEL;
		},
		configureServer(server) {
			server.middlewares.use('/api/generate', (req, res) => {
				void (async () => {
					if (req.method !== 'POST') {
						res.statusCode = 405;
						res.end(JSON.stringify({ error: 'Method not allowed' }));
						return;
					}
					res.setHeader('Content-Type', 'application/json');

					if (!apiKey) {
						res.statusCode = 503;
						res.end(
							JSON.stringify({
								error:
									'No Anthropic API key found. Put ANTHROPIC_API_KEY=sk-… in apps/studio/.env.local (see .env.example), or set it in your environment.',
							})
						);
						return;
					}

					try {
						const { messages } = JSON.parse(await readBody(req)) as {
							messages: ChatTurn[];
						};
						if (
							!Array.isArray(messages) ||
							messages.length === 0 ||
							!messages.every(
								(m) =>
									(m.role === 'user' || m.role === 'assistant') &&
									typeof m.content === 'string'
							)
						) {
							res.statusCode = 400;
							res.end(JSON.stringify({ error: 'Invalid messages payload' }));
							return;
						}

						systemPrompt ??= buildSystemPrompt(metadataPath);

						const client = new Anthropic({ apiKey });
						const stream = client.messages.stream({
							model,
							max_tokens: MAX_TOKENS,
							thinking: { type: 'adaptive' },
							system: [
								{
									type: 'text',
									text: systemPrompt,
									// The system prompt (~85-component reference) is stable —
									// cache it across refinement turns.
									cache_control: { type: 'ephemeral' },
								},
							],
							messages: messages.slice(-MAX_TURNS),
						});
						const message = await stream.finalMessage();

						const text = message.content
							.filter((block) => block.type === 'text')
							.map((block) => block.text)
							.join('');
						res.end(JSON.stringify({ html: stripCodeFences(text) }));
					} catch (error) {
						let detail: string;
						if (error instanceof Anthropic.APIError) {
							const body = error.error as
								| { error?: { message?: string } }
								| undefined;
							detail = `Claude API error ${error.status}: ${
								body?.error?.message ?? error.message
							}`;
						} else {
							detail = error instanceof Error ? error.message : 'Unknown error';
						}
						res.statusCode = 502;
						res.end(JSON.stringify({ error: detail }));
					}
				})();
			});
		},
	};
}
