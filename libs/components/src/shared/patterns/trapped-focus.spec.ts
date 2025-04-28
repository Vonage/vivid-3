import { customElement, html } from '@microsoft/fast-element';
import { fixture, setupDelegatesFocusPolyfill } from '@vivid-nx/shared';
import { VividElement } from '../foundation/vivid-element/vivid-element';
import { ignoreEventInFocusTraps, TrappedFocus } from './trapped-focus';

describe('TrappedFocus', () => {
	@customElement({
		name: 'test-element',
		template: html`
			<template @keydown="${(x, c) => x.onKeyDown(c.event)}">
				<button id="first"></button>
				<button id="second"></button>
				<button id="third"></button>
			</template>
		`,
	})
	class TestElement extends TrappedFocus(VividElement) {
		onKeyDown(event: KeyboardEvent) {
			if (
				this._trappedFocus(event, () =>
					this.shadowRoot!.querySelectorAll('button')
				)
			) {
				return false;
			}
			return true;
		}
	}

	let element: TestElement;
	let firstButton: HTMLButtonElement;
	let secondButton: HTMLButtonElement;
	let lastButton: HTMLButtonElement;

	beforeEach(async () => {
		element = (await fixture('<test-element></test-element>')) as TestElement;
		firstButton = element.shadowRoot!.querySelector(
			'#first'
		) as HTMLButtonElement;
		secondButton = element.shadowRoot!.querySelector(
			'#second'
		) as HTMLButtonElement;
		lastButton = element.shadowRoot!.querySelector(
			'#third'
		) as HTMLButtonElement;
		setupDelegatesFocusPolyfill(element);
	});

	it('should move focus to first element and prevent default when pressing tab on last element', () => {
		lastButton.focus();
		const event = new KeyboardEvent('keydown', { key: 'Tab' });
		event.preventDefault = vi.fn();

		element.dispatchEvent(event);

		expect(event.preventDefault).toHaveBeenCalled();
		expect(element.shadowRoot!.activeElement).toBe(firstButton);
	});

	it('should move focus to last element and prevent default when pressing shift + tab on first element', () => {
		firstButton.focus();
		const event = new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true });
		event.preventDefault = vi.fn();

		element.dispatchEvent(event);

		expect(event.preventDefault).toHaveBeenCalled();
		expect(element.shadowRoot!.activeElement).toBe(lastButton);
	});

	it('should not move focus or prevent default when pressing tab on another element', () => {
		secondButton.focus();
		const event = new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true });
		event.preventDefault = vi.fn();

		element.dispatchEvent(event);

		expect(event.preventDefault).not.toHaveBeenCalled();
		expect(element.shadowRoot!.activeElement).toBe(secondButton);
	});

	describe('ignoreEventInFocusTraps', () => {
		it('should cause the event to be ignored', () => {
			lastButton.focus();
			const event = new KeyboardEvent('keydown', { key: 'Tab' });
			event.preventDefault = vi.fn();

			ignoreEventInFocusTraps(event);
			element.dispatchEvent(event);

			expect(event.preventDefault).not.toHaveBeenCalled();
			expect(element.shadowRoot!.activeElement).toBe(lastButton);
		});
	});
});
