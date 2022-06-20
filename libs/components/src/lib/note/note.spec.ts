import {elementUpdated, fixture} from '@vivid-nx/shared';
import {Connotation} from '../enums';
import {Icon} from '../icon/icon';
import {Note} from './note';
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
	});

	it('should render the heading when heading is set', async function() {
		const headingText = 'heading';
		const headingElementWhenNull = element.shadowRoot?.querySelector('.heading');
		element.heading = headingText;
		await elementUpdated(element);
		expect(headingElementWhenNull).toBeNull();
		expect(element.shadowRoot?.querySelector('.heading')?.textContent?.trim()).toEqual(headingText);
	});

	it('should render an icon with given type', async function () {
		const iconElement = element.shadowRoot?.querySelector('.icon') as Icon;
		const iconName = 'home';
		element.icon = iconName;
		await elementUpdated(element);

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

	it('should return default connotation icon if no icon or connotation are set', function () {
		const defaultConnotationIconType = 'megaphone-solid';
		const iconElement = element.shadowRoot?.querySelector('.icon') as Icon;
		expect(iconElement.type).toEqual(defaultConnotationIconType);
	});

	it('should set icon type according to connotation', async function() {
		const iconElement = element.shadowRoot?.querySelector('.icon') as Icon;
		element.connotation = Connotation.Info;
		await elementUpdated(element);
		expect(iconElement.type).toEqual('info-solid');
	});
});
