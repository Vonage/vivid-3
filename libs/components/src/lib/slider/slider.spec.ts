import { elementUpdated, fixture, getControlElement } from '@vivid-nx/shared';
import { Orientation } from '@microsoft/fast-web-utilities';
import { Slider } from './slider';
import '.';
import { sliderDefinition } from './definition';
import { FoundationElementRegistry } from '@microsoft/fast-foundation';

const COMPONENT_TAG = 'vwc-slider';

/**
 * @param el
 * @param attr
 */
async function setBoolAttributeOn(el: Slider, attr: string): Promise<DOMTokenList> {
	el.toggleAttribute(attr, true);
	await elementUpdated(el);
	return getControlElement(el).classList;
}

describe('vwc-slider', () => {
	let element: Slider;

	beforeEach(async () => {
		element = fixture(`<${COMPONENT_TAG}></${COMPONENT_TAG}>`) as Slider;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-slider with proper default values', async () => {
			expect(sliderDefinition()).toBeInstanceOf(FoundationElementRegistry);
			expect(element).toBeInstanceOf(Slider);

			expect(element.valueAsNumber).toBe(5);
			expect(element.value).toBe('5');

			expect(element.min).toBe(0);
			expect(element.max).toBe(10);
			expect(element.step).toBe(1);

			expect(element.disabled).toBeFalsy();
			expect(element.orientation).toBe(Orientation.horizontal);
			expect(element.markers).toBeFalsy();
		});
	});

	describe('disabled', () => {
		it('should set disabled class when disabled is true', async () => {
			const classes = await setBoolAttributeOn(element, 'disabled');
			expect(classes).toContain('disabled');
		});
	});

	describe('markers', () => {
		const getMarkersDiv = () => getControlElement(element).querySelector('.positioning-region > .track > .mark') as HTMLDivElement;

		it('should display the markers element when markers is true', async () => {
			const markersDivReferenceBefore = getMarkersDiv();
			await setBoolAttributeOn(element, 'markers');
			const markersDivReferenceAfter = getMarkersDiv();
			await elementUpdated(element);

			expect(markersDivReferenceBefore).toBeNull();
			expect(markersDivReferenceAfter).not.toBeNull();
		});

		it('should display the markers element with proper style vertically', async () => {
			await setBoolAttributeOn(element, 'markers');
			element.orientation = Orientation.vertical;
			await elementUpdated(element);

			expect(getMarkersDiv().getAttribute('style')).toContain('repeat-y');
		});
	});

	describe('orientation', () => {
		it('should set the vertical class on the control when changing orientation to vertical', async () => {
			const controlClasses = () => Array.from(getControlElement(element).classList);
			const classesInitialValue = controlClasses();

			element.setAttribute('orientation', 'vertical');
			await elementUpdated(element);

			expect(classesInitialValue).toContain('horizontal');
			expect(controlClasses()).toContain('vertical');
		});
	});

	describe('min/max', () => {
		it('should use last valid value when setting value with min constraint', async () => {
			element.min = 3;
			element.value = '1';
			expect(element.valueAsNumber).toBe(3);
		});

		it('should use last valid value when decrementing out of bounds', async () => {
			element.min = 3;
			element.value = '3';
			element.decrement();
			expect(element.valueAsNumber).toBe(3);
		});

		it('should use last valid value when setting value with max constraint', async () => {
			element.max = 7;
			element.value = '10';
			expect(element.valueAsNumber).toBe(7);
		});

		it('should use last valid value when incrementing out of bounds', async () => {
			element.max = 7;
			element.value = '7';
			element.increment();
			expect(element.valueAsNumber).toBe(7);
		});
	});

	describe('step', () => {
		it('should increment/decrement according to the provided step', async () => {
			element.step = 3.5;
			element.value = '0';

			element.increment();
			const valueAfterIncrementing = element.valueAsNumber;
			element.decrement();

			expect(valueAfterIncrementing).toBe(3.5);
			expect(element.valueAsNumber).toBe(0);
		});

		it('should round values to the nearest step multiple', async () => {
			element.step = 3.5;
			element.value = '6';
			expect(element.valueAsNumber).toBe(7);
		});
	});
});
