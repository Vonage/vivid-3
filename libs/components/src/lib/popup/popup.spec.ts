import { elementUpdated, fixture } from '@vivid-nx/shared';
import { Position, Corner } from '../enums';
import { Popup } from './popup';
import type { Button } from '../button/button';
import '.';

const COMPONENT_TAG = 'vwc-popup';

describe('vwc-popup', () => {
	let element: Popup;

	beforeEach(async () => {
		element = await fixture(`<${COMPONENT_TAG}></${COMPONENT_TAG}>`) as Popup;
	});

	describe('basic', () => {
		it('initializes as a vwc-popup', async () => {
			expect(element).toBeInstanceOf(Popup);
			expect(element.open).toBeFalsy();
			expect(element.arrow).toBeFalsy();
			expect(element.dismissible).toBeFalsy();
			expect(element.anchor).toEqual("");
			expect(element.corner).toEqual(Corner.Left);
			expect(element.strategy).toEqual(Position.Fixed);
		});
	});

	describe(`show`, () => {
		it(`should set "open" to true`, async () => {
			addButton();

			element.anchor = 'anchor';
			await elementUpdated(element);
			
			element.show();
			await elementUpdated(element);

			expect(element.open).toEqual(true);
		});
	});

	// describe(`hide`, () => {
	// 	it(`should set "open" to false`, async () => {
	// 		element.hide();
	// 		await elementUpdated(element);

	// 		expect(element.open).toEqual(false);
	// 	});
	// });

	// describe(`anchor`, () => {
	// 	it(`should not set popup open if anchor element does not exist`, async () => {
	// 		element.anchor = 'anchor';
	// 		await elementUpdated(element);

	// 		element.show();
	// 		await elementUpdated(element);

	// 		expect(element.open).toEqual(false);
	// 	});

	// 	it(`should init the popup as open if anchor element does not exist`, async () => {
	// 		element.anchor = 'anchor';
	// 		await elementUpdated(element);

	// 		expect(element.open).toEqual(false);
	// 	});
	// });

	async function addButton(){
		let buttonEl = await fixture(`<vwc-button id="anchor"></vwc-button>`) as Button;
		await elementUpdated(buttonEl);
	}
});
