import type { Page } from '@playwright/test';
import { test } from '@playwright/test';
import {
	loadComponents,
	renderTemplate,
	takeScreenshot,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['progress'];

test('should show the component', async ({ page }: { page: Page }) => {
	const template = `
		<div style="margin: 5px;">
    <vwc-progress min="0" max="100" value="25" connotation="accent"></vwc-progress>
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
    <vwc-progress min="0" max="100" value="25" connotation="accent" shape="sharp"></vwc-progress>
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

	page.setViewportSize({ width: 200, height: 720 });

	await loadComponents({
		page,
		components,
	});
	await renderTemplate({
		page,
		template,
	});

	await takeScreenshot(page, 'progress');
});
