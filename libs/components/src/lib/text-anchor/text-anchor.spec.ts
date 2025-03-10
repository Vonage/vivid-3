import {
	elementUpdated,
	fixture,
	getControlElement,
	setProperty,
} from '@vivid-nx/shared';
import { itShouldDelegateAriaAttributes } from '../../shared/aria/should-delegate-aria.spec';
import { TextAnchor, TextAnchorConnotation } from './text-anchor';
import '.';

const COMPONENT_TAG = 'vwc-text-anchor';

describe('vwc-text-anchor', () => {
	let element: TextAnchor;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as TextAnchor;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-text-anchor', async () => {
			expect(element).toBeInstanceOf(TextAnchor);
			expect(element.text).toEqual(undefined);
		});

		it('should allow being created via createElement', () => {
			// createElement may fail even though indirect instantiation through innerHTML etc. succeeds
			// This is because only createElement performs checks for custom element constructor requirements
			// See https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance
			expect(() => document.createElement(COMPONENT_TAG)).not.toThrow();
		});
	});

	describe('text', () => {
		it('set text property to node', async () => {
			const text = 'lorem';
			element.text = text;
			await elementUpdated(element);

			const { control } = element;
			expect(control?.textContent?.trim()).toEqual(text);
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
		it('should set the "href" attribute', async function () {
			const attribute = 'href';
			const anchorElement = getAnchorElement();
			const text = 'stam';
			await setProperty(element, attribute, text);

			expect(anchorElement?.getAttribute(attribute)).toEqual(text);
		});

		it('should set the "hreflang" attribute', async function () {
			const attribute = 'hreflang';
			const anchorElement = getAnchorElement();
			const text = 'stam';
			await setProperty(element, attribute, text);

			expect(anchorElement?.getAttribute(attribute)).toEqual(text);
		});

		it('should set the "download" attribute', async function () {
			const attribute = 'download';
			const anchorElement = getAnchorElement();
			const text = 'stam';
			await setProperty(element, attribute, text);

			expect(anchorElement?.getAttribute(attribute)).toEqual(text);
		});

		it('should set the "ping" attribute', async function () {
			const attribute = 'ping';
			const anchorElement = getAnchorElement();
			const text = 'stam';
			await setProperty(element, attribute, text);

			expect(anchorElement?.getAttribute(attribute)).toEqual(text);
		});

		it('should set the "referrerpolicy" attribute', async function () {
			const attribute = 'referrerpolicy';
			const anchorElement = getAnchorElement();
			const text = 'stam';
			await setProperty(element, attribute, text);

			expect(anchorElement?.getAttribute(attribute)).toEqual(text);
		});

		it('should set the "rel" attribute', async function () {
			const attribute = 'rel';
			const anchorElement = getAnchorElement();
			const text = 'stam';
			await setProperty(element, attribute, text);

			expect(anchorElement?.getAttribute(attribute)).toEqual(text);
		});

		it('should set the "target" attribute', async function () {
			const attribute = 'target';
			const anchorElement = getAnchorElement();
			const text = '_self';
			await setProperty(element, attribute, text);

			expect(anchorElement?.getAttribute(attribute)).toEqual(text);
		});

		it('should set the "type" attribute', async function () {
			const attribute = 'type';
			const anchorElement = getAnchorElement();
			const text = 'stam';
			await setProperty(element, attribute, text);

			expect(anchorElement?.getAttribute(attribute)).toEqual(text);
		});
	});

	describe('text-anchor appearance', function () {
		it('should set the appearance class on the control', async function () {
			const appearance = 'ghost';

			(element as any).appearance = appearance;
			await elementUpdated(element);

			const control = element.shadowRoot?.querySelector(`.control`);
			expect(
				control?.classList.contains(`appearance-${appearance}`)
			).toBeTruthy();
		});
	});

	describe('text-anchor connotation', function () {
		it('should set the connotation class on control', async function () {
			const connotation = 'cta' as TextAnchorConnotation;
			expect(
				getControlElement(element).classList.contains(
					`connotation-${connotation}`
				)
			).toBeFalsy();
			element.connotation = connotation;
			await elementUpdated(element);
			expect(
				getControlElement(element).classList.contains(
					`connotation-${connotation}`
				)
			).toBeTruthy();
		});
	});

	describe('aria delegation', () => {
		itShouldDelegateAriaAttributes(
			() => element,
			() => getAnchorElement()!,
			[
				'ariaAtomic',
				'ariaBusy',
				'ariaCurrent',
				'ariaDisabled',
				'ariaExpanded',
				'ariaHasPopup',
				'ariaHidden',
				'ariaInvalid',
				'ariaKeyShortcuts',
				'ariaLabel',
				'ariaLive',
				'ariaRelevant',
				'ariaRoleDescription',
			]
		);
	});
});
