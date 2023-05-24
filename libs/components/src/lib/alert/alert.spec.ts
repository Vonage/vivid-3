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
		/**
		 * @param headline
		 */
		async function setHeadlineProperty(headline: string | undefined) {
			element.headline = headline;
			await elementUpdated(element);
		}

		/**
		 * @param headline
		 */
		async function setHeadlineAttribute(headline: string | undefined) {
			element.setAttribute('headline', headline ? headline : '');
			await elementUpdated(element);
		}

		/**
		 *
		 */
		function getHeadline() {
			const headline = getBaseElement(element).querySelector('.headline')?.textContent;
			return headline?.trim();
		}

		it('should init with undefined and set as empty string in DOM', function () {
			const initHeadlinePropEmpty = element.headline;
			const initHeadlineAttrEmpty = getHeadline();

			expect(initHeadlinePropEmpty)
				.toEqual(undefined);
			expect(initHeadlineAttrEmpty).toBeUndefined();
		});

		it('should reflect the message', async function () {
			const messageHeadline = 'Some Headline';

			await setHeadlineProperty(messageHeadline);
			const DOMHeadlineWithProperty = getHeadline();

			await setHeadlineProperty(undefined);
			await setHeadlineAttribute(messageHeadline);
			const propertyHeadlineWithAttribute = element.headline;

			expect(DOMHeadlineWithProperty)
				.toEqual(messageHeadline);
			expect(propertyHeadlineWithAttribute)
				.toEqual(messageHeadline);
		});
	});

	describe('text', function () {
		/**
		 * @param text
		 */
		async function setTextProperty(text: string | undefined) {
			element.text = text;
			await elementUpdated(element);
		}

		/**
		 * @param text
		 */
		async function setTextAttribute(text: string | undefined) {
			element.setAttribute('text', text ? text : '');
			await elementUpdated(element);
		}

		/**
		 *
		 */
		function getText() {
			const subtitle = getBaseElement(element).querySelector('.maintext')?.textContent;
			return subtitle?.trim();
		}

		it('should init with undefined and set as empty string in DOM', function () {
			const initSubtitlePropEmpty = element.text;
			const initSubtitleAttrEmpty = getText();

			expect(initSubtitlePropEmpty)
				.toEqual(undefined);
			expect(initSubtitleAttrEmpty).toBeUndefined();
		});

		it('should reflect the message', async function () {
			const messageSubtitle = 'Some Subtitle';

			await setTextProperty(messageSubtitle);
			const DOMSubtitleWithProperty = getText();

			await setTextProperty(undefined);
			await setTextAttribute(messageSubtitle);
			const propertySubtitleWithAttribute = element.text;

			expect(DOMSubtitleWithProperty)
				.toEqual(messageSubtitle);
			expect(propertySubtitleWithAttribute)
				.toEqual(messageSubtitle);
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

	describe('icon / conditionedIcon', function () {

		const getIcon: () => Icon | null = () => getBaseElement(element).querySelector('.icon > vwc-icon');

		it('should not have an icon if there is none and no connotation is set', async function () {
			expect(getIcon()).toBeNull();
		});

		it('should have an icon if one is set and no connotation is', async function () {
			element.setAttribute('icon', 'home');

			await elementUpdated(element);
			const iconEl = getIcon();

			expect(iconEl).toBeDefined();
			expect(iconEl?.name).toEqual('home');
		});

		it('should have the connotion icon if connotation is set and icon is not', async function () {
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
