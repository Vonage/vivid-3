import { elementUpdated, fixture } from '@repo/shared/test-utils/fixture';
import { KbdKey } from './kbd-key';
import type { KbdKeyKeyboard, KbdKeyName } from './kbd-key';
import '.';

const COMPONENT_TAG = 'vwc-kbd-key';

describe('vwc-kbd-key', () => {
	let element: KbdKey;

	beforeAll(async () => {
		await customElements.whenDefined(COMPONENT_TAG);
	});

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as KbdKey;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-kbd-key', async () => {
			expect(element).toBeInstanceOf(KbdKey);
			expect(element.name).toBeUndefined();
			expect(element.appearance).toBeUndefined();
			expect(element.size).toBeUndefined();
			expect(element.keyboard).toBeUndefined();
		});

		it('should allow being created via createElement', () => {
			// createElement may fail even though indirect instantiation through innerHTML etc. succeeds
			// This is because only createElement performs checks for custom element constructor requirements
			// See https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance
			expect(() => document.createElement(COMPONENT_TAG)).not.toThrow();
		});
	});

	describe('name', () => {
		it('should display nothing when not set', async () => {
			const kbd = element.shadowRoot?.querySelector('kbd.base');
			expect(kbd?.textContent?.trim()).toBe('');
		});

		it('should display nothing and log a warning when name is not a supported key', async () => {
			const warnSpy = vi
				.spyOn(console, 'warn')
				.mockImplementation(() => undefined);

			element.name = 'Fn' as KbdKeyName;
			await elementUpdated(element);

			const kbd = element.shadowRoot?.querySelector('kbd.base');
			expect(kbd?.textContent?.trim()).toBe('');
			expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('Fn'));

			warnSpy.mockRestore();
		});
	});

	describe('keyboard', () => {
		it('should reflect keyboard attribute to property', async () => {
			element.setAttribute('keyboard', 'apple');
			await elementUpdated(element);

			expect(element.keyboard).toBe('apple');
		});

		it('should use auto detection when keyboard is "auto"', async () => {
			vi.spyOn(navigator, 'userAgent', 'get').mockReturnValue(
				'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'
			);

			element.name = 'Mod';
			element.keyboard = 'auto';
			await elementUpdated(element);

			const kbd = element.shadowRoot?.querySelector('kbd.base');
			expect(kbd?.textContent?.trim()).toBe('⌘');

			vi.restoreAllMocks();
		});

		it('should use auto detection when keyboard is not set', async () => {
			vi.spyOn(navigator, 'userAgent', 'get').mockReturnValue(
				'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'
			);

			element.name = 'Mod';
			element.keyboard = 'auto';
			await elementUpdated(element);

			const kbd = element.shadowRoot?.querySelector('kbd.base');
			expect(kbd?.textContent?.trim()).toBe('⌘');

			vi.restoreAllMocks();
		});
	});

	describe('Mod key', () => {
		it('should display "Mod" as Ctrl on standard keyboard', async () => {
			element.name = 'Mod';
			element.keyboard = 'standard';
			await elementUpdated(element);

			const kbd = element.shadowRoot?.querySelector('kbd.base');
			expect(kbd?.textContent?.trim()).toBe('Ctrl');
		});

		it('should display "Mod" as ⌘ on Apple keyboard', async () => {
			element.name = 'Mod';
			element.keyboard = 'apple';
			await elementUpdated(element);

			const kbd = element.shadowRoot?.querySelector('kbd.base');
			expect(kbd?.textContent?.trim()).toBe('⌘');
		});
	});

	describe('Custom content', () => {
		it('should render a slot when name is "Custom"', async () => {
			element.name = 'Custom';
			await elementUpdated(element);

			const slot = element.shadowRoot?.querySelector('kbd.base slot');
			expect(slot).toBeInstanceOf(HTMLSlotElement);
		});

		it('should not render a slot when name is not "Custom"', async () => {
			element.name = 'A';
			await elementUpdated(element);

			const slot = element.shadowRoot?.querySelector('slot');
			expect(slot).toBeNull();
		});
	});

	describe('_getKeyshortcutsKey', () => {
		it('should return null when name is not set', () => {
			expect(element._getKeyshortcutsKey()).toBeNull();
		});

		it('should return null when name is "Custom" and no text content', () => {
			element.name = 'Custom';
			expect(element._getKeyshortcutsKey()).toBeNull();
		});

		it('should return textContent when name is "Custom" with slotted text', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG} name="Custom"><span>Fn</span></${COMPONENT_TAG}>`
			)) as KbdKey;
			expect(element._getKeyshortcutsKey()).toBe('Fn');
		});

		it('should return keyshortcuts-key attribute value when set', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG} name="Custom" keyshortcuts-key="F1"></${COMPONENT_TAG}>`
			)) as KbdKey;
			expect(element._getKeyshortcutsKey()).toBe('F1');
		});

		it('should prefer keyshortcuts-key over textContent for Custom keys', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG} name="Custom" keyshortcuts-key="F1"><span>Fn</span></${COMPONENT_TAG}>`
			)) as KbdKey;
			expect(element._getKeyshortcutsKey()).toBe('F1');
		});

		it('should prefer keyshortcuts-key over normal key name', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG} name="A" keyshortcuts-key="F1"></${COMPONENT_TAG}>`
			)) as KbdKey;
			expect(element._getKeyshortcutsKey()).toBe('F1');
		});

		it('should return null for empty keyshortcuts-key attribute', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG} name="A" keyshortcuts-key=""></${COMPONENT_TAG}>`
			)) as KbdKey;
			expect(element._getKeyshortcutsKey()).toBeNull();
		});

		it.each([
			['A', undefined, 'A'],
			['Control', undefined, 'Control'],
			['Enter', undefined, 'Enter'],
			['ArrowUp', undefined, 'ArrowUp'],
			['PageUp', undefined, 'PageUp'],
			['Space', undefined, 'Space'],
			['Mod', 'apple', 'Meta'],
			['Mod', 'standard', 'Control'],
		] as const)(
			'should return "%s" for key "%s" (keyboard=%s)',
			(key, keyboard, expected) => {
				element.name = key as KbdKeyName;
				if (keyboard) element.keyboard = keyboard as KbdKeyKeyboard;
				expect(element._getKeyshortcutsKey()).toBe(expected);
			}
		);
	});

	describe('accessible name', () => {
		it.each([
			['Enter', undefined, 'Enter'],
			['Tab', undefined, 'Tab'],
			['Space', undefined, 'Space'],
			['Backspace', undefined, 'Backspace'],
			['Shift', undefined, 'Shift'],
			['ArrowUp', undefined, 'Up Arrow'],
			['ArrowDown', undefined, 'Down Arrow'],
			['ArrowLeft', undefined, 'Left Arrow'],
			['ArrowRight', undefined, 'Right Arrow'],
			['Control', 'apple', 'Control'],
			['Alt', 'apple', 'Option'],
			['Mod', 'apple', 'Command'],
		] as const)(
			'key "%s" (keyboard=%s) should have accessible name "%s"',
			async (name, keyboard, expected) => {
				element.name = name as KbdKeyName;
				if (keyboard) element.keyboard = keyboard as KbdKeyKeyboard;
				await elementUpdated(element);

				const kbd = element.shadowRoot?.querySelector('kbd.base');
				expect(kbd?.getAttribute('aria-label')).toBe(expected);
			}
		);

		it.each([
			['A', undefined],
			['5', undefined],
			['Escape', undefined],
			['End', undefined],
			['Home', undefined],
			['PageUp', undefined],
			['PageDown', undefined],
			['Control', 'standard'],
			['Alt', 'standard'],
			['Mod', 'standard'],
		] as const)(
			'key "%s" (keyboard=%s) should have no aria-label',
			async (name, keyboard) => {
				element.name = name as KbdKeyName;
				if (keyboard) element.keyboard = keyboard as KbdKeyKeyboard;
				await elementUpdated(element);

				const kbd = element.shadowRoot?.querySelector('kbd.base');
				expect(kbd?.hasAttribute('aria-label')).toBe(false);
			}
		);
	});
});
