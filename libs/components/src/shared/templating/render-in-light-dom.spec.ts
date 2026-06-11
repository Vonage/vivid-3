import { describe } from 'vitest';
import {
	FASTElementDefinition,
	html,
	observable,
} from '@microsoft/fast-element';
import { elementUpdated, fixture } from '@repo/shared/test-utils/fixture';
import { VividElement } from '../foundation/vivid-element/vivid-element';
import { renderInLightDOM } from './render-in-light-dom';

const reconnect = async (element: Element) => {
	const parent = element.parentElement!;
	element.remove();
	parent.appendChild(element);
	await elementUpdated(element);
};

describe('renderInLightDom', () => {
	const DummyElement = () => {
		class DummyElement extends VividElement {
			@observable prop = 'Hello';
		}

		return DummyElement;
	};

	it('should render a given template in the light DOM of the element', async () => {
		FASTElementDefinition.compose(DummyElement(), {
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
		FASTElementDefinition.compose(DummyElement(), {
			template: html`${renderInLightDOM(html`
				<div>${(x) => x.prop}</div>
				${html`<div>${(x) => x.prop}</div>`}
			`)}`,
			name: `dummy-2`,
		}).define();

		const element = fixture(`<dummy-2></dummy-2>`);
		const nodes = element.querySelectorAll('div');

		expect(nodes[0].textContent).toBe('Hello');
		expect(nodes[1].textContent).toBe('Hello');
	});

	it('should not duplicate light DOM nodes on reconnect', async () => {
		FASTElementDefinition.compose(DummyElement(), {
			template: html`${renderInLightDOM(html`<div id="light"></div>`)}`,
			name: `dummy-4`,
		}).define();

		const element = fixture(`<dummy-4></dummy-4>`);
		expect(element.querySelectorAll('#light')).toHaveLength(1);

		await reconnect(element);

		expect(element.querySelectorAll('#light')).toHaveLength(1);
	});

	it('should keep light DOM content correct after reconnect', async () => {
		FASTElementDefinition.compose(DummyElement(), {
			template: html`${renderInLightDOM(
				html`<div id="light">${(x) => x.prop}</div>`
			)}`,
			name: `dummy-6`,
		}).define();
		const element = fixture(`<dummy-6></dummy-6>`);

		await reconnect(element);
		(element as any).prop = 'Updated';
		await elementUpdated(element);

		expect(element.querySelectorAll('#light')).toHaveLength(1);
		expect(element.querySelector('#light')!.textContent).toBe('Updated');
	});

	it('should recover after light DOM nodes are externally removed before disconnect', async () => {
		FASTElementDefinition.compose(DummyElement(), {
			template: html`${renderInLightDOM(html`<div id="light"></div>`)}`,
			name: `dummy-7`,
		}).define();

		const element = fixture(`<dummy-7></dummy-7>`);
		expect(element.querySelectorAll('#light')).toHaveLength(1);

		// Simulate external removal of light DOM content before the element is disconnected
		while (element.firstChild) {
			element.removeChild(element.firstChild);
		}

		await reconnect(element);

		expect(element.querySelectorAll('#light')).toHaveLength(1);
	});
});
