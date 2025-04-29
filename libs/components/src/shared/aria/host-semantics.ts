import {
	AttachedBehaviorHTMLDirective,
	type CaptureType,
} from '@microsoft/fast-element';
import type { Constructor, MixinType } from '../utils/mixins';
import type { VividElement } from '../foundation/vivid-element/vivid-element';
import { ariaMixinProperties } from './aria-mixin';
import {
	type BoundAriaProperties,
	HostSemanticsBehavior,
} from './host-semantics-behavior';

export function applyHostSemantics<T>(
	boundProperties: BoundAriaProperties<T> = {}
): CaptureType<T> {
	const forwardedProperties = new Set(
		ariaMixinProperties.filter((p) => !(p in boundProperties))
	);

	return new AttachedBehaviorHTMLDirective(
		'vvd-host-semantics',
		HostSemanticsBehavior,
		{
			boundProperties,
			forwardedProperties,
		}
	);
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
