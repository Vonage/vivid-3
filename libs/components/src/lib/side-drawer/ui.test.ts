import type { Page } from '@playwright/test';
import { test } from '@playwright/test';
import {
	loadComponents,
	renderTemplate,
	takeScreenshot,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['side-drawer', 'layout'];
test('should show the component', async ({ page }: { page: Page }) => {
	const template = `
    <vwc-side-drawer open>
      <p>
        Body
      </p>

      <vwc-layout slot="app-content" column-basis="block" gutters="small">
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mollis ante est, ac porta sapien rutrum in.
					Fusce id pulvinar massa. In est erat, gravida sed velit id, tempus tempus metus. Proin mollis auctor orci.
					Curabitur vestibulum elementum imperdiet.
					Mauris ac nisl vel nisi auctor sodales. Vestibulum vel rutrum leo, a convallis tellus.
					Aliquam vel ultricies elit, eget malesuada orci.
					Praesent ut blandit nisl. Morbi ut ligula faucibus ante pellentesque condimentum sit amet ac dui.
					Suspendisse potenti. Ut et massa arcu. Pellentesque pellentesque id tortor at ornare.
				</p>
      </vwc-layout>
    </vwc-side-drawer>
  `;

	page.setViewportSize({ width: 900, height: 300 });

	await loadComponents({
		page,
		components,
	});
	await renderTemplate({
		page,
		template,
	});

	await takeScreenshot(page, 'side-drawer');
});

test('should show the component modal', async ({ page }: { page: Page }) => {
	const template = `
    <vwc-side-drawer open modal alternate>
      <p>
        Body
      </p>

      <vwc-layout slot="app-content" column-basis="block" gutters="small">
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mollis ante est, ac porta sapien rutrum in.
					Fusce id pulvinar massa. In est erat, gravida sed velit id, tempus tempus metus.
					Proin mollis auctor orci. Curabitur vestibulum elementum imperdiet.
					Mauris ac nisl vel nisi auctor sodales. Vestibulum vel rutrum leo, a convallis tellus.
					Aliquam vel ultricies elit, eget malesuada orci.
					Praesent ut blandit nisl. Morbi ut ligula faucibus ante pellentesque condimentum sit amet ac dui.
					Suspendisse potenti. Ut et massa arcu. Pellentesque pellentesque id tortor at ornare.
				</p>
      </vwc-layout>
    </vwc-side-drawer>
  `;

	page.setViewportSize({ width: 900, height: 300 });

	await loadComponents({
		page,
		components,
	});

	await renderTemplate({
		page,
		template,
	});

	await takeScreenshot(page, 'side-drawer-modal');
});
