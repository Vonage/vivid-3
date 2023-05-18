import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import {
	loadComponents,
	loadTemplate,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['toggletip'];

test('should show the component', async ({ page }: { page: Page }) => {
	const template = `
	<div style="padding: 20px 100px;">
		<vwc-button id="button1" icon="help-solid" shape="pill"></vwc-button>
		<vwc-toggletip open anchor="button1">My anchor is an ID</vwc-toggletip>
	</div>

	<div style="padding: 20px 100px;">
		<vwc-button id="button3" icon="help-solid" shape="pill"></vwc-button>
		<vwc-toggletip open anchor="button3" open>I'm open by default</vwc-toggletip>
	</div>

	<div style="padding: 20px 100px;">
		<vwc-button id="button4" icon="help-solid" shape="pill"></vwc-button>
		<vwc-toggletip open anchor="button4" headline="This is the headline">This is the content</vwc-toggletip>
	</div>

	<div style="padding: 50px 100px;">
		<vwc-button id="button6" icon="help-solid" shape="pill"></vwc-button>
		<vwc-toggletip open anchor="button6" placement="top">top</vwc-toggletip>
		<vwc-toggletip open anchor="button6" placement="right">right</vwc-toggletip>
		<vwc-toggletip open anchor="button6" placement="bottom">bottom</vwc-toggletip>
		<vwc-toggletip open anchor="button6" placement="left">left</vwc-toggletip>
	</div>

	<div style="padding: 50px 100px;">
		<vwc-button id="button7" icon="help-solid" shape="pill"></vwc-button>
		<vwc-toggletip open anchor="button7">
			This is a toggletip with action items
			<vwc-button appearance='outlined' label='Action' shape='pill' slot="action-items"></vwc-button>
			<vwc-button appearance='filled' label='Action' shape='pill' slot="action-items"></vwc-button>
		</vwc-toggletip>
	</div>
	`;

	page.setViewportSize({ width: 500, height: 720 });

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
		'./snapshots/toggletip.png'
	);
});
