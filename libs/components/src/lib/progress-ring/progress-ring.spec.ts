import {elementUpdated, fixture} from '@vivid-nx/shared';
import {Connotation} from '../enums';
import {ProgressRing} from './progress-ring';
import '.';

const COMPONENT_TAG = 'vwc-progress-ring';

describe('vwc-progress-ring', () => {
	let element: ProgressRing;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as ProgressRing;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-progress-ring', async () => {
			expect(element)
				.toBeInstanceOf(ProgressRing);
		});

		it('should reflect min and max', async function () {
			element.min = 10;
			element.max = 90;
			await elementUpdated(element);
			expect(element.getAttribute('min'))
				.toEqual(element.min.toString());
			expect(element.getAttribute('max'))
				.toEqual(element.max.toString());
		});
	});

	describe('value', function () {
		it('should reflect to host', async function () {
			element.value = 50;
			await elementUpdated(element);
			expect(element.getAttribute('value'))
				.toEqual('50');
		});

		it('should set percentComplete to percentage of the range', async function () {
			element.min = 0;
			element.max = 100;
			element.value = 25;
			await elementUpdated(element);
			const percentWithBigRange = element.percentComplete;

			element.min = 0;
			element.max = 50;
			element.value = 25;
			await elementUpdated(element);
			const percentWithSmallRange = element.percentComplete;

			expect(percentWithBigRange)
				.toEqual(25);
			expect(percentWithSmallRange)
				.toEqual(50);
		});

		it('should set the determinate div width to percentComplete', async function () {
			element.min = 0;
			element.max = 100;
			element.value = 25;
			const expectedValue = element.value * 44 / 100;
			await elementUpdated(element);
			const determinateDiv = element.shadowRoot?.querySelector('.determinate') as HTMLElement;
			expect(determinateDiv?.style.strokeDasharray)
				.toEqual(`${expectedValue}px 44px`);
		});
	});

	describe('paused', function () {
		it('should reflect to host', async function () {
			const pausedAttributeExistsOnInit = element.hasAttribute('paused');
			element.paused = true;
			await elementUpdated(element);
			const pausedAttributeExistsWhenTrue = element.hasAttribute('paused');
			element.paused = false;
			await elementUpdated(element);
			const pausedAttributeExistsWhenFalse = element.hasAttribute('paused');
			expect(pausedAttributeExistsOnInit)
				.toEqual(false);
			expect(pausedAttributeExistsWhenTrue)
				.toEqual(true);
			expect(pausedAttributeExistsWhenFalse)
				.toEqual(false);
		});

		it('should set class paused on base element', async function () {
			const baseDiv = element.shadowRoot?.querySelector('.base');
			const pausedClassExistsBeforeChange = baseDiv?.classList.contains('paused');
			element.paused = true;
			await elementUpdated(element);
			const pausedClassExistsAfterChange = baseDiv?.classList.contains('paused');

			expect(pausedClassExistsBeforeChange)
				.toEqual(false);
			expect(pausedClassExistsAfterChange)
				.toEqual(true);
		});
	});

	describe('connotation', function () {
		it('should be undefined by default', async function () {
			expect(element.connotation)
				.toEqual(undefined);
		});

		it('should reflect its value to host', async function () {

			element.setAttribute('connotation', 'alert');
			await elementUpdated(element);
			const connotationPropertyAfterAttributeChange = element.connotation;

			element.connotation = Connotation.Success;
			await elementUpdated(element);
			const connotationAttributeAfterPropertyChange = element.getAttribute('connotation');

			expect(connotationPropertyAfterAttributeChange)
				.toEqual(Connotation.Alert);
			expect(connotationAttributeAfterPropertyChange)
				.toEqual(Connotation.Success);
		});

		it('should set connotation on the base div', async function () {
			const connotation = Connotation.CTA;
			const baseDiv = element.shadowRoot?.querySelector('.base');
			const connotationClassExistsBeforeChange = baseDiv?.classList.contains(`connotation-${connotation}`);
			element.connotation = connotation;
			await elementUpdated(element);
			const connotationClassExistsAfterChange = baseDiv?.classList.contains(`connotation-${connotation}`);

			expect(connotationClassExistsBeforeChange)
				.toEqual(false);
			expect(connotationClassExistsAfterChange)
				.toEqual(true);
		});
	});

	describe('density', function () {
		const BASE_DENSITY = 9;
		let baseElement: Element | null | undefined;
		beforeEach(function () {
			baseElement = element.shadowRoot?.querySelector('.base');
		});

		it('should set density class only if exists', async function () {
			const classListContainsDensity = baseElement?.className.split(' ').reduce((contains: boolean, className: string) => {
				return contains || className.indexOf('density-') > -1;
			}, false);
			expect(classListContainsDensity).toEqual(false);
		});

		it('should set density class according to attribute plus base density', async function () {
			const densityValue = 12;
			const expectedClass = `density-${densityValue + BASE_DENSITY}`;
			element.setAttribute('density', densityValue.toString());
			await elementUpdated(element);
			console.log(baseElement?.className);
			expect(baseElement?.classList.contains(expectedClass)).toBeTruthy();
		});
	});
});
