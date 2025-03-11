import { describe } from 'vitest';
import {
	FASTElementDefinition,
	html,
	observable,
} from '@microsoft/fast-element';
import { fixture } from '@vivid-nx/shared';
import { VividElement } from '../foundation/vivid-element/vivid-element';
import { renderInLightDOM } from './render-in-light-dom';

describe('renderInLightDom', () => {
	class DummyElement extends VividElement {
		@observable prop = 'Hello';
	}

	it('should render a given template in the light DOM of the element', async () => {
		new FASTElementDefinition(DummyElement, {
			template: html`
				<div id="shadow">${(x) => x.prop}</div>
				${renderInLightDOM(html`<div id="light">${(x) => x.prop}</div>`)}
			`,
			name: `dummy-1`,
		}).define();

		const element = fixture(`<dummy-1></dummy-1>`) as DummyElement;

		expect(Array.from(element.children).map((c) => c.outerHTML)).toEqual([
			'<div id="light">Hello</div>',
		]);
		expect(
			Array.from(element.shadowRoot!.children).map((c) => c.outerHTML)
		).toEqual(['<div id="shadow">Hello</div>']);
	});

	it('should bind template bindings to the host element', async () => {
		new FASTElementDefinition(DummyElement, {
			template: html`${renderInLightDOM(html`
				<div>${(x) => x.prop}</div>
				${html`<div>${(x) => x.prop}</div>`}
			`)}`,
			name: `dummy-2`,
		}).define();

		const element = fixture(`<dummy-2></dummy-2>`) as DummyElement;
		const nodes = element.querySelectorAll('div')!;

		expect(nodes[0].textContent).toBe('Hello');
		expect(nodes[1].textContent).toBe('Hello');
	});
});
