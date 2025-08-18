import { customElement, html, observable } from '@microsoft/fast-element';
import { describe } from 'vitest';
import { elementUpdated, fixture } from '@repo/shared';
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

	it('should remove ARIA attributes from the host element', async () => {
		const element = fixture(
			`<dummy-element aria-current="true"></dummy-element>`
		) as DummyElement;
		element.ariaDisabled = 'true';

		await elementUpdated(element);

		expect(element.ariaCurrent).toBe('true');
		expect(element.hasAttribute('aria-current')).toBe(false);
		expect(element.ariaDisabled).toBe('true');
		expect(element.hasAttribute('aria-disabled')).toBe(false);
	});

	it('should add a data attribute for removed ARIA attributes on the host', async () => {
		const element = fixture(
			`<dummy-element aria-current="true"></dummy-element>`
		) as DummyElement;
		element.ariaDisabled = 'true';

		await elementUpdated(element);

		expect(element.dataset['vvdAriaCurrent']).toBe('true');
		expect(element.dataset['vvdAriaDisabled']).toBe('true');
	});

	it('should remove the data attribute when ARIA property is set to null', async () => {
		const element = fixture(
			`<dummy-element aria-current="true"></dummy-element>`
		) as DummyElement;
		element.ariaCurrent = null;

		await elementUpdated(element);

		expect('vvdAriaCurrent' in element.dataset).toBe(false);
	});
});
