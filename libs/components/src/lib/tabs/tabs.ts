import { attr, DOM, observable } from '@microsoft/fast-element';
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
import type { Connotation } from '../enums.js';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';
import type { ExtractFromEnum } from '../../shared/utils/enums';
import { Tab } from '../tab/tab';

export const ACTIVE_TAB_WIDTH = '--_tabs-active-tab-inline-size';

/**
 * In edge cases there can be no active tab.
 * But for backwards compatibility we keep them typed as non-nullable.
 */
type IncorrectlyTyped = any;

/**
 * Types of tabs connotation.
 *
 * @public
 */
export type TabsConnotation = ExtractFromEnum<
	Connotation,
	Connotation.Accent | Connotation.CTA
>;

export const TabsGutters = {
	None: 'none',
	Small: 'small',
} as const;

export type TabsGutters = typeof TabsGutters[keyof typeof TabsGutters];

export const TabsOrientation = {
	vertical: 'vertical',
	horizontal: 'horizontal',
} as const;

export type TabsOrientation =
	typeof TabsOrientation[keyof typeof TabsOrientation];

const oppositeOrientation = (orientation: TabsOrientation) =>
	orientation === TabsOrientation.horizontal
		? TabsOrientation.vertical
		: TabsOrientation.horizontal;
const gridProperty = (orientation: TabsOrientation) =>
	orientation === TabsOrientation.horizontal ? 'gridColumn' : 'gridRow';
const translateProperty = (orientation: TabsOrientation) =>
	orientation === TabsOrientation.horizontal ? 'translateX' : 'translateY';
const offsetProperty = (orientation: TabsOrientation) =>
	orientation === TabsOrientation.horizontal ? 'offsetLeft' : 'offsetTop';

const isFocusableElement = (el: Element) =>
	el.getAttribute('aria-disabled') !== 'true' && !el.hasAttribute('hidden');

const arrayShallowEquals = <T>(a: T[], b: T[]) =>
	a.length === b.length && a.every((v, i) => v === b[i]);

/**
 * @public
 * @component tabs
 * @slot - Default slot.
 * @event {CustomEvent<HTMLElement>} change - Fires a custom 'change' event when a tab is clicked or during keyboard navigation
 */
