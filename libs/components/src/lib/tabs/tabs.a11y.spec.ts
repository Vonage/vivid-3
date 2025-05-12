import { axe, fixture } from '@vivid-nx/shared';
import { Tabs } from './tabs';
import '.';

const COMPONENT_TAG = 'vwc-tabs';

describe('a11y: vwc-tabs', () => {
	let element: Tabs;

	beforeAll(async () => {
		window.HTMLElement.prototype.scrollTo = vi.fn();
		await customElements.whenDefined(COMPONENT_TAG);
	});

	beforeEach(async () => {
		element = (await fixture(`
        <${COMPONENT_TAG} activeid="entrees">
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

	it('should pass html a11y test', async () => {
		expect(await axe(element)).toHaveNoViolations();
	});
});
