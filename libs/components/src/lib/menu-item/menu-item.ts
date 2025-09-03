import { attr, DOM, observable } from '@microsoft/fast-element';
import { keyEnter, keySpace } from '@microsoft/fast-web-utilities';
import {
	keyArrowLeft,
	keyArrowRight,
} from '@microsoft/fast-web-utilities/dist/key-codes';
import { AffixIcon } from '../../shared/patterns/affix';
import type { Menu } from '../menu/menu';
import { Connotation } from '../enums';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';
import type { ExtractFromEnum } from '../../shared/utils/enums';
import { replaces } from '../../shared/deprecation/replaced-props';
import { HostSemantics } from '../../shared/aria/host-semantics';
import { MenuItemRole } from './menu-item-role';

type ControlType = 'checkbox' | 'radio';

/**
 * Types of fab connotation.
 *
 * @public
 */
export type MenuItemConnotation = ExtractFromEnum<
	Connotation,
	Connotation.CTA | Connotation.Accent
>;

/**
 * @public
 * @component menu-item
 * @slot meta - Assign nodes to the `meta` slot to set a badge or an additional icon.
 * @slot trailing-meta - Assign nodes to the `meta` slot to set a badge or an additional icon.
 * @slot submenu - Assign a Menu to the `submenu` slot to add a submenu.
 * @event {CustomEvent<HTMLElement>} expanded-change - Fired when the expanded state changes.
 * @event {CustomEvent<undefined>} change - Fired when the item is triggered. Does not fire when a submenu is collapsed or expanded.
 * @vueModel modelValue checked change `event.currentTarget.checked`
 * @testSelector byText byText
 * @testAction click click #base
 * @testQuery checked checked true
 * @testQuery unchecked checked false
 * @testQuery disabled disabled
 * @testRef base shadow .base
 */
export class MenuItem extends HostSemantics(AffixIcon(VividElement)) {
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
			if (this.submenu && !this.expanded) {
				this.submenu.collapseExpandedItem();
			}
			this.$emit('expanded-change', this, { bubbles: false });
		}
	}

	/**
	 * The role of the element.
	 *
	 * @deprecated Use `control-type` instead for checkbox and radio items. If the menu item is not a direct descendant of a menu, role will default to `presentation`.
	 * @public
	 * @remarks
	 * HTML Attribute: role
	 */
	override role: MenuItemRole = MenuItemRole.menuitem;

	/**
	 * Parent Menu will set this to false if item is a direct descendant.
	 * @internal
	 */
	@observable _isPresentational?: boolean;

	#ensureRoleMatchesPresentational() {
		if (this._isPresentational) {
			// Change role only if it wasn't changed from the default value to avoid breaking existing, poorly built, menus
			if (this.role === 'menuitem') {
				this.role = 'presentation';
			}
		} else if (this.role === 'presentation') {
			this.role = MenuItemRole.menuitem;
		}
	}

	/**
	 * @internal
	 */
	_isPresentationalChanged() {
		if (this.$fastController.isConnected) {
			this.#ensureRoleMatchesPresentational();
		}
	}

	/**
	 * Whether the menu item should behave as a checkbox or radio button.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: control-type
	 */
	@replaces<ControlType | undefined, MenuItemRole>({
		deprecatedPropertyName: 'role',
		fromDeprecated: (role) => {
			switch (role) {
				case 'menuitemcheckbox':
					return 'checkbox';
				case 'menuitemradio':
					return 'radio';
				default:
					return undefined;
			}
		},
		toDeprecated: (controlType) => {
			switch (controlType) {
				case 'checkbox':
					return 'menuitemcheckbox';
				case 'radio':
					return 'menuitemradio';
				default:
					return 'menuitem';
			}
		},
	})
	@attr({ attribute: 'control-type' })
	controlType?: ControlType;

	/**
	 * The checked value of the element.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: checked
	 */
	@attr({ mode: 'boolean' })
	checked = false;

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
	override connectedCallback(): void {
		super.connectedCallback();

		DOM.queueUpdate(() => {
			// Initialize _isPresentational after waiting for parent menu to set it:
			this._isPresentational = this._isPresentational ?? true;
			this.#ensureRoleMatchesPresentational();
		});
	}

	/**
	 * @internal
	 */
	handleMenuItemClick = (e: MouseEvent): boolean => {
		if (this._isSyntheticClickEvent(e)) {
			// Ignore synthetic events created through keyboard input
			return true;
		}

		this.invoke();

		// Do not prevent default when the item is presentational
		return Boolean(this._isPresentational);
	};

	/**
	 * @internal
	 */
	handleMouseOver = (_: MouseEvent): boolean => {
		if (this.disabled || !this.submenu || this.expanded) {
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
		if (this.disabled || this._isPresentational) {
			return;
		}

		switch (this.controlType) {
			case 'checkbox':
				this.checked = !this.checked;
				break;
			case 'radio':
				if (!this.checked) {
					this.checked = true;
				}
				break;
			default:
				if (this.submenu) {
					this.expanded = true;
				} else {
					this.$emit('change');
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
	@attr({ attribute: 'check-appearance' }) checkedAppearance?:
		| 'normal'
		| 'tick-only';

	/**
	 *
	 * Meta & Trailing-meta slot observer:
	 *
	 * @internal
	 */
	@observable metaSlottedContent?: HTMLElement[];
	@observable trailingMetaSlottedContent?: HTMLElement[];

	/**
	 * @internal
	 */
	@observable slottedSubmenu?: Menu[];

	/**
	 * @internal
	 */
	slottedSubmenuChanged() {
		if (this.submenu) {
			this.submenu.anchor = this;
			this.submenu.placement = 'right-start';
			this.submenu.collapseExpandedItem = () => this.#collapseExpandedItem();
			this.submenu._popupOffset = 5;
		}
	}

	/**
	 * @internal
	 */
	get submenu(): Menu | null {
		if (this.slottedSubmenu?.length) {
			return this.slottedSubmenu[0];
		} else {
			return null;
		}
	}

	/**
	 * @internal
	 */
	get hasSubmenu() {
		return this.submenu !== null;
	}

	constructor() {
		super();
		this.addEventListener('expanded-change', this.#expandedChange);
	}

	#collapseExpandedItem() {
		this.expanded = false;
	}

	#expandedChange() {
		if (this.submenu) {
			this.submenu.open = this.expanded;
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
				if (this.submenu) {
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
