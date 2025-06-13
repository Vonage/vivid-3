import { elementUpdated, fixture } from '@repo/shared';
import { Connotation } from '../enums';
import { Note } from './note';
import '.';

const COMPONENT_TAG = 'vwc-note';

describe('vwc-note', () => {
	let element: Note;

	beforeEach(async () => {
		element = (await fixture(`<${COMPONENT_TAG}></${COMPONENT_TAG}>`)) as Note;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-note', async () => {
			expect(element).toBeInstanceOf(Note);
		});

		it('should allow being created via createElement', () => {
			// createElement may fail even though indirect instantiation through innerHTML etc. succeeds
			// This is because only createElement performs checks for custom element constructor requirements
			// See https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance
			expect(() => document.createElement(COMPONENT_TAG)).not.toThrow();
		});
	});

	describe('headline', () => {
		it('should render the headline when headline is set', async function () {
			const headlineText = 'headline';
			const headlineElementWhenNull =
				element.shadowRoot?.querySelector('.headline');
			element.headline = headlineText;
			await elementUpdated(element);
			expect(headlineElementWhenNull).toBeNull();
			expect(
				element.shadowRoot?.querySelector('.headline')?.textContent?.trim()
			).toEqual(headlineText);
		});
	});

	describe('icon', () => {
		it('should have an icon slot', async () => {
			expect(
				element.shadowRoot?.querySelector('slot[name="icon"]')
			).toBeTruthy();
		});

		it('should render an icon when icon is set', async function () {
			const icon = 'user-line';
			element.setAttribute('icon', icon);
			await elementUpdated(element);
			const iconElement = element.shadowRoot?.querySelector('vwc-icon');
			expect(iconElement?.getAttribute('name')).toEqual(icon);
			expect(element.icon).toEqual(icon);
		});
	});

	describe('connotation', () => {
		it('should set connotation class on the base element', async function () {
			const connotation = Connotation.Information;
			const baseElement = element.shadowRoot?.querySelector('.base');
			const connotationClassExistsWhenNull = baseElement?.classList?.contains(
				`connotation-${connotation}`
			);
			element.connotation = connotation;
			await elementUpdated(element);
			expect(connotationClassExistsWhenNull).toEqual(false);
			expect(
				baseElement?.classList?.contains(`connotation-${connotation}`)
			).toEqual(true);
		});
	});
});
