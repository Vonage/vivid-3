import {elementUpdated, fixture, getBaseElement} from '@vivid-nx/shared';
import {Connotation} from '@vonage/vivid';
import type {Tab} from '../tab/tab';
import {Tabs} from './tabs';
import '.';

const COMPONENT_TAG = 'vwc-tabs';

describe('vwc-tabs', () => {

	beforeEach(function () {
		window.HTMLElement.prototype.getBoundingClientRect = function () {
			return {
				x: 146, y: 50, width: 440, height: 240,
				top: 50, right: 586, bottom: 290, left: 146
			} as DOMRect;
		};
		window.HTMLElement.prototype.scrollIntoView = jest.fn();
		window.HTMLElement.prototype.scrollTo = jest.fn();
	});

	async function setFixture(activeid: string | null = 'apps'): Promise<Tabs> {
		return (await fixture(`<${COMPONENT_TAG} ${activeid ? `activeid="${activeid}"` : ''}>
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
		</${COMPONENT_TAG}>`)) as Tabs;
	}
	let element: Tabs;

	beforeEach(async () => {
		element = await setFixture('apps');
	});

	describe('basic', () => {
		it('should be initialized as a vwc-tabs', async () => {
			expect(element).toBeInstanceOf(Tabs);
			expect(element.orientation).toEqual('horizontal');
			expect(element.activeid).toEqual('apps');
			expect(element.activetab).toBeTruthy();
		});
	});

	describe('orientation', () => {
		it('should set orientation property', async () => {
			const orientation = 'vertical';
			expect(getBaseElement(element).classList.contains(`orientation-${orientation}`)).toBeFalsy();
			element.orientation = orientation as any;
			await elementUpdated(element);
			expect(getBaseElement(element).classList.contains(`orientation-${orientation}`)).toBeTruthy();
		});
	});

	describe('activeid', () => {
		it('should set activeid property', async () => {
			const activeid = 'entrees';
			const tab: Tab = element.querySelector('#' + activeid) as Tab;

			expect((tab as Tab).ariaSelected).toEqual('false');
			element.activeid = activeid;

			await elementUpdated(element);

			expect((tab as Tab).ariaSelected).toEqual('true');
		});

		it('should set activeid property to first tab if activeid is not set', async () => {
			const tmpElement = await setFixture(null);
			await elementUpdated(tmpElement);
			expect(tmpElement.activeid).toEqual('apps');
		});

		describe('scrollToIndex', function () {
			let scrollToSpy: jest.SpyInstance<void, [x: number, y: number]>;
			const scrollWidth = 1320;
			beforeEach(function () {
				const tablistWrapper = element.shadowRoot?.querySelector('.tablist-wrapper') as HTMLElement;
				jest
					.spyOn(tablistWrapper, 'scrollWidth', 'get')
					.mockImplementation(() => scrollWidth);
				scrollToSpy = jest.spyOn(tablistWrapper, 'scrollTo');
			});

			it('should scrollTo with 0 if index is 0', async function () {
				element.activeid = element.tabs[0].id;
				await elementUpdated(element);
				expect(scrollToSpy).toHaveBeenCalledWith({top: 0, left: 0, behavior: 'smooth'});
			});

			it('should scroll to tablist wrapper width when index is last', async function () {
				element.activeid = element.tabs[2].id;
				await elementUpdated(element);
				expect(scrollToSpy).toHaveBeenCalledWith({top: 0, left: scrollWidth, behavior: 'smooth'});
			});

			it('should scroll to sum of tabs plus half active tab when index is between 0 and last', async function () {
				const offsetLeft = 100;
				const offsetWidth = 200;
				const scrollWidth = 1000;
				const tablistWrapper = element.shadowRoot?.querySelector('.tablist-wrapper') as HTMLElement;
				const midTab = element.querySelectorAll('vwc-tab')[1] as Tab;
				jest
					.spyOn(midTab, 'offsetLeft', 'get')
					.mockImplementation(() => offsetLeft);
				jest
					.spyOn(midTab, 'offsetWidth', 'get')
					.mockImplementation(() => offsetWidth);
				jest
					.spyOn(tablistWrapper, 'offsetWidth', 'get')
					.mockImplementation(() => scrollWidth);
				element.activeid = midTab.id;
				await elementUpdated(element);
				expect(scrollToSpy)
					.toHaveBeenCalledWith({top: 0, left: offsetLeft - scrollWidth / 2 + offsetWidth / 2, behavior: 'smooth'});
			});


		});
	});

	describe('connotation', () => {
		function checkConnotationOnActiveTab(connotation: Connotation = Connotation.CTA) {
			expect(element.activetab.getAttribute('connotation')).toEqual(connotation);
		}

		function checkConnotationDoesntExistOnNonActiveTabs() {
			const nonActiveTabs = Array.from(element.querySelectorAll('vwc-tab:not([aria-selected="true"])'));
			nonActiveTabs.forEach(tab => {
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

		it('should reflect connotation on active tab after tabs changed', async function () {
			const newTab = document.createElement('vwc-tab');
			newTab.slot = 'tab';
			element.appendChild(newTab);
			await elementUpdated(element);
			checkConnotationOnActiveTab();
			checkConnotationDoesntExistOnNonActiveTabs();
		});

		it('should reflect connotation on active tab after tab panels changed', async function () {
			const newTabPanel = document.createElement('vwc-tab-panel');
			newTabPanel.slot = 'tabpanel';
			element.appendChild(newTabPanel);
			await elementUpdated(element);
			checkConnotationOnActiveTab();
			checkConnotationDoesntExistOnNonActiveTabs();
		});
	});

	describe('activetab', () => {
		it('should set activetab property', async () => {
			const tab: Tab = element.querySelector('#entrees') as Tab;

			expect(element.activetab).not.toEqual(tab);
			tab.click();
			element.activetab = tab;
			await elementUpdated(element);

			expect(element.activetab).toEqual(tab);
		});
	});

});
