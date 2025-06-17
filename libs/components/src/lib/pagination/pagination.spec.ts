import { elementUpdated, fixture, getControlElement } from '@vivid-nx/shared';
import type { Button } from '../button/button';
import { Shape, Size } from '../enums';
import '.';
import {
	Pagination,
	type PaginationShape,
	type PaginationSize,
} from './pagination';

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

			expect(element.navIcons).toBeFalsy();
			expect(element.total).toEqual(0);
			expect(element.selectedIndex).toEqual(0);
			expect(element.shape).toBeUndefined();
			expect(element.size).toBeUndefined();
		});

		it('should allow being created via createElement', () => {
			// createElement may fail even though indirect instantiation through innerHTML etc. succeeds
			// This is because only createElement performs checks for custom element constructor requirements
			// See https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance
			expect(() => document.createElement(COMPONENT_TAG)).not.toThrow();
		});
	});

	describe('total', () => {
		it('should init as 0', async () => {
			expect(element.total).toEqual(0);
		});

		it('should set total as zero if set as negative', async () => {
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
			const buttons = element.shadowRoot?.querySelectorAll(
				'.vwc-pagination-button'
			);
			const firstButtonText = getButtonText(buttons?.item(0));
			expect(element.pagesList.length).toEqual(1);
			expect(buttons?.length).toEqual(1);
			expect(firstButtonText).toEqual('1');
		});

		it.each([2, 3, 4, 5, 6, 7])(
			'should add %i buttons when total is set to %i',
			async (total) => {
				element.total = total;
				await elementUpdated(element);
				const buttons = getButtons(element);
				expect(element.pagesList.length).toEqual(total);
				expect(buttons?.length).toEqual(total);
				buttons?.forEach((button: any, index: number) => {
					const buttonText = getButtonText(button);
					expect(buttonText).toEqual(`${index + 1}`);
				});
			}
		);

		it('should set the numbers around selectedIndex to minus 1 and plus one', async function () {
			element.total = 20;
			element.selectedIndex = 10;
			await elementUpdated(element);
			const buttonsAndDots =
				getControlElement(element).querySelector('#buttons-wrapper')?.children;
			expect(getButtonText(buttonsAndDots?.item(2))).toEqual('10');
			expect(getButtonText(buttonsAndDots?.item(3))).toEqual('11');
			expect(getButtonText(buttonsAndDots?.item(4))).toEqual('12');
		});

		it('should add 1,2,3 buttons, 3 dots and the last page when over 7 total', async () => {
			element.total = 20;
			await elementUpdated(element);
			const buttonsAndDots =
				getControlElement(element).querySelector('#buttons-wrapper')?.children;
			const dots = buttonsAndDots?.item(5);
			const lastItem = buttonsAndDots?.item(6);
			expect(buttonsAndDots?.length).toEqual(7);
			expect(getButtonText(dots)).toEqual('...');
			expect(getButtonText(lastItem)).toEqual(element.total.toString());
		});

		it('should set 1, "..." and the last 4 numbers when in the last four', function () {
			element.total = 20;
			element.selectedIndex = 17;
			expect(element.pagesList).toEqual([1, '...', 16, 17, 18, 19, 20]);
		});

		it(`should set the second and one before last as "..."
			when selectedIndex between 4 and (total-5)`, async function () {
			element.total = 20;
			element.selectedIndex = 4;
			await elementUpdated(element);
			const buttonsAndDots =
				getControlElement(element).querySelector('#buttons-wrapper')?.children;
			expect(getButtonText(buttonsAndDots?.item(1))).toEqual('...');
			expect(getButtonText(buttonsAndDots?.item(5))).toEqual('...');
		});

		it('should set only the first as "..." when total over 7 and selected index is one before last', async function () {
			element.total = 20;
			element.selectedIndex = 18;
			await elementUpdated(element);
			const buttonsAndDots =
				getControlElement(element).querySelector('#buttons-wrapper')?.children;
			expect(getButtonText(buttonsAndDots?.item(1))).toEqual('...');
			expect(
				getButtonText(buttonsAndDots?.item(buttonsAndDots?.length - 2))
			).toEqual('19');
		});
	});

	describe('selectedIndex', function () {
		it('should be initialized to 0, instead of -1 which would make more sense but we have to keep it now for backwards compatibility', async () => {
			expect(element.selectedIndex).toEqual(0);
		});

		it('should constrain selectedIndex to the max page index', async () => {
			element.total = 2;
			element.selectedIndex = 2;
			await elementUpdated(element);
			expect(element.selectedIndex).toEqual(1);
		});

		it('should constrain selectedIndex to the min page index', async () => {
			element.total = 2;
			element.selectedIndex = -1;
			await elementUpdated(element);
			expect(element.selectedIndex).toEqual(0);
		});

		it('should constrain selectedIndex to 0 when total is 0', async () => {
			element.total = 0;
			element.selectedIndex = 1;
			await elementUpdated(element);
			expect(element.selectedIndex).toEqual(0);
		});

		it('should reflect selectedIndex attribute', async function () {
			element.total = 20;
			element.setAttribute('selected-index', '10');
			await elementUpdated(element);
			expect(element.selectedIndex).toEqual(10);
		});

		it('should set appearance "filled" of selectedIndex', async function () {
			element.total = 20;
			element.selectedIndex = 3;
			await elementUpdated(element);
			const button = element.shadowRoot
				?.querySelectorAll('.vwc-pagination-button')
				.item(3);
			expect(button?.getAttribute('appearance')).toEqual('filled');
		});

		it('should set appearance "filled" of selectedIndex when navigating beyond boundary', async function () {
			element.total = 20;
			element.selectedIndex = 4;
			await elementUpdated(element);
			const button = element.shadowRoot
				?.querySelectorAll('.vwc-pagination-button')
				.item(2);
			expect(button?.getAttribute('appearance')).toEqual('filled');
		});

		it('should set appearance "ghost" to any unselected buttons', async function () {
			element.total = 20;
			element.selectedIndex = 3;
			await elementUpdated(element);
			const buttons = getButtons(element);
			buttons.forEach((button: Button, index: number) => {
				if (index !== 3) {
					expect(button.getAttribute('appearance')).toEqual('ghost');
				}
			});
		});
	});

	describe('navIcons', function () {
		let prevButton: Button | undefined | null;
		let nextButton: Button | undefined | null;

		beforeEach(async function () {
			element.total = 20;
			await elementUpdated(element);
			prevButton = element.shadowRoot?.querySelector('.prev-button');
			nextButton = element.shadowRoot?.querySelector('.next-button');
		});

		it('should default to true', function () {
			expect(element.navIcons).toEqual(false);
		});

		it('should set icons if set to true', async function () {
			element.navIcons = true;
			await elementUpdated(element);
			expect(prevButton?.hasAttribute('label')).toEqual(false);
			expect(nextButton?.hasAttribute('label')).toEqual(false);
			expect(prevButton?.getAttribute('icon')).toEqual('chevron-left-line');
			expect(nextButton?.getAttribute('icon')).toEqual('chevron-right-line');
		});

		it('should use text buttons if set to false', async function () {
			element.navIcons = false;
			await elementUpdated(element);
			expect(prevButton?.getAttribute('label')).toEqual('Previous');
			expect(nextButton?.getAttribute('label')).toEqual('Next');
			expect(prevButton?.hasAttribute('icon')).toEqual(false);
			expect(nextButton?.hasAttribute('icon')).toEqual(false);
		});
	});

	describe('prev/next buttons', function () {
		let prevButton: Button | undefined | null;
		let nextButton: Button | undefined | null;

		beforeEach(async function () {
			element.total = 20;
			await elementUpdated(element);
			prevButton = element.shadowRoot?.querySelector('.prev-button');
			nextButton = element.shadowRoot?.querySelector('.next-button');
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
			expect(nextButton?.hasAttribute('disabled')).toEqual(false);
		});

		it('should set prevButton to disabled if selectedIndex is 0', async function () {
			element.selectedIndex = 0;
			await elementUpdated(element);
			expect(prevButton?.hasAttribute('disabled')).toEqual(true);
		});

		it('should set nextButton to disabled if selectedIndex is the last', async function () {
			element.selectedIndex = 19;
			await elementUpdated(element);
			expect(nextButton?.hasAttribute('disabled')).toEqual(true);
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

		it('should disabled buttons when no pages are shown', async function () {
			element.total = 0;
			await elementUpdated(element);
			expect(prevButton?.hasAttribute('disabled')).toEqual(true);
			expect(nextButton?.hasAttribute('disabled')).toEqual(true);
		});
	});

	describe('pagesList', function () {
		it('should be immutable', function () {
			const pagesList = element.pagesList;
			expect(element.pagesList === pagesList).toEqual(false);
		});
	});

	describe('pagination-change event', function () {
		describe('when setting initial values before connecting', function () {
			it('should not fire when selectedIndex is set to its default value', async function () {
				const pagination = document.createElement(
					'vwc-pagination'
				) as Pagination;
				const listener = vi.fn();
				pagination.addEventListener('pagination-change', listener);

				pagination.total = 10;
				pagination.selectedIndex = 0;
				element.replaceWith(pagination);
				await elementUpdated(pagination);

				expect(listener).not.toHaveBeenCalled();
			});

			it('should not fire when selectedIndex is set to another value', async function () {
				const pagination = document.createElement(
					'vwc-pagination'
				) as Pagination;
				const listener = vi.fn();
				pagination.addEventListener('pagination-change', listener);

				pagination.total = 10;
				pagination.selectedIndex = 1;
				element.replaceWith(pagination);
				await elementUpdated(pagination);

				expect(listener).not.toHaveBeenCalled();
			});
		});

		describe('when setting initial values after connecting which is what the react wrappers do', () => {
			it('should not fire when selectedIndex is set to its default value', async function () {
				const pagination = document.createElement(
					'vwc-pagination'
				) as Pagination;
				const listener = vi.fn();
				pagination.addEventListener('pagination-change', listener);

				element.replaceWith(pagination);
				pagination.total = 10;
				pagination.selectedIndex = 0;
				await elementUpdated(pagination);

				expect(listener).not.toHaveBeenCalled();
			});

			it('should fire when selectedIndex is set to a different value', async function () {
				const pagination = document.createElement(
					'vwc-pagination'
				) as Pagination;
				const listener = vi.fn();
				pagination.addEventListener('pagination-change', listener);

				element.replaceWith(pagination);
				pagination.total = 10;
				pagination.selectedIndex = 1;
				await elementUpdated(pagination);

				expect(listener).toHaveBeenCalledOnce();
			});
		});
	});

	describe('click events', function () {
		let buttons: NodeListOf<Element> | undefined;

		function setEventListeners(status: { clicked: boolean; event?: Event }) {
			element.addEventListener('pagination-change', (e) => {
				status.clicked = true;
				status.event = e;
			});
		}
		beforeEach(async function () {
			element.total = 20;
			await elementUpdated(element);
			buttons = element.shadowRoot?.querySelectorAll('.vwc-pagination-button');
		});

		it('should change selectedIndex when clicking a valid button', async function () {
			const status = { clicked: false };
			setEventListeners(status);
			const button = buttons?.item(2);
			button?.dispatchEvent(new MouseEvent('click'));
			expect(element.selectedIndex).toEqual(2);
		});

		it('should leave selectedIndex as is when clicking the "..." button', async function () {
			const status = { clicked: false };
			setEventListeners(status);
			element.selectedIndex = 2;
			const dots = getControlElement(element).querySelector('.dots');
			dots?.dispatchEvent(new MouseEvent('click'));
			expect(element.selectedIndex).toEqual(2);
		});

		it('should fire the "pagination-change" event with the selectedIndex, total and oldIndex', async function () {
			const status = { clicked: false, event: new Event('test') };
			setEventListeners(status);
			const button = buttons?.item(2);
			button?.dispatchEvent(new MouseEvent('click'));
			expect(status.clicked).toEqual(true);
			expect((status.event as MouseEvent).detail).toEqual({
				selectedIndex: 2,
				total: 20,
				oldIndex: 0,
			});
		});

		it('should prevent "pagination-change" event when selected button is clicked', async function () {
			const status = { clicked: false, event: new Event('test') };
			element.selectedIndex = 1;
			await elementUpdated(element);
			setEventListeners(status);
			const button = buttons?.item(1);
			button?.dispatchEvent(new MouseEvent('click'));
			expect(status.clicked).toEqual(false);
		});

		it('should prevent "pagination-change" event when "..." is clicked', async () => {
			const status = { clicked: false, event: new Event('test') };
			setEventListeners(status);
			const dots = getControlElement(element).querySelector('.dots');
			dots?.dispatchEvent(new MouseEvent('click'));
			expect(status.clicked).toEqual(false);
		});
	});

	function getButtons(element: Pagination) {
		return Array.from(
			element.shadowRoot?.querySelectorAll(
				'.vwc-pagination-button'
			) as unknown as Button[]
		);
	}

	describe('keyboard events', function () {
		beforeEach(async function () {
			element.total = 30;
			await elementUpdated(element);
		});

		it('should select tag on spacebar', async function () {
			const button = getButtons(element)[3];
			const event = new KeyboardEvent('keydown', {
				key: ' ',
				bubbles: true,
				composed: true,
			});
			button?.dispatchEvent(event);
			expect(element.selectedIndex).toEqual(3);
		});

		it('should select tag on Enter', async function () {
			const button = getButtons(element)[1];
			const event = new KeyboardEvent('keydown', {
				key: 'Enter',
				bubbles: true,
				composed: true,
			});
			button?.dispatchEvent(event);
			expect(element.selectedIndex).toEqual(1);
		});

		it('should focus on next button on Tab press on a button', async function () {
			const buttons = getButtons(element);
			const button = buttons[1];
			button.focus();
			const event = new KeyboardEvent('keydown', {
				key: 'Tab',
				bubbles: true,
				composed: true,
			});
			button.dispatchEvent(event);
			expect((element.shadowRoot?.activeElement as any).label).toEqual(
				buttons[2].label
			);
		});

		it('should focus on previous button when tab+shift are pressed on a button', async function () {
			const buttons = getButtons(element);
			const button = buttons[1];
			button.focus();
			const event = new KeyboardEvent('keydown', {
				key: 'Tab',
				shiftKey: true,
				bubbles: true,
				composed: true,
			});
			button.dispatchEvent(event);
			expect((element.shadowRoot?.activeElement as any).label).toEqual(
				buttons[0].label
			);
		});

		it('should focus on prev button if focused on the first element', async function () {
			element.selectedIndex = 5;
			await elementUpdated(element);
			const prevButton = element.shadowRoot?.querySelector(
				'.prev-button'
			) as Button;
			const buttons = getButtons(element);
			const button = buttons[0];
			button.focus();
			const event = new KeyboardEvent('keydown', {
				key: 'Tab',
				shiftKey: true,
				bubbles: true,
				composed: true,
			});
			button.dispatchEvent(event);
			expect((element.shadowRoot?.activeElement as any).label).toEqual(
				prevButton?.label
			);
		});

		it('should focus on prev button if focused on the first element', async function () {
			const nextButton = element.shadowRoot?.querySelector(
				'.next-button'
			) as Button;
			const buttons = getButtons(element);
			const button = buttons[5];
			button.focus();
			const event = new KeyboardEvent('keydown', {
				key: 'Tab',
				bubbles: true,
				composed: true,
			});
			button.dispatchEvent(event);
			expect((element.shadowRoot?.activeElement as any).label).toEqual(
				nextButton?.label
			);
		});
	});

	describe('tabindex', function () {
		it('should set tabindex of buttons to 0 by default', async function () {
			element.total = 20;
			await elementUpdated(element);
			const buttons = Array.from(
				element.shadowRoot?.querySelectorAll(
					'.vwc-pagination-button'
				) as unknown as Button[]
			);
			const allButtonsAriaPressedFalse = buttons?.reduce((correct, button) => {
				return correct && button.getAttribute('tabindex') === '0';
			}, true);
			expect(allButtonsAriaPressedFalse).toEqual(true);
		});
	});

	describe('size', function () {
		it('should set size super-condensed of all buttons by default', async function () {
			element.total = 20;
			await elementUpdated(element);
			const allButtons = Array.from(
				element.shadowRoot!.querySelectorAll('vwc-button')
			);
			const allButtonsCondensed = allButtons?.reduce((correct, button) => {
				return correct && button.size === Size.SuperCondensed;
			}, true);
			expect(allButtonsCondensed).toEqual(true);
		});

		it('should change all buttons sizes', async function () {
			element.total = 20;
			await elementUpdated(element);
			element.size = Size.Normal;
			await elementUpdated(element);
			const allButtons = Array.from(
				element.shadowRoot!.querySelectorAll('vwc-button')
			);
			const allButtonsCondensed = allButtons?.reduce((correct, button) => {
				return correct && button.size === Size.Normal;
			}, true);
			expect(allButtonsCondensed).toEqual(true);
		});

		it('should revert to super-condensed if set to invalid size', async function () {
			element.total = 20;
			await elementUpdated(element);
			element.size = 'invalid-size' as PaginationSize;
			await elementUpdated(element);
			const allButtons = Array.from(
				element.shadowRoot!.querySelectorAll('vwc-button')
			);
			const allButtonsCondensed = allButtons?.reduce((correct, button) => {
				return correct && button.size === Size.SuperCondensed;
			}, true);
			expect(allButtonsCondensed).toEqual(true);
		});

		it.each([
			['size-super-condensed', Size.SuperCondensed],
			['size-condensed', Size.Condensed],
			['size-normal', Size.Normal],
			['size-super-condensed', 'invalid-size' as PaginationSize],
		] as const)(
			'should set class %s on dots if size is %s',
			async function (className, size) {
				element.total = 20;
				element.size = size;
				await elementUpdated(element);
				const dots = element.shadowRoot?.querySelector('.dots');
				expect(dots?.classList.contains(className)).toEqual(true);
			}
		);
	});

	describe('shape', function () {
		it('should set shape rounded of all buttons by default', async function () {
			element.total = 20;
			await elementUpdated(element);
			const allButtons = Array.from(
				element.shadowRoot!.querySelectorAll('vwc-button')
			);
			const allButtonsRounded = allButtons?.reduce((correct, button) => {
				return correct && button.shape === Shape.Rounded;
			}, true);
			expect(allButtonsRounded).toEqual(true);
		});

		it('should change all buttons shapes', async function () {
			element.total = 20;
			await elementUpdated(element);
			element.shape = Shape.Pill;
			await elementUpdated(element);
			const allButtons = Array.from(
				element.shadowRoot!.querySelectorAll('vwc-button')
			);
			const allButtonsPill = allButtons?.reduce((correct, button) => {
				return correct && button.shape === Shape.Pill;
			}, true);
			expect(allButtonsPill).toEqual(true);
		});

		it('should revert to rounded if set to invalid shape', async function () {
			element.total = 20;
			await elementUpdated(element);
			element.shape = 'invalid-shape' as PaginationShape;
			await elementUpdated(element);
			const allButtons = Array.from(
				element.shadowRoot!.querySelectorAll('vwc-button')
			);
			const allButtonsRounded = allButtons?.reduce((correct, button) => {
				return correct && button.shape === Shape.Rounded;
			}, true);
			expect(allButtonsRounded).toEqual(true);
		});
	});

	describe('a11y attributes', () => {
		it('should set aria-current false by default', async function () {
			element.total = 20;
			await elementUpdated(element);
			const buttons = Array.from(
				element.shadowRoot!.querySelectorAll('.vwc-pagination-button')
			);
			const allButtonsAriaSelectedFalse = buttons?.reduce(
				(correct, button, index) => {
					if (element.selectedIndex === index) return correct;
					return correct && button.getAttribute('aria-current') === 'false';
				},
				true
			);
			expect(allButtonsAriaSelectedFalse).toEqual(true);
		});

		it('should set descriptive aria-labels on the page buttons', async () => {
			element.total = 10;
			await elementUpdated(element);
			const buttons = element.shadowRoot?.querySelectorAll(
				'.vwc-pagination-button'
			);
			expect(buttons?.item(1)?.getAttribute('aria-label')).toEqual(
				'Go to page 2'
			);
			expect(buttons?.item(2)?.getAttribute('aria-label')).toEqual(
				'Go to page 3'
			);
		});

		it('should set descriptive aria-labels on the prev/next buttons', async function () {
			const prevButton = element.shadowRoot?.querySelector('.prev-button');
			const nextButton = element.shadowRoot?.querySelector('.next-button');
			expect(prevButton?.getAttribute('aria-label')).toEqual(
				'Go to previous page'
			);
			expect(nextButton?.getAttribute('aria-label')).toEqual('Go to next page');
		});
	});
});
