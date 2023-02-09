import { observable } from '@microsoft/fast-element';
import { Tabs as FoundationTabs, TabsOrientation } from '@microsoft/fast-foundation';


export const ACTIVE_TAB_WIDTH = '--_tabs-active-tab-inline-size';

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
		if (!this.activeIndicatorRef) return;
		if (this.orientation === TabsOrientation.vertical) {
			this.activeIndicatorRef.style.removeProperty(ACTIVE_TAB_WIDTH);
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
		if (!this.activetab || !this.activeIndicatorRef) return;
		if (this.orientation === TabsOrientation.vertical || !this.showActiveIndicator) return;
		const width = this.activetab.getBoundingClientRect().width;
		this.activeIndicatorRef.style.setProperty(ACTIVE_TAB_WIDTH, `${width}px`);
	}
}
