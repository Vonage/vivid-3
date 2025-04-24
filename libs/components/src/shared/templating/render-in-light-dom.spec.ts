import { describe } from 'vitest';
import {
	FASTElementDefinition,
	html,
	observable,
} from '@microsoft/fast-element';
import { elementUpdated, fixture } from '@vivid-nx/shared';
import { VividElement } from '../foundation/vivid-element/vivid-element';
import { renderInLightDOM } from './render-in-light-dom';

describe('renderInLightDom', () => {
	const DummyElement = () => {
		class DummyElement extends VividElement {
			@observable prop = 'Hello';
		}

		return DummyElement;
	};

	it('should render a given template in the light DOM of the element', async () => {
		new FASTElementDefinition(DummyElement(), {
			template: html`
				<div id="shadow">${(x) => x.prop}</div>
				${renderInLightDOM(html`<div id="light">${(x) => x.prop}</div>`)}
			`,
			name: `dummy-1`,
		}).define();

		const element = fixture(`<dummy-1></dummy-1>`);

		expect(Array.from(element.children).map((c) => c.outerHTML)).toEqual([
			'<div id="light">Hello</div>',
		]);
		expect(
			Array.from(element.shadowRoot!.children).map((c) => c.outerHTML)
		).toEqual(['<div id="shadow">Hello</div>']);
	});

	it('should bind template bindings to the host element', async () => {
		new FASTElementDefinition(DummyElement(), {
			template: html`${renderInLightDOM(html`
				<div>${(x) => x.prop}</div>
				${html`<div>${(x) => x.prop}</div>`}
			`)}`,
			name: `dummy-2`,
		}).define();

		const element = fixture(`<dummy-2></dummy-2>`);
		const nodes = element.querySelectorAll('div')!;

		expect(nodes[0].textContent).toBe('Hello');
		expect(nodes[1].textContent).toBe('Hello');
	});

	it('should be able to change templates dynamically with a binding', async () => {
		new FASTElementDefinition(DummyElement(), {
			template: html`${renderInLightDOM((x) =>
				x.prop === 'Hello'
					? html`<div>prop is Hello</div>`
					: html`<div>prop is not Hello</div>`
			)}`,
			name: `dummy-3`,
		}).define();

		const element = fixture(`<dummy-3></dummy-3>`);
		expect(element.textContent!.trim()).toBe('prop is Hello');

		(element as any).prop = 'World';
		await elementUpdated(element);

		expect(element.textContent!.trim()).toBe('prop is not Hello');
	});
});
