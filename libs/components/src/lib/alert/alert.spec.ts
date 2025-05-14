import {
	elementUpdated,
	fixture,
	getBaseElement,
	getControlElement,
} from '@vivid-nx/shared';
import type { Icon } from '../icon/icon';
import { Connotation } from '../enums';
import { Button } from '../button/button';
import type { AlertConnotation } from './alert';
import { Alert } from './alert';
import '.';

const COMPONENT_TAG = 'vwc-alert';

describe('vwc-alert', () => {
	let element: Alert;

	beforeEach(async () => {
		element = (await fixture(`<${COMPONENT_TAG}></${COMPONENT_TAG}>`)) as Alert;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-alert', async () => {
			expect(element).toBeInstanceOf(Alert);
			expect(element.open).toBeFalsy();
			expect(element.icon).toBeUndefined();
			expect(element.text).toBeUndefined();
			expect(element.headline).toBeUndefined();
			expect(element.connotation).toBeUndefined();
			expect(element.removable).toBeFalsy();
			expect(element.timeoutms).toBe(0);
			expect(element.placement).toEqual('bottom');
			expect(element.strategy).toBeUndefined();
		});

		it('should allow being created via createElement', () => {
			// createElement may fail even though indirect instantiation through innerHTML etc. succeeds
			// This is because only createElement performs checks for custom element constructor requirements
			// See https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance
			expect(() => document.createElement(COMPONENT_TAG)).not.toThrow();
		});
	});

	describe('headline', function () {
		const getHeadline = () =>
			getBaseElement(element).querySelector('.headline')?.textContent?.trim();

		it('should init with undefined and set as empty string in DOM', function () {
			expect(element.headline).toEqual(undefined);
			expect(getHeadline()).toBeUndefined();
		});

		it('should reflect the message passed in headline as a prop/attr', async function () {
			const alertHeadline = 'headline text';

			element.headline = alertHeadline;
			element.open = true;
			await elementUpdated(element);
			const fromProptoDOM = getHeadline();

			element.headline = undefined;
			element.setAttribute('headline', alertHeadline);
			await elementUpdated(element);
			const fromDOMtoProp = element.headline;

			expect(fromProptoDOM).toEqual(alertHeadline);
			expect(fromDOMtoProp).toEqual(alertHeadline);
		});
	});

	describe('text', function () {
		const getText = () =>
			getBaseElement(element).querySelector('.main-text')?.textContent?.trim();

		it('should init with undefined and set as empty string in DOM', function () {
			expect(element.text).toEqual(undefined);
			expect(getText()).toBeUndefined();
		});

		it('should reflect the message passed in text as a prop/attr', async function () {
			const alertText = 'alert text';

			element.text = alertText;
			element.open = true;
			await elementUpdated(element);
			const fromProptoDOM = getText();

			element.text = undefined;
			element.setAttribute('text', alertText);
			await elementUpdated(element);
			const fromDOMtoProp = element.text;

			expect(fromProptoDOM).toEqual(alertText);
			expect(fromDOMtoProp).toEqual(alertText);
		});
	});

	describe('focus', () => {
		it('should focus on dismiss button when opened', async () => {
			element.removable = true;
			await elementUpdated(element);
			const spy = vi.fn();
			const closeBtn = element.shadowRoot?.querySelector(
				'.dismiss-button'
			) as Button;
			closeBtn.addEventListener('focus', spy);

			element.open = false;
			await elementUpdated(element);
			expect(spy).toHaveBeenCalledTimes(0);

			element.open = true;
			await elementUpdated(element);
			expect(spy).toHaveBeenCalledTimes(1);
		});
	});

	describe('connotation', function () {
		const possibleConnotations = [
			Connotation.Accent,
			Connotation.Information,
			Connotation.Success,
			Connotation.Warning,
			Connotation.Alert,
		];

		it('should leave connotation class empty if not set', async function () {
			possibleConnotations.forEach((connotation) => {
				expect(
					getBaseElement(element)?.classList.contains(connotation)
				).toEqual(false);
			});
		});

		it('should set a connotation class', async function () {
			const connotation = possibleConnotations[2];
			(element.connotation as Connotation) = connotation;
			await elementUpdated(element);
			expect(
				getBaseElement(element)?.classList.contains(
					`connotation-${connotation}`
				)
			).toEqual(true);
		});
	});

	describe('timeoutms', function () {
		it('should fire close event after timeoutms milliseconds', async function () {
			vi.useFakeTimers();
			const spy = vi.fn();

			element.timeoutms = 100;
			element.open = true;
			element.addEventListener('close', spy);

			vi.advanceTimersByTime(100);

			expect(spy).toHaveBeenCalled();
			vi.useRealTimers();
		});
	});

	describe('conditionedIcon', function () {
		// const getIcon: () => Icon | null = () => getBaseElement(element).querySelector('.icon > vwc-icon');
		it('should return undefined if no icon or connotations are set', function () {
			expect(element.conditionedIcon).toBeUndefined();
		});

		it('should return the icon if icon is set', async function () {
			element.icon = 'home';
			await elementUpdated(element);
			expect(element.conditionedIcon).toEqual('home');
		});

		it('should return the connotation icon if connotation is set', function () {
			const connotationIconMap: Map<AlertConnotation, string> = new Map([
				[Connotation.Accent, 'megaphone-line'],
				[Connotation.Information, 'info-line'],
				[Connotation.Success, 'check-circle-line'],
				[Connotation.Warning, 'warning-line'],
				[Connotation.Alert, 'error-line'],
			]);

			connotationIconMap.forEach((icon, connotation) => {
				element.connotation = connotation;
				expect(element.conditionedIcon).toEqual(icon);
			});
		});

		it('should return the icon if icon and connotation are set', function () {
			element.icon = 'home';
			element.connotation = Connotation.Alert;
			expect(element.conditionedIcon).toEqual('home');
		});
	});

	describe('transitionend', function () {
		it('should be display none when not open', async function () {
			element.open = true;
			await elementUpdated(element);
			expect(element.style.display).toEqual('contents');

			element.open = false;
			getControlElement(element).dispatchEvent(new Event('transitionend'));
			await elementUpdated(element);

			expect(element.style.display).toEqual('none');
		});
		it('should be display contents when is open', async function () {
			element.open = true;
			getControlElement(element).dispatchEvent(new Event('transitionend'));
			await elementUpdated(element);

			expect(element.style.display).toEqual('contents');
		});
	});

	describe('icon', function () {
		const getIcon: () => Icon | null = () =>
			getBaseElement(element).querySelector('slot[name="icon"] > vwc-icon');

		it('should not have an icon if there is none and no connotation is set', async function () {
			expect(getIcon()).toBeNull();
		});

		it('should have an icon slot', async () => {
			expect(
				element.shadowRoot?.querySelector('slot[name="icon"]')
			).toBeTruthy();
		});

		it('should have an icon when icon is set', async function () {
			element.setAttribute('icon', 'home');

			await elementUpdated(element);
			const iconEl = getIcon();

			expect(iconEl).toBeDefined();
			expect(iconEl?.name).toEqual('home');
		});

		it('should have the connotation icon if connotation is set', async function () {
			const connotationIconMap: Map<AlertConnotation, string> = new Map([
				[Connotation.Accent, 'megaphone-line'],
				[Connotation.Information, 'info-line'],
				[Connotation.Success, 'check-circle-line'],
				[Connotation.Warning, 'warning-line'],
				[Connotation.Alert, 'error-line'],
			]);

			for (const [connotation, iconName] of connotationIconMap) {
				element.connotation = connotation;
				await elementUpdated(element);
				expect(getIcon()?.name).toEqual(iconName);
			}
		});

		it('should override the connotation icon if the icon attribute is set', async function () {
			element.setAttribute('icon', 'home');
			element.setAttribute('connotation', 'warning');
			await elementUpdated(element);
			expect(getIcon()?.name).toEqual('home');
		});
	});

	describe('removable', function () {
		it('should init to false', function () {
			expect(element.removable).toEqual(false);
			expect(element.hasAttribute('removable')).toEqual(false);
		});

		it('should set removable property on attribute change', async function () {
			element.toggleAttribute('removable');
			await elementUpdated(element);
			expect(element.removable).toEqual(true);
		});

		describe('removable with button', function () {
			it('should have dismiss button when removable is true', async function () {
				element.toggleAttribute('removable');
				await elementUpdated(element);
				const dismissButton: Button = element.shadowRoot?.querySelector(
					'.dismiss-button'
				) as Button;

				expect(dismissButton).not.toEqual(null);
			});

			it('should remove the remove button when removable is false', async function () {
				expect(element.shadowRoot?.querySelector('.dismiss-button')).toEqual(
					null
				);
			});

			it('should close when removable is true', async function () {
				element.open = true;
				element.toggleAttribute('removable');
				await elementUpdated(element);
				const dismissButton: Button = element.shadowRoot?.querySelector(
					'.dismiss-button'
				) as Button;

				expect(element.open).toEqual(true);

				dismissButton.click();
				await elementUpdated(element);

				expect(element.open).toEqual(false);
			});
		});

		describe('removable with Escape', function () {
			beforeEach(() => (element.open = true));

			it('should remove the alert when esc and removable is true', async function () {
				const spy = vi.fn();
				element.removable = true;
				element.addEventListener('close', spy);

				await elementUpdated(element);
				element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

				expect(spy).toHaveBeenCalledTimes(1);
				expect(element.open).toBeFalsy();
			});

			it('should remove the alert only on escape key', async function () {
				const spy = vi.fn();
				element.removable = true;
				element.addEventListener('close', spy);

				await elementUpdated(element);
				element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

				expect(spy).toHaveBeenCalledTimes(0);
				expect(element.open).toBeTruthy();
			});

			it('should remove keydown listener after disconnection', async function () {
				const spy = vi.fn();
				element.removable = true;
				element.addEventListener('close', spy);

				await elementUpdated(element);
				element.disconnectedCallback();
				element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

				expect(spy).not.toHaveBeenCalled();
			});

			it('should not fire close event when removable is false', async function () {
				const spy = vi.fn();
				element.removable = false;
				element.addEventListener('close', spy);

				await elementUpdated(element);
				element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

				expect(spy).not.toHaveBeenCalled();
			});

			it('should stop propgation on escape key', async () => {
				const spy = vi.fn();
				element.parentElement!.addEventListener('keydown', spy);
				getBaseElement(element).dispatchEvent(
					new KeyboardEvent('keydown', { key: 'Escape' })
				);
				await elementUpdated(element);
				expect(spy.mock.calls.length).toBe(0);
			});

			it('should enable default if Escape was pressed', async () => {
				const event = new KeyboardEvent('keydown', { key: 'Escape' });
				vi.spyOn(event, 'preventDefault');
				getBaseElement(element).dispatchEvent(event);
				await elementUpdated(element);
				expect(event.preventDefault).toBeCalledTimes(0);
			});

			it('should enable default if key is not Escape', async () => {
				const event = new KeyboardEvent('keydown', { key: ' ' });
				vi.spyOn(event, 'preventDefault');
				getBaseElement(element).dispatchEvent(event);
				await elementUpdated(element);
				expect(event.preventDefault).toBeCalledTimes(0);
			});
		});
	});

	describe('a11y', () => {
		beforeEach(async () => {
			element.text = 'Alert text';
			element.headline = 'Alert heading';
			element.open = true;
			element.connotation = Connotation.Alert;
			await elementUpdated(element);
		});

		it("should announce alert's headline.", async () => {
			const baseEl = getBaseElement(element);

			const headline = baseEl.querySelector('.headline');
			expect(headline?.tagName).toEqual('H2');
		});

		it('should set a role of alert on the base element', async () => {
			const baseEl = getBaseElement(element);
			expect(baseEl!.getAttribute('role')).toBe('alert');
		});
	});

	describe('in-flow', () => {
		it('should add class .strategy-static to .control when set', async () => {
			element.strategy = 'static';
			await elementUpdated(element);
			expect(
				element.shadowRoot?.querySelector('.strategy-static')
			).toBeTruthy();
		});
	});
});
