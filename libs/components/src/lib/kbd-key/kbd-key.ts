import { attr } from '@microsoft/fast-element';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';

/**
 * Returns true if the current platform is Apple (macOS, iOS, iPadOS).
 *
 * @internal
 */
function isApplePlatform(): boolean {
	/* v8 ignore next 3 -- @preserve */
	if (typeof navigator === 'undefined') {
		return false;
	}

	const ua = navigator.userAgent.toLowerCase();
	return ua.includes('mac') || ua.includes('iphone') || ua.includes('ipad');
}

/**
 * Supported key names for the kbd-key component.
 *
 * @public
 */
export type KbdKeyName =
	| 'Enter'
	| 'Tab'
	| 'Space'
	| 'Backspace'
	| 'Delete'
	| 'Escape'
	| 'Shift'
	| 'Ctrl'
	| 'Alt'
	| 'Cmd'
	| 'Mod'
	| 'ArrowUp'
	| 'ArrowDown'
	| 'ArrowLeft'
	| 'ArrowRight'
	| 'A'
	| 'B'
	| 'C'
	| 'D'
	| 'E'
	| 'F'
	| 'G'
	| 'H'
	| 'I'
	| 'J'
	| 'K'
	| 'L'
	| 'M'
	| 'N'
	| 'O'
	| 'P'
	| 'Q'
	| 'R'
	| 'S'
	| 'T'
	| 'U'
	| 'V'
	| 'W'
	| 'X'
	| 'Y'
	| 'Z'
	| '0'
	| '1'
	| '2'
	| '3'
	| '4'
	| '5'
	| '6'
	| '7'
	| '8'
	| '9'
	| 'F1'
	| 'F2'
	| 'F3'
	| 'F4'
	| 'F5'
	| 'F6'
	| 'F7'
	| 'F8'
	| 'F9'
	| 'F10'
	| 'F11'
	| 'F12'
	| 'Custom';

/**
 * Maps key names to their display labels.
 * Keys not listed here display as their key-name string.
 *
 * @internal
 */
export const KEY_DISPLAY_MAP: Record<string, string> = {
	Enter: '↵',
	Tab: '⇥',
	Space: '␣',
	Backspace: '⌫',
	Delete: '⌦',
	Escape: 'Esc',
	Shift: '⇧',
	Ctrl: 'Ctrl',
	Alt: 'Alt',
	Cmd: '⌘',
	ArrowUp: '↑',
	ArrowDown: '↓',
	ArrowLeft: '←',
	ArrowRight: '→',
};

/**
 * @public
 * @component kbd-key
 * @slot - Default slot for custom content (used when name is "Custom").
 */
export class KbdKey extends VividElement {
	/**
	 * The key to display.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: name
	 */
	@attr name?: KbdKeyName;

	/**
	 * Returns the display text for the current name.
	 *
	 * @internal
	 */
	get displayLabel(): string {
		if (!this.name || this.name === 'Custom') {
			return '';
		}
		if (this.name === 'Mod') {
			return isApplePlatform() ? '⌘' : 'Ctrl';
		}
		return KEY_DISPLAY_MAP[this.name] ?? this.name;
	}
}
