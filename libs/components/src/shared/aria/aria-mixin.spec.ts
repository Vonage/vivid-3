import { customElement, html } from '@microsoft/fast-element';
import { elementUpdated, fixture } from '@vivid-nx/shared';
import { VividElement } from '../foundation/vivid-element/vivid-element';
import { ariaAttributeName } from './aria-mixin';

describe('ariaAttributeName', () => {
	it('should return the aria attribute name of the given aria property', () => {
		expect(ariaAttributeName('ariaLabel')).toBe('aria-label');
		expect(ariaAttributeName('ariaAutoComplete')).toBe('aria-autocomplete');
	});
});

describe('AriaMixin', () => {
	@customElement({
		name: 'dummy-element',
		template: html`<div></div>`,
	})
	class DummyElement extends VividElement {
		override ariaDescription = 'description';
	}

	it('should initialize ARIA mixin properties to null unless they are already set', () => {
		const element = fixture(
			`<dummy-element aria-current="true"></dummy-element>`
		) as DummyElement;
		expect(element).toBeInstanceOf(DummyElement);
		expect(element.ariaLabel).toBeNull();
		expect(element.ariaDescription).toBe('description');
		expect(element.ariaCurrent).toBe('true');
	});

	it('should set the corresponding attribute when a delegated property is set', async () => {
		const element = fixture(`<dummy-element></dummy-element>`) as DummyElement;

		element.ariaLabel = 'label';
		await elementUpdated(element);

		expect(element.getAttribute('aria-label')).toBe('label');
	});

	it('should set the corresponding property when a delegated attribute is set', async () => {
		const element = fixture(`<dummy-element></dummy-element>`) as DummyElement;

		element.setAttribute('aria-label', 'label');
		await elementUpdated(element);

		expect(element.ariaLabel).toBe('label');
	});
});
