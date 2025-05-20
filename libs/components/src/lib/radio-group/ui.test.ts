import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import {
	loadComponents,
	loadTemplate,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['radio-group', 'radio', 'button'];

test.describe('radio-group', () => {
	test('should show the component', async ({ page }: { page: Page }) => {
		const template = `
				<style>
					#wrapper {
						width: 200px;
						height: 580px;
						padding: 12px;
					}
					.wrapper-div {
					display: grid;
					grid-template-columns: 1fr;
					gap: 16px;
					}
					</style>
	<div class="wrapper-div">
	<vwc-radio-group label="Pick a number" name="number">
	<vwc-radio label="1" value="1"></vwc-radio>
	<vwc-radio label="2" value="2"></vwc-radio>
	<vwc-radio label="3" value="3"></vwc-radio>
	</vwc-radio-group>
	
	<vwc-radio-group label="Pick a number" name="number" helper-text="Helper text">
	<vwc-radio label="1" value="1"></vwc-radio>
	<vwc-radio label="2" value="2"></vwc-radio>
	<vwc-radio label="3" value="3"></vwc-radio>
	</vwc-radio-group>
	
	<vwc-radio-group label="Pick a number" name="number">
	<vwc-radio label="1" value="1"></vwc-radio>
	<vwc-radio label="2" value="2"></vwc-radio>
	<vwc-radio label="3" value="3"></vwc-radio>
	<div slot="helper-text">Slotted helper text</div>
	</vwc-radio-group>
	
	<vwc-radio-group label="Pick a number" name="number" error-text="Error text">
	<vwc-radio label="1" value="1"></vwc-radio>
	<vwc-radio label="2" value="2"></vwc-radio>
	<vwc-radio label="3" value="3"></vwc-radio>
	</vwc-radio-group>
	
	<vwc-radio-group label="Pick a number" name="number" disabled>
	<vwc-radio label="1" value="1" checked></vwc-radio>
	<vwc-radio label="2" value="2"></vwc-radio>
	<vwc-radio label="3" value="3"></vwc-radio>
	</vwc-radio-group>
	
	<vwc-radio-group label="Pick a number" name="number" readonly>
	<vwc-radio label="1" value="1" checked></vwc-radio>
	<vwc-radio label="2" value="2"></vwc-radio>
	<vwc-radio label="3" value="3"></vwc-radio>
	</vwc-radio-group>
	
	<vwc-radio-group label="Pick a number" name="number" orientation="vertical">
	<vwc-radio label="1" value="1"></vwc-radio>
	<vwc-radio label="2" value="2"></vwc-radio>
	<vwc-radio label="3" value="3"></vwc-radio>
	</vwc-radio-group>
	</div>`;

		page.setViewportSize({ width: 200, height: 580 });

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
			'snapshots/radio-group.png'
		);
	});

	test.describe('form association', async () => {
		test.beforeEach(async ({ page }: { page: Page }) => {
			await loadComponents({
				page,
				components,
			});
		});

		test('should have a validation error when required constraint is violated', async ({
			page,
		}: {
			page: Page;
		}) => {
			await loadTemplate({
				page,
				template: `
				<form>
					<vwc-radio-group orientation="horizontal" name="chosenValue" required>
						<vwc-radio label="1" value="1"></vwc-radio>
						<vwc-radio label="2" value="2"></vwc-radio>
						<vwc-radio label="3" value="3"></vwc-radio> 
					</vwc-radio-group>
					<button type="submit">Submit</button>
				</form>`,
			});

			await page.getByRole('button', { name: 'Submit' }).click();

			const errorMsg = page.locator('vwc-radio-group .error-message');

			await expect(errorMsg).toBeVisible();
			await expect(errorMsg).toContainText(/select one of these options/i);
		});
	});
});
