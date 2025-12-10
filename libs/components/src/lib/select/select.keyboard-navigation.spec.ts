import 'element-internals-polyfill';

import { elementUpdated, fixture } from '@repo/shared';
import {
	keyArrowDown,
	keyArrowUp,
	keyEnd,
	keyHome,
} from '@microsoft/fast-web-utilities';
import { ListboxOption } from '../option/option';
import { Select } from './select';
import '.';

describe('vwc-select keyboard navigation', () => {
	let originalScrollIntoView: typeof HTMLElement.prototype.scrollIntoView;

	beforeAll(() => {
		originalScrollIntoView = HTMLElement.prototype.scrollIntoView;
		HTMLElement.prototype.scrollIntoView = vi.fn();
	});

	afterAll(() => {
		HTMLElement.prototype.scrollIntoView = originalScrollIntoView;
	});

	async function setupSelect(html: string) {
		const element = (await fixture(html)) as Select;

		const focus = () => {
			element.focus();
		};

		const pressKey = async (key: string, options?: { shiftKey?: boolean }) => {
			element.dispatchEvent(
				new KeyboardEvent('keydown', { key, shiftKey: options?.shiftKey })
			);
			await elementUpdated(element);
		};

		const selectedOption = () => {
			const selectedIndex = element.selectedIndex;
			const option = element.querySelectorAll('vwc-option')[selectedIndex];
			return option?.text || null;
		};

		const checkedOptions = () => {
			const options = Array.from(
				element.querySelectorAll('vwc-option[checked="true"]')
			) as ListboxOption[];
			return options.map((o) => o.text);
		};

		const clickOption = async (text: string) => {
			const option = Array.from(element.querySelectorAll('vwc-option')).find(
				(o) => (o as ListboxOption).text === text
			) as ListboxOption;
			option.click();
			await elementUpdated(element);
		};

		const activeOptionValue = () => {
			const checkedOption = element.querySelector(
				'vwc-option[checked="true"]'
			) as ListboxOption;
			return checkedOption?.value || null;
		};

		return {
			element,
			focus,
			pressKey,
			selectedOption,
			checkedOptions,
			clickOption,
			activeOptionValue,
		};
	}

	describe('single select mode', () => {
		it('should navigate to first and last options with Home and End keys', async () => {
			const select = await setupSelect(`
				<vwc-select>
					<vwc-option value="1" text="Option 1"></vwc-option>
					<vwc-option value="2" text="Option 2" selected></vwc-option>
					<vwc-option value="3" text="Option 3"></vwc-option>
				</vwc-select>
			`);
			select.focus();

			await select.pressKey(keyHome);

			expect(select.selectedOption()).toBe('Option 1');

			await select.pressKey(keyEnd);

			expect(select.selectedOption()).toBe('Option 3');
		});

		it('should navigate with arrow keys', async () => {
			const select = await setupSelect(`
				<vwc-select>
					<vwc-option value="1" text="Option 1" selected></vwc-option>
					<vwc-option value="2" text="Option 2"></vwc-option>
					<vwc-option value="3" text="Option 3"></vwc-option>
				</vwc-select>
			`);
			select.focus();

			await select.pressKey(keyArrowDown);

			expect(select.selectedOption()).toBe('Option 2');

			await select.pressKey(keyArrowUp);

			expect(select.selectedOption()).toBe('Option 1');
		});

		it('should not navigate when disabled', async () => {
			const select = await setupSelect(`
				<vwc-select disabled>
					<vwc-option value="1" text="Option 1" selected></vwc-option>
					<vwc-option value="2" text="Option 2"></vwc-option>
				</vwc-select>
			`);
			select.focus();

			await select.pressKey(keyArrowDown);

			expect(select.selectedOption()).toBe('Option 1');
		});

		it('should skip disabled options when navigating', async () => {
			const select = await setupSelect(`
				<vwc-select>
					<vwc-option value="1" text="Option 1" selected></vwc-option>
					<vwc-option value="2" text="Option 2" disabled></vwc-option>
					<vwc-option value="3" text="Option 3"></vwc-option>
				</vwc-select>
			`);
			select.focus();

			await select.pressKey(keyArrowDown);

			expect(select.selectedOption()).toBe('Option 3');

			await select.pressKey(keyArrowUp);

			expect(select.selectedOption()).toBe('Option 1');
		});

		it('should skip multiple consecutive disabled options', async () => {
			const select = await setupSelect(`
				<vwc-select>
					<vwc-option value="1" text="Option 1" selected></vwc-option>
					<vwc-option value="2" text="Option 2" disabled></vwc-option>
					<vwc-option value="3" text="Option 3" disabled></vwc-option>
					<vwc-option value="4" text="Option 4"></vwc-option>
				</vwc-select>
			`);
			select.focus();

			await select.pressKey(keyArrowDown);

			expect(select.selectedOption()).toBe('Option 4');

			await select.pressKey(keyArrowUp);

			expect(select.selectedOption()).toBe('Option 1');
		});

		it('should skip disabled options with Home and End keys', async () => {
			const select = await setupSelect(`
				<vwc-select>
					<vwc-option value="1" text="Option 1" disabled></vwc-option>
					<vwc-option value="2" text="Option 2" selected></vwc-option>
					<vwc-option value="3" text="Option 3" disabled></vwc-option>
				</vwc-select>
			`);
			select.focus();

			await select.pressKey(keyHome);

			expect(select.selectedOption()).toBe('Option 2');

			await select.pressKey(keyEnd);

			expect(select.selectedOption()).toBe('Option 2');
		});

		it('should not change selection when all options are disabled', async () => {
			const select = await setupSelect(`
				<vwc-select>
					<vwc-option value="1" text="Option 1" disabled selected></vwc-option>
					<vwc-option value="2" text="Option 2" disabled></vwc-option>
					<vwc-option value="3" text="Option 3" disabled></vwc-option>
				</vwc-select>
			`);
			select.focus();

			await select.pressKey(keyArrowDown);

			expect(select.selectedOption()).toBe('Option 1');
		});

		it('should not change selection when pressing ArrowUp at the first option', async () => {
			const select = await setupSelect(`
				<vwc-select>
					<vwc-option value="1" text="Option 1" selected></vwc-option>
					<vwc-option value="2" text="Option 2"></vwc-option>
					<vwc-option value="3" text="Option 3"></vwc-option>
				</vwc-select>
			`);
			select.focus();

			await select.pressKey(keyArrowUp);

			expect(select.selectedOption()).toBe('Option 1');
		});

		it('should not change selection when pressing ArrowUp with all previous options disabled', async () => {
			const select = await setupSelect(`
				<vwc-select>
					<vwc-option value="1" text="Option 1" disabled></vwc-option>
					<vwc-option value="2" text="Option 2" selected></vwc-option>
					<vwc-option value="3" text="Option 3"></vwc-option>
				</vwc-select>
			`);
			select.focus();

			await select.pressKey(keyArrowUp);

			expect(select.selectedOption()).toBe('Option 2');
		});
	});

	describe('multiple select mode', () => {
		it('should navigate with arrow keys', async () => {
			const select = await setupSelect(`
				<vwc-select multiple>
					<vwc-option value="1" text="Option 1"></vwc-option>
					<vwc-option value="2" text="Option 2"></vwc-option>
					<vwc-option value="3" text="Option 3"></vwc-option>
				</vwc-select>
			`);
			await select.clickOption('Option 1');
			select.focus();

			await select.pressKey(keyArrowDown);

			expect(select.checkedOptions()).toEqual(['Option 2']);

			await select.pressKey(keyArrowUp);

			expect(select.checkedOptions()).toEqual(['Option 1']);
		});

		it('should select range with Shift+Arrow keys', async () => {
			const select = await setupSelect(`
				<vwc-select multiple>
					<vwc-option value="1" text="Option 1"></vwc-option>
					<vwc-option value="2" text="Option 2"></vwc-option>
					<vwc-option value="3" text="Option 3"></vwc-option>
				</vwc-select>
			`);
			await select.clickOption('Option 1');
			select.focus();

			await select.pressKey(keyArrowDown, { shiftKey: true });

			expect(select.checkedOptions()).toEqual(['Option 1', 'Option 2']);

			await select.pressKey(keyArrowDown, { shiftKey: true });

			expect(select.checkedOptions()).toEqual([
				'Option 1',
				'Option 2',
				'Option 3',
			]);
		});

		it('should select range with Shift+Home and Shift+End', async () => {
			const select = await setupSelect(`
				<vwc-select multiple>
					<vwc-option value="1" text="Option 1"></vwc-option>
					<vwc-option value="2" text="Option 2"></vwc-option>
					<vwc-option value="3" text="Option 3"></vwc-option>
				</vwc-select>
			`);
			await select.clickOption('Option 2');
			select.focus();

			await select.pressKey(keyHome, { shiftKey: true });

			expect(select.checkedOptions()).toEqual(['Option 1', 'Option 2']);

			await select.pressKey(keyEnd, { shiftKey: true });

			expect(select.checkedOptions()).toEqual(['Option 2', 'Option 3']);
		});

		it('should skip disabled options when navigating', async () => {
			const select = await setupSelect(`
				<vwc-select multiple>
					<vwc-option value="1" text="Option 1"></vwc-option>
					<vwc-option value="2" text="Option 2" disabled></vwc-option>
					<vwc-option value="3" text="Option 3"></vwc-option>
				</vwc-select>
			`);
			await select.clickOption('Option 1');
			select.focus();

			await select.pressKey(keyArrowDown);

			expect(select.checkedOptions()).toEqual(['Option 3']);

			await select.pressKey(keyArrowUp);

			expect(select.checkedOptions()).toEqual(['Option 1']);
		});

		it('should skip disabled options when selecting range', async () => {
			const select = await setupSelect(`
				<vwc-select multiple>
					<vwc-option value="1" text="Option 1"></vwc-option>
					<vwc-option value="2" text="Option 2" disabled></vwc-option>
					<vwc-option value="3" text="Option 3"></vwc-option>
					<vwc-option value="4" text="Option 4" disabled></vwc-option>
					<vwc-option value="5" text="Option 5"></vwc-option>
				</vwc-select>
			`);
			await select.clickOption('Option 1');
			select.focus();

			await select.pressKey(keyArrowDown, { shiftKey: true });

			expect(select.checkedOptions()).toEqual(['Option 1', 'Option 3']);

			await select.pressKey(keyArrowDown, { shiftKey: true });

			expect(select.checkedOptions()).toEqual([
				'Option 1',
				'Option 3',
				'Option 5',
			]);
		});

		it('should not change checked option when pressing Home with all options disabled', async () => {
			const select = await setupSelect(`
				<vwc-select multiple>
					<vwc-option value="1" text="Option 1" disabled></vwc-option>
					<vwc-option value="2" text="Option 2" disabled></vwc-option>
					<vwc-option value="3" text="Option 3" disabled></vwc-option>
				</vwc-select>
			`);
			select.focus();
			await elementUpdated(select.element);
			const initialChecked = select.checkedOptions();

			await select.pressKey(keyHome);

			expect(select.checkedOptions()).toEqual(initialChecked);
		});

		it('should not change checked option when pressing End with all options disabled', async () => {
			const select = await setupSelect(`
				<vwc-select multiple>
					<vwc-option value="1" text="Option 1" disabled></vwc-option>
					<vwc-option value="2" text="Option 2" disabled></vwc-option>
					<vwc-option value="3" text="Option 3" disabled></vwc-option>
				</vwc-select>
			`);
			select.focus();
			await elementUpdated(select.element);
			const initialChecked = select.checkedOptions();

			await select.pressKey(keyEnd);

			expect(select.checkedOptions()).toEqual(initialChecked);
		});

		it('should not change checked option when pressing ArrowUp with all options disabled', async () => {
			const select = await setupSelect(`
				<vwc-select multiple>
					<vwc-option value="1" text="Option 1" disabled></vwc-option>
					<vwc-option value="2" text="Option 2" disabled></vwc-option>
					<vwc-option value="3" text="Option 3" disabled></vwc-option>
				</vwc-select>
			`);
			select.focus();
			await elementUpdated(select.element);
			const initialChecked = select.checkedOptions();

			await select.pressKey(keyArrowUp);

			expect(select.checkedOptions()).toEqual(initialChecked);
		});

		it('should not change checked option when pressing ArrowDown with all options disabled', async () => {
			const select = await setupSelect(`
				<vwc-select multiple>
					<vwc-option value="1" text="Option 1" disabled></vwc-option>
					<vwc-option value="2" text="Option 2" disabled></vwc-option>
					<vwc-option value="3" text="Option 3" disabled></vwc-option>
				</vwc-select>
			`);
			select.focus();
			await elementUpdated(select.element);
			const initialChecked = select.checkedOptions();

			await select.pressKey(keyArrowDown);

			expect(select.checkedOptions()).toEqual(initialChecked);
		});

		it('should uncheck all options when pressing Home without shift key', async () => {
			const select = await setupSelect(`
				<vwc-select multiple>
					<vwc-option value="1" text="Option 1"></vwc-option>
					<vwc-option value="2" text="Option 2"></vwc-option>
					<vwc-option value="3" text="Option 3"></vwc-option>
				</vwc-select>
			`);
			await select.clickOption('Option 1');
			select.focus();

			await select.pressKey(keyEnd, { shiftKey: true });

			expect(select.checkedOptions()).toEqual([
				'Option 1',
				'Option 2',
				'Option 3',
			]);

			await select.pressKey(keyHome);

			expect(select.checkedOptions()).toEqual(['Option 1']);
		});

		it('should uncheck all options when pressing End without shift key', async () => {
			const select = await setupSelect(`
				<vwc-select multiple>
					<vwc-option value="1" text="Option 1"></vwc-option>
					<vwc-option value="2" text="Option 2"></vwc-option>
					<vwc-option value="3" text="Option 3"></vwc-option>
				</vwc-select>
			`);
			await select.clickOption('Option 3');
			select.focus();

			await select.pressKey(keyHome, { shiftKey: true });

			expect(select.checkedOptions()).toEqual([
				'Option 1',
				'Option 2',
				'Option 3',
			]);

			await select.pressKey(keyEnd);

			expect(select.checkedOptions()).toEqual(['Option 3']);
		});

		it('should select range with Shift+ArrowUp', async () => {
			const select = await setupSelect(`
				<vwc-select multiple>
					<vwc-option value="1" text="Option 1"></vwc-option>
					<vwc-option value="2" text="Option 2"></vwc-option>
					<vwc-option value="3" text="Option 3"></vwc-option>
				</vwc-select>
			`);
			await select.clickOption('Option 3');
			select.focus();

			await select.pressKey(keyArrowUp, { shiftKey: true });

			expect(select.checkedOptions()).toEqual(['Option 2', 'Option 3']);
		});

		it('should extend range selection when continuing to press Shift+Home', async () => {
			const select = await setupSelect(`
				<vwc-select multiple>
					<vwc-option value="1" text="Option 1"></vwc-option>
					<vwc-option value="2" text="Option 2"></vwc-option>
					<vwc-option value="3" text="Option 3"></vwc-option>
					<vwc-option value="4" text="Option 4"></vwc-option>
				</vwc-select>
			`);
			await select.clickOption('Option 3');
			select.focus();

			await select.pressKey(keyArrowDown, { shiftKey: true });
			expect(select.checkedOptions()).toEqual(['Option 3', 'Option 4']);

			await select.pressKey(keyHome, { shiftKey: true });

			expect(select.checkedOptions()).toEqual([
				'Option 1',
				'Option 2',
				'Option 3',
			]);
		});

		it('should extend range selection when continuing to press Shift+ArrowUp', async () => {
			const select = await setupSelect(`
				<vwc-select multiple>
					<vwc-option value="1" text="Option 1"></vwc-option>
					<vwc-option value="2" text="Option 2"></vwc-option>
					<vwc-option value="3" text="Option 3"></vwc-option>
					<vwc-option value="4" text="Option 4"></vwc-option>
				</vwc-select>
			`);
			await select.clickOption('Option 3');
			select.focus();

			await select.pressKey(keyArrowDown, { shiftKey: true });
			expect(select.checkedOptions()).toEqual(['Option 3', 'Option 4']);

			await select.pressKey(keyArrowUp, { shiftKey: true });
			await select.pressKey(keyArrowUp, { shiftKey: true });

			expect(select.checkedOptions()).toEqual([
				'Option 2',
				'Option 3',
				'Option 4',
			]);
		});

		it('should activate the first selected option when multiple select gains focus', async () => {
			const select = await setupSelect(`
				<vwc-select multiple>
					<vwc-option value="1" text="Option 1"></vwc-option>
					<vwc-option value="2" text="Option 2" selected></vwc-option>
					<vwc-option value="3" text="Option 3"></vwc-option>
				</vwc-select>
			`);

			select.focus();
			await elementUpdated(select.element);

			expect(select.activeOptionValue()).toBe('2');
		});
	});

	describe('typeahead', () => {
		it('should select option by typing its first letter', async () => {
			const select = await setupSelect(`
				<vwc-select>
					<vwc-option value="1" text="Apple"></vwc-option>
					<vwc-option value="2" text="Banana"></vwc-option>
					<vwc-option value="3" text="Cherry"></vwc-option>
				</vwc-select>
			`);
			select.focus();

			await select.pressKey('b');

			expect(select.selectedOption()).toBe('Banana');
		});

		it('should select option by typing multiple letters', async () => {
			const select = await setupSelect(`
			<vwc-select>
				<vwc-option value="1" text="Apple"></vwc-option>
				<vwc-option value="2" text="Apricot"></vwc-option>
				<vwc-option value="3" text="Banana"></vwc-option>
			</vwc-select>
		`);
			select.focus();

			await select.pressKey('a');
			await select.pressKey('p');
			await select.pressKey('r');

			expect(select.selectedOption()).toBe('Apricot');
		});

		it('should skip disabled options when using typeahead', async () => {
			const select = await setupSelect(`
				<vwc-select>
					<vwc-option value="1" text="Apple"></vwc-option>
					<vwc-option value="2" text="Apricot" disabled></vwc-option>
					<vwc-option value="3" text="Banana"></vwc-option>
				</vwc-select>
			`);
			select.focus();

			await select.pressKey('a');

			expect(select.selectedOption()).toBe('Apple');
		});

		it('should reset typeahead after 5 seconds of no key presses', async () => {
			const select = await setupSelect(`
				<vwc-select>
					<vwc-option value="1" text="Apple"></vwc-option>
					<vwc-option value="2" text="Ananas"></vwc-option>
					<vwc-option value="3" text="Nectarine"></vwc-option>
				</vwc-select>
			`);
			select.focus();

			vi.useFakeTimers();
			await select.pressKey('a');
			vi.advanceTimersByTime(5000);
			vi.useRealTimers();
			await select.pressKey('n');

			expect(select.selectedOption()).toBe('Nectarine');
		});

		it('should make options active instead of selecting them when multiple is true', async () => {
			const select = await setupSelect(`
				<vwc-select multiple>
					<vwc-option value="1" text="Apple"></vwc-option>
					<vwc-option value="2" text="Ananas"></vwc-option>
					<vwc-option value="3" text="Nectarine"></vwc-option>
				</vwc-select>
			`);
			select.focus();

			await select.pressKey('n');

			expect(select.element.selectedIndex).toBe(0);
			expect(select.activeOptionValue()).toBe('3');
		});
	});
});
