import {
	axe,
	elementUpdated,
	fixture,
	getBaseElement,
	getControlElement,
} from '@vivid-nx/shared';
import { Size } from '../enums';
import type { Popup } from '../popup/popup.ts';
import { ListboxOption } from '../option/option.ts';
import { Combobox } from './combobox';
import { ComboboxAutocomplete } from './combobox.options.ts';
import '.';

const COMPONENT_TAG = 'vwc-combobox';
const ICON_SELECTOR = 'vwc-icon';

describe('vwc-combobox', () => {
	let element: Combobox;

	function getPopup(): Popup {
		return element.shadowRoot!.querySelector('.popup') as Popup;
	}

	function getListbox(): HTMLDivElement {
		return element.shadowRoot!.querySelector('.listbox') as HTMLDivElement;
	}

	const getOption = (text: string) => {
		return element.querySelector(`vwc-option[text="${text}"]`) as ListboxOption;
	};

	function getControl(): HTMLInputElement {
		return element.shadowRoot!.querySelector('.control') as HTMLInputElement;
	}

	const typeInput = (value: string) => {
		getControl().value = value;
		getControl().dispatchEvent(new InputEvent('input', { bubbles: true }));
	};

	const getVisibleOptions = () => {
		return Array.from(element.querySelectorAll('vwc-option:not([hidden])'));
	};

	beforeAll(() => {
		HTMLElement.prototype.scrollIntoView = vi.fn();
	});

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as Combobox;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-combobox', async () => {
			expect(element).toBeInstanceOf(Combobox);
			expect(element.open).toEqual(false);
			expect(element.placement).toBeUndefined();
			expect(element.disabled).toEqual(false);
			expect(element.value).toEqual('');
			expect(element.placeholder).toBeUndefined();
			expect(element.autocomplete).toBeUndefined();
			expect(element.appearance).toBeUndefined();
			expect(element.shape).toEqual(undefined);
			expect(element.icon).toEqual(undefined);
			expect(element.selectedIndex).toEqual(-1);
		});

		it('should allow being created via createElement', () => {
			// createElement may fail even though indirect instantiation through innerHTML etc. succeeds
			// This is because only createElement performs checks for custom element constructor requirements
			// See https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance
			expect(() => document.createElement(COMPONENT_TAG)).not.toThrow();
		});
	});

	describe('label', function () {
		it('should set a label if label is set', async function () {
			const labelText = 'label';
			element.label = labelText;
			await elementUpdated(element);
			const labelElement = element.shadowRoot?.querySelector('label');
			expect(labelElement).toBeTruthy();
			expect(labelElement?.textContent?.trim()).toEqual(labelText);
		});

		it('should show label only if label is set', async function () {
			const labelElement = element.shadowRoot?.querySelector('label');
			expect(labelElement).toBeNull();
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

	describe('input', () => {
		it('should have autocomplete attribute set of "off"', async () => {
			expect(getControl().getAttribute('autocomplete')).toBe('off');
		});
	});

	describe('open', function () {
		it('should toggle open when clicked', async () => {
			expect(element.open).toEqual(false);
			element.click();
			await elementUpdated(element);
			expect(element.open).toEqual(true);
		});

		it('should not set open when clicked while disabled', async () => {
			element.disabled = true;
			element.click();
			expect(element.open).toEqual(false);
		});

		it('should not toggle open when clicking on a disabled option', async () => {
			element.innerHTML = `
				<vwc-option value="1" text="Option 1" disabled></vwc-option>
			`;
			element.open = true;
			await elementUpdated(element);

			(element.querySelector('vwc-option') as HTMLElement).click();

			expect(element.open).toBe(true);
		});

		it('should set open to false when escape key is pressed', async () => {
			element.open = true;
			element.dispatchEvent(
				new KeyboardEvent('keydown', {
					key: 'Escape',
					bubbles: true,
					composed: true,
				})
			);
			expect(element.open).toBe(false);
		});

		it('should allow propgation on escape key if not open', async () => {
			const spy = vi.fn();
			element.parentElement!.addEventListener('keydown', spy);

			element.dispatchEvent(
				new KeyboardEvent('keydown', {
					key: 'Escape',
					bubbles: true,
					composed: true,
				})
			);

			expect(spy.mock.calls.length).toBe(1);
		});

		it('should stop propgation on escape key if open', async () => {
			element.open = true;
			const spy = vi.fn();
			element.parentElement!.addEventListener('keydown', spy);

			element.dispatchEvent(
				new KeyboardEvent('keydown', {
					key: 'Escape',
					bubbles: true,
					composed: true,
				})
			);

			expect(spy.mock.calls.length).toBe(0);
		});

		it('should shoulf leave open unchanged when feedback messages is clicked', async () => {
			element.helperText = 'helper text';
			await elementUpdated(element);

			element
				.shadowRoot!.querySelector('.helper-message')!
				.dispatchEvent(new Event('click', { bubbles: true, composed: true }));

			expect(element.open).toBe(false);
		});
	});

	describe('placeholder', function () {
		const placeholderText = 'Text';
		it('should set placeholder attribute on the input', async function () {
			element.placeholder = placeholderText;
			const input: HTMLInputElement = getControlElement(
				element
			) as HTMLInputElement;
			input.focus();
			input.dispatchEvent(new InputEvent('input'));
			input.dispatchEvent(new KeyboardEvent('keyup'));
			await elementUpdated(element);
			expect(
				element.shadowRoot?.querySelector('input')?.getAttribute('placeholder')
			).toEqual(placeholderText);
		});

		it('should set class placeholder to root', async function () {
			element.placeholder = placeholderText;
			element.dispatchEvent(new KeyboardEvent('keydown'));
			element.dispatchEvent(new FocusEvent('focusout'));
			await elementUpdated(element);
			expect(getBaseElement(element).classList.contains('placeholder')).toEqual(
				true
			);
		});
	});

	describe('success text', () => {
		it('should add success class to base when successText is set', async function () {
			element.successText = 'success';
			await elementUpdated(element);
			expect(
				getBaseElement(element).classList.contains('success')
			).toBeTruthy();
		});
		it('should add the success text to feedback element when successText is set', async function () {
			element.successText = 'success';
			await elementUpdated(element);
			expect(
				element.shadowRoot.querySelector('.feedback-wrapper').textContent.trim()
			).toBe('success');
		});
	});

	describe('error text', () => {
		it('should add error class to base when errorText is set', async function () {
			element.errorText = 'error';
			await elementUpdated(element);
			expect(getBaseElement(element).classList.contains('error')).toBeTruthy();
		});

		it('should add the error text to feedback element when errorText is set', async function () {
			element.successText = 'error';
			await elementUpdated(element);
			expect(
				element.shadowRoot.querySelector('.feedback-wrapper').textContent.trim()
			).toBe('error');
		});
	});

	describe('appearance', function () {
		it('should set the appearance class on the control', async function () {
			const appearance = 'ghost';
			element.setAttribute('appearance', appearance);
			await elementUpdated(element);

			expect(
				getBaseElement(element).classList.contains('appearance-ghost')
			).toEqual(true);
		});
	});

	describe('icon', () => {
		it('should have a icon slot', async () => {
			expect(
				Boolean(element.shadowRoot?.querySelector('slot[name="icon"]'))
			).toEqual(true);
		});

		it('should have an icon when icon is set without slotted icon', async function () {
			const icon = 'info';
			element.icon = icon;
			await elementUpdated(element);
			expect(
				element.shadowRoot?.querySelector(ICON_SELECTOR)?.getAttribute('name')
			).toEqual(icon);
		});
	});

	describe('slot', () => {
		it('should have a meta slot', async function () {
			expect(
				Boolean(element.shadowRoot?.querySelector('slot[name="meta"]'))
			).toEqual(true);
		});

		it('should add class .has-meta if the meta slot is occupied', async function () {
			const slottedElement = document.createElement('div');
			slottedElement.slot = 'meta';
			element.appendChild(slottedElement);
			await elementUpdated(element);

			expect(
				getBaseElement(element).classList.contains('has-meta')
			).toBeTruthy();
		});
	});

	describe('scale', () => {
		function hasSizeClass(baseElement: HTMLElement) {
			return Array.from(baseElement.classList).some((className) => {
				return className.includes('size-');
			});
		}

		it('should reflect the property as an attribute', async () => {
			element.scale = Size.Condensed;
			await elementUpdated(element);
			expect(element.getAttribute('scale')).toBe(Size.Condensed);
		});

		it('should reflect the attribute as a property', async () => {
			element.setAttribute('scale', Size.Condensed);
			await elementUpdated(element);
			expect(element.scale).toBe(Size.Condensed);
		});

		it('should init without a size class on base element', async () => {
			expect(hasSizeClass(getControlElement(element))).toBe(false);
		});
		it('should set size class on base element', async () => {
			element.scale = Size.Condensed;
			await elementUpdated(element);
			expect(getBaseElement(element).classList.contains('size-condensed')).toBe(
				true
			);
		});

		it('should remove size class from base element', async () => {
			element.scale = Size.Condensed;
			await elementUpdated(element);
			element.scale = undefined;
			await elementUpdated(element);
			expect(hasSizeClass(getControlElement(element))).toBe(false);
		});

		it('should reflect scale on slotted options', async () => {
			element.scale = Size.Condensed;
			element.innerHTML = `
				<vwc-option value="1" text="Option 1"></vwc-option>
				<vwc-option value="2" text="Option 2"></vwc-option>
				<vwc-option value="3" text="Option 3"></vwc-option>
				`;
			await elementUpdated(element);
			const options = element.querySelectorAll('vwc-option');
			options.forEach((option) => {
				expect(option.getAttribute('scale')).toBe('condensed');
			});
		});
	});

	describe('shape', function () {
		it('should set the shape class on the base', async function () {
			const shape = 'pill';
			element.setAttribute('shape', shape);
			await elementUpdated(element);

			expect(
				getBaseElement(element).classList.contains(`shape-${shape}`)
			).toEqual(true);
		});
	});

	describe('scale', () => {
		function hasSizeClass(baseElement: HTMLElement) {
			return Array.from(baseElement.classList).some((className) => {
				return className.includes('size-');
			});
		}

		it('should reflect the property as an attribute', async () => {
			element.scale = Size.Condensed;
			await elementUpdated(element);
			expect(element.getAttribute('scale')).toBe(Size.Condensed);
		});

		it('should reflect the attribute as a property', async () => {
			element.setAttribute('scale', Size.Condensed);
			await elementUpdated(element);
			expect(element.scale).toBe(Size.Condensed);
		});

		it('should init without a size class on base element', async () => {
			expect(hasSizeClass(getControlElement(element))).toBe(false);
		});
		it('should set size class on base element', async () => {
			element.scale = Size.Condensed;
			await elementUpdated(element);
			expect(getBaseElement(element).classList.contains('size-condensed')).toBe(
				true
			);
		});

		it('should remove size class from base element', async () => {
			element.scale = Size.Condensed;
			await elementUpdated(element);
			element.scale = undefined;
			await elementUpdated(element);
			expect(hasSizeClass(getControlElement(element))).toBe(false);
		});

		it('should reflect scale on slotted options', async () => {
			element.scale = Size.Condensed;
			element.innerHTML = `
				<vwc-option value="1" text="Option 1"></vwc-option>
				<vwc-option value="2" text="Option 2"></vwc-option>
				<vwc-option value="3" text="Option 3"></vwc-option>
				`;
			await elementUpdated(element);
			const options = element.querySelectorAll('vwc-option');
			options.forEach((option) => {
				expect(option.getAttribute('scale')).toBe('condensed');
			});
		});
	});

	describe('shape', function () {
		it('should set the shape class on the base', async function () {
			const shape = 'pill';
			element.setAttribute('shape', shape);
			await elementUpdated(element);

			expect(
				getBaseElement(element).classList.contains(`shape-${shape}`)
			).toEqual(true);
		});
	});

	describe('selectedIndex', () => {
		beforeEach(async () => {
			element.innerHTML = `
				<option value="1">1</option>
				<option value="2" selected>2</option>
				<option value="3">3</option>
				`;
			await elementUpdated(element);
		});

		it('should set selectedIndex to 1 when first option is selected', async () => {
			await elementUpdated(element);
			expect(element.selectedIndex).toEqual(1);
		});

		it('should change selection when changed', async () => {
			element.selectedIndex = 2;
			await elementUpdated(element);
			expect(element.selectedOptions).toEqual([
				element.querySelector('option:nth-child(3)'),
			]);
		});

		it('should keep selectedIndex in valid range', async () => {
			element.selectedIndex = 5;

			expect(element.selectedIndex).toEqual(2);
		});
	});

	describe('options', () => {
		beforeEach(async () => {
			element.innerHTML = `
			<option value="1">1</option>
			<option value="2" selected>2</option>
			<option value="3">3</option>
			`;
			await elementUpdated(element);
		});

		it('should recieve array of options', async () => {
			await elementUpdated(element);
			expect(element.options[1]).toEqual(
				element.querySelector('option:nth-child(2)')
			);
		});
	});

	describe('selectedOptions', () => {
		beforeEach(async () => {
			element.innerHTML = `
			<option value="1">1</option>
			<option value="2" selected>2</option>
			<option value="3">3</option>
			`;
			await elementUpdated(element);
		});

		it('should recieve array of selectedOptions', async () => {
			await elementUpdated(element);
			expect(element.selectedOptions[0]).toEqual(
				element.querySelector('option:nth-child(2)')
			);
		});
	});

	describe('placement', () => {
		it('should forward placement to the popup', async () => {
			element.placement = 'top';
			await elementUpdated(element);

			expect(getPopup().placement).toBe('top');
		});

		it("should default the placement to 'bottom-start' when not set", async () => {
			expect(getPopup().placement).toBe('bottom-start');
		});
	});

	describe('fixed-dropdown', () => {
		it("should set strategy 'fixed' on the popup when set", async () => {
			element.fixedDropdown = true;
			element.open = true;
			await elementUpdated(element);

			expect(getPopup().strategy).toBe('fixed');
		});

		it("should default the strategy to 'absolute' when not set", async () => {
			expect(getPopup().strategy).toBe('absolute');
		});
	});

	describe('autocomplete', () => {
		beforeEach(async () => {
			element.innerHTML = `
			<vwc-option value='1' text='Apple'></vwc-option>
			<vwc-option value='2' text='Ananas'></vwc-option>
			<vwc-option value='3' text='Nectarine'></vwc-option>
		`;
			await elementUpdated(element);
		});

		describe.each([ComboboxAutocomplete.list, ComboboxAutocomplete.both])(
			'when autocomplete is list [%s]',
			(autocomplete) => {
				beforeEach(async () => {
					element.autocomplete = autocomplete;
					await elementUpdated(element);
				});

				it('should filter options by input text', async () => {
					element.open = true;

					typeInput('ana');

					expect(element.options).toEqual([getOption('Ananas')]);
					expect(getVisibleOptions()).toEqual([getOption('Ananas')]);
				});

				it('should open when entering text', async () => {
					typeInput('ana');

					expect(element.open).toBe(true);
				});

				it(`should set aria-autocomplete on the input to "${autocomplete}"`, async () => {
					expect(getControl().getAttribute('aria-autocomplete')).toBe(
						autocomplete
					);
				});
			}
		);

		describe.each([ComboboxAutocomplete.inline, ComboboxAutocomplete.both])(
			'when autocomplete is inline [%s]',
			(autocomplete) => {
				beforeEach(async () => {
					element.autocomplete = autocomplete;
					await elementUpdated(element);
				});

				it('should autocomplete matched option and select autocompleted range', async () => {
					element.open = true;

					typeInput('ana');

					expect(getControl().value).toBe('Ananas');
					expect(getControl().selectionStart).toBe(3);
					expect(getControl().selectionEnd).toBe(6);
					expect(getControl().selectionDirection).toBe('backward');
				});

				it('should clear selected option if nothing matches the search term', async () => {
					element.selectedIndex = 0;
					element.open = true;

					typeInput('banana');

					expect(element.selectedIndex).toBe(-1);
				});

				it('should close and select the first matching option when pressing Enter when autocomplete is %s', async () => {
					element.open = true;
					await elementUpdated(element);
					const spy = vi.fn();
					element.addEventListener('change', spy);

					typeInput('ana');
					await elementUpdated(element);
					element.dispatchEvent(
						new KeyboardEvent('keydown', {
							key: 'Enter',
						})
					);
					await elementUpdated(element);

					expect(element.value).toBe('Ananas');
					expect(element.open).toBe(false);
					expect(spy).toHaveBeenCalledTimes(1);
				});

				it('should set control value and select text in control when navigating between options', async () => {
					element.open = true;
					await elementUpdated(element);

					element.dispatchEvent(
						new KeyboardEvent('keydown', {
							key: 'ArrowDown',
						})
					);
					await elementUpdated(element);

					expect(getControl().value).toBe('Apple');
					expect(getControl().selectionStart).toBe(0);
					expect(getControl().selectionEnd).toBe(5);
				});

				it(`should set aria-autocomplete on the input to "${autocomplete}"`, async () => {
					expect(getControl().getAttribute('aria-autocomplete')).toBe(
						autocomplete
					);
				});
			}
		);
	});

	describe("when the owning form's reset() function is invoked", () => {
		it('should reset the value property to its initial value', async () => {
			const form = (await fixture(
				`<form><${COMPONENT_TAG} name="combobox" required value="1">
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
				</${COMPONENT_TAG}></form>`
			)) as HTMLFormElement;
			element = form.children[0] as Combobox;
			element.value = '2';
			await elementUpdated(element);

			form.reset();
			await elementUpdated(element);
			expect(element.value).toEqual('1');
		});

		it('should reset the value property to the first option with the `selected` attribute present', async () => {
			const form = (await fixture(
				`<form><${COMPONENT_TAG} name="combobox" required>
					<option value="1">1</option>
					<option value="2" selected>2</option>
					<option value="3">3</option>
				</${COMPONENT_TAG}></form>`
			)) as HTMLFormElement;
			element = form.children[0] as Combobox;
			await elementUpdated(element);
			expect(element.value).toEqual('2');
			element.value = '1';
			await elementUpdated(element);

			form.reset();
			await elementUpdated(element);
			expect(element.value).toEqual('2');
		});
	});

	describe('when an option is selected', () => {
		let changeSpy: vi.Mock;

		beforeEach(async () => {
			element.innerHTML = `
				<vwc-option value="1" text="Apple"></vwc-option>
			`;
			element.open = true;
			await elementUpdated(element);
			changeSpy = vi.fn();
			element.addEventListener('change', changeSpy);
			getOption('Apple').click();
		});

		it("should set value to the option's text", async () => {
			expect(element.value).toBe('Apple');
		});

		it('should emit a change event', async () => {
			expect(changeSpy).toHaveBeenCalledTimes(1);
		});

		it("should update the control's value with the option's text", async () => {
			expect(getControl().value).toBe('Apple');
		});

		it("should reset the control's selection range", async () => {
			expect(getControl().selectionStart).toBe(5);
			expect(getControl().selectionEnd).toBe(5);
		});
	});

	describe('keyboard navigation', () => {
		beforeEach(async () => {
			element.innerHTML = `
			<vwc-option value='1' text='Apple'></vwc-option>
			<vwc-option value='2' text='Ananas'></vwc-option>
			<vwc-option value='3' text='Nectarine'></vwc-option>
		`;
			await elementUpdated(element);
		});

		it('should select the next option when pressing ArrowDown', async () => {
			element.open = true;
			await elementUpdated(element);

			element.dispatchEvent(
				new KeyboardEvent('keydown', {
					key: 'ArrowDown',
				})
			);
			await elementUpdated(element);

			expect(element.selectedIndex).toBe(0);

			element.dispatchEvent(
				new KeyboardEvent('keydown', {
					key: 'ArrowDown',
				})
			);
			await elementUpdated(element);

			expect(element.selectedIndex).toBe(1);
		});

		it('should select the previous option when pressing ArrowUp', async () => {
			element.open = true;
			await elementUpdated(element);
			element.selectedIndex = 2;

			element.dispatchEvent(
				new KeyboardEvent('keydown', {
					key: 'ArrowUp',
				})
			);
			await elementUpdated(element);

			expect(element.selectedIndex).toBe(1);
		});

		it.each(['ArrowUp', 'ArrowDown'])(
			'should open when pressing %s',
			async (key) => {
				element.dispatchEvent(
					new KeyboardEvent('keydown', {
						key,
					})
				);

				expect(element.open).toBe(true);
			}
		);

		it('should ignore key presses when ctrl is held down', async () => {
			element.open = true;
			await elementUpdated(element);

			element.dispatchEvent(
				new KeyboardEvent('keydown', {
					key: 'ArrowDown',
					ctrlKey: true,
				})
			);
			await elementUpdated(element);

			expect(element.selectedIndex).toBe(-1);
		});

		it('should ignore key presses when shift is held down', async () => {
			element.open = true;
			await elementUpdated(element);

			element.dispatchEvent(
				new KeyboardEvent('keydown', {
					key: 'ArrowDown',
					shiftKey: true,
				})
			);
			await elementUpdated(element);

			expect(element.selectedIndex).toBe(-1);
		});

		it('should set control value to the selected option when pressing tab', async () => {
			element.selectedIndex = 0;
			getControl().value = 'A';

			const tabEvent = new KeyboardEvent('keydown', {
				key: 'Tab',
			});
			element.dispatchEvent(tabEvent);

			expect(getControl().value).toBe('Apple');
		});

		it('should close and prevent focus move when pressing Tab while open', async () => {
			element.open = true;
			await elementUpdated(element);

			const tabEvent = new KeyboardEvent('keydown', {
				key: 'Tab',
				cancelable: true,
			});

			element.dispatchEvent(tabEvent);

			expect(tabEvent.defaultPrevented).toBe(true);
			expect(element.open).toBe(false);
		});
	});

	describe('on focusout', () => {
		it('should close', async () => {
			element.open = true;

			element.dispatchEvent(new FocusEvent('focusout'));

			expect(element.open).toBe(false);
		});

		it('should not close if focus moves to the host', async () => {
			element.open = true;
			element.dispatchEvent(
				new FocusEvent('focusout', {
					relatedTarget: element,
				})
			);

			expect(element.open).toBe(true);
		});
	});

	describe('a11y', () => {
		it('should mark the input control element with the correct a11y attributes', async () => {
			element.label = 'Test label';
			element.innerHTML = `
				<option value="1">1</option>
				<option value="2" selected>2</option>
				<option value="3">3</option>
				`;
			await elementUpdated(element);

			const control = await getControlElement(element);
			const label = element.shadowRoot?.querySelector('.label');
			const listbox = getListbox();

			expect(control.getAttribute('role')).toBe('combobox');
			expect(control.getAttribute('aria-haspopup')).toBe('listbox');
			expect(control.getAttribute('aria-controls')).toBe(listbox.id);
			expect(control.getAttribute('aria-expanded')).toBe('false');
			expect(label?.getAttribute('for')).toBe(control.id);
		});

		it('should update the aria-expanded attribute when the listbox is open', async () => {
			const control = await getControlElement(element);
			element.click();
			await elementUpdated(element);
			expect(control.getAttribute('aria-expanded')).toBe('true');
		});

		it('should pass html a11y test', async () => {
			element.label = 'Combobox label';
			await elementUpdated(element);

			expect(await axe(element)).toHaveNoViolations();
		});
	});
});
