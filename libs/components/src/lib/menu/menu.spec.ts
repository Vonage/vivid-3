import { ADD_TEMPLATE_TO_FIXTURE, elementUpdated, fixture } from '@vivid-nx/shared';
import type { Button } from '@microsoft/fast-foundation';
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

	describe('focus', () => {
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
	});

	/**
	 *
	 */
	async function setAnchor() {
		const anchorEl = await fixture('<vwc-button id="anchor"></vwc-button>', ADD_TEMPLATE_TO_FIXTURE) as Button;
		await elementUpdated(anchorEl);
		return anchorEl;
	}
});
