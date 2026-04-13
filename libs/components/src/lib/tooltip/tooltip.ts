import { attr, observable, Updates } from '@microsoft/fast-element';
import type { Placement } from '@floating-ui/dom';
import { Anchored } from '../../shared/patterns/anchored';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';

/**
 * @public
 * @component tooltip
 * @slot anchor - Used to set the anchor element for the tooltip.
 * @slot kbd-shortcut - Used to display a keyboard shortcut alongside the tooltip text.
 * @testSelector byText byText
 * @testQuery open open true
 * @testQuery closed open false
 */
export class Tooltip extends Anchored(VividElement) {
	/**
	 * Text content of the Tooltip
	 *
	 * @public
	 */
	@attr text?: string;

	@attr({ mode: 'fromView' }) placement?: Placement;

	@attr({ mode: 'boolean' }) open = false;

	/**
	 * Whether the kbd-shortcut slot has visible content.
	 *
	 * @internal
	 */
	@observable _hasKbdShortcut = false;

	/**
	 * @internal
	 */
	@observable _kbdShortcutSlotted?: Element[];

	#observer?: MutationObserver;

	#ariaKeyshortcuts: string | null = null;

	/**
	 * @internal
	 */
	_kbdShortcutSlottedChanged() {
		this.#observeSlottedVisibility();
		Updates.enqueue(() => this.#updateAriaKeyshortcuts());
	}

	#observeSlottedVisibility() {
		this.#observer?.disconnect();

		const elements = this._kbdShortcutSlotted ?? [];

		if (elements.length > 0) {
			this.#observer = new MutationObserver(() =>
				this.#checkSlottedVisibility()
			);
			for (const el of elements) {
				this.#observer.observe(el as HTMLElement, {
					attributes: true,
					attributeFilter: ['style'],
				});
			}
		}

		this.#checkSlottedVisibility();
	}

	#checkSlottedVisibility() {
		const elements = this._kbdShortcutSlotted ?? [];
		this._hasKbdShortcut = elements.some((el) => {
			const htmlEl = el as HTMLElement;
			return !htmlEl.style || htmlEl.style.display !== 'none';
		});
	}

	override connectedCallback(): void {
		super.connectedCallback();
		this.#updateListeners();
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this.#updateListeners();
		this.#observer?.disconnect();
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
		a.setAttribute('aria-haspopup', 'true');
		a.setAttribute('aria-expanded', String(this.open));
		if (this.#ariaKeyshortcuts) {
			a.setAttribute('aria-keyshortcuts', this.#ariaKeyshortcuts);
		}
	}

	#cleanupAnchor(a: HTMLElement) {
		a.removeEventListener('mouseover', this.#show);
		a.removeEventListener('mouseout', this.#hide);
		a.removeEventListener('focusin', this.#show);
		a.removeEventListener('focusout', this.#hide);
		a.removeAttribute('aria-haspopup');
		a.removeAttribute('aria-expanded');
		a.removeAttribute('aria-keyshortcuts');
	}

	#show = () => {
		this.open = true;
		this.#updateAnchorExpanded();
	};

	#hide = () => {
		this.open = false;
		this.#updateAnchorExpanded();
	};

	#updateAnchorExpanded() {
		if (this._anchorEl) {
			this._anchorEl.setAttribute('aria-expanded', String(this.open));
		}
	}

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

	#updateAriaKeyshortcuts() {
		const shortcut = (this._kbdShortcutSlotted ?? []).find(
			(el) => typeof (el as any).getKeyshortcutsValue === 'function'
		);

		this.#ariaKeyshortcuts = (shortcut as any)?.getKeyshortcutsValue() ?? null;

		if (this._anchorEl) {
			if (this.#ariaKeyshortcuts) {
				this._anchorEl.setAttribute(
					'aria-keyshortcuts',
					this.#ariaKeyshortcuts
				);
			} else {
				this._anchorEl.removeAttribute('aria-keyshortcuts');
			}
		}
	}

	/**
	 * @internal
	 */
	openChanged(oldValue?: boolean): void {
		if (oldValue === undefined) return;

		this.#updateListeners();
	}
}
