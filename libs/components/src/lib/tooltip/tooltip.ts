import { attr } from '@microsoft/fast-element';
import {FoundationElement} from '@microsoft/fast-foundation';
import type { Placement } from '@floating-ui/dom';
import { type Anchored, anchored } from '../../shared/patterns/anchored';

/**
 * @public
 * @component tooltip
 */
@anchored
export class Tooltip extends FoundationElement {
	/**
	 * the text of the tooltip
	 * accepts string
	 *
	 * @public
	 */
	@attr text?: string;

	@attr({ mode: 'fromView' }) placement?: Placement;

	@attr({ mode: 'boolean'	}) open = false;

	override connectedCallback(): void {
		super.connectedCallback();
		this.#updateListeners();
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this.#updateListeners();
	}

	/**
	 * @internal
	 */
	_anchorElChanged(oldValue?: HTMLElement, newValue?: HTMLElement): void {
		if (oldValue) this.#cleanupAnchor(oldValue);
		if (newValue) this.#setupAnchor(newValue);
	}

	#setupAnchor(a: HTMLElement) {
		a.addEventListener('mouseover', this.#show);
		a.addEventListener('mouseout', this.#hide);
		a.addEventListener('focusin', this.#show);
		a.addEventListener('focusout', this.#hide);
	}

	#cleanupAnchor(a: HTMLElement) {
		a.removeEventListener('mouseover', this.#show);
		a.removeEventListener('mouseout', this.#hide);
		a.removeEventListener('focusin', this.#show);
		a.removeEventListener('focusout', this.#hide);
	}

	#show = () => {
		this.open = true;
	};

	#hide = () => {
		this.open = false;
	};

	#updateListeners() {
		document.removeEventListener('keydown', this.#closeOnEscape);
		if (this.open && this.isConnected) {
			document.addEventListener('keydown', this.#closeOnEscape);
		}
	}

	#closeOnEscape = (e:KeyboardEvent) => {
		if (e.key === 'Escape') this.#hide();
	};

	/**
	 * @internal
	 */
	openChanged(oldValue?: boolean): void {
		if (oldValue === undefined) return;

		this.#updateListeners();
	}
}

export interface Tooltip extends Anchored {}
