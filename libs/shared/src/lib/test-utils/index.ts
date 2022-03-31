export const elementUpdated = async (element: Element | HTMLElement) => {
	return new Promise(resolve => requestAnimationFrame(() => resolve(element)));
};

export const fixture = (() => {
	const fragment = document.createElement('div');
	document.body.appendChild(fragment);
	return (template: string) => {
		fragment.innerHTML = template;
		return fragment.children[0];
	};
})();

export const getControlElement = (element: Element) => {
	return element.shadowRoot?.querySelector('.control') as HTMLElement;
}

export async function setAttribute(element: any, attribute: string, value: string) {
  element[attribute] = value;
  await elementUpdated(element);
}
