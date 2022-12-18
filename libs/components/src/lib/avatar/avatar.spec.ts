import {elementUpdated, fixture, getBaseElement} from '@vivid-nx/shared';
import {Connotation} from '../enums';
import { Avatar } from './avatar';
import '.';
import type { Icon } from '../icon/icon';

const COMPONENT_TAG = 'vwc-avatar';
const ICON_SELECTOR = 'vwc-icon';

describe('vwc-avatar', () => {
	let baseElement: Element;
	let element: Avatar;

	beforeAll(async () => {
		await customElements.whenDefined(COMPONENT_TAG);
	});

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
		const icon = 'user-line';
		let iconElement: Icon;

		beforeEach(async () => {
			element.setAttribute('icon', icon);
			await elementUpdated(element);
			iconElement = baseElement.querySelector(ICON_SELECTOR) as Icon;
		});

		it('should have the default icon', async () => { 
			expect(iconElement?.getAttribute('name')).toEqual('user-line');
		});

		it('should set the icon according to the icon property', async () => {
			expect(iconElement?.getAttribute('name')).toEqual(icon);
			expect(element.icon).toEqual(icon);
		});

	});

	describe('avatar name', () => {
		it('should show the name without icon', async () => {
			element.name = 'John Doe';
			await elementUpdated(element);
			const iconElement = baseElement.querySelector(ICON_SELECTOR);
			expect(iconElement).toBeNull();
		});

		it('should show the initials if name is set', async () => {
			element.name = 'John Doe';
			await elementUpdated(element);
			const text = baseElement.textContent?.trim();
			expect(text).toEqual('Jo');
		});

		it('should show only 2 letters', async () => {
			element.name = 'John Doe the vague man';
			await elementUpdated(element);
			const text = baseElement.textContent?.trim();
			expect(text).toEqual('Jo');
		});

	});
});
