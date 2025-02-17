import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import {
	loadComponents,
	loadTemplate,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['note', 'icon'];

test('should show the component', async ({ page }: { page: Page }) => {
	const template = `
		<div style="margin: 5px;">
			<vwc-note
				connotation="success"
				icon="check-circle"
				headline="Changes saved successfully"
			>
				Your changes have been saved successfully. You can now continue working.
			</vwc-note>
		</div>
		<div style="margin: 5px;">
			<vwc-note headline="Headline Text"></vwc-note>
		</div>
		<div style="margin: 5px;">
			<vwc-note icon="home" headline="Note With Icon"></vwc-note>
		</div>
		<div style="margin: 5px;">
			<vwc-note
				connotation="alert"
				icon="error-solid"
				headline="alert note"
			></vwc-note>
			<vwc-note
				connotation="success"
				icon="check-circle-solid"
				headline="success note"
			></vwc-note>
			<vwc-note
				connotation="warning"
				icon="warning-solid"
				headline="warning note"
			></vwc-note>
			<vwc-note
				connotation="information"
				icon="info-solid"
				headline="information note"
			></vwc-note>
			<vwc-note
				connotation="announcement"
				icon="sparkles-solid"
				headline="announcement note"
			></vwc-note>
			<vwc-note
				connotation="accent"
				icon="megaphone-solid"
				headline="accent note"
			></vwc-note>
		</div>
		<div style="margin: 5px;">
			<vwc-note icon="home" headline="Note Headline" connotation="information">
				<p>This is the text that explains about something important!</p>
			</vwc-note>
		</div>
		<div style="margin: 5px;">
			<vwc-note headline="Note With Icon Slot">
				<vwc-icon
					slot="icon"
					name="check-circle-solid"
					connotation="success"
				></vwc-icon>
			</vwc-note>
		</div>
	`

	page.setViewportSize({ width: 900, height: 720 });

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

	expect(await testWrapper?.screenshot()).toMatchSnapshot('snapshots/note.png');
});
