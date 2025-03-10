import { elementUpdated } from '@vivid-nx/shared';
import {
	ariaAttributeName,
	type AriaPropertyName,
	type DelegatesAriaElement,
} from './delegates-aria';

export const itShouldDelegateAriaAttributes = (
	getHost: () => DelegatesAriaElement,
	getTarget: () => HTMLElement,
	ariaProperties: AriaPropertyName[]
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
