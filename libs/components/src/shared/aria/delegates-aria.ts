import { attr } from '@microsoft/fast-element';
import type { Constructor, MixinType } from '../utils/mixins';
import { VividElement } from '../foundation/vivid-element/vivid-element';

/**
 * Properties from the ARIAMixin (see: https://www.w3.org/TR/wai-aria-1.3/#ARIAMixin) which is applied to Element.
 * IDREF properties are omitted.
 */
const ariaMixinProperties = [
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

type ARIAMixin = {
	[Property in AriaPropertyName]: string | null;
};

export const ariaAttributeName = (ariaPropertyName: AriaPropertyName): string =>
	ariaPropertyName.replace('aria', 'aria-').toLowerCase();

/**
 * Mixin for components that delegate ARIA properties to an element inside the
 * shadow root.
 */
export const DelegatesAria = <T extends Constructor<VividElement>>(Base: T) => {
	// No need to declare any properties/attributes as they are native
	class DelegatesAriaElement extends Base {
		constructor(...rest: any[]) {
			super(...rest);
			for (const ariaProperty of ariaMixinProperties) {
				this[ariaProperty] = null;
			}
		}
	}

	for (const ariaProperty of ariaMixinProperties) {
		attr({ attribute: ariaAttributeName(ariaProperty) })(
			DelegatesAriaElement.prototype,
			ariaProperty
		);
	}

	// Fix DOM typings not being up to date with ARIA properties
	interface DelegatesAriaElement extends ARIAMixin {}

	return DelegatesAriaElement;
};

export type DelegatesAriaElement = MixinType<typeof DelegatesAria>;