export class Tabs extends VividElement {
	/**
	 * The orientation
	 * @public
	 * @remarks
	 * HTML Attribute: orientation
	 */
	@attr
	// eslint-disable-next-line @repo/repo/no-attribute-default-value
	orientation: TabsOrientation = TabsOrientation.horizontal;
	/**
	 * @internal
	 */
	orientationChanged(): void {
		this._registerTabsChange();

		// Once the DOM has updated, move the active indicator into new place
		if (this.$fastController.isConnected) {
			DOM.queueUpdate(() => this.#moveActiveIndicator(false));
		}
	}

	/**
	 * @internal
	 */
	_tabsSlot!: HTMLSlotElement;

	/**
	 * @internal
	 */
	@observable
	tabs: HTMLElement[] = [];
	/**
	 * @internal
	 */
	tabsChanged() {
		for (const tab of this.tabs) {
			if (!tab.id) {
				tab.id = `tab-${uniqueId()}`;
			}
			tab.addEventListener('click', this.#onTabClick);
			tab.addEventListener('keydown', this.#onTabKeyDown);
		}
		this._registerTabsChange();
	}

	/**
	 * @internal
	 */
	_tabPanelsSlot!: HTMLSlotElement;

	/**
	 * @internal
	 */
	@observable
	tabpanels: HTMLElement[] = [];
	/**
	 * @internal
	 */
	tabpanelsChanged() {
		for (const panel of this.tabpanels) {
			if (!panel.id) {
				panel.id = `panel-${uniqueId()}`;
			}
		}
		this._registerTabsChange();
	}

	#areSlotsSynced() {
		return (
			arrayShallowEquals(this.tabs, this._tabsSlot.assignedNodes()) &&
			arrayShallowEquals(this.tabpanels, this._tabPanelsSlot.assignedNodes())
		);
	}

	/**
	 * Tabs that are paired with a tabpanel. Ignore any excess tabs or panels.
	 */
	private get _pairedTabs() {
		return this.tabs.slice(
			0,
			Math.min(this.tabs.length, this.tabpanels.length)
		);
	}

	/**
	 * Tabs that are eligible to become active.
	 */
	private get _validTabs() {
		return this._pairedTabs.filter(isFocusableElement);
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
	activeidChanged() {
		this._registerTabsChange();
	}

	/**
	 * A reference to the active tab
	 * @public
	 */
	get activetab(): HTMLElement {
		return (
			this._validTabs.find((tab) => tab.id === this.activeid) ??
			(null as IncorrectlyTyped)
		);
	}

	#setActiveTabDueToUserInteraction(tab: HTMLElement) {
		this.activeid = tab.id;
		tab.focus();
		this.$emit('change', tab);
	}

	#isTabsChangeQueued = false;

	/**
	 * Defer actual processing of changes into a microtask to wait for all DOM changes to complete. E.g. when tabs and
	 * active id are updated at the same time.
	 */
	private _registerTabsChange() {
		if (this.#isTabsChangeQueued) {
			return;
		}
		this.#isTabsChangeQueued = true;
		window.queueMicrotask(() => {
			// If slots are not synced, the slotchange event has not yet fired. Cancel the current update and wait for the event to trigger it again.
			if (this.$fastController.isConnected && this.#areSlotsSynced()) {
				this.#handleTabsChange();
			}
			this.#isTabsChangeQueued = false;
		});
	}

	#lastActiveId: string | undefined = undefined;

	#handleTabsChange() {
		const validTabs = this._validTabs;

		let newActiveId: string | undefined = this.activeid;
		if (
			!validTabs.length ||
			(newActiveId && !validTabs.find((t) => t.id === newActiveId))
		) {
			newActiveId = undefined;
		}
		if (!newActiveId && validTabs.length) {
			newActiveId = validTabs[0].id;
		}

		if (this.activeid !== newActiveId) {
			this.activeid = newActiveId as IncorrectlyTyped;
			this.$emit('change', this.activetab);
		}

		this.#updateSlottedChildren();

		if (this.activeid !== this.#lastActiveId) {
			if (this.activetab) {
				const shouldAnimate = this.#lastActiveId !== undefined;
				this.#scrollToTab(this.activetab, shouldAnimate);
				this.#moveActiveIndicator(shouldAnimate);
			}
			this.#lastActiveId = this.activeid;
		} else {
			// Changes in tabs affect position without triggering resize in stretch layout
			this.#moveActiveIndicator(this.#isTransitioningTransform);
		}
	}

	/**
	 * Updates the tabs and their panels according to the current state of the component.
	 */
	#updateSlottedChildren() {
		for (const [index, tab] of this._pairedTabs.entries()) {
			const panel = this.tabpanels[index];

			const isActiveTab = tab.id === this.activeid;
			if (tab instanceof Tab) {
				tab.active = isActiveTab;
			}
			tab.setAttribute('aria-controls', panel.id);
			tab.setAttribute('tabindex', isActiveTab ? '0' : '-1');
			if (isActiveTab && this.connotation) {
				tab.setAttribute('connotation', this.connotation);
			} else {
				tab.removeAttribute('connotation');
			}

			tab.classList.toggle(
				'vertical',
				this.orientation === TabsOrientation.vertical
			);

			tab.style[gridProperty(oppositeOrientation(this.orientation))] = '';
			tab.style[gridProperty(this.orientation)] = `${index + 1}`;

			panel.setAttribute('aria-labelledby', tab.id);
			panel.hidden = !isActiveTab;
		}
	}

