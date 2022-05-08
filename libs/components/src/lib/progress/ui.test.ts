import {expect, test} from '@playwright/test';
import type {Page} from '@playwright/test';
import {
	loadComponents,
	loadTemplate,
} from '../../visual-tests/visual-tests-utils.ts';

const components = ['progress'];

test('should show the component', async ({page}: { page: Page }) => {
	const template = `
		<div style="margin: 5px;">
    <vwc-progress min="0" max="100" value="25" connotation="primary"></vwc-progress>
    <br/>
    <br/>
    <vwc-progress min="0" max="100" value="25" connotation="cta"></vwc-progress>
    <br/>
    <br/>
    <vwc-progress min="0" max="100" value="25" connotation="success"></vwc-progress>
    <br/>
    <br/>
    <vwc-progress min="0" max="100" value="25" connotation="alert"></vwc-progress>
    <br/>
    <br/>
    <vwc-progress min="0" max="100" value="25" connotation="pacific"></vwc-progress>
    <br/>
    <br/>
    <vwc-progress min="0" max="50" value="25" paused></vwc-progress>
    <br/>
    <br/>
    <vwc-progress min="0" max="50" value="indeterminate" paused></vwc-progress>
    <br/>
    <br/>
    <vwc-progress min="0" max="50" value="25" reverse></vwc-progress>
    <br/>
    <br/>
    <vwc-progress min="0" max="100" value="25" connotation="primary" shape="sharp"></vwc-progress>
    <br/>
    <br/>
    <vwc-progress min="0" max="100" value="25" connotation="cta" shape="sharp"></vwc-progress>
    <br/>
    <br/>
    <vwc-progress min="0" max="100" value="25" connotation="success" shape="sharp"></vwc-progress>
    <br/>
    <br/>
    <vwc-progress min="0" max="100" value="25" connotation="alert" shape="sharp"></vwc-progress>
    <br/>
    <br/>
    <vwc-progress min="0" max="100" value="25" connotation="pacific" shape="sharp"></vwc-progress>
    </div>
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
			'./snapshots/progress.png'
		);
});
