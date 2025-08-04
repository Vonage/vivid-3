import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';
import { vividPlaywright } from '../playwright';
import { testCases } from './test-cases';

for (const testCase of testCases) {
	test(testCase.name, async ({ page }: { page: Page }) => {
		await page.goto(`http://localhost:5173/${testCase.path}/`);
		const vvd = vividPlaywright(page, expect);

		await testCase.test(vvd);

		await expect(page.locator('pre')).toContainText(
			JSON.stringify(testCase.expectedState)
		);
	});
}
