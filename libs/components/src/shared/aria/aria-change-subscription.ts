import type { AriaMixinElement, AriaPropertyName } from './aria-mixin';

/*
 * Allows subscribing to changes to any ARIA attribute of an element.
 * This is more performant than each instance creating observers for each
 * property.
 */

type AriaChangeSubscriber = (
	source: AriaMixinElement,
	changedAriaProperty: AriaPropertyName
) => void;

const ariaChangeSubscribers = new WeakMap<
	AriaMixinElement,
	Array<AriaChangeSubscriber>
>();

const getSubscribers = (source: AriaMixinElement) => {
	let subscribers = ariaChangeSubscribers.get(source);
	if (!subscribers) {
		subscribers = [];
		ariaChangeSubscribers.set(source, subscribers);
	}
	return subscribers;
};

export const subscribeToAriaPropertyChanges = (
	source: AriaMixinElement,
	listener: AriaChangeSubscriber
) => {
	getSubscribers(source).push(listener);
};

export const unsubscribeFromAriaPropertyChanges = (
	source: AriaMixinElement,
	listener: AriaChangeSubscriber
) => {
	getSubscribers(source).splice(getSubscribers(source).indexOf(listener), 1);
};

export const publishAriaPropertyChange = (
	source: AriaMixinElement,
	changedAriaProperty: AriaPropertyName
) => {
	getSubscribers(source).forEach((s) => s(source, changedAriaProperty));
};
