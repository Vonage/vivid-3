import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';
import {
	loadComponents,
	loadTemplate,
} from '../../visual-tests/visual-tests-utils.js';

const components = [
	'text-field',
	'button',
	'select',
	'divider',
	'contextual-help',
];

test('should show the component', async ({ page }: { page: Page }) => {
	const template = `
	<div style="display: flex; flex-direction: column; row-gap: 5px; inline-size: 260px; margin: 6px;">
		<vwc-text-field label="My Label"></vwc-text-field>
		<vwc-text-field placeholder="My Placeholder"></vwc-text-field>
		<vwc-text-field label="With default value" value="5"></vwc-text-field>
		<vwc-text-field label="Helper text below" helper-text="Help text"></vwc-text-field>
		<vwc-text-field label="Username" value="Vlad" success-text="Valid username"></vwc-text-field>
		<vwc-text-field label="Username" value="Vlad" success-text="Valid username" appearance="ghost"></vwc-text-field>
		<vwc-text-field value="some text" label='Enter some text' error-text="Please take this seriously"></vwc-text-field>
		<vwc-text-field value="some text" label='Enter some text' error-text="Please take this seriously" appearance="ghost">
		</vwc-text-field>
		<vwc-text-field label="Char count example" char-count maxlength="15"></vwc-text-field>
		<vwc-text-field icon="search-line" label="Search..."></vwc-text-field>
		<vwc-text-field label="Pill" shape="pill"></vwc-text-field>
		<vwc-text-field label="Rounded" shape="rounded"></vwc-text-field>
		<vwc-text-field placeholder="appearance" label='fieldset' appearance='fieldset'></vwc-text-field>
		<vwc-text-field placeholder="appearance" label='ghost' appearance='ghost'></vwc-text-field>
		<vwc-text-field disabled icon="chat-line" value="disabled" label='fieldset' appearance='fieldset'></vwc-text-field>
		<vwc-text-field readonly icon="chat-line" value="readonly text" label='fieldset' appearance='fieldset'></vwc-text-field>
		<vwc-text-field icon="search" placeholder="search" label='search' appearance='fieldset' class="text-field">
			<vwc-button slot="action-items" size='condensed' icon="close-line" aria-label='clear field' appearance='ghost'></vwc-button>
		</vwc-text-field>
		<vwc-text-field icon="search" placeholder="search" label='search' appearance='fieldset' class="text-field">
		<div slot="leading-action-items" style="display: flex; align-items: center; column-gap: 2px;">
		<vwc-select aria-label="Options Selector" appearance="ghost" style=" --focus-inset: 2px;">
		<vwc-option value="1" text="ALL" selected></vwc-option>
		</vwc-select>
		<vwc-divider orientation="vertical" style="height: 20px;"></vwc-divider>
		</div>
		</vwc-text-field>
		<form method="post" action="">
			<vwc-layout column-spacing="small" column-basis="block">
			<vwc-text-field required label="Add email" placeholder="e.g. john@doe.dev" type="email" name="email" autocomplete="email"
			icon="search" maxlength="30" char-count style="justify-self: flex-start;"></vwc-text-field>
			<div style="display: flex; gap: 12px;">
			<vwc-button label="Reset" type="reset"></vwc-button>
			<vwc-button label="Submit" appearance="filled" type="submit"></vwc-button>
			</div>
			</vwc-layout>
		</form>
		<vwc-text-field icon="search-line" label="Condensed" current-value="value" scale="condensed"></vwc-text-field>
		<vwc-text-field label="Field with Contextual Help">
			<vwc-contextual-help slot="contextual-help">This is the contextual help</vwc-contextual-help>
		</vwc-text-field>
	</div>
	`;

	await page.setViewportSize({ width: 300, height: 1500 });

	await loadComponents({
		page,
		components,
	});
	await loadTemplate({
		page,
		template,
	});

	const testWrapper = await page.$('#wrapper');
	await page.locator('vwc-text-field input').nth(0).focus();
	await page.keyboard.press('Tab');
	await page.waitForLoadState('networkidle');

	expect(await testWrapper?.screenshot()).toMatchSnapshot(
		'snapshots/text-field.png'
	);
});

const testInvalidation = async ({
	page,
	browserName,
}: {
	page: Page;
	browserName: string;
}) => {
	const selector =
		browserName === 'chromium'
			? 'input[name="submit-button"]'
			: '#submit-button';

	const template = `
		<form onsubmit="return false" style="min-height: 150px;">
			<vwc-text-field id="invalid-text-field"
																		label="invalid"
																		required
																		name="invalid-text-field"></vwc-text-field>
																		<input id="submit-button"
																					 name="submit-button"
																					 type="submit"
																					 label="Submit"/>
		</form>`;

	await loadComponents({
		page,
		components,
	});
	await loadTemplate({
		page,
		template,
	});

	const testWrapper = await page.$('#wrapper');

	const submitButton = await page.locator(selector);

	await submitButton.click();

	await page.setViewportSize({ width: 300, height: 300 });
	await page.waitForLoadState('networkidle');
	await page.waitForTimeout(500);

	expect(
		await testWrapper?.screenshot({ animations: 'disabled' })
	).toMatchSnapshot('snapshots/text-field-invalidation.png');
};

test('should invalidate component', testInvalidation);

test.describe('max/min length validation', () => {
	test.beforeEach(async ({ page }: { page: Page }) => {
		await loadComponents({
			page,
			components,
		});
		await loadTemplate({
			page,
			template: `
				<vwc-text-field minlength='3' value='t'></vwc-text-field>
				<vwc-text-field maxlength='1' value='test'></vwc-text-field>
			`,
		});
	});

	test('should ignore min/max length validation when user has not interacted with the field', async ({
		page,
	}: {
		page: Page;
	}) => {
		expect(
			await page
				.locator('vwc-text-field[minlength]')
				.evaluate((node: HTMLInputElement) => node.checkValidity())
		).toBe(true);
		expect(
			await page
				.locator('vwc-text-field[maxlength]')
				.evaluate((node: HTMLInputElement) => node.checkValidity())
		).toBe(true);
	});

	test('should apply min/max length constraints after a user has interacted with the field', async ({
		page,
	}: {
		page: Page;
	}) => {
		await page.locator('vwc-text-field[minlength] input').fill('te');
		await page.locator('vwc-text-field[maxlength] input').press('Delete');

		expect(
			await page
				.locator('vwc-text-field[minlength]')
				.evaluate((node: HTMLInputElement) => node.checkValidity())
		).toBe(false);
		expect(
			await page
				.locator('vwc-text-field[maxlength]')
				.evaluate((node: HTMLInputElement) => node.checkValidity())
		).toBe(false);
	});
});
