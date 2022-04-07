import {elementUpdated, fixture} from '@vivid-nx/shared';
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
			it('should init to false', function () {
				expect(element.open).toEqual(false);
				expect(element.hasAttribute('open')).toEqual(false);
			});

			it('should toggle attribute on host', async function () {
				await openBanner(element);
				const openAttributeExistsWhenTrue = element.hasAttribute('open');

				element.open = false;
				await elementUpdated(element);
				const openAttributeExistsWhenFalse = element.hasAttribute('open');

				expect(openAttributeExistsWhenTrue).toEqual(true);
				expect(openAttributeExistsWhenFalse).toEqual(false);
			});

			it('should set open property on attribute change', async function () {
				element.toggleAttribute('open');
				await elementUpdated(element);
				expect(element.open).toEqual(true);
			});

			it('should fire opening event', async function () {
				const spy = jest.fn();
				element.addEventListener('vwc-banner:opening', spy);
				await openBanner(element);
				expect(spy).toHaveBeenCalled();
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

				expect(spy).toHaveBeenCalled();
			});
		});
	});
});
