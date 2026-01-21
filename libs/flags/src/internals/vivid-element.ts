import { FASTElement } from '@microsoft/fast-element';

// Replaced at build time
declare const __PACKAGE_VERSION__: string;

/**
 * Base class for all Vivid elements.
 */
export class VividElement extends FASTElement {
	/**
	 * The current version of the Vivid library, which is useful for debugging.
	 * It can be accessed from any Vivid element via `<el>.constructor.VIVID_VERSION`.
	 */
	static VIVID_VERSION = __PACKAGE_VERSION__;

	/**
	 * Core component name, without prefix
	 */
	static componentName: string;

	/**
	 * Add data-vvd-component attribute with component name globally,
	 * for referring to the elements in CSS, testing or debugging
	 */
	override connectedCallback(): void {
		super.connectedCallback();

		const name = (this.constructor as typeof VividElement).componentName;
		this.setAttribute('data-vvd-component', name);
	}
}

export class IconElement extends VividElement {}
