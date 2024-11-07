import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import {
	loadComponents,
	loadTemplate,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['select', 'option', 'badge'];

async function testGhostSelect({ page }: { page: Page }) {
	const template = `<div style="margin: 5px;">
			<vwc-select label="choose" success-text="Success" appearance="ghost">
			<vwc-option value="1" text="Option 1"></vwc-option></vwc-select>
	</div>
<div style="margin: 5px;">
			<vwc-select label="choose" error-text="Error" appearance="ghost">
			<vwc-option value="1" text="Option 1"></vwc-option></vwc-select>
	</div>`;

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
		'snapshots/select-ghost.png',
		{ maxDiffPixelRatio: 0.01 }
	);
}

async function testScaleOptions({ page }: { page: Page }) {
	const template = `<div style="margin: 5px; block-size: 400px">
			<vwc-select label="scale condensed" scale="condensed" open>
			<vwc-option icon="chat-line" value="1" text="Option 1"></vwc-option>
				<vwc-option value="2" text="Option 2"></vwc-option>
			</vwc-select>
	</div>`;

	await page.setViewportSize({ width: 300, height: 400 });

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
		'snapshots/select-scale-condensed.png'
	);
}

test('should show the component', async ({ page }: { page: Page }) => {
	const template = `
			<style>
				#wrapper {
					width: 2300px;
					display: grid;
					grid-auto-rows: 250px;
					grid-template-columns: repeat(8, 1fr);
				}
				#wrapper > div {
					margin: 5px;
				}
			</style>
			<div>
				<style>
					vwc-select {
						width: 150px;
					}
				</style>
				<vwc-select label="choose one option">
					<vwc-option value="1" text="Option 1"></vwc-option>
					<vwc-option value="2" text="Option 2"></vwc-option>
					<vwc-option value="3" text="Option 3"></vwc-option>
				</vwc-select>
			</div>
			<div>
				<vwc-select aria-label="Options Selector">
					<vwc-option label="Custom Label 1" value="1" text="Option 1"></vwc-option>
					<vwc-option label="Custom Label 2" value="2" text="Option 2"></vwc-option>
					<vwc-option label="Custom Label 3" value="3" text="Option 3"></vwc-option>
				</vwc-select>
			</div>
			<div>
				<style>
					vwc-select {
						width: 150px;
					}
				</style>
				<vwc-select label="choose one option" icon="search-line">
					<vwc-option value="1" text="Option 1"></vwc-option>
					<vwc-option value="2" text="Option 2"></vwc-option>
					<vwc-option value="3" text="Option 3"></vwc-option>
				</vwc-select>
			</div>
			<div>
				<style>
					html {
						/* for demo purposes */
						--select-width: 100%;
					}
					vwc-select {
						width: 150px;
					}
				</style>
				<vwc-select multiple label="choose how many options you want">
					<vwc-option value="1" text="Option 1"></vwc-option>
					<vwc-option value="2" text="Option 2"></vwc-option>
					<vwc-option value="3" text="Option 3"></vwc-option>
				</vwc-select>
			</div>
			<div>
				<vwc-select aria-label="Options Selector" appearance="ghost">
					<vwc-option value="1" text="Option 1" selected></vwc-option>
					<vwc-option value="2" text="Option 2 "></vwc-option>
				</vwc-select>
			</div>
			<div>
				<style>
					vwc-select {
						justify-self: flex-start;
					}
				</style>
				<vwc-select icon="heart" aria-label="Options Selector" scale="condensed">
					<vwc-option value="1" text="Option 1"></vwc-option>
					<vwc-option value="2" text="Option 2"></vwc-option>
				</vwc-select>
				<vwc-select icon="heart" aria-label="Options Selector" scale="normal">
					<vwc-option value="1" text="Option 1"></vwc-option>
					<vwc-option value="2" text="Option 2"></vwc-option>
				</vwc-select>
			</div>
			<div>
				<vwc-select aria-label="Options Selector" shape="pill">
					<vwc-option value="1" text="Option 1"></vwc-option>
					<vwc-option value="2" text="Option 2"></vwc-option>
				</vwc-select>
			</div>
			<div>
				<style>
					vwc-select {
						width: 150px;
					}
				</style>
				<vwc-select label="choose one option" helper-text="Helper text">
					<vwc-option value="1" text="Option 1"></vwc-option>
					<vwc-option value="2" text="Option 2"></vwc-option>
					<vwc-option value="3" text="Option 3"></vwc-option>
				</vwc-select>
			</div>
			<div>
				<style>
					vwc-select {
						width: 150px;
					}
				</style>
				<vwc-select label="choose one option" success-text="Success text">
					<vwc-option value="1" text="Option 1"></vwc-option>
					<vwc-option value="2" text="Option 2"></vwc-option>
					<vwc-option value="3" text="Option 3"></vwc-option>
				</vwc-select>
			</div>
			<div>
				<style>
					vwc-select {
						width: 150px;
					}
				</style>
				<vwc-select label="choose one option" error-text="Please pick one">
					<vwc-option value="1" text="Option 1"></vwc-option>
					<vwc-option value="2" text="Option 2"></vwc-option>
					<vwc-option value="3" text="Option 3"></vwc-option>
				</vwc-select>
			</div>
			<div>
				<vwc-select aria-label="Options Selector" disabled>
					<vwc-option value="1" text="Option 1"></vwc-option>
				</vwc-select>
			</div>
			<div>
				<vwc-select aria-label="Options Selector" open>
					<vwc-option value="1" text="Option 1"></vwc-option>
					<vwc-option value="2" text="Option 2"></vwc-option>
					<vwc-option value="3" text="Option 3"></vwc-option>
				</vwc-select>
			</div>
			<div>
				<vwc-select aria-label="Options Selector" fixed-dropdown>
					<vwc-option value="1" text="Option 1"></vwc-option>
					<vwc-option value="2" text="Option 2"></vwc-option>
				</vwc-select>
			</div>
			<div>
				<style>
					vwc-select {
						width: 250px;
					}
				</style>
				<vwc-select
					aria-label="Options Selector"
					placeholder="--Please choose an option--"
				>
					<vwc-option value="1" text="Option 1"></vwc-option>
					<vwc-option value="2" text="Option 2"></vwc-option>
					<vwc-option value="3" text="Option 3"></vwc-option>
				</vwc-select>
			</div>
			<div>
				<style>
					vwc-select {
						width: 150px;
					}
				</style>
				<vwc-select label="choose one option">
					<vwc-option value="1" text="Option 1"></vwc-option>
					<vwc-option value="2" text="Option 2"></vwc-option>
					<vwc-option value="3" text="Option 3"></vwc-option>
				</vwc-select>
			</div>
			<div>
				<style>
					vwc-select {
						width: 250px;
					}
					.duration {
						color: var(--vvd-color-neutral-600);
						text-align: end;
						flex-grow: 1;
					}
				</style>
				<vwc-select aria-label="Options Selector">
					<vwc-option value="1" text="Option 1"></vwc-option>
					<vwc-option value="2" text="Option 2"></vwc-option>
					<vwc-option value="3" text="Option 3"></vwc-option>
					<span slot="meta">
						<vwc-badge connotation="success" text="Beta"></vwc-badge>
					</span>
				</vwc-select>
				<vwc-select aria-label="Options Selector">
					<vwc-option value="1" text="Option 1"></vwc-option>
					<vwc-option value="2" text="Option 2"></vwc-option>
					<vwc-option value="3" text="Option 3"></vwc-option>
					<span slot="meta" class="duration">00:00:00</span>
				</vwc-select>
			</div>
			<div>
				<style>
					vwc-select {
						width: 150px;
					}
				</style>
				<vwc-select aria-label="Options Selector">
					<vwc-icon
						slot="icon"
						name="check-circle-solid"
						connotation="success"
					></vwc-icon>
					<vwc-option value="1" text="Option 1"></vwc-option>
					<vwc-option value="2" text="Option 2"></vwc-option>
					<vwc-option value="3" text="Option 3"></vwc-option>
				</vwc-select>
			</div>
			<div>
				<vwc-select label="Business Type">
					<vwc-option value="ngo" text="Non-Governmental Organization"></vwc-option>
					<vwc-option value="gov" text="Governmental Organization"></vwc-option>
					<vwc-option value="edu" text="Educational Institution"></vwc-option>
					<span slot="helper-text"
						>Please select the <a href="#">type of your business</a>.</span
					>
				</vwc-select>
			</div>
			<div>
				<style>
					vwc-select {
						--select-height: 200px;
					}
				</style>
				<vwc-select aria-label="Options Selector">
					<vwc-option value="1" text="Option 1"></vwc-option>
					<vwc-option value="2" text="Option 2"></vwc-option>
					<vwc-option value="3" text="Option 3"></vwc-option>
					<vwc-option value="4" text="Option 4"></vwc-option>
					<vwc-option value="5" text="Option 5"></vwc-option>
					<vwc-option value="6" text="Option 6"></vwc-option>
					<vwc-option value="7" text="Option 7"></vwc-option>
				</vwc-select>
			</div>
			<div>
				<style>
					vwc-select {
						width: 140px;
					}
				</style>
				<vwc-select label="choose one option">
					<vwc-option value="1" text="Option 1: dogs"></vwc-option>
					<vwc-option value="2" text="Option 2: cats"></vwc-option>
					<vwc-option value="3" text="Option 3: dogs and cats"></vwc-option>
				</vwc-select>
			</div>
			<div>
				<style>
					vwc-select {
						width: 120px;
					}
				</style>
				<vwc-select label="country code" icon="flag-united-states">
					<vwc-option value="1" text="+1" icon="flag-united-states"></vwc-option>
					<vwc-option value="+49" text="+49" icon="flag-germany"></vwc-option>
					<vwc-option value="+355" text="+355" icon="flag-albania"></vwc-option>
				</vwc-select>
				<script>
					const select = document.querySelector('vwc-select');
					select?.addEventListener('change', (e) => {
						select.icon = select.selectedOptions[0].icon;
					});
				</script>
			</div>
			<div>
				<style>
					vwc-select {
						width: 280px;
					}

					vwc-icon {
						font-size: 12px;
					}
					vwc-select[current-value='ready'] > vwc-icon,
					vwc-option[value='ready'] > vwc-icon {
						color: var(--vvd-color-success-300);
					}
					vwc-select[current-value='away'] > vwc-icon,
					vwc-option[value='away'] > vwc-icon {
						color: var(--vvd-color-warning-300);
					}
					vwc-select[current-value='extended-away'] > vwc-icon,
					vwc-option[value='extended-away'] > vwc-icon {
						color: var(--vvd-color-announcement-500);
					}
					vwc-select[current-value='logged-out'] > vwc-icon,
					vwc-option[value='logged-out'] > vwc-icon {
						color: var(--vvd-color-neutral-300);
					}

					.duration {
						color: var(--vvd-color-neutral-600);
						text-align: end;
						flex-grow: 1;
					}
				</style>
				<vwc-select id="select" shape="pill" aria-label="Status">
					<vwc-icon id="icon" slot="icon" name="bullet-solid"></vwc-icon>
					<span slot="meta" class="duration">00:00:00</span>
					<vwc-option value="ready" text="Ready">
						<vwc-icon slot="icon" name="bullet-solid"></vwc-icon>
					</vwc-option>
					<vwc-option value="away" text="Away">
						<vwc-icon slot="icon" name="bullet-solid"></vwc-icon>
					</vwc-option>
					<vwc-option value="extended-away" text="Extended away">
						<vwc-icon slot="icon" name="bullet-solid"></vwc-icon>
					</vwc-option>
					<vwc-option value="logged-out" text="Logged out">
						<vwc-icon slot="icon" name="bullet-solid"></vwc-icon>
					</vwc-option>
				</vwc-select>
			</div>
			`;

	await page.setViewportSize({ width: 2300, height: 720 });

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
		'snapshots/select.png'
	);
});
test('select ghost', testGhostSelect);
test('select scale', testScaleOptions);
