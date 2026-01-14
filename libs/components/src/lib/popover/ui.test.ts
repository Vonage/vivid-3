import type { Page } from '@playwright/test';
import { test } from '@playwright/test';
import {
	loadComponents,
	renderTemplate,
	takeScreenshot,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['popover', 'button', 'icon', 'switch'];

test('should show the component', async ({ page }: { page: Page }) => {
	const template = `
		<style>
			.grid {
				display: grid;
				grid-template-columns: repeat(3, 300px);
				gap: 12px;
				padding: 12px;
			}
			.cell {
				display: flex;
				align-items: center;
				justify-content: center;
				height: 400px;
        width: 100%;
				background-color: #eee;
				padding: 12px;
				border-radius: 8px;
        box-sizing: border-box;
			}
		</style>
		<div class="grid">
      <div class="cell">
				<vwc-popover open manual aria-label="Default">
					<vwc-button slot="anchor" appearance="filled" label="Default"></vwc-button>
					<div>Default Popover</div>
				</vwc-popover>
			</div>
			<div class="cell">
				<vwc-popover open manual condensed aria-label="Condensed">
					<vwc-button slot="anchor" appearance="filled" label="Condensed"></vwc-button>
					<div>Condensed Popover</div>
				</vwc-popover>
			</div>
			<div class="cell">
				<vwc-popover open manual alternate aria-label="Alternate">
					<vwc-button slot="anchor" appearance="filled" label="Alternate"></vwc-button>
					<div>Alternate Popover</div>
				</vwc-popover>
			</div>
			<div class="cell">
				<vwc-popover open manual arrow aria-label="Arrow">
					<vwc-button slot="anchor" appearance="filled" label="Arrow"></vwc-button>
					<div>With Arrow</div>
				</vwc-popover>
			</div>
			<div class="cell">
				<vwc-popover open manual aria-label="Manual">
					<vwc-button slot="anchor" appearance="filled" label="Manual"></vwc-button>
					<div>Manual Dismiss</div>
				</vwc-popover>
			</div>
			<div class="cell">
				<vwc-popover open manual offset="24" aria-label="Offset">
					<vwc-button slot="anchor" appearance="filled" label="Offset 24"></vwc-button>
					<div>Offset 24px</div>
				</vwc-popover>
			</div>
      <div class="cell">
				<vwc-popover open manual aria-label="Footer">
					<vwc-button slot="anchor" appearance="filled" label="Footer"></vwc-button>
					<div>With Footer</div>
          <div slot="footer">Footer content</div>
				</vwc-popover>
			</div>
		</div>
	`;

	await page.setViewportSize({ width: 1000, height: 1200 });

	await loadComponents({
		page,
		components,
	});
	await renderTemplate({
		page,
		template,
	});

	await takeScreenshot(page, 'popover');
});

test('should show all placements', async ({ page }: { page: Page }) => {
	const template = `
		<style>
			.grid {
				display: grid;
				grid-template-columns: repeat(3, 560px);
				gap: 12px;
				padding: 12px;
			}
			.cell {
				display: flex;
				align-items: center;
				justify-content: center;
				height: 300px;
        width: 100%;
				background-color: #eee;
				padding: 12px;
				border-radius: 8px;
        box-sizing: border-box;
			}
		</style>
		<div class="grid">
      <div class="cell">
				<vwc-popover open manual placement="top-start" arrow aria-label="Top Start">
					<vwc-button slot="anchor" appearance="filled" label="Top Start"></vwc-button>
					<div><strong>Placement:</strong> Top Start</div>
				</vwc-popover>
			</div>
			<div class="cell">
				<vwc-popover open manual placement="top" arrow aria-label="Top">
					<vwc-button slot="anchor" appearance="filled" label="Top"></vwc-button>
					<div><strong>Placement:</strong> Top</div>
				</vwc-popover>
			</div>
			<div class="cell">
				<vwc-popover open manual placement="top-end" arrow aria-label="Top End">
					<vwc-button slot="anchor" appearance="filled" label="Top End"></vwc-button>
					<div><strong>Placement:</strong> Top End</div>
				</vwc-popover>
			</div>
			<div class="cell">
				<vwc-popover open manual placement="bottom-start" arrow aria-label="Bottom Start">
					<vwc-button slot="anchor" appearance="filled" label="Bottom Start"></vwc-button>
					<div><strong>Placement:</strong> Bottom Start</div>
				</vwc-popover>
			</div>
			<div class="cell">
				<vwc-popover open manual placement="bottom" arrow aria-label="Bottom">
					<vwc-button slot="anchor" appearance="filled" label="Bottom"></vwc-button>
					<div><strong>Placement:</strong> Bottom</div>
				</vwc-popover>
			</div>
			<div class="cell">
				<vwc-popover open manual placement="bottom-end" arrow aria-label="Bottom End">
					<vwc-button slot="anchor" appearance="filled" label="Bottom End"></vwc-button>
					<div><strong>Placement:</strong> Bottom End</div>
				</vwc-popover>
			</div>
			<div class="cell">
				<vwc-popover open manual placement="right-start" arrow aria-label="Right Start">
					<vwc-button slot="anchor" appearance="filled" label="Right Start"></vwc-button>
					<div><strong>Placement:</strong> Right Start</div>
				</vwc-popover>
			</div>
			<div class="cell">
				<vwc-popover open manual placement="right" arrow aria-label="Right">
					<vwc-button slot="anchor" appearance="filled" label="Right"></vwc-button>
					<div><strong>Placement:</strong> Right</div>
				</vwc-popover>
			</div>
			<div class="cell">
				<vwc-popover open manual placement="right-end" arrow aria-label="Right End">
					<vwc-button slot="anchor" appearance="filled" label="Right End"></vwc-button>
					<div><strong>Placement:</strong> Right End</div>
				</vwc-popover>
			</div>
			<div class="cell">
				<vwc-popover open manual placement="left-start" arrow aria-label="Left Start">
					<vwc-button slot="anchor" appearance="filled" label="Left Start"></vwc-button>
					<div><strong>Placement:</strong> Left Start</div>
				</vwc-popover>
			</div>
			<div class="cell">
				<vwc-popover open manual placement="left" arrow aria-label="Left">
					<vwc-button slot="anchor" appearance="filled" label="Left"></vwc-button>
					<div><strong>Placement:</strong> Left</div>
				</vwc-popover>
			</div>
			<div class="cell">
				<vwc-popover open manual placement="left-end" arrow aria-label="Left End">
					<vwc-button slot="anchor" appearance="filled" label="Left End"></vwc-button>
					<div><strong>Placement:</strong> Left End</div>
				</vwc-popover>
			</div>
		</div>
	`;

	await page.setViewportSize({ width: 1740, height: 1600 });

	await loadComponents({
		page,
		components,
	});
	await renderTemplate({
		page,
		template,
	});

	await takeScreenshot(page, 'popover-placement');
});

test('should show default (auto) popover', async ({ page }: { page: Page }) => {
	const template = `
		<style>
			.container {
				display: flex;
				align-items: center;
				justify-content: center;
				height: 300px;
        width: 300px;
				background-color: #eee;
				padding: 12px;
				border-radius: 8px;
			}
		</style>
		<div class="container">
			<vwc-popover open aria-label="Default Auto">
				<vwc-button slot="anchor" appearance="filled" label="Auto"></vwc-button>
				<div>Default Auto Popover</div>
			</vwc-popover>
		</div>
	`;

	await page.setViewportSize({ width: 400, height: 400 });

	await loadComponents({
		page,
		components,
	});
	await renderTemplate({
		page,
		template,
	});

	await takeScreenshot(page, 'popover-default');
});
