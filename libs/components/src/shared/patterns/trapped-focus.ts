import { VividElement } from '../foundation/vivid-element/vivid-element';
import type { Constructor } from '../utils/mixins';

const ignoredEvents = new WeakSet<Event>();

export const ignoreEventInFocusTraps = (event: Event) => {
	ignoredEvents.add(event);
};

/**
 * Mixin for elements that trap focus.
 */
export const TrappedFocus = <T extends Constructor<VividElement>>(Base: T) => {
	class TrappedFocusElement extends Base {
		/**
		 * @returns Whether focus was trapped.
		 * @internal
		 */
		_trappedFocus(
			event: KeyboardEvent,
			getFocusableEls: () => NodeListOf<HTMLElement>
		) {
			if (!ignoredEvents.has(event) && event.key === 'Tab') {
				const focusableEls = getFocusableEls();
				const firstFocusableEl = focusableEls[0];
				const lastFocusableEl = focusableEls[focusableEls.length - 1];

				if (event.shiftKey) {
					// Shift + tab
					if (this.shadowRoot!.activeElement === firstFocusableEl) {
						lastFocusableEl.focus();
						return true;
					}
				} else {
					// Tab
					if (this.shadowRoot!.activeElement === lastFocusableEl) {
						firstFocusableEl.focus();
						return true;
					}
				}
			}

			return false;
		}
	}

	return TrappedFocusElement;
};
