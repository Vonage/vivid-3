/// <reference types="@vitest/browser-playwright" />
import type { Plugin } from 'vitest/config';
import type { BrowserCommand, BrowserCommandContext } from 'vitest/node';

const assertPlaywright = (ctx: BrowserCommandContext) => {
	if (ctx.provider.name !== 'playwright') throw Error('Unsupported provider');
	ctx.page;
};

/** Reset the mouse state / position to avoid interference between tests */
export const resetMouse: BrowserCommand = async (ctx) => {
	assertPlaywright(ctx);

	await ctx.page.mouse.up();
	await ctx.page.mouse.move(0, 0);
};

/** Screenshot a clipped region of the page */
export const screenshotClip: BrowserCommand<
	[{ x: number; y: number; width: number; height: number }]
> = async (ctx, clip) => {
	assertPlaywright(ctx);

	const buffer = await ctx.page.screenshot({ clip });
	return buffer.toString('base64');
};

export const mousedown: BrowserCommand = async (ctx) => {
	assertPlaywright(ctx);

	await ctx.page.mouse.down();
};

export default function BrowserCommands(): Plugin {
	return {
		name: 'vitest:custom-commands',
		config() {
			return {
				test: {
					browser: {
						commands: {
							resetMouse,
							screenshotClip,
							mousedown,
						},
					},
				},
			};
		},
	};
}
