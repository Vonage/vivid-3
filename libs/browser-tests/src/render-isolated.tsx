/// <reference path="./vitest-browser" />
import type { VChild, VNode } from '@repo/vvd-jsx/jsx-runtime';
import { getWrapper, renderContent, resetPage } from './page';
import { commands, page, userEvent } from 'vitest/browser';
import { boundingRect } from './bounding-rect';
import { waitForCompositorFrame, waitForFrame } from './render';
import { deepQuerySelectorAll } from '@repo/shared/test-utils/shadow-roots';

export interface SampleControls {
	tabIn(times?: number): Promise<void>;
	hover(): Promise<void>;
	hoverDeepSelector(selector: string): Promise<void>;
	mousedown(): Promise<void>;
	click(): Promise<void>;
	clickDeepSelector(selector: string): Promise<void>;
}

export async function renderIsolated(
	content: VChild,
	{
		setup,
		center,
	}: {
		setup?: (controls: SampleControls) => Promise<void>;
		center?: boolean;
	}
): Promise<VNode> {
	await resetPage();
	const wrapper = getWrapper();

	if (center) {
		wrapper.className = 'center';
	}

	await renderContent(
		<>
			<button id="focus-anchor" />
			<div id="isolated-render-target">{content}</div>
		</>
	);

	const focusAnchor = document.getElementById('focus-anchor')!;
	const target = document.getElementById('isolated-render-target')!;

	if (setup) {
		const controls: SampleControls = {
			tabIn: async (times = 1) => {
				focusAnchor.focus();
				for (let i = 0; i < times; i++) {
					await userEvent.tab();
				}
				// Tabbing may cause text-selection on focus
				// In webkit, the highlight is painted on the next compositor frame, so we need to waste 16ms waiting for it to
				// ensure a stable screenshot. This could be much more optimized though
				await waitForCompositorFrame();
			},
			hover: async () => {
				await page
					.elementLocator(target)
					.hover({ force: true, noWaitAfter: true });
			},
			mousedown: async () => {
				await page.elementLocator(target).hover({ force: true });
				await commands.mousedown();
			},
			click: async () => {
				await page
					.elementLocator(target)
					.click({ force: true, noWaitAfter: true });
			},
			hoverDeepSelector: async (selector: string) => {
				const els = deepQuerySelectorAll<HTMLElement>(target, selector);
				if (els.length === 0) {
					throw new Error(
						`hoverDeepSelector: no element found for selector "${selector}"`
					);
				}
				await page
					.elementLocator(els[0])
					.hover({ force: true, noWaitAfter: true });
			},
			clickDeepSelector: async (selector: string) => {
				const els = deepQuerySelectorAll<HTMLElement>(target, selector);
				if (els.length === 0) {
					throw new Error(
						`clickDeepSelector: no element found for selector "${selector}"`
					);
				}
				await page
					.elementLocator(els[0])
					.click({ force: true, noWaitAfter: true });
			},
		};

		await setup(controls);

		await waitForFrame();
	}

	// Compute bounds including floating content
	const bounds = await boundingRect(target);

	// Use Playwright's page.screenshot with clip to capture the exact
	// region, including any floating content outside the wrapper.
	const base64 = await commands.screenshotClip(bounds);

	// Verify bounds stability: recompute after screenshot and compare.
	// If the bounds differ, it means an element (e.g. a popup) moved between
	// measurement and screenshot, which would produce an unstable clip region.
	const boundsAfter = await boundingRect(target);
	if (
		bounds.x !== boundsAfter.x ||
		bounds.y !== boundsAfter.y ||
		bounds.width !== boundsAfter.width ||
		bounds.height !== boundsAfter.height
	) {
		console.error(
			`Unstable dimensions: bounds changed between measurement and screenshot. Before: ${JSON.stringify(bounds)} After: ${JSON.stringify(boundsAfter)}`
		);

		// Take a second screenshot at the new (post-render) bounds so both
		// states are visible as diagnostic images in the results table.
		const base64After = await commands.screenshotClip(boundsAfter);

		const imgStyle = 'display: block; outline: 2px solid red;';
		return (
			<div style="font-family: monospace; color: red; padding: 4px; background: #fff0f0;">
				<strong>⚠ Bounds changed between measurement and screenshot</strong>
				<div style="display: flex; gap: 8px; margin-top: 6px;">
					<div>
						<div>Before (screenshot)</div>
						<img style={imgStyle} src={`data:image/png;base64,${base64}`} />
					</div>
					<div>
						<div>After (re-measured)</div>
						<img
							style={imgStyle}
							src={`data:image/png;base64,${base64After}`}
						/>
					</div>
				</div>
			</div>
		);
	}

	return (
		<img
			style="display: inline-block;"
			src={`data:image/png;base64,${base64}`}
		/>
	);
}
