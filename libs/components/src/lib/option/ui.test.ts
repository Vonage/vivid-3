import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import {
	loadComponents,
	loadTemplate,
} from '../../visual-tests/visual-tests-utils.js';
import { ListboxOption } from './option';

const components = ['option'];
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
				<vwc-option id="checkmark" text="Option" selected></vwc-option>
				<vwc-option id="highlighted" text="Option"></vwc-option>
				<vwc-option id="match" text="Option"></vwc-option>
			</div>
		`,
	});

	const testWrapper = await page.$('#wrapper');

	await page.evaluate(() => {
		const checkmark = document.getElementById('checkmark') as ListboxOption;
		checkmark._displayCheckmark = true;
		const highlighted = document.getElementById('highlighted') as ListboxOption;
		highlighted._highlighted = true;
		const match = document.getElementById('match') as ListboxOption;
		match._matchedRange = { from: 1, to: 4 };
	});

	await page.waitForLoadState('networkidle');

	expect(await testWrapper?.screenshot()).toMatchSnapshot(
		'snapshots/option.png'
	);
});
