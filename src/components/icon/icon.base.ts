import { FoundationElement } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';

export class Icon extends FoundationElement {
	/**
     * Indicates the icon's type.
     *
     * @public
     * @remarks
     * HTML Attribute: type
     */
	@attr type?: string;
}
