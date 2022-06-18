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

export function listenToFormSubmission(formElement: HTMLFormElement) {
	return new Promise((res) => {
		formElement.addEventListener('submit', () => {
			const formData = new FormData(formElement);
			res(formData);
		});
	});
}
export interface CreateFormHTMLConfig {
	componentTagName: string,
	fieldName: string,
	formId: string,
	otherFormId?: string,
	fieldValue?: string,
	checked?: string | boolean,
	formWrapper?: HTMLElement
}

/**
 * @param root0
 * @param root0.fieldName
 * @param root0.fieldValue
 * @param root0.formId
 * @param root0.otherFormId
 * @param root0.checked
 * @param root0.componentTagName
 * @param root0.formWrapper
 */
export function createFormHTML<T>({fieldName, fieldValue, formId, otherFormId, checked, componentTagName, formWrapper}: CreateFormHTMLConfig) {
	formWrapper = formWrapper || document.createElement('div');
	const otherForm = otherFormId
		? `<form onsubmit="return false" id="${otherFormId}"><button></button></form>`
		: '';
	formWrapper.innerHTML = `
				<form onsubmit="return false" name="testForm" id="${formId}">
					<${componentTagName} name="${fieldName}"
														${fieldValue ? `value="${fieldValue}"` : ''}
														${checked ? 'checked' : ''}
						${otherFormId ? `form="${otherFormId}"` : `form="${formId}"`}>
					</${componentTagName}>
					<button></button>
				</form>
				${otherForm}
			`;

	return {
		formWrapper,
		form: formWrapper.children[0] as HTMLFormElement,
		otherForm: formWrapper.children[1] as HTMLFormElement,
		element: formWrapper.querySelector(componentTagName) as unknown as T,
		button: formWrapper.children[0]?.querySelector('button'),
		otherFormButton: formWrapper.children[1]?.querySelector('button'),
	};
}

