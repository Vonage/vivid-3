import { customElement, FASTElement, html } from '@microsoft/fast-element';
import { getActiveElementPiercingShadowRoot } from './active-element';

@customElement({
	name: 'test-component',
	template: html`<button id="button-inside"></button>`,
})
class TestComponent extends FASTElement {}

describe('getActiveElementPiercingShadowRoot', () => {
	beforeEach(() => {
		document.body.innerHTML = `
			<button id="button-outside"></button>
			<test-component></test-component>
		`;
	});

	const getButtonOutside = () =>
		document.querySelector('#button-outside') as HTMLElement;
	const getButtonInside = () =>
		(
			document.querySelector('test-component') as TestComponent
		).shadowRoot!.querySelector('#button-inside') as HTMLElement;

	it('should return the active element if it is in light DOM', () => {
		getButtonOutside().focus();

		expect(getActiveElementPiercingShadowRoot()).toBe(getButtonOutside());
	});

	it('should return the active element if it is in a shadowRoot', () => {
		getButtonInside().focus();

		expect(getActiveElementPiercingShadowRoot()).toBe(getButtonInside());
	});
});
