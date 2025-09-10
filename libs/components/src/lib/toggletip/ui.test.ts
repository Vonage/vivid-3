import type { Page } from '@playwright/test';
import { test } from '@playwright/test';
import {
	loadComponents,
	renderTemplate,
	takeScreenshot,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['toggletip'];

test('should show the component', async ({ page }: { page: Page }) => {
	const template = `
	<div style="padding: 20px 100px;">
		<vwc-toggletip open anchor="button1">
		My anchor is an ID
				<vwc-button slot="anchor" id="button1" icon="help-solid" shape="pill"></vwc-button>
		</vwc-toggletip>
	</div>

	<div style="padding: 20px 100px;">
		<vwc-toggletip open anchor="button3" open>
		<vwc-button slot="anchor"  icon="help-solid" shape="pill"></vwc-button>
		I'm open by default
		</vwc-toggletip>
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

	<div style="padding: 50px 100px; display: grid; place-content: center;">
		<vwc-toggletip open placement="bottom" style="--toggletip-max-inline-size: none">
			<vwc-button icon="help-solid" slot="anchor" shape="pill"></vwc-button>
				This is a toggletip with action items and a very long text with no 30ch default max-inline of the toggle tip
		</vwc-toggletip>
	</div>

	<div style="padding: 50px 100px; display: grid; place-content: center; block-size: 200px;">
		<vwc-toggletip open placement="bottom">
			<vwc-button icon="help-solid" slot="anchor" shape="pill"></vwc-button>
				This is a toggletip with action items and a very long text with the 30ch default max-inline of the toggle tip
		</vwc-toggletip>
	</div>
	`;

	page.setViewportSize({ width: 720, height: 1300 });

	await loadComponents({
		page,
		components,
	});
	await renderTemplate({
		page,
		template,
	});

	await takeScreenshot(page, 'toggletip');
});
