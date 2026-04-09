import { Updates } from '@microsoft/fast-element';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Flush FAST's pending DOM updates and yield to the event loop so that any
 * rAF-scheduled work can execute.
 */
export async function waitForFrame(): Promise<void> {
	Updates.process();
	await sleep(1);
	Updates.process();
}

// The real requestAnimationFrame, saved before browser-visual-test-setup.ts
// replaces it with a setTimeout(0) shim. Using the real one guarantees we wait
// for an actual vsync / compositor frame rather than just a JS event-loop turn.
const realRAF: (cb: FrameRequestCallback) => number = (globalThis as any)
	.__realRequestAnimationFrame;

/** Wait for one genuine compositor frame (rAF fires *before* the frame's paint). */
export const waitForCompositorFrame = () =>
	new Promise<void>((resolve) => realRAF(() => resolve()));

/** Double-rAF: first one waits for the compositor frame, second one ensures it has been painted */
export const waitForPaintCommitted = async () => {
	await waitForCompositorFrame();
	await waitForCompositorFrame();

	// Apparently, the second rAF does not ensure it has been painted on firefox, so request idle callback to detect that it has been painted
	// Wait for the browser to become idle (compositor finished tiling)
	await new Promise<void>((resolve) => {
		if ('requestIdleCallback' in globalThis) {
			requestIdleCallback(() => resolve(), { timeout: 200 });
		} else {
			// Fallback for environments without requestIdleCallback (WebKit)
			resolve();
		}
	});
};

/**
 * Wait for all <img> elements within a container to be fully decoded.
 * Without this, Firefox may capture white areas that haven't rendered yet.
 */
export async function waitForImagesDecode(
	container: HTMLElement
): Promise<void> {
	const images = container.querySelectorAll('img');
	if (images.length === 0) return;

	await Promise.all(
		Array.from(images).map((img) => img.decode().catch(() => {}))
	);
}
