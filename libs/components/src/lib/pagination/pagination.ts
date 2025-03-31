import {
	attr,
	observable,
	type ValueConverter,
	volatile,
} from '@microsoft/fast-element';
import type { Shape, Size } from '../enums';
import type { Button } from '../button/button';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';
import type { ExtractFromEnum } from '../../shared/utils/enums';

export type PaginationSize = ExtractFromEnum<
	Size,
	Size.SuperCondensed | Size.Condensed | Size.Normal
>;

export type PaginationShape = ExtractFromEnum<
	Shape,
	Shape.Rounded | Shape.Pill
>;

const MAX_DIGITS_AND_PLACEHOLDERS = 7;
const totalConverter: ValueConverter = {
	fromView: (value: string) => parseInt(value, 10),
	toView: (value: number) => value.toString(),
};

/**
 * @public
 * @component pagination
 * @event {CustomEvent<{selectedIndex: number, total: number, oldIndex: number}>} pagination-change - Fires when the page changes.
 */
export class Pagination extends VividElement {
	/**
	 * The size the pagination should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: size
	 */
	@attr size?: PaginationSize;

	/**
	 * The shape the pagination should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: shape
	 */
	@attr shape?: PaginationShape;

	@observable
	paginationButtons?: Button[];

	@observable
	prevButton?: Button;

	@observable
	nextButton?: Button;

	@attr({ attribute: 'nav-icons', mode: 'boolean' }) navIcons = false;

	@volatile
	get pagesList() {
		return new Array(
			this.total < MAX_DIGITS_AND_PLACEHOLDERS
				? this.total
				: MAX_DIGITS_AND_PLACEHOLDERS
		)
			.fill(0)
			.map((_, i, arr) => {
				if (i === 0) return 1;
				if (i === arr.length - 1) return this.total;

				if (
					this.selectedIndex !== undefined &&
					this.total > MAX_DIGITS_AND_PLACEHOLDERS
				) {
					if (this.selectedIndex < 4) {
						if (i === MAX_DIGITS_AND_PLACEHOLDERS - 2) return '...';
					}
					if (this.selectedIndex >= 4 && this.selectedIndex <= this.total - 5) {
						if (i > 1 && i < MAX_DIGITS_AND_PLACEHOLDERS - 2)
							return this.selectedIndex + (i - 2);
						if (i === 1 || i === MAX_DIGITS_AND_PLACEHOLDERS - 2) return '...';
					}
					if (this.selectedIndex > this.total - 5) {
						if (i > 1) return this.total - (6 - i);
						if (i === 1) return '...';
					}
				}
				return i + 1;
			});
	}

	@attr({ mode: 'reflect', converter: totalConverter }) total: number;
	@attr({
		mode: 'reflect',
		converter: totalConverter,
		attribute: 'selected-index',
	})
	selectedIndex: number | undefined;

	constructor() {
		super();
		this.total = 0;
		this.selectedIndex = 0;
		this.addEventListener('tabpressed', (e: Event) => {
			const { value: currentLabel, shiftKey } = (e as CustomEvent).detail;
			const index = this.paginationButtons!.findIndex(
				(button) => Number(button.label) === currentLabel
			) as number;
			const focusDirection = shiftKey ? -1 : 1;
			const newIndex = index + focusDirection;
			if (newIndex < 0) {
				return this.prevButton!.focus();
			}
			if (newIndex > this.paginationButtons!.length - 1) {
				return this.nextButton!.focus();
			}
			this.paginationButtons &&
				this.paginationButtons[index + focusDirection].focus();
		});
	}

	totalChanged(_: number, newValue: number) {
		if (newValue < 0) {
			this.total = 0;
			return;
		}

		this.#constrainSelectedIndex();
	}

	selectedIndexChanged(oldValue: number, newValue: number) {
		if (oldValue === undefined) return;
		this.$emit('pagination-change', {
			selectedIndex: newValue,
			total: this.total,
			oldIndex: oldValue,
		});

		this.#constrainSelectedIndex();
	}

	paginationButtonsChanged(_: Button[] | undefined, newValue: Button[]) {
		newValue.forEach((button) => {
			button
				.shadowRoot!.querySelector('button')!
				.setAttribute('part', 'button');
		});
	}

	get #constrainedSelectedIndex() {
		return Math.max(0, Math.min(this.selectedIndex ?? 0, this.total - 1));
	}

	#constrainSelectedIndex() {
		if (this.selectedIndex !== this.#constrainedSelectedIndex) {
			// Need to queue constraining in case total and selectedIndex are set together synchronously
			window.queueMicrotask(() => {
				if (this.selectedIndex !== this.#constrainedSelectedIndex) {
					this.selectedIndex = this.#constrainedSelectedIndex;
				}
			});
		}
	}
}
