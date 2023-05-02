import { attr } from '@microsoft/fast-element';
import {FoundationElement} from '@microsoft/fast-foundation';
import type { Placement } from '@floating-ui/dom';

type anchorType = string | HTMLElement;

/**
 * Base class for tooltip
 *
 * @public
 */
export class Tooltip extends FoundationElement {

	#anchorEl: HTMLElement | null = null;

	/**
	 * the text of the tooltip
	 * accepts string
	 *
	 * @public
	 */
	@attr text?: string;

	@attr({ mode: 'fromView' }) placement?: Placement;

	@attr({ mode: 'boolean'	}) open = false;

	@attr({ mode: 'fromView' }) anchor?: anchorType;
	anchorChanged(_: anchorType, newValue: anchorType) {
		if (this.#anchorEl) this.#removeEventListener();

		this.#anchorEl = newValue instanceof HTMLElement ? newValue : document.getElementById(newValue);
		if (this.#anchorEl) this.#anchorUpdated();
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this.#removeEventListener();
		document.removeEventListener('keydown', this.#closeOnEscape);
	}

	#anchorUpdated(): void {
		this.#removeEventListener();
		this.#addEventListener();
	}

	#addEventListener(): void {
		if (this.#anchorEl) {
			this.#anchorEl.addEventListener('mouseover', this.#show);
			this.#anchorEl.addEventListener('mouseout', this.#hide);
			this.#anchorEl.addEventListener('focusin', this.#show);
			this.#anchorEl.addEventListener('focusout', this.#hide);
		}
	}

	#removeEventListener(): void {
		this.#anchorEl?.removeEventListener('mouseover', this.#show);
		this.#anchorEl?.removeEventListener('mouseout', this.#hide);
		this.#anchorEl?.removeEventListener('focusin', this.#show);
		this.#anchorEl?.removeEventListener('focusout', this.#hide);
	}

	#show = () => {
		this.open = true;
	};

	#hide = () => {
		this.open = false;
	};

	#closeOnEscape = (e:KeyboardEvent) => {
		if (e.key === 'Escape') this.#hide();
	};

	openChanged(_: boolean, newValue: boolean): void {
		if (_ === undefined) return;

		if (newValue) {
			document.addEventListener('keydown', this.#closeOnEscape);
		} else {
			document.removeEventListener('keydown', this.#closeOnEscape);
		}
	}
}
