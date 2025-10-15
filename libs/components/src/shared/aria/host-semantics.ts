import {
	type CaptureType,
	HTMLDirective,
	StatelessAttachedAttributeDirective,
	type ViewController,
} from '@microsoft/fast-element';
import type { Constructor, MixinType } from '../utils/mixins';
import type { VividElement } from '../foundation/vivid-element/vivid-element';
import { ariaMixinProperties } from './aria-mixin';
import {
	type BoundAriaProperties,
	HostSemanticsBehavior,
} from './host-semantics-behavior';

class HostSemanticsDirective<T> extends StatelessAttachedAttributeDirective<T> {
	/**
	 * The structural id of the DOM node to which the created behavior will apply.
	 */
	targetNodeId: string = '';

	constructor(private boundProperties: BoundAriaProperties<T>) {
		super('vvd-host-semantics' as any);
	}

	override bind(controller: ViewController): void {
		// Get the target element (the element the directive is attached to)
		const targetElement = controller.targets[this.targetNodeId] as HTMLElement;

		// In Fast Element 2.7.0, controller.source is the custom element when used on template
		const behavior = new HostSemanticsBehavior(
			targetElement, // Pass the target element as target
			{
				boundProperties: this.boundProperties,
				forwardedProperties: new Set(
					ariaMixinProperties.filter((p) => !(p in this.boundProperties))
				),
			}
		);
		behavior.bind(controller);
	}
}

HTMLDirective.define(HostSemanticsDirective);

export function applyHostSemantics<T>(
	boundProperties: BoundAriaProperties<T> = {}
): CaptureType<T, any> {
	return new HostSemanticsDirective(boundProperties);
}

/**
 * Mixin for components that place semantics on the host element.
 */
export const HostSemantics = <T extends Constructor<VividElement>>(Base: T) => {
	class HostSemanticsElement extends Base {
		override _vividAriaBehaviour = 'host' as const;
	}

	return HostSemanticsElement;
};

export type HostSemanticsElement = MixinType<typeof HostSemantics>;
