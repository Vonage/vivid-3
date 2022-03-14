import {elementUpdated, fixture, getControlElement} from '@vivid-nx/shared';
import type {Icon} from '../icon/icon';
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

	it('should display nothing when no prop is set', function () {
		const controlElement = getControlElement(element);
		expect(controlElement?.innerHTML.trim()).toEqual('');
	});

	it('should be set as simple text when given only text', async function () {
		const breadcrumbText = 'some text';
		element.text = breadcrumbText;
		await elementUpdated(element);
		const controlElement = getControlElement(element);
		expect(controlElement.textContent?.trim()).toEqual(breadcrumbText);
	});

	it('should set icon when "separator" is true', async function () {
		const controlElement = getControlElement(element);
		const iconElementExistsWithoutSeparator = Boolean(controlElement.querySelector(('vwc-icon')));
		element.separator = true;

		await elementUpdated(element);
		const iconElementExistsWithSeparator = Boolean(controlElement.querySelector(('vwc-icon')));

		expect(iconElementExistsWithoutSeparator)
			.toEqual(false);
		expect(iconElementExistsWithSeparator)
			.toEqual(true);
	});

	it('should set as an anchor and icon when set with "href"', async function () {
		const breadcrumbText = 'some text';
		const href = 'https://google.com/';
		element.separator = true;
		element.text = breadcrumbText;
		element.href = href;
		await elementUpdated(element);

		const controlElement = getControlElement(element);
		const iconElement = controlElement.querySelector(('vwc-icon')) as Icon;
		const anchorElement = controlElement.querySelector(('a'));

		expect(anchorElement?.textContent?.trim()).toEqual(breadcrumbText);
		expect((anchorElement as any)?.href).toEqual(element.href);
		expect(iconElement?.type).toEqual('chevron-right-line');
	});
});
