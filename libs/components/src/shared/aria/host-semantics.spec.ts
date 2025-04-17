import { customElement, html, observable } from '@microsoft/fast-element';
import { describe } from 'vitest';
import { elementUpdated, fixture } from '@vivid-nx/shared';
import { VividElement } from '../foundation/vivid-element/vivid-element';
import { applyHostSemantics, HostSemantics } from './host-semantics';

describe('HostSemantics', () => {
	@customElement({
		name: 'dummy-element',
		template: html`<template
			${applyHostSemantics({
				ariaDescription: 'default',
				ariaLabel: (x) => x.label,
			})}
		></template>`,
	})
	class DummyElement extends HostSemantics(VividElement) {
		@observable label = '';
	}

	it('should bind specified values to the host element', async () => {
		const element = fixture(`<dummy-element></dummy-element>`) as DummyElement;
		element.label = 'label';

		await elementUpdated(element);

		expect(element.getAttribute('aria-description')).toBe('default');
		expect(element.getAttribute('aria-label')).toBe('label');
	});
});
