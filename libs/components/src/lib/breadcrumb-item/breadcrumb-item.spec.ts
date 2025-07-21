import {
	elementUpdated,
	fixture,
	getBaseElement,
	setProperty,
} from '@repo/shared';
import type { Icon } from '../icon/icon';
import { itShouldDelegateAriaAttributes } from '../../shared/aria/should-delegate-aria.spec';
import { BreadcrumbItem } from './breadcrumb-item';
import '.';

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

	it('should allow being created via createElement', () => {
		// createElement may fail even though indirect instantiation through innerHTML etc. succeeds
		// This is because only createElement performs checks for custom element constructor requirements
		// See https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance
		expect(() => document.createElement(COMPONENT_TAG)).not.toThrow();
	});

	it('should display only icon when no prop is set', function () {
		const controlElement = getBaseElement(element);
		const iconElementExists = Boolean(controlElement.querySelector('vwc-icon'));
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
		const iconElementExistsWhenSeparatorTrue = Boolean(
			controlElement.querySelector('vwc-icon')
		);

		element.separator = false;
		await elementUpdated(element);
		const iconElementExistsWithSeparatorFalse = Boolean(
			controlElement.querySelector('vwc-icon')
		);

		expect(iconElementExistsWithSeparatorFalse).toEqual(false);
		expect(iconElementExistsWhenSeparatorTrue).toEqual(true);
	});

	it('should set as an anchor and icon when set with "href"', async function () {
		const breadcrumbText = 'some text';
		const href = 'https://google.com/';
		element.text = breadcrumbText;
		element.href = href;
		await elementUpdated(element);

		const controlElement = getBaseElement(element);
		const iconElement = controlElement.querySelector('vwc-icon') as Icon;
		const anchorElement = controlElement.querySelector('a');

		expect(anchorElement?.textContent?.trim()).toEqual(breadcrumbText);
		expect((anchorElement as any)?.href).toEqual(element.href);
		expect(iconElement?.name).toEqual('chevron-right-solid');
	});

	describe('bindings', () => {
		beforeEach(async () => {
			element.href = '#';
			element.text = 'stam';
			await elementUpdated(element);
		});

		describe.each([
			'href',
			'hreflang',
			'download',
			'ping',
			'referrerpolicy',
			'rel',
			'target',
		] as const)('%s attribute', (attribute) => {
			it('should set the attribute on an anchor element', async () => {
				const text = 'stam';
				await setProperty(element, attribute, text);

				expect(
					element.shadowRoot?.querySelector('a')?.getAttribute(attribute)
				).toEqual(text);
			});
		});
	});

	describe('ARIA delegation', () => {
		describe('when rendering as an anchor tag', () => {
			beforeEach(async () => {
				element.href = '#';
				element.text = 'stam';
				await elementUpdated(element);
			});

			itShouldDelegateAriaAttributes(
				() => element,
				() => element.shadowRoot!.querySelector('a')!,
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
});
