import { elementUpdated, fixture, getControlElement } from '@vivid-nx/shared';
import { Elevation } from './elevation';
import '.';

const COMPONENT_TAG = 'vwc-elevation';

describe('vwc-elevation', () => {
	let element: Elevation;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as Elevation;
	});

	describe('basic', () => {
		it('initializes as a vwc-elevation', async () => {
			expect(element).toBeInstanceOf(Elevation);
			expect(element.dp).toBeUndefined();
		});

		it('should allow being created via createElement', () => {
			// createElement may fail even though indirect instantiation through innerHTML etc. succeeds
			// This is because only createElement performs checks for custom element constructor requirements
			// See https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance
			expect(() => document.createElement(COMPONENT_TAG)).not.toThrow();
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

			const startingDPClassExists = getControlElement(
				element
			).classList.contains(`${classPrefix}${startingDP}`);

			element.setAttribute('dp', nextDP);
			await elementUpdated(element);
			const nextDPClassExists = getControlElement(element).classList.contains(
				`${classPrefix}${nextDP}`
			);
			expect(startingDPClassExists).toEqual(true);
			expect(nextDPClassExists).toEqual(true);
		});
	});

	it('should have a slot', async () => {
		await elementUpdated(element);
		expect(Boolean(element.shadowRoot?.querySelector('slot'))).toEqual(true);
	});

	describe('no position', () => {
		it('should add class .not-relative to .base if no-position attribute is added o host', async () => {
			element.notRelative = true;
			await elementUpdated(element);
			expect(getControlElement(element).classList.contains('.not-relative'));
		});
	});

	describe('no shadow', () => {
		it('should add class .no-shadow to .base if no-shadow attribute is added o host', async () => {
			element.notRelative = true;
			await elementUpdated(element);
			expect(getControlElement(element).classList.contains('.no-shadow'));
		});
	});
});
