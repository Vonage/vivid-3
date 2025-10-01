import {
	type CaptureType,
	StatelessAttachedAttributeDirective,
	type ViewController,
} from '@microsoft/fast-element';
import type { Constructor, MixinType } from '../utils/mixins';
import { VividElement } from '../foundation/vivid-element/vivid-element';
import {
	type AriaPropertyName,
	type BoundAriaProperties,
	DelegateAriaBehavior,
} from './delegate-aria-behavior';
import { ariaMixinProperties } from './aria-mixin';

type DelegateAriaOptions = {
	onlySpecified?: boolean; /// Delegate only the specified properties
};

/**
 * Directive to delegate ARIA properties to the target element.
 */
class DelegateAriaDirective extends StatelessAttachedAttributeDirective<{
	boundProperties: BoundAriaProperties<any>;
	forwardedProperties: Set<AriaPropertyName>;
}> {
	override createBehavior(): DelegateAriaBehavior<any> {
		return new DelegateAriaBehavior(
			null as any, // Will be set in bind method
			{
				boundProperties: this.options.boundProperties,
				forwardedProperties: this.options.forwardedProperties,
			}
		);
	}

	override bind(controller: ViewController): void {
		// The behavior will handle the binding with the controller's source as target
		const behavior = this.createBehavior();
		behavior.bind(controller);
	}
}

export function delegateAria<T>(
	boundProperties: BoundAriaProperties<T> = {},
	options: DelegateAriaOptions = {}
): CaptureType<T, any> {
	// Forward all other properties to the target element, unless onlySpecified is set
	const forwardedProperties = new Set(
		(options.onlySpecified ? [] : ariaMixinProperties).filter(
			(p) => !(p in boundProperties)
		) as AriaPropertyName[]
	);

	return new DelegateAriaDirective({
		boundProperties,
		forwardedProperties,
	});
}

/**
 * Mixin for components that delegate ARIA properties to an element inside the
 * shadow root.
 */
export const DelegatesAria = <T extends Constructor<VividElement>>(Base: T) => {
	class DelegatesAriaElement extends Base {
		override _vividAriaBehaviour = 'delegate' as const;
	}

	return DelegatesAriaElement;
};

export type DelegatesAriaElement = MixinType<typeof DelegatesAria>;
