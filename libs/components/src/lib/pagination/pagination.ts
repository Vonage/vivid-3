import { FoundationElement } from '@microsoft/fast-foundation';
import {attr, observable, ValueConverter, volatile} from '@microsoft/fast-element';

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
	@observable
	public paginationButtons?: HTMLElement[];

	@volatile
	get pagesList() {
		return new Array(this.total < MAX_DIGITS_AND_PLACEHOLDERS ? this.total :
			MAX_DIGITS_AND_PLACEHOLDERS).fill(0).map((_, i) => {
			if (this.total > MAX_DIGITS_AND_PLACEHOLDERS) {
				if (this.selectedIndex && this.selectedIndex === (this.total - 2) && (i === MAX_DIGITS_AND_PLACEHOLDERS - 2))
					return this.total - 1;
				if (this.selectedIndex && this.selectedIndex >= 6 && i === 1) return '...';
				if (i === (MAX_DIGITS_AND_PLACEHOLDERS - 2)) return '...';
				if (i === MAX_DIGITS_AND_PLACEHOLDERS - 1) return this.total;
			}
			return i + 1;
		});
	}

	@attr({mode: 'reflect', converter: totalConverter}) total: number;
	@attr({mode: 'reflect', converter: totalConverter, attribute: 'selected-index'}) selectedIndex: number | undefined;

	constructor() {
		super();
		this.total = 0;
		this.selectedIndex = -1;
	}

	totalChanged(_: number, newValue: number) {
		if (newValue < 0) {
			this.total = 0;
		}

		if (newValue <= 0) {
			this.selectedIndex = -1;
		} else if (this.selectedIndex === -1) {
			this.selectedIndex = 0;
		}
	}

	selectedIndexChanged(oldValue: number, newValue: number) {
		if (oldValue === undefined) return;
		this.$emit('change', {selectedIndex: newValue, total: this.total, oldIndex: oldValue});
	}

	// paginationButtonsChanged(_: HTMLElement[] | undefined, newValue: HTMLElement[] | undefined) {
	// 	const pagesList = this.pagesList;
	// 	newValue?.forEach((button: HTMLElement, index: number) => {
	// 		button.addEventListener('keydown', e => {
	// 			if (e.key === ' ') {
	// 				handleSelection(pagesList[index], {parent: this});
	// 			}
	// 		});
	// 	});
	// }
}

