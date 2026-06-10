import { attr, DOM } from '@microsoft/fast-element';
import type { Placement } from '@floating-ui/dom';
import { Anchored } from '../../shared/patterns/anchored';
import { WithKbdShortcut } from '../../shared/patterns/kbd-shortcut';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';
import { generateRandomId } from '../../shared/utils/randomId';

/**
 * @public
 * @component tooltip
 * @slot anchor - Used to set the anchor element for the tooltip.
 * @testSelector byText byText
 * @testQuery open open true
 * @testQuery closed open false
 */
export class Tooltip extends WithKbdShortcut(Anchored(VividElement)) {
	/**
	 * Text content of the Tooltip
	 *
	 * @public
	 */
	@attr text?: string;

	@attr({ mode: 'fromView' }) placement?: Placement;

	@attr({ mode: 'boolean' }) open = false;

	/**
	 * @internal
	 */
	_descriptionId = `vwc-tooltip-desc-${generateRandomId()}`;

	/** @internal */
	_kbdAriaShortcutsValueChanged() {
		if (!this._anchorEl) {
			return;
		}
		DOM.setAttribute(
			this._anchorEl,
			'aria-keyshortcuts',
			this._kbdAriaShortcutsValue
		);
	}

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

		const existing =
			a.getAttribute('aria-describedby') ?? (a as VividElement).ariaDescribedBy;
		a.setAttribute(
			'aria-describedby',
			existing ? `${existing} ${this._descriptionId}` : this._descriptionId
		);
		DOM.setAttribute(a, 'aria-keyshortcuts', this._kbdAriaShortcutsValue);
	}

	#cleanupAnchor(a: HTMLElement) {
		a.removeEventListener('mouseover', this.#show);
		a.removeEventListener('mouseout', this.#hide);
		a.removeEventListener('focusin', this.#show);
		a.removeEventListener('focusout', this.#hide);
		const describedBy =
			a.getAttribute('aria-describedby') ??
			(a as VividElement).ariaDescribedBy ??
			'';
		const tokens = describedBy
			.split(' ')
			.filter((t) => t !== this._descriptionId);
		const newDescribedBy = tokens.length ? tokens.join(' ') : null;

		if (a.hasAttribute('aria-describedby')) {
			DOM.setAttribute(a, 'aria-describedby', newDescribedBy);
		} else {
			// Vivid elements with renamed aria attributes
			(a as VividElement).ariaDescribedBy = newDescribedBy;
		}
		a.removeAttribute('aria-keyshortcuts');
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

	#closeOnEscape = (e: KeyboardEvent) => {
		/* v8 ignore else -- @preserve */
		if (e.key === 'Escape') {
			this.#hide();
		}
	};

	/**
	 * @internal
	 */
	openChanged(oldValue?: boolean): void {
		if (oldValue === undefined) return;

		this.#updateListeners();
	}
}
