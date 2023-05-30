import { elementUpdated, fixture, getBaseElement } from '@vivid-nx/shared';
import type { Icon } from '../icon/icon';
import type { Button } from '../button/button';
import { Connotation } from '../enums';
import { Alert } from './alert';
import type { AlertConnotation } from './alert';
import '.';

const COMPONENT_TAG = 'vwc-alert';

describe('vwc-alert', () => {
	let element: Alert;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as Alert;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-alert', async () => {
			expect(element)
				.toBeInstanceOf(Alert);
			expect(element.open).toBeFalsy();
			expect(element.icon).toBeUndefined();
			expect(element.text).toBeUndefined();
			expect(element.headline).toBeUndefined();
			expect(element.connotation).toBeUndefined();
			expect(element.removable).toBeFalsy();
			expect(element.timeoutms).toBe(0);
			expect(element.placement).toEqual('bottom');
		});
	});

	describe('headline', function () {
		const getHeadline = () => getBaseElement(element).querySelector('.headline')?.textContent?.trim();

		it('should init with undefined and set as empty string in DOM', function () {
			expect(element.headline).toEqual(undefined);
			expect(getHeadline()).toBeUndefined();
		});

		it('should reflect the message passed in headline as a prop/attr', async function () {
			const alertHeadline = 'headline text';

			element.headline = alertHeadline;
			await elementUpdated(element);
			const fromProptoDOM = getHeadline();

			element.headline = undefined;
			element.setAttribute('headline', alertHeadline);
			await elementUpdated(element);
			const fromDOMtoProp = element.headline;

			expect(fromProptoDOM)
				.toEqual(alertHeadline);
			expect(fromDOMtoProp)
				.toEqual(alertHeadline);
		});
	});

	describe('text', function () {
		const getText = () => getBaseElement(element).querySelector('.main-text')?.textContent?.trim();

		it('should init with undefined and set as empty string in DOM', function () {
			expect(element.text).toEqual(undefined);
			expect(getText()).toBeUndefined();
		});

		it('should reflect the message passed in text as a prop/attr', async function () {
			const alertText = 'alert text';

			element.text = alertText;
			await elementUpdated(element);
			const fromProptoDOM = getText();

			element.text = undefined;
			element.setAttribute('text', alertText);
			await elementUpdated(element);
			const fromDOMtoProp = element.text;

			expect(fromProptoDOM)
				.toEqual(alertText);
			expect(fromDOMtoProp)
				.toEqual(alertText);
		});
	});

	describe('connotation', function () {
		const possibleConnotations = [Connotation.Accent,
			Connotation.Information,
			Connotation.Success,
			Connotation.Warning,
			Connotation.Alert
		];

		it('should leave connotation class empty if not set', async function () {
			possibleConnotations.forEach(connotation => {
				expect(getBaseElement(element)
					?.classList
					.contains(connotation))
					.toEqual(false);
			});
		});

		it('should set a connotation class', async function () {
			const connotation = possibleConnotations[2];
			(element.connotation as Connotation) = connotation;
			await elementUpdated(element);
			expect(getBaseElement(element)
				?.classList
				.contains(`connotation-${connotation}`))
				.toEqual(true);
		});
	});

	describe('timeoutms', function () {
		it('should fire close event after timeoutms milliseconds', async function () {
			jest.useFakeTimers();
			const spy = jest.fn();

			element.timeoutms = 100;
			element.open = true;
			element.addEventListener('close', spy);

			jest.advanceTimersByTime(100);

			expect(spy).toHaveBeenCalled();
			jest.useRealTimers();
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
				[Connotation.Alert, 'error-line']
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

	describe('icon', function () {

		const getIcon: () => Icon | null = () => getBaseElement(element).querySelector('.icon > vwc-icon');

		it('should not have an icon if there is none and no connotation is set', async function () {
			expect(getIcon()).toBeNull();
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
				[Connotation.Alert, 'error-line']
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
			expect(element.removable)
				.toEqual(false);
			expect(element.hasAttribute('removable'))
				.toEqual(false);
		});

		it('should set removable property on attribute change', async function () {
			element.toggleAttribute('removable');
			await elementUpdated(element);
			expect(element.removable)
				.toEqual(true);
		});

		describe('removable with button', function () {

			it('should have dismiss button when removable is true', async function () {
				element.toggleAttribute('removable');
				await elementUpdated(element);
				const dismissButton: Button = element.shadowRoot?.querySelector('.dismiss-button') as Button;

				expect(dismissButton).not.toEqual(null);
			});

			it('should remove the remove button when removable is false', async function () {
				expect(element.shadowRoot?.querySelector('.dismiss-button'))
					.toEqual(null);
			});

			it('should close when removable is true', async function () {
				element.open = true;
				element.toggleAttribute('removable');
				await elementUpdated(element);
				const dismissButton: Button = element.shadowRoot?.querySelector('.dismiss-button') as Button;

				expect(element.open).toEqual(true);

				dismissButton.click();
				await elementUpdated(element);

				expect(element.open).toEqual(false);
			});
		});

		describe('removable with Escape', function () {

			beforeEach(() => element.open = true);

			it('should remove the alert when esc and removable is true', async function () {
				const spy = jest.fn();
				element.removable = true;
				element.addEventListener('close', spy);

				await elementUpdated(element);
				element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

				expect(spy).toHaveBeenCalledTimes(1);
				expect(element.open).toBeFalsy();
			});

			it('should remove the alert only on escape key', async function () {
				const spy = jest.fn();
				element.removable = true;
				element.addEventListener('close', spy);

				await elementUpdated(element);
				element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

				expect(spy).toHaveBeenCalledTimes(0);
				expect(element.open).toBeTruthy();
			});

			it('should remove keydown listener after disconnection', async function () {
				const spy = jest.fn();
				element.removable = true;
				element.addEventListener('close', spy);

				await elementUpdated(element);
				element.disconnectedCallback();
				element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

				expect(spy).not.toHaveBeenCalled();
			});

			it('should not fire close event when removable is false', async function () {
				const spy = jest.fn();
				element.removable = false;
				element.addEventListener('close', spy);

				await elementUpdated(element);
				element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

				expect(spy).not.toHaveBeenCalled();
			});
		});

	});
});
