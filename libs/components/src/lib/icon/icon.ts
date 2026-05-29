import { attr, observable } from '@microsoft/fast-element';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';
import { PLACEHOLDER_ICON } from '../../shared/icon/icon-placeholder';
import { resolveIcon } from '../../shared/icon/utils';
import type { ExtractFromEnum } from '../../shared/utils/enums';
import { numberConverter } from '../../shared/utils/numberConverter';
import type { Connotation } from '../enums';

// Start displaying placeholder if waiting more than this period of time
const PLACEHOLDER_DELAY = 500;
// Stop displaying placeholder if exceeding this period of time
// (will also stop one an icon is loaded)
const PLACEHOLDER_TIMEOUT = 2000;

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
	/** @internal */
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
	 * Indicates which icon to resolve. See the Vivid Icon Gallery for available icons:
	 * https://icons.vivid.vonage.com/
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: name
	 */
	@attr name?: string;

	#abortController: AbortController | null = null;

	/**
	 * @internal
	 */
	async nameChanged() {
		const requestId = ++this.#currentRequestId;

		if (this.#abortController) {
			this.#abortController.abort();
		}
		this.#abortController = new AbortController();

		this._svg = undefined;
		this.iconLoaded = false;

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
			const svg = await resolveIcon(this.name, this.#abortController.signal);
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
				this.iconLoaded = true;
			}
		}
	}
}
