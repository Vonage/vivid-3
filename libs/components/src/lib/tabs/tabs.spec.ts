import { elementUpdated, fixture, getBaseElement } from '@vivid-nx/shared';
import type { Tab } from '../tab/tab';
import { Tabs } from './tabs';
import '../tab-panel/tab-panel';
import '.';

const COMPONENT_TAG = 'vwc-tabs';

describe('vwc-tabs', () => {
	let element: Tabs;

	beforeEach(async () => {
		element = (await fixture(`<${COMPONENT_TAG} activeid='apps'>
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
	});

	describe('activetab', () => {
		it('should set activetab property', async () => {
			const tab: Tab = element.querySelector('#entrees') as Tab;

			expect(element.activetab).not.toEqual(tab);
			tab.click();

			await elementUpdated(element);

			expect(element.activetab).toEqual(tab);
		});
	});
});
