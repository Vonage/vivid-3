import { elementUpdated, fixture, getBaseElement } from '@vivid-nx/shared';
import { Icon } from '../icon/icon';
import { ListboxOption } from './listbox-option';
import '.';

const COMPONENT_TAG = 'vwc-option';
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
			expect(element.checked).toBeUndefined();
			expect(element.disabled).toBeUndefined();
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
			expect(base?.textContent?.trim()).toEqual(text);
		});
	});

	it('should set the `aria-selected` attribute with the `selected` value when provided', async () => {
		element.selected = true;
		await elementUpdated(element);
		expect(element.getAttribute('aria-selected')).toEqual('true');
	});

	it('should set the `aria-checked` attribute with the `checked` value when provided', async () => {
		element.checked = true;
		await elementUpdated(element);
		expect(element.getAttribute('aria-checked')).toEqual('true');
	});

	it('should set the `aria-disabled` attribute with the `disabled` value when provided', async () => {
		element.disabled = true;
		await elementUpdated(getBaseElement(element));
		expect(element.getAttribute('aria-disabled')).toEqual('true');
	});
});
