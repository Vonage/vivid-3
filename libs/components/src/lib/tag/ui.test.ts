import type { Page } from '@playwright/test';
import { test } from '@playwright/test';
import {
	loadComponents,
	renderTemplate,
	takeScreenshot,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['tag'];

test('should show the component', async ({ page }: { page: Page }) => {
	const template =
		'<style>#wrapper{height: 250px; width: 1600px; display: flex; flex-wrap: wrap;}</style>' +
		` <div style="margin: 5px;">
    <vwc-layout gutters="small"><div><vwc-tag-group>
	<vwc-tag label="tag"></vwc-tag>
</vwc-tag-group>
</div></vwc-layout>
</div> <div style="margin: 5px;">
    <vwc-layout gutters="small"><div><vwc-tag-group>
	<vwc-tag label="rounded" shape="rounded"></vwc-tag>
	<vwc-tag label="pill" shape="pill"></vwc-tag>
</vwc-tag-group>
</div></vwc-layout>
</div> <div style="margin: 5px;">
    <vwc-layout gutters="small"><div><vwc-tag-group>
	<vwc-tag label="icon">
		<vwc-icon slot="icon" name="pin-line"></vwc-icon>
	</vwc-tag>
</vwc-tag-group>
</div></vwc-layout>
</div> <div style="margin: 5px;">
    <vwc-layout gutters="small"><div><vwc-tag-group>
	<vwc-tag label="subtle" appearance="subtle"></vwc-tag>
	<vwc-tag label="subtle-light" appearance="subtle-light"></vwc-tag>
	<vwc-tag label="duotone" appearance="duotone"></vwc-tag>
</vwc-tag-group>
</div></vwc-layout>
</div> <div style="margin: 5px;">
    <vwc-layout gutters="small"><div><vwc-tag-group>
	<vwc-tag label="Accent" appearance="subtle" connotation="accent"></vwc-tag>
	<vwc-tag label="CTA" appearance="subtle" connotation="cta"></vwc-tag>
</vwc-tag-group>
<p>Subtle-Light Tag with connotation</p>
<vwc-tag-group>
	<vwc-tag label="Accent" appearance="subtle-light" connotation="accent"></vwc-tag>
	<vwc-tag label="CTA" appearance="subtle-light" connotation="cta"></vwc-tag>
</vwc-tag-group>
<p>Duotone Tag with connotation</p>
<vwc-tag-group>
	<vwc-tag label="Accent" appearance="duotone" connotation="accent"></vwc-tag>
	<vwc-tag label="CTA" appearance="duotone" connotation="cta"></vwc-tag>
</vwc-tag-group>
</div></vwc-layout>
</div> <div style="margin: 5px;">
    <vwc-layout gutters="small"><div><vwc-tag-group>
	<vwc-tag label="accent" appearance="duotone" connotation="accent"></vwc-tag>
	<vwc-tag label="cta" appearance="duotone" connotation="cta"></vwc-tag>
</vwc-tag-group>
</div></vwc-layout>
</div> <div style="margin: 5px;">
    <vwc-layout gutters="small"><div><vwc-tag-group>
	<vwc-tag label="disabled" disabled=""></vwc-tag>
</vwc-tag-group>
</div></vwc-layout>
</div> <div style="margin: 5px;">
    <vwc-layout gutters="small"><div><vwc-tag-group>
	<vwc-tag appearance="subtle" label="First tag" selectable="" selected=""></vwc-tag>
	<vwc-tag appearance="subtle-light" label="Second tag" selectable="" selected=""></vwc-tag>
	<vwc-tag appearance="duotone" label="Third tag" selectable="" selected=""></vwc-tag>
</vwc-tag-group>
</div></vwc-layout>
</div> <div style="margin: 5px;">
    <vwc-layout gutters="small"><div><vwc-tag-group>
	<vwc-tag label="removable" removable=""></vwc-tag>
</vwc-tag-group>
</div></vwc-layout>
</div> <div style="margin: 5px;">
    <vwc-layout gutters="small"><div><vwc-tag-group>
	<vwc-tag label="with icon">
		<vwc-icon slot="icon" name="heart-solid" connotation="alert"></vwc-icon>
	</vwc-tag>
</vwc-tag-group>
</div></vwc-layout>
</div>`;

	await loadComponents({
		page,
		components,
	});
	await renderTemplate({
		page,
		template,
		setup: async () => {
			await page.locator('vwc-tag').nth(1).focus();
		},
	});

	await takeScreenshot(page, 'tag');
});
