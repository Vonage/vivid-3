import { FoundationElement } from '@microsoft/fast-foundation';
import {attr, observable, ValueConverter, volatile} from '@microsoft/fast-element';
import type { Size } from '../enums';
import type {Button} from '../button/button';

export type PaginationSize = Extract<Size, Size.SuperCondensed | Size.Condensed | Size.Normal>;

const MAX_DIGITS_AND_PLACEHOLDERS = 7;
const totalConverter: ValueConverter = {
	fromView: (value: string) => parseInt(value, 10),
	toView: (value: number) => value.toString()
};

/**
 * Base class for pagination
 *
 * @public
 */
export class Pagination extends FoundationElement {
	@attr size?: PaginationSize;

	@observable
		paginationButtons?: Button[];

	@observable
		prevButton?: Button;

	@observable
		nextButton?: Button;

	@attr({attribute: 'nav-icons', mode: 'boolean'}) navIcons = false;

	@volatile
	get pagesList() {
		return new Array(this.total < MAX_DIGITS_AND_PLACEHOLDERS ? this.total :
			MAX_DIGITS_AND_PLACEHOLDERS).fill(0).map((_, i, arr) => {

			if (i === 0) return 1;
			if (i === arr.length - 1) return this.total;

			if (this.selectedIndex !== undefined && this.total > MAX_DIGITS_AND_PLACEHOLDERS) {
				if (this.selectedIndex < 4) {
					if (i === MAX_DIGITS_AND_PLACEHOLDERS - 2) return '...';
				}
				if (this.selectedIndex >= 4 && this.selectedIndex <= this.total - 5) {
					if (i > 1 && i < MAX_DIGITS_AND_PLACEHOLDERS - 2) return this.selectedIndex + (i - 2);
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

	@attr({mode: 'reflect', converter: totalConverter}) total: number;
	@attr({mode: 'reflect', converter: totalConverter, attribute: 'selected-index'}) selectedIndex: number | undefined;

	constructor() {
		super();
		this.total = 0;
		this.selectedIndex = 0;
		this.addEventListener('tabpressed', (e: Event) => {
			const {value: currentLabel, shiftKey} = (e as CustomEvent).detail;
			const index = this.paginationButtons!.findIndex(button => Number(button.label) === currentLabel) as number;
			const focusDirection = shiftKey ? -1 : 1;
			const newIndex = index + focusDirection;
			if (newIndex < 0) {
				return this.prevButton!.focus();
			}
			if (newIndex > this.paginationButtons!.length - 1) {
				return this.nextButton!.focus();
			}
			this.paginationButtons && this.paginationButtons[index + focusDirection].focus();
		});
	}

	totalChanged(_: number, newValue: number) {
		if (newValue < 0) {
			this.total = 0;
		}

		this.selectedIndex = 0;
	}

	selectedIndexChanged(oldValue: number, newValue: number) {
		if (oldValue === undefined) return;
		this.$emit('vwc-pagination-change', {selectedIndex: newValue, total: this.total, oldIndex: oldValue});
	}
}

