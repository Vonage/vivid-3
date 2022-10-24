import { elementUpdated, fixture, getControlElement } from '@vivid-nx/shared';
import { Orientation } from '@microsoft/fast-web-utilities';
import { Slider } from './slider';
import '.';

const COMPONENT_TAG = 'vwc-slider';

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
			expect(element).toBeInstanceOf(Slider);

			expect(element.valueAsNumber).toBe(5);
			expect(element.value).toBe('5');

			expect(element.min).toBe(0);
			expect(element.max).toBe(10);
			expect(element.step).toBe(1);

			expect(element.disabled).toBeFalsy();
			expect(element.readOnly).toBeUndefined();
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

	describe('readonly', () => {
		it('should set readonly class when readonly is true', async () => {
			const classes = await setBoolAttributeOn(element, 'readonly');
			expect(classes).toContain('readonly');
		});
	});

	describe('markers', () => {
		it('should display the markers element when markers is true', async () => {
			const markersDiv = () => getControlElement(element).querySelector('.positioning-region > .track > .mark') as HTMLDivElement;
			const markersDivInitialValue = markersDiv();
			
			await setBoolAttributeOn(element, 'markers');
			const markersDivAfterMarkersEnabled = markersDiv();
			
			element.orientation = Orientation.vertical;
			await elementUpdated(element);
			const markersDivVerticalStyle = markersDiv().getAttribute('style');
			
			expect(markersDivInitialValue).toBeNull();
			expect(markersDivAfterMarkersEnabled).not.toBeNull();
			expect(markersDivVerticalStyle).toContain('repeat-y');
		});
	});

	describe('orientation', () => {
		it('should update the positioning region when changing orientation', async () => {
			const controlClasses = () => Array.from(getControlElement(element).classList);
			const classesInitialValue = controlClasses();

			element.setAttribute('orientation', 'vertical');
			await elementUpdated(element);
			
			expect(classesInitialValue).toContain('horizontal');
			expect(controlClasses()).toContain('vertical');
		});
	});

	describe('min/max', () => {
		it('should respect the min constraint when setting value', async () => {
			element.min = 3;
			element.value = '1';
			expect(element.valueAsNumber).toBe(3);
		});

		it('should respect the min constraint when decrementing', async () => {
			element.min = 3;
			element.value = '3';
			element.decrement();
			expect(element.valueAsNumber).toBe(3);
		});

		it('should respect the max constraint when setting value', async () => {
			element.max = 7;
			element.value = '10';
			expect(element.valueAsNumber).toBe(7);
		});

		it('should respect the max constraint when incrementing', async () => {
			element.max = 7;
			element.value = '7';
			element.increment();
			expect(element.valueAsNumber).toBe(7);
		});
	});

	describe('step', () => {
		it('should respect the provided step', async () => {
			element.step = 3.5;
			element.value = '0';
			
			element.increment();
			const valueAfterIncrementing = element.valueAsNumber;
			element.value = '6';
			
			expect(valueAfterIncrementing).toBe(3.5);
			expect(element.valueAsNumber).toBe(7);
		});
	});
});
