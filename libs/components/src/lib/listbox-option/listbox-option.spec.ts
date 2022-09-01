import { elementUpdated, fixture } from '@vivid-nx/shared';
import { Icon } from '../icon/icon';
import { ListboxOption } from './listbox-option';
import '.';

const COMPONENT_TAG = 'vwc-listbox-option';
const ICON_SELECTOR = 'vwc-icon';

describe('vwc-listbox-option', () => {
	let element: ListboxOption;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as ListboxOption;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-listbox-option', async () => {
			expect(element).toBeInstanceOf(ListboxOption);
			expect(element.optionText).toBeUndefined();
			expect(element.icon).toBeUndefined();
			expect(element.selected).toBeFalsy();
			expect(element.disabled).toBeFalsy();
		});
	});

	describe('icon', () => {
		it('should add an icon to the listbox option', async () => {
			element.icon = 'home';
			await elementUpdated(element);

			const icon = element.shadowRoot?.querySelector(ICON_SELECTOR) as Icon;
			expect(icon)
				.toBeInstanceOf(Icon);
			expect(icon?.type)
				.toEqual('home');
		});
	});

	describe('text', () => {
		it('should set text property value as text content', async () => {
			const text = 'lorem';

			element.optionText = text;
			await elementUpdated(element);

			const base = element.shadowRoot?.querySelector('.base');
			expect(base?.textContent).toEqual(text);
		});
	});


	describe('selected', function () {
		it('should set selected class when disabled is true', async () => {
			expect(element.shadowRoot?.querySelector('.selected')).toBeFalsy();
			element.toggleAttribute('selected', true);
			await elementUpdated(element);
			expect(element.shadowRoot?.querySelector('.selected')).toBeTruthy();
		});
	});

	describe('disabled', function () {
		it('should set disabled class when disabled is true', async () => {
			expect(element.shadowRoot?.querySelector('.disabled')).toBeFalsy();
			element.toggleAttribute('disabled', true);
			await elementUpdated(element);
			expect(element.shadowRoot?.querySelector('.disabled')).toBeTruthy();
		});
	});
});