	#onTabClick = (event: MouseEvent) => {
		const selectedTab = event.currentTarget as HTMLElement;
		if (this._validTabs.includes(selectedTab)) {
			this.#setActiveTabDueToUserInteraction(selectedTab);
		}
	};

	#onTabKeyDown = (event: KeyboardEvent) => {
		const tabs = this._validTabs;
		const activeTab = this.activetab;
		if (!activeTab) {
			return;
		}

		const [arrowKeyPrev, arrowKeyNext] =
			this.orientation === TabsOrientation.horizontal
				? [keyArrowLeft, keyArrowRight]
				: [keyArrowUp, keyArrowDown];

		const keyToNextTab = {
			[arrowKeyPrev]: () =>
				tabs[(tabs.indexOf(activeTab) - 1 + tabs.length) % tabs.length],
			[arrowKeyNext]: () => tabs[(tabs.indexOf(activeTab) + 1) % tabs.length],
			[keyHome]: () => tabs[0],
			[keyEnd]: () => tabs[tabs.length - 1],
		};

		if (keyToNextTab[event.key]) {
			event.preventDefault();
			this.#setActiveTabDueToUserInteraction(keyToNextTab[event.key]());
		}
	};

	/**
	 * Adjusts the active index by numerical increments.
	 * Only enabled tabs are considered.
	 * @public
	 * @remarks
	 */
	adjust(adjustment: number): void {
		const focusableTabs = this._validTabs;
		const currentActiveTabIndex = focusableTabs.findIndex(
			(t) => t.id === this.activeid
		);
		if (currentActiveTabIndex === -1) {
			return;
		}

		const nextTabIndex = limit(
			0,
			focusableTabs.length - 1,
			currentActiveTabIndex + adjustment
		);

		this.#setActiveTabDueToUserInteraction(focusableTabs[nextTabIndex]);
	}

	/**
	 * @internal
	 */
	@observable
	activeIndicatorRef!: HTMLElement;

	#isTransitioningTransform = false;

	/**
	 * @internal
	 */
	_onActiveIndicatorTransitionend(event: TransitionEvent) {
		if (event.propertyName === 'transform') {
			this.#isTransitioningTransform = false;
		}
	}

	#cancelAnimationIfNeeded() {
		this.#isTransitioningTransform = false;
		this.activeIndicatorRef.classList.remove('activeIndicatorTransition');
	}

	#moveActiveIndicator(shouldAnimate: boolean) {
		const activeTabIndex = this._pairedTabs.findIndex(
			(tab) => tab.id === this.activeid
		);
		if (activeTabIndex === -1) {
			return;
		}

		const indicatorEl = this.activeIndicatorRef;

		const currentOffset = indicatorEl[offsetProperty(this.orientation)];

		// Temporary move indicator to measure target offset
		indicatorEl.style[gridProperty(this.orientation)] = `${activeTabIndex + 1}`;
		const targetOffset = indicatorEl[offsetProperty(this.orientation)];
		indicatorEl.style[gridProperty(this.orientation)] = '';

		const relativeOffset = targetOffset - currentOffset;

		const currentTransform = indicatorEl.style.transform;
		const targetTransform = `${translateProperty(
			this.orientation
		)}(${relativeOffset}px)`;

		if (shouldAnimate) {
			indicatorEl.classList.add('activeIndicatorTransition');
			if (currentTransform !== targetTransform) {
				this.#isTransitioningTransform = true;
			}
		} else {
			this.#cancelAnimationIfNeeded();
		}

		indicatorEl.style.transform = targetTransform;
		indicatorEl.style.setProperty(
			ACTIVE_TAB_WIDTH,
			this.tabs[activeTabIndex].getBoundingClientRect().width + 'px'
		);
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
	 * @internal
	 */
	connotationChanged() {
		this._registerTabsChange();
	}

	/**
	 * sets the initial preferred margin from predefined available options
	 *
	 * @public
	 */
	@attr gutters?: TabsGutters;

	/**
	 * sets overflow to the tab-panel
	 *
	 * @public
	 */
	@attr({ mode: 'boolean', attribute: 'scrollable-panel' }) scrollablePanel =
		false;

	/**
	 * Controls the layout of the tabs.
	 * @public
	 * @remarks
	 * HTML Attribute: tabs-layout
	 */
	@attr({ attribute: 'tabs-layout' }) tabsLayout?: 'align-start' | 'stretch';

	#updateScrollStatus() {
		// Trigger scroll shadow evaluation
		this.#tabListScrollWrapper.dispatchEvent!(new Event('scroll'));
	}

	#resizeObserver?: ResizeObserver;

	override connectedCallback() {
		super.connectedCallback();

		this._registerTabsChange();

		requestAnimationFrame(() => this.#updateScrollStatus());

		this.#resizeObserver = new ResizeObserver(() => {
			this.#moveActiveIndicator(this.#isTransitioningTransform);
			this.#updateScrollStatus();
		});
		this.#resizeObserver!.observe(this.#tabListScrollWrapper);
		this.#resizeObserver!.observe(this.tablist!);
	}

	override disconnectedCallback() {
		super.disconnectedCallback();
		this.#resizeObserver!.disconnect();
	}

	get #tabListWrapper(): HTMLElement {
		return this.shadowRoot!.querySelector('.tablist-wrapper') as HTMLElement;
	}

	get #tabListScrollWrapper(): HTMLElement {
		return this.tablist!.parentElement!;
	}

	#scrollToTab(tab: HTMLElement, shouldAnimate = true) {
		const index = this.tabs.findIndex((t) => t === tab);
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

		this.#tabListWrapper.scrollTo({
			top,
			left,
			behavior: shouldAnimate ? 'smooth' : 'instant',
		});
	}

	/**
	 * @internal
	 */
	@observable _actionItemsSlottedContent: HTMLElement[] = [];

	/**
	 * Deprecated attribute. It has no effect.
	 * @deprecated
	 * @public
	 * @remarks
	 * HTML Attribute: activeindicator
	 */
	@attr({ mode: 'boolean' })
	// eslint-disable-next-line @repo/repo/no-attribute-default-value
	activeindicator = true;
}
