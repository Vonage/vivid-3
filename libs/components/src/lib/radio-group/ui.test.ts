import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';
import {
	loadComponents,
	renderTemplate,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['radio-group', 'radio', 'button'];

test.describe('radio-group', () => {
	test.describe('form association', () => {
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
			await renderTemplate({
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

			const errorMsg = page.locator(
				'vwc-radio-group vwc-feedback-message[type="error"]'
			);

			await expect(errorMsg).toBeVisible();
			await expect(errorMsg).toContainText(/select one of these options/i);
		});
	});
});
