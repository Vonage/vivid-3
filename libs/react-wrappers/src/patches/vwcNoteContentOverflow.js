const createStyleElement = () => {
	const styleElement = document.createElement('style');
	styleElement.innerHTML = `
      .vwc-note {
        contain: inherit !important;
      }`;
	return styleElement;
};

/**
 * Patches `VwcNote` (styles) to allow content overflow
 *
 * @param {HTMLElement} noteElement - target element to mount the CSS into
 * @example <VwcNote ref={vwcNoteContentOverflowDecorator} />
 */
export const vwcNoteContentOverflowDecorator = (noteElement) =>
	setTimeout(() => {
		const component = noteElement?.shadowRoot;
		component && component.append(createStyleElement());
	}, 0);
