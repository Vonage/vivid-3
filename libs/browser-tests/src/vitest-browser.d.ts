export {};

declare module 'vitest/browser' {
	interface BrowserCommands {
		resetMouse: () => Promise<void>;
		mousedown: () => Promise<void>;
		screenshotClip: (clip: {
			x: number;
			y: number;
			width: number;
			height: number;
		}) => Promise<string>;
	}
}
