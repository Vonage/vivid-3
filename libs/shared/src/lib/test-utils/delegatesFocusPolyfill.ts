// JSDOM currently does not support delegatesFocus, see https://github.com/jsdom/jsdom/issues/3418
// This is a workaround to allow us to test focus behaviour.
// Unfortunately it causes jest to throw "TypeError: Converting circular structure to JSON" when a test fails
/* istanbul ignore next */
export const setupDelegatesFocusPolyfill = (forElement: HTMLElement) => {
	let activeElement: Element | null = null;
	Object.defineProperty(window.ShadowRoot.prototype, 'activeElement', {
		get: () => activeElement,
	});
	const focus = window.HTMLElement.prototype.focus;
	window.HTMLElement.prototype.focus = function () {
		// eslint-disable-next-line @typescript-eslint/no-this-alias
		let currentFocusTarget: Node | ShadowRoot = this;

		// Move up the tree until we find our shadow root
		while (
			currentFocusTarget.getRootNode() !== document &&
			currentFocusTarget.getRootNode() !== currentFocusTarget
		) {
			if (currentFocusTarget.getRootNode() === forElement.shadowRoot) {
				activeElement = currentFocusTarget as Element;
			}

			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			currentFocusTarget = currentFocusTarget.getRootNode()!;
			/* v8 ignore else -- @preserve */
			if (currentFocusTarget instanceof ShadowRoot) {
				currentFocusTarget = currentFocusTarget.host;
			}
		}

		focus.call(this);
	};
};
