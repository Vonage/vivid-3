import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import {
	loadComponents,
	loadTemplate
} from '../../visual-tests/visual-tests-utils.js';

const components = ['split-button'];
test('should show the component', async ({ page }: { page: Page }) => {
	const template = `
	<div style="margin: 5px;">
		<vwc-split-button appearance='filled' label='A default button'></vwc-split-button>
	</div>
	<div style="margin: 5px;">
		<vwc-split-button label='ghost' appearance='ghost'></vwc-split-button>
		<vwc-split-button label='filled' appearance='filled'></vwc-split-button>
		<vwc-split-button label='outlined' appearance='outlined'></vwc-split-button>
	</div>
	<div style="margin: 5px; background-color: var(--vvd-color-cta-400)">
		<vwc-split-button label='ghost' appearance='ghost'></vwc-split-button>
		<vwc-split-button label='filled' appearance='filled'></vwc-split-button>
		<vwc-split-button label='outlined' appearance='outlined'></vwc-split-button>
	</div>
	<div style="margin: 5px;">
		<vwc-split-button appearance="filled" icon='compose-line' aria-label="Send Message"></vwc-split-button>
		<vwc-split-button appearance="filled" icon='compose-line' aria-label="Send Message" shape="pill"></vwc-split-button>
	</div>
	<div style="margin: 5px;">
		<vwc-split-button appearance="filled" label='icon' icon='check-line'></vwc-split-button>
	</div>
	<div style="margin: 5px;">
		<vwc-split-button appearance='filled' label='rounded' shape='rounded'></vwc-split-button>
		<vwc-split-button appearance='filled' label='pill' shape='pill'></vwc-split-button>
	</div>
	<div style="margin: 5px;">
		<vwc-split-button appearance='filled' label='super-condensed' size='super-condensed'></vwc-split-button>
		<vwc-split-button appearance='filled' label='condensed' size='condensed'></vwc-split-button>
		<vwc-split-button appearance='filled' label='normal' size='normal'></vwc-split-button>
		<vwc-split-button appearance='filled' label='expanded' size='expanded'></vwc-split-button>
	</div>
	<div style="margin: 5px;">
		<vwc-split-button appearance='filled' icon='message-sent-line' size='super-condensed'></vwc-split-button>
		<vwc-split-button appearance='filled' icon='message-sent-line' size='condensed'></vwc-split-button>
		<vwc-split-button appearance='filled' icon='message-sent-line' size='normal'></vwc-split-button>
		<vwc-split-button appearance='filled' icon='message-sent-line' size='expanded'></vwc-split-button>
	</div>
	<div style="margin: 5px;">
		<vwc-split-button appearance='filled' split-indicator='message-sent-line' size='super-condensed'></vwc-split-button>
		<vwc-split-button appearance='filled' split-indicator='message-sent-line' size='condensed'></vwc-split-button>
		<vwc-split-button appearance='filled' split-indicator='message-sent-line' size='normal'></vwc-split-button>
		<vwc-split-button appearance='filled' split-indicator='message-sent-line' size='expanded'></vwc-split-button>
	</div>
	<div style="margin: 5px;">
		<vwc-split-button appearance="ghost" label='accent' connotation='accent'></vwc-split-button>
		<vwc-split-button appearance="ghost" label='cta' connotation='cta'></vwc-split-button>
		<vwc-split-button appearance="ghost" label='success' connotation='success'></vwc-split-button>
		<vwc-split-button appearance="ghost" label='alert' connotation='alert'></vwc-split-button>
	</div>
	<div style="margin: 5px;">
		<vwc-split-button appearance="filled" label='accent' connotation='accent'></vwc-split-button>
		<vwc-split-button appearance="filled" label='cta' connotation='cta'></vwc-split-button>
		<vwc-split-button appearance="filled" label='success' connotation='success'></vwc-split-button>
		<vwc-split-button appearance="filled" label='alert' connotation='alert'></vwc-split-button>
	</div>
	<div style="margin: 5px;">
		<vwc-split-button appearance="outlined" label='accent' connotation='accent'></vwc-split-button>
		<vwc-split-button appearance="outlined" label='cta' connotation='cta'></vwc-split-button>
		<vwc-split-button appearance="outlined" label='success' connotation='success'></vwc-split-button>
		<vwc-split-button appearance="outlined" label='alert' connotation='alert'></vwc-split-button>
	</div>
	<div style="margin: 5px;">
		<vwc-split-button appearance='ghost' label='ghost' disabled></vwc-split-button>
		<vwc-split-button appearance='filled' label='filled' disabled></vwc-split-button>
		<vwc-split-button appearance='outlined' label='outlined' disabled></vwc-split-button>
	</div>
	<div style="margin: 5px;">
		<vwc-split-button style="inline-size: 150px" appearance='filled' shape="rounded" label='A very long text default button'>
		</vwc-split-button>
	</div>
		<div style="margin: 5px;">
		<vwc-split-button style="inline-size: 400px" appearance='filled' shape="rounded" label='A very long button'>
		</vwc-split-button>
	</div>
`;

	page.setViewportSize({ width: 600, height: 720 });

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
			'./snapshots/split-button.png',
		);
});
