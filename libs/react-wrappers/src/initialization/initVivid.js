/* global HTMLElement */
import context from '@vonage/vvd-context';
import { init } from '@vonage/vvd-fonts';

import coreStyles from './../generated/style.core.all';
import darkThemeStyles from './../generated/style.theme.dark';
import lightThemeStyles from './../generated/style.theme.light';
import fontSpeziaStyles from './../generated/style.font.spezia';
import vividVersion from './../generated/vivid.version';

const vividDataAttributePrefix = 'data-vivid';

const appendStyleElement =
	(document = window.document) =>
	(styleDescriptor) => {
		const attributeName = `${vividDataAttributePrefix}-id`;
		if (
			document.querySelectorAll(`[${attributeName}="${styleDescriptor.id}"]`)
				.length > 0
		) {
			return;
		}
		const styleElement = document.createElement('style');
		styleElement.setAttribute('type', 'text/css');
		styleElement.setAttribute(attributeName, styleDescriptor.id);
		styleElement.innerHTML = styleDescriptor.css;
		document.head.append(styleElement);
	};

/**
 * mounts Vivid context (styles) & Fonts into the target scope / document
 * - target scope may by any `HTMLElement` or `Document` or `DocumentFragment` (including `ShadowRoot`)
 * - default target (when not specified) is the document visible in the current scope
 * - the API is idempotent, the style/s will be mounted only once, even if API called multiple times
 *
 * @param {Document | DocumentFragment | HTMLElement} target - target document/shadow root/element to mount the CSS into
 * @param {Function} callback - callback function to be invoked once init is done
 * @param {Object} options - options config how to init vivid. `theme` - dark | light, `font` - proprietary | oss
 *
 * @throws {Error} error - if the provided target argument is `null` or not a Node of type `Document` / `DocumentFragment` / `HTMLElement`
 */
export const initVivid = (target, callback, options = {}) => {
	let targetElement = target;
	if (targetElement instanceof HTMLElement) {
		targetElement.classList.add('vivid-scope'); // vivid 2.x
		targetElement.setAttribute(
			`${vividDataAttributePrefix}-v2`,
			vividVersion.v2
		);

		targetElement.classList.add('vvd-root'); // vivid 3.x
		targetElement.setAttribute(
			`${vividDataAttributePrefix}-v3`,
			vividVersion.v3
		);
		targetElement = undefined;
	}
	if (!options.theme) {
		options.theme = 'light';
	}
	const appendStyle = appendStyleElement();
	appendStyle(coreStyles);
	appendStyle(options.theme === 'light' ? lightThemeStyles : darkThemeStyles);
	if (options.font === 'proprietary') {
		appendStyle(fontSpeziaStyles);
	}
	return Promise.all([init(), context.mount(targetElement)]).then(callback);
};
