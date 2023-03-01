import { elementUpdated, fixture } from '@vivid-nx/shared';
import { FoundationElementRegistry } from '@microsoft/fast-foundation';
import { Icon } from '../icon/icon';
import { ListboxOption } from './option';
import '.';
import { listboxOptionDefinition } from './definition';

const COMPONENT_TAG = 'vwc-option';
const ICON_SELECTOR = 'vwc-icon';

describe('vwc-option', () => {
	let element: ListboxOption;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as ListboxOption;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-option', async () => {
			expect(listboxOptionDefinition()).toBeInstanceOf(FoundationElementRegistry);
			expect(element).toBeInstanceOf(ListboxOption);
			expect(element.text).toEqual('');
			expect(element.value).toEqual('');
			expect(element.icon).toBeUndefined();
			expect(element.iconTrailing).toBeFalsy();
			expect(element.selected).toBeFalsy();
			expect(element.checked).toBeUndefined();
			expect(element.disabled).toBeUndefined();
		});
	});

	describe('icon', () => {
		it('should add an icon to the option', async () => {
			element.icon = 'home';
			await elementUpdated(element);

			const icon = element.shadowRoot?.querySelector(ICON_SELECTOR) as Icon;
			expect(icon)
				.toBeInstanceOf(Icon);
			expect(icon?.name)
				.toEqual('home');
		});
	});

	describe('text', () => {
		it('should set text property value as text content', async () => {
			const text = 'lorem';

			element.text = text;
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
		await elementUpdated(element);
		expect(element.getAttribute('aria-disabled')).toEqual('true');
	});
});
