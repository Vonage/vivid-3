import { elementUpdated, fixture } from '@vivid-nx/shared';
import { Icon } from '../icon/icon';
import { SidenavItem } from './sidenav-item';
import '.';

const COMPONENT_TAG = 'vwc-sidenav-item';
const ICON_SELECTOR = 'vwc-icon';

describe('vwc-sidenav-item', () => {
	let element: SidenavItem;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as SidenavItem;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-sidenav-item', async () => {
			expect(element).toBeInstanceOf(SidenavItem);
			expect(element.text).toEqual('');
			expect(element.icon).toBeUndefined();
		});
	});

	describe('icon', () => {
		it('should add an icon to the sidenav item', async () => {
			element.icon = 'home';
			await elementUpdated(element);

			const icon = element.shadowRoot?.querySelector(ICON_SELECTOR) as Icon;
			expect(icon)
				.toBeInstanceOf(Icon);
			expect(icon?.type)
				.toEqual('home');
		});
	});

	describe('text', () => {
		it('should set text property value as text content', async () => {
			const text = 'lorem';
			element.text = text;
			await elementUpdated(element);

			const control = element.shadowRoot?.querySelector('.control');
			expect(control?.textContent?.trim())
				.toEqual(text);
		});
	});


});
