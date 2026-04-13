import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';
import type { KbdKey } from '../kbd-key/kbd-key';

/**
 * Modifier key names in aria-keyshortcuts.
 * @internal
 */
const MODIFIER_NAMES = new Set(['Control', 'Alt', 'Shift', 'Meta']);

/**
 * @public
 * @component kbd-shortcut
 * @slot - Default slot for Kbd elements.
 */
export class KbdShortcut extends VividElement {
	/**
	 * Returns a valid aria-keyshortcuts value based on the slotted kbd-key elements.
	 * Modifiers are sorted to be first as required by the spec.
	 * Returns null if no keys are available.
	 *
	 * @public
	 */
	getKeyshortcutsValue(): string | null {
		const keys = Array.from(this.children).filter(
			(el): el is KbdKey =>
				typeof (el as KbdKey)._getKeyshortcutsKey === 'function'
		);

		if (keys.length === 0) {
			return null;
		}

		const names: string[] = [];
		for (const key of keys) {
			const name = key._getKeyshortcutsKey();
			if (name !== null) {
				names.push(name);
			}
		}

		if (names.length === 0) {
			return null;
		}

		// Sort modifiers first (required by aria-keyshortcuts spec)
		const modifiers = names.filter((n) => MODIFIER_NAMES.has(n));
		const nonModifiers = names.filter((n) => !MODIFIER_NAMES.has(n));

		return [...modifiers, ...nonModifiers].join('+');
	}
}
