import { attr } from '@microsoft/fast-element';
import {FoundationElement} from '@microsoft/fast-foundation';
import type { Placement } from '@floating-ui/dom';
import { type Anchored, anchored } from '../../shared/patterns/anchored';

/**
 * Base class for tooltip
 *
 * @public
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

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		document.removeEventListener('keydown', this.#closeOnEscape);
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

export interface Tooltip extends Anchored {}
