export const elementUpdated = async (element: Element | HTMLElement) => {
	return new Promise(resolve => requestAnimationFrame(() => resolve(element)));
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
}

export const getControlElement = (element: Element) => {
	return element.shadowRoot?.querySelector('.control') as HTMLElement;
}

export async function setAttribute(element: any, attribute: string, value: string) {
  element[attribute] = value;
  await elementUpdated(element);
}
