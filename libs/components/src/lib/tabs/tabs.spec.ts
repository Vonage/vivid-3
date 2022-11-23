import { elementUpdated, fixture, getBaseElement } from '@vivid-nx/shared';
import { Tabs } from './tabs';
import '.';

const COMPONENT_TAG = 'vwc-tabs';

describe('vwc-tabs', () => {
	let element: Tabs;

	beforeEach(async () => {
		element = (await fixture(`<${COMPONENT_TAG}></${COMPONENT_TAG}>`)) as Tabs;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-tabs', async () => {
			expect(element).toBeInstanceOf(Tabs);
			expect(element.orientation).toEqual("horizontal");
			expect(element.activeid).toBeUndefined();
		});
	});

	describe('orientation', () => {
		it('should set orientation property', async () => {
			const orientation = 'vertical';
			expect(getBaseElement(element).classList.contains(`orientation-${orientation}`)).toBeFalsy();
			element.orientation = orientation as any;
			await elementUpdated(element);
			expect(getBaseElement(element).classList.contains(`orientation-${orientation}`)).toBeTruthy();
		});
	});
});
