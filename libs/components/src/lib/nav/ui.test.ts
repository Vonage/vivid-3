import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import {
	loadComponents,
	loadTemplate,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['nav', 'nav-item', 'badge', 'icon'];

test('should show the component', async ({ page }: { page: Page }) => {
	const template = `<vwc-nav>
	<vwc-nav-item href="#" icon="profile" text="Account" onclick="onClick(this)" aria-current="page" ></vwc-nav-item>
	<vwc-nav-item href="#" icon="inbox-line" text="Inbox" onclick="onClick(this)">
		  <vwc-badge slot="meta" text="21" connotation="alert" appearance="subtle" shape="pill"></vwc-badge>
	  </vwc-nav-item>
	<vwc-nav-item href="#" icon="ai" text="AI Studio" onclick="onClick(this)">
		  <vwc-badge slot="meta" text="new" connotation="success" appearance="subtle" shape="pill"></vwc-badge>
	  </vwc-nav-item>
	  <vwc-nav-item href="#" icon="books-line" text="Documentation" onclick="onClick(this)">
		  <vwc-icon slot="meta" name="open-solid"></vwc-icon>
	  </vwc-nav-item>
  </vwc-nav>`;

	page.setViewportSize({ width: 200, height: 720 });

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
		'./snapshots/nav.png'
	);
});
