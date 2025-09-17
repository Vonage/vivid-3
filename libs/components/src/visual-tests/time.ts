import type { Page } from '@playwright/test';

// See https://github.com/microsoft/playwright/issues/6347
export async function useFakeTime(page: Page, fakeNow: number) {
	await page.addInitScript(`{
		// Extend Date constructor to default to fakeNow
		Date = class extends Date {
			constructor(...args) {
				if (args.length === 0) {
					super(${fakeNow});
				} else {
					super(...args);
				}
			}
		}
		// Override Date.now() to start from fakeNow
		const __DateNowOffset = ${fakeNow} - Date.now();
		const __DateNow = Date.now;
		Date.now = () => __DateNow() + __DateNowOffset;
	}`);
}
