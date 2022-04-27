import { expect, Page, test } from '@playwright/test';
import {
	loadComponents,
	loadTemplate,
} from '../../visual-tests/visual-tests-utils';

const components = ['progress-ring'];

test('should show the component', async ({ page }: { page: Page }) => {
	const template = `
	  <vwc-progress-ring min="0" max="100" value="50"></vwc-progress-ring>
	  <vwc-progress-ring min="0" max="100" value="33"></vwc-progress-ring>
	  <vwc-progress-ring min="0" max="100" value="66"></vwc-progress-ring>
	  <vwc-progress-ring min="0" max="100" value="77" paused></vwc-progress-ring>
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

	expect(await testWrapper?.screenshot()).toMatchSnapshot(
		'./snapshots/progress-ring.png'
	);
});
