import { elementUpdated, fixture } from '@repo/shared';
import { Country } from './country';
import '.';

const COMPONENT_TAG = 'vwc-country';

describe('vwc-country', () => {
	let element: Country;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as Country;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-country', async () => {
			expect(element).toBeInstanceOf(Country);
		});

		it('should allow being created via createElement', () => {
			expect(() => document.createElement(COMPONENT_TAG)).not.toThrow();
		});
	});

	describe('code', () => {
		it('should render vwc-icon with flag icon when code is set', async () => {
			element.code = 'GB';
			await elementUpdated(element);
			const icon = element.shadowRoot?.querySelector('.icon vwc-icon');
			expect(icon).toBeTruthy();
			expect(icon?.getAttribute('name')).toBe('flag-united-kingdom');
		});

		it('should resolve UK to flag-united-kingdom icon', async () => {
			element.code = 'UK';
			await elementUpdated(element);
			const icon = element.shadowRoot?.querySelector('.icon vwc-icon');
			expect(icon?.getAttribute('name')).toBe('flag-united-kingdom');
		});

		it('should render code as display text when code is set', async () => {
			element.code = 'GB';
			await elementUpdated(element);
			expect(
				element.shadowRoot?.querySelector('.text')?.textContent?.trim()
			).toBe('GB');
		});

		it('should render code for UK (user value)', async () => {
			element.code = 'UK';
			await elementUpdated(element);
			expect(
				element.shadowRoot?.querySelector('.text')?.textContent?.trim()
			).toBe('UK');
		});

		it('should render label when set, overriding code', async () => {
			element.code = 'SH';
			element.label = 'Saint Helena';
			await elementUpdated(element);
			expect(
				element.shadowRoot?.querySelector('.text')?.textContent?.trim()
			).toBe('Saint Helena');
		});

		it('should render code when label is empty', async () => {
			element.code = 'GB';
			element.label = '';
			await elementUpdated(element);
			expect(
				element.shadowRoot?.querySelector('.text')?.textContent?.trim()
			).toBe('GB');
		});
	});

	describe('icon slot', () => {
		it('should have an icon slot', async () => {
			expect(
				element.shadowRoot?.querySelector('slot[name="icon"]')
			).toBeTruthy();
		});
	});
});
