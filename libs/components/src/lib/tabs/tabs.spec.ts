import { elementUpdated, fixture, getBaseElement } from '@vivid-nx/shared';
import type { Tab } from '../tab/tab';
import { Tabs, TABS_ACTIVE_INDICATOR_INLINE_SIZE } from './tabs';
import '../tab-panel/tab-panel';
import '.';

const COMPONENT_TAG = 'vwc-tabs';

describe('vwc-tabs', () => {
	let element: Tabs;
	let elementWidth = 100;
	const originalGetBoundingClientRect: () => DOMRect = HTMLElement.prototype.getBoundingClientRect;

	beforeAll(() => {
		HTMLElement.prototype.getBoundingClientRect = () => {
			return {
				width: elementWidth,
				height: 100,
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				x: 0,
				y: 0,
				toJSON: () => '',
			};
		};
	});

	afterAll(() => {
		HTMLElement.prototype.getBoundingClientRect = originalGetBoundingClientRect;
	});

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
			const ariaSelectedOnTabBeforeSelection = (tab as Tab).ariaSelected;

			element.activeid = activeid;
			
			await elementUpdated(element);
			
			expect(ariaSelectedOnTabBeforeSelection).toEqual('false');
			expect((tab as Tab).ariaSelected).toEqual('true');
		});

		it('should change width of active indicator', async () => {
			const prevActiveid = 'entrees';
			const nextActiveid = 'desserts';

			const appslWidth = element.activeIndicatorRef.style.getPropertyValue(TABS_ACTIVE_INDICATOR_INLINE_SIZE);
			
			elementWidth = 150;
			element.activeid = prevActiveid;	
			await elementUpdated(element);		
			const entreesWidth = element.activeIndicatorRef.style.getPropertyValue(TABS_ACTIVE_INDICATOR_INLINE_SIZE);
			
			elementWidth = 200;
			element.activeid = nextActiveid;
			await elementUpdated(element);
			const dessertsWidth = element.activeIndicatorRef.style.getPropertyValue(TABS_ACTIVE_INDICATOR_INLINE_SIZE);

			expect(appslWidth).toEqual('100px');
			expect(entreesWidth).toEqual('150px');
			expect(dessertsWidth).toEqual('200px');	
		});
	});
});
