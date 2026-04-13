import { observable } from '@microsoft/fast-element';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';
import { isApplePlatform } from '../../shared/utils/platform';

/**
 * @public
 * @component platform-switch
 * @slot - Default slot accepts children with optional platform constraints.
 */
export class PlatformSwitch extends VividElement {
	/**
	 * @internal
	 */
	@observable slottedContent!: Node[];

	/**
	 * @internal
	 */
	slottedContentChanged() {
		this.#updateVisibility();
	}

	#updateVisibility() {
		const children = this.slottedContent.filter(
			(n): n is HTMLElement => n instanceof HTMLElement
		);

		let matched = false;

		for (const child of children) {
			if (matched) {
				child.style.display = 'none';
				continue;
			}

			if (this.#matches(child)) {
				child.style.display = '';
				matched = true;
			} else {
				child.style.display = 'none';
			}
		}
	}

	#matches(el: HTMLElement): boolean {
		const keyboard = isApplePlatform() ? 'apple' : 'standard';
		const keyboardConstraint = el.dataset.keyboard;
		if (keyboardConstraint === undefined) return true;
		return keyboardConstraint === keyboard;
	}
}
