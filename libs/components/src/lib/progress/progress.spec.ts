import { axe, elementUpdated, fixture } from '@vivid-nx/shared';
import {Connotation, Shape} from '../enums';
import {Progress} from './progress';
import '.';

const COMPONENT_TAG = 'vwc-progress';

describe('vwc-progress', () => {
	let element: Progress;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as Progress;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-progress', async () => {
			expect(element)
				.toBeInstanceOf(Progress);
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
			await elementUpdated(element);
			const determinateDiv = element.shadowRoot?.querySelector('.determinate') as HTMLElement;
			expect(determinateDiv?.style.width)
				.toEqual(`${element.value}%`);
		});
	});

	describe('reverse', function () {
		it('should reflect reverse on host', async function () {
			element.reverse = true;
			await elementUpdated(element);
			expect(element.hasAttribute('reverse'))
				.toEqual(true);
		});

		it('should add class "reverse" to base div', async function () {
			const baseDiv = element.shadowRoot?.querySelector('.base');
			element.reverse = true;
			await elementUpdated(element);
			expect(baseDiv?.classList.contains('reverse'))
				.toEqual(true);
		});
	});

	describe('shape', function () {
		it('should reflect shape on host', async function () {
			element.shape = Shape.Rounded;
			await elementUpdated(element);
			expect(element.getAttribute('shape'))
				.toEqual(Shape.Rounded);
		});

		it('should add class "shape" to base div', async function () {
			const baseDiv = element.shadowRoot?.querySelector('.base');
			element.shape = Shape.Rounded;
			await elementUpdated(element);
			expect(baseDiv?.classList.contains(`shape-${Shape.Rounded}`))
				.toEqual(true);
		});
	});

	/* Failing because role=progress must have an accessible name (aria-label or aria-labelled by) */
	xdescribe('a11y', () => {
		it('should pass html a11y test', async () => {
			element.min = 10;
			element.max = 90;
			await elementUpdated(element);

			expect(await axe(element)).toHaveNoViolations();
		});
	});
});
