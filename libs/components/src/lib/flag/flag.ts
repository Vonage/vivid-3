import { attr, observable } from '@microsoft/fast-element';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';
import { PLACEHOLDER_ICON } from '../../shared/icon/icon-placeholder';
import { resolveIcon } from '../../shared/icon/utils';
import { numberConverter } from '../../shared/utils/numberConverter';
import { getFlagIconName } from '../country/utils';

// Start displaying placeholder if waiting more than this period of time
const PLACEHOLDER_DELAY = 500;
// Stop displaying placeholder if exceeding this period of time
// (will also stop one a flag is loaded)
const PLACEHOLDER_TIMEOUT = 2000;

/**
 * @public
 * @component flag
 * @testQuery code code
 */
export class Flag extends VividElement {
	/**
	 * ISO 3166-1 alpha-2 country code (e.g. "GB", "UK", "US"). When set, the component shows the
	 * matching flag (from the Vivid/Vonage icon set).
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: code
	 */
	@attr code?: string;

	/**
	 * Provides a (screen reader only) descriptive label for the flag.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: label
	 */
	@attr label?: string;

	/**
	 * Controls the rendered size. Uses the same scale and behavior as `Icon.size`.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: size
	 */
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

	/** @internal */
	@observable flagLoaded = false;

	#currentRequestId = 0;
	#abortController: AbortController | null = null;

	/**
	 * @internal
	 */
	async codeChanged() {
		const requestId = ++this.#currentRequestId;

		if (this.#abortController) {
			this.#abortController.abort();
		}
		this.#abortController = new AbortController();

		const iconName = getFlagIconName(this.code);
		if (!iconName) {
			this._svg = '';
			this.flagLoaded = true;
			return;
		}

		this._svg = undefined;
		this.flagLoaded = false;

		let timeout = setTimeout(() => {
			/* v8 ignore else -- @preserve */
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
			const svg = await resolveIcon(iconName, this.#abortController.signal);
			/* v8 ignore else -- @preserve */
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
				this.flagLoaded = true;
			}
		}
	}
}

export { Flag as VwcFlagElement };
