import { elementUpdated, fixture } from '@repo/shared';
import { CountryGroup } from './country-group';
import '.';

const COMPONENT_TAG = 'vwc-country-group';

describe('vwc-country-group', () => {
	let element: CountryGroup;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG} style="width: 280px">
				<vwc-country code="UK"></vwc-country>
				<vwc-country code="NO"></vwc-country>
				<vwc-country code="US"></vwc-country>
			</${COMPONENT_TAG}>`
		)) as CountryGroup;
		await elementUpdated(element);
	});

	it('should be initialized as a CountryGroup', () => {
		expect(element).toBeInstanceOf(CountryGroup);
	});

	it('should set role and tabindex on the host', () => {
		expect(element.getAttribute('role')).toBe('group');
		expect(element.getAttribute('tabindex')).toBe('0');
	});

	it('should expose an aria-label derived from countries', async () => {
		await elementUpdated(element);
		const label = element.getAttribute('aria-label');
		expect(label).toContain('UK');
		expect(label).toContain('NO');
		expect(label).toContain('US');
	});
});
