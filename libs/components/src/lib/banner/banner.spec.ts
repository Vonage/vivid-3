import {elementUpdated, fixture} from '@vivid-nx/shared';
import type {Icon} from '../icon/icon';
import {Button} from '../button/button';
import {Connotation} from '../enums';
import { Banner } from './banner';
import type { BannerConnotation } from './banner';
import '.';

const COMPONENT_TAG = 'vwc-banner';

/**
 * @param element
 * @param removable
 */
async function toggleRemovable(element: Banner, removable = true) {
	element.removable = removable;
	await elementUpdated(element);
}

describe('vwc-banner', () => {
	/**
	 *
	 */
	function dispatchAnimationEndEvent() {
		const banner = element.shadowRoot?.querySelector('.banner');
		const event = new Event('animationend');
		banner?.dispatchEvent(event);
	}

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
			const text = element.shadowRoot?.querySelector('.banner--message')?.textContent;
			return text?.trim();
		}

		it('should init with undefined and set as empty string in DOM', function () {
			const initTextPropEmpty = element.text;
			const initTextAttrEmpty = getText();

			expect(initTextPropEmpty)
				.toEqual(undefined);
			expect(initTextAttrEmpty)
				.toEqual('');
		});

		it('should reflect the message', async function () {
			const messageText = 'Some Text';

			await setTextProperty(messageText);
			const DOMTextWithProperty = getText();

			await setTextProperty(undefined);
			await setTextAttribute(messageText);
			const propertyTextWithAttribute = element.text;

			expect(DOMTextWithProperty)
				.toEqual(messageText);
			expect(propertyTextWithAttribute)
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

	describe('remove', function () {

		it('should fire removing event', async function () {
			const spy = jest.fn();
			element.addEventListener('vwc-banner:removing', spy);
			element.remove();
			expect(spy)
				.toHaveBeenCalled();
		});

		it('should fire removed after animation end', async function () {

			const spy = jest.fn();
			element.addEventListener('vwc-banner:removed', spy);
			element.remove();

			dispatchAnimationEndEvent();

			expect(spy)
				.toHaveBeenCalled();
			expect(spy.mock.calls.length)
				.toEqual(1);
		});

		it('should disable removed and removing events after disconnected callback', async function () {

			const spy = jest.fn();
			element.addEventListener('vwc-banner:removed', spy);
			element.addEventListener('vwc-banner:removing', spy);
			element.disconnectedCallback();

			element.remove();
			dispatchAnimationEndEvent();

			expect(spy.mock.calls.length)
				.toEqual(0);
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
				expect(element.shadowRoot?.querySelector('.banner')
					?.classList
					.contains(connotation))
					.toEqual(false);
			});
		});

		it('should set a connotation class', async function () {
			const connotation = possibleConnotations[2];
			(element.connotation as Connotation) = connotation;
			await elementUpdated(element);
			expect(element.shadowRoot?.querySelector('.banner')
				?.classList
				.contains(`connotation-${connotation}`))
				.toEqual(true);
		});
	});

	describe('icon', function () {
		let getIcon: () => Icon;

		beforeEach(function () {
			getIcon = () => element.shadowRoot?.querySelector('.icon > vwc-icon') as Icon;
		});

		it('should set the icon according to connotation info by default', function () {
			expect(getIcon().type)
				.toEqual('info-solid');
		});

		it('should set the icon according to "icon" attribute', async function () {
			element.setAttribute('icon', 'home');
			await elementUpdated(element);

			expect(getIcon().type)
				.toEqual('home');
		});

		it('should set the icon according to set connotation', async function () {
			const connotationIconMap: Map<BannerConnotation, string> = new Map([
				[Connotation.Info, 'info-solid'],
				[Connotation.Announcement, 'megaphone-solid'],
				[Connotation.Success, 'check-circle-solid'],
				[Connotation.Warning, 'warning-solid'],
				[Connotation.Alert, 'error-solid']
			]);

			for (const [connotation, iconName] of connotationIconMap) {
				element.connotation = connotation;

				await elementUpdated(element);

				expect(getIcon().type).toEqual(iconName);
			}
		});
	});

	describe('removable', function () {
		it('should init to false', function () {
			expect(element.removable)
				.toEqual(false);
			expect(element.hasAttribute('removable'))
				.toEqual(false);
		});

		it('should toggle attribute on host', async function () {
			await toggleRemovable(element);
			const removeAttributeExistsWhenTrue = element.hasAttribute('removable');

			await toggleRemovable(element, false);
			const removeAttributeExistsWhenFalse = element.hasAttribute('removable');

			expect(removeAttributeExistsWhenTrue)
				.toEqual(true);
			expect(removeAttributeExistsWhenFalse)
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

		it('should add a remove button when true', async function () {
			await toggleRemovable(element, true);
			expect(element.shadowRoot?.querySelector('.dismiss-button'))
				.toBeInstanceOf(Button);
		});

		it('should remove banner on remove button click', async function () {
			await toggleRemovable(element, true);
			const dismissButton = element.shadowRoot?.querySelector('.dismiss-button') as HTMLElement;
			dismissButton.click();
			dispatchAnimationEndEvent();
			expect(document.body.contains(element))
				.toEqual(false);
		});

		it('should add class "removing" to banner on remove button click', async function () {
			await toggleRemovable(element, true);
			const dismissButton = element.shadowRoot?.querySelector('.dismiss-button') as HTMLElement;
			dismissButton.click();
			expect(element.shadowRoot?.querySelector('.banner')?.classList.contains('removing')).toEqual(true);
		});
	});

	describe('remove on escape key', function () {
		it('should remove the button on escape key', async function () {
			element.removable = true;
			element.focus();
			jest.spyOn(element, 'remove');
			element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
			expect(element.remove).toHaveBeenCalled();
		});

		it('should remove the banner only on escape key', async function () {
			element.removable = true;
			element.focus();
			const spy = jest.spyOn(element, 'remove');
			element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
			expect((spy as any).mock.calls.length).toEqual(0);

		});

		it('should remove keydown listener after disconnection', async function () {
			element.removable = true;
			element.focus();
			element.disconnectedCallback();
			const spy = jest.spyOn(element, 'remove');
			element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
			expect((spy as any).mock.calls.length).toEqual(0);
		});

		it('should remove the banner only if "removable" is true', async function () {
			element.removable = false;
			element.focus();
			const spy = jest.spyOn(element, 'remove');
			element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
			expect((spy as any).mock.calls.length).toEqual(0);
		});
	});

});
