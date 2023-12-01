import { axe, elementUpdated, fixture, setAttribute } from '@vivid-nx/shared';
import { FoundationElementRegistry } from '@microsoft/fast-foundation';
import {TextAnchor} from './text-anchor';
import '.';
import { textAnchorDefinition } from './definition';

const COMPONENT_TAG = 'vwc-text-anchor';

describe( 'vwc-text-anchor', () => {
	let element: TextAnchor;

	beforeEach(async () => {
		element = (await fixture(`<${COMPONENT_TAG}></${COMPONENT_TAG}>`)) as TextAnchor;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-text-anchor', async () => {
			expect(textAnchorDefinition()).toBeInstanceOf(FoundationElementRegistry);
			expect(element).toBeInstanceOf(TextAnchor);
			expect(element.text).toEqual(undefined);
		});
	});

	describe('text', () => {
		it('set text property to node', async () => {
			const text = 'lorem';
			element.text = text;
			await elementUpdated(element);

			const { control } = element;
			expect(control?.textContent?.trim())
				.toEqual(text);
		});
	});

	/**
	 *
	 */
	function getAnchorElement() {
		const anchorElement = element.shadowRoot?.querySelector('a');
		return anchorElement;
	}


	describe('bindings', () => {
		function capitalizeFirstLetter(str: string) {
			return str.charAt(0).toUpperCase() + str.slice(1);
		}

		it('should set aria labels', async function () {
			function setAriaLabelsOnElementObject() {
				ARIA_PROPS.forEach(ariaProp => {
					const ariaPropOnObject = `aria${capitalizeFirstLetter(ariaProp)}`;
					(element as any)[ariaPropOnObject] = ariaProp;
				});
			}

			const ARIA_PROPS = [
				'atomic', 'busy', 'current',
				'details', 'disabled', 'expanded',
				'haspopup', 'hidden', 'invalid', 'keyshortcuts',
				'label', 'live', 'relevant', 'roledescription'
			];

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
		it('should pass html a11y test', async () => {
			element.text = 'Link text';
			element.href = '/somewhere';
			await elementUpdated(element);
			
			expect(await axe(element)).toHaveNoViolations();
		});
	});
});
