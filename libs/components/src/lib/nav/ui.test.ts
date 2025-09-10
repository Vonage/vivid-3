import type { Page } from '@playwright/test';
import { test } from '@playwright/test';
import {
	loadComponents,
	renderTemplate,
	takeScreenshot,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['nav', 'nav-item', 'badge', 'icon'];

test('should show the component', async ({ page }: { page: Page }) => {
	const template = `
		<style>
			.wrapper {
				width: 300px;
				height: 400px;
				position: relative;
			}
		</style>

		<div class="wrapper">
			<vwc-nav>
				<vwc-nav-item href="#" icon="profile" text="Account" onclick="onClick(this)" current></vwc-nav-item>
				<vwc-nav-item href="#" icon="inbox-line" text="Inbox" onclick="onClick(this)">
					<vwc-badge slot="meta" text="21" connotation="alert" appearance="subtle" shape="pill"></vwc-badge>
				</vwc-nav-item>
				<vwc-nav-item href="#" icon="ai" text="AI Studio" onclick="onClick(this)">
					<vwc-badge slot="meta" text="new" connotation="success" appearance="subtle" shape="pill"></vwc-badge>
				</vwc-nav-item>
				<vwc-nav-item href="#" icon="books-line" text="Documentation" onclick="onClick(this)">
					<vwc-icon slot="meta" name="open-solid"></vwc-icon>
				</vwc-nav-item>
			</vwc-nav>
		</div>`;

	page.setViewportSize({ width: 400, height: 500 });

	await loadComponents({
		page,
		components,
	});
	await renderTemplate({
		page,
		template,
	});

	await takeScreenshot(page, 'nav');
});
