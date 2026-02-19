import { elementUpdated, fixture } from '@repo/shared';
import { Connotation } from '../enums';
import { Status } from './status';
import '.';

const COMPONENT_TAG = 'vwc-status';

describe('vwc-status', () => {
	let element: Status;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as Status;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-status', async () => {
			expect(element).toBeInstanceOf(Status);
		});

		it('should allow being created via createElement', () => {
			expect(() => document.createElement(COMPONENT_TAG)).not.toThrow();
		});
	});

	describe('status', () => {
		it('should render the status when status is set', async function () {
			const statusText = 'Positive';
			element.status = statusText;
			await elementUpdated(element);
			expect(
				element.shadowRoot?.querySelector('.headline')?.textContent?.trim()
			).toEqual(statusText);
		});
	});

	describe('icon', () => {
		it('should have an icon slot', async () => {
			expect(
				element.shadowRoot?.querySelector('slot[name="icon"]')
			).toBeTruthy();
		});

		it('should render default icon when connotation is set', async function () {
			element.connotation = Connotation.Success;
			await elementUpdated(element);
			const iconElement = element.shadowRoot?.querySelector('vwc-icon');
			expect(iconElement?.getAttribute('name')).toEqual('check-circle-solid');
		});

		it('should render custom icon when icon is set', async function () {
			element.setAttribute('icon', 'info-line');
			await elementUpdated(element);
			const iconElement = element.shadowRoot?.querySelector('vwc-icon');
			expect(iconElement?.getAttribute('name')).toEqual('info-line');
		});
	});

	describe('connotation', () => {
		it('should set connotation class on the base element', async function () {
			const connotation = Connotation.Information;
			const baseElement = element.shadowRoot?.querySelector('.base');
			element.connotation = connotation;
			await elementUpdated(element);
			expect(
				baseElement?.classList?.contains(`connotation-${connotation}`)
			).toEqual(true);
		});
	});
});
