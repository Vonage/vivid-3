import {elementUpdated, fixture, getBaseElement} from '@vivid-nx/shared';
import { FoundationElementRegistry } from '@microsoft/fast-foundation';
import {Connotation} from '../enums';
import {Icon} from '../icon/icon';
import {Note} from './note';
import '.';
import { noteDefinition } from './definition';

const COMPONENT_TAG = 'vwc-note';

describe('vwc-note', () => {
	let element: Note;

	beforeEach(async () => {
		element = (await fixture(`<${COMPONENT_TAG}></${COMPONENT_TAG}>`)) as Note;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-note', async () => {
			expect(noteDefinition()).toBeInstanceOf(FoundationElementRegistry);
			expect(element).toBeInstanceOf(Note);
		});
	});

	it('should render the headline when headline is set', async function() {
		const headlineText = 'headline';
		const headlineElementWhenNull = element.shadowRoot?.querySelector('.headline');
		element.headline = headlineText;
		await elementUpdated(element);
		expect(headlineElementWhenNull).toBeNull();
		expect(element.shadowRoot?.querySelector('.headline')?.textContent?.trim()).toEqual(headlineText);
	});

	it('should render an icon with given type', async function () {
		const iconElement = element.shadowRoot?.querySelector('.icon') as Icon;
		const iconName = 'home';
		element.icon = iconName;
		await elementUpdated(element);

		expect(iconElement instanceof Icon).toEqual(true);
		expect(iconElement.name).toEqual(iconName);
	});

	it('should not render icon when no-icon is set', async function () {
		element.noIcon = true;
		await elementUpdated(element);
		expect(getBaseElement(element).classList.contains('icon')).toBeFalsy();
	});

	it('should set connotation class on the base element', async function() {
		const connotation = Connotation.Information;
		const baseElement = element.shadowRoot?.querySelector('.base');
		const connotationClassExistsWhenNull = baseElement?.classList?.contains(`connotation-${connotation}`);
		element.connotation = connotation;
		await elementUpdated(element);
		expect(connotationClassExistsWhenNull).toEqual(false);
		expect(baseElement?.classList?.contains(`connotation-${connotation}`)).toEqual(true);
	});

	it('should return default connotation icon if no icon or connotation are set', function () {
		const defaultConnotationIconName = 'megaphone-solid';
		const iconElement = element.shadowRoot?.querySelector('.icon') as Icon;
		expect(iconElement.name).toEqual(defaultConnotationIconName);
	});

	it('should set icon type according to connotation', async function() {
		const iconElement = element.shadowRoot?.querySelector('.icon') as Icon;
		element.connotation = Connotation.Information;
		await elementUpdated(element);
		expect(iconElement.name).toEqual('info-solid');
	});
});
