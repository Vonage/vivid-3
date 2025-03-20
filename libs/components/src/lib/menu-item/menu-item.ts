import { attr, DOM, observable } from '@microsoft/fast-element';
import { Direction, keyEnter, keySpace } from '@microsoft/fast-web-utilities';
import {
	keyArrowLeft,
	keyArrowRight,
} from '@microsoft/fast-web-utilities/dist/key-codes';
import { AffixIcon } from '../../shared/patterns/affix';
import { Menu } from '../menu/menu';
import { Connotation } from '../enums';
import { applyMixins } from '../../shared/foundation/utilities/apply-mixins';
import { getDirection } from '../../shared/foundation/utilities/direction';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';
import { MenuItemRole } from './menu-item-role';

export enum CheckAppearance {
	Normal = 'normal',
	TickOnly = 'tick-only',
}

/**
 * Types of fab connotation.
 *
 * @public
 */
export type MenuItemConnotation = Extract<
	Connotation,
	Connotation.CTA | Connotation.Accent
>;

/**
 * @public
 * @component menu-item
 * @slot meta - Assign nodes to the `meta` slot to set a badge or an additional icon.
 * @slot trailing-meta - Assign nodes to the `meta` slot to set a badge or an additional icon.
 * @slot submenu - Assign a Menu to the `submenu` slot to add a submenu.
 * @event {CustomEvent<HTMLElement>} expanded-change - Fires a custom 'expanded-change' event when the expanded state changes
 * @event {CustomEvent<undefined>} change - Fires a custom 'change' event when a non-submenu item with a role of `menuitemcheckbox`, `menuitemradio`, or `menuitem` is invoked
 * @vueModel modelValue checked change `(event.currentTarget as HTMLInputElement).checked`
 */
export class MenuItem extends VividElement {
	/**
	 * The disabled state of the element.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: disabled
	 */
	@attr({ mode: 'boolean' })
	disabled!: boolean;

	/**
	 * The expanded state of the element.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: expanded
	 */
	@attr({ mode: 'boolean' })
	expanded!: boolean;

	/**
	 * @internal
	 */
	expandedChanged() {
		if (this.$fastController.isConnected) {
			if (this.submenu === undefined) {
				return;
			}
			if (this.expanded === false) {
				(this.submenu as Menu).collapseExpandedItem();
			} else {
				this.currentDirection = getDirection(this);
			}
			this.$emit('expanded-change', this, { bubbles: false });
		}
	}

	/**
	 * The role of the element.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: role
	 */
	@attr
	// eslint-disable-next-line @nrwl/nx/workspace/no-attribute-default-value
	override role: MenuItemRole = MenuItemRole.menuitem;

	/**
	 * The checked value of the element.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: checked
	 */
	@attr({ mode: 'boolean' })
	checked!: boolean;

	/**
	 * @internal
	 */
	checkedChanged() {
		if (this.$fastController.isConnected) {
			this.$emit('change');
		}
	}

	/**
	 * @internal
	 */
	@observable
	hasSubmenu = false;

	/**
	 * Track current direction to pass to the anchored region
	 *
	 * @internal
	 */
	@observable
	currentDirection: Direction = Direction.ltr;

	/**
	 * @internal
	 */
	@observable
	submenu: Element | undefined;

	private observer: MutationObserver | undefined;

	/**
	 * @internal
	 */
	override connectedCallback(): void {
		super.connectedCallback();
		DOM.queueUpdate(() => {
			this.updateSubmenu();
		});

		this.observer = new MutationObserver(this.updateSubmenu);
	}

