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

	it('should set as an anchor and icon when set with "href"', async function () {
		const breadcrumbText = 'some text';
		const href = 'https://google.com';
		element.text = breadcrumbText;
		element.href = href;
		await elementUpdated(element);

		const controlElement = getControlElement(element);
		const iconElement = controlElement.querySelector(('vwc-icon')) as Icon;
		const anchorElement = controlElement.querySelector(('vwc-anchor'));
		expect(anchorElement?.textContent).toEqual(breadcrumbText);
		expect(iconElement?.type).toEqual('chevron-right-line');
	});
});
