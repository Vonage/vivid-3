import * as path from 'path';
import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import {
	extractHTMLBlocksFromReadme,
	loadComponents,
	loadTemplate
} from '../../visual-tests/visual-tests-utils.js';

const components = ['button'];
test('should show the component', async ({ page }: { page: Page }) => {
	const template = `
	<div style="margin: 5px;">
		<vwc-button appearance='filled' label='A default button'></vwc-button>
	</div>
	<div style="margin: 5px;">
		<vwc-button label='ghost' appearance='ghost'></vwc-button>
		<vwc-button label='filled' appearance='filled'></vwc-button>
		<vwc-button label='outlined' appearance='outlined'></vwc-button>
	</div>
	<div style="margin: 5px;">
		<vwc-button appearance="filled" icon='message-sent-line' aria-label="Send Message"></vwc-button>
		<vwc-button appearance="filled" icon='message-sent-line' aria-label="Send Message" shape="pill"></vwc-button>
	</div>
	<div style="margin: 5px;">
		<vwc-button appearance="filled" label='icon' icon='check-line'></vwc-button>
		<vwc-button appearance="filled" label='icon-trailing' icon='check-line' icon-trailing></vwc-button>
	</div>
	<div style="margin: 5px;">
		<vwc-button appearance='filled' label='rounded' shape='rounded'></vwc-button>
		<vwc-button appearance='filled' label='pill' shape='pill'></vwc-button>
	</div>
	<div style="margin: 5px;">
		<vwc-button appearance='filled' label='condensed' size='condensed'></vwc-button>
		<vwc-button appearance='filled' label='normal' size='normal'></vwc-button>
		<vwc-button appearance='filled' label='expanded' size='expanded'></vwc-button>
	</div>
	<div style="margin: 5px;">
		<vwc-button stacked appearance='filled' label='Stacked'></vwc-button>
		<vwc-button stacked appearance='filled' icon='message-sent-line' label='With Icon'></vwc-button>
		<vwc-button stacked appearance='filled' icon='message-sent-line' icon-trailing label='Icon Trailing'></vwc-button>
		<vwc-button stacked appearance='filled' icon='message-sent-line'></vwc-button>
	</div>
	<div style="margin: 5px;">
		<vwc-button appearance="ghost" label='accent' connotation='accent'></vwc-button>
		<vwc-button appearance="ghost" label='cta' connotation='cta'></vwc-button>
		<vwc-button appearance="ghost" label='success' connotation='success'></vwc-button>
		<vwc-button appearance="ghost" label='alert' connotation='alert'></vwc-button>
	</div>
	<div style="margin: 5px;">
		<vwc-button appearance="filled" label='accent' connotation='accent'></vwc-button>
		<vwc-button appearance="filled" label='cta' connotation='cta'></vwc-button>
		<vwc-button appearance="filled" label='success' connotation='success'></vwc-button>
		<vwc-button appearance="filled" label='alert' connotation='alert'></vwc-button>
	</div>
	<div style="margin: 5px;">
		<vwc-button appearance="outlined" label='accent' connotation='accent'></vwc-button>
		<vwc-button appearance="outlined" label='cta' connotation='cta'></vwc-button>
		<vwc-button appearance="outlined" label='success' connotation='success'></vwc-button>
		<vwc-button appearance="outlined" label='alert' connotation='alert'></vwc-button>
	</div>
	<div style="margin: 5px;">
		<vwc-button appearance='ghost' label='ghost' disabled></vwc-button>
		<vwc-button appearance='filled' label='filled' disabled></vwc-button>
		<vwc-button appearance='outlined' label='outlined' disabled></vwc-button>
	</div>
	<div style="margin: 5px;">
		<vwc-button connotation='cta' shape='pill' icon='microphone-solid' aria-label="Mute"></vwc-button>
	</div>
	<div style="margin: 5px;">
		<vwc-button style='display: block;' label="I'm full width" shape='pill' appearance='filled'></vwc-button>
	</div>
	`;

	page.setViewportSize({ width: 500, height: 720 });

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
			'./snapshots/button.png',
		);
});
