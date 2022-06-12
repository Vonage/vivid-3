import {elementUpdated, fixture} from '@vivid-nx/shared';
import { ActionGroup } from './action-group';
import '.';


const COMPONENT_TAG = 'vwc-action-group';


describe('vwc-action-group', () => {
	let element: ActionGroup;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as ActionGroup;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-action-group', async () => {
			expect(element).toBeInstanceOf(ActionGroup);
		});
	});

	describe('appearance', function () {
		it('should set the appearance class on the base', async function () {
			const control = element.shadowRoot?.querySelector('.base');
			const appearance = 'fieldset';
			(element as any).appearance = appearance;
			await elementUpdated(element);

			expect(control?.classList.contains(`appearance-${appearance}`))
				.toBeTruthy();
		});
	});

	describe('shape', function () {
		it('should set the shape class on the base', async function () {
			const control = element.shadowRoot?.querySelector('.base');
			const shape = 'pill';
			(element as any).shape = shape;
			await elementUpdated(element);

			expect(control?.classList.contains(`shape-${shape}`))
				.toBeTruthy();
		});
	});
});
