import {elementUpdated, fixture, getControlElement} from '@vivid-nx/shared';
import { Pagination } from './pagination';
import '.';
import type {Button} from "../button/button";

const COMPONENT_TAG = 'vwc-pagination';

function getButtonText(button: any) {
	const firstButtonText = button.label || button.textContent.trim();
	return firstButtonText;
}

describe('vwc-pagination', () => {
	let element: Pagination;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as Pagination;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-pagination', async () => {
			expect(element).toBeInstanceOf(Pagination);
		});
	});

	describe('total', () => {
		it('should init as 0', async () => {
			expect(element.total).toEqual(0);
		});

		it('should set total as zero of set as negative', async () => {
			element.total = -10;
			expect(element.total).toEqual(0);
		});

		it('should reflect total attribute', async function () {
			element.setAttribute('total', '10');
			await elementUpdated(element);
			expect(element.total).toEqual(10);
		});

		it('should add a button when total is set to 1', async () => {
			element.total = 1;
			await elementUpdated(element);
			const buttons = element.shadowRoot?.querySelectorAll('.vwc-pagination-button');
			const firstButtonText = getButtonText(buttons?.item(0));
			expect(element.pagesList.length).toEqual(1);
			expect(buttons?.length).toEqual(1);
			expect(firstButtonText).toEqual('1');
		});

		it.each([2, 3, 4, 5, 6, 7])('should add %i buttons when total is set to %i', async (total) => {
			element.total = total;
			await elementUpdated(element);
			const buttons = element.shadowRoot?.querySelectorAll('.vwc-pagination-button');
			expect(element.pagesList.length).toEqual(total);
			expect(buttons?.length).toEqual(total);
			buttons?.forEach((button: any, index: number) => {
				const buttonText = getButtonText(button);
				expect(buttonText).toEqual(`${index + 1}`);
			});
		});

		it('should add 1,2,3 buttons, 3 dots and the last page when over 7 total', async () => {
			element.total = 20;
			await elementUpdated(element);
			const buttonsAndDots = getControlElement(element).querySelector('#buttons-wrapper')?.children;
			const dots = buttonsAndDots?.item(5);
			const lastItem = buttonsAndDots?.item(6);
			expect(buttonsAndDots?.length).toEqual(7);
			expect(getButtonText(dots)).toEqual('...');
			expect(getButtonText(lastItem)).toEqual(element.total.toString());
		});

		it(`should set the second and one before last as "..."
			when total over 7 and selectedIndex between 6 and total - 1 `, async function () {
			element.total = 20;
			element.selectedIndex = 6;
			await elementUpdated(element);
			const buttonsAndDots = getControlElement(element).querySelector('#buttons-wrapper')?.children;
			expect(getButtonText(buttonsAndDots?.item(1))).toEqual('...');
			expect(getButtonText(buttonsAndDots?.item(5))).toEqual('...');
		});

		it('should set only the first as "..." when total over 7 and selected index is one before last', async function () {
			element.total = 20;
			element.selectedIndex = 18;
			await elementUpdated(element);
			const buttonsAndDots = getControlElement(element).querySelector('#buttons-wrapper')?.children;
			expect(getButtonText(buttonsAndDots?.item(1))).toEqual('...');
			expect(getButtonText(buttonsAndDots?.item(buttonsAndDots?.length - 2))).toEqual('19');
		});
	});

	describe('selectedIndex', function () {
		it('should init as -1', async () => {
			expect(element.selectedIndex).toEqual(-1);
		});

		it('should set selectedIndex as zero only when first setting total', async () => {
			element.total = 2;
			const selectedIndexAfterFirstTotalSet = element.selectedIndex;

			element.selectedIndex = 1;
			element.total = 3;
			const selectedIndexAfterSecondTotalSet = element.selectedIndex;

			expect(selectedIndexAfterFirstTotalSet).toEqual(0);
			expect(selectedIndexAfterSecondTotalSet).toEqual(1);
		});

		it('should reflect selectedIndex attribute', async function () {
			element.setAttribute('selected-index', '10');
			await elementUpdated(element);
			expect(element.selectedIndex).toEqual(10);
		});

		it('should set to -1 when total is set to zero', function () {
			element.total = 2;
			element.total = 0;
			expect(element.selectedIndex).toEqual(-1);
		});

		it('should set appearance "filled" of selectedIndex', async function () {
			element.total = 20;
			element.selectedIndex = 3;
			await elementUpdated(element);
			const button = element.shadowRoot?.querySelectorAll('.vwc-pagination-button').item(3);
			expect(button?.getAttribute('appearance')).toEqual('filled');
		});

		it('should set appearance "ghost" to any unselected buttons', async function () {
			element.total = 20;
			element.selectedIndex = 3;
			await elementUpdated(element);
			const buttons = Array.from(element.shadowRoot?.querySelectorAll('.vwc-pagination-button') as unknown as Button[]);
			buttons.forEach((button: Button, index: number) => {
				if (index !== 3) {
					expect(button.getAttribute('appearance')).toEqual('ghost');
				}
			});
		});
	});

	describe('prev/next buttons', function () {
		let prevButton: Button | undefined | null;
		let nextButton: Button | undefined | null;

		beforeEach(function () {
			element.total = 20;
			prevButton = element.shadowRoot?.querySelector('.vwc-pagination-prev-button');
			nextButton = element.shadowRoot?.querySelector('.vwc-pagination-next-button');
		});

		it('should set prevButton to enabled if selectedIndex is not 0', async function () {
			element.selectedIndex = 3;
			await elementUpdated(element);
			expect(prevButton?.disabled).toEqual(false);
		});

		it('should set nextButton to enabled if selectedIndex is not the last', async function () {
			element.selectedIndex = 19;
			await elementUpdated(element);
			element.selectedIndex = 3;
			await elementUpdated(element);
			expect(nextButton?.disabled).toEqual(false);
		});

		it('should set prevButton to disabled if selectedIndex is 0', async function () {
			element.selectedIndex = 0;
			await elementUpdated(element);
			expect(prevButton?.disabled).toEqual(true);
		});

		it('should set nextButton to disabled if selectedIndex is the last', async function () {
			element.selectedIndex = 19;
			await elementUpdated(element);
			expect(nextButton?.disabled).toEqual(true);
		});

		it('should increase selectedIndex when nextButton is clicked', async function () {
			element.selectedIndex = 3;
			await elementUpdated(element);
			nextButton?.click();
			expect(element.selectedIndex).toEqual(4);
		});

		it('should decrease selectedIndex when prevButton is clicked', async function () {
			element.selectedIndex = 3;
			await elementUpdated(element);
			prevButton?.click();
			expect(element.selectedIndex).toEqual(2);
		});

		it('should disabled buttons when selectedIndex is -1', async function () {
			element.total = 0;
			await elementUpdated(element);
			expect(prevButton?.disabled).toEqual(true);
			expect(nextButton?.disabled).toEqual(true);
		});
	});

	describe('pagesList', function () {
		it('should be immutable', function () {
			const pagesList = element.pagesList;
			expect(element.pagesList === pagesList).toEqual(false);
		});
	});

	describe('click events', function () {
		let buttons: NodeListOf<Element> | undefined;

		function setEventListeners(status: { clicked: boolean; event?: Event;}) {
			element.addEventListener('change', (e) => {
				status.clicked = true;
				status.event = e;
			});
		}
		beforeEach(async function () {
			element.selectedIndex = 1;

			element.total = 20;
			await elementUpdated(element);
			buttons = element.shadowRoot?.querySelectorAll('.vwc-pagination-button');
		});

		it('should change selectedIndex when clicking a valid button', async function () {
			const status = {clicked: false};
			setEventListeners(status);
			const button = buttons?.item(2);
			button?.dispatchEvent(new MouseEvent('click'));
			expect(element.selectedIndex).toEqual(2);
		});

		it('should leave selectedIndex as is when clicking the "..." button', async function () {
			const status = {clicked: false};
			setEventListeners(status);
			element.selectedIndex = 2;
			const dots = getControlElement(element).querySelector('.vwc-pagination-dots');
			dots?.dispatchEvent(new MouseEvent('click'));
			expect(element.selectedIndex).toEqual(2);
		});

		it('should fire the "change" event with the selectedIndex, total and oldIndex', async function () {
			const status = {clicked: false, event: new Event('test')};
			setEventListeners(status);
			const button = buttons?.item(2);
			button?.dispatchEvent(new MouseEvent('click'));
			expect(status.clicked).toEqual(true);
			expect((status.event as MouseEvent).detail).toEqual({selectedIndex: 2, total: 20, oldIndex: 1});
		});

		it('should prevent "change" event when selected button is clicked', function () {
			const status = {clicked: false, event: new Event('test')};
			setEventListeners(status);
			element.selectedIndex = 1;
			const button = buttons?.item(1);
			button?.dispatchEvent(new MouseEvent('click'));
			expect(status.clicked).toEqual(false);
		});

		it('should prevent change event when "..." is clicked', async () => {
			const status = {clicked: false, event: new Event('test')};
			setEventListeners(status);
			const dots = getControlElement(element).querySelector('.vwc-pagination-dots');
			dots?.dispatchEvent(new MouseEvent('click'));
			expect(status.clicked).toEqual(false);
		});

		it('should prevent change event on init', async () => {
			const status = {clicked: false, event: new Event('test')};
			setEventListeners(status);
			(element as any).selectedIndexChanged(undefined);
			expect(status.clicked).toEqual(false);
		});
	});

	describe('keyboard events', function () {
		it('should select tag on spacebar', async function () {
			element.total = 20;
			await elementUpdated(element);
			const button = element.shadowRoot?.querySelectorAll('.vwc-pagination-button').item(3);
			const event = new KeyboardEvent('keydown', {key: ' ', bubbles: true, composed: true});
			button?.dispatchEvent(event);
			expect(element.selectedIndex).toEqual(3);
		});

		it('should select tag on Enter', async function () {
			element.total = 30;
			await elementUpdated(element);
			const button = element.shadowRoot?.querySelectorAll('.vwc-pagination-button').item(1);
			const event = new KeyboardEvent('keydown', {key: 'Enter', bubbles: true, composed: true});
			button?.dispatchEvent(event);
			expect(element.selectedIndex).toEqual(1);
		});
	});
});
