import { DOM } from '@microsoft/fast-element';
import {
	ariaAttributeName,
	type AriaMixinElement,
	type AriaPropertyName,
	type VividAriaBehaviour,
} from './aria-mixin';

// Implements ARIA attribute removal.
// When setting an ARIA attribute on a component that delegates it, remove the attribute on the host and replace it with
// a data attribute.
// Otherwise, the ARIA attribute is duplicated which can lead to incorrect or invalid semantics.

// For now, enable removal only when attributes are delegated.
// It would make sense to always enable it to make the behavior consistent across all components and hide the
// implementation detail of whether a component has delegated or host semantics (which might change).
// But this requires us to use ElementInternals to set host semantics which is not well-supported yet (no supported in axe)
const shouldRemoveAriaAttributes = (behavior: VividAriaBehaviour) =>
	behavior === 'delegate';

const dataPropertyName = (ariaPropertyName: AriaPropertyName): string =>
	`vvd${ariaPropertyName.charAt(0).toUpperCase()}${ariaPropertyName.slice(1)}`;

const reflectAriaProperty = (
	element: AriaMixinElement,
	ariaProperty: AriaPropertyName
) => {
	if (shouldRemoveAriaAttributes(element._vividAriaBehaviour)) {
		// Remove ARIA attribute if present
		// By default, FAST would reflect the attribute change back and set the property to null
		// To avoid element, we temporarily set FAST's backing value to null while performing the removal
		// This way FAST will think the property is up to date and skip the update
		const value = element[ariaProperty];
		(element as any)[`_${ariaProperty}`] = null;
		element.removeAttribute(ariaAttributeName(ariaProperty));
		(element as any)[`_${ariaProperty}`] = value;

		// Reflect the property to data attribute instead
		if (element[ariaProperty] !== null) {
			element.dataset[dataPropertyName(ariaProperty)] = element[ariaProperty];
		} else {
			delete element.dataset[dataPropertyName(ariaProperty)];
		}
	} else {
		// Reflect attribute as usual
		DOM.setAttribute(
			element,
			ariaAttributeName(ariaProperty),
			element[ariaProperty]
		);
	}
};

// It is not allowed to modify attributes at certain times (during construction)
// Therefore we keep track of modified properties when unconnected and handle them once connected
const changedAriaProperties = new WeakMap<HTMLElement, Set<AriaPropertyName>>();
const recordAriaPropertyChange = (
	element: HTMLElement,
	ariaProperty: AriaPropertyName
) => {
	const changedProperties = changedAriaProperties.get(element);
	if (!changedProperties) {
		changedAriaProperties.set(element, new Set([ariaProperty]));
	} else {
		changedProperties.add(ariaProperty);
	}
};

export const handleAriaPropertyChange = (
	element: AriaMixinElement,
	ariaProperty: AriaPropertyName
) => {
	if (element.isConnected) {
		reflectAriaProperty(element, ariaProperty);
	} else {
		recordAriaPropertyChange(element, ariaProperty);
	}
};

export const handleElementConnectedCallback = (element: AriaMixinElement) => {
	const changedProperties = changedAriaProperties.get(element);
	if (changedProperties) {
		for (const ariaProperty of changedProperties) {
			reflectAriaProperty(element, ariaProperty);
		}
		changedAriaProperties.delete(element);
	}
};
