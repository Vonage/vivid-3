import { elementUpdated, fixture, getBaseElement } from '@vivid-nx/shared';
import { itShouldDelegateAriaAttributes } from '../../shared/aria/should-delegate-aria.spec';
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
			element.appearance = appearance;
			await elementUpdated(element);

			expect(
				getBaseElement(element)?.classList.contains(`appearance-${appearance}`)
			).toBeTruthy();
		});
	});

	describe('shape', function () {
		it('should set the shape class on the base', async function () {
			const shape = 'pill';
			element.shape = shape;
			await elementUpdated(element);

			expect(
				getBaseElement(element)?.classList.contains(`shape-${shape}`)
			).toBeTruthy();
		});
	});

	describe('a11y attributes', () => {
		it('should set a default role "group" on the base element', function () {
			const role = getBaseElement(element)?.getAttribute('role');
			expect(role).toEqual('group');
		});
	});

	describe('ARIA delegation', () => {
		itShouldDelegateAriaAttributes(
			() => element,
			() => getBaseElement(element),
			['role', 'ariaLabel']
		);
	});
});
