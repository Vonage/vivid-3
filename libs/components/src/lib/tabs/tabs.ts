import { attr, observable } from '@microsoft/fast-element';
import {
	Tabs as FoundationTabs,
	TabsOrientation,
} from '@microsoft/fast-foundation';
import type { Connotation, TabsGutters } from '../enums.js';

export const ACTIVE_TAB_WIDTH = '--_tabs-active-tab-inline-size';

/**
 * Types of tabs connotation.
 *
 * @public
 */
export type TabsConnotation = Extract<
	Connotation,
	Connotation.Accent | Connotation.CTA
>;

export type Gutters = Extract<
	TabsGutters,
	TabsGutters.Small | TabsGutters.None
>;

/**
 * @public
 * @component tabs
 * @slot - Default slot.
 * @event {CustomEvent<HTMLElement>} change - Fires a custom 'change' event when a tab is clicked or during keyboard navigation
 */
export class Tabs extends FoundationTabs {
	@observable tablist?: HTMLElement;

	/**
	 * The connotation the tabs should have.
	 *
	 * @public
	 * HTML Attribute: connotation
	 */
	@attr connotation?: TabsConnotation;

	/**
	 * sets the initial preferred margin from predefined available options
	 *
	 * @public
	 */
	@attr gutters?: Gutters;

	/**
	 * sets overflow to the tab-panel
	 *
	 * @public
	 */
	@attr({ mode: 'boolean', attribute: 'scrollable-panel' }) scrollablePanel =
		false;

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
	}

	override activeidChanged(oldValue: string, newValue: string): void {
		super.activeidChanged(oldValue, newValue);
		this.patchIndicatorStyleTransition();
		this.#updateTabsConnotation();
		this.#scrollToIndex((this as any).activeTabIndex);
	}

	override tabsChanged(): void {
		super.tabsChanged();
		this.patchIndicatorStyleTransition();
		this.#updateScrollStatus();
	}

	#updateScrollStatus() {
		this.tablist!.parentElement!.dispatchEvent!(new Event('scroll'));
	}

	override tabpanelsChanged(): void {
		super.tabpanelsChanged();
		this.patchIndicatorStyleTransition();
	}

	patchIndicatorStyleTransition() {
		if (!this.activetab || !this.activeIndicatorRef) return;
		if (
			this.orientation === TabsOrientation.vertical ||
			!this.showActiveIndicator
		)
			return;
		const width = this.activetab.getBoundingClientRect().width;
		this.activeIndicatorRef.style.setProperty(ACTIVE_TAB_WIDTH, `${width}px`);
	}

	override connectedCallback() {
		super.connectedCallback();
		requestAnimationFrame(() => this.#updateScrollStatus());

		const scrollWrapper = this.tablist!.parentElement as HTMLElement;
		this.#resizeObserver = new ResizeObserver(() => {
			this.#updateScrollStatus();
			this.patchIndicatorStyleTransition();
		});

		this.#resizeObserver!.observe(scrollWrapper);
	}

	#resizeObserver?: ResizeObserver;

	override disconnectedCallback() {
		super.disconnectedCallback();
		this.#resizeObserver!.disconnect();
	}

	#updateTabsConnotation() {
		if (this.tabs) {
			this.tabs.forEach((tab) => {
				if (tab.getAttribute('aria-selected') === 'true') {
					tab.setAttribute('connotation', this.connotation as string);
				} else {
					tab.removeAttribute('connotation');
				}
			});
		}
	}

	get #tabListWrapper() {
		return this.shadowRoot!.querySelector('.tablist-wrapper') as HTMLElement;
	}

	#scrollToIndex(index: number) {
		const tab = this.tabs?.[index];
		if (!tab) return;
		let left = 0;
		let top = 0;
		if (this.orientation === TabsOrientation.vertical) {
			if (index === this.tabs.length - 1) {
				top = this.#tabListWrapper.scrollHeight;
			}
			if (index > 0 && index < this.tabs.length - 1) {
				top =
					tab.offsetTop -
					this.#tabListWrapper.offsetHeight / 2 +
					tab.offsetHeight / 2;
			}
		} else {
			if (index === this.tabs.length - 1) {
				left = this.#tabListWrapper.scrollWidth;
			}
			if (index > 0 && index < this.tabs.length - 1) {
				left =
					tab.offsetLeft -
					this.#tabListWrapper.offsetWidth / 2 +
					tab.offsetWidth / 2;
			}
		}

		this.#tabListWrapper.scrollTo({ top, left, behavior: 'smooth' });
	}

	/**
	 * @internal
	 */
	@observable _actionItemsSlottedContent: HTMLElement[] = [];

	constructor() {
		super();

		// Patch FAST methods
		(this as any).handleActiveIndicatorPosition = () =>
			this.#handleActiveIndicatorPosition();
		(this as any).animateActiveIndicator = () => this.#animateActiveIndicator();
	}

	#getGridProperty() {
		return (this as any).isHorizontal() ? 'gridColumn' : 'gridRow';
	}

	#getTranslateProperty() {
		return (this as any).isHorizontal() ? 'translateX' : 'translateY';
	}

	#handleActiveIndicatorPosition() {
		if (this.showActiveIndicator && this.activeindicator) {
			(this as any).animateActiveIndicator();
		}
	}

	#animateActiveIndicator() {
		const offsetProperty = (this as any).isHorizontal()
			? 'offsetLeft'
			: 'offsetTop';

		const currentOffset = this.activeIndicatorRef[offsetProperty];
		const currentGridValue =
			this.activeIndicatorRef.style[this.#getGridProperty()];

		// Temporary move indicator to measure target offset
		this.activeIndicatorRef.style[this.#getGridProperty()] = `${
			(this as any).activeTabIndex + 1
		}`;
		const targetOffset = this.activeIndicatorRef[offsetProperty];
		this.activeIndicatorRef.style[this.#getGridProperty()] = currentGridValue;

		const relativeOffset = targetOffset - currentOffset;
		this.activeIndicatorRef.style.transform = `${this.#getTranslateProperty()}(${relativeOffset}px)`;
		this.activeIndicatorRef.classList.add('activeIndicatorTransition');
	}

	/**
	 * @internal
	 */
	activeIndicatorRefChanged() {
		this.activeIndicatorRef.addEventListener('transitionend', () => {
			// Move indicator onto the active tab
			this.activeIndicatorRef.style[this.#getGridProperty()] = `${
				(this as any).activeTabIndex + 1
			}`;
			this.activeIndicatorRef.style.transform = `${this.#getTranslateProperty()}(0px)`;

			this.activeIndicatorRef.classList.remove('activeIndicatorTransition');
		});
	}
}
