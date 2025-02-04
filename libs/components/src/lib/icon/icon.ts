import { attr, observable, volatile } from '@microsoft/fast-element';
import { identity, memoizeWith } from 'ramda';
import {
	ICONS_BASE_URL as BASE_URL,
	ICONS_VERSION as ICON_SET_VERSION,
} from '@vonage/vwc-consts';
import type { Connotation } from '../enums';
import { numberConverter } from '../../shared/utils/numberConverter';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';
import { PLACEHOLDER_ICON } from './icon.placeholder';

// Start displaying placeholder if waiting more than this period of time
const PLACEHOLDER_DELAY = 500;
// Stop displaying placeholder if exceeding this period of time
// (will also stop one an icon is loaded)
const PLACEHOLDER_TIMEOUT = 2000;

const baseUrlTemplate = (resource: string, version: string) =>
	[BASE_URL, `v${version}`, resource].join('/');

const assertIsValidResponse = ({ ok, headers }: Response) => {	
	if (!ok || headers.get('content-type') !== 'image/svg+xml') {
		throw new Error('Something went wrong');
	}
};

const extractSvg = (response: Response) => {
	assertIsValidResponse(response);
	return response.text();
};

const loadSvg = (iconId: string, signal: AbortSignal) =>
	fetch(baseUrlTemplate([iconId, 'svg'].join('.'), ICON_SET_VERSION), {
		signal,
	}).then(extractSvg);

const resolveIcon = memoizeWith(
	identity as () => string,
	(iconId, signal: AbortSignal) =>
		iconId.trim() ? loadSvg(iconId, signal) : Promise.resolve('')
) as (iconId: string, signal: AbortSignal) => Promise<string>;

/**
 * Types of icon connotation.
 *
 * @public
 */
export type IconConnotation = Extract<
	Connotation,
	| Connotation.Accent
	| Connotation.CTA
	| Connotation.Success
	| Connotation.Alert
	| Connotation.Warning
	| Connotation.Information
	| Connotation.Announcement
>;

/**
 * @public
 * @component icon
 * @slot - Default slot.
 */
export class Icon extends VividElement {
	/**
	 * The connotation the icon should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: connotation
	 */
	@attr connotation?: IconConnotation;

	@attr({ converter: numberConverter }) size?:
		| -6
		| -5
		| -4
		| -3
		| -2
		| -1
		| 0
		| 1
		| 2
		| 3
		| 4
		| 5;

	/**
	 * @internal
	 */
	@observable _svg?: string;
	@observable iconLoaded = false;
	/**
	 * Indicates which icon to resolve.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: name
	 */
	@attr name?: string;

	@volatile
	get iconUrl() {
		return !this.name
			? this._svg
			: baseUrlTemplate(`${this.name}.svg`, ICON_SET_VERSION);
	}

	#abortController: AbortController | null = null;

	async nameChanged() {
		if (this.#abortController) {
			this.#abortController.abort();
		}
		this.#abortController = new AbortController();
		this._svg = undefined;
		this.iconLoaded = false;

		let timeout = setTimeout(() => {
			this._svg = PLACEHOLDER_ICON;
			timeout = setTimeout(() => {
				if (this._svg === PLACEHOLDER_ICON) {
					this._svg = undefined;
				}
			}, PLACEHOLDER_TIMEOUT);
		}, PLACEHOLDER_DELAY);

		await resolveIcon(this.name ? this.name : '', this.#abortController.signal)
			.then((svg) => {
				this._svg = svg;
			})
			.catch(() => {
				this._svg = undefined;
			})
			.finally(() => {
				clearTimeout(timeout);
				this.iconLoaded = true;
			});
	}
}
