import { customElement, html, observable } from '@microsoft/fast-element';
import { describe } from 'vitest';
import { elementUpdated, fixture } from '@vivid-nx/shared';
import { VividElement } from '../foundation/vivid-element/vivid-element';
import { delegateAria, DelegatesAria } from './delegates-aria';

describe('DelegatesAria', () => {
	@customElement({
		name: 'dummy-element',
		template: html`<div
			${delegateAria({
				ariaDescription: 'default',
				ariaLabel: (x) => x.label,
			})}
		></div>`,
	})
	class DummyElement extends DelegatesAria(VividElement) {
		@observable label = '';
	}

	const getDelegateTarget = (element: DummyElement) =>
		element.shadowRoot!.querySelector('div')!;

	it('should bind specified values to the target element', async () => {
		const element = fixture(`<dummy-element></dummy-element>`) as DummyElement;
		element.label = 'label';

		await elementUpdated(element);

		expect(getDelegateTarget(element).getAttribute('aria-description')).toBe(
			'default'
		);
		expect(getDelegateTarget(element).getAttribute('aria-label')).toBe('label');
	});

	it('should not override bound values', async () => {
		const element = fixture(`<dummy-element></dummy-element>`) as DummyElement;
		element.label = 'label';
		element.ariaDescription = 'overridden';
		element.ariaLabel = 'overridden';

		await elementUpdated(element);

		expect(getDelegateTarget(element).getAttribute('aria-description')).toBe(
			'default'
		);
		expect(getDelegateTarget(element).getAttribute('aria-label')).toBe('label');
	});

	it('should forward all other ARIA attributes to the target element', async () => {
		const element = fixture(`<dummy-element></dummy-element>`) as DummyElement;
		element.ariaCurrent = 'true';

		await elementUpdated(element);

		expect(getDelegateTarget(element).getAttribute('aria-current')).toBe(
			'true'
		);
	});
});
