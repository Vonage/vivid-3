import type { Page } from '@playwright/test';
import { test } from '@playwright/test';
import {
	loadComponents,
	renderTemplate,
	takeScreenshot,
} from '../../visual-tests/visual-tests-utils.js';

const components = [
	'action-group',
	'button',
	'text-field',
	'layout',
	'divider',
];

test('should show the component', async ({ page }: { page: Page }) => {
	const template = `
			<style>
				#wrapper {
					width: 380px;
					height: 600px;
					padding: 12px;
				}
				.wrapper-div {
				display: grid;
				grid-template-columns: 360px;
				gap: 16px;
				}
				</style>


<div class="wrapper-div">
<vwc-action-group>
<vwc-button icon="reply-line"></vwc-button>
<vwc-button label="copy"></vwc-button>
<vwc-button label="paste"></vwc-button>
<vwc-button label="submit"></vwc-button>
</vwc-action-group>

<vwc-action-group appearance="fieldset">
<vwc-button label="edit"></vwc-button>
<vwc-button label="copy"></vwc-button>
<vwc-button label="paste"></vwc-button>
<vwc-button label="submit"></vwc-button>
</vwc-action-group>

<vwc-action-group appearance="ghost">
<vwc-button label="edit" appearance="filled"></vwc-button>
<vwc-button label="copy" appearance="filled"></vwc-button>
<vwc-button label="paste" appearance="filled"></vwc-button>
<vwc-button label="submit" appearance="filled"></vwc-button>
</vwc-action-group>

<vwc-action-group shape="pill">
<vwc-button label="edit" shape="pill"></vwc-button>
<vwc-button label="copy" shape="pill"></vwc-button>
<vwc-button label="paste" shape="pill"></vwc-button>
<vwc-button label="submit" shape="pill"></vwc-button>
</vwc-action-group>
<vwc-layout column-basis="block" column-spacing="small" style="--layout-grid-template-columns: 250px;">
<vwc-text-field
style="flex-grow: 1;"
name="username"
aria-label="Username"
placeholder="Username"
></vwc-text-field>
<vwc-action-group appearance="fieldset" tight>
<vwc-button icon="flag-uruguay"></vwc-button>
<vwc-text-field
appearance="ghost"
aria-label="Phone number"
placeholder="Phone number"
name="phone"
autocomplete=""
></vwc-text-field>
</vwc-action-group>
</vwc-layout>

<vwc-action-group appearance="fieldset">
<vwc-button icon="reply-line"></vwc-button>
<vwc-divider orientation="vertical"></vwc-divider>
<vwc-button icon="compose-line"></vwc-button>
</vwc-action-group>

<vwc-action-group shape="pill">
<vwc-button
label="Action"
appearance="ghost"
icon="chevron-down-solid"
icon-trailing
shape="pill"
></vwc-button>
<vwc-divider orientation="vertical"></vwc-divider>
<vwc-text-field
icon="search-line"
placeholder="Search..."
appearance="ghost"
shape="pill"
style="min-width: 160px;"
></vwc-text-field>
</vwc-action-group>

<vwc-action-group role="region" aria-label="Text Alignment">
<vwc-button
icon="align-left-line"
aria-label="Text Align Left"
onclick="onClick(event)"
></vwc-button>
<vwc-button
aria-pressed="true"
icon="align-center-line"
aria-label="Text Align Center"
appearance="filled"
onclick="onClick(event)"
></vwc-button>
<vwc-button
icon="align-right-line"
aria-label="Text Align Right"
onclick="onClick(event)"
></vwc-button>
</vwc-action-group>
</div>`;

	await page.setViewportSize({
		width: 380,
		height: 600,
	});

	await loadComponents({
		page,
		components,
	});
	await renderTemplate({
		page,
		template,
	});

	await takeScreenshot(page, 'action-group');
});
