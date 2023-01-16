import { attr } from '@microsoft/fast-element';
import { applyMixins, Tab as FoundationTab } from '@microsoft/fast-foundation';
import { AffixIcon, AffixIconWithTrailing } from '../../shared/patterns/affix';

/**
 * Base class for tab
 *
 * @public
 */
export class Tab extends FoundationTab {
	/**
	 * Indicates the tab's label.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: label
	 */
	@attr label?: string;

	@attr({ mode: 'fromView' }) override tabIndex: any = '-1';

	@attr({ attribute: 'aria-selected' }) override ariaSelected: string | null = null;
}

export interface Tab extends AffixIconWithTrailing { }
applyMixins(Tab, AffixIcon);
