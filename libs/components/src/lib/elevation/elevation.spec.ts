import { elementUpdated, fixture, getControlElement } from '@vivid-nx/shared';
import { Elevation } from './elevation';
import '.';

const COMPONENT_TAG = 'vwc-elevation';

describe('vwc-elevation', () => {
	let element: Elevation;

	beforeEach(async () => {
		element = await fixture(`<${COMPONENT_TAG}></${COMPONENT_TAG}>`) as Elevation;
	});

	describe('basic', () => {
		it('initializes as a vwc-elevation', async () => {
			expect(element).toBeInstanceOf(Elevation);
			expect(element.dp).toBeUndefined();
		});
	});

	describe('dp', () => {
		it('should change the property when the attribute changes', async () => {
			const startingDP = 8;
			element.dp = startingDP;
			await elementUpdated(element);

			const propertyValueBeforeChange = element.dp;
			element.setAttribute('dp', '4');

			expect(propertyValueBeforeChange).toEqual(startingDP);
			expect(element.dp).toEqual('4');
		});

		it('should set the dp class on the wrapper element', async () => {
			const startingDP = 8;
			const nextDP = '24';
			element.dp = startingDP;
			await elementUpdated(element);
			const classPrefix = 'dp-';

			const startingDPClassExists = getControlElement(element).classList.contains(`${classPrefix}${startingDP}`);

			element.setAttribute('dp', nextDP);
			await elementUpdated(element);
			const nextDPClassExists = getControlElement(element).classList.contains(`${classPrefix}${nextDP}`);
			expect(startingDPClassExists).toEqual(true);
			expect(nextDPClassExists).toEqual(true);
		});
	});

	it('should have a slot', async () => {
		await elementUpdated(element);
		expect(Boolean(element.shadowRoot?.querySelector('slot'))).toEqual(true);
	});
});

