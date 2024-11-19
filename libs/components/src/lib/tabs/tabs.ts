import { attr, observable } from '@microsoft/fast-element';
import { FoundationElement, TabsOrientation } from '@microsoft/fast-foundation';
import {
	keyArrowDown,
	keyArrowUp,
	keyEnd,
	keyHome,
	limit,
	uniqueId,
} from '@microsoft/fast-web-utilities';
import {
	keyArrowLeft,
	keyArrowRight,
} from '@microsoft/fast-web-utilities/dist/key-codes';
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
export class Tabs extends FoundationElement {
	/**
	 * The orientation
	 * @public
	 * @remarks
	 * HTML Attribute: orientation
	 */
	@attr
	// eslint-disable-next-line @nrwl/nx/workspace/no-attribute-default-value
	orientation: TabsOrientation = TabsOrientation.horizontal;
	/**
	 * @internal
	 */
	orientationChanged(): void {
		if (this.$fastController.isConnected) {
			this.setTabs();
			this.setTabPanels();
			this.handleActiveIndicatorPosition();
		}

		this.patchIndicatorStyleTransition();
		if (!this.activeIndicatorRef) return;
		if (this.orientation === TabsOrientation.vertical) {
			this.activeIndicatorRef.style.removeProperty(ACTIVE_TAB_WIDTH);
		}
	}
	/**
	 * The id of the active tab
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: activeid
	 */
	@attr
	activeid!: string;
	/**
	 * @internal
	 */
	activeidChanged(oldValue: string, _: string): void {
		if (
			this.$fastController.isConnected &&
			this.tabs.length <= this.tabpanels.length
		) {
			this.prevActiveTabIndex = this.tabs.findIndex(
				(item: HTMLElement) => item.id === oldValue
			);
			this.setTabs();
			this.setTabPanels();
			this.handleActiveIndicatorPosition();
		}

		this.patchIndicatorStyleTransition();
		this.#updateTabsConnotation();
		this.#scrollToIndex(this.activeTabIndex);
	}

	/**
	 * @internal
	 */
	@observable
	tabs!: HTMLElement[];
	/**
	 * @internal
	 */
	tabsChanged(): void {
		if (
			this.$fastController.isConnected &&
			this.tabs.length <= this.tabpanels.length
		) {
			this.tabIds = this.getTabIds();
			this.tabpanelIds = this.getTabPanelIds();

			this.setTabs();
			this.setTabPanels();
			this.handleActiveIndicatorPosition();
		}

		this.patchIndicatorStyleTransition();
		this.#updateScrollStatus();
	}

	/**
	 * @internal
	 */
	@observable
	tabpanels!: HTMLElement[];
	/**
	 * @internal
	 */
	tabpanelsChanged(): void {
		if (
			this.$fastController.isConnected &&
			this.tabpanels.length <= this.tabs.length
		) {
			this.tabIds = this.getTabIds();
			this.tabpanelIds = this.getTabPanelIds();

			this.setTabs();
			this.setTabPanels();
			this.handleActiveIndicatorPosition();
		}

		this.patchIndicatorStyleTransition();
	}

	/**
	 * Whether or not to show the active indicator
	 * @public
	 * @remarks
	 * HTML Attribute: activeindicator
	 */
	@attr({ mode: 'boolean' })
	// eslint-disable-next-line @nrwl/nx/workspace/no-attribute-default-value
	activeindicator = true;

	/**
	 * @internal
	 */
	@observable
	activeIndicatorRef!: HTMLElement;

	/**
	 * @internal
	 */
	@observable
	showActiveIndicator = true;

	/**
	 * A reference to the active tab
	 * @public
	 */
	activetab!: HTMLElement;

	private prevActiveTabIndex = 0;
	private activeTabIndex = 0;
	private tabIds: Array<string> = [];
	private tabpanelIds: Array<string> = [];

	private change = (): void => {
		this.$emit('change', this.activetab);
	};

	private isDisabledElement = (el: Element): el is HTMLElement => {
		return el.getAttribute('aria-disabled') === 'true';
	};

