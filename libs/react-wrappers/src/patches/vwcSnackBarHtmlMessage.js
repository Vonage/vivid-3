const createHtmlMessageElement = (html) => {
	const element = document.createElement('div');
	element.setAttribute('class', 'mdc-snackbar__label');
	element.setAttribute('role', 'status');
	element.setAttribute('aria-live', 'polite');
	element.innerHTML = html;
	return element;
};

/**
 * Patches `VwcSnackbar` to allow html message text
 *
 * @param {HTMLElement} element - target element to patch
 * @example <VwcSnackbar ref={vwcSnackBarHtmlMessageDecorator('<b>bold</b>')} />
 */
export const vwcSnackBarHtmlMessageDecorator =
	(htmlMessage = '<b>bold</b>') =>
	(element) =>
		setTimeout(() => {
			const component = element?.shadowRoot.querySelector('.header-and-label');
			component?.style.setProperty('width', '100%');
			component?.append(createHtmlMessageElement(htmlMessage));
		}, 0);
