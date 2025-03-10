import { customElement } from '@microsoft/fast-element';
import { describe } from 'vitest';
import { elementUpdated } from '@vivid-nx/shared';
import { VividElement } from '../foundation/vivid-element/vivid-element';
import { ariaAttributeName, DelegatesAria } from './delegates-aria';

describe('ariaAttributeName', () => {
	it('should return the aria attribute name of the given aria property', () => {
		expect(ariaAttributeName('ariaLabel')).toBe('aria-label');
		expect(ariaAttributeName('ariaAutoComplete')).toBe('aria-autocomplete');
	});
});

describe('DelegatesAria', () => {
	@customElement('dummy-element')
	class DummyElement extends DelegatesAria(VividElement) {
		constructor() {
			super();
		}
	}

	it('should initialize delegated properties to null', () => {
		const element = document.createElement('dummy-element');
		expect(element).toBeInstanceOf(DummyElement);
		expect(element.getAttribute('aria-label')).toBeNull();
		expect(element.ariaLabel).toBeNull();
	});

	it('should set the corresponding attribute when a delegated property is set', async () => {
		const element = document.createElement('dummy-element');

		element.ariaLabel = 'label';
		await elementUpdated(element);

		expect(element.getAttribute('aria-label')).toBe('label');
	});

	it('should set the corresponding property when a delegated attribute is set', async () => {
		const element = document.createElement('dummy-element');

		element.setAttribute('aria-label', 'label');
		await elementUpdated(element);

		expect(element.ariaLabel).toBe('label');
	});
});
