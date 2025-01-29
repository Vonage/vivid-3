import { axe, elementUpdated, fixture, getBaseElement } from '@vivid-nx/shared';
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
			expect(element.shape).toEqual(undefined);
			expect(element.appearance).toEqual(undefined);
			expect(element.tight).toEqual(false);
			expect(element.role).toEqual(null);
			expect(element.ariaLabel).toEqual(null);
		});

		it('should allow being created via createElement', () => {
			// createElement may fail even though indirect instantiation through innerHTML etc. succeeds
			// This is because only createElement performs checks for custom element constructor requirements
			// See https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance
			expect(() => document.createElement(COMPONENT_TAG)).not.toThrow();
		});
	});

	describe('appearance', function () {
		it('should set the appearance class on the base', async function () {
			const appearance = 'fieldset';
			(element as any).appearance = appearance;
			await elementUpdated(element);

			expect(
				getBaseElement(element)?.classList.contains(`appearance-${appearance}`)
			).toBeTruthy();
		});
	});

	describe('shape', function () {
		it('should set the shape class on the base', async function () {
			const shape = 'pill';
			(element as any).shape = shape;
			await elementUpdated(element);

			expect(
				getBaseElement(element)?.classList.contains(`shape-${shape}`)
			).toBeTruthy();
		});
	});

	describe('a11y', () => {
		it('should pass html a11y test', async () => {
			expect(await axe(element)).toHaveNoViolations();
		});

		describe('role', function () {
			it('should be set to "group" on init', function () {
				const role = getBaseElement(element)?.getAttribute('role');
				expect(role).toEqual('group');
			});

			it('should change role to role radiogroup', async function () {
				element.role = 'radiogroup';
				await elementUpdated(element);
				const role = getBaseElement(element)?.getAttribute('role');
				expect(role).toEqual('radiogroup');
			});

			it('should change role when role attribute is set', async function () {
				element.setAttribute('role', 'radiogroup');
				await elementUpdated(element);
				const role = getBaseElement(element)?.getAttribute('role');
				expect(role).toEqual('radiogroup');
			});
		});

		describe('aria-label', function () {
			it('should set "aria-label" on base if set on host', async function () {
				const labelId = 'label';
				element.setAttribute('aria-label', labelId);
				await elementUpdated(element);
				expect(getBaseElement(element).getAttribute('aria-label')).toEqual(
					labelId
				);
				expect(await axe(element)).toHaveNoViolations();
			});
		});
	});
});
