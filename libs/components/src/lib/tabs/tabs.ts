import { observable } from '@microsoft/fast-element';
import { Tabs as FoundationTabs } from '@microsoft/fast-foundation';

const TABS_ACTIVE_INDICATOR_INLINE_SIZE = "--_tabs-active-indicator-inline-size";

/**
 * Base class for tabs
 *
 * @public
 */
export class Tabs extends FoundationTabs {
	@observable tablist?: HTMLElement;

	override orientationChanged(): void {
		super.orientationChanged();
		this.patchIndicatorStyleTransition();
		if (this.orientation === "vertical") {
			this.activeIndicatorRef?.style.removeProperty(TABS_ACTIVE_INDICATOR_INLINE_SIZE);
		}
	}

	override activeidChanged(oldValue: string, newValue: string): void {
		super.activeidChanged(oldValue, newValue);
		this.patchIndicatorStyleTransition();
	}

	override tabsChanged(): void {
		super.tabsChanged();
		this.patchIndicatorStyleTransition();
	}

	override tabpanelsChanged(): void {
		super.tabpanelsChanged();
		this.patchIndicatorStyleTransition();
	}

	private patchIndicatorStyleTransition() {
		if (this.orientation === 'vertical') return;
		const width = this.activetab?.getClientRects()[0]?.width;
		if (!width) return;
		const tablistGutter = this.tablist?.style.getPropertyValue('--_tabs-tablist-gutter');
		if (!tablistGutter) return;

    this.activeIndicatorRef?.style.setProperty(TABS_ACTIVE_INDICATOR_INLINE_SIZE, `${Number(width) + Number(tablistGutter)}px`);
  }
}
