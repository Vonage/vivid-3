import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import {
	loadComponents,
	loadTemplate,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['layout', 'card', 'divider'];

test.describe.configure({ mode: 'parallel' });

test('should show the default component', async ({ page }: { page: Page }) => {
	const template = `
		<div style="margin: 5px;">
			<vwc-layout>
				<vwc-card
					headline="Lorem ipsum"
					text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
				>
					<img
						slot="media"
						src="https://picsum.photos/id/1015/300/200"
						alt="landscape"
						style="width: 100%; height: 150px; object-fit: cover;"
					/>
				</vwc-card>
				<vwc-card
					headline="Lorem ipsum"
					text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
				>
					<img
						slot="media"
						src="https://picsum.photos/id/1016/300/200"
						alt="landscape"
						style="width: 100%; height: 150px; object-fit: cover;"
					/>
				</vwc-card>
				<vwc-card
					headline="Lorem ipsum"
					text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
				>
					<img
						slot="media"
						src="https://picsum.photos/id/1018/300/200"
						alt="landscape"
						style="width: 100%; height: 150px; object-fit: cover;"
					/>
				</vwc-card>
				<vwc-card
					headline="Lorem ipsum"
					text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
				>
					<img
						slot="media"
						src="https://picsum.photos/id/1019/300/200"
						alt="landscape"
						style="width: 100%; height: 150px; object-fit: cover;"
					/>
				</vwc-card>
				<vwc-card
					headline="Lorem ipsum"
					text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
				>
					<img
						slot="media"
						src="https://picsum.photos/id/1055/300/200"
						alt="landscape"
						style="width: 100%; height: 150px; object-fit: cover;"
					/>
				</vwc-card>
				<vwc-card
					headline="Lorem ipsum"
					text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
				>
					<img
						slot="media"
						src="https://picsum.photos/id/1050/300/200"
						alt="landscape"
						style="width: 100%; height: 150px; object-fit: cover;"
					/>
				</vwc-card>
			</vwc-layout>
		</div>`;

	page.setViewportSize({
		width: 1100,
		height: 580,
	});

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
		'snapshots/layout.png',
		{
			maxDiffPixelRatio: 0.02,
		}
	);
});

test('should apply column-basis', async ({ page }: { page: Page }) => {
	const template = `
		<div style="margin: 5px;">
			<vwc-layout gutters="small" column-spacing="small">
				<vwc-card elevation="2" text="small"></vwc-card>
				<vwc-card elevation="2" text="small"></vwc-card>
				<vwc-card elevation="2" text="small"></vwc-card>
			</vwc-layout>
			<vwc-layout gutters="small" column-spacing="medium">
				<vwc-card elevation="2" text="medium"></vwc-card>
				<vwc-card elevation="2" text="medium"></vwc-card>
				<vwc-card elevation="2" text="medium"></vwc-card>
			</vwc-layout>
			<vwc-layout gutters="small" column-spacing="large">
				<vwc-card elevation="2" text="large"></vwc-card>
				<vwc-card elevation="2" text="large"></vwc-card>
				<vwc-card elevation="2" text="large"></vwc-card>
			</vwc-layout>
		</div>
		<div style="margin: 5px;">
			<vwc-layout gutters="small" row-spacing="small" column-basis="block">
				<vwc-card elevation="2" text="small"></vwc-card>
				<vwc-card elevation="2" text="small"></vwc-card>
				<vwc-card elevation="2" text="small"></vwc-card>
			</vwc-layout>
			<vwc-layout gutters="small" row-spacing="medium" column-basis="block">
				<vwc-card elevation="2" text="medium"></vwc-card>
				<vwc-card elevation="2" text="medium"></vwc-card>
				<vwc-card elevation="2" text="medium"></vwc-card>
			</vwc-layout>
			<vwc-layout gutters="small" row-spacing="large" column-basis="block">
				<vwc-card elevation="2" text="large"></vwc-card>
				<vwc-card elevation="2" text="large"></vwc-card>
				<vwc-card elevation="2" text="large"></vwc-card>
			</vwc-layout>
		</div>
		<div style="margin: 5px;">
			<vwc-layout gutters="small" column-basis="small">
				<vwc-card elevation="2" text="small (160px)"></vwc-card>
				<vwc-card elevation="2" text="small (160px)"></vwc-card>
				<vwc-card elevation="2" text="small (160px)"></vwc-card>
				<vwc-card elevation="2" text="small (160px)"></vwc-card>
			</vwc-layout>
			<vwc-layout gutters="small" column-basis="medium">
				<vwc-card elevation="2" text="medium - default (320px)"></vwc-card>
				<vwc-card elevation="2" text="medium - default (320px)"></vwc-card>
				<vwc-card elevation="2" text="medium - default (320px)"></vwc-card>
				<vwc-card elevation="2" text="medium - default (320px)"></vwc-card>
			</vwc-layout>
			<vwc-layout gutters="small" column-basis="large">
				<vwc-card elevation="2" text="large (380px)"></vwc-card>
				<vwc-card elevation="2" text="large (380px)"></vwc-card>
				<vwc-card elevation="2" text="large (380px)"></vwc-card>
				<vwc-card elevation="2" text="large (380px)"></vwc-card>
			</vwc-layout>
			<vwc-layout gutters="small" column-basis="block">
				<vwc-card elevation="2" text="block"></vwc-card>
				<vwc-card elevation="2" text="block"></vwc-card>
				<vwc-card elevation="2" text="block"></vwc-card>
				<vwc-card elevation="2" text="block"></vwc-card>
			</vwc-layout>
		</div>
	`;

	page.setViewportSize({
		width: 1100,
		height: 2100,
	});

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
		'snapshots/layout-column-basis.png',
		{
			maxDiffPixelRatio: 0.02,
		}
	);
});

