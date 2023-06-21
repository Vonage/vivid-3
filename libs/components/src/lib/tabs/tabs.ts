import { attr, observable } from '@microsoft/fast-element';
import { Tabs as FoundationTabs, TabsOrientation } from '@microsoft/fast-foundation';
import type { Connotation } from '../enums.js';

export const ACTIVE_TAB_WIDTH = '--_tabs-active-tab-inline-size';

/**
 * Types of tabs connotation.
 *
 * @public
 */
export type TabsConnotation = Extract<Connotation,
| Connotation.Accent
| Connotation.CTA>;

/**
 * Base class for tabs
 *
 * @public
 * @slot - Default slot.
 */
export class Tabs extends FoundationTabs {

	@observable tablist?: HTMLElement;

	/**
	 * The connotation the tabs should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: connotation
	 */
	@attr connotation?: TabsConnotation;
	connotationChanged() {
		this.#updateTabsConnotation();
	}

	override orientationChanged(): void {
		super.orientationChanged();
		this.patchIndicatorStyleTransition();
		if (!this.activeIndicatorRef) return;
		if (this.orientation === TabsOrientation.vertical) {
			this.activeIndicatorRef.style.removeProperty(ACTIVE_TAB_WIDTH);
		}
		this.#patchActiveID();
		this.#connotationClass();
	}

	override activeidChanged(oldValue: string, newValue: string): void {
		super.activeidChanged(oldValue, newValue);
		this.patchIndicatorStyleTransition();
		this.#patchActiveID();
		this.#connotationClass();
	}

	override tabsChanged(): void {
		super.tabsChanged();
		this.patchIndicatorStyleTransition();
		this.#patchActiveID();
		this.#connotationClass();
	}

	override tabpanelsChanged(): void {
		super.tabpanelsChanged();
		this.patchIndicatorStyleTransition();
		this.#patchActiveID();
		this.#connotationClass();
	}

	patchIndicatorStyleTransition() {
		if (!this.activetab || !this.activeIndicatorRef) return;
		if (this.orientation === TabsOrientation.vertical || !this.showActiveIndicator) return;
		const width = this.activetab.getBoundingClientRect().width;
		this.activeIndicatorRef.style.setProperty(ACTIVE_TAB_WIDTH, `${width}px`);
	}

	#updateTabsConnotation() {
		if (this.tabs) {
			this.tabs.forEach(tab => {
				if (tab.getAttribute('aria-selected') === 'true') {
					tab.setAttribute('connotation', this.connotation as string);
				} else {
					tab.removeAttribute('connotation');
				}
			});
		}
	}

	// adapted FAST fix https://github.com/microsoft/fast/pull/6606
	#patchActiveID() {
		if (!this.activetab) return;

		const idx = this.tabs.indexOf(this.activetab);
		this.activeid = this['tabIds'][idx];
		this.#updateTabsConnotation();
	}

	#connotationClass() {
		this.tabs?.forEach(tab => {
			if (tab.getAttribute('aria-selected') === 'true') {
				tab.setAttribute('connotation', this.connotation as string);
			} else {
				tab.removeAttribute('connotation');
			}
		});
	}
}
