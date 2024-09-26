import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import {
	loadComponents,
	loadTemplate,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['searchable-select', 'option'];

const genOptions = (count: number) => {
	const options = [];
	for (let i = 0; i < count; i++) {
		options.push(`<vwc-option value="${i}" text="${i}" selected></vwc-option>`);
	}
	return options.join('');
};

test('should show the component', async ({ page }: { page: Page }) => {
	await loadComponents({
		page,
		components,
	});
	await loadTemplate({
		page,
		template: `
			<div style="display: flex; flex-direction: column; gap: 16px; padding: 8px; width: 300px;">
				<vwc-searchable-select></vwc-searchable-select>
				<vwc-searchable-select label="label"></vwc-searchable-select>
				<vwc-searchable-select helper-text="helper-text"></vwc-searchable-select>
				<vwc-searchable-select success-text="success-text" multiple clearable>
					<vwc-option value="1" text="Option 1" selected></vwc-option>
				</vwc-searchable-select>
				<vwc-searchable-select error-text="error-text" multiple clearable>
					<vwc-option value="1" text="Option 1" selected></vwc-option>
				</vwc-searchable-select>
				<vwc-searchable-select icon="user-line"></vwc-searchable-select>
				<vwc-searchable-select>
					<vwc-icon name="user-line" slot="icon"></vwc-icon>
				</vwc-searchable-select>
				<vwc-searchable-select>
					<div slot="meta">meta</div>
				</vwc-searchable-select>
				<vwc-searchable-select appearance="ghost"></vwc-searchable-select>
				<vwc-searchable-select placeholder="Placeholder"></vwc-searchable-select>
				<vwc-searchable-select disabled></vwc-searchable-select>
				<vwc-searchable-select clearable>
					<vwc-option value="1" text="Option 1" selected></vwc-option>
				</vwc-searchable-select>
				<vwc-searchable-select>
					<vwc-option value="1" text="Option 1" selected></vwc-option>
				</vwc-searchable-select>
				<vwc-searchable-select multiple>
					<vwc-option value="1" text="Option 1" selected></vwc-option>
				</vwc-searchable-select>
				<vwc-searchable-select disabled>
					<vwc-option value="1" text="1" selected></vwc-option>
				</vwc-searchable-select>
				<vwc-searchable-select disabled multiple max-lines="1" clearable>
					${genOptions(10)}
				</vwc-searchable-select>
				<vwc-searchable-select multiple max-lines="1" clearable shape="pill">
					${genOptions(10)}
				</vwc-searchable-select>
				<vwc-searchable-select max-lines="1" multiple>
					${genOptions(10)}
				</vwc-searchable-select>
				<vwc-searchable-select max-lines="2" multiple>
					${genOptions(20)}
				</vwc-searchable-select>
				<vwc-searchable-select max-lines="3" multiple>
					${genOptions(30)}
				</vwc-searchable-select>
			</div>
		`,
	});

	const testWrapper = await page.$('#wrapper');

	await page.setViewportSize({ width: 350, height: 2000 });

	await page.evaluate(() => {
		(document.querySelector('vwc-searchable-select') as HTMLElement).blur();
	});

	await page.waitForLoadState('networkidle');

	expect(await testWrapper?.screenshot()).toMatchSnapshot(
		'./snapshots/searchable-select.png'
	);
});

test('should contribute values to form data', async ({
	page,
}: {
	page: Page;
}) => {
	await loadComponents({
		page,
		components,
	});
	await loadTemplate({
		page,
		template: `
			<form id="form">
				<vwc-searchable-select name="select" multiple>
					<vwc-option value="1" text="Option 1" selected></vwc-option>
					<vwc-option value="2" text="Option 2" selected></vwc-option>
				</vwc-searchable-select>
			</form>
		`,
	});

	const form = await page.$('#form');

	const formDataValues = await page.evaluate((form) => {
		const formElement = form as HTMLFormElement;
		const formData = new FormData(formElement);
		return formData.getAll('select');
	}, form);

	expect(formDataValues).toEqual(['1', '2']);
});
