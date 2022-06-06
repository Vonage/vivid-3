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
		it('should set the fieldset class on the base', async function () {
			const appearance = 'fieldset';
			(element as any).appearance = appearance;
			await elementUpdated(element);

			const control = element.shadowRoot?.querySelector(`.base.appearance-${appearance}`);
			expect(control)
				.toBeInstanceOf(Element);
		});
	});

	describe('shape', function () {
		it('should set the shape class on the base', async function () {
			const shape = 'pill';
			(element as any).shape = shape;
			await elementUpdated(element);

			const control = element.shadowRoot?.querySelector(`.base.shape-${shape}`);
			expect(control)
				.toBeInstanceOf(Element);
		});
	});

});
