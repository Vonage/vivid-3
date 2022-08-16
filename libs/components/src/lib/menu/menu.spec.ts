import { ADD_TEMPLATE_TO_FIXTURE, elementUpdated, fixture } from '@vivid-nx/shared';
import type { Button } from '@microsoft/fast-foundation';
import { keyArrowDown, keyArrowUp } from '@microsoft/fast-web-utilities';
import { Menu } from './menu';
import '.';

const COMPONENT_TAG = 'vwc-menu';

describe('vwc-menu', () => {
	let element: Menu;

	global.ResizeObserver = jest.fn()
		.mockImplementation(() => ({
			observe: jest.fn(),
			unobserve: jest.fn(),
			disconnect: jest.fn()
		}));

	beforeEach(async () => {
		element = (await fixture(`<${COMPONENT_TAG}></${COMPONENT_TAG}>`)) as Menu;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-menu', async () => {
			expect(element).toBeInstanceOf(Menu);
			expect(element.open).toEqual(false);
			expect(element.anchor).toBeUndefined();
			expect(element.placement).toBeUndefined();
		});
	});

	describe('show', () => {
		it('should set "open" to true', async () => {
			await setAnchor();
			element.anchor = 'anchor';
			await elementUpdated(element);

			element.open = true;
			await elementUpdated(element);

			expect(element.open)
				.toEqual(true);
		});
	});

	describe('hide', () => {
		it('should set "open" to false', async () => {
			element.open = false;
			await elementUpdated(element);

			expect(element.open)
				.toEqual(false);
		});
	});

	describe('focus management', () => {
		it('should focus the first menuitem in the menu', async () => {
			const div = document.createElement('div');
			div.setAttribute('role', 'menuitem');
			element.appendChild(div);

			await elementUpdated(element);

			element.focus();

			expect(document.activeElement).toEqual(div);
		});

		it('should focus the first menuitemcheckbox in the menu', async () => {
			const div = document.createElement('div');
			div.setAttribute('role', 'menuitemcheckbox');
			element.appendChild(div);

			await elementUpdated(element);

			element.focus();

			expect(document.activeElement).toEqual(div);
		});

		it('should focus the first menuitemradio in the menu', async () => {
			const div = document.createElement('div');
			div.setAttribute('role', 'menuitemradio');
			element.appendChild(div);

			await elementUpdated(element);

			element.focus();

			expect(document.activeElement).toEqual(div);
		});

		it('should handle menu key down events', async () => {

			element.innerHTML = `
				<button role="menuitem" id="id1">Menu Item 1</button>
				<button role="menuitem" id="id2">Menu Item 1</button>
				<button role="menuitem" id="id3">Menu Item 1</button>
			`;

			await elementUpdated(element);

			element.focus();

			document.activeElement?.dispatchEvent(arrowDownEvent);
			expect(document.activeElement?.id).toEqual('id2');

			document.activeElement?.dispatchEvent(arrowDownEvent);
			expect(document.activeElement?.id).toEqual('id3');

			document.activeElement?.dispatchEvent(arrowUpEvent);
			expect(document.activeElement?.id).toEqual('id2');

			document.activeElement?.dispatchEvent(arrowUpEvent);
			expect(document.activeElement?.id).toEqual('id1');
		});

		it('should handle focus out event', async () => {

			element.innerHTML = `
				<div role="menuitem" id="id1">Menu Item 1</div>
				<div role="menuitem" id="id2">Menu Item 1</div>
			`;

			await elementUpdated(element);

			element.focus();

			document.activeElement?.dispatchEvent(arrowDownEvent);

			const menuFocusedElement = () => element.querySelector('[tabindex="0"]') as HTMLElement;
			expect(menuFocusedElement().id).toEqual('id2');

			const focusOutEvent = new FocusEvent('focusout');
			const { shadowRoot } = element;

			shadowRoot?.querySelector('.base')?.dispatchEvent(focusOutEvent);

			expect(menuFocusedElement().id).toEqual('id1');
		});
	});

	const arrowUpEvent = new KeyboardEvent('keydown', {
		key: keyArrowUp,
		bubbles: true,
	} as KeyboardEventInit);

	const arrowDownEvent = new KeyboardEvent('keydown', {
		key: keyArrowDown,
		bubbles: true,
	} as KeyboardEventInit);

	/**
	 *
	 */
	async function setAnchor() {
		const anchorEl = await fixture('<vwc-button id="anchor"></vwc-button>', ADD_TEMPLATE_TO_FIXTURE) as Button;
		await elementUpdated(anchorEl);
		return anchorEl;
	}
});
