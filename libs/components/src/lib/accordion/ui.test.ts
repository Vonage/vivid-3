import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import {
	loadComponents,
	loadTemplate,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['accordion', 'accordion-item'];

test('should show the component', async ({ page }: { page: Page }) => {
	const template = `
		<div style="margin: 5px;">
			<vwc-accordion>
				<vwc-accordion-item heading="Accordion item 1">
					This is the first item's accordion body.
				</vwc-accordion-item>
				<vwc-accordion-item heading="Accordion item 2">
					This is the second item's accordion body.
				</vwc-accordion-item>
				<vwc-accordion-item heading="Accordion item 3">
					This is the third item's accordion body.
				</vwc-accordion-item>
				<vwc-accordion-item heading="Accordion item 4">
					This is the fourth item's accordion body.
				</vwc-accordion-item>
			</vwc-accordion>
		</div>
		<div style="margin: 5px;">
			<vwc-accordion expand-mode="multi">
				<vwc-accordion-item heading="Accordion item 1" expanded>
					This is the first item's accordion body.
				</vwc-accordion-item>
				<vwc-accordion-item heading="Accordion item 2">
					This is the second item's accordion body.
				</vwc-accordion-item>
				<vwc-accordion-item heading="Accordion item 3">
					This is the third item's accordion body.
				</vwc-accordion-item>
				<vwc-accordion-item heading="Accordion item 4">
					This is the fourth item's accordion body.
				</vwc-accordion-item>
			</vwc-accordion>
		</div>
	`;

	await page.setViewportSize({ width: 500, height: 720 });

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
		'./snapshots/accordion.png'
	);
});
