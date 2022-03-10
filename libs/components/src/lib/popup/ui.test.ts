import * as path from 'path';
import { expect, Page, test } from '@playwright/test';
import {
	extractHTMLBlocksFromReadme,
	loadComponent,
	loadTemplate
} from '../../visual-tests/visual-tests-utils';

const popupStyle = `<style>
.content {
  width: 200px;
  text-align: left;
  padding: 1rem;
  }
.line {
  border-bottom: 1px solid var(--vvd-color-neutral-40);
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;
}
.wrapper{
  position: relative;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--vvd-color-neutral-10);
}
</style>`;

const componentName = 'popup';
test('should have all connotations', async ({ page }: { page: Page }) => {
	const template = extractHTMLBlocksFromReadme(path.join(__dirname, 'README.md'))
		.reduce((htmlString: string, block: string) => `${htmlString} ${popupStyle} <div style="margin: 5px;">${block}</div>`, '');

	await loadComponent({
		page,
		componentName,
	});
	await loadTemplate({
		page,
		template,
	});

	const testWrapper = await page.$('#wrapper');

	await page.waitForLoadState('networkidle');

	expect(await testWrapper?.screenshot())
		.toMatchSnapshot(
			'./snapshots/popup.png',
		);
});
