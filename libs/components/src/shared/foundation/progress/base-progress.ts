import {
	attr,
	nullableNumberConverter,
	observable,
} from '@microsoft/fast-element';
import { VividElement } from '../vivid-element/vivid-element';

/**
 * An Progress HTML Element.
 * Implements the {@link https://www.w3.org/TR/wai-aria-1.1/#progressbar | ARIA progressbar }.
 *
 * @public
 */
export class BaseProgress extends VividElement {
	/**
	 * The value of the progress
	 * @public
	 * @remarks
	 * HTML Attribute: value
	 */
	@attr({ converter: nullableNumberConverter })
	// @ts-expect-error Type is incorrectly non-optional
	value: number | null;
	/**
	 * @internal
	 */
	valueChanged() {
		if (this.$fastController.isConnected) {
			this.updatePercentComplete();
		}
	}

	/**
	 * The minimum value
	 * @public
	 * @remarks
	 * HTML Attribute: min
	 */
	@attr({ converter: nullableNumberConverter })
	// @ts-expect-error Type is incorrectly non-optional
	min: number;
	/**
	 * @internal
	 */
	minChanged() {
		if (this.$fastController.isConnected) {
			this.updatePercentComplete();
		}
	}

	/**
	 * The maximum value
	 * @public
	 * @remarks
	 * HTML Attribute: max
	 */
	@attr({ converter: nullableNumberConverter })
	// @ts-expect-error Type is incorrectly non-optional
	max: number;
	/**
	 * @private
	 */
	maxChanged() {
		if (this.$fastController.isConnected) {
			this.updatePercentComplete();
		}
	}

	/**
	 * Indicates the progress is paused
	 * @public
	 * @remarks
	 * HTML Attribute: paused
	 */
	@attr({ mode: 'boolean' })
	// @ts-expect-error Type is incorrectly non-optional
	paused: boolean;

	/**
	 * Indicates progress in %
	 * @internal
	 */
	@observable
	percentComplete = 0;

	/**
	 * @internal
	 */
	override connectedCallback() {
		super.connectedCallback();
		this.updatePercentComplete();
	}

	private updatePercentComplete() {
		const min = typeof this.min === 'number' ? this.min : 0;
		const max = typeof this.max === 'number' ? this.max : 100;
		const value = typeof this.value === 'number' ? this.value : 0;
		const range = max - min;

		this.percentComplete =
			range === 0 ? 0 : Math.fround(((value - min) / range) * 100);
	}
}
