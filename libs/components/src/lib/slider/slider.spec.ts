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
		it('should be initialized as a vwc-slider with a default value', async () => {
			expect(element).toBeInstanceOf(Slider);
			expect(element.valueAsNumber).toBe(5);
			expect(element.value).toBe('5');
		});
	});
	
	describe('disabled', () => {
		it('should set disabled class when disabled is true', async () => {
			expect(element.disabled).toBeFalsy();
			const classes = await setBoolAttributeOn(element, 'disabled');
			expect(classes).toContain('disabled');
		});
	});

	describe('readonly', () => {
		it('should set readonly class when readonly is true', async () => {
			expect(element.readOnly).toBeUndefined();
			const classes = await setBoolAttributeOn(element, 'readonly');
			expect(classes).toContain('readonly');
		});
	});

	describe('markers', () => {
		it('should display the markers element when markers is true', async () => {
			const markdiv = () => getControlElement(element).querySelector('.positioning-region > .track > .mark') as HTMLDivElement;
			expect(element.markers).toBeFalsy();
			expect(markdiv()).toBeNull();
			await setBoolAttributeOn(element, 'markers');
			expect(markdiv()).not.toBeNull();
			element.orientation = Orientation.vertical;
			await elementUpdated(element);
			expect(markdiv().getAttribute('style')).toContain('linear-gradient(to bottom');
			expect(markdiv().getAttribute('style')).toContain('repeat-y');
		});
	});

	describe('orientation', () => {
		it('should update the positioning region when changing orientation', async () => {
			expect(element.orientation).toBe(Orientation.horizontal);
			const controlclasses = () => getControlElement(element).classList;
			expect(controlclasses()).toContain('horizontal');
			element.setAttribute('orientation', 'vertical');
			await elementUpdated(element);
			expect(controlclasses()).toContain('vertical');
		});
	});

	describe('min/max', () => {
		it('should respect the range constraints', async () => {
			expect(element.min).toBe(0);
			expect(element.max).toBe(10);
			element.min = 3;
			element.max = 7;
			element.value = '1';
			expect(element.valueAsNumber).toBe(3);
			element.decrement();
			expect(element.valueAsNumber).toBe(3);
			element.value = '10';
			expect(element.valueAsNumber).toBe(7);
			element.increment();
			expect(element.valueAsNumber).toBe(7);
		});
	});

	describe('step', () => {
		it('should respect the provided step', async () => {
			expect(element.step).toBe(1);
			element.step = 3.5;
			element.value = '0';
			element.increment();
			expect(element.valueAsNumber).toBe(3.5);
		});
	});
});
