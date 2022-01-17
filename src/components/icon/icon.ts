import { FoundationElement } from '@microsoft/fast-foundation';
import { attr, observable } from '@microsoft/fast-element';
import { identity, memoizeWith } from 'ramda';
import type { Connotation, Size } from '../../core/foundation/enums';
import { PLACEHOLDER_ICON } from './icon.placeholder';
const BASE_URL = 'https://icon.resources.vonage.com'; // namespaced as 3f7739a0-a898-4f69-a82b-ad9d743170b6 on icons.resources.vonage.com
const ICON_SET_VERSION = '4.0.16';

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

	@attr size?: Size;

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