test('should apply auto-sizing and custom gutters', async ({
	page,
}: {
	page: Page;
}) => {
	const template = `
		<div style="margin: 5px;">
			<vwc-layout auto-sizing="fit">
				<vwc-card elevation="2" text="fit"></vwc-card>
				<vwc-card elevation="2" text="fit"></vwc-card>
			</vwc-layout>
			<vwc-layout auto-sizing="fill">
				<vwc-card elevation="2" text="fill"></vwc-card>
				<vwc-card elevation="2" text="fill"></vwc-card>
			</vwc-layout>
		</div>
		<div style="margin: 5px;">
			<vwc-layout>
				<vwc-card elevation="2" text="none"></vwc-card>
			</vwc-layout>
			<vwc-divider></vwc-divider>
			<vwc-layout gutters="small">
				<vwc-card elevation="2" text="small"></vwc-card>
			</vwc-layout>
			<vwc-divider></vwc-divider>
			<vwc-layout gutters="medium">
				<vwc-card elevation="2" text="medium"></vwc-card>
			</vwc-layout>
			<vwc-divider></vwc-divider>
			<vwc-layout gutters="large">
				<vwc-card elevation="2" text="large"></vwc-card>
			</vwc-layout>
		</div>
		<div style="margin: 5px;">
			<vwc-layout gutters="small-inline">
				<vwc-card elevation="2" text="small-inline"></vwc-card>
			</vwc-layout>
			<vwc-divider></vwc-divider>
			<vwc-layout gutters="medium-inline">
				<vwc-card elevation="2" text="medium-inline"></vwc-card>
			</vwc-layout>
			<vwc-divider></vwc-divider>
			<vwc-layout gutters="large-inline">
				<vwc-card elevation="2" text="large-inline"></vwc-card>
			</vwc-layout>
		</div>
		<div style="margin: 5px;">
			<vwc-layout gutters="small-block">
				<vwc-card elevation="2" text="small-block"></vwc-card>
			</vwc-layout>
			<vwc-divider></vwc-divider>
			<vwc-layout gutters="medium-block">
				<vwc-card elevation="2" text="medium-block"></vwc-card>
			</vwc-layout>
			<vwc-divider></vwc-divider>
			<vwc-layout gutters="large-block">
				<vwc-card elevation="2" text="large-block"></vwc-card>
			</vwc-layout>
		</div>
	`;

	page.setViewportSize({
		width: 1100,
		height: 1230,
	});

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
		'snapshots/layout-auto-sizing.png',
		{
			maxDiffPixelRatio: 0.02,
		}
	);
});

test('should apply css variables', async ({ page }: { page: Page }) => {
	const template = `
		<div style="margin: 5px;">
			<vwc-layout style="--layout-grid-template-columns: 1fr 1fr;">
				<vwc-card elevation="2"></vwc-card>
				<vwc-card elevation="2"></vwc-card>
				<vwc-card elevation="2"></vwc-card>
				<vwc-card elevation="2"></vwc-card>
			</vwc-layout>
		</div>
		<div style="margin: 5px;">
			<vwc-layout style="--layout-grid-template-rows: 80px 40px auto;">
				<vwc-card elevation="2"></vwc-card>
				<vwc-card elevation="2"></vwc-card>
				<vwc-card elevation="2"></vwc-card>
				<vwc-card elevation="2"></vwc-card>
				<vwc-card elevation="2"></vwc-card>
				<vwc-card elevation="2"></vwc-card>
			</vwc-layout>
		</div>
		<div style="margin: 5px;">
			<vwc-layout style="--layout-column-gap: 0; --layout-row-gap: 0;">
				<vwc-card elevation="2"></vwc-card>
				<vwc-card elevation="2"></vwc-card>
				<vwc-card elevation="2"></vwc-card>
				<vwc-card elevation="2"></vwc-card>
			</vwc-layout>
		</div>
	`;

	page.setViewportSize({
		width: 1100,
		height: 370,
	});

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
		'snapshots/layout-css-variables.png',
		{
			maxDiffPixelRatio: 0.02,
		}
	);
});
