export const getActiveElementPiercingShadowRoot = () => {
	let element = document.activeElement;
	while (element?.shadowRoot && element.shadowRoot.activeElement !== element) {
		element = element.shadowRoot.activeElement;
	}
	return element;
};