	private isHiddenElement = (el: Element): el is HTMLElement => {
		return el.hasAttribute('hidden');
	};

	private isFocusableElement = (el: Element): el is HTMLElement => {
		return !this.isDisabledElement(el) && !this.isHiddenElement(el);
	};

	private getActiveIndex(): number {
		const id: string = this.activeid;
		if (id !== undefined) {
			return this.tabIds.indexOf(this.activeid) === -1
				? 0
				: this.tabIds.indexOf(this.activeid);
		} else {
			return 0;
		}
	}

	private setTabs = (): void => {
		const gridHorizontalProperty = 'gridColumn';
		const gridVerticalProperty = 'gridRow';
		const gridProperty = this.isHorizontal()
			? gridHorizontalProperty
			: gridVerticalProperty;

		this.activeTabIndex = this.getActiveIndex();
		this.showActiveIndicator = false;
		this.tabs.forEach((tab: HTMLElement, index: number) => {
			if (tab.slot === 'tab') {
				const isActiveTab =
					this.activeTabIndex === index && this.isFocusableElement(tab);
				if (this.activeindicator && this.isFocusableElement(tab)) {
					this.showActiveIndicator = true;
				}
				const tabId: string = this.tabIds[index];
				const tabpanelId: string = this.tabpanelIds[index];
				tab.setAttribute('id', tabId);
				tab.setAttribute('aria-selected', isActiveTab ? 'true' : 'false');
				tab.setAttribute('aria-controls', tabpanelId);
				tab.addEventListener('click', this.handleTabClick);
				tab.addEventListener('keydown', this.handleTabKeyDown);
				tab.setAttribute('tabindex', isActiveTab ? '0' : '-1');
				if (isActiveTab) {
					this.activetab = tab;
					this.activeid = tabId;
				}
			}

			// If the original property isn't emptied out,
			// the next set will morph into a grid-area style setting that is not what we want
			tab.style[gridHorizontalProperty] = '';
			tab.style[gridVerticalProperty] = '';
			tab.style[gridProperty] = `${index + 1}`;
			!this.isHorizontal()
				? tab.classList.add('vertical')
				: tab.classList.remove('vertical');
		});
	};

	private setTabPanels = (): void => {
		this.tabpanels.forEach((tabpanel: HTMLElement, index: number) => {
			const tabId: string = this.tabIds[index];
			const tabpanelId: string = this.tabpanelIds[index];
			tabpanel.setAttribute('id', tabpanelId);
			tabpanel.setAttribute('aria-labelledby', tabId);
			this.activeTabIndex !== index
				? tabpanel.setAttribute('hidden', '')
				: tabpanel.removeAttribute('hidden');
		});
	};

	private getTabIds(): Array<string> {
		return this.tabs.map((tab: HTMLElement) => {
			return tab.getAttribute('id') ?? `tab-${uniqueId()}`;
		});
	}

	private getTabPanelIds(): Array<string> {
		return this.tabpanels.map((tabPanel: HTMLElement) => {
			return tabPanel.getAttribute('id') ?? `panel-${uniqueId()}`;
		});
	}

	private setComponent(): void {
		if (this.activeTabIndex !== this.prevActiveTabIndex) {
			this.activeid = this.tabIds[this.activeTabIndex] as string;
			this.focusTab();
			this.change();
		}
	}

	private handleTabClick = (event: MouseEvent): void => {
		const selectedTab = event.currentTarget as HTMLElement;
		if (selectedTab.nodeType === 1 && this.isFocusableElement(selectedTab)) {
			this.prevActiveTabIndex = this.activeTabIndex;
			this.activeTabIndex = this.tabs.indexOf(selectedTab);
			this.setComponent();
		}
	};

	private isHorizontal(): boolean {
		return this.orientation === TabsOrientation.horizontal;
	}

