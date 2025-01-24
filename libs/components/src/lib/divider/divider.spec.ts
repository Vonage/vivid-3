import { axe, elementUpdated, fixture, getBaseElement } from '@vivid-nx/shared';
import { Divider } from './divider';
import '.';

const COMPONENT_TAG = 'vwc-divider';

describe('vwc-divider', () => {
	let element: Divider;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as Divider;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-divider', async () => {
			expect(element).toBeInstanceOf(Divider);
		});
	});

	describe('orientation', function () {
		it('should set the orientation class', async function () {
			const base = element.shadowRoot?.querySelector('.base');
			const orientation = 'vertical';
			(element as any).orientation = orientation;
			await elementUpdated(element);

			expect(base?.classList.contains(`${orientation}`)).toBeTruthy();
		});
	});

	describe('role', function () {
		it('should set the role attribute on base', async function () {
			element.toggleAttribute('roll', true);
			await elementUpdated(element);

			expect(getBaseElement(element).hasAttribute('role')).toEqual(true);
		});
	});

	describe('a11y', () => {
		it('should pass html a11y test', async () => {
			expect(await axe(element)).toHaveNoViolations();
		});
	});
});
