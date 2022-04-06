import {elementUpdated, fixture} from '@vivid-nx/shared';
import { Banner } from './banner';
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
			expect(element).toBeInstanceOf(Banner);
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
				return initMessageAttrEmpty;
			}

			it('should init with undefined and set as empty string in DOM', function () {
				const initMessagePropEmpty = element.message;
				const initMessageAttrEmpty = getMessageText();

				expect(initMessagePropEmpty).toEqual(undefined);
				expect(initMessageAttrEmpty).toEqual('');
			});

			it('should reflect the message', async function () {
				const messageText = 'Some Message';

				await setMessageProperty(messageText);
				const DOMMessageWithProperty = getMessageText();

				await setMessageProperty(undefined);
				await setMessageAttribute(messageText);
				const propertyMessageWithAttribute = element.message;

				expect(DOMMessageWithProperty).toEqual(messageText);
				expect(propertyMessageWithAttribute).toEqual(messageText);
			});
		});
	});
});
