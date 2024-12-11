import { attr } from '@microsoft/fast-element';
import { handleEscapeKeyAndStopPropogation } from '../../shared/dialog';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';

/**
 * @public
 * @component side-drawer
 * @slot - Sets assigned nodes to the side drawer itself.
 * @slot app-content - Sets assigned nodes to the main application content, the side drawer is opened next to.
 * @event {CustomEvent<undefined>} close - Fired when the side drawer is closed.
 * @event {CustomEvent<undefined>} open - Fired when the side drawer is opened.
 * @event {CustomEvent<undefined>} cancel - Fired when the user requests to close the side-drawer. You can prevent the side drawer from closing by calling `.preventDefault()` on the event.
 */
export class SideDrawer extends VividElement {
	/**
	 * applies scheme alternate region
	 *
	 * @public
	 */
	@attr({
		mode: 'boolean',
	})
	alternate = false;

	/**
	 * sets the side drawer's type to modal
	 *
	 * @public
	 */
	@attr({
		mode: 'boolean',
	})
	modal = false;

	/**
	 * indicates whether the side drawer is open
	 *
	 * @public
	 */
	@attr({
		mode: 'boolean',
	})
	open = false;

	/**
	 * sets the side of the side drawer
	 *
	 * @public
	 */
	@attr({
		mode: 'boolean',
	})
	trailing = false;

	override attributeChangedCallback(
		name: string,
		oldValue: string,
		newValue: string
	): void {
		super.attributeChangedCallback(name, oldValue, newValue);
		switch (name) {
			case 'open': {
				this.open ? this.#open() : this.#close();
			}
		}
	}

	#close(): void {
		this.$emit('close', undefined, { bubbles: false });
	}

	#open(): void {
		this.$emit('open', undefined, { bubbles: false });
	}

	/**
	 * @internal
	 */
	_onKeydown(event: KeyboardEvent) {
		if (handleEscapeKeyAndStopPropogation(event)) {
			this._handleCloseRequest();
			return undefined;
		} else {
			return true;
		}
	}

	/**
	 * @internal
	 */
	_handleCloseRequest() {
		if (
			this.$emit('cancel', undefined, {
				bubbles: false,
				cancelable: true,
			})
		) {
			this.open = false;
		}
	}
}
