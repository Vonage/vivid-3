import { FoundationElement } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';

import type { Connotation } from '../../core/foundation/enums.js';

type BadgeConnotation = Extract<Connotation,
| Connotation.Primary
| Connotation.CTA
| Connotation.Success
| Connotation.Alert
| Connotation.Warning
| Connotation.Info>;

export class Badge extends FoundationElement {
	/**
     * Indicates the element's connotation color representation.
     *
     * @public
     * @remarks
     * HTML Attribute: connotation
     */
	@attr connotation?: BadgeConnotation;

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
