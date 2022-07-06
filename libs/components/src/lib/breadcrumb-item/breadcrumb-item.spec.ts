import {elementUpdated, fixture, getBaseElement, setAttribute} from '@vivid-nx/shared';
import {axe, toHaveNoViolations} from 'jest-axe';
import type {Icon} from '../icon/icon';
import { BreadcrumbItem } from './breadcrumb-item';
import '.';

expect.extend(toHaveNoViolations);
const COMPONENT_TAG = 'vwc-breadcrumb-item';

describe('vwc-breadcrumb-item', () => {

	let element: BreadcrumbItem;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as BreadcrumbItem;
	});

	it('should be initialized as a vwc-breadcrumb-item', async () => {
		expect(element).toBeInstanceOf(BreadcrumbItem);
	});

	it('should display only icon when no prop is set', function () {
		const controlElement = getBaseElement(element);
		const iconElementExists = Boolean(controlElement.querySelector(('vwc-icon')));
		expect(iconElementExists).toEqual(true);
	});

	it('should be set as simple text when given only text', async function () {
		const breadcrumbText = 'some text';
		element.text = breadcrumbText;
		await elementUpdated(element);
		const controlElement = getBaseElement(element);
		expect(controlElement.textContent?.trim()).toEqual(breadcrumbText);
	});

	it('should set icon when "separator" is true', async function () {
		const controlElement = getBaseElement(element);
		const iconElementExistsWhenSeparatorTrue = Boolean(controlElement.querySelector(('vwc-icon')));

		element.separator = false;
		await elementUpdated(element);
		const iconElementExistsWithSeparatorFalse = Boolean(controlElement.querySelector(('vwc-icon')));

		expect(iconElementExistsWithSeparatorFalse)
			.toEqual(false);
		expect(iconElementExistsWhenSeparatorTrue)
			.toEqual(true);
	});

	it('should set as an anchor and icon when set with "href"', async function () {
		const breadcrumbText = 'some text';
		const href = 'https://google.com/';
		element.text = breadcrumbText;
		element.href = href;
		await elementUpdated(element);

		const controlElement = getBaseElement(element);
		const iconElement = controlElement.querySelector(('vwc-icon')) as Icon;
		const anchorElement = controlElement.querySelector(('a'));

		expect(anchorElement?.textContent?.trim()).toEqual(breadcrumbText);
		expect((anchorElement as any)?.href).toEqual(element.href);
		expect(iconElement?.type).toEqual('chevron-right-solid');
	});

	describe('bindings', () => {

		beforeEach(async function () {
			element.href = '#';
			element.text = 'stam';
			await elementUpdated(element);
		});

		/**
		 *
		 */
		function getAnchorElement() {
			return element.shadowRoot?.querySelector('a');
		}

		/**
		 * @param str
		 */
		function capitalizeFirstLetter(str: string) {
			return str.charAt(0).toUpperCase() + str.slice(1);
		}

		it('should set aria labels', async function () {

			const ARIA_PROPS = [
				'atomic', 'busy', 'controls', 'current', 'describedby',
				'details', 'disabled', 'errormessage', 'expanded',
				'flowto', 'haspopup', 'hidden', 'invalid', 'keyshortcuts',
				'label', 'labelledby', 'live', 'owns', 'relevant', 'roledescription'
			];

			/**
			 *
			 */
			function setAriaLabelsOnElementObject() {
				ARIA_PROPS.forEach(ariaProp => {
					const ariaPropOnObject = `aria${capitalizeFirstLetter(ariaProp)}`;
					(element as any)[ariaPropOnObject] = ariaProp;
				});
			}

			const anchorElement = getAnchorElement();

			setAriaLabelsOnElementObject();
			await elementUpdated(element);

			ARIA_PROPS.forEach(ariaProp => {
				const ariaPropOnElement = `aria-${ariaProp}`;

				expect(anchorElement?.getAttribute(ariaPropOnElement)).toEqual(ariaProp);
			});
		});

		it('should set the "href" attribute', async function () {
			const attribute = 'href';
			const anchorElement = getAnchorElement();
			const text = 'stam';
			await setAttribute(element, attribute, text);

			expect(anchorElement?.getAttribute(attribute)).toEqual(text);
		});

		it('should set the "hreflang" attribute', async function () {
			const attribute = 'hreflang';
			const anchorElement = getAnchorElement();
			const text = 'stam';
			await setAttribute(element, attribute, text);

			expect(anchorElement?.getAttribute(attribute)).toEqual(text);
		});

		it('should set the "download" attribute', async function () {
			const attribute = 'download';
			const anchorElement = getAnchorElement();
			const text = 'stam';
			await setAttribute(element, attribute, text);

			expect(anchorElement?.getAttribute(attribute)).toEqual(text);
		});

		it('should set the "ping" attribute', async function () {
			const attribute = 'ping';
			const anchorElement = getAnchorElement();
			const text = 'stam';
			await setAttribute(element, attribute, text);

			expect(anchorElement?.getAttribute(attribute)).toEqual(text);
		});

		it('should set the "referrerpolicy" attribute', async function () {
			const attribute = 'referrerpolicy';
			const anchorElement = getAnchorElement();
			const text = 'stam';
			await setAttribute(element, attribute, text);

			expect(anchorElement?.getAttribute(attribute)).toEqual(text);
		});

		it('should set the "rel" attribute', async function () {
			const attribute = 'rel';
			const anchorElement = getAnchorElement();
			const text = 'stam';
			await setAttribute(element, attribute, text);

			expect(anchorElement?.getAttribute(attribute)).toEqual(text);
		});

		it('should set the "target" attribute', async function () {
			const attribute = 'target';
			const anchorElement = getAnchorElement();
			const text = 'stam';
			await setAttribute(element, attribute, text);

			expect(anchorElement?.getAttribute(attribute)).toEqual(text);
		});

		it('should set the "type" attribute', async function () {
			const attribute = 'type';
			const anchorElement = getAnchorElement();
			const text = 'stam';
			await setAttribute(element, attribute, text);

			expect(anchorElement?.getAttribute(attribute)).toEqual(text);
		});
	});

	describe('a11y', () => {
		it('should pass accessibility test', async () => {
			const {shadowRoot} = element;
			if (!shadowRoot) {
				return;
			}

			const results = await axe(shadowRoot.innerHTML, {
				rules: {
					// components should not be tested as page content
					'region': {enabled: false}
				}
			});

			expect(results)
				.toHaveNoViolations();
		});
	});
});
