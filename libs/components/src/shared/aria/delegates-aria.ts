import {
	type CaptureType,
	HTMLDirective,
	StatelessAttachedAttributeDirective,
	type ViewController,
} from '@microsoft/fast-element';
import type { Constructor, MixinType } from '../utils/mixins';
import { VividElement } from '../foundation/vivid-element/vivid-element';
import {
	type BoundAriaProperties,
	DelegateAriaBehavior,
} from './delegate-aria-behavior';
import { ariaMixinProperties } from './aria-mixin';

type DelegateAriaOptions = {
	onlySpecified?: boolean; /// Delegate only the specified properties
};

class DelegateAriaDirective<T> extends StatelessAttachedAttributeDirective<T> {
	/**
	 * The structural id of the DOM node to which the created behavior will apply.
	 */
	targetNodeId: string = '';

	constructor(
		private boundProperties: BoundAriaProperties<T>,
		private forwardedProperties: Set<string>
	) {
		super('vvd-delegate-aria' as any);
	}

	override bind(controller: ViewController): void {
		// Get the target element (the element the directive is attached to)
		const targetElement = controller.targets[this.targetNodeId] as HTMLElement;

		// Create and bind the behavior
		const behavior = new DelegateAriaBehavior(
			targetElement, // Pass the target element as target
			{
				boundProperties: this.boundProperties,
				forwardedProperties: this.forwardedProperties as any,
			}
		);
		behavior.bind(controller);
	}
}

HTMLDirective.define(DelegateAriaDirective);

/**
 * Directive to delegate ARIA properties to the target element.
 */
export function delegateAria<T>(
	boundProperties: BoundAriaProperties<T> = {},
	options: DelegateAriaOptions = {}
): CaptureType<T, any> {
	// Forward all other properties to the target element, unless onlySpecified is set
	const forwardedProperties = new Set(
		(options.onlySpecified ? [] : ariaMixinProperties).filter(
			(p) => !(p in boundProperties)
		)
	);

	return new DelegateAriaDirective(boundProperties, forwardedProperties);
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
