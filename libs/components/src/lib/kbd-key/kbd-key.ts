import { attr } from '@microsoft/fast-element';
import type { Appearance, Size } from '../enums.js';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';
import type { ExtractFromEnum } from '../../shared/utils/enums';
import { isApplePlatform } from '../../shared/utils/platform';

const SUPPORTED_KEY_NAMES = [
	'Alt',
	'Control',
	'Shift',
	'Enter',
	'Tab',
	'Space',
	'Backspace',
	'Escape',
	'ArrowUp',
	'ArrowDown',
	'ArrowLeft',
	'ArrowRight',
	'End',
	'Home',
	'PageUp',
	'PageDown',
	'A',
	'B',
	'C',
	'D',
	'E',
	'F',
	'G',
	'H',
	'I',
	'J',
	'K',
	'L',
	'M',
	'N',
	'O',
	'P',
	'Q',
	'R',
	'S',
	'T',
	'U',
	'V',
	'W',
	'X',
	'Y',
	'Z',
	'0',
	'1',
	'2',
	'3',
	'4',
	'5',
	'6',
	'7',
	'8',
	'9',
	'Mod',
	'Custom',
] as const;

/**
 * Supported key names for the kbd-key component.
 */
export type KbdKeyName = (typeof SUPPORTED_KEY_NAMES)[number];

const SUPPORTED_KEY_NAMES_SET = new Set<string>(SUPPORTED_KEY_NAMES);

/**
 * Maps key names to their display labels on standard (non-Apple) platforms.
 * Keys not listed here display as their key-name string.
 */
export const KEY_DISPLAY_MAP: Record<string, string> = {
	Enter: '↵',
	Tab: '⇥',
	Space: '␣',
	Backspace: '⌫',
	Escape: 'Esc',
	Shift: '⇧',
	Control: 'Ctrl',
	Alt: 'Alt',
	ArrowUp: '↑',
	ArrowDown: '↓',
	ArrowLeft: '←',
	ArrowRight: '→',
	End: 'End',
	Home: 'Home',
	PageUp: 'PgUp',
	PageDown: 'PgDn',
};

export const APPLE_DISPLAY_OVERRIDES: Record<string, string> = {
	Control: '⌃',
	Alt: '⌥',
};

/**
 * Aria labels for keys that display as symbols on standard platforms.
 * Keys displaying readable text (e.g. "Ctrl", "Esc") are omitted.
 */
const KEY_ARIA_LABEL_MAP: Record<string, string> = {
	Enter: 'Enter',
	Tab: 'Tab',
	Space: 'Space',
	Backspace: 'Backspace',
	Shift: 'Shift',
	ArrowUp: 'Up Arrow',
	ArrowDown: 'Down Arrow',
	ArrowLeft: 'Left Arrow',
	ArrowRight: 'Right Arrow',
};

const APPLE_ARIA_LABEL_OVERRIDES: Record<string, string> = {
	Control: 'Control',
	Alt: 'Option',
};

export type KbdKeyKeyboard = 'auto' | 'standard' | 'apple';

export type KbdKeyAppearance =
	| ExtractFromEnum<
			Appearance,
			Appearance.Subtle | Appearance.SubtleLight | Appearance.Outlined
	  >
	| 'dropshadow';

export type KbdKeySize = ExtractFromEnum<
	Size,
	Size.SuperCondensed | Size.Condensed | Size.Normal | Size.Expanded
>;

/**
 * @public
 * @component kbd-key
 * @slot - Default slot for custom content (used when name is "Custom").
 */
export class KbdKey extends VividElement {
	/**
	 * The key to display. Use "Custom" to show arbitrary content via the default slot.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: name
	 */
	@attr name?: KbdKeyName;

	/**
	 * The keyboard layout to use for display.
	 * When set to "auto" (default), detects the current platform.
	 * When set to "standard", displays keys for non-Apple platforms.
	 * When set to "apple", displays keys for Apple platforms.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: keyboard
	 */
	@attr keyboard?: KbdKeyKeyboard;

	/**
	 * @public
	 * @remarks
	 * HTML Attribute: appearance
	 */
	@attr appearance?: KbdKeyAppearance;

	/**
	 * @public
	 * @remarks
	 * HTML Attribute: size
	 */
	@attr size?: KbdKeySize;

	/**
	 * Overrides the aria-keyshortcuts key name contributed by this element.
	 * The value must be a valid `aria-keyshortcuts` key token (e.g. `"F1"`, `"Power"`).
	 * Use this when `name="Custom"` and the slot's text content is not a valid
	 * aria-keyshortcuts value, e.g. when the slot contains an icon.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: keyshortcuts-key
	 */
	@attr({ attribute: 'keyshortcuts-key' }) keyshortcutsKey?: string;

	/**
	 * @internal
	 */
	get _isApple(): boolean {
		if (this.keyboard === 'apple') return true;
		if (this.keyboard === 'standard') return false;
		return isApplePlatform();
	}

	/**
	 * @internal
	 */
	get _displayLabel(): string {
		/* v8 ignore if -- @preserve */
		if (!this.name || this.name === 'Custom') {
			return '';
		}
		if (!SUPPORTED_KEY_NAMES_SET.has(this.name)) {
			// eslint-disable-next-line no-console
			console.warn(
				`[kbd-key] Unsupported key name: "${this.name}". Nothing will be displayed.`
			);
			return '';
		}
		if (this.name === 'Mod') {
			return this._isApple ? '⌘' : 'Ctrl';
		}
		if (this._isApple && this.name in APPLE_DISPLAY_OVERRIDES) {
			return APPLE_DISPLAY_OVERRIDES[this.name];
		}
		return KEY_DISPLAY_MAP[this.name] ?? this.name;
	}

	/**
	 * @internal
	 */
	get _ariaKeyLabel(): string | null {
		if (!this.name || this.name === 'Custom') {
			return null;
		}
		if (this.name === 'Mod') {
			return this._isApple ? 'Command' : null;
		}
		if (this._isApple && this.name in APPLE_ARIA_LABEL_OVERRIDES) {
			return APPLE_ARIA_LABEL_OVERRIDES[this.name];
		}
		return KEY_ARIA_LABEL_MAP[this.name] ?? null;
	}

	/**
	 * Returns the aria-keyshortcuts key token for this element, or null if one
	 * cannot be determined.
	 *
	 * @internal
	 */
	_getKeyshortcutsKey(): string | null {
		if (this.keyshortcutsKey !== undefined) {
			return this.keyshortcutsKey || null;
		}
		if (!this.name) {
			return null;
		}
		if (this.name === 'Custom') {
			return this.textContent!.trim() || null;
		}
		if (this.name === 'Mod') {
			return this._isApple ? 'Meta' : 'Control';
		}
		return this.name;
	}
}
