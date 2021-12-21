import { FoundationElement } from '@microsoft/fast-foundation';
import { attr, observable } from '@microsoft/fast-element';
import { identity, memoizeWith } from 'ramda';

const BASE_URL = 'https://icon.resources.vonage.com'; // namespaced as 3f7739a0-a898-4f69-a82b-ad9d743170b6 on icons.resources.vonage.com
const ICON_SET_VERSION = '4.0.16';
// const PLACEHOLDER_ICON = '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><style>@keyframes rotation { from { transform: rotate(0deg) } to { transform: rotate(360deg) } } g#circle { transform-origin: center center; animation: 1s rotation 0s linear infinite; } path { fill: currentColor }</style> <g id="circle"> <path d="M7.5 2C3.91014 2 1 4.91014 1 8.5C1 12.0899 3.91014 15 7.5 15C11.0899 15 14 12.0899 14 8.5C14 8.22386 14.2239 8 14.5 8C14.7761 8 15 8.22386 15 8.5C15 12.6421 11.6421 16 7.5 16C3.35786 16 0 12.6421 0 8.5C0 4.35786 3.35786 1 7.5 1C10.3622 1 12.7088 2.78366 13.9478 5.27753C14.0706 5.52484 13.9698 5.82492 13.7225 5.94778C13.4752 6.07065 13.1751 5.96977 13.0522 5.72247C11.9472 3.49834 9.90985 2 7.5 2Z"/><path d="M13.5 0C13.7761 0 14 0.223858 14 0.5V5.5C14 5.77614 13.7761 6 13.5 6H8.5C8.22386 6 8 5.77614 8 5.5C8 5.22386 8.22386 5 8.5 5H13V0.5C13 0.223858 13.2239 0 13.5 0Z"/></g></svg>';
const PLACEHOLDER_ICON = '<svg xmlns="http://www.w3.org/2000/svg" width="80%" height="80%" viewBox="0 0 38 38" stroke="currentColor"><g fill="none" fill-rule="evenodd"><g transform="translate(1 1)" stroke-width="2"><circle stroke-opacity=".5" cx="18" cy="18" r="18"/><path d="M36 18c0-9.94-8.06-18-18-18"><animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="1s" repeatCount="indefinite"/></path></g></g></svg>';

// const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
const baseUrlTemplate = (resource: string, version: string) => [BASE_URL, `v${version}`, resource].join('/');

const resolveIcon = memoizeWith(identity as () => string, (iconId = '') => (iconId.trim()
	? fetch(baseUrlTemplate([iconId, 'svg'].join('.'), ICON_SET_VERSION))
		.then(
			(res) => (res.headers.get('content-type') === 'image/svg+xml' ? res.text() : ''),
		)
	: Promise.resolve(''))) as (iconId?: string) => Promise<string>;

export class Icon extends FoundationElement {
	@observable svgReady: boolean = false;

	@observable svg: any = null;

	/**
     * Indicates the icon's type.
     *
     * @public
     * @remarks
     * HTML Attribute: type
     */
	@attr type?: string;

	async typeChanged(oldValue: string, newValue: string) {
		if (oldValue === newValue) { return; }

		this.svg = null;
		this.svgReady = false;

		this.svg = await resolveIcon(this.type);
		this.svgReady = true;
	}

	get placeholderSvg() {
		return PLACEHOLDER_ICON;
	}
}
