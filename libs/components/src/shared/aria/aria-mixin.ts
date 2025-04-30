import { attr, type FASTElement } from '@microsoft/fast-element';
import type { Constructor, MixinType } from '../utils/mixins';
import { publishAriaPropertyChange } from './aria-change-subscription';

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
		specialHandling = false;
		_vividAriaBehaviour: VividAriaBehaviour = 'default';

		constructor(...args: any[]) {
			super(args);
			// Default to null for all ARIA properties
			// This is not needed if DOM implements AriaMixin as null would already be the default
			for (const ariaProperty of ariaMixinProperties) {
				this[ariaProperty] = null;
			}
		}
	}

	for (const ariaProperty of ariaMixinProperties) {
		attr({
			attribute: ariaAttributeName(ariaProperty),
			mode: 'reflect',
		})(AriaMixinElement.prototype, ariaProperty);

		(AriaMixinElement.prototype as any)[`${ariaProperty}Changed`] = function (
			this: AriaMixinElement
		) {
			if (this._vividAriaBehaviour !== 'default') {
				publishAriaPropertyChange(this, ariaProperty);
			}
		};
	}

	// Fix DOM typings not being up to date with ARIA properties
	interface AriaMixinElement extends AriaMixinProperties {}

	return AriaMixinElement;
};

export type AriaMixinElement = MixinType<typeof AriaMixin>;
