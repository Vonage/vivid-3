import { FoundationElement } from '@microsoft/fast-foundation';
import { attr, observable } from '@microsoft/fast-element';
import { identity, memoizeWith } from 'ramda';
import type { Connotation, IconSize } from '../../core/foundation/enums';

const BASE_URL = 'https://icon.resources.vonage.com'; // namespaced as 3f7739a0-a898-4f69-a82b-ad9d743170b6 on icons.resources.vonage.com
const ICON_SET_VERSION = '4.0.16';
const PLACEHOLDER_ICON = '<svg width="80%" height="80%" viewBox="0 0 64 64"><g><g stroke-width="6" stroke-linecap="round" fill="none"><path stroke="currentColor" d="M4,32 c0,15,12,28,28,28c8,0,16-4,21-9"></path><path d="M60,32 C60,16,47.464,4,32,4S4,16,4,32"></path><animateTransform values="0,32,32;360,32,32" attributeName="transform" type="rotate" repeatCount="indefinite" dur="750ms"></animateTransform></g></g></svg>';
// Start displaying placeholder if waiting more than this period of time
const PLACEHOLDER_DELAY = 500;
// Stop displaying placeholder if exceeding this period of time
// (will also stop one an icon is loaded)
const PLACEHOLDER_TIMEOUT = 2000;

// const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
const baseUrlTemplate = (resource: string, version: string) => [BASE_URL, `v${version}`, resource].join('/');

const assertIsValidResponse = ({ ok, headers }: Response) => {
	if (!ok || headers.get('content-type') !== 'image/svg+xml') {
		throw new Error('Something went wrong');
	}
};

const extractSvg = (response: Response) => {
	assertIsValidResponse(response);
	return response.text();
};

const loadSvg = (iconId: string) => fetch(baseUrlTemplate([iconId, 'svg'].join('.'), ICON_SET_VERSION))
	.then(extractSvg);

const resolveIcon = memoizeWith(identity as () => string, (iconId = '') => (iconId.trim()
	? loadSvg(iconId)
	: Promise.resolve(''))) as (iconId?: string) => Promise<string>;

type IconConnotation = Extract<Connotation,
| Connotation.Primary
| Connotation.CTA
| Connotation.Announcement
| Connotation.Success
| Connotation.Alert
| Connotation.Info>;

export class Icon extends FoundationElement {
	@attr connotation?: IconConnotation;

	@attr size?: IconSize;

	@observable state: 'idle' | 'loading' | 'loaded' | 'fail' = 'idle';

	@observable svg: any = null;

	@observable placeholder: any = null;

	/**
     * Indicates which icon to resolve.
     *
     * @public
     * @remarks
     * HTML Attribute: type
     */
	@attr type?: string;

	async typeChanged() {
		this.state = 'loading';
		this.svg = null;
		this.placeholder = null;

		let timeout = setTimeout(() => {
			this.placeholder = PLACEHOLDER_ICON;
			timeout = setTimeout(() => {
				this.placeholder = null;
			}, PLACEHOLDER_TIMEOUT);
		}, PLACEHOLDER_DELAY);

		await resolveIcon(this.type)
			.then((svg) => {
				this.svg = svg;
				this.state = 'loaded';
			})
			.catch(() => {
				this.state = 'fail';
			}).finally(() => { clearTimeout(timeout); });
	}
}
