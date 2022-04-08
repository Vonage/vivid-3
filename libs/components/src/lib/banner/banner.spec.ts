import {elementUpdated, fixture} from '@vivid-nx/shared';
import type {Icon} from '../icon/icon';
import {Button} from '../button/button';
import {Connotation} from '../enums';
import {connotationIconMap} from './banner.template';
import {Banner} from './banner';
import '.';

const COMPONENT_TAG = 'vwc-banner';

/**
 * @param element
 */
async function openBanner(element: Banner) {
	element.open = true;
	await elementUpdated(element);
}

/**
 * @param element
 * @param dismissible
 */
async function toggleDismissible(element: Banner, dismissible = true) {
	element.dismissible = dismissible;
	await elementUpdated(element);
}

/**
 * @param element
 */
async function closeBanner(element: Banner) {
	element.open = false;
	await elementUpdated(element);
}

describe('vwc-banner', () => {
	let element: Banner;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as Banner;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-banner', async () => {
			expect(element)
				.toBeInstanceOf(Banner);
		});

		describe('message', function () {
			/**
			 * @param messageText
			 */
			async function setMessageProperty(messageText: string | undefined) {
				element.message = messageText;
				await elementUpdated(element);
			}

			/**
			 * @param messageText
			 */
			async function setMessageAttribute(messageText: string | undefined) {
				element.setAttribute('message', messageText ? messageText : '');
				await elementUpdated(element);
			}

			/**
			 *
			 */
			function getMessageText() {
				const initMessageAttrEmpty = element.shadowRoot?.querySelector('.banner--message')?.textContent;
				return initMessageAttrEmpty?.trim();
			}

			it('should init with undefined and set as empty string in DOM', function () {
				const initMessagePropEmpty = element.message;
				const initMessageAttrEmpty = getMessageText();

				expect(initMessagePropEmpty)
					.toEqual(undefined);
				expect(initMessageAttrEmpty)
					.toEqual('');
			});

			it('should reflect the message', async function () {
				const messageText = 'Some Message';

				await setMessageProperty(messageText);
				const DOMMessageWithProperty = getMessageText();

				await setMessageProperty(undefined);
				await setMessageAttribute(messageText);
				const propertyMessageWithAttribute = element.message;

				expect(DOMMessageWithProperty)
					.toEqual(messageText);
				expect(propertyMessageWithAttribute)
					.toEqual(messageText);
			});
		});

		describe('role', function () {
			it('should be set to "status" on init', function () {
				const role = element.shadowRoot?.querySelector('.banner--message')
					?.getAttribute('role');
				expect(role)
					.toEqual('status');
			});

			it('should change role to role text', async function () {
				element.role = 'alert';
				await elementUpdated(element);
				const role = element.shadowRoot?.querySelector('.banner--message')
					?.getAttribute('role');
				expect(role)
					.toEqual('alert');
			});

			it('should change role when role attribute is set', async function () {
				element.setAttribute('role', 'alert');
				await elementUpdated(element);
				const role = element.shadowRoot?.querySelector('.banner--message')
					?.getAttribute('role');
				expect(role)
					.toEqual('alert');
			});
		});

		describe('aria live', function () {
			it('should be set to "live" on init', function () {
				const ariaLive = element.shadowRoot?.querySelector('.banner--message')
					?.getAttribute('aria-live');
				expect(ariaLive)
					.toEqual('polite');
			});

			it('should change aria-live to ariaLive text', async function () {
				element.ariaLive = 'assertive';
				await elementUpdated(element);
				const ariaLive = element.shadowRoot?.querySelector('.banner--message')
					?.getAttribute('aria-live');
				expect(ariaLive)
					.toEqual('assertive');
			});

			it('should change aria-live to ariaLive text', async function () {
				element.setAttribute('aria-live', 'assertive');
				await elementUpdated(element);
				const ariaLive = element.shadowRoot?.querySelector('.banner--message')
					?.getAttribute('aria-live');
				expect(ariaLive)
					.toEqual('assertive');
			});
		});

		describe('open', function () {
			/**
			 *
			 */
			function dispatchAnimationEndEvent() {
				const banner = element.shadowRoot?.querySelector('.banner');
				const event = new Event('animationend');
				banner?.dispatchEvent(event);
			}

			it('should init to false', function () {
				expect(element.open)
					.toEqual(false);
				expect(element.hasAttribute('open'))
					.toEqual(false);
			});

			it('should toggle open attribute on host', async function () {
				await openBanner(element);
				const openAttributeExistsWhenTrue = element.hasAttribute('open');

				await closeBanner(element);
				const openAttributeExistsWhenFalse = element.hasAttribute('open');

				expect(openAttributeExistsWhenTrue)
					.toEqual(true);
				expect(openAttributeExistsWhenFalse)
					.toEqual(false);
			});

			it('should set open property on attribute change', async function () {
				element.toggleAttribute('open');
				await elementUpdated(element);
				expect(element.open)
					.toEqual(true);
			});

			it('should fire opening event', async function () {
				const spy = jest.fn();
				element.addEventListener('vwc-banner:opening', spy);
				await openBanner(element);
				expect(spy)
					.toHaveBeenCalled();
			});

			it('should fire opened after animation end', async function () {
				/**
				 *
				 */
				function dispatchAnimationEndEvent() {
					const banner = element.shadowRoot?.querySelector('.banner');
					const event = new Event('animationend');
					banner?.dispatchEvent(event);
				}

				const spy = jest.fn();
				element.addEventListener('vwc-banner:opened', spy);
				await openBanner(element);

				dispatchAnimationEndEvent();

				expect(spy)
					.toHaveBeenCalled();
			});

			it('should fire closing event', async function () {
				const spy = jest.fn();
				element.addEventListener('vwc-banner:closing', spy);
				await openBanner(element);
				await closeBanner(element);
				expect(spy)
					.toHaveBeenCalled();
			});

			it('should fire closed after animation end', async function () {

				const spy = jest.fn();
				element.addEventListener('vwc-banner:closed', spy);
				await openBanner(element);
				await closeBanner(element);

				dispatchAnimationEndEvent();

				expect(spy)
					.toHaveBeenCalled();
				expect(spy.mock.calls.length).toEqual(1);
			});

			it('should add the open class on the banner', async function () {
				await openBanner(element);
				expect(element.shadowRoot?.querySelector('.banner')?.classList.contains('open')).toEqual(true);
			});

			it('should disable closed and opened events after disconnected callback', async function () {

				const spy = jest.fn();
				element.addEventListener('vwc-banner:closed', spy);
				element.addEventListener('vwc-banner:opened', spy);
				element.disconnectedCallback();
				await openBanner(element);
				await closeBanner(element);

				dispatchAnimationEndEvent();

				expect(spy.mock.calls.length)
					.toEqual(0);
			});
		});

		describe('dismissible', function () {
			it('should init to false', function () {
				expect(element.dismissible)
					.toEqual(false);
				expect(element.hasAttribute('dismissible'))
					.toEqual(false);
			});

			it('should toggle attribute on host', async function () {
				await toggleDismissible(element);
				const openAttributeExistsWhenTrue = element.hasAttribute('dismissible');

				await toggleDismissible(element, false);
				const openAttributeExistsWhenFalse = element.hasAttribute('dismissible');

				expect(openAttributeExistsWhenTrue)
					.toEqual(true);
				expect(openAttributeExistsWhenFalse)
					.toEqual(false);
			});

			it('should set dismissible property on attribute change', async function () {
				element.toggleAttribute('dismissible');
				await elementUpdated(element);
				expect(element.dismissible)
					.toEqual(true);
			});

			it('should not add dismiss button when dismissible is false', async function () {
				expect(element.shadowRoot?.querySelector('.dismiss-button'))
					.toEqual(null);
			});

			it('should add a dismiss button', async function () {
				await toggleDismissible(element, true);
				expect(element.shadowRoot?.querySelector('.dismiss-button'))
					.toBeInstanceOf(Button);
			});

			it('should close banner on dismiss button click', async function () {
				await toggleDismissible(element, true);
				await openBanner(element);
				const dismissButton = element.shadowRoot?.querySelector('.dismiss-button') as HTMLElement;
				dismissButton.click();
				await elementUpdated(element);
				expect(element.open)
					.toEqual(false);
			});
		});

		describe('connotation', function () {
			const possibleConnotations = [Connotation.Info,
				Connotation.Announcement,
				Connotation.Success,
				Connotation.Warning,
				Connotation.Alert
			];
			it('should leave connotation class empty if not set', async function () {
				possibleConnotations.forEach(connotation => {
					expect(element.shadowRoot?.querySelector('.banner')?.classList.contains(connotation)).toEqual(false);
				});
			});

			it('should set a connotation class', async function () {
				const connotation = possibleConnotations[2];
				(element.connotation as Connotation)= connotation;
				await elementUpdated(element);
				expect(element.shadowRoot?.querySelector('.banner')?.classList.contains(connotation)).toEqual(true);
			});
		});

		describe('icon', function () {
			let icon: Icon;

			beforeEach(function () {
				icon = element.shadowRoot?.querySelector('.icon') as Icon;
			});

			it('should set the icon according to connotation info by default', function () {
				expect(icon.type).toEqual('info-solid');
			});

			it('should set the icon according to "icon" attribute', async function () {
				element.setAttribute('icon', 'home');
				await elementUpdated(element);
				expect(icon.type).toEqual('home');
			});

			it('should set the icon according to set connotation', async function () {
				for (const [connotation, iconName] of connotationIconMap) {
					(element.connotation as Connotation) = connotation;
					await elementUpdated(element);
					expect(icon.type).toEqual(iconName);
				}
			});
		});
	});
});
