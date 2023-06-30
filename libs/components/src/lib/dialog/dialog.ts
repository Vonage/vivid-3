import { FoundationElement } from '@microsoft/fast-foundation';
import {attr, observable} from '@microsoft/fast-element';

// Make sure we support Safari 14
let dialogPolyfill: any;
(async () => {
	if (!HTMLDialogElement || !HTMLDialogElement.prototype.showModal) {
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
 * Base class for dialog
 *
 * @public
 * @slot graphic - Use the graphic slot in order to replace the icon.
 * @slot body - Use the body slot in order to add custom HTML to the dialog.
 * @slot footer - Use the footer slot in order to add action buttons to the bottom of the dialog.
 * @slot secondary-action - Use the secondary-action slot in order to add a secondary action buttons to the bottom of the dialog.
 * @slot primary-action - Use the primary-action slot in order to add a primary action buttons to the bottom of the dialog.
 * @slot main - Assign nodes to the main slot to fully override a dialog’s predefined flow and style with your own.
 * @event close - Fired when the dialog is closed
 */
export class Dialog extends FoundationElement {
	/**
	 * Indicates dialog's state
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: open
	 */
	@attr({mode: 'boolean'}) open = false;
	@attr icon?: string;
	@attr({attribute: 'icon-placement'}) iconPlacement?: IconPlacement;
	@attr subtitle?: string;
	@attr headline?: string;
	@attr ({attribute: 'full-width-body', mode: 'boolean'}) fullWidthBody = false;
	@attr({attribute: 'aria-labelledby'}) ariaLabelledBy: string | null = null;
	@attr({attribute: 'aria-label'}) override ariaLabel: string | null = null;
	@attr({attribute: 'aria-describedby'}) ariaDescribedBy: string | null = null;

	#modal = false;

	set returnValue(value) {
		this.#dialog.returnValue = value;
	}

	get returnValue(): string {
		return this.#dialog?.returnValue;
	}

	get modal() {
		return this.#modal;
	}

	#dialogElement?: HTMLDialogElement;

	get #dialog() {
		if (!this.#dialogElement) {
			this.#dialogElement = this.shadowRoot!.querySelector('dialog') as HTMLDialogElement;
			if (this.#dialogElement) {
				this.#dialogElement.open = this.open;
				if (dialogPolyfill) {
					dialogPolyfill.registerDialog(this.#dialogElement);
				}
			}
		}
		return this.#dialogElement as HTMLDialogElement;
	}

	openChanged(oldValue: boolean, newValue: boolean) {
		if (oldValue === undefined) {
			return;
		}
		if (!newValue) {
			this.close();
		} else {
			if (this.#dialog) {
				this.#dialog.open = true;
			}
		}
	}

	#handleScrimClick = (event: MouseEvent) => {
		if (event.target !== this.#dialog) {
			return;
		}
		const rect = this.#dialog.getBoundingClientRect();

		const clickedInDialog = (
			rect.top <= event.clientY &&
			event.clientY <= rect.top + rect.height &&
			rect.left <= event.clientX &&
			event.clientX <= rect.left + rect.width
		);

		this.open = clickedInDialog;
	};

	#handleInternalFormSubmit = (event: SubmitEvent) => {
		if ((event.target as HTMLFormElement).method !== 'dialog') {
			return;
		}

		this.open = false;
	};

	close() {
		if (this.#dialog.open) {
			this.#dialog.close();
			this.$emit('close', this.returnValue, { bubbles: false });
		}

		this.open = false;
		this.#handleModal(false);
	}

	#handleModal(show: boolean) {
		this.#modal = show;
		this.#dialog.toggleAttribute('aria-modal', show);
		this.#dialog.classList.toggle('modal', show);
	}

	show() {
		this.#dialog.show();
		this.open = true;
	}

	showModal() {
		this.#dialog.showModal();
		this.open = true;
		this.#handleModal(true);
	}

	override connectedCallback() {
		super.connectedCallback();
		this.#dialog.addEventListener('click', this.#handleScrimClick);
		this.#dialog.addEventListener('submit', this.#handleInternalFormSubmit);
	}

	override disconnectedCallback() {
		super.disconnectedCallback();
		this.#dialog.removeEventListener('click', this.#handleScrimClick);
		this.#dialog.removeEventListener('submit', this.#handleInternalFormSubmit);
	}


	/**
	 *
	 * Slot observer:
	 *
	 * @internal
	 */


	@observable bodySlottedContent?: HTMLElement[];
	@observable footerSlottedContent?: HTMLElement[];
	@observable secondaryActionSlottedContent?: HTMLElement[];
	@observable primaryActionSlottedContent?: HTMLElement[];

}
