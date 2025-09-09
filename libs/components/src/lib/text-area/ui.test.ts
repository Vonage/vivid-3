import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import {
	loadComponents,
	loadTemplate,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['text-area', 'contextual-help'];

test('should show the component', async ({ page }: { page: Page }) => {
	const template = `
			<style>
				#wrapper {
					width: 200px;
					height: 1760px;
					padding: 12px;
				}
				.wrapper-div {
				display: grid;
				grid-template-columns: 1fr;
				gap: 16px;
				}
				</style>
<div class="wrapper-div">
<vwc-text-area
label="Label"
rows="2"
value="This is the text we want to see!"
></vwc-text-area>
<vwc-text-area label="My Label"></vwc-text-area>
<vwc-text-area placeholder="My Placeholder"></vwc-text-area>
<vwc-text-area value="You can't resize me by default"></vwc-text-area>
<vwc-text-area value="Default Value"></vwc-text-area>
<vwc-text-area
value="You can resize me vertically"
resize="vertical"
></vwc-text-area>
<vwc-text-area
value="You can resize me horizontally"
resize="horizontal"
></vwc-text-area>
<vwc-text-area
value="You can resize me in both directions"
resize="both"
></vwc-text-area>
<vwc-text-area
label="Helper text below"
helper-text="Help text"
></vwc-text-area>
<vwc-text-area
label="Success text below"
success-text="Success text"
></vwc-text-area>
<vwc-text-area
value="some text"
label="Enter some text"
error-text="Please take this seriously"
></vwc-text-area>
<vwc-text-area
label="Char count example"
char-count
maxlength="15"
></vwc-text-area>
<vwc-text-area disabled value="disabled" label="fieldset"></vwc-text-area>
<vwc-text-area readonly value="readonly text" label="fieldset"></vwc-text-area>
<vwc-text-area rows="1" value="1 row text area"></vwc-text-area>
<vwc-text-area rows="2" value="2 rows text area"></vwc-text-area>
<vwc-text-area rows="3" value="3 rows text area"></vwc-text-area>
<vwc-text-area label="Description">
<span slot="helper-text">Please ensure you provide the <a href="#">required details</a>.</span>
</vwc-text-area>
<vwc-text-area label="My Label">
<vwc-contextual-help slot="contextual-help">This is the contextual help</vwc-contextual-help>
</vwc-text-area>

</div>

`;
	await page.setViewportSize({ width: 300, height: 1760 });

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
		'snapshots/text-area.png'
	);
});

test.describe('max/min length validation', () => {
	test.beforeEach(async ({ page }: { page: Page }) => {
		await loadComponents({
			page,
			components,
		});
		await loadTemplate({
			page,
			template: `
				<vwc-text-area minlength='3' value='t'></vwc-text-area>
				<vwc-text-area maxlength='1' value='test'></vwc-text-area>
			`,
		});
	});

	test('should ignore min/max length validation when user has not interacted with the field', async ({
		page,
	}: {
		page: Page;
	}) => {
		expect(
			await page
				.locator('vwc-text-area[minlength]')
				.evaluate((node: HTMLInputElement) => node.checkValidity())
		).toBe(true);
		expect(
			await page
				.locator('vwc-text-area[maxlength]')
				.evaluate((node: HTMLInputElement) => node.checkValidity())
		).toBe(true);
	});

	test('should apply min/max length constraints after a user has interacted with the field', async ({
		page,
	}: {
		page: Page;
	}) => {
		await page.locator('vwc-text-area[minlength] textarea').fill('te');
		await page.locator('vwc-text-area[maxlength] textarea').press('Backspace');

		expect(
			await page
				.locator('vwc-text-area[minlength]')
				.evaluate((node: HTMLInputElement) => node.checkValidity())
		).toBe(false);
		expect(
			await page
				.locator('vwc-text-area[maxlength]')
				.evaluate((node: HTMLInputElement) => node.checkValidity())
		).toBe(false);
	});
});
