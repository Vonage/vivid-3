import {elementUpdated, fixture} from '@vivid-nx/shared';
import { Note } from './note';
import '.';
import {Icon} from '../icon/icon';
import {Connotation} from '../enums';

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
	});

	it('should render the header when header is set', async function() {
		const headerText = 'header';
		const headerElementWhenNull = element.shadowRoot?.querySelector('.note-header');
		element.header = headerText;
		await elementUpdated(element);
		expect(headerElementWhenNull).toBeNull();
		expect(element.shadowRoot?.querySelector('.note-header')?.textContent?.trim()).toEqual(headerText);
	});

	it('should render an icon when icon is set', async function () {
		const iconName = 'home';
		const iconElementWhenNull = element.shadowRoot?.querySelector('.note-icon');
		element.icon = iconName;
		await elementUpdated(element);
		const iconElement = element.shadowRoot?.querySelector('.note-icon') as Icon;

		expect(iconElementWhenNull).toBeNull();
		expect(iconElement instanceof Icon).toEqual(true);
		expect(iconElement.type).toEqual(iconName);
	});

	it('should set connotation class on the base element', async function() {
		const connotation = Connotation.Info;
		const baseElement = element.shadowRoot?.querySelector('.base');
		const connotationClassExistsWhenNull = baseElement?.classList?.contains(`connotation-${connotation}`);
		element.connotation = connotation;
		await elementUpdated(element);
		expect(connotationClassExistsWhenNull).toEqual(false);
		expect(baseElement?.classList?.contains(`connotation-${connotation}`)).toEqual(true);
	});
});
