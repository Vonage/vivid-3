import { elementUpdated, fixture, getBaseElement } from '@vivid-nx/shared';
import type { BreadcrumbItem } from '../breadcrumb-item/breadcrumb-item';
import {
	allAriaPropertiesExcept,
	itShouldDelegateAriaAttributes,
} from '../../shared/aria/should-delegate-aria.spec';
import { Breadcrumb } from './breadcrumb';
import '../breadcrumb-item';
import '.';

const COMPONENT_TAG = 'vwc-breadcrumb';

describe('vwc-breadcrumb', () => {
	let element: Breadcrumb;

	function setUpFixture(template: string) {
		element = fixture(template) as Breadcrumb;
	}

	beforeEach(async () => {
		setUpFixture(`
			<${COMPONENT_TAG}>
				<vwc-breadcrumb-item href='#' text='breadcrumb'></vwc-breadcrumb-item>
				<vwc-breadcrumb-item text='...'></vwc-breadcrumb-item>
				<vwc-breadcrumb-item href='#' text='breadcrumb'></vwc-breadcrumb-item>
				<vwc-breadcrumb-item text='breadcrumb'></vwc-breadcrumb-item>
			</${COMPONENT_TAG}>
		`);
	});

	describe('basic', () => {
		it('should be initialized as a vwc-breadcrumb', async () => {
			expect(element).toBeInstanceOf(Breadcrumb);
		});

		it('should allow being created via createElement', () => {
			// createElement may fail even though indirect instantiation through innerHTML etc. succeeds
			// This is because only createElement performs checks for custom element constructor requirements
			// See https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance
			expect(() => document.createElement(COMPONENT_TAG)).not.toThrow();
		});
	});

	it('should set separator true for all except the last item', function () {
		const itemElements = element.querySelectorAll(
			'vwc-breadcrumb-item'
		) as unknown as BreadcrumbItem[];

		expect(itemElements[0].separator).toEqual(true);
		expect(itemElements[1].separator).toEqual(true);
		expect(itemElements[2].separator).toEqual(true);
		expect(itemElements[3].separator).toEqual(false);
	});

	describe('a11y', () => {
		describe('aria-current', function () {
			it('should set aria-current of a child anchor element of last item', async function () {
				setUpFixture(`
					<${COMPONENT_TAG}>
						<div><a href='#'></a></div>
					</${COMPONENT_TAG}>
				`);
				await elementUpdated(element);

				expect(element.querySelector('a')!.getAttribute('aria-current')).toBe(
					'page'
				);
			});

			it('should not set aria-current of a child anchor element of last item if it does not have href', async function () {
				setUpFixture(`
					<${COMPONENT_TAG}>
						<div><a></a></div>
					</${COMPONENT_TAG}>
				`);
				await elementUpdated(element);

				expect(element.querySelector('a')!.hasAttribute('aria-current')).toBe(
					false
				);
			});

			it('should set aria-current of anchor child element in shadowRoot of last item', async function () {
				setUpFixture(`
					<${COMPONENT_TAG}>
						<vwc-breadcrumb-item href='#' text='breadcrumb'></vwc-breadcrumb-item>
					</${COMPONENT_TAG}>
				`);
				await elementUpdated(element);

				expect(
					element
						.querySelector('vwc-breadcrumb-item')!
						.shadowRoot!.querySelector('a')!
						.getAttribute('aria-current')
				).toBe('page');
			});

			it('should not set aria-current on a last element without children', async function () {
				setUpFixture(`
					<${COMPONENT_TAG}>
						<div></div>
					</${COMPONENT_TAG}>
				`);
				await elementUpdated(element);

				expect(element.querySelector('div')!.hasAttribute('aria-current')).toBe(
					false
				);
			});
		});

		it('should have a base element with a default aria-label of "breadcrumbs"', () => {
			const control = getBaseElement(element);
			expect(control.getAttribute('aria-label')).toBe('breadcrumbs');
		});

		it('should wrap breadcrumb items in a list (role)', () => {
			const control = getBaseElement(element);
			expect(control.querySelector('[role="list"]')).toBeTruthy();
		});
	});

	describe('ARIA delegation', () => {
		itShouldDelegateAriaAttributes(
			() => element,
			() => getBaseElement(element),
			allAriaPropertiesExcept([])
		);
	});
});
