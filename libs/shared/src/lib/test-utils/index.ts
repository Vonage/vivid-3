import { configureAxe } from 'vitest-axe';

export const elementUpdated = async (element: Element | HTMLElement) => {
	return new Promise((resolve) =>
		requestAnimationFrame(() => resolve(element))
	);
};

export const ADD_TEMPLATE_TO_FIXTURE = true;

export const fixture = (() => {
	const fragment = document.createElement('div');
	document.body.appendChild(fragment);
	return (template: string, add = !ADD_TEMPLATE_TO_FIXTURE) => {
		if (add) {
			const tmpFragment = document.createElement('div');
			tmpFragment.innerHTML = template;
			const element = tmpFragment.children[0];
			fragment.appendChild(element);
			return element;
		}
		fragment.innerHTML = template;
		return fragment.children[0];
	};
})();

export const getBaseElement = (element: Element) => {
	return element.shadowRoot?.querySelector('.base') as HTMLElement;
};

export const getControlElement = (element: Element) => {
	return element.shadowRoot?.querySelector('.control') as HTMLElement;
};

export async function setProperty<T extends Element, P extends keyof T>(
	element: T,
	property: P,
	value: T[P]
) {
	element[property] = value;
	await elementUpdated(element);
}

export const getMessage = (element: Element, type: string) => {
	const messageEl = element.shadowRoot!.querySelector(
		`.${type}-message.message--visible:not(.sr-only)`
	);
	if (!messageEl) {
		return null;
	}
	const slot = messageEl.querySelector('slot') as HTMLSlotElement | null;
	if (slot && slot.assignedNodes().length > 0) {
		return slot.assignedNodes()[0].textContent!.trim();
	} else {
		return messageEl.textContent!.trim();
	}
};

export const axe = configureAxe({
	rules: {
		// color contrast doesn't work in this env
		'color-contrast': { enabled: false },
		// stops the HTML provided from being treated as a whole page
		region: { enabled: false },
	},
});

export * from './form-association';
export * from './delegatesFocusPolyfill';
export * from './active-element';
