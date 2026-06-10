import { observable } from '@microsoft/fast-element';
import type { VividElement } from '../foundation/vivid-element/vivid-element';
import type { Constructor, MixinType } from '../utils/mixins';

export const WithKbdShortcut = <T extends Constructor<VividElement>>(
	Base: T
) => {
	/**
	 * @slot kbd-shortcut - Used to display a keyboard shortcut.
	 */
	class WithKbdShortcutElement extends Base {
		/** @internal */
		@observable _kbdShortcutSlotted!: Element[];

		/**
		 * The `aria-keyshortcuts` value derived from the slotted `kbd-shortcut`
		 * element, or `undefined` when no shortcut is present.
		 *
		 * @internal
		 */
		@observable _kbdAriaShortcutsValue?: string;

		/** @internal */
		_kbdShortcutSlottedChanged() {
			const shortcut = this._kbdShortcutSlotted.find(
				(el) => typeof (el as any).getKeyshortcutsValue === 'function'
			);

			this._kbdAriaShortcutsValue =
				(shortcut as any)?.getKeyshortcutsValue() ?? undefined;
		}
	}

	return WithKbdShortcutElement;
};

export type WithKbdShortcutElement = MixinType<typeof WithKbdShortcut>;