	private handleTabKeyDown = (event: KeyboardEvent): void => {
		if (this.isHorizontal()) {
			switch (event.key) {
				case keyArrowLeft:
					event.preventDefault();
					this.adjustBackward(event);
					break;
				case keyArrowRight:
					event.preventDefault();
					this.adjustForward(event);
					break;
			}
		} else {
			switch (event.key) {
				case keyArrowUp:
					event.preventDefault();
					this.adjustBackward(event);
					break;
				case keyArrowDown:
					event.preventDefault();
					this.adjustForward(event);
					break;
			}
		}
		switch (event.key) {
			case keyHome:
				event.preventDefault();
				this.adjust(-this.activeTabIndex);
				break;
			case keyEnd:
				event.preventDefault();
				this.adjust(this.tabs.length - this.activeTabIndex - 1);
				break;
		}
	};

	/**
	 * The adjust method for FASTTabs
	 * @public
	 * @remarks
	 * This method allows the active index to be adjusted by numerical increments
	 */
	adjust(adjustment: number): void {
		const focusableTabs = this.tabs.filter((t) => this.isFocusableElement(t));
		const currentActiveTabIndex = focusableTabs.indexOf(this.activetab);

		const nextTabIndex = limit(
			0,
			focusableTabs.length - 1,
			currentActiveTabIndex + adjustment
		);

		// the index of the next focusable tab within the context of all available tabs
		const nextIndex = this.tabs.indexOf(focusableTabs[nextTabIndex]);

		if (nextIndex > -1) {
			this.moveToTabByIndex(this.tabs, nextIndex);
		}
	}

	private adjustForward = (_: KeyboardEvent): void => {
		this.#moveToNextTab(1);
	};

	private adjustBackward = (_: KeyboardEvent): void => {
		this.#moveToNextTab(-1);
	};

	#moveToNextTab(direction: 1 | -1) {
		const activeIndex = this.tabs.indexOf(this.activetab);

		for (let offset = 1; offset < this.tabs.length; offset++) {
			const index =
				(activeIndex + direction * offset + this.tabs.length) %
				this.tabs.length;

			if (this.isFocusableElement(this.tabs[index])) {
				this.moveToTabByIndex(this.tabs, index);
				break;
			}
		}
	}

	private moveToTabByIndex = (group: HTMLElement[], index: number) => {
		const tab: HTMLElement = group[index] as HTMLElement;
		this.activetab = tab;
		this.prevActiveTabIndex = this.activeTabIndex;
		this.activeTabIndex = index;
		tab.focus();
		this.setComponent();
	};

	private focusTab(): void {
		this.tabs[this.activeTabIndex].focus();
	}

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
	/**
	 * @internal
	 */
	connotationChanged() {
		this.#updateTabsConnotation();
	}

	#updateScrollStatus() {
		this.tablist!.parentElement!.dispatchEvent!(new Event('scroll'));
	}

	/**
	 * @internal
	 */
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

		this.tabIds = this.getTabIds();
		this.tabpanelIds = this.getTabPanelIds();
		this.activeTabIndex = this.getActiveIndex();

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

	#getGridProperty() {
		return this.isHorizontal() ? 'gridColumn' : 'gridRow';
	}

	#getTranslateProperty() {
		return this.isHorizontal() ? 'translateX' : 'translateY';
	}

	private handleActiveIndicatorPosition() {
		if (this.showActiveIndicator && this.activeindicator) {
			this.animateActiveIndicator();
		}
	}

	private animateActiveIndicator() {
		const offsetProperty = this.isHorizontal() ? 'offsetLeft' : 'offsetTop';

		const currentOffset = this.activeIndicatorRef[offsetProperty];
		const currentGridValue =
			this.activeIndicatorRef.style[this.#getGridProperty()];

		// Temporary move indicator to measure target offset
		this.activeIndicatorRef.style[this.#getGridProperty()] = `${
			this.activeTabIndex + 1
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
				this.activeTabIndex + 1
			}`;
			this.activeIndicatorRef.style.transform = `${this.#getTranslateProperty()}(0px)`;

			this.activeIndicatorRef.classList.remove('activeIndicatorTransition');
		});
	}
}
