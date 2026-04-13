import { elementUpdated, fixture } from '@repo/shared';
import {
	ariaKeyToKbdKeyName,
	KbdShortcutText,
	parseAriaKeyShortcuts,
} from './kbd-shortcut-text';
import '.';

const COMPONENT_TAG = 'vwc-kbd-shortcut-text';

describe('vwc-kbd-shortcut-text', () => {
	let element: KbdShortcutText;

	beforeAll(async () => {
		await customElements.whenDefined(COMPONENT_TAG);
	});

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as KbdShortcutText;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-kbd-shortcut-text', async () => {
			expect(element).toBeInstanceOf(KbdShortcutText);
		});

		it('should allow being created via createElement', () => {
			expect(() => document.createElement(COMPONENT_TAG)).not.toThrow();
		});
	});

	describe('ariaKeyToKbdKeyName', () => {
		it('should map "Control" to "Ctrl"', () => {
			expect(ariaKeyToKbdKeyName('Control')).toBe('Ctrl');
		});

		it('should map "control" (lowercase) to "Ctrl"', () => {
			expect(ariaKeyToKbdKeyName('control')).toBe('Ctrl');
		});

		it('should map "Meta" to "Cmd"', () => {
			expect(ariaKeyToKbdKeyName('Meta')).toBe('Cmd');
		});

		it('should map "Alt" to "Alt"', () => {
			expect(ariaKeyToKbdKeyName('Alt')).toBe('Alt');
		});

		it('should map "Shift" to "Shift"', () => {
			expect(ariaKeyToKbdKeyName('Shift')).toBe('Shift');
		});

		it('should map "Enter" to "Enter"', () => {
			expect(ariaKeyToKbdKeyName('Enter')).toBe('Enter');
		});

		it('should map "Tab" to "Tab"', () => {
			expect(ariaKeyToKbdKeyName('Tab')).toBe('Tab');
		});

		it('should map "Space" to "Space"', () => {
			expect(ariaKeyToKbdKeyName('Space')).toBe('Space');
		});

		it('should map "Escape" to "Escape"', () => {
			expect(ariaKeyToKbdKeyName('Escape')).toBe('Escape');
		});

		it('should map "ArrowUp" to "ArrowUp"', () => {
			expect(ariaKeyToKbdKeyName('ArrowUp')).toBe('ArrowUp');
		});

		it('should map "Backspace" to "Backspace"', () => {
			expect(ariaKeyToKbdKeyName('Backspace')).toBe('Backspace');
		});

		it('should map "Delete" to "Delete"', () => {
			expect(ariaKeyToKbdKeyName('Delete')).toBe('Delete');
		});

		it('should map single lowercase letter to uppercase', () => {
			expect(ariaKeyToKbdKeyName('c')).toBe('C');
		});

		it('should map single uppercase letter as-is', () => {
			expect(ariaKeyToKbdKeyName('P')).toBe('P');
		});

		it('should map single digit as-is', () => {
			expect(ariaKeyToKbdKeyName('5')).toBe('5');
		});

		it('should map function keys to uppercase', () => {
			expect(ariaKeyToKbdKeyName('f1')).toBe('F1');
			expect(ariaKeyToKbdKeyName('F12')).toBe('F12');
		});

		it('should be case-insensitive for known keys', () => {
			expect(ariaKeyToKbdKeyName('CONTROL')).toBe('Ctrl');
			expect(ariaKeyToKbdKeyName('escape')).toBe('Escape');
			expect(ariaKeyToKbdKeyName('ARROWDOWN')).toBe('ArrowDown');
		});
	});

	describe('parseAriaKeyShortcuts', () => {
		it('should return empty array for empty string', () => {
			expect(parseAriaKeyShortcuts('')).toEqual([]);
		});

		it('should return empty array for whitespace-only string', () => {
			expect(parseAriaKeyShortcuts('   ')).toEqual([]);
		});

		it('should parse a single key into one chord', () => {
			expect(parseAriaKeyShortcuts('Enter')).toEqual([
				{ keys: ['Enter'], isFirst: true },
			]);
		});

		it('should parse a chord of two keys', () => {
			expect(parseAriaKeyShortcuts('Control+C')).toEqual([
				{ keys: ['Ctrl', 'C'], isFirst: true },
			]);
		});

		it('should parse a chord of three keys', () => {
			expect(parseAriaKeyShortcuts('Control+Shift+P')).toEqual([
				{ keys: ['Ctrl', 'Shift', 'P'], isFirst: true },
			]);
		});

		it('should parse alternative shortcuts into separate chords', () => {
			expect(parseAriaKeyShortcuts('Control+C Meta+C')).toEqual([
				{ keys: ['Ctrl', 'C'], isFirst: true },
				{ keys: ['Cmd', 'C'], isFirst: false },
			]);
		});
	});

	describe('rendering from text content', () => {
		it('should render a kbd-shortcut wrapping kbd-key elements', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG}>Control+C</${COMPONENT_TAG}>`
			)) as KbdShortcutText;
			await elementUpdated(element);

			const shortcuts =
				element.shadowRoot?.querySelectorAll('vwc-kbd-shortcut') ?? [];
			expect(shortcuts.length).toBe(1);

			const keys = shortcuts[0].querySelectorAll('vwc-kbd-key');
			expect(keys.length).toBe(2);
		});

		it('should render correct key names inside a kbd-shortcut', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG}>Control+Shift+P</${COMPONENT_TAG}>`
			)) as KbdShortcutText;
			await elementUpdated(element);

			const shortcut =
				element.shadowRoot!.querySelector('vwc-kbd-shortcut')!;
			const keys = shortcut.querySelectorAll('vwc-kbd-key');
			expect(keys[0].getAttribute('name')).toBe('Ctrl');
			expect(keys[1].getAttribute('name')).toBe('Shift');
			expect(keys[2].getAttribute('name')).toBe('P');
		});

		it('should render one kbd-shortcut per alternative', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG}>Control+C Meta+C</${COMPONENT_TAG}>`
			)) as KbdShortcutText;
			await elementUpdated(element);

			const shortcuts =
				element.shadowRoot?.querySelectorAll('vwc-kbd-shortcut') ?? [];
			expect(shortcuts.length).toBe(2);

			expect(shortcuts[0].querySelectorAll('vwc-kbd-key').length).toBe(2);
			expect(shortcuts[1].querySelectorAll('vwc-kbd-key').length).toBe(2);
		});

		it('should render alternative separator between alternatives', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG}>Control+C Meta+C</${COMPONENT_TAG}>`
			)) as KbdShortcutText;
			await elementUpdated(element);

			const altSeparators =
				element.shadowRoot?.querySelectorAll('.alt-separator') ?? [];
			expect(altSeparators.length).toBe(1);
			expect(altSeparators[0].textContent).toBe('/');
		});

		it('should render a single key without alternative separators', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG}>Enter</${COMPONENT_TAG}>`
			)) as KbdShortcutText;
			await elementUpdated(element);

			const shortcuts =
				element.shadowRoot?.querySelectorAll('vwc-kbd-shortcut') ?? [];
			const altSeparators =
				element.shadowRoot?.querySelectorAll('.alt-separator') ?? [];
			expect(shortcuts.length).toBe(1);
			expect(shortcuts[0].querySelectorAll('vwc-kbd-key').length).toBe(1);
			expect(altSeparators.length).toBe(0);
		});

		it('should have a base element with role="group"', async () => {
			const base = element.shadowRoot?.querySelector('.base');
			expect(base?.getAttribute('role')).toBe('group');
		});

		it('should hide the default slot', async () => {
			const slot = element.shadowRoot?.querySelector('slot');
			expect(slot?.hasAttribute('hidden')).toBe(true);
		});

		it('should render no shortcuts when text content is empty', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
			)) as KbdShortcutText;
			await elementUpdated(element);

			const shortcuts =
				element.shadowRoot?.querySelectorAll('vwc-kbd-shortcut') ?? [];
			expect(shortcuts.length).toBe(0);
		});

		it('should render Meta key as Cmd', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG}>Meta+C</${COMPONENT_TAG}>`
			)) as KbdShortcutText;
			await elementUpdated(element);

			const keys =
				element.shadowRoot
					?.querySelector('vwc-kbd-shortcut')
					?.querySelectorAll('vwc-kbd-key') ?? [];
			expect(keys[0].getAttribute('name')).toBe('Cmd');
		});
	});
});
