import { elementUpdated, fixture } from '@vivid-nx/shared';
import '.';
import '../option';
import userEvent, { type UserEvent } from '@testing-library/user-event';
import { Popup } from '../popup/popup';
import { ListboxOption } from '../option/option';
import { Button } from '../button/button';
import { Icon } from '../icon/icon.ts';
import { VividFoundationButton } from '../../shared/foundation/button';
import { OptionTag } from './option-tag';
import { SearchableSelect } from './searchable-select';
import type { ProgressRing } from '../progress-ring/progress-ring';

// Workaround: Remove handleUnsupportedDelegatesFocus (which we don't need) because it breaks when used with user-event
Object.defineProperty(
	VividFoundationButton.prototype,
	'handleUnsupportedDelegatesFocus',
	{
		set() {},
		get() {
			return () => undefined;
		},
	}
);

const COMPONENT_TAG = 'vwc-searchable-select';
const OPTION_TAG = 'vwc-option';
const ICON_TAG = 'vwc-icon';

describe('vwc-searchable-select', () => {
	let element: SearchableSelect;

	let input: HTMLInputElement;
	let popup: Popup;
	let fieldset: HTMLDivElement;

	const focusInput = () => input.focus();
	const blurInput = () => input.blur();
	const typeInput = (value: string) => {
		input.value = value;
		input.dispatchEvent(new Event('input', { bubbles: true }));
	};
	const isInputFocused = () => element.shadowRoot!.activeElement === input;

	const pressKey = (key: string, opts?: any) => {
		const event = new KeyboardEvent('keydown', { key, ...opts });
		element.shadowRoot!.activeElement!.dispatchEvent(event);
		return event;
	};

	let user: UserEvent;
	const simulateClick = (target: HTMLElement) => user.click(target);

	const getOption = (text: string) =>
		element.querySelector(`vwc-option[text="${text}"]`) as ListboxOption;

	const getChevronIcon = () =>
		element.shadowRoot!.querySelector('vwc-icon.chevron') as Icon | null;

	const getProgressRing = () =>
		element.shadowRoot!.querySelector(
			'vwc-progress-ring'
		) as ProgressRing | null;

	const getTag = (label: string) =>
		element.shadowRoot!.querySelector(
			`vwc-option-tag[label="${label}"]`
		) as OptionTag;

	const getElidedOptionsCounterTag = () =>
		element.shadowRoot!.querySelector(
			`vwc-option-tag:not([removable])`
		) as OptionTag;

	const clickOnTagRemoveButton = (label: string) => {
		(
			getTag(label).shadowRoot!.querySelector('.remove-button') as HTMLElement
		).click();
	};

	const clickOnOption = (text: string) => {
		getOption(text).click();
	};

	const clickOnChevronIcon = () => {
		getChevronIcon()!.click();
	};

	const isOptionVisuallyHighlighted = (option: ListboxOption) =>
		option._highlighted;

	const getVisibleOptions = () =>
		Array.from(
			element.querySelectorAll('vwc-option') as NodeListOf<ListboxOption>
		)
			.filter((option) => !option.hidden && !option._isNotMatching)
			.map((option) => option.text);

	const getClearButton = () =>
		element.shadowRoot!.querySelector('[aria-label="Clear"]') as
			| Button
			| undefined;

	const getAriaLiveRegionText = () =>
		(
			element.shadowRoot!.querySelector('[aria-live]') as HTMLElement
		).textContent!.trim();

	const setUpFixture = async (template: string) => {
		const root = fixture(template);
		element = (
			root.tagName === COMPONENT_TAG.toUpperCase()
				? root
				: root.querySelector(COMPONENT_TAG)!
		) as SearchableSelect;
		input = element.shadowRoot!.querySelector('input') as HTMLInputElement;
		popup = element.shadowRoot!.querySelector('.popup') as Popup;
		fieldset = element.shadowRoot!.querySelector('.fieldset') as HTMLDivElement;
		await elementUpdated(element);
	};

	const selectOption = async (label: string) => {
		focusInput();
		await elementUpdated(element);

		clickOnOption(label);
		await elementUpdated(element);
	};

	beforeEach(async () => {
		user = userEvent.setup();
		await setUpFixture(`
			<${COMPONENT_TAG}>
				<${OPTION_TAG} value="apple" text="Apple"></${OPTION_TAG}>
				<${OPTION_TAG} value="banana" text="Banana"></${OPTION_TAG}>
				<${OPTION_TAG} value="cherry" text="Cherry"></${OPTION_TAG}>
			</${COMPONENT_TAG}>
		`);
	});

	const originalGetBoundingClientRect =
		HTMLElement.prototype.getBoundingClientRect;
	afterEach(() => {
		HTMLElement.prototype.getBoundingClientRect = originalGetBoundingClientRect;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-searchable-select', async () => {
			expect(element).toBeInstanceOf(SearchableSelect);
		});

		it('should allow being created via createElement', () => {
			// createElement may fail even though indirect instantiation through innerHTML etc. succeeds
			// This is because only createElement performs checks for custom element constructor requirements
			// See https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance
			expect(() => document.createElement(COMPONENT_TAG)).not.toThrow();
		});
	});

	describe('label', function () {
		it('should display a label if set', async function () {
			element.label = 'Label';
			await elementUpdated(element);

			expect(
				element.shadowRoot?.querySelector('label')!.textContent!.trim()
			).toBe('Label');
		});
	});

	describe('disabled', function () {
		beforeEach(async () => {
			element.disabled = true;
			await elementUpdated(element);
		});

		it('should disable the input', async function () {
			expect(input.disabled).toBe(true);
		});

		it('should disable option tags', async function () {
			element.multiple = true;
			element.values = ['apple'];
			await elementUpdated(element);

			expect(getTag('Apple').disabled).toBe(true);
		});

		it('should disable elided options counter', async function () {
			element.externalTags = true;
			element.multiple = true;
			element.values = ['apple'];
			await elementUpdated(element);

			expect(getElidedOptionsCounterTag().disabled).toBe(true);
		});

		it('should disable the clear button', async function () {
			element.clearable = true;
			element.values = ['apple'];
			await elementUpdated(element);

			expect(getClearButton()!.disabled).toBe(true);
		});

		it('should ignore clicks on options', async function () {
			element.open = true;
			await elementUpdated(element);

			clickOnOption('Banana');

			expect(element.values).toEqual([]);
		});

		it('should ignore clicks on the fieldset', async function () {
			fieldset.click();
			await elementUpdated(element);

			expect(popup.open).toBe(false);
		});
	});

	describe('values', () => {
		it('should be empty if no option is selected', () => {
			expect(element.values).toEqual([]);
		});

		it('should contain values of the selected option of single select', async () => {
			await selectOption('Apple');

			expect(element.values).toEqual(['apple']);
		});

		it('should contain values of the selected options of multi select in the order that they were selected in', async () => {
			element.multiple = true;
			await selectOption('Banana');
			await selectOption('Apple');

			expect(element.values).toEqual(['banana', 'apple']);
		});

		it('should remove invalid values', async () => {
			element.values = ['potato'];

			expect(element.values).toEqual([]);
		});

		it('should remove invalid values only after options are available', async () => {
			const searchableSelect = document.createElement(
				COMPONENT_TAG
			) as SearchableSelect;
			searchableSelect.multiple = true;
			searchableSelect.values = ['apple', 'banana', 'potato'];
			searchableSelect.innerHTML = `
				<${OPTION_TAG} value="apple" text="Apple"></${OPTION_TAG}>
				<${OPTION_TAG} value="banana" text="Banana"></${OPTION_TAG}>
			`;
			element.replaceWith(searchableSelect);
			await elementUpdated(searchableSelect);

			expect(searchableSelect.values).toEqual(['apple', 'banana']);
		});

		it('should remove additional values in single select', async () => {
			element.values = ['apple', 'banana'];

			expect(element.values).toEqual(['apple']);
		});
	});

	describe('clearable', () => {
		describe('if not set', () => {
			it('should not show the clear button if there are selected options', async () => {
				element.values = ['apple'];
				await elementUpdated(element);

				expect(getClearButton()).toBeNull();
			});
		});

		describe('if set', () => {
			beforeEach(async () => {
				element.clearable = true;
				await elementUpdated(element);
			});

			it('should not show the clear button if there are no selected options', async () => {
				expect(getClearButton()).toBeNull();
			});

			it('should show the clear button if there are selected options', async () => {
				element.values = ['apple'];
				await elementUpdated(element);

				expect(getClearButton()).not.toBeNull();
			});

			it('should clear the selected options when clicking on the clear button unless they are disabled', async () => {
				element.multiple = true;
				getOption('Banana').disabled = true;
				element.values = ['apple', 'banana'];
				await elementUpdated(element);

				getClearButton()!.click();

				expect(element.values).toEqual(['banana']);
			});
		});
	});

	describe('selectedIndex', () => {
		it('should be -1 if no option is selected', () => {
			expect(element.selectedIndex).toBe(-1);
		});

		it('should be the index of the first selected option', async () => {
			element.multiple = true;
			await elementUpdated(element);

			focusInput();
			await elementUpdated(element);

			clickOnOption('Banana');
			clickOnOption('Apple');

			expect(element.selectedIndex).toBe(1);
		});

		it('should select only the single option when set to index of option', async () => {
			element.multiple = true;
			element.values = ['apple', 'banana'];

			element.selectedIndex = 2;

			expect(element.values).toEqual(['cherry']);
		});

		it('should clear values when set to invalid index', async () => {
			element.multiple = true;
			element.values = ['apple', 'banana'];

			element.selectedIndex = 999;

			expect(element.values).toEqual([]);
		});
	});

	describe('value', () => {
		it('should use initial value to select that option', async () => {
			await setUpFixture(`
				<vwc-searchable-select value='banana'>
					<vwc-option value='apple' text='Apple'></vwc-option>
					<vwc-option value='banana' text='Banana'></vwc-option>
					<vwc-option value='cherry' text='Cherry'></vwc-option>
				</vwc-searchable-select>
			`);

			expect(element.values).toEqual(['banana']);
			expect(getOption('Banana').selected).toBe(true);
		});

		it("should be '' if no option is selected", () => {
			expect(element.value).toBe('');
		});

		it('should be the value of the first selected option', async () => {
			element.multiple = true;
			await elementUpdated(element);

			focusInput();
			await elementUpdated(element);

			clickOnOption('Banana');
			clickOnOption('Apple');

			expect(element.value).toBe('banana');
		});

		it('should select only the single option when set to value of option', async () => {
			element.multiple = true;
			element.values = ['apple', 'banana'];

			element.value = 'cherry';

			expect(element.values).toEqual(['cherry']);
		});

		it("should clear values when set to ''", async () => {
			element.multiple = true;
			element.values = ['apple', 'banana'];

			element.value = '';

			expect(element.values).toEqual([]);
		});

		it('should clear values when set to invalid value', async () => {
			element.multiple = true;
			element.values = ['apple', 'banana'];

			element.value = 'potato';

			expect(element.values).toEqual([]);
			expect(element.value).toEqual('');
		});
	});

	describe('slotted options', () => {
		it('should initialize to selected options', async () => {
			await setUpFixture(`
				<${COMPONENT_TAG} multiple>
					<${OPTION_TAG} value="apple" text="Apple" selected></${OPTION_TAG}>
					<${OPTION_TAG} value="banana" text="Banana" selected></${OPTION_TAG}>
					<${OPTION_TAG} value="cherry" text="Cherry" selected></${OPTION_TAG}>
				</${COMPONENT_TAG}>
			`);

			expect(element.values).toEqual(['apple', 'banana', 'cherry']);
		});

		it('should initialize to the first selected option for single select and remove selected from other options', async () => {
			await setUpFixture(`
				<${COMPONENT_TAG}>
					<${OPTION_TAG} value="apple" text="Apple" selected></${OPTION_TAG}>
					<${OPTION_TAG} value="banana" text="Banana" selected></${OPTION_TAG}>
					<${OPTION_TAG} value="cherry" text="Cherry" selected></${OPTION_TAG}>
				</${COMPONENT_TAG}>
			`);

			expect(element.values).toEqual(['apple']);
			expect(getOption('Banana').selected).toBe(false);
			expect(getOption('Cherry').selected).toBe(false);
		});

		it('should set selected on options that become selected', async () => {
			element.values = ['banana'];

			expect(getOption('Banana').selected).toBe(true);
		});

		it('should remove selected from options that become unselected', async () => {
			element.values = ['banana'];

			element.values = [];

			expect(getOption('Banana').selected).toBe(false);
		});

		it('should append new selected option to values', async () => {
			element.multiple = true;
			element.values = ['banana', 'apple'];

			const option = document.createElement(OPTION_TAG) as ListboxOption;
			option.value = 'durian';
			option.text = 'Durian';
			option.selected = true;
			element.appendChild(option);
			await elementUpdated(element);

			expect(element.values).toEqual(['banana', 'apple', 'durian']);
		});

		it('should remove option from values while maintaining order when a selected option is removed', async () => {
			element.multiple = true;
			element.values = ['banana', 'apple', 'cherry'];

			element.removeChild(getOption('Apple'));
			await elementUpdated(element);

			expect(element.values).toEqual(['banana', 'cherry']);
		});

		it('should add option to end of values when selected is set programmatically', async () => {
			element.multiple = true;
			element.values = ['banana'];

			getOption('Apple').selected = true;

			expect(element.values).toEqual(['banana', 'apple']);
		});

		it('should remove option from values if selected is removed programmatically', async () => {
			element.multiple = true;
			element.values = ['cherry', 'banana', 'apple'];

			getOption('Banana').selected = false;

			expect(element.values).toEqual(['cherry', 'apple']);
		});
	});

	describe('options', () => {
		it('should contain the option elements', () => {
			expect(element.options).toEqual([
				getOption('Apple'),
				getOption('Banana'),
				getOption('Cherry'),
			]);
		});
	});

	describe('selectedOptions', () => {
		it('should contain the selected option elements', () => {
			element.multiple = true;
			element.values = ['apple', 'banana'];

			expect(element.selectedOptions).toEqual([
				getOption('Apple'),
				getOption('Banana'),
			]);
		});
	});

	describe('multiple', () => {
		describe('when set to false', () => {
			it('should initialize input value to text of selected option', async () => {
				await setUpFixture(`
				<${COMPONENT_TAG}>
					<${OPTION_TAG} value="apple" text="Apple" selected></${OPTION_TAG}>
					<${OPTION_TAG} value="banana" text="Banana"></${OPTION_TAG}>
				</COMPONENT_TAG>
			`);

				expect(input.value).toBe('Apple');
			});

			it('should set input value to the text of the selected option even if a label is set', async () => {
				getOption('Banana').label = 'Label';
				element.value = 'banana';
				await elementUpdated(element);

				expect(input.value).toBe('Banana');
			});

			it('should clear input when unselecting an option', async () => {
				element.value = 'apple';
				await elementUpdated(element);

				focusInput();
				clickOnOption('Apple');
				await elementUpdated(element);

				expect(input.value).toBe('');
			});

			it('should clear input on blur when no option is selected', async () => {
				focusInput();
				typeInput('a');
				blurInput();
				await elementUpdated(element);

				expect(input.value).toBe('');
			});

			it('should set input value to selected option text on blur', async () => {
				element.value = 'apple';
				await elementUpdated(element);

				focusInput();
				typeInput('a');
				blurInput();
				await elementUpdated(element);

				expect(input.value).toBe('Apple');
			});

			it('should not initially filter options on focus', async () => {
				element.value = 'apple';
				await elementUpdated(element);

				focusInput();
				await elementUpdated(element);

				expect(getVisibleOptions()).toEqual(['Apple', 'Banana', 'Cherry']);
			});

			it('should not filter options after selecting an option', async () => {
				focusInput();
				await elementUpdated(element);

				clickOnOption('Apple');
				await elementUpdated(element);

				// Open popup again
				pressKey('ArrowDown');

				expect(getVisibleOptions()).toEqual(['Apple', 'Banana', 'Cherry']);
			});

			it('should start filtering options after input', async () => {
				element.value = 'apple';
				await elementUpdated(element);

				focusInput();
				typeInput('Appl');
				await elementUpdated(element);

				expect(getVisibleOptions()).toEqual(['Apple']);
			});

			it('should clear input on blur if no option is selected', async () => {
				focusInput();
				typeInput('a');
				blurInput();
				await elementUpdated(element);

				expect(input.value).toBe('');
			});

			it('should reset input value to current option label on blur', async () => {
				element.value = 'apple';
				await elementUpdated(element);

				focusInput();
				typeInput('a');
				blurInput();
				await elementUpdated(element);

				expect(input.value).toBe('Apple');
			});
		});

		describe('when set to true', () => {
			beforeEach(async () => {
				element.multiple = true;
				await elementUpdated(element);
			});

			it('should allow selecting multiple options', async () => {
				focusInput();
				await elementUpdated(element);

				clickOnOption('Apple');
				clickOnOption('Banana');
				await elementUpdated(element);

				expect(element.values).toEqual(['apple', 'banana']);
			});

			it('should clear input on blur', async () => {
				focusInput();
				typeInput('a');
				blurInput();
				await elementUpdated(element);

				expect(input.value).toBe('');
			});

			it('should remove option by clicking on tag', async () => {
				focusInput();
				await elementUpdated(element);

				clickOnOption('Apple');
				clickOnOption('Banana');
				await elementUpdated(element);

				clickOnTagRemoveButton('Apple');
				await elementUpdated(element);

				expect(element.values).toEqual(['banana']);
			});

			it('should focus the last tag when pressing ArrowLeft and the input is empty', async () => {
				element.values = ['apple', 'banana'];
				focusInput();
				await elementUpdated(element);

				pressKey('ArrowLeft');

				expect(element.shadowRoot!.activeElement).toBe(getTag('Banana'));
			});

			it('should not move focus or prevent default when pressing ArrowLeft while the input is not empty', async () => {
				element.values = ['apple', 'banana'];
				focusInput();
				typeInput('a');
				await elementUpdated(element);
				const keydownEvent = new KeyboardEvent('keydown', {
					key: 'ArrowLeft',
					cancelable: true,
				});

				input.dispatchEvent(keydownEvent);

				expect(element.shadowRoot!.activeElement).toBe(input);
				expect(keydownEvent.defaultPrevented).toBe(false);
			});

			it('should do nothing when pressing ArrowLeft while there are no tags to focus', async () => {
				focusInput();

				pressKey('ArrowLeft');

				expect(element.shadowRoot!.activeElement).toBe(input);
			});

			it('should focus the previous tag when pressing ArrowLeft', async () => {
				element.values = ['apple', 'banana'];
				await elementUpdated(element);
				getTag('Banana').focus();

				pressKey('ArrowLeft');

				expect(element.shadowRoot!.activeElement).toBe(getTag('Apple'));
			});

			it('should stay on the first tag when pressing ArrowLeft', async () => {
				element.values = ['apple', 'banana'];
				await elementUpdated(element);
				getTag('Apple').focus();

				pressKey('ArrowLeft');

				expect(element.shadowRoot!.activeElement).toBe(getTag('Apple'));
			});

			it('should focus the next tag when pressing ArrowRight', async () => {
				element.values = ['apple', 'banana'];
				await elementUpdated(element);
				getTag('Apple').focus();

				pressKey('ArrowRight');

				expect(element.shadowRoot!.activeElement).toBe(getTag('Banana'));
			});

			it('should focus the input when pressing ArrowRight on the last tag', async () => {
				element.values = ['apple', 'banana'];
				await elementUpdated(element);
				getTag('Banana').focus();

				pressKey('ArrowRight');

				expect(element.shadowRoot!.activeElement).toBe(input);
			});

			it.each(['Enter', ' ', 'Delete', 'Backspace'])(
				'should remove the focussed tag when pressing %s',
				async (key) => {
					element.values = ['apple', 'banana'];
					await elementUpdated(element);
					getTag('Banana').focus();

					pressKey(key);

					expect(element.values).toEqual(['apple']);
				}
			);

			it('should not prevent default when pressing other keys on tag', async () => {
				element.values = ['apple', 'banana'];
				await elementUpdated(element);
				getTag('Apple').focus();
				const keydownEvent = new KeyboardEvent('keydown', {
					key: 'Tab',
					cancelable: true,
				});

				getTag('Apple').dispatchEvent(keydownEvent);

				expect(keydownEvent.defaultPrevented).toBe(false);
			});

			it('should focus the next tag when deleting a tag', async () => {
				element.values = ['apple', 'banana'];
				await elementUpdated(element);
				getTag('Apple').focus();

				pressKey('Delete');

				expect(element.shadowRoot!.activeElement).toBe(getTag('Banana'));
			});

			it('should focus the input when deleting the last tag', async () => {
				element.values = ['apple'];
				await elementUpdated(element);
				getTag('Apple').focus();

				pressKey('Delete');

				expect(element.shadowRoot!.activeElement).toBe(input);
			});

			it('should show the options label in the tag if set', async () => {
				getOption('Apple').label = 'Label';
				element.values = ['apple'];
				await elementUpdated(element);

				expect(getTag('Label')).not.toBeNull();
			});

			it('should process keydown of Backspace normally when the input is not empty', async () => {
				element.values = ['apple'];
				focusInput();
				typeInput('a');
				await elementUpdated(element);

				const keydownEvent = pressKey('Backspace');

				expect(element.values).toEqual(['apple']);
				expect(keydownEvent.defaultPrevented).toBe(false);
			});

			it('should remove the last selected option when pressing Backspace on an empty input', async () => {
				element.values = ['apple', 'banana'];
				focusInput();
				await elementUpdated(element);

				pressKey('Backspace');

				expect(element.values).toEqual(['apple']);
			});

			it('should not throw an error when pressing Backspace on an empty input without selected options', async () => {
				focusInput();

				expect(() => pressKey('Backspace')).not.toThrow();
			});

			it('should disable the tag of an disabled option', async () => {
				getOption('Apple').disabled = true;
				element.values = ['apple'];
				await elementUpdated(element);

				expect(getTag('Apple').disabled).toBe(true);
			});

			it('should ignore disabled option tags when pressing ArrowLeft', async () => {
				getOption('Banana').disabled = true;
				element.values = ['apple', 'banana'];
				focusInput();
				await elementUpdated(element);

				pressKey('ArrowLeft');

				expect(element.shadowRoot!.activeElement).toBe(getTag('Apple'));
			});

			it('should ignore disabled option tags when pressing ArrowRight', async () => {
				getOption('Banana').disabled = true;
				element.values = ['apple', 'banana'];
				await elementUpdated(element);
				getTag('Apple').focus();

				pressKey('ArrowRight');

				expect(element.shadowRoot!.activeElement).toBe(input);
			});

			it('should ignore elided option tags when pressing ArrowLeft', async () => {
				HTMLElement.prototype.getBoundingClientRect = vi.fn(
					() =>
						({
							width: 100,
						} as DOMRect)
				);
				element.maxLines = 1;
				element.values = ['apple', 'banana'];
				focusInput();
				await elementUpdated(element);
				getTag('Banana').focus();

				pressKey('ArrowLeft');

				expect(element.shadowRoot!.activeElement).toBe(getTag('Banana'));
			});
		});
	});

	describe('externalTags', () => {
		it('should display only the elided options counter if set', async () => {
			element.multiple = true;
			element.externalTags = true;
			element.values = ['apple', 'banana'];
			await elementUpdated(element);

			expect(getTag('Apple')).toBeNull();
			expect(getTag('Banana')).toBeNull();
			expect(getElidedOptionsCounterTag().label).toBe('2');
		});
	});

	describe('tag layout', () => {
		let resizeObserverCallback;
		let resizeObserverDisconnected = false;
		let currentWrapperWidth: any;

		const getLayout = () =>
			Array.from(element.shadowRoot!.querySelectorAll('.tag-row')).map((row) =>
				Array.from(row.querySelectorAll('.tag, input')).map((element) => {
					if (element.tagName === 'INPUT') {
						return 'input';
					} else {
						return (element as any).label;
					}
				})
			);

		const layout = async (
			wrapperWidth: number,
			tagsWidths: number[],
			maxLines?: number
		) => {
			currentWrapperWidth = wrapperWidth;
			window.ResizeObserver = class ResizeObserver {
				constructor(callback: any) {
					resizeObserverCallback = callback;
				}

				observe() {}
				disconnect() {
					resizeObserverDisconnected = true;
				}
			} as any;
			HTMLElement.prototype.getBoundingClientRect = vi.fn(function (
				this: SearchableSelect
			) {
				if (this.tagName === 'DIV') {
					return {
						width: currentWrapperWidth,
					} as any;
				}
				if (this.label.startsWith('option')) {
					const index = parseInt(this.label.split(' ')[1]);
					return {
						width: tagsWidths[index],
					} as any;
				}
				return {
					width: parseInt(this.label) * 10,
				} as any;
			});
			await setUpFixture(`
				<${COMPONENT_TAG} multiple ${maxLines ? `max-lines="${maxLines}"` : ''}>
					${tagsWidths
						.map(
							(_, i) =>
								`<${OPTION_TAG} value="${i}" text="option ${i}" selected></${OPTION_TAG}>`
						)
						.join('')}
				</${COMPONENT_TAG}>
			`);
			return getLayout();
		};

		it('should layout tags on the first line', async () => {
			expect(await layout(300, [50, 50])).toEqual([
				['option 0', 'option 1', 'input'],
			]);
		});

		it('should elide tags instead of wrapping when max lines is reached', async () => {
			expect(await layout(300, [250, 50], 1)).toEqual([
				['1', 'option 1', 'input'],
			]);
		});

		it("should move input to the next line if there isn't enough space", async () => {
			expect(await layout(300, [250])).toEqual([['option 0'], ['input']]);
		});

		it('should always show the last tag when max lines is used', async () => {
			expect(await layout(300, [50, 250], 1)).toEqual([
				['1', 'option 1', 'input'],
			]);
		});

		it('should prefer placing tags on lines further up', async () => {
			expect(await layout(300, [200, 200, 50], 2)).toEqual([
				['1', 'option 1', 'option 2'],
				['input'],
			]);
		});

		it('should update layout on resize', async () => {
			await layout(300, [200, 50]);
			currentWrapperWidth = 200;
			resizeObserverCallback!();
			await elementUpdated(element);

			expect(getLayout()).toEqual([['option 0'], ['option 1', 'input']]);
		});

		it('should disconnect the resize observer when disconnected', async () => {
			await layout(300, [200, 50]);
			element.remove();

			expect(resizeObserverDisconnected).toBe(true);
		});
	});

	describe('fixedDropdown', () => {
		function setBoundingClientRect(width: number) {
			element.getBoundingClientRect = vi.fn().mockReturnValue({ width });
		}

		async function toggleOpenState(open = true) {
			element.open = open;
			await elementUpdated(element);
		}

		it('should use absolute strategy when fixedDropdown is not set', () => {
			expect(popup.strategy).toBe('absolute');
		});

		it('should use fixed strategy when fixedDropdown is set', async () => {
			element.fixedDropdown = true;
			await elementUpdated(element);

			expect(popup.strategy).toBe('fixed');
		});

		it('should set --_searchable-select-fixed-width to the width of the select on open', async function () {
			const width = 50;
			element.fixedDropdown = true;
			setBoundingClientRect(width);
			await toggleOpenState(true);

			expect(popup.getAttribute('style')).toEqual(
				`--_searchable-select-fixed-width: ${width}px`
			);
		});

		it('should round the width set to --_searchable-select-fixed-width', async function () {
			const width = 50.5;
			const expectedWidth = Math.round(width);
			element.fixedDropdown = true;
			setBoundingClientRect(width);
			await toggleOpenState(true);

			expect(popup.getAttribute('style')).toEqual(
				`--_searchable-select-fixed-width: ${expectedWidth}px`
			);
		});

		it('should update the width on each opening', async function () {
			const width = 50;
			element.fixedDropdown = true;

			setBoundingClientRect(30);
			await toggleOpenState(true);

			setBoundingClientRect(width);
			await toggleOpenState(false);
			await toggleOpenState(true);

			expect(popup.getAttribute('style')).toEqual(
				`--_searchable-select-fixed-width: ${width}px`
			);
		});
	});

	describe('placeholder', () => {
		it('should display the placeholder when no options are selected', async () => {
			element.placeholder = 'Placeholder';
			await elementUpdated(element);
			expect(input.placeholder).toBe('Placeholder');
		});

		it('should display the placeholder when an option is selected and multiple is false', async () => {
			element.values = ['apple'];
			element.placeholder = 'Placeholder';
			await elementUpdated(element);
			expect(input.placeholder).toBe('Placeholder');
		});

		it('should not display placeholder when an option is selected and multiple is true', async () => {
			element.multiple = true;
			element.values = ['apple'];
			element.placeholder = 'Placeholder';
			await elementUpdated(element);
			expect(input.placeholder).toBe('');
		});
	});

	describe('loading', () => {
		it('should replace the chevron with an indeterminate progress ring when true', async () => {
			element.loading = true;
			await elementUpdated(element);

			expect(getChevronIcon()).toBe(null);
			expect(getProgressRing()).not.toBe(null);
			expect(getProgressRing()!.value).toBe(undefined);
		});

		it('should display the loading empty state when there are no options to display', async () => {
			await setUpFixture(`<${COMPONENT_TAG} loading></${COMPONENT_TAG}>`);
			focusInput();
			await elementUpdated(element);

			expect(
				element.shadowRoot!.querySelector('.empty-message')!.textContent!.trim()
			).toBe('Loading...');
		});
	});

	describe('optionFilter', () => {
		it('should default to undefined', () => {
			expect(element.optionFilter).toBe(undefined);
		});

		it('should be called with an option and searchText', async () => {
			element.optionFilter = vi.fn(() => false);
			await elementUpdated(element);

			focusInput();
			typeInput('search text');
			await elementUpdated(element);

			expect(element.optionFilter).toHaveBeenCalledTimes(3);
			expect(vi.mocked(element.optionFilter).mock.calls[0][0]).toBe(
				getOption('Apple')
			);
			expect(vi.mocked(element.optionFilter).mock.calls[0][1]).toBe(
				'search text'
			);
		});

		it('should only display options for which it returns true', async () => {
			element.optionFilter = (option) => option.text === 'Banana';
			await elementUpdated(element);

			focusInput();
			typeInput('search text');
			await elementUpdated(element);

			expect(getVisibleOptions()).toEqual(['Banana']);
		});

		it('should update the filtered options when changed', async () => {
			focusInput();
			typeInput('search text');
			await elementUpdated(element);

			element.optionFilter = (option) => option.text === 'Banana';

			expect(getVisibleOptions()).toEqual(['Banana']);
		});
	});

	describe('searchText', () => {
		it('should return the current input value when it is used for searching', async () => {
			focusInput();
			typeInput('search text');
			await elementUpdated(element);

			expect(element.searchText).toBe('search text');
		});

		it('should be empty when the input value is not used for searching', async () => {
			getOption('Apple').selected = true;
			await elementUpdated(element);

			focusInput();

			expect(element.searchText).toBe('');
		});
	});

	describe('search-text-change', () => {
		it('should fire when the search text changes', async () => {
			const eventSpy = vi.fn();
			element.addEventListener('search-text-change', eventSpy);
			focusInput();
			typeInput('search text');
			await elementUpdated(element);

			expect(eventSpy).toHaveBeenCalledTimes(1);
		});

		it('should be a non-bubbling and non-composed event', async () => {
			const eventSpy = vi.fn();
			element.addEventListener('search-text-change', eventSpy);
			focusInput();
			typeInput('search text');
			await elementUpdated(element);

			expect(eventSpy.mock.lastCall![0].bubbles).toBe(false);
			expect(eventSpy.mock.lastCall![0].composed).toBe(false);
		});
	});

	describe.each(['input', 'change'])('%s event', (eventName) => {
		let eventSpy: vi.Mock;
		beforeEach(async () => {
			eventSpy = vi.fn();
			element.addEventListener(eventName, eventSpy);
			focusInput();
			await elementUpdated(element);
		});

		it('should fire when an option is selected', async () => {
			clickOnOption('Apple');

			expect(eventSpy).toHaveBeenCalledTimes(1);
		});

		it('should fire when an option is unselected', async () => {
			element.values = ['apple'];
			await elementUpdated(element);

			clickOnOption('Apple');

			expect(eventSpy).toHaveBeenCalledTimes(1);
		});

		it('should fire when options are cleared by clicking the clear button', async () => {
			element.clearable = true;
			element.values = ['apple'];
			await elementUpdated(element);

			getClearButton()!.click();

			expect(eventSpy).toHaveBeenCalledTimes(1);
		});

		it('should fire when unselecting an option by clicking on the tag', async () => {
			element.multiple = true;
			element.values = ['apple'];
			await elementUpdated(element);

			clickOnTagRemoveButton('Apple');

			expect(eventSpy).toHaveBeenCalledTimes(1);
		});

		it('should fire when the form is reset', async () => {
			await setUpFixture(`
				<form>
					<${COMPONENT_TAG} name="fruit">
						<${OPTION_TAG} value="apple" text="Apple" selected></${OPTION_TAG}>
					</${COMPONENT_TAG}>
				</form>
			`);
			element.addEventListener(eventName, eventSpy);

			element.closest('form')!.reset();

			expect(eventSpy).toHaveBeenCalledTimes(1);
		});

		it('should not fire when values is changed programmatically', async () => {
			element.values = ['apple'];

			expect(eventSpy).toHaveBeenCalledTimes(0);
		});

		it('should not bubble', async () => {
			clickOnOption('Apple');

			expect(eventSpy.mock.lastCall[0].bubbles).toBe(false);
		});

		it('should stop the event from bubbling from the internal input', () => {
			const event = new Event(eventName, { bubbles: true, composed: true });
			input.dispatchEvent(event);

			expect(eventSpy).toHaveBeenCalledTimes(0);
		});
	});

	describe('focus method', () => {
		it('should focus the input', async () => {
			// Add a tag which would receive focus if we were using delegatesFocus
			element.multiple = true;
			element.values = ['apple'];
			await elementUpdated(element);

			element.focus();

			expect(input).toBe(element.shadowRoot!.activeElement);
		});

		it('should not throw when component is unconnected', async () => {
			const element = document.createElement(COMPONENT_TAG) as SearchableSelect;
			expect(() => element.focus()).not.toThrow();
		});
	});

	describe('popup', () => {
		it('should open when input is focused', async function () {
			focusInput();
			await elementUpdated(element);

			expect(popup.open).toBe(true);
		});

		it('should not open when clicking on the clear button inside the fieldset', async function () {
			element.values = ['apple'];
			element.clearable = true;
			await elementUpdated(element);

			getClearButton()!.click();
			await elementUpdated(element);

			expect(popup.open).toBe(false);
		});

		it('should not open when clicking on tag remove button', async function () {
			element.multiple = true;
			element.values = ['apple'];
			await elementUpdated(element);

			clickOnTagRemoveButton('Apple');
			await elementUpdated(element);

			expect(popup.open).toBe(false);
		});

		describe('when popup is open', () => {
			beforeEach(async () => {
				focusInput();
				await elementUpdated(element);
			});

			it('should close popup when input is blurred', async function () {
				blurInput();
				await elementUpdated(element);

				expect(popup.open).toBe(false);
			});

			it('should close popup when pressing Escape', async function () {
				pressKey('Escape');
				await elementUpdated(element);

				expect(popup.open).toBe(false);
			});

			it('should close popup when clicking the chevron icon', async function () {
				clickOnChevronIcon();
				await elementUpdated(popup);

				expect(popup.open).toBe(false);
			});
		});

		describe('when popup is closed while input has focus', () => {
			beforeEach(async () => {
				focusInput();
				pressKey('Escape');
				await elementUpdated(element);
			});

			it.each(['Escape', 'Enter', 'ArrowLeft', 'Backspace'])(
				'should not open popup when pressing %s',
				async function (key: string) {
					pressKey(key);
					await elementUpdated(element);

					expect(popup.open).toBe(false);
				}
			);

			it.each([
				'ArrowDown',
				'ArrowUp',
				'ArrowRight',
				'Home',
				'End',
				'PageUp',
				'PageDown',
				'A',
			])(
				'should open popup when pressing any other key (%s)',
				async function (key: string) {
					pressKey(key);
					await elementUpdated(element);

					expect(popup.open).toBe(true);
				}
			);

			it('should open popup when clicking the chevron icon', async function () {
				clickOnChevronIcon();
				await elementUpdated(popup);

				expect(popup.open).toBe(true);
			});
		});
	});

	describe('options filtering', () => {
		it('should display all options if no text is entered', async function () {
			focusInput();
			await elementUpdated(element);

			expect(getVisibleOptions()).toEqual(['Apple', 'Banana', 'Cherry']);
		});

		it('should filter visible options based on entered text', async function () {
			focusInput();
			await elementUpdated(element);

			typeInput('a');
			await elementUpdated(element);

			expect(getVisibleOptions()).toEqual(['Apple', 'Banana']);
		});

		it('should not highlight a matched range when no text is entered', async function () {
			focusInput();
			await elementUpdated(element);

			expect(getOption('Apple')._vvdSearchText).toBe('');
		});

		it('should highlight matched text of options', async function () {
			focusInput();
			await elementUpdated(element);

			typeInput('a');
			await elementUpdated(element);

			expect(getOption('Apple')._vvdSearchText).toBe('a');
			expect(getOption('Banana')._vvdSearchText).toBe('a');
		});

		it('should display an empty state if options are available', async function () {
			await setUpFixture(`<${COMPONENT_TAG}></${COMPONENT_TAG}>`);
			focusInput();
			await elementUpdated(element);

			expect(
				element.shadowRoot!.querySelector('.empty-message')!.textContent!.trim()
			).toBe('No options');
		});

		it('should display an empty state if options match the search text', async function () {
			focusInput();
			await elementUpdated(element);

			typeInput('abc');
			await elementUpdated(element);

			expect(getVisibleOptions()).toEqual([]);
			expect(
				element.shadowRoot!.querySelector('.empty-message')!.textContent!.trim()
			).toBe('No options found');
		});
	});

	describe('option interaction', () => {
		it('should select an option by clicking on it', async function () {
			focusInput();
			await elementUpdated(element);

			clickOnOption('Banana');

			expect(element.values).toEqual(['banana']);
		});

		it('should ignore clicks on disabled options', async function () {
			getOption('Banana').disabled = true;
			focusInput();
			await elementUpdated(element);

			clickOnOption('Banana');

			expect(element.values).toEqual([]);
		});

		it('should unselect an option by clicking on it', async function () {
			element.value = 'banana';
			focusInput();
			await elementUpdated(element);

			clickOnOption('Banana');

			expect(element.values).toEqual([]);
		});

		it('should unselect an option by clicking on it when multiple is true', async function () {
			element.multiple = true;
			element.values = ['banana'];
			focusInput();
			await elementUpdated(element);

			clickOnOption('Banana');

			expect(element.values).toEqual([]);
		});
	});

	describe('visual highlighting', () => {
		it('should ignore key presses if ctrl is held down', async function () {
			focusInput();
			await elementUpdated(element);

			pressKey('ArrowDown', { ctrlKey: true });

			expect(isOptionVisuallyHighlighted(getOption('Apple'))).toBe(false);
		});

		it('should ignore key presses if shift is held down', async function () {
			focusInput();
			await elementUpdated(element);

			pressKey('ArrowDown', { shiftKey: true });

			expect(isOptionVisuallyHighlighted(getOption('Apple'))).toBe(false);
		});

		it('should visually highlight the first option when pressing ArrowDown', async function () {
			focusInput();
			await elementUpdated(element);

			pressKey('ArrowDown');

			expect(isOptionVisuallyHighlighted(getOption('Apple'))).toBe(true);
		});

		it('should visually highlight the first option when pressing Home', async function () {
			focusInput();
			await elementUpdated(element);
			pressKey('ArrowUp');

			pressKey('Home');

			expect(isOptionVisuallyHighlighted(getOption('Apple'))).toBe(true);
			expect(isOptionVisuallyHighlighted(getOption('Cherry'))).toBe(false);
		});

		it('should visually highlight the last option when pressing End', async function () {
			focusInput();
			await elementUpdated(element);
			pressKey('ArrowDown');

			pressKey('End');

			expect(isOptionVisuallyHighlighted(getOption('Apple'))).toBe(false);
			expect(isOptionVisuallyHighlighted(getOption('Cherry'))).toBe(true);
		});

		describe('pagination', () => {
			beforeEach(async () => {
				await setUpFixture(`
				<${COMPONENT_TAG}>
					${Array.from({ length: 30 })
						.map(
							(_, i) =>
								`<${OPTION_TAG} value="${i}" text="${i}"></${OPTION_TAG}>`
						)
						.join('')}
				</${COMPONENT_TAG}>
			`);
			});

			it('should visually highlight the tenth option when pressing PageDown', async function () {
				focusInput();
				await elementUpdated(element);

				pressKey('PageDown');

				expect(isOptionVisuallyHighlighted(getOption('9'))).toBe(true);
			});

			it('should advance visual focus by ten when pressing PageDown', async function () {
				focusInput();
				await elementUpdated(element);

				pressKey('PageDown');
				pressKey('PageDown');

				expect(isOptionVisuallyHighlighted(getOption('9'))).toBe(false);
				expect(isOptionVisuallyHighlighted(getOption('19'))).toBe(true);
			});

			it('should stay on last option when pressing PageDown', async function () {
				focusInput();
				await elementUpdated(element);

				pressKey('PageDown');
				pressKey('PageDown');
				pressKey('PageDown');
				pressKey('PageDown');

				expect(isOptionVisuallyHighlighted(getOption('29'))).toBe(true);
			});

			it('should visually highlight the tenth option from the end when pressing PageUp', async function () {
				focusInput();
				await elementUpdated(element);

				pressKey('PageUp');

				expect(isOptionVisuallyHighlighted(getOption('20'))).toBe(true);
			});

			it('should decrease visual focus by ten when pressing PageUp', async function () {
				focusInput();
				await elementUpdated(element);

				pressKey('PageUp');
				pressKey('PageUp');

				expect(isOptionVisuallyHighlighted(getOption('20'))).toBe(false);
				expect(isOptionVisuallyHighlighted(getOption('10'))).toBe(true);
			});

			it('should stay on first option when pressing PageUp', async function () {
				focusInput();
				await elementUpdated(element);

				pressKey('PageUp');
				pressKey('PageUp');
				pressKey('PageUp');
				pressKey('PageUp');

				expect(isOptionVisuallyHighlighted(getOption('0'))).toBe(true);
			});
		});

		it('should select visually highlighted option when pressing enter', async function () {
			focusInput();
			await elementUpdated(element);

			pressKey('ArrowDown');
			pressKey('Enter');

			expect(element.values).toEqual(['apple']);
		});

		it('should visually highlight the next option when pressing ArrowDown', async function () {
			focusInput();
			await elementUpdated(element);

			pressKey('Home');
			pressKey('ArrowDown');

			expect(isOptionVisuallyHighlighted(getOption('Apple'))).toBe(false);
			expect(isOptionVisuallyHighlighted(getOption('Banana'))).toBe(true);
		});

		it('should stay on the last option when pressing ArrowDown', async function () {
			focusInput();
			await elementUpdated(element);

			pressKey('End');
			pressKey('ArrowDown');

			expect(isOptionVisuallyHighlighted(getOption('Cherry'))).toBe(true);
		});

		it('should visually highlight the previous option when pressing ArrowUp', async function () {
			focusInput();
			await elementUpdated(element);

			pressKey('End');
			pressKey('ArrowUp');

			expect(isOptionVisuallyHighlighted(getOption('Banana'))).toBe(true);
			expect(isOptionVisuallyHighlighted(getOption('Cherry'))).toBe(false);
		});

		it('should stay on the first option when pressing ArrowUp', async function () {
			focusInput();
			await elementUpdated(element);

			pressKey('Home');
			pressKey('ArrowUp');

			expect(isOptionVisuallyHighlighted(getOption('Apple'))).toBe(true);
		});

		it('should clear highlighted option when filtered options change', async function () {
			focusInput();
			await elementUpdated(element);

			pressKey('ArrowDown');
			typeInput('a');

			expect(isOptionVisuallyHighlighted(getOption('Apple'))).toBe(false);
		});

		it('should not throw an error when attempting to visually highlight an option when there are none', async function () {
			await setUpFixture(`<${COMPONENT_TAG}></${COMPONENT_TAG}>`);

			focusInput();
			await elementUpdated(element);

			expect(() => pressKey('ArrowDown')).not.toThrow();
		});

		it('should ignore disabled options', async function () {
			await setUpFixture(`
				<${COMPONENT_TAG}>
					<${OPTION_TAG} value="apple" text="Apple" disabled></${OPTION_TAG}>
					<${OPTION_TAG} value="banana" text="Banana"></${OPTION_TAG}>
				</${COMPONENT_TAG}>
			`);

			focusInput();
			await elementUpdated(element);

			pressKey('ArrowDown');

			expect(isOptionVisuallyHighlighted(getOption('Apple'))).toBe(false);
			expect(isOptionVisuallyHighlighted(getOption('Banana'))).toBe(true);
		});
	});

	describe('focus management of input', () => {
		it('should focus input when clicking on elided options counter tag', async () => {
			element.externalTags = true;
			element.multiple = true;
			element.values = ['apple'];
			await elementUpdated(element);

			await simulateClick(getElidedOptionsCounterTag());

			expect(isInputFocused()).toBe(true);
		});

		it('should focus input when clicking on option tag', async () => {
			element.multiple = true;
			element.values = ['apple'];
			await elementUpdated(element);

			await simulateClick(getTag('Apple'));

			expect(isInputFocused()).toBe(true);
		});

		it('should focus input when clicking on a non-interactive part of the component', async () => {
			element.helperText = 'Helper text';
			// Add a tag which would receive focus if we were using delegatesFocus
			element.multiple = true;
			element.values = ['apple'];
			await elementUpdated(element);

			await simulateClick(
				element.shadowRoot!.querySelector('.helper-message')!
			);

			expect(isInputFocused()).toBe(true);
		});

		it('should not focus input when clicking on the clear button', async () => {
			element.clearable = true;
			element.values = ['apple'];
			await elementUpdated(element);

			await user.click(getClearButton()!);

			expect(isInputFocused()).toBe(false);
		});

		it('should not focus input when clicking on the button part of a tag', async () => {
			element.multiple = true;
			element.values = ['apple'];
			await elementUpdated(element);

			await user.click(getTag('apple').shadowRoot!.querySelector('button')!);

			expect(isInputFocused()).toBe(false);
		});

		it('should not focus input when clicking on listbox', async () => {
			element.open = true;
			await elementUpdated(element);

			await simulateClick(getOption('Apple'));

			expect(isInputFocused()).toBe(false);
		});

		it('should keep focus on input when clicking on the button part of a tag', async () => {
			focusInput();
			element.multiple = true;
			element.values = ['apple'];
			await elementUpdated(element);

			await user.click(
				getTag('apple').shadowRoot!.querySelector('[role="button"]')!
			);

			expect(isInputFocused()).toBe(true);
		});

		it('should keep focus on input when clicking on clear button', async () => {
			focusInput();
			element.clearable = true;
			element.values = ['apple'];
			await elementUpdated(element);

			await simulateClick(getClearButton()!);

			expect(isInputFocused()).toBe(true);
		});

		it('should keep focus on input when clicking on listbox', async () => {
			focusInput();
			await elementUpdated(element);

			await simulateClick(getOption('Apple'));

			expect(isInputFocused()).toBe(true);
		});
	});

	describe('required', () => {
		it('should have valueMissing error if no option is selected', async () => {
			await setUpFixture(`
				<${COMPONENT_TAG} name="fruit" required>
					<${OPTION_TAG} value="apple" text="Apple"></${OPTION_TAG}>
				</${COMPONENT_TAG}>
			`);

			expect(element.validity.valid).toBe(false);
			expect(element.validity.valueMissing).toBe(true);
		});

		it('should be valid if an option is selected', async () => {
			await setUpFixture(`
				<${COMPONENT_TAG} name="fruit" required>
					<${OPTION_TAG} value="apple" text="Apple" selected></${OPTION_TAG}>
				</${COMPONENT_TAG}>
			`);

			expect(element.validity.valid).toBe(true);
		});
	});

	describe('initialValue', () => {
		it('should initialize values to initialValue', async () => {
			const component = document.createElement(
				COMPONENT_TAG
			) as SearchableSelect;
			component.innerHTML = `
				<${OPTION_TAG} value="apple" text="Apple"></${OPTION_TAG}>
				<${OPTION_TAG} value="banana" text="Banana"></${OPTION_TAG}>
			`;

			component.initialValue = 'banana';
			element.replaceWith(component);

			expect(component.values).toEqual(['banana']);
		});

		it('should set values if values have not been explicitly set', async () => {
			element.initialValue = 'apple';

			expect(element.values).toEqual(['apple']);
		});

		it('should not set values if values has already been explicitly set', async () => {
			element.values = ['banana'];

			element.initialValue = 'apple';

			expect(element.values).toEqual(['banana']);
		});
	});

	describe('initialValues', () => {
		it('should initialize values to initialValues', async () => {
			const component = document.createElement(
				COMPONENT_TAG
			) as SearchableSelect;
			component.innerHTML = `
				<${OPTION_TAG} value="apple" text="Apple"></${OPTION_TAG}>
				<${OPTION_TAG} value="banana" text="Banana"></${OPTION_TAG}>
			`;

			component.initialValues = ['banana'];
			element.replaceWith(component);

			expect(component.values).toEqual(['banana']);
		});

		it('should set values if values have not been explicitly set', async () => {
			element.initialValues = ['apple'];

			expect(element.values).toEqual(['apple']);
		});

		it('should not set values if values have already been explicitly set', async () => {
			element.values = ['banana'];

			element.initialValues = ['apple'];

			expect(element.values).toEqual(['banana']);
		});
	});

	describe('form reset', () => {
		let form: HTMLFormElement;
		beforeEach(async () => {
			await setUpFixture(`
				<form>
					<${COMPONENT_TAG} name="fruit" required>
						<${OPTION_TAG} value="apple" text="Apple"></${OPTION_TAG}>
						<${OPTION_TAG} value="banana" text="Banana"></${OPTION_TAG}>
					</${COMPONENT_TAG}>
				</form>
			`);
			form = element.closest('form') as HTMLFormElement;
		});

		it('should clear values by default', async () => {
			element.values = ['banana'];

			form.reset();

			expect(element.values).toEqual([]);
		});

		it('should reset values to initialValues', async () => {
			element.values = ['banana'];
			element.initialValues = ['apple'];

			form.reset();

			expect(element.values).toEqual(['apple']);
		});

		it('should reset values to initialValue', async () => {
			element.values = ['banana'];
			element.initialValue = 'apple';

			form.reset();

			expect(element.values).toEqual(['apple']);
		});

		it('should prefer initialValues over initialValue if both are present', async () => {
			element.values = ['banana'];
			element.initialValues = ['apple'];
			element.initialValue = 'banana';

			form.reset();

			expect(element.values).toEqual(['apple']);
		});
	});

	describe('option tag icon', () => {
		let icon: Icon;
		beforeEach(async () => {
			await setUpFixture(`
				<${COMPONENT_TAG} multiple>
					<${OPTION_TAG} value="apple" text="Apple" selected>
						<${ICON_TAG} slot="tag-icon" name="apple-mono"></${ICON_TAG}>
					</${OPTION_TAG}>
				</${COMPONENT_TAG}>
			`);
			const tagIconSlot = getTag('Apple').shadowRoot!.querySelector(
				'slot[name="icon"]'
			) as HTMLSlotElement;
			const iconForwarderSlot =
				tagIconSlot.assignedElements()[0] as HTMLSlotElement;
			icon = iconForwarderSlot.assignedElements()[0] as Icon;
		});

		it('should display an icon placed into the tag-icon slot of a selected option in the tag', async () => {
			expect(icon.tagName).toBe(ICON_TAG.toUpperCase());
			expect(icon.name).toBe('apple-mono');
		});

		it('should clone the icon into the light DOM', async () => {
			expect(icon).not.toBe(element.querySelector('[slot="tag-icon"]'));
			expect(icon.getRootNode()).toBe(document);
		});

		it('should cleanup the cloned icon when the option is unselected', async () => {
			element.values = [];

			expect(element.querySelectorAll(ICON_TAG).length).toBe(1);
		});
	});

	describe('fieldset', () => {
		it('should open the popup when clicking on the fieldset when input already has focus', async function () {
			focusInput();
			element.open = false;
			await elementUpdated(element);

			fieldset.click();
			await elementUpdated(element);

			expect(popup.open).toBe(true);
		});
	});

	describe('a11y attributes', () => {
		it('should describe the visually highlighted option in an aria-live region', async () => {
			focusInput();
			await elementUpdated(element);

			pressKey('ArrowDown');
			await elementUpdated(element);

			expect(getAriaLiveRegionText()).toBe('Option Apple focused, 1 of 3.');
		});

		it('should describe that an option has been selected in an aria-live region', async () => {
			await selectOption('Apple');

			expect(getAriaLiveRegionText()).toBe('Option Apple selected.');
		});

		it('should describe that an option has been deselected in an aria-live region', async () => {
			await selectOption('Apple');

			clickOnOption('Apple');
			await elementUpdated(element);

			expect(getAriaLiveRegionText()).toBe('Option Apple deselected.');
		});

		it('should clear the aria-live region on blur', async () => {
			await selectOption('Apple');

			blurInput();
			await elementUpdated(element);

			expect(getAriaLiveRegionText()).toBe('');
		});
	});
});
