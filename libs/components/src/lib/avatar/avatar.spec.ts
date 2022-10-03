import {elementUpdated, fixture, getBaseElement} from '@vivid-nx/shared';
import {Connotation} from '../enums';
import { Avatar } from './avatar';
import '.';


const COMPONENT_TAG = 'vwc-avatar';

describe('vwc-avatar', () => {
	let baseElement: Element;
	let element: Avatar;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as Avatar;
		baseElement = getBaseElement(element);
	});

	describe('basic', () => {
		it('should be initialized as a vwc-avatar', async () => {
			expect(element).toBeInstanceOf(Avatar);
		});
	});

	describe('avatar appearance', function () {
		it('should set the appearance class on the base', async function () {
			const appearance = 'filled';

			(element as any).appearance = appearance;
			await elementUpdated(element);

			expect(baseElement?.classList.contains(`appearance-${appearance}`))
				.toBeTruthy();
		});
	});

	describe('avatar shape', function () {
		it('should set the shape class on the base', async function () {
			const shape = 'pill';

			(element as any).shape = shape;
			await elementUpdated(element);

			expect(baseElement?.classList.contains(`shape-${shape}`))
				.toBeTruthy();
		});
	});

	describe('avatar connotation', function () {
		it('should set the connotation class on base', async function () {
			const connotation = Connotation.CTA;
			const connotationClassExistsBeforeTheChange = baseElement?.classList.contains(`connotation-${connotation}`);

			element.connotation = connotation;
			await elementUpdated(element);
			const connotationClassExistsAfterChange = baseElement?.classList.contains(`connotation-${connotation}`);

			expect(connotationClassExistsBeforeTheChange)
				.toEqual(false);
			expect(connotationClassExistsAfterChange)
				.toEqual(true);
		});
	});

	describe('avatar size', function () {
		it('sets correct internal size style', async () => {
			const size = 'condensed';
			(element as any).size = size;
			await elementUpdated(element);

			const control = element.shadowRoot?.querySelector(`.base.size-${size}`);
			expect(control).toBeInstanceOf(Element);
		});
	});

	describe('avatar icon', () => {
		it('should have the default icon', async () => {
			const iconElement = baseElement.querySelector('vwc-icon');
			expect(iconElement?.getAttribute('type')).toEqual('user-line');
		});

		it('should set the icon according to the icon property', async () => {
			const icon = 'user-line';
			element.setAttribute('icon', icon);
			await elementUpdated(element);
			const iconElement = baseElement.querySelector('vwc-icon');
			expect(iconElement?.getAttribute('type')).toEqual(icon);
			expect(element.icon).toEqual(icon);
		});

	});

});
