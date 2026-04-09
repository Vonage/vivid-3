import { commands } from 'vitest/browser';
import type { VNode } from '@repo/vvd-jsx/jsx-runtime';
import { waitForFrame } from './render';
import {
	renderToHtmlWithBindings,
	applyBindings,
} from '@repo/vvd-jsx/render-html';

export const testViewport = { width: 1000, height: 1000 };

export function getWrapper(): HTMLElement {
	return document.body.firstElementChild! as HTMLElement;
}

export function getIframe(): HTMLElement {
	return window.frameElement as HTMLIFrameElement;
}

export async function resetPage() {
	const wrapper = getWrapper();
	wrapper.innerHTML = '';
	wrapper.removeAttribute('class');

	await commands.resetMouse();
}

export async function renderContent(content: VNode): Promise<void> {
	const wrapper = getWrapper();
	const { html, bindings } = renderToHtmlWithBindings(content);
	wrapper.innerHTML = html;
	if (bindings.size > 0) {
		applyBindings(wrapper, bindings);
	}
	await waitForFrame();

	// Rendering the content may have caused fonts to start loading
	await document.fonts.ready;
}
