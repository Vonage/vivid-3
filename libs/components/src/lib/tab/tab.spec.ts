import { elementUpdated, fixture, getBaseElement } from '@vivid-nx/shared';
import type {Icon} from "../icon/icon";
import { Tab } from './tab';
import '.';


const COMPONENT_TAG = 'vwc-tab';
const ICON_SELECTOR = 'vwc-icon';

describe('vwc-tab', () => {
	let element: Tab;

	beforeEach(async () => {
		element = (await fixture(`<${COMPONENT_TAG}></${COMPONENT_TAG}>`)) as Tab;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-tab', async () => {
			expect(element).toBeInstanceOf(Tab);
			expect(element.icon).toBeUndefined();
			expect(element.iconTrailing).toBeFalsy();
			expect(element.label).toBeUndefined();
			expect(element.disabled).toBeFalsy();
		});
	});

	describe('label', () => {
		it('should set label property', async () => {
			expect(getBaseElement(element).textContent?.trim()).toEqual('');
			const label = 'lala';
			element.label = label;
			await elementUpdated(element);
			expect(getBaseElement(element).textContent?.trim()).toEqual(label);
		});
	});

	describe('tab icon', () => {
		it('adds an icon to the tab', async () => {
			element.icon = 'home';
			await elementUpdated(element);

			const icon = element.shadowRoot?.querySelector(ICON_SELECTOR) as Icon;
			expect(icon).toBeInstanceOf(HTMLElement);
			expect(icon.name).toEqual('home');
		});

		it('setting `iconTrailing` set the order of element', async () => {
			element.icon = 'home';
			element.iconTrailing = true;
			await elementUpdated(element);

			const trailingIcon = element.shadowRoot?.querySelector(
				`.icon-trailing ${ICON_SELECTOR}`,
			);
			expect(trailingIcon).toBeInstanceOf(HTMLElement);
		});
	});


	describe('disabled', function () {
		it('should set disabled class when disabled is true', async () => {
			expect(element.shadowRoot?.querySelector('.disabled')).toBeFalsy();
			element.toggleAttribute('disabled', true);
			await elementUpdated(element);
			expect(element.shadowRoot?.querySelector('.disabled')).toBeTruthy();
		});
	});
});
