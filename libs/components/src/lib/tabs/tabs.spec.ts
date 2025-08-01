import { elementUpdated, fixture, getBaseElement } from '@repo/shared';
import type { MockInstance } from 'vitest';
import { Connotation } from '../enums';
import type { Tab } from '../tab/tab';
import { TabPanel } from '../tab-panel/tab-panel';
import { Tabs, TabsGutters } from './tabs';
import '.';

const COMPONENT_TAG = 'vwc-tabs';

describe('vwc-tabs', () => {
	function getActiveIndicator() {
		return element.shadowRoot?.querySelector(
			'.active-indicator'
		) as HTMLElement;
	}

	class TransitionEvent extends Event {
		constructor(type: string, eventInitDict?: TransitionEventInit) {
			super(type, eventInitDict);
			this.propertyName = eventInitDict?.propertyName || '';
		}
		propertyName: string;
	}

	const originalResizeObserver = global.ResizeObserver;
	let resizeObserver: any;

	beforeEach(function () {
		(global.ResizeObserver as any) = class implements ResizeObserver {
			callback(_: any) {}

			observer: HTMLElement | null = null;

			constructor(callback: <T>(arg0: T) => void) {
				this.callback = callback;
				// eslint-disable-next-line @typescript-eslint/no-this-alias
				resizeObserver = this;
			}

			observe(target: HTMLElement) {
				this.observer = target;
			}
			disconnect = vi.fn(() => {
				this.observer = null;
			});
			unobserve = vi.fn();
			// Simulate resize event
			triggerResize() {
				if (this.observer) {
					this.callback([{ target: this.observer }]);
				}
			}
		};
		window.HTMLElement.prototype.getBoundingClientRect = function () {
			return {
				x: 146,
				y: 50,
				width: 440,
				height: 240,
				top: 50,
				right: 586,
				bottom: 290,
				left: 146,
			} as DOMRect;
		};
		window.HTMLElement.prototype.scrollIntoView = vi.fn();
		window.HTMLElement.prototype.scrollTo = vi.fn();
	});

	afterAll(() => {
		global.ResizeObserver = originalResizeObserver;
	});

	let element: Tabs;

	async function setupFixture(template: string) {
		element = (await fixture(template)) as Tabs;
	}

	async function setFixtureWithActiveId(activeid: string | null = 'apps') {
		await setupFixture(`<${COMPONENT_TAG} ${
			activeid ? `activeid="${activeid}"` : ''
		}>
		<vwc-tab label="Appetizers" id="apps"></vwc-tab>
		<vwc-tab label="Entrees" id="entrees"></vwc-tab>
		<vwc-tab label="Desserts" id="desserts"></vwc-tab>
		<vwc-tab-panel id="appsPanel">
			<ol>
				<li>Stuffed artichokes</li>
				<li>Bruschetta</li>
				<li>Oven-baked polenta</li>
				<li>Salami and Fig Crostini with Ricotta</li>
				<li>Rosemary-Potato Focaccia with Goat Cheese</li>
			</ol>
		</vwc-tab-panel>
		<vwc-tab-panel id="entreesPanel">
			<ol>
				<li>Mushroom-Sausage Ragù</li>
				<li>Tomato Bread Soup with Steamed Mussels</li>
				<li>Grilled Fish with Artichoke Caponata</li>
				<li>Celery Root and Mushroom Lasagna</li>
				<li>Osso Buco with Citrus Gremolata</li>
			</ol>
		</vwc-tab-panel>
		<vwc-tab-panel id="dessertsPanel">
			<ol>
				<li>Tiramisu</li>
				<li>Spumoni</li>
				<li>Limoncello and Ice Cream with Biscotti</li>
			</ol>
		</vwc-tab-panel>
		</${COMPONENT_TAG}>`);
	}

	beforeEach(async () => {
		await setFixtureWithActiveId('apps');
	});

	describe('basic', () => {
		it('should be initialized as a vwc-tabs', async () => {
			expect(element).toBeInstanceOf(Tabs);
			expect(element.orientation).toEqual('horizontal');
			expect(element.activeid).toEqual('apps');
			expect(element.activetab).toBeTruthy();
			expect(element.gutters).toBeFalsy();
		});

		it('should allow being created via createElement', () => {
			// createElement may fail even though indirect instantiation through innerHTML etc. succeeds
			// This is because only createElement performs checks for custom element constructor requirements
			// See https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance
			expect(() => document.createElement(COMPONENT_TAG)).not.toThrow();
		});
	});

	describe('orientation', () => {
		it('should set orientation property', async () => {
			const orientation = 'vertical';
			expect(
				getBaseElement(element).classList.contains(`orientation-${orientation}`)
			).toBeFalsy();
			element.orientation = orientation as any;
			await elementUpdated(element);
			expect(
				getBaseElement(element).classList.contains(`orientation-${orientation}`)
			).toBeTruthy();
		});
	});

	describe('tabs layout', () => {
		it('should set class "layout-align-start" on base by default', async () => {
			expect(
				getBaseElement(element).classList.contains('layout-align-start')
			).toBeTruthy();
		});

		it('should set class "layout-stretch" on base when set to stretch', async () => {
			element.tabsLayout = 'stretch';
			await elementUpdated(element);
			expect(
				getBaseElement(element).classList.contains('layout-stretch')
			).toBeTruthy();
		});
	});

	describe('scroll shadow', () => {
		let scrollWrapper: HTMLElement;
		let shadowWrapper: HTMLElement;

		function setScrollWidth(value: number) {
			vi.spyOn(scrollWrapper, 'scrollWidth', 'get').mockReturnValue(value);
		}

		function setClientWidth(value: number) {
			vi.spyOn(scrollWrapper, 'clientWidth', 'get').mockReturnValue(value);
		}

		async function dispatchScrollEvent() {
			scrollWrapper.dispatchEvent(new Event('scroll'));
			await elementUpdated(element);
		}

		beforeEach(function () {
			scrollWrapper = getBaseElement(element).querySelector(
				'.tablist-wrapper'
			) as HTMLElement;
			shadowWrapper = getBaseElement(element).querySelector(
				'.scroll-shadow'
			) as HTMLElement;

			setScrollWidth(200);
			setClientWidth(150);
		});

		it('should remove class "start-scroll" if scroll position is 0', async () => {
			shadowWrapper.classList.add('start-scroll');
			scrollWrapper.scrollLeft = 0;
			await dispatchScrollEvent();
			expect(shadowWrapper.classList.contains('start-scroll')).toBeFalsy();
		});

		it('should add class "start-scroll" if scroll position is bigger then 0', async () => {
			scrollWrapper.scrollLeft = 2;
			await dispatchScrollEvent();
			expect(shadowWrapper.classList.contains('start-scroll')).toBeTruthy();
		});

		it('should remove class "end-scroll" if scroll position is scroll-width', async () => {
			scrollWrapper.scrollLeft = scrollWrapper.scrollWidth;
			shadowWrapper.classList.add('end-scroll');
			await dispatchScrollEvent();
			expect(shadowWrapper.classList.contains('end-scroll')).toBeFalsy();
		});

		it('should add class "end-scroll" if scroll position is less then scroll-width', async () => {
			scrollWrapper.scrollLeft = 20;
			await dispatchScrollEvent();
			expect(shadowWrapper.classList.contains('end-scroll')).toBeTruthy();
		});

		it('should add class "end-scroll + start-scroll" if scroll position is less then scroll-width and bigger then 0', async () => {
			scrollWrapper.scrollLeft = 20;
			await dispatchScrollEvent();
			expect(shadowWrapper.classList.contains('start-scroll')).toBeTruthy();
			expect(shadowWrapper.classList.contains('end-scroll')).toBeTruthy();
		});

		it('should not add "end-scroll" when scroll width is 1px bigger than client width', async () => {
			setScrollWidth(178);
			setClientWidth(177);
			scrollWrapper.scrollLeft = 0;
			await dispatchScrollEvent();

			expect(shadowWrapper.classList.contains('end-scroll')).toBeFalsy();
		});

		it('should remove class "end-scroll + start-scroll" if scroll-width less or equal to wrapper', async () => {
			setScrollWidth(100);
			setClientWidth(150);

			await dispatchScrollEvent();
			expect(shadowWrapper.classList.contains('start-scroll')).toBeFalsy();
			expect(shadowWrapper.classList.contains('end-scroll')).toBeFalsy();
		});

		it('should add class "end-scroll" if scroll-width bigger then wrapper on component load', async () => {
			await elementUpdated(element);
			expect(shadowWrapper.classList.contains('end-scroll')).toBeTruthy();
		});

		it('should remove class "end-scroll" if number of slotted tabs reduced scroll-wrapper width bellow client-width', async () => {
			await elementUpdated(element);

			const tab = document.createElement('vwc-tab');
			element.appendChild(tab);
			setScrollWidth(50);
			resizeObserver.triggerResize();
			await elementUpdated(element);

			expect(shadowWrapper.classList.contains('end-scroll')).toBeFalsy();
		});

		it('should add class "end-scroll" if number of slotted tabs increased scroll-wrapper width above client-width', async () => {
			setScrollWidth(50);
			await elementUpdated(element);

			const tab = document.createElement('vwc-tab');
			element.appendChild(tab);
			await elementUpdated(element);
			setScrollWidth(500);
			resizeObserver.triggerResize();

			expect(shadowWrapper.classList.contains('end-scroll')).toBeTruthy();
		});

		it('should remove class "end-scroll" if client width grows above scroll width', async () => {
			await elementUpdated(element);
			setClientWidth(350);
			resizeObserver.triggerResize();
			await elementUpdated(element);
			expect(shadowWrapper.classList.contains('end-scroll')).toBeFalsy();
		});

		it('should add class "end-scroll" if client width reduces below scroll width', async () => {
			setClientWidth(350);
			await dispatchScrollEvent();
			setClientWidth(50);
			resizeObserver.triggerResize();
			await elementUpdated(element);
			expect(shadowWrapper.classList.contains('end-scroll')).toBeTruthy();
		});

		it('should disconnect resize observer on disconnected callback', async () => {
			element.disconnectedCallback();
			expect(resizeObserver.disconnect).toHaveBeenCalled();
		});
	});

	describe('activeid', () => {
		it('should be initialized to first tab', async () => {
			await setFixtureWithActiveId(null);
			await elementUpdated(element);
			expect(element.activeid).toEqual('apps');
		});

		it('should set the active tab', async () => {
			const tab = element.querySelector('#entrees') as Tab;
			expect(tab.ariaSelected).toEqual('false');

			element.activeid = 'entrees';
			await elementUpdated(element);

			expect(tab.ariaSelected).toEqual('true');
		});

		it('should be reset when set to a tab that does not exist', async () => {
			element.activeid = 'does-not-exist';
			await elementUpdated(element);

			expect(element.activeid).toBe('apps');
		});

		it('should be reset when set to a tab that is disabled', async () => {
			const tab = element.querySelector('#entrees') as Tab;
			tab.disabled = true;
			await elementUpdated(element);

			element.activeid = 'entrees';
			await elementUpdated(element);

			expect(element.activeid).toBe('apps');
		});

		describe('scrollToIndex', function () {
			let scrollToSpy: MockInstance<(x: number, y: number) => void>;
			const scrollWidth = 1320;
			const scrollHeight = 660;
			beforeEach(function () {
				const tablistWrapper = element.shadowRoot?.querySelector(
					'.tablist-wrapper'
				) as HTMLElement;
				vi.spyOn(tablistWrapper, 'scrollWidth', 'get').mockImplementation(
					() => scrollWidth
				);
				vi.spyOn(tablistWrapper, 'scrollHeight', 'get').mockImplementation(
					() => scrollHeight
				);
				scrollToSpy = vi.spyOn(tablistWrapper, 'scrollTo');
			});

			it('should scrollTo with 0 if first tab becomes active', async function () {
				element.activeid = element.tabs[1].id;
				await elementUpdated(element);

				element.activeid = element.tabs[0].id;
				await elementUpdated(element);
				expect(scrollToSpy).toHaveBeenLastCalledWith({
					top: 0,
					left: 0,
					behavior: 'smooth',
				});
			});

			it('should scrollTo height 0 if first tab becomes active and orientation vertical', async function () {
				element.activeid = element.tabs[1].id;
				await elementUpdated(element);

				element.orientation = 'vertical';
				element.activeid = element.tabs[0].id;
				await elementUpdated(element);
				expect(scrollToSpy).toHaveBeenCalledWith({
					top: 0,
					left: 0,
					behavior: 'smooth',
				});
			});

			it('should scroll to tablist wrapper width when index is last', async function () {
				element.activeid = element.tabs[2].id;
				await elementUpdated(element);
				expect(scrollToSpy).toHaveBeenCalledWith({
					top: 0,
					left: scrollWidth,
					behavior: 'smooth',
				});
			});

			it('should scroll to tablist wrapper height when index is last and orientation vertical', async function () {
				element.orientation = 'vertical';
				element.activeid = element.tabs[2].id;
				await elementUpdated(element);
				expect(scrollToSpy).toHaveBeenCalledWith({
					top: scrollHeight,
					left: 0,
					behavior: 'smooth',
				});
			});

			it('should scroll to sum of tabs plus half active tab when index is between 0 and last', async function () {
				const offsetLeft = 100;
				const offsetWidth = 200;
				const scrollWidth = 1000;
				function setTabListWrapper(scrollWidth: number) {
					const tablistWrapper = element.shadowRoot?.querySelector(
						'.tablist-wrapper'
					) as HTMLElement;
					vi.spyOn(tablistWrapper, 'offsetWidth', 'get').mockImplementation(
						() => scrollWidth
					);
				}
				function setMidTab(offsetLeft: number, offsetWidth: number) {
					const midTab = element.querySelectorAll('vwc-tab')[1];
					vi.spyOn(midTab, 'offsetLeft', 'get').mockImplementation(
						() => offsetLeft
					);
					vi.spyOn(midTab, 'offsetWidth', 'get').mockImplementation(
						() => offsetWidth
					);
					return midTab;
				}

				setTabListWrapper(scrollWidth);
				const midTab = setMidTab(offsetLeft, offsetWidth);

				element.activeid = midTab.id;
				await elementUpdated(element);
				expect(scrollToSpy).toHaveBeenCalledWith({
					top: 0,
					left: offsetLeft - scrollWidth / 2 + offsetWidth / 2,
					behavior: 'smooth',
				});
			});

			it('should scroll to sum of tabs plus half active tab when index is between 0 and last', async function () {
				const offsetTop = 100;
				const offsetHeight = 200;
				const scrollHeight = 1000;
				function setTabListWrapper(scrollHeight: number) {
					const tablistWrapper = element.shadowRoot?.querySelector(
						'.tablist-wrapper'
					) as HTMLElement;
					vi.spyOn(tablistWrapper, 'offsetHeight', 'get').mockImplementation(
						() => scrollHeight
					);
				}
				function setMidTab(offsetLeft: number, offsetWidth: number) {
					const midTab = element.querySelectorAll('vwc-tab')[1];
					vi.spyOn(midTab, 'offsetTop', 'get').mockImplementation(
						() => offsetLeft
					);
					vi.spyOn(midTab, 'offsetHeight', 'get').mockImplementation(
						() => offsetWidth
					);
					return midTab;
				}

				setTabListWrapper(scrollHeight);
				const midTab = setMidTab(offsetTop, offsetHeight);
				element.orientation = 'vertical';
				element.activeid = midTab.id;
				await elementUpdated(element);
				expect(scrollToSpy).toHaveBeenCalledWith({
					top: offsetTop - scrollHeight / 2 + offsetHeight / 2,
					left: 0,
					behavior: 'smooth',
				});
			});
		});
	});

	describe('gutters', () => {
		it('should set class .gutters-small on .base as default and if no gutters are set', async () => {
			expect(getBaseElement(element).classList.toString()).toContain(
				`gutters-small`
			);
		});
		it('should set gutters class on .base', async () => {
			const gutters = TabsGutters.None;
			element.gutters = gutters;
			await elementUpdated(element);
			expect(getBaseElement(element).classList.toString()).toContain(
				`gutters-${gutters}`
			);
		});
	});

	describe('connotation', () => {
		function checkConnotationOnActiveTab(
			connotation: Connotation = Connotation.CTA
		) {
			expect(element.activetab.getAttribute('connotation')).toEqual(
				connotation
			);
		}

		function checkConnotationDoesntExistOnNonActiveTabs() {
			const nonActiveTabs = Array.from(
				element.querySelectorAll('vwc-tab:not([aria-selected="true"])')
			);
			nonActiveTabs.forEach((tab) => {
				expect(tab.hasAttribute('connotation')).toBeFalsy();
			});
		}
		beforeEach(function () {
			element.connotation = Connotation.CTA;
		});

		it('should reflect connotation on active tab after init', async function () {
			await elementUpdated(element);
			checkConnotationOnActiveTab();
			checkConnotationDoesntExistOnNonActiveTabs();
		});

		it('should reflect connotation on active tab after activeid changed', async function () {
			element.activeid = 'entrees';
			await elementUpdated(element);
			checkConnotationOnActiveTab();
			checkConnotationDoesntExistOnNonActiveTabs();
		});

		it('should reflect connotation on active tab after orientation changed', async function () {
			element.orientation = 'vertical';
			await elementUpdated(element);
			checkConnotationOnActiveTab();
			checkConnotationDoesntExistOnNonActiveTabs();
		});

		it('should reflect connotation on new active tab when activeid is already set', async function () {
			element.innerHTML = '';
			await elementUpdated(element);
			element.activeid = 'new-tab';

			const newTab = document.createElement('vwc-tab');
			newTab.id = 'new-tab';
			newTab.slot = 'tab';
			element.appendChild(newTab);
			const newTabPanel = document.createElement('vwc-tab-panel');
			newTabPanel.slot = 'tabpanel';
			element.appendChild(newTabPanel);
			await elementUpdated(element);

			checkConnotationOnActiveTab();
			checkConnotationDoesntExistOnNonActiveTabs();
		});
	});

	describe('scroll', () => {
		it('should set class "scroll" if scrollable-panel is set', async () => {
			element.scrollablePanel = true;
			await elementUpdated(element);
			expect(getBaseElement(element).classList.contains('scroll')).toBeTruthy();
		});
	});

	describe('activetab', () => {
		it('should be the active tab element', async () => {
			const tab = element.querySelector('#entrees') as Tab;
			tab.click();
			await elementUpdated(element);

			expect(element.activetab).toBe(tab);
		});
	});

	describe('adjust method', () => {
		it('should adjust the active tab forward', async () => {
			element.activeid = 'entrees';

			element.adjust(1);

			expect(element.activeid).toBe('desserts');
		});

		it('should adjust the active tab forward', async () => {
			element.activeid = 'entrees';

			element.adjust(-1);

			expect(element.activeid).toBe('apps');
		});

		it('should stay on the last tab when adjusting forward from the last tab', async () => {
			element.activeid = 'desserts';

			element.adjust(1);

			expect(element.activeid).toBe('desserts');
		});

		it('should stay on the first tab when adjusting backward from the first tab', async () => {
			element.activeid = 'apps';

			element.adjust(-1);

			expect(element.activeid).toBe('apps');
		});

		it('should do nothing if there is no active tab', async () => {
			element.innerHTML = '';
			await elementUpdated(element);

			expect(() => element.adjust(1)).not.toThrow();
		});
	});

	describe('active tab indicator', () => {
		let activeIndicator: HTMLElement;
		beforeEach(() => {
			activeIndicator = getActiveIndicator();
		});

		it('should animate the active tab indicator when active tab changes', async () => {
			Object.defineProperty(activeIndicator, 'offsetLeft', {
				get: () => {
					const gridColumn = activeIndicator.style['gridColumn'] || '1';
					return parseInt(gridColumn) * 100;
				},
			});

			element.activeid = 'entrees';
			await elementUpdated(element);

			expect(activeIndicator.style['gridColumn']).toBe('');
			expect(activeIndicator.style['transform']).toBe('translateX(100px)');
			expect(
				activeIndicator.classList.contains('activeIndicatorTransition')
			).toBe(true);
		});

		it('should use vertical properties when orientation is vertical', async () => {
			Object.defineProperty(activeIndicator, 'offsetTop', {
				get: () => {
					const gridRow = activeIndicator.style['gridRow'] || '1';
					return parseInt(gridRow) * 100;
				},
			});

			element.orientation = 'vertical';
			element.activeid = 'entrees';
			await elementUpdated(element);

			expect(activeIndicator.style['gridRow']).toBe('');
			expect(activeIndicator.style['transform']).toBe('translateY(100px)');
		});

		it('should update the activeIndicator position on tab size changes without animation', async () => {
			let offsetUnit = 100;
			Object.defineProperty(activeIndicator, 'offsetLeft', {
				get: () => {
					const gridColumn = activeIndicator.style['gridColumn'] || '1';
					return parseInt(gridColumn) * offsetUnit;
				},
			});
			element.activeid = 'entrees';
			await elementUpdated(element);
			activeIndicator.dispatchEvent(
				new TransitionEvent('transitionend', { propertyName: 'transform' })
			);

			offsetUnit = 200;
			resizeObserver.triggerResize();

			expect(activeIndicator.style['transform']).toBe('translateX(200px)');
			expect(
				activeIndicator.classList.contains('activeIndicatorTransition')
			).toBe(false);
		});

		it('should update an in progress animation of activeIndicator position on tab bar size changes', async () => {
			let offsetUnit = 100;
			Object.defineProperty(activeIndicator, 'offsetLeft', {
				get: () => {
					const gridColumn = activeIndicator.style['gridColumn'] || '1';
					return parseInt(gridColumn) * offsetUnit;
				},
			});
			element.activeid = 'entrees';
			await elementUpdated(element);

			offsetUnit = 200;
			resizeObserver.triggerResize();

			expect(activeIndicator.style['transform']).toBe('translateX(200px)');
			expect(
				activeIndicator.classList.contains('activeIndicatorTransition')
			).toBe(true);
		});

		it('should update the activeIndicator position when tabs are added or removed', async () => {
			Object.defineProperty(activeIndicator, 'offsetLeft', {
				get: () => {
					const gridColumn = activeIndicator.style['gridColumn'] || '1';
					return parseInt(gridColumn) * 100;
				},
			});
			element.activeid = 'desserts';
			await elementUpdated(element);
			expect(activeIndicator.style['transform']).toBe('translateX(200px)');

			document.querySelector('#entrees')!.remove();
			await elementUpdated(element);

			expect(activeIndicator.style['transform']).toBe('translateX(100px)');
		});
	});

	describe('keyboard navigation', () => {
		describe('in horizontal orientation', () => {
			it('should activate the next tab when right arrow key is pressed', async () => {
				element.activeid = 'entrees';

				element.activetab.dispatchEvent(
					new KeyboardEvent('keydown', { key: 'ArrowRight' })
				);

				expect(element.activeid).toBe('desserts');
			});

			it('should activate the previous tab when left arrow key is pressed', async () => {
				element.activeid = 'entrees';

				element.activetab.dispatchEvent(
					new KeyboardEvent('keydown', { key: 'ArrowLeft' })
				);

				expect(element.activeid).toBe('apps');
			});
		});

		describe('in vertical orientation', () => {
			beforeEach(() => {
				element.orientation = 'vertical';
			});

			it('should activate the next tab when down arrow key is pressed', async () => {
				element.activeid = 'entrees';

				element.activetab.dispatchEvent(
					new KeyboardEvent('keydown', { key: 'ArrowDown' })
				);

				expect(element.activeid).toBe('desserts');
			});

			it('should activate the previous tab when up arrow key is pressed', async () => {
				element.activeid = 'entrees';

				element.activetab.dispatchEvent(
					new KeyboardEvent('keydown', { key: 'ArrowUp' })
				);

				expect(element.activeid).toBe('apps');
			});
		});

		it('should jump over disabled tabs when navigating forward', async () => {
			await setupFixture(`<${COMPONENT_TAG}>
				<vwc-tab label="Appetizers" id="apps"></vwc-tab><vwc-tab-panel></vwc-tab-panel>
				<vwc-tab label="Entrees" id="entrees" disabled></vwc-tab><vwc-tab-panel></vwc-tab-panel>
				<vwc-tab label="Desserts" id="desserts"></vwc-tab><vwc-tab-panel></vwc-tab-panel>
			</${COMPONENT_TAG}>`);

			element.activeid = 'apps';

			element.activetab.dispatchEvent(
				new KeyboardEvent('keydown', { key: 'ArrowRight' })
			);

			expect(element.activeid).toBe('desserts');
		});

		it('should jump over disabled tabs when navigating backwards', async () => {
			await setupFixture(`<${COMPONENT_TAG}>
				<vwc-tab label="Appetizers" id="apps"></vwc-tab><vwc-tab-panel></vwc-tab-panel>
				<vwc-tab label="Entrees" id="entrees" disabled></vwc-tab><vwc-tab-panel></vwc-tab-panel>
				<vwc-tab label="Desserts" id="desserts"></vwc-tab><vwc-tab-panel></vwc-tab-panel>
			</${COMPONENT_TAG}>`);

			element.activeid = 'desserts';

			element.activetab.dispatchEvent(
				new KeyboardEvent('keydown', { key: 'ArrowLeft' })
			);

			expect(element.activeid).toBe('apps');
		});

		it('should loop around to the first tab when navigating forwards', async () => {
			element.activeid = 'desserts';

			element.activetab.dispatchEvent(
				new KeyboardEvent('keydown', { key: 'ArrowRight' })
			);

			expect(element.activeid).toBe('apps');
		});

		it('should loop around to the last tab when navigating backwards', async () => {
			element.activeid = 'apps';

			element.activetab.dispatchEvent(
				new KeyboardEvent('keydown', { key: 'ArrowLeft' })
			);

			expect(element.activeid).toBe('desserts');
		});

		it('should activate the first tab when home key is pressed', async () => {
			element.activeid = 'entrees';

			element.activetab.dispatchEvent(
				new KeyboardEvent('keydown', { key: 'Home' })
			);

			expect(element.activeid).toBe('apps');
		});

		it('should activate the last tab when end key is pressed', async () => {
			element.activeid = 'entrees';

			element.activetab.dispatchEvent(
				new KeyboardEvent('keydown', { key: 'End' })
			);

			expect(element.activeid).toBe('desserts');
		});

		it('should do nothing if there are no active tabs', async () => {
			element.innerHTML = '<vwc-tab id="invalid"></vwc-tab>';
			await elementUpdated(element);

			element
				.querySelector('vwc-tab')!
				.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));

			expect(element.activeid).toBe(undefined);
		});
	});

	it("should assign random id's to tabs and panels when not provided", async () => {
		await setupFixture(`<${COMPONENT_TAG}>
		 	<vwc-tab label="Appetizers"></vwc-tab><vwc-tab-panel></vwc-tab-panel>
		</${COMPONENT_TAG}>`);

		expect(element.tabs[0].id).toBeTruthy();
		expect(element.tabpanels[0].id).toBeTruthy();
	});

	it('should initialise dynamically added tabs', async () => {
		const newPanel = document.createElement('vwc-tab-panel') as TabPanel;
		newPanel.id = 'new-panel';
		element.appendChild(newPanel);
		await elementUpdated(element);
		const newTab = document.createElement('vwc-tab') as Tab;
		newTab.label = 'New Tab';
		element.appendChild(newTab);
		await elementUpdated(element);

		expect(newTab.getAttribute('aria-controls')).toBe('new-panel');
	});

	describe('a11y attributes', () => {
		it('should set the role of tablist on the tablist div', async () => {
			const tablist = element.shadowRoot?.querySelector('.tablist');
			expect(tablist?.getAttribute('role')).toBe('tablist');
		});
	});
});
