import { FoundationElement } from '@microsoft/fast-foundation';
import {attr, observable, ValueConverter} from '@microsoft/fast-element';

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
	@observable pagesList: any[] = [];
	/**
	 * Indicates the text's text.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: text
	 */
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

		this.pagesList = new Array(this.total < 5 ? this.total : 5).fill(0).map((_, i) => {
			if (this.total > 5 && i === 3) return '...';
			if (this.total > 5 && i === 4) return this.total;
			return i + 1;
		});
	}

	selectedIndexChanged(oldValue: number, newValue: number) {
		if (oldValue === undefined) return;
		this.$emit('change', {selectedIndex: newValue, total: this.total, oldIndex: oldValue});
	}
}

