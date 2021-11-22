import {
	html, LitElement, TemplateResult, nothing,
} from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import type { ClassInfo } from 'lit/directives/class-map.js';
import type {
	Connotation,
	Shape,
	Layout,
} from '../../core/foundation/enums.js';

type BadgeConnotation = Extract<
Connotation,
| Connotation.Primary
| Connotation.CTA
| Connotation.Success
| Connotation.Alert
| Connotation.Warning
| Connotation.Info
>;

type BadgeLayout = Extract<
Layout,
Layout.Filled | Layout.Outlined | Layout.Soft
>;

type BadgeShape = Extract<Shape, Shape.Rounded | Shape.Pill>;

/**
* @slot - This is a default/unnamed slot to assign text content.
* *deprecated* please use _text_ property instead
*/
export abstract class BadgeBase extends LitElement {
	@property({ type: String, reflect: true })
  	connotation?: BadgeConnotation;

	@property({ type: String, reflect: true })
  	shape?: BadgeShape;

	@property({ type: String, reflect: true })
  	layout?: BadgeLayout;

	@property({ type: Boolean, reflect: true })
  	dense = false;

	@property({ type: Boolean, reflect: true })
  	enlarged = false;

	@property({ type: String, reflect: true })
  	text?: string;

	@property({ type: String, reflect: true })
  	icon?: string;

	@property({ type: String, reflect: true })
  	iconTrailing?: string;

	protected renderIcon(
  	type: string,
  	isTrailingIcon = false,
	): TemplateResult | typeof nothing {
  	const classes = {
  		'icon--leading': !isTrailingIcon,
  		'icon--trailing': isTrailingIcon,
  	};

  	return type
  		? html`<div class="icon ${classMap(classes)}">
										<vwc-icon .type="${type}"></vwc-icon>
								</div>`
  		: nothing;
	}

	protected getRenderClasses(): ClassInfo {
  	return {
  		[`connotation-${this.connotation}`]: !!this.connotation,
  		[`layout-${this.layout}`]: !!this.layout,
  	};
	}

	protected override render(): TemplateResult {
  	return html` <span class="badge ${classMap(this.getRenderClasses())}">
						${this.icon ? this.renderIcon(this.icon) : ''} ${this.text || nothing}
						${this.iconTrailing ? this.renderIcon(this.iconTrailing, true) : ''}
				</span>`;
	}
}
