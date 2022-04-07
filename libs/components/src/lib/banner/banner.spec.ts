import {elementUpdated, fixture} from '@vivid-nx/shared';
import {Banner} from './banner';
import '.';

const COMPONENT_TAG = 'vwc-banner';

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

    describe(`open`, function () {
      
    });
	});
});
