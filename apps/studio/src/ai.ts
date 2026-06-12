/**
 * Client for the studio's AI generation endpoint (see src/server/ai-plugin.ts).
 */
export interface ChatTurn {
	role: 'user' | 'assistant';
	content: string;
}

export async function generateUi(messages: ChatTurn[]): Promise<string> {
	const response = await fetch('/api/generate', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ messages }),
	});
	const data = (await response.json()) as { html?: string; error?: string };
	if (!response.ok || data.error || typeof data.html !== 'string') {
		throw new Error(
			data.error ?? `Generation failed (HTTP ${response.status})`
		);
	}
	return data.html;
}
