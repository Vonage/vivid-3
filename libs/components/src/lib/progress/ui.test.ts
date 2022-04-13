import {expect, Page, test} from '@playwright/test';
import {
	loadComponents,
	loadTemplate,
} from '../../visual-tests/visual-tests-utils';

const components = ['progress'];

test('should show the component', async ({page}: { page: Page }) => {
	const template = `
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
    <vwc-progress min="0" max="100" value="25" connotation="primary" shape="rounded"></vwc-progress>
    <br/>
    <br/>
    <vwc-progress min="0" max="100" value="25" connotation="cta" shape="rounded"></vwc-progress>
    <br/>
    <br/>
    <vwc-progress min="0" max="100" value="25" connotation="success" shape="rounded"></vwc-progress>
    <br/>
    <br/>
    <vwc-progress min="0" max="100" value="25" connotation="alert" shape="rounded"></vwc-progress>
    <br/>
    <br/>
    <vwc-progress min="0" max="100" value="25" connotation="pacific" shape="rounded"></vwc-progress>
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
