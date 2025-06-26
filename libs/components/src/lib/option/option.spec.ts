import { elementUpdated, fixture, getBaseElement } from '@repo/shared';
import { Icon } from '../icon/icon';
import { ListboxOption } from './option';
import '.';

const COMPONENT_TAG = 'vwc-option';
describe('vwc-option', () => {
	let element: ListboxOption;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as ListboxOption;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-option', async () => {
			expect(element).toBeInstanceOf(ListboxOption);
			expect(element.text).toEqual('');
			expect(element.value).toEqual('');
			expect(element.icon).toBeUndefined();
			expect(element.iconTrailing).toBeFalsy();
			expect(element.selected).toBeFalsy();
			expect(element.checked).toBeUndefined();
			expect(element.disabled).toBeUndefined();
		});

		it('should allow being created via createElement', () => {
			// createElement may fail even though indirect instantiation through innerHTML etc. succeeds
			// This is because only createElement performs checks for custom element constructor requirements
			// See https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance
			expect(() => document.createElement(COMPONENT_TAG)).not.toThrow();
		});
	});

	describe('icon', () => {
		it('should have an icon slot', async () => {
			expect(
				Boolean(element.shadowRoot?.querySelector('slot[name="icon"]'))
			).toEqual(true);
		});

		it('should have an icon when icon is set without slotted icon', async () => {
			element.icon = 'home';
			await elementUpdated(element);

			const icon = element.shadowRoot?.querySelector('vwc-icon');
			expect(icon).toBeInstanceOf(Icon);
			expect(icon?.name).toEqual('home');
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

	describe('selected', () => {
		it('should set the `aria-selected` attribute with the `selected` value when provided', async () => {
			element.selected = true;
			await elementUpdated(element);
			expect(element.getAttribute('aria-selected')).toEqual('true');
		});
	});

	describe('disabled', () => {
		it('should set the `aria-disabled` attribute to `true` when true', async () => {
			element.disabled = true;
			await elementUpdated(element);
			expect(element.getAttribute('aria-disabled')).toEqual('true');
		});

		it('should set the `aria-disabled` attribute to `false` when false', async () => {
			element.disabled = false;
			await elementUpdated(element);
			expect(element.getAttribute('aria-disabled')).toEqual('false');
		});
	});

	describe('label', function () {
		it('should reflect the label to an attribute', async function () {
			const label = 'label';
			element.label = label;
			await elementUpdated(element);
			expect(element.getAttribute('label')).toEqual(label);
		});

		it("should return the options's text when label attribute and value are not provided", async function () {
			const text = 'text';
			element.text = text;

			expect(element.label).toEqual(text);
		});

		it("should return the options's text when label attribute is not provided and value is", async function () {
			const value = 'value';
			const text = 'text';
			element.value = value;
			element.text = text;

			expect(element.label).toEqual(text);
		});

		it("should return the options's label instead of the text", async function () {
			const label = 'label';
			element.text = 'text';
			element.value = 'value';
			element.setAttribute('label', label);

			expect(element.label).toEqual(label);
		});
	});

	describe('checked', () => {
		it('should set the `aria-checked` attribute with the `checked`', async () => {
			element.checked = true;
			await elementUpdated(element);
			expect(element.getAttribute('aria-checked')).toEqual('true');
		});

		it('should remove the aria-checked attribute when checked is set to a non-boolean', async () => {
			element.checked = null as any;
			await elementUpdated(element);
			expect(element.hasAttribute('aria-checked')).toBe(false);
		});
	});

	describe('value', () => {
		it('should default to empty string when set to a nullish value', async () => {
			element.value = null as any;
			await elementUpdated(element);
			expect(element.value).toBe('');
		});
	});

	describe('form', () => {
		it('should return null if not in a form', async () => {
			expect(element.form).toBe(null);
		});

		// Does not work:
		it.skip('should return the parent form', async () => {
			const form = document.createElement('form');
			form.appendChild(element);
			document.body.appendChild(form);

			expect(element.form).toBe(form);
		});
	});

	describe('_highlighted', () => {
		it('should not add hover class if unset', async () => {
			expect(getBaseElement(element).classList.contains('hover')).toBe(false);
		});

		it('should add hover class if set', async () => {
			element._highlighted = true;
			await elementUpdated(element);
			expect(getBaseElement(element).classList.contains('hover')).toBe(true);
		});
	});

	describe('_displayCheckmark', () => {
		const getCheckmark = () =>
			element.shadowRoot?.querySelector('vwc-icon.checkmark');

		it('should not display a checkmark icon if unset', async () => {
			expect(getCheckmark()).toBeNull();
		});

		it('should not display a checkmark icon if set and not selected', async () => {
			element._displayCheckmark = true;
			await elementUpdated(element);
			expect(getCheckmark()).toBeNull();
		});

		it('should display a checkmark icon if set and selected', async () => {
			element._displayCheckmark = true;
			element.selected = true;
			await elementUpdated(element);
			expect(getCheckmark()).not.toBeNull();
		});
	});

	describe('matchedText', () => {
		const getText = () => element.shadowRoot!.querySelector('.text')!;
		const getMatch = () => element.shadowRoot!.querySelector('.match');

		beforeEach(async () => {
			element.text = 'Option text';
			await elementUpdated(element);
		});

		it('should not mark any text as matched if not set', async () => {
			expect(getText().textContent!.trim()).toBe('Option text');
			expect(getMatch()).toBe(null);
		});

		it('should mark the provided text as matched', async () => {
			element.matchedText = 'pti';
			await elementUpdated(element);

			expect(getText().textContent!.trim()).toBe('Option text');
			expect(getMatch()!.textContent).toBe('pti');
		});
	});

	describe('_vvdSearchText', () => {
		const getText = () => element.shadowRoot!.querySelector('.text')!;
		const getMatch = () => element.shadowRoot!.querySelector('.match');

		beforeEach(async () => {
			element.text = 'Option text';
			await elementUpdated(element);
		});

		it('should mark the provided text as matched', async () => {
			element._vvdSearchText = 'pti';
			await elementUpdated(element);

			expect(getText().textContent!.trim()).toBe('Option text');
			expect(getMatch()!.textContent).toBe('pti');
		});

		it('should be override by matchText when both are provided', async () => {
			element._vvdSearchText = 'tion';
			element.matchedText = 'pti';
			await elementUpdated(element);

			expect(getText().textContent!.trim()).toBe('Option text');
			expect(getMatch()!.textContent).toBe('pti');
		});
	});

	describe('_isNotMatching', () => {
		it('should hide the component when set', async () => {
			element._isNotMatching = true;
			await elementUpdated(element);

			expect(element.style.display).toBe('none');
		});
	});

	describe('constructor', () => {
		it('should construct with provided values', async () => {
			element = new ListboxOption('text', 'value', true, true);

			expect(element.text).toEqual('text');
			expect(element.value).toEqual('value');
			expect(element.defaultSelected).toEqual(true);
			expect(element.selected).toEqual(true);
		});
	});
});