	/**
	 * @internal
	 */
	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this.submenu = undefined;
		if (this.observer !== undefined) {
			this.observer.disconnect();
			this.observer = undefined;
		}
	}

	/**
	 * @internal
	 */
	handleMenuItemClick = (e: MouseEvent): boolean => {
		if (e.defaultPrevented || this.disabled) {
			return false;
		}

		this.invoke();
		return false;
	};

	/**
	 * @internal
	 */
	handleMouseOver = (_: MouseEvent): boolean => {
		if (this.disabled || !this.hasSubmenu || this.expanded) {
			return false;
		}

		this.expanded = true;

		return false;
	};

	/**
	 * @internal
	 */
	handleMouseOut = (_: MouseEvent): boolean => {
		if (!this.expanded || this.contains(document.activeElement)) {
			return false;
		}

		this.expanded = false;

		return false;
	};

	private invoke = () => {
		if (this.disabled) {
			return;
		}

		switch (this.role) {
			case MenuItemRole.menuitemcheckbox:
				this.checked = !this.checked;
				break;

			case MenuItemRole.menuitem:
				// update submenu
				this.updateSubmenu();
				if (this.hasSubmenu) {
					this.expanded = true;
				} else {
					this.$emit('change');
				}
				break;

			case MenuItemRole.menuitemradio:
				if (!this.checked) {
					this.checked = true;
				}
				break;
		}
	};

	/**
	 * Indicates the menu item's text.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: text
	 */
	@attr text?: string;
	/**
	 * Indicates the menu item's secondary text.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: text
	 */
	@attr({ attribute: 'text-secondary' }) textSecondary?: string;
	/**
	 * The connotation the fab should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: connotation
	 */
	@attr connotation?: MenuItemConnotation;
	/**
	 * Controls the placement of the menu item's checkmark or radio icon.
	 * @public
	 * @remarks
	 * HTML Attribute: check-trailing
	 */
	@attr({ mode: 'boolean', attribute: 'check-trailing' }) checkTrailing = false;
	/**
	 * Controls the appearance of the check indicator.
	 * @public
	 * @remarks
	 * HTML Attribute: check-appearance
	 */
	@attr({ attribute: 'check-appearance' }) checkedAppearance?: CheckAppearance;

	/**
	 *
	 * Meta & Trailing-meta slot observer:
	 *
	 * @internal
	 */
	@observable metaSlottedContent?: HTMLElement[];
	@observable trailingMetaSlottedContent?: HTMLElement[];
	/**
	 *
	 * Submenu slot observer:
	 *
	 * @internal
	 */
	@observable slottedSubmenu?: Menu[];
	#submenuArray: Menu[] = [];

	/**
	 *
	 *
	 * @internal
	 */
	slottedSubmenuChanged(_oldValue: Menu[], newValue: Menu[]) {
		this.#submenuArray = newValue;
	}

	constructor() {
		super();
		this.addEventListener('expanded-change', this.#expandedChange);
	}

	private updateSubmenu() {
		for (const submenu of this.#submenuArray) {
			this.submenu = submenu as Menu;
			(this.submenu as Menu).anchor = this as MenuItem;
			(this.submenu as Menu).placement = 'right-start';
			(this.submenu as Menu).collapseExpandedItem = () =>
				this.#collapseExpandedItem();
		}

		this.hasSubmenu = this.submenu === undefined ? false : true;
	}

	#collapseExpandedItem() {
		this.expanded = false;
	}

	#expandedChange() {
		if (this.hasSubmenu) {
			(this.submenu as Menu).open = this.expanded;
		}
	}

	/**
	 * @internal
	 */
	handleMenuItemKeyDown = (e: KeyboardEvent): boolean => {
		if (e.defaultPrevented) {
			return false;
		}

		switch (e.key) {
			case keyEnter:
			case keySpace:
				this.invoke();
				if (!this.disabled) {
					this.#emitSyntheticClick();
				}
				return false;

			case keyArrowRight:
				//open/focus on submenu
				if (this.hasSubmenu) {
					this.expanded = true;
					this.#emitSyntheticClick();
				}
				return false;

			case keyArrowLeft:
				//close submenu
				if (this.expanded) {
					this.#emitSyntheticClick();
					this.expanded = false;
					this.focus();
					return false;
				}
		}

		return true;
	};

	#syntheticClickEvents = new WeakSet<Event>();
	/**
	 * @internal
	 */
	_isSyntheticClickEvent(event: Event) {
		return this.#syntheticClickEvents.has(event);
	}

	#emitSyntheticClick() {
		const mouseEvent = new MouseEvent('click', {
			bubbles: true,
			composed: true,
		});
		this.#syntheticClickEvents.add(mouseEvent);
		this.dispatchEvent(mouseEvent);
	}
}

export interface MenuItem extends AffixIcon {}

applyMixins(MenuItem, AffixIcon);
