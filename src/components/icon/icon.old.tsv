import {
	LitElement, html, CSSResult, TemplateResult,
} from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import type { ClassInfo } from 'lit/directives/class-map.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import { until } from 'lit/directives/until.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { memoizeWith, identity, always } from 'ramda';
import { ariaProperty } from '@material/mwc-base/aria-property.js';
import type { IconSize, Connotation } from '../../core/foundation/enums.js';
import { style } from './icon.css.js';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-icon': VWCIcon;
	}
}

// noinspection CssUnresolvedCustomProperty
const BASE_URL = 'https://icon.resources.vonage.com'; // namespaced as 3f7739a0-a898-4f69-a82b-ad9d743170b6 on icons.resources.vonage.com
const ICON_SET_VERSION = '4.0.16';
const PLACEHOLDER_ICON = '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><style>@keyframes rotation { from { transform: rotate(0deg) } to { transform: rotate(360deg) } } g#circle { transform-origin: center center; animation: 1s rotation 0s linear infinite; } path { fill: currentColor }</style> <g id="circle"> <path d="M7.5 2C3.91014 2 1 4.91014 1 8.5C1 12.0899 3.91014 15 7.5 15C11.0899 15 14 12.0899 14 8.5C14 8.22386 14.2239 8 14.5 8C14.7761 8 15 8.22386 15 8.5C15 12.6421 11.6421 16 7.5 16C3.35786 16 0 12.6421 0 8.5C0 4.35786 3.35786 1 7.5 1C10.3622 1 12.7088 2.78366 13.9478 5.27753C14.0706 5.52484 13.9698 5.82492 13.7225 5.94778C13.4752 6.07065 13.1751 5.96977 13.0522 5.72247C11.9472 3.49834 9.90985 2 7.5 2Z"/><path d="M13.5 0C13.7761 0 14 0.223858 14 0.5V5.5C14 5.77614 13.7761 6 13.5 6H8.5C8.22386 6 8 5.77614 8 5.5C8 5.22386 8.22386 5 8.5 5H13V0.5C13 0.223858 13.2239 0 13.5 0Z"/></g></svg>';
// Start displaying placeholder if waiting more than this period of time
const PLACEHOLDER_DELAY = 500;
// Stop displaying placeholder if exceeding this period of time
// (will also stop one an icon is loaded)
const PLACEHOLDER_TIMEOUT = 2000;

// eslint-disable-next-line no-promise-executor-return
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
const baseUrlTemplate = (resource: string, version: string) => [BASE_URL, `v${version}`, resource].join('/');

const resolveIcon = memoizeWith(identity as () => string, (iconId = '') => (iconId.trim()
	? fetch(baseUrlTemplate([iconId, 'svg'].join('.'), ICON_SET_VERSION))
		.then(
			(res) => (res.headers.get('content-type') === 'image/svg+xml' ? res.text() : ''),
		)
	: Promise.resolve(''))) as (iconId?: string) => Promise<string>;

const setSvgAttribute = (name: string, value: string) => (svgText = '') => svgText.replace(/<svg[^>]*>/, (tagText) => tagText.replace(/<svg[^>]+/, (attributesText) => attributesText
	.split(' ')
	.concat([name, value].filter(Boolean)
		.join('='))
	.join(' ')));

type IconConnotation = Extract<Connotation,
| Connotation.Primary
| Connotation.CTA
| Connotation.Announcement
| Connotation.Success
| Connotation.Alert
| Connotation.Info>;

@customElement('vwc-icon')
export class VWCIcon extends LitElement {
	@property({
		type: String,
		reflect: true,
	})
		connotation?: IconConnotation;

	@property({
		attribute: true,
		type: String,
		reflect: true,
	})
		type?: string;

	@property({
		attribute: true,
		type: Boolean,
		reflect: true,
	})
		inline?: boolean;

	@property({
		attribute: true,
		type: String,
		reflect: true,
	})
		size?: IconSize;

	@ariaProperty
	@property({
		attribute: 'aria-label',
		type: String,
	})
	override ariaLabel = '';

	static override get styles(): CSSResult {
		return style;
	}

	override render(): TemplateResult {
		return html`
            <figure
                    class="icon ${classMap(this.getRenderClasses())}"
                    aria-label="${ifDefined(this.ariaLabel)}"
            >
                ${until(
		resolveIcon(this.type)
			.then(setSvgAttribute('aria-hidden', 'true'))
			.then(unsafeSVG),
		delay(PLACEHOLDER_TIMEOUT),
		delay(PLACEHOLDER_DELAY)
			.then(always(unsafeSVG(PLACEHOLDER_ICON))),
	)}
            </figure>`;
	}

	protected getRenderClasses(): ClassInfo {
		return {
			[`connotation-${this.connotation}`]: !!this.connotation,
		};
	}
}
