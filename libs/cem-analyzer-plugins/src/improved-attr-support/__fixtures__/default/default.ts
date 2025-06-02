import { attr } from '@microsoft/fast-element';

export class MyComponent extends HTMLElement {
	@attr noOptions = '';
	@attr({ mode: 'boolean' }) optionsWithoutName = false;
	@attr({ mode: 'boolean', attribute: 'specified name' }) optionsWithName =
		false;
}
