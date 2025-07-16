import { VwcButtonElement } from '@vonage/vivid';

export function setDialogPolyfill() {
	// Polyfill dialog element which is not supported in JSDOM
	HTMLDialogElement.prototype.showModal = function () {
		this.open = true;
		this.setAttribute('open', '');
	};

	HTMLDialogElement.prototype.close = function () {
		this.open = false;
		this.removeAttribute('open');
	};

	HTMLElement.prototype.hidePopover = function () {};
	HTMLElement.prototype.showPopover = function () {};
	HTMLElement.prototype.scrollIntoView = function () {};

	// Workaround: Remove handleUnsupportedDelegatesFocus (which we don't need) because it breaks when used with user-event
	Object.defineProperty(
		Object.getPrototypeOf(VwcButtonElement).prototype,
		'handleUnsupportedDelegatesFocus',
		{
			set() {},
			get() {
				return () => undefined;
			},
		}
	);

	window.ResizeObserver = class ResizeObserver {
		constructor() {}

		observe() {}
		disconnect() {}
	} as any;
}

setDialogPolyfill();
