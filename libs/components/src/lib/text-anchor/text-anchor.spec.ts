import {elementUpdated, fixture, setAttribute} from '@vivid-nx/shared';
import {TextAnchor} from './text-anchor.js';
import '.';

const COMPONENT_TAG = 'vwc-text-anchor.js';

describe( 'vwc-text-anchor.js', () => {
	let element: TextAnchor;

	beforeEach(async () => {
		element = (await fixture(`<${COMPONENT_TAG}></${COMPONENT_TAG}>`)) as TextAnchor;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-text-anchor.js', async () => {
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
		/**
		 * @param str
		 */
		function capitalizeFirstLetter(str: string) {
			return str.charAt(0).toUpperCase() + str.slice(1);
		}

		it('should set aria labels', async function () {

			/**
			 *
			 */
			function setAriaLabelsOnElementObject() {
				ARIA_PROPS.forEach(ariaProp => {
					const ariaPropOnObject = `aria${capitalizeFirstLetter(ariaProp)}`;
					(element as any)[ariaPropOnObject] = ariaProp;
				});
			}

			const ARIA_PROPS = [
				'atomic', 'busy', 'controls', 'current', 'describedby',
				'details', 'disabled', 'errormessage', 'expanded',
				'flowto', 'haspopup', 'hidden', 'invalid', 'keyshortcuts',
				'label', 'labelledby', 'live', 'owns', 'relevant', 'roledescription'
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
});
