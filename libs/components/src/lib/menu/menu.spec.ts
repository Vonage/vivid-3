import { ADD_TEMPLATE_TO_FIXTURE, elementUpdated, fixture } from '@vivid-nx/shared';
import { Button, FoundationElementRegistry } from '@microsoft/fast-foundation';
import { keyArrowDown, keyArrowUp } from '@microsoft/fast-web-utilities';
import { Popup } from '../popup/popup';
import { Menu } from './menu';
import '.';
import { menuDefinition } from './definition';

const COMPONENT_TAG = 'vwc-menu';

describe('vwc-menu', () => {
	let element: Menu;

	global.ResizeObserver = jest.fn()
		.mockImplementation(() => ({
			observe: jest.fn(),
			unobserve: jest.fn(),
			disconnect: jest.fn()
		}));

	beforeAll(async () => {
		await customElements.whenDefined(COMPONENT_TAG);
	});

	beforeEach(async () => {
		element = (await fixture(`<${COMPONENT_TAG}></${COMPONENT_TAG}>`)) as Menu;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-menu', async () => {
			expect(menuDefinition()).toBeInstanceOf(FoundationElementRegistry);
			expect(element).toBeInstanceOf(Menu);
			expect(element.open).toEqual(false);
			expect(element.anchor).toBeUndefined();
			expect(element.placement).toBeUndefined();
			expect(element._popup).toBeInstanceOf(Popup);
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

	describe('auto-dismiss', () => {
		it('should set "open" to false when clicked outside', async () => {
			element.open = true;
			element.autoDismiss = true;

			await elementUpdated(element);

			document.body.dispatchEvent(new MouseEvent('click', {bubbles: true}));

			await elementUpdated(element);

			expect(element.open)
				.toEqual(false);
		});
	});

	describe('submenu', () => {
		it('should not be assigned to an explicit slot', async () => {
			expect(element.slot).toBeFalsy();
		});

		it('should be assigned to a custom slot', async () => {
			element.slot = 'custom';
			expect(element.slot).toEqual('custom');
		});

		it('should be assigned to submenu slot', async () => {
			const div = document.createElement('div');
			div.setAttribute('role', 'menuitem');

			element.parentNode?.appendChild(div);

			div.appendChild(element);

			expect(element.slot).toEqual('submenu');
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

		it('should set menu item tabindex to 0', async () => {
			const menuItem = document.createElement('vwc-menu-item');

			element.appendChild(menuItem);

			await elementUpdated(element);

			element.focus();

			expect(menuItem.tabIndex).toEqual(0);
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
				<button role="menuitem" id="id1" text="Menu Item 1"></button>
				<button role="menuitem" id="id2" text="Menu Item 2"></button>
				<button role="menuitem" id="id3" text="Menu Item 3"></button>
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
				<div role="menuitem" id="id1" text="Menu Item 1"></div>
				<div role="menuitem" id="id2" text="Menu Item 2"></div>
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

	describe('events', () => {
		it('should fire an event on popup open', async () => {
			let openTriggered: boolean = false;
			(element._popup as Popup).addEventListener('open', () => {
				openTriggered = true;
			});
			(element._popup as Popup).open = true;
			expect(openTriggered).toEqual(true);
		});

		it('should fire an event on popup close', async () => {
			let closeTriggered: boolean = false;
			(element._popup as Popup).open = true;
			(element._popup as Popup).addEventListener('close', () => {
				closeTriggered = true;
			});
			(element._popup as Popup).open = false;
			expect(closeTriggered).toEqual(true);
		});
	});

	it('should set and remove the aria-haspopup attribute on its anchor when it changes', async () => {
		await setAnchor();

		element.anchor = 'anchor';
		await elementUpdated(element);
		const button = document.getElementById(element.anchor);
		expect(button?.getAttribute('aria-haspopup')).toBe('menu');

		element.anchor = '';
		await elementUpdated(element);
		expect(button?.getAttribute('aria-haspopup')).toBeUndefined;
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
