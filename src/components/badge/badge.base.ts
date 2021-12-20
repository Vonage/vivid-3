import { FoundationElement } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';

import type { Connotation, Shape, Layout } from '../../core/foundation/enums.js';

type BadgeConnotation = Extract<Connotation,
| Connotation.Primary
| Connotation.CTA
| Connotation.Success
| Connotation.Alert
| Connotation.Warning
| Connotation.Info>;

type BadgeLayout = Extract<Layout,
Layout.Filled | Layout.Outlined | Layout.Soft>;

type BadgeShape = Extract<Shape, Shape.Rounded | Shape.Pill>;

export class Badge extends FoundationElement {
	/**
     * Indicates the element's connotation color representation.
     *
     * @public
     * @remarks
     * HTML Attribute: connotation
     */
	@attr connotation?: BadgeConnotation;

	@attr shape?: BadgeShape;

	@attr layout?: BadgeLayout;

	@attr size?: 'small' | 'medium' | 'large';

	@attr icon?: string;

	@attr({
		mode: 'boolean',
		attribute: 'trailingicon',
	}) trailingIcon = false;

	/**
     * Indicates the badge's text.
     * @public
     * @remarks
     * HTML Attribute: text
     */
	@attr({
		attribute: 'text',
	})
		text = '';
}
