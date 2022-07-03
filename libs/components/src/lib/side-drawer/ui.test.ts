import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import {
	loadComponents,
	loadTemplate
} from '../../visual-tests/visual-tests-utils.js';

const components = ['side-drawer', 'text', 'layout'];
test('should show the component', async ({ page }: { page: Page }) => {
	const template = `
    <vwc-side-drawer open>
      <div slot="header">
        Header
      </div>

      <vwc-text>
        Body
      </vwc-text>

      <vwc-layout slot="app-content" column-basis="block" gutters="small">
        <vwc-text>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mollis ante est, ac porta sapien rutrum in. Fusce id pulvinar massa.
            In est erat, gravida sed velit id, tempus tempus metus. Proin mollis auctor orci. Curabitur vestibulum elementum imperdiet.
            Mauris ac nisl vel nisi auctor sodales. Vestibulum vel rutrum leo, a convallis tellus.
            Aliquam vel ultricies elit, eget malesuada orci.
            Praesent ut blandit nisl. Morbi ut ligula faucibus ante pellentesque condimentum sit amet ac dui.
            Suspendisse potenti. Ut et massa arcu. Pellentesque pellentesque id tortor at ornare.
          </p>
        </vwc-text>
      </vwc-layout>
    </vwc-side-drawer>
  `;

	page.setViewportSize({ width: 1200, height: 720 });

	await loadComponents({
		page,
		components,
	});
	await loadTemplate({
		page,
		template,
	});

	const testWrapper = await page.$('#wrapper');

	await page.waitForLoadState('networkidle');

	expect(await testWrapper?.screenshot())
		.toMatchSnapshot(
			'./snapshots/side-drawer.png',
		);
});

test('should show the component modal', async ({ page }: { page: Page }) => {
	const template = `
    <vwc-side-drawer open modal alternate>
      <div slot="header">
        Header
      </div>

      <vwc-text>
        Body
      </vwc-text>

      <vwc-layout slot="app-content" column-basis="block" gutters="small">
        <vwc-text>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mollis ante est, ac porta sapien rutrum in. Fusce id pulvinar massa.
            In est erat, gravida sed velit id, tempus tempus metus. Proin mollis auctor orci. Curabitur vestibulum elementum imperdiet.
            Mauris ac nisl vel nisi auctor sodales. Vestibulum vel rutrum leo, a convallis tellus.
            Aliquam vel ultricies elit, eget malesuada orci.
            Praesent ut blandit nisl. Morbi ut ligula faucibus ante pellentesque condimentum sit amet ac dui.
            Suspendisse potenti. Ut et massa arcu. Pellentesque pellentesque id tortor at ornare.
          </p>
        </vwc-text>
      </vwc-layout>
    </vwc-side-drawer>
  `;

	await loadComponents({
		page,
		components,
	});
	await loadTemplate({
		page,
		template,
	});

	const testWrapper = await page.$('#wrapper');

	await page.waitForLoadState('networkidle');

	expect(await testWrapper?.screenshot())
		.toMatchSnapshot(
			'./snapshots/side-drawer-modal.png',
		);
});
