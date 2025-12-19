import type { Page } from '@playwright/test';
import { test } from '@playwright/test';
import {
	loadComponents,
	renderTemplate,
	takeScreenshot,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['accordion', 'accordion-item', 'icon'];

test('should show the component', async ({ page }: { page: Page }) => {
	const template = ` <div style="margin: 5px;"><vwc-accordion expand-mode="multi">
	<vwc-accordion-item heading="Accordion item with heading"> Lorem Ipsum is simply dummy text of the printing and typesetting industry. </vwc-accordion-item>
</vwc-accordion>
</div> <div style="margin: 5px;"><vwc-accordion expand-mode="multi">
	<vwc-accordion-item heading="Click to toggle accordion item" expanded=""> Lorem Ipsum is simply dummy text of the printing and typesetting industry. </vwc-accordion-item>
</vwc-accordion>
</div> <div style="margin: 5px;"><vwc-accordion expand-mode="multi">
	<vwc-accordion-item heading="Accordion item without indicator" no-indicator=""> Lorem Ipsum is simply dummy text of the printing and typesetting industry. </vwc-accordion-item>
</vwc-accordion>
</div> <div style="margin: 5px;"><vwc-accordion expand-mode="multi">
	<vwc-accordion-item heading="Accordion item with metadata" meta="meta-data"> Lorem Ipsum is simply dummy text of the printing and typesetting industry. </vwc-accordion-item>
</vwc-accordion>
</div> <div style="margin: 5px;"><vwc-accordion expand-mode="multi">
	<vwc-accordion-item heading="Accordion item with icon">
		<vwc-icon slot="icon" name="chat-solid"></vwc-icon>
		Lorem Ipsum is simply dummy text of the printing and typesetting industry.
	</vwc-accordion-item>
</vwc-accordion>
</div> <div style="margin: 5px;"><vwc-accordion expand-mode="multi">
	<vwc-accordion-item heading="Accordion item with icon-trailing" icon="chat-solid" icon-trailing=""> Lorem Ipsum is simply dummy text of the printing and typesetting industry. </vwc-accordion-item>
</vwc-accordion>
</div> <div style="margin: 5px;">
    <vwc-layout gutters="small" column-basis="block"><vwc-accordion>
	<vwc-accordion-item heading="Ghost accordion item (default)"> This is the first item's accordion body. </vwc-accordion-item>
	<vwc-accordion-item heading="Ghost light accordion item" appearance="ghost-light" expanded=""> This is the second item's accordion body. </vwc-accordion-item>
	<vwc-accordion-item heading="Filled accordion item" appearance="filled"> This is the third item's accordion body. </vwc-accordion-item>
</vwc-accordion>
</vwc-layout>
</div> <div style="margin: 5px;"><vwc-accordion expand-mode="multi">
	<vwc-accordion-item heading="normal accordion item" meta="meta-data">
		<vwc-icon slot="icon" name="chat-solid"></vwc-icon>
		Lorem Ipsum is simply dummy text of the printing and typesetting industry.
	</vwc-accordion-item>
</vwc-accordion>
<hr>
<vwc-accordion expand-mode="multi">
	<vwc-accordion-item heading="condensed accordion item" size="condensed" meta="meta-data">
		<vwc-icon slot="icon" name="chat-solid"></vwc-icon>
		Lorem Ipsum is simply dummy text of the printing and typesetting industry.
	</vwc-accordion-item>
</vwc-accordion>
</div> <div style="margin: 5px;"><vwc-accordion expand-mode="multi">
	<vwc-accordion-item heading="Accordion item with icon">
		<vwc-icon slot="icon" name="check-circle-solid" connotation="success"></vwc-icon>
		Lorem Ipsum is simply dummy text of the printing and typesetting industry.
	</vwc-accordion-item>
</vwc-accordion>
</div> <div style="margin: 5px;">
    <vwc-layout gutters="small"><div><vwc-accordion expand-mode="multi">
	<vwc-accordion-item heading="Accordion item" expanded="">
		<span slot="heading">Accordion item <span class="highlight">(slotted)</span></span>
		Lorem Ipsum is simply dummy text of the printing and typesetting industry.
	</vwc-accordion-item>
</vwc-accordion>

<style>
	.highlight {
		color: var(--vvd-color-cta-500);
	}
</style>
</div></vwc-layout>
</div> <div style="margin: 5px;">
    <vwc-layout gutters="small"><div><vwc-accordion expand-mode="multi">
	<vwc-accordion-item heading="Accordion item" meta="Meta data" expanded="">
		<span slot="heading">Accordion item (slotted)</span>
		<span slot="meta">Meta(slotted)</span>
		Lorem Ipsum is simply dummy text of the printing and typesetting industry.
	</vwc-accordion-item>
</vwc-accordion>
</div></vwc-layout>
</div> <div style="margin: 5px;"><vwc-accordion expand-mode="multi" style="--accordion-item-meta-inline-size: 230px;">
	<vwc-accordion-item heading="Accordion item" meta="meta-data with custom width"> Lorem Ipsum is simply dummy text of the printing and typesetting industry. </vwc-accordion-item>
</vwc-accordion>
</div>`;

	await page.setViewportSize({ width: 600, height: 1000 });

	await loadComponents({
		page,
		components,
	});
	await renderTemplate({
		page,
		template,
		setup: async () => {
			await page.keyboard.press('Tab');
		},
	});

	await takeScreenshot(page, 'accordion-item');
});
