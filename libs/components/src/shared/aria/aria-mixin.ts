import { attr, type FASTElement } from '@microsoft/fast-element';
import type { Constructor, MixinType } from '../utils/mixins';
import { publishAriaPropertyChange } from './aria-change-subscription';
import {
	handleAriaPropertyChange,
	handleElementConnectedCallback,
} from './attribute-removal';

/**
 * Properties of the ARIAMixin (see: https://www.w3.org/TR/wai-aria-1.3/#ARIAMixin) which is applied to Element.
 * IDREF properties are omitted.
 */
export const ariaMixinProperties = [
	'role',
	'ariaAtomic',
	'ariaAutoComplete',
	'ariaBusy',
	'ariaChecked',
	'ariaColCount',
	'ariaColIndex',
	'ariaColIndexText',
	'ariaColSpan',
	'ariaCurrent',
	'ariaDescription',
	'ariaDisabled',
	'ariaExpanded',
	'ariaHasPopup',
	'ariaHidden',
	'ariaInvalid',
	'ariaKeyShortcuts',
	'ariaLabel',
	'ariaLevel',
	'ariaLive',
	'ariaModal',
	'ariaMultiLine',
	'ariaMultiSelectable',
	'ariaOrientation',
	'ariaPlaceholder',
	'ariaPosInSet',
	'ariaPressed',
	'ariaReadOnly',
	'ariaRequired',
	'ariaRoleDescription',
	'ariaRowCount',
	'ariaRowIndex',
	'ariaRowIndexText',
	'ariaRowSpan',
	'ariaSelected',
	'ariaSetSize',
	'ariaSort',
	'ariaValueMax',
	'ariaValueMin',
	'ariaValueNow',
	'ariaValueText',
	'ariaRelevant', // Non-standard
] as const;

export type AriaPropertyName = typeof ariaMixinProperties[number];

type AriaMixinProperties = {
	[Property in AriaPropertyName]: string | null;
};

// Note: Typescript does not allow creating methods through mapped types
type AriaMixinChangeHandlers = {
	roleChanged(prev: string | null, next: string | null): void;
	ariaAtomicChanged(prev: string | null, next: string | null): void;
	ariaAutoCompleteChanged(prev: string | null, next: string | null): void;
	ariaBusyChanged(prev: string | null, next: string | null): void;
	ariaCheckedChanged(prev: string | null, next: string | null): void;
	ariaColCountChanged(prev: string | null, next: string | null): void;
	ariaColIndexChanged(prev: string | null, next: string | null): void;
	ariaColIndexTextChanged(prev: string | null, next: string | null): void;
	ariaColSpanChanged(prev: string | null, next: string | null): void;
	ariaCurrentChanged(prev: string | null, next: string | null): void;
	ariaDescriptionChanged(prev: string | null, next: string | null): void;
	ariaDisabledChanged(prev: string | null, next: string | null): void;
	ariaExpandedChanged(prev: string | null, next: string | null): void;
	ariaHasPopupChanged(prev: string | null, next: string | null): void;
	ariaHiddenChanged(prev: string | null, next: string | null): void;
	ariaInvalidChanged(prev: string | null, next: string | null): void;
	ariaKeyShortcutsChanged(prev: string | null, next: string | null): void;
	ariaLabelChanged(prev: string | null, next: string | null): void;
	ariaLevelChanged(prev: string | null, next: string | null): void;
	ariaLiveChanged(prev: string | null, next: string | null): void;
	ariaModalChanged(prev: string | null, next: string | null): void;
	ariaMultiLineChanged(prev: string | null, next: string | null): void;
	ariaMultiSelectableChanged(prev: string | null, next: string | null): void;
	ariaOrientationChanged(prev: string | null, next: string | null): void;
	ariaPlaceholderChanged(prev: string | null, next: string | null): void;
	ariaPosInSetChanged(prev: string | null, next: string | null): void;
	ariaPressedChanged(prev: string | null, next: string | null): void;
	ariaReadOnlyChanged(prev: string | null, next: string | null): void;
	ariaRequiredChanged(prev: string | null, next: string | null): void;
	ariaRoleDescriptionChanged(prev: string | null, next: string | null): void;
	ariaRowCountChanged(prev: string | null, next: string | null): void;
	ariaRowIndexChanged(prev: string | null, next: string | null): void;
	ariaRowIndexTextChanged(prev: string | null, next: string | null): void;
	ariaRowSpanChanged(prev: string | null, next: string | null): void;
	ariaSelectedChanged(prev: string | null, next: string | null): void;
	ariaSetSizeChanged(prev: string | null, next: string | null): void;
	ariaSortChanged(prev: string | null, next: string | null): void;
	ariaValueMaxChanged(prev: string | null, next: string | null): void;
	ariaValueMinChanged(prev: string | null, next: string | null): void;
	ariaValueNowChanged(prev: string | null, next: string | null): void;
	ariaValueTextChanged(prev: string | null, next: string | null): void;
	ariaRelevantChanged(prev: string | null, next: string | null): void;
};

export const ariaAttributeName = (ariaPropertyName: AriaPropertyName): string =>
	ariaPropertyName.replace('aria', 'aria-').toLowerCase();

export type VividAriaBehaviour =
	| 'default' /// Default behaviour, do nothing
	| 'delegate' /// Aria attributes are delegated to a child element
	| 'host'; /// Component sets aria attributes on itself

/**
 * Mixin for all components. Declares all ARIA attributes.
 */
export const AriaMixin = <T extends Constructor<FASTElement & HTMLElement>>(
	Base: T
) => {
	class AriaMixinElement extends Base {
		_vividAriaBehaviour: VividAriaBehaviour = 'default';

		constructor(...args: any[]) {
			super(args);
			// Default to null for all ARIA properties
			// This is not needed if DOM implements AriaMixin as null would already be the default
			// As a performance improvement set the FAST backing value, to skip running change handlers for all properties
			for (const ariaProperty of ariaMixinProperties) {
				(this as any)[`_${ariaProperty}`] = null;
			}
		}

		override connectedCallback() {
			super.connectedCallback();
			handleElementConnectedCallback(this);
		}
	}

	for (const ariaProperty of ariaMixinProperties) {
		attr({
			attribute: ariaAttributeName(ariaProperty),
			mode: 'fromView',
		})(AriaMixinElement.prototype, ariaProperty);

		(AriaMixinElement.prototype as any)[`${ariaProperty}Changed`] = function (
			this: AriaMixinElement
		) {
			handleAriaPropertyChange(this, ariaProperty);
			if (this._vividAriaBehaviour !== 'default') {
				publishAriaPropertyChange(this, ariaProperty);
			}
		};
	}

	type AriaInterface = AriaMixinProperties & AriaMixinChangeHandlers;

	// Fix DOM typings not being up to date with ARIA properties and add change handlers so that subclasses can override them
	interface AriaMixinElement extends AriaInterface {}

	return AriaMixinElement;
};

export type AriaMixinElement = MixinType<typeof AriaMixin>;
