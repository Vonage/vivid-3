import { elementUpdated, fixture, getBaseElement, getControlElement } from '@vivid-nx/shared';
import { Icon } from '../icon/icon';
import { SidenavDisclosure } from './sidenav-disclosure';
import '.';

const COMPONENT_TAG = 'vwc-sidenav-disclosure';
const ICON_SELECTOR = 'vwc-icon';

describe('vwc-sidenav-disclosure', () => {
	let element: SidenavDisclosure;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as SidenavDisclosure;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-sidenav-disclosure', async () => {
			expect(element).toBeInstanceOf(SidenavDisclosure);
			expect(element.label).toEqual(undefined);
			expect(element.icon).toBeUndefined();
			expect(element.open).toBeFalsy();
		});
	});

	describe('aria-expanded', () => {
		it('should update aria-expanded when toggle open', async () => {
			expect(getControlElement(element).getAttribute('aria-expanded')).toEqual('false');

			element.open = true;
			await elementUpdated(element);
			expect(getControlElement(element).getAttribute('aria-expanded')).toEqual('true');
		});
	});

	describe('open', () => {
		it('should have open attribute when open', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG} open></${COMPONENT_TAG}>`
			)) as SidenavDisclosure;

			await elementUpdated(element);
			expect(getBaseElement(element).hasAttribute('open')).toEqual(true);

			element.open = false;
			await elementUpdated(element);
			expect(getBaseElement(element).hasAttribute('open')).toEqual(false);
		});
	});

	describe('icon', () => {
		it('should add an icon to the sidenav disclosure', async () => {
			element.icon = 'home';
			await elementUpdated(element);

			const icon = element.shadowRoot?.querySelector(ICON_SELECTOR) as Icon;
			expect(icon)
				.toBeInstanceOf(Icon);
			expect(icon?.type)
				.toEqual('home');
		});
	});

	describe('label', () => {
		it('should set label property value as text content', async () => {
			const label = 'lorem';
			element.label = label;
			await elementUpdated(element);

			expect(getBaseElement(element).textContent?.trim())
				.toEqual(label);
		});
	});

	it('should remove toggle listener after disconnection', async function() {
		const spy = jest.fn();
		element.addEventListener('toggle', spy);

		element.disconnectedCallback();
		element.connectedCallback();

		element.details.dispatchEvent(new Event('toggle'));

		expect((spy as any).mock.calls.length).toEqual(1);
	});
});
