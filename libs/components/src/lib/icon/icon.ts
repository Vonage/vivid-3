import { attr, observable, volatile } from '@microsoft/fast-element';
import {
	ICONS_BASE_URL as BASE_URL,
	ICONS_VERSION as ICON_SET_VERSION,
} from '@repo/consts';
import type { Connotation } from '../enums';
import { numberConverter } from '../../shared/utils/numberConverter';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';
import type { ExtractFromEnum } from '../../shared/utils/enums';
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
	fetch(baseUrlTemplate(`${iconId}.svg`, ICON_SET_VERSION), { signal }).then(
		extractSvg
	);

const normalizeKey = (iconId: string | undefined) => (iconId ?? '').trim();

type CacheEntry = { promise: Promise<string>; signal?: AbortSignal };
const iconCache = new Map<string, CacheEntry>();

export const resolveIcon = (
	iconId: string | undefined,
	signal: AbortSignal
): Promise<string> => {
	const key = normalizeKey(iconId);
	if (!key) return Promise.resolve('');

	const cached = iconCache.get(key);
	if (cached && !cached.signal?.aborted) {
		return cached.promise;
	}

	const promise = loadSvg(key, signal)
		.then((svg) => {
			// Delete aborted entries from cache, keep successful ones
			const entry = iconCache.get(key);
			if (entry && entry.promise === promise && signal.aborted) {
				iconCache.delete(key);
				throw signal.reason ?? new DOMException('Aborted', 'AbortError');
			}
			return svg;
		})
		.catch((err) => {
			// Remove aborted or failed fetches from cache
			const entry = iconCache.get(key);
			if (entry && entry.promise === promise) {
				iconCache.delete(key);
			}
			throw err;
		});

	iconCache.set(key, { promise, signal });
	return promise;
};

/**
 * Types of icon connotation.
 *
 * @public
 */
export type IconConnotation = ExtractFromEnum<
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
 * @testQuery name name
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
	#currentRequestId = 0;

	/**
	 * Provides a (screen reader only) descriptive label for the icon.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: name
	 */
	@attr label?: string;

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
		const key = normalizeKey(this.name);
		return key ? baseUrlTemplate(`${key}.svg`, ICON_SET_VERSION) : this._svg;
	}

	#abortController: AbortController | null = null;

	async nameChanged() {
		const requestId = ++this.#currentRequestId;

		if (this.#abortController) {
			this.#abortController.abort();
		}
		this.#abortController = new AbortController();

		this._svg = undefined;
		this.iconLoaded = false;

		let timeout = setTimeout(() => {
			if (this.#currentRequestId === requestId) {
				this._svg = PLACEHOLDER_ICON;
				timeout = setTimeout(() => {
					/* v8 ignore else -- @preserve */
					if (
						this.#currentRequestId === requestId &&
						this._svg === PLACEHOLDER_ICON
					) {
						this._svg = undefined;
					}
				}, PLACEHOLDER_TIMEOUT);
			}
		}, PLACEHOLDER_DELAY);

		try {
			const svg = await resolveIcon(this.name, this.#abortController.signal);
			if (this.#currentRequestId === requestId) {
				this._svg = svg;
			}
		} catch {
			if (this.#currentRequestId === requestId) {
				this._svg = undefined;
			}
		} finally {
			if (this.#currentRequestId === requestId) {
				clearTimeout(timeout);
				this.iconLoaded = true;
			}
		}
	}
}
