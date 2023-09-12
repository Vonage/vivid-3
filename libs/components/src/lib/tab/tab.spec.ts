import { elementUpdated, fixture, getBaseElement } from '@vivid-nx/shared';
import {Connotation} from '../enums';
import {Icon} from '../icon/icon';
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
			expect(element.connotation).toBeFalsy();
			expect(element.shape).toBeFalsy();
			expect(element.ariaSelected).toBeNull();
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

	describe('icon', () => {
		it('should have an icon slot', async () => {
			expect(Boolean(element.shadowRoot?.querySelector('slot[name="icon"]'))).toEqual(true);
		});

		it('should have an icon when icon is set without slotted icon', async () => {
			element.icon = 'home';
			await elementUpdated(element);

			const icon = element.shadowRoot?.querySelector(ICON_SELECTOR) as Icon;
			expect(icon)
				.toBeInstanceOf(Icon);
			expect(icon?.name)
				.toEqual('home');
		});
	});

	describe('iconTrailing', function() {
		it('should add "icon-trailing" class to base', async () => {
			element.icon = 'home';
			element.iconTrailing = true;
			await elementUpdated(element);

			const trailingIcon = element.shadowRoot?.querySelector(
				`.icon-trailing ${ICON_SELECTOR}`,
			);
			expect(trailingIcon)
				.toBeInstanceOf(Icon);
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

	describe('ariaSelected', function () {
		it('should set connotation class on base if true', async () => {
			element.connotation = Connotation.CTA;
			element.ariaSelected = 'true';
			await elementUpdated(element);
			expect(getBaseElement(element).classList.contains(`connotation-${Connotation.CTA}`)).toBeTruthy();
		});

		it('should remove connotation class on base if false', async () => {
			element.connotation = Connotation.CTA;
			element.ariaSelected = 'false';
			await elementUpdated(element);
			expect(getBaseElement(element).classList.contains(`connotation-${Connotation.CTA}`)).toBeFalsy();
		});

		it('should remove connotation class on base if null', async () => {
			element.connotation = Connotation.CTA;
			element.ariaSelected = null;
			await elementUpdated(element);
			expect(getBaseElement(element).classList.contains(`connotation-${Connotation.CTA}`)).toBeFalsy();
		});
	});

	describe('shape', function () {
		it('should set the shape class on the base', async function () {
			const shape = 'rounded';

			(element as any).shape = shape;
			await elementUpdated(element);

			expect(getBaseElement(element).classList.contains(`shape-${shape}`)).toBeTruthy();
		});
	});
});
