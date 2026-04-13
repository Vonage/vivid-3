import { observable } from '@microsoft/fast-element';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';
import type { KbdKeyName } from '../kbd-key/kbd-key';

/**
 * A parsed chord — a group of keys meant to be pressed together.
 *
 * @internal
 */
export interface ParsedChord {
	keys: KbdKeyName[];
	isFirst: boolean;
}

/**
 * Maps aria-keyshortcuts key names (lowercase) to canonical KbdKeyName values.
 * Keys not present here are resolved by the fallback logic in {@link ariaKeyToKbdKeyName}.
 *
 * @internal
 */
const ARIA_KEY_MAP: Record<string, KbdKeyName> = {
	control: 'Ctrl',
	meta: 'Cmd',
	alt: 'Alt',
	shift: 'Shift',
	enter: 'Enter',
	tab: 'Tab',
	space: 'Space',
	backspace: 'Backspace',
	delete: 'Delete',
	escape: 'Escape',
	arrowup: 'ArrowUp',
	arrowdown: 'ArrowDown',
	arrowleft: 'ArrowLeft',
	arrowright: 'ArrowRight',
};

/**
 * Converts an aria-keyshortcuts key name to the corresponding KbdKeyName.
 *
 * @param ariaKey - Key name from the aria-keyshortcuts format.
 * @returns The corresponding KbdKeyName value.
 *
 * @internal
 */
export function ariaKeyToKbdKeyName(ariaKey: string): KbdKeyName {
	const trimmed = ariaKey.trim();
	const lower = trimmed.toLowerCase();

	if (lower in ARIA_KEY_MAP) {
		return ARIA_KEY_MAP[lower];
	}

	// Single letter → uppercase
	if (trimmed.length === 1 && /^[a-z]$/i.test(trimmed)) {
		return trimmed.toUpperCase() as KbdKeyName;
	}

	// Single digit
	if (trimmed.length === 1 && /^[0-9]$/.test(trimmed)) {
		return trimmed as KbdKeyName;
	}

	// Function keys (F1–F12)
	if (/^f\d{1,2}$/i.test(trimmed)) {
		return trimmed.toUpperCase() as KbdKeyName;
	}

	// Unknown key — return as-is
	return trimmed as KbdKeyName;
}

/**
 * Parses an aria-keyshortcuts string into a list of chords.
 *
 * The aria-keyshortcuts format uses `+` to combine keys in a chord
 * (e.g. `Control+Shift+P`) and spaces to separate alternative shortcuts
 * (e.g. `Control+C Meta+C`).
 *
 * @param text - Value in aria-keyshortcuts format.
 * @returns An array of parsed chords for rendering.
 *
 * @internal
 */
export function parseAriaKeyShortcuts(text: string): ParsedChord[] {
	const trimmed = text.trim();
	if (!trimmed) return [];

	return trimmed.split(/\s+/).map((chord, index) => ({
		keys: chord.split('+').map(ariaKeyToKbdKeyName),
		isFirst: index === 0,
	}));
}

/**
 * @public
 * @component kbd-shortcut-text
 * @slot - Default slot for text content in aria-keyshortcuts format.
 */
export class KbdShortcutText extends VividElement {
	/**
	 * The parsed chords derived from the slotted text content.
	 *
	 * @internal
	 */
	@observable _chords: ParsedChord[] = [];

	/**
	 * Nodes assigned to the default slot.
	 *
	 * @internal
	 */
	@observable _slottedNodes?: Node[];

	/**
	 * @internal
	 */
	_slottedNodesChanged() {
		const text =
			this._slottedNodes
				?.map((n) => n.textContent)
				.join('')
				.trim() ?? '';
		this._chords = parseAriaKeyShortcuts(text);
	}
}
