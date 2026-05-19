import type { CaptureType } from '@microsoft/fast-element';
import type { Constructor, MixinType } from '../utils/mixins';
import type { VividElement } from '../foundation/vivid-element/vivid-element';
import { ariaIdrefsProperties, ariaValueProperties } from './aria-mixin';
import {
	AriaBindingDirective,
	type BoundAriaProperties,
} from './aria-binding-directive';
import { IdrefsController } from './idrefs-controller';

type DelegateAriaOptions = {
	onlySpecified?: boolean; /// Delegate only the specified properties
};

/**
 * Directive to delegate ARIA properties to the target element.
 */
export function delegateAria<T>(
	boundProperties: BoundAriaProperties<T> = {},
	options: DelegateAriaOptions = {}
): CaptureType<T, any> {
	// Forward all other properties to the target element, unless onlySpecified is set
	const forwardedValueProperties = new Set(
		(options.onlySpecified ? [] : ariaValueProperties).filter(
			(p) => !(p in boundProperties)
		)
	);
	const forwardedIdrefsProperties = new Set(
		(options.onlySpecified ? [] : ariaIdrefsProperties).filter(
			(p) => !(p in boundProperties)
		)
	);

	return new AriaBindingDirective({
		boundProperties,
		forwardedValueProperties,
		forwardedIdrefsProperties,
	});
}

/**
 * Mixin for components that delegate ARIA properties to an element inside the
 * shadow root.
 */
export const DelegatesAria = <T extends Constructor<VividElement>>(Base: T) => {
	class DelegatesAriaElement extends Base {
		/** @internal */
		override _vividAriaBehaviour = 'delegate' as const;
	}

	for (const ariaProperty of ariaIdrefsProperties) {
		DelegatesAriaElement.prototype[`${ariaProperty}Changed`] = function (
			this: DelegatesAriaElement
		) {
			IdrefsController.for(this, ariaProperty).setAttribute(this[ariaProperty]);
		};

		Object.defineProperty(
			DelegatesAriaElement.prototype,
			`${ariaProperty}Elements`,
			{
				get(this: DelegatesAriaElement): HTMLElement[] | null {
					return IdrefsController.resolvedElements(this, ariaProperty);
				},
				set(this: DelegatesAriaElement, value: HTMLElement[] | null) {
					IdrefsController.for(this, ariaProperty).setElements(value);
				},
			}
		);
	}

	return DelegatesAriaElement;
};

export type DelegatesAriaElement = MixinType<typeof DelegatesAria>;
