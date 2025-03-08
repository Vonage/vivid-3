export class TrappedFocus {
	private static ignoredEvents = new WeakSet<Event>();

	static ignoreEvent(event: Event) {
		this.ignoredEvents.add(event);
	}

	/**
	 * @returns Whether focus was trapped.
	 * @internal
	 */
	_trappedFocus(
		event: KeyboardEvent,
		getFocusableEls: () => NodeListOf<HTMLElement>
	) {
		if (!TrappedFocus.ignoredEvents.has(event) && event.key === 'Tab') {
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
export interface TrappedFocus extends HTMLElement {}
