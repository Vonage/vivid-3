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
	@attr({mode: 'reflect', converter: totalConverter, attribute: 'selected-index'}) selectedIndex: number;

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

		this.pagesList = new Array(this.total).fill(0);
	}
}

