import {
	type CaptureType,
	StatelessAttachedAttributeDirective,
	type ViewController,
} from '@microsoft/fast-element';
import type { Constructor, MixinType } from '../utils/mixins';
import type { VividElement } from '../foundation/vivid-element/vivid-element';
import { ariaMixinProperties, type AriaPropertyName } from './aria-mixin';
import {
	type BoundAriaProperties,
	HostSemanticsBehavior,
} from './host-semantics-behavior';

class HostSemanticsDirective extends StatelessAttachedAttributeDirective<{
	boundProperties: BoundAriaProperties<any>;
	forwardedProperties: Set<AriaPropertyName>;
}> {
	override createBehavior(): HostSemanticsBehavior<any> {
		return new HostSemanticsBehavior(
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

export function applyHostSemantics<T>(
	boundProperties: BoundAriaProperties<T> = {}
): CaptureType<T, any> {
	const forwardedProperties = new Set(
		ariaMixinProperties.filter(
			(p) => !(p in boundProperties)
		) as AriaPropertyName[]
	);

	return new HostSemanticsDirective({
		boundProperties,
		forwardedProperties,
	});
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
