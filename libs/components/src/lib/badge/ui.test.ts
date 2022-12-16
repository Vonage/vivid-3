import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import {loadComponents, loadTemplate} from '../../visual-tests/visual-tests-utils.js';

const components = ['badge'];

test('should show the component', async ({ page }: { page: Page }) => {
	const template =`
	<vwc-badge text='A default badge'></vwc-badge>
	<vwc-badge text='rounded' shape='rounded'></vwc-badge>
	<vwc-badge text='pill' shape='pill'></vwc-badge>
	<vwc-badge appearance="filled" icon='message-sent-line'></vwc-badge>
	<vwc-badge appearance="filled" icon='message-sent-line' shape="pill"></vwc-badge>
	<vwc-badge appearance="filled" text='icon' icon='check-line'></vwc-badge>
	<vwc-badge appearance="filled" text='icon-trailing' icon='check-line' icon-trailing></vwc-badge>
	<vwc-badge text='filled' appearance='filled'></vwc-badge>
	<vwc-badge text='subtle' appearance='subtle'></vwc-badge>
	<vwc-badge text='duotone' appearance='duotone'></vwc-badge>
	<vwc-badge text='accent' connotation='accent' appearance="filled"></vwc-badge>
	<vwc-badge text='cta' connotation='cta' appearance="filled"></vwc-badge>
	<vwc-badge text='information' connotation='information' appearance="filled"></vwc-badge>
	<vwc-badge text='success' connotation='success'></vwc-badge>
	<vwc-badge text='warning' connotation='warning'></vwc-badge>
	<vwc-badge text='alert' connotation='alert'></vwc-badge>
	<vwc-badge text='accent' appearance='subtle' connotation='accent'></vwc-badge>
	<vwc-badge text='cta' appearance='subtle' connotation='cta'></vwc-badge>
	<vwc-badge text='information' appearance='subtle' connotation='information'></vwc-badge>
	<vwc-badge text='success' appearance='subtle' connotation='success'></vwc-badge>
	<vwc-badge text='warning' appearance='subtle' connotation='warning'></vwc-badge>
	<vwc-badge text='alert' appearance='subtle' connotation='alert'></vwc-badge>
	<vwc-badge text='accent' appearance='duotone' connotation='accent'></vwc-badge>
	<vwc-badge text='cta' appearance='duotone' connotation='cta'></vwc-badge>
	<vwc-badge text='information' appearance='duotone' connotation='information'></vwc-badge>
	<vwc-badge text='success' appearance='duotone' connotation='success'></vwc-badge>
	<vwc-badge text='warning' appearance='duotone' connotation='warning'></vwc-badge>
	<vwc-badge text='alert' appearance='duotone' connotation='alert'></vwc-badge>
	<vwc-badge text='large overflowing text' style="display: block; inline-size: 60px;"></vwc-badge>`;

	page.setViewportSize({ width: 440, height: 720 });

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

	expect(await testWrapper?.screenshot())
		.toMatchSnapshot(
			'./snapshots/badge.png',
		);
});
