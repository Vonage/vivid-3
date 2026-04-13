import { observable } from '@microsoft/fast-element';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';

/**
 * @public
 * @component kbd-shortcut
 * @slot - Default slot for Kbd elements.
 */
export class KbdShortcut extends VividElement {
	/**
	 * @internal
	 */
	@observable slottedKeys?: Element[];

	#assignedChildren: Element[] = [];

	/**
	 * @internal
	 */
	slottedKeysChanged() {
		const incoming = this.slottedKeys ?? [];

		// When children are assigned to named slots, they leave the default slot
		// and the slotted directive fires again with an empty array. Ignore it.
		if (incoming.length === 0 && this.#assignedChildren.length > 0) {
			return;
		}

		this.#assignedChildren = [...incoming];
		this.#buildKeys();
	}

	#buildKeys() {
		const container = this.shadowRoot?.querySelector('.keys');
		if (!container) return;

		container.innerHTML = '';

		this.#assignedChildren.forEach((child, index) => {
			const slotName = `key-${index}`;
			child.setAttribute('slot', slotName);

			if (index > 0) {
				const sep = document.createElement('span');
				sep.className = 'separator';
				sep.textContent = '+';
				container.appendChild(sep);
			}

			const wrapper = document.createElement('span');
			wrapper.className = 'key-wrapper';
			const slot = document.createElement('slot');
			slot.name = slotName;
			wrapper.appendChild(slot);
			container.appendChild(wrapper);
		});
	}
}
