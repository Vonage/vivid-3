import {elementUpdated, fixture } from '@vivid-nx/shared';
import {Connotation} from '../enums';
import { Avatar } from './avatar';
import '.';
import {expect} from '@playwright/test';


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

	describe('avatar appearance', function () {
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
			const connotation = Connotation.CTA;
			const baseDiv = element.shadowRoot?.querySelector('.base');
			const connotationClassExistsBeforeTheChange = baseDiv?.classList.contains(`connotation-${connotation}`);
			element.connotation = connotation;
			await elementUpdated(element);
			const connotationClassExistsAfterChange = baseDiv?.classList.contains(`connotation-${connotation}`);

			expect(connotationClassExistsBeforeTheChange)
				.toEqual(false);
			expect(connotationClassExistsAfterChange)
				.toEqual(true);
		});
	});

	describe('avatar density', function () {
		const BASE_DENSITY = 10;
		let baseElement: Element | null | undefined;
		beforeEach(function () {
			baseElement = element.shadowRoot?.querySelector('.base');
		});

		it('should set the density class only if exists', async function () {
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
			expect(baseElement?.classList.contains(expectedClass)).toBeTruthy();
		});
	});

	describe('avatar icon', () => {
		it('should have the default icon', async () => {
			//whe adding an avatar - the avatar default is with the `user-line` icon

		});
		it('should have the icon name in the property icon', async () => {
			// if one added icon="icon-name" this should override the default icon
		});

	});

	describe('avatar name', () => {
		it('should have the default icon', async () => {
			//the initials are supposed to be at the end a separate component (so no need to check letters etc.)
			// but one thing can be checked regardless:
			//if initials are set - that the icon is not presented.
		});
	});
});
