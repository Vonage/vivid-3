import { elementUpdated, fixture, getBaseElement } from '@vivid-nx/shared';
import type { Icon } from '../icon/icon';
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
			expect(element.subtitle).toBeUndefined();
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

	describe('connotation', function () {
		const possibleConnotations = [Connotation.Information,
			Connotation.Accent,
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

	describe('icon', function () {
		let getIcon: () => Icon;

		beforeEach(function () {
			getIcon = () => getBaseElement(element).querySelector('.icon > vwc-icon') as Icon;
		});

		it('should set the icon according to "icon" attribute', async function () {
			element.setAttribute('icon', 'home');
			await elementUpdated(element);

			expect(getIcon().name)
				.toEqual('home');
		});

		it('should set the icon according to set connotation', async function () {
			const connotationIconMap: Map<AlertConnotation, string> = new Map([
				[Connotation.Information, 'info-line'],
				[Connotation.Accent, 'megaphone-line'],
				[Connotation.Success, 'check-circle-line'],
				[Connotation.Warning, 'warning-line'],
				[Connotation.Alert, 'error-line']
			]);

			for (const [connotation, iconName] of connotationIconMap) {
				element.connotation = connotation;

				await elementUpdated(element);

				expect(getIcon().name).toEqual(iconName);
			}
		});
	});

	describe('timeout', function () {
		it('should fire removed event', async function () {
			const timeout = 100;
			const spy = jest.fn();
			element.addEventListener('removed', spy);
			element.open = true;
			element.timeoutms = timeout;

			await elementUpdated(element);
			expect(spy)
				.not.toHaveBeenCalled();

			setTimeout(() => {
				expect(spy)
					.toHaveBeenCalled();
			}, timeout);

		});

		it('should fire removed event when open from start', async function () {
			const timeout = 100;

			element = (await fixture(
				`<${COMPONENT_TAG} open timeoutms=${timeout}></${COMPONENT_TAG}>`
			)) as Alert;

			const spy = jest.fn();
			element.addEventListener('removed', spy);

			await elementUpdated(element);
			element.open = false;
			expect(spy)
				.not.toHaveBeenCalled();

			setTimeout(() => {
				expect(spy)
					.toHaveBeenCalled();
			}, timeout);

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

		it('should remove the remove button when removable is false', async function () {
			expect(element.shadowRoot?.querySelector('.dismiss-button'))
				.toEqual(null);
		});
	});

	describe('remove on escape key', function () {
		it('should remove the alert when esc and removable is true', async function () {
			const spy = jest.fn();
			element.addEventListener('removed', spy);
			element.removable = true;
			element.focus();
			element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
			elementUpdated(element);
			expect((spy as any).mock.calls.length).toEqual(1);
		});

		it('should remove the alert only on escape key', async function () {
			const spy = jest.fn();
			element.addEventListener('removed', spy);
			element.removable = true;
			element.focus();
			element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
			expect((spy as any).mock.calls.length).toEqual(0);
		});

		it('should remove keydown listener after disconnection', async function () {
			const spy = jest.fn();
			element.addEventListener('removed', spy);
			element.removable = true;
			element.focus();
			element.disconnectedCallback();
			element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
			expect((spy as any).mock.calls.length).toEqual(0);
		});

		it('should remove the alert only if "removable" is true', async function () {
			const spy = jest.fn();
			element.addEventListener('removed', spy);
			element.removable = false;
			element.focus();
			element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
			elementUpdated(element);
			expect((spy as any).mock.calls.length).toEqual(0);
		});
	});
});
