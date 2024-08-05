import { applyMixins, FoundationElement } from '@microsoft/fast-foundation';
import { attr, observable } from '@microsoft/fast-element';
import { Localized } from '../../shared/patterns';

// eslint-disable-next-line compat/compat
export const isDialogSupported = Boolean(
	window.HTMLDialogElement && window.HTMLDialogElement.prototype.showModal
);

// Make sure we support Safari 14
let dialogPolyfill: any;
(async () => {
	if (!isDialogSupported) {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		delete window.HTMLDialogElement;
		dialogPolyfill = await import('dialog-polyfill');
	}
})();

/**
 * Types of icon placement
 *
 * @public
 */
export type IconPlacement = 'top' | 'side';

/**
 * @public
 * @component dialog
 * @slot graphic - Use the graphic slot in order to replace the icon.
 * @slot body - Use the body slot in order to add custom HTML to the dialog.
 * @slot footer - Use the footer slot in order to add action buttons to the bottom of the dialog.
 * @slot main - Assign nodes to the main slot to fully override a dialog’s predefined flow and style with your own.
 * @slot action-items - Use the action-items slot in order to add action buttons to the bottom of the dialog.
 * @event {CustomEvent<undefined>} open - The `open` event fires when the dialog opens.
 * @event {CustomEvent<string>} close - The `close` event fires when the dialog closes (either via user interaction or via the API). It returns the return value inside the event's details property.
 * @event {CustomEvent<undefined>} cancel - The `cancel` event fires when the user requests to close the dialog. You can prevent the dialog from closing by calling `.preventDefault()` on the event.
 * @vueModel open open open,close `(event.target as any).open`
 */
export class Dialog extends FoundationElement {
	/**
	 * Indicates dialog's state
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: open
	 */
	@attr({ mode: 'boolean' }) open = false;
	@attr icon?: string;
	@attr({ attribute: 'icon-placement' }) iconPlacement?: IconPlacement;
	@attr subtitle?: string;
	@attr headline?: string;
	@attr({ attribute: 'full-width-body', mode: 'boolean' }) fullWidthBody =
		false;
	@attr({ attribute: 'aria-label' }) override ariaLabel: string | null = null;
	@attr({ attribute: 'dismiss-button-aria-label' }) dismissButtonAriaLabel:
		| string
		| null = null;
	@attr({ attribute: 'no-light-dismiss', mode: 'boolean' }) noLightDismiss =
		false;

	/**
	 * Controls whether the dialog is modal.
	 * @remarks
	 * HTML Attribute: modal
	 */
	@attr({ mode: 'boolean' }) modal = false;

	/**
	 * @internal
	 */
	modalChanged(_: boolean, newValue: boolean) {
		if (this.open) {
			this._openedAsModal = newValue;

			if (this.$fastController.isConnected) {
				// Transition open dialog to new modal state
				this.#closeDialog();
				this.#showDialog();
			}
		}
	}

	set returnValue(value) {
		if (this.#dialog) {
			this.#dialog.returnValue = value;
		}
	}

	get returnValue(): string {
		return this.#dialog?.returnValue;
	}

	#dialogElement?: HTMLDialogElement;

	get #dialog() {
		if (!this.#dialogElement) {
			this.#dialogElement = this.shadowRoot!.querySelector(
				'dialog'
			) as HTMLDialogElement;
			if (this.#dialogElement) {
				if (dialogPolyfill) {
					dialogPolyfill.registerDialog(this.#dialogElement);
				}
			}
		}
		return this.#dialogElement as HTMLDialogElement;
	}

	/**
	 * @internal
	 */
	@observable _openedAsModal = false;

	/**
	 * @internal
	 */
	openChanged(oldValue: boolean, newValue: boolean) {
		if (oldValue === undefined) {
			return;
		}
		if (!newValue) {
			this._openedAsModal = false;
			if (this.$fastController.isConnected) {
				this.#closeDialog();
			}
			this.$emit('close', this.returnValue, { bubbles: false });
		} else {
			this._openedAsModal = this._openedAsModal || this.modal;
			if (this.$fastController.isConnected) {
				this.#showDialog();
			}
			this.$emit('open', undefined, { bubbles: false });
		}
	}

	#handleScrimClick = (event: MouseEvent) => {
		if (event.target !== this.#dialog || this.noLightDismiss) {
			return;
		}
		const rect = this.#dialog.getBoundingClientRect();

		const clickedInDialog =
			rect.top <= event.clientY &&
			event.clientY <= rect.top + rect.height &&
			rect.left <= event.clientX &&
			event.clientX <= rect.left + rect.width;

		if (!clickedInDialog) {
			this._handleCloseRequest();
		}
	};

	#handleInternalFormSubmit = (event: SubmitEvent) => {
		if ((event.target as HTMLFormElement).method !== 'dialog') {
			return;
		}

		this.open = false;
	};

	/**
	 * @internal
	 */
	_onKeyDown(event: KeyboardEvent) {
		if ((event as KeyboardEvent).key === 'Escape' && this._openedAsModal) {
			this._handleCloseRequest();

			// Return false to .preventDefault() which will prevent the <dialog>'s cancel event from being fired.
			// Otherwise, pressing ESC twice would close the <dialog> without the ability to prevent it.
			// This is because subsequent close requests without "intervening user action" between them are not cancelable.
			// See: https://html.spec.whatwg.org/multipage/interaction.html#close-watcher-infrastructure
			return false;
		}
		return true;
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

	close() {
		this.open = false;
	}

	show() {
		if (this._openedAsModal && !this.modal) {
			throw new DOMException(
				"Failed to execute 'show' on 'Dialog': The dialog is already open as a modal dialog, and therefore cannot be opened as a non-modal dialog.",
				'InvalidStateError'
			);
		}
		this.open = true;
	}

	showModal() {
		if (this.open && !this._openedAsModal) {
			throw new DOMException(
				"Failed to execute 'showModal' on 'Dialog': The dialog is already open as a non-modal dialog, and therefore cannot be opened as a modal dialog.",
				'InvalidStateError'
			);
		}
		this._openedAsModal = true;
		this.open = true;
	}

	#closeDialog() {
		this.#dialog.close();
	}

	#showDialog() {
		if (this._openedAsModal) {
			this.#dialog.showModal();
		} else {
			this.#dialog.show();
		}
	}

	override connectedCallback() {
		super.connectedCallback();
		if (this.open) {
			this.#showDialog();
		}
		this.#dialog.addEventListener('mousedown', this.#handleScrimClick);
		this.#dialog.addEventListener('submit', this.#handleInternalFormSubmit);
	}

	override disconnectedCallback() {
		super.disconnectedCallback();
		if (this.open) {
			this.#closeDialog();
		}
		this.#dialog.removeEventListener('mousedown', this.#handleScrimClick);
		this.#dialog.removeEventListener('submit', this.#handleInternalFormSubmit);
	}

	/**
	 * @internal
	 */
	@observable bodySlottedContent?: HTMLElement[];
	/**
	 * @internal
	 */
	@observable footerSlottedContent?: HTMLElement[];
	/**
	 * @internal
	 */
	@observable actionItemsSlottedContent?: HTMLElement[];
}

export interface Dialog extends Localized {}
applyMixins(Dialog, Localized);
