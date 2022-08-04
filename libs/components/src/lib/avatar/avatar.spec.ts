import {elementUpdated, fixture} from '@vivid-nx/shared';
import { Avatar } from './avatar';
import '.';

const COMPONENT_TAG = 'vwc-avatar';

describe('vwc-avatar', () => {
	let element: Avatar;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as Avatar;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-avatar', async () => {
			expect(element).toBeInstanceOf(Avatar);
		});
	});

	describe('appearance', function () {
		it('should set the appearance class on the base', async function () {
			const control = element.shadowRoot?.querySelector('.base');
			const appearance = 'filled';
			(element as any).appearance = appearance;
			await elementUpdated(element);

			expect(control?.classList.contains(`appearance-${appearance}`))
				.toBeTruthy();
		});
	});

	describe('avatar shape', function () {
		it('should set the shape class on the base', async function () {
			const control = element.shadowRoot?.querySelector('.base');
			const shape = 'pill';
			(element as any).shape = shape;
			await elementUpdated(element);

			expect(control?.classList.contains(`shape-${shape}`))
				.toBeTruthy();
		});
	});

	describe('avatar connotation', function () {
		it('should set the connotation class on base', async function () {

		});
	});
});
