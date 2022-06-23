import * as path from 'path';
import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import {
	extractHTMLBlocksFromReadme,
	loadComponents,
	loadTemplate,
} from '../../visual-tests/visual-tests-utils.ts';

const components = ['header', 'button', 'text', 'side-drawer', 'sidenav-item', 'layout'];

test('should show the component', async ({ page }: { page: Page }) => {
	const template = extractHTMLBlocksFromReadme(
		path.join(new URL('.', import.meta.url).pathname, 'README.md')
	).reduce(
		(htmlString: string, block: string) =>
			`${htmlString} <div style="margin: 5px;">${block}</div>`,
		''
	);

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

	expect(await testWrapper?.screenshot()).toMatchSnapshot(
		'./snapshots/header.png'
	);
});

test('should add elevation to fixed header when scrolled', async ({ page }: { page: Page }) => {
	const template = `
	<vwc-header heading="Fixed Header" fixed>
	<vwc-layout slot="app-content" column-basis="block" gutters="medium">
	  <vwc-text tight font-face="headline-2">
		<h2>
		  Scroll to see the effect.
		</h2>
	  </vwc-text>
  
	  <vwc-text font-face="body-1">
		<p>
		  Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mollis ante est, ac porta sapien rutrum in. Fusce id pulvinar massa. 
		  In est erat, gravida sed velit id, tempus tempus metus. Proin mollis auctor orci. 
		  Curabitur vestibulum elementum imperdiet. Mauris ac nisl vel nisi auctor sodales. 
		  Vestibulum vel rutrum leo, a convallis tellus. Aliquam vel ultricies elit, eget malesuada orci. Praesent ut blandit nisl.
		   Morbi ut ligula faucibus ante pellentesque condimentum sit amet ac dui. Suspendisse potenti. Ut et massa arcu.
		    Pellentesque pellentesque id tortor at ornare.
		</p>
	  </vwc-text>
  
	  <vwc-text font-face="body-1">
		<p>
		  Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mollis ante est, ac porta sapien rutrum in.
		   Fusce id pulvinar massa. In est erat, gravida sed velit id, tempus tempus metus.
		    Proin mollis auctor orci. Curabitur vestibulum elementum imperdiet. 
			Mauris ac nisl vel nisi auctor sodales. Vestibulum vel rutrum leo, a convallis tellus.
			 Aliquam vel ultricies elit, eget malesuada orci. Praesent ut blandit nisl.
			  Morbi ut ligula faucibus ante pellentesque condimentum sit amet ac dui. Suspendisse potenti.
			   Ut et massa arcu. Pellentesque pellentesque id tortor at ornare.
		</p>
	  </vwc-text>
	</vwc-layout>
  </vwc-header>
	`;

	await loadComponents({
		page,
		components,
	});
	await loadTemplate({
		page,
		template,
	});

	await page.waitForLoadState('networkidle');
	const element = await page.locator('vwc-header');

	await page.mouse.wheel(0, 50)
	expect(await element.locator('.elevated')).toBeDefined();

});

