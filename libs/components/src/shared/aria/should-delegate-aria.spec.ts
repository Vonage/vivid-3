import { elementUpdated } from '@repo/shared/test-utils/fixture';
import type { DelegatesAriaElement } from './delegates-aria';
import {
	ariaAttributeName,
	ariaValueProperties,
	type AriaValuePropertyName,
} from './aria-mixin';

export const allAriaPropertiesExcept = (
	exceptProperties: AriaValuePropertyName[]
) =>
	ariaValueProperties.filter(
		(p) => p !== 'role' && !exceptProperties.includes(p)
	);

export const itShouldDelegateAllAriaAttributes = (
	getHost: () => DelegatesAriaElement,
	getTarget: () => HTMLElement
) => {
	itShouldDelegateAriaAttributes(
		getHost,
		getTarget,
		ariaValueProperties.filter((p) => p !== 'role')
	);
};

export const itShouldDelegateAriaAttributes = (
	getHost: () => DelegatesAriaElement,
	getTarget: () => HTMLElement,
	ariaProperties: readonly AriaValuePropertyName[]
) => {
	it.each(ariaProperties)(
		'should delegate %s to target element',
		async (ariaProperty) => {
			const element = getHost();
			const target = getTarget();

			element[ariaProperty] = 'aria value';
			await elementUpdated(element);

			expect(target.getAttribute(ariaAttributeName(ariaProperty))).toBe(
				'aria value'
			);
		}
	);
};
