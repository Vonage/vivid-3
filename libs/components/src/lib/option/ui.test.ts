import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';
import {
	loadComponents,
	loadTemplate,
} from '../../visual-tests/visual-tests-utils.js';
import { ListboxOption } from './option';

const components = ['option', 'badge'];
test('should show the component', async ({ page }: { page: Page }) => {
	await page.setViewportSize({ width: 200, height: 720 });

	await loadComponents({
		page,
		components,
	});

	await loadTemplate({
		page,
		template: `
			<div role="listbox">
				<vwc-option text="Option"></vwc-option>
				<vwc-option text="Option" icon="chat-line"></vwc-option>
				<vwc-option text="Option" selected></vwc-option>
				<vwc-option text="Option" disabled></vwc-option>
				<vwc-option text="Option" value="my-value">
					<vwc-icon
						slot="icon"
						name="check-circle-solid"
						connotation="success"
					></vwc-icon>
				</vwc-option>
				<vwc-option class="checkmark" text="Option" selected></vwc-option>
				<vwc-option class="highlighted" text="Option"></vwc-option>
				<vwc-option text="Option" matched-text="pti"></vwc-option>
				<vwc-option text="Option" value="my-value">
					<vwc-badge
						slot="trailing-meta"
						appearance="subtle"
						connotation="cta"
						text="New"
					></vwc-badge>
				</vwc-option>
				<vwc-option class="checkmark" text="Option" value="my-value" selected>
					<vwc-badge
						slot="trailing-meta"
						appearance="subtle"
						connotation="cta"
						text="New"
					></vwc-badge>
				</vwc-option>
				<vwc-option text="Option text" text-secondary="Secondary text" value="option1"></vwc-option>
				<vwc-option text="Option text" text-secondary="Secondary text" value="option1" matched-text="pti"></vwc-option>
				<vwc-option text="Option text" text-secondary="Secondary text" value="option1">
					<vwc-icon slot="icon" name="chat-line"></vwc-icon>
				</vwc-option>
				<vwc-option text="Option text" text-secondary="Secondary text" value="option1">
					<vwc-icon slot="icon" name="chat-line"></vwc-icon>
					<vwc-icon slot="trailing-meta" name="chat-line"></vwc-icon>
				</vwc-option>
				<vwc-option class="checkmark" text="Option text" text-secondary="Secondary text" value="option1" selected>
					<vwc-icon slot="icon" name="chat-line"></vwc-icon>
					<vwc-icon slot="trailing-meta" name="chat-line"></vwc-icon>
				</vwc-option>
				<vwc-option scale="condensed" class="checkmark" text="Option text" text-secondary="Secondary text" value="option1" selected>
					<vwc-icon slot="icon" name="chat-line"></vwc-icon>
					<vwc-icon slot="trailing-meta" name="chat-line"></vwc-icon>
				</vwc-option>
			</div>
		`,
	});

	const testWrapper = await page.$('#wrapper');

	await page.evaluate(() => {
		for (const option of document.querySelectorAll<ListboxOption>(
			'.checkmark'
		)) {
			option._displayCheckmark = true;
		}
		for (const option of document.querySelectorAll<ListboxOption>(
			'.highlighted'
		)) {
			option._highlighted = true;
		}
	});

	await page.waitForLoadState('networkidle');

	expect(await testWrapper?.screenshot()).toMatchSnapshot(
		'snapshots/option.png'
	);
});
