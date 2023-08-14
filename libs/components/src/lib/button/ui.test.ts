import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import type { ProgressRing } from '../progress-ring/progress-ring';
import {
	loadComponents,
	loadTemplate
} from '../../visual-tests/visual-tests-utils.js';
import type { Button } from './button';

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
		<vwc-button appearance='filled' label='super-condensed' size='super-condensed'></vwc-button>
		<vwc-button appearance='filled' label='condensed' size='condensed'></vwc-button>
		<vwc-button appearance='filled' label='normal' size='normal'></vwc-button>
		<vwc-button appearance='filled' label='expanded' size='expanded'></vwc-button>
	</div>
		<div style="margin: 5px;">
		<vwc-button appearance='filled' icon='message-sent-line' size='super-condensed'></vwc-button>
		<vwc-button appearance='filled' icon='message-sent-line' size='condensed'></vwc-button>
		<vwc-button appearance='filled' icon='message-sent-line' size='normal'></vwc-button>
		<vwc-button appearance='filled' icon='message-sent-line' size='expanded'></vwc-button>
	</div>
		<div style="margin: 5px;">
		<vwc-button stacked appearance='filled' label='Stacked'></vwc-button>
		<vwc-button stacked appearance='filled' icon='message-sent-line' label='With Icon'></vwc-button>
		<vwc-button stacked appearance='filled' icon='message-sent-line' icon-trailing label='Icon Trailing'></vwc-button>
		<vwc-button stacked appearance='filled' icon='message-sent-line'></vwc-button>
	</div>
	<div style="margin: 5px;">
		<vwc-button stacked size='super-condensed' appearance='filled' icon='message-sent-line' label='With Icon'></vwc-button>
		<vwc-button stacked size='condensed' appearance='filled' icon='message-sent-line' label='With Icon'></vwc-button>
		<vwc-button stacked size='normal' appearance='filled' icon='message-sent-line' label='With Icon'></vwc-button>
		<vwc-button stacked size='expanded' appearance='filled' icon='message-sent-line' label='With Icon'></vwc-button>
	</div>
	<div style="margin: 5px;">
		<vwc-button stacked size='super-condensed' appearance='filled' shape='pill' icon='message-sent-line' label='With Icon'></vwc-button>
		<vwc-button stacked size='condensed' appearance='filled' shape='pill' icon='message-sent-line' label='With Icon'></vwc-button>
		<vwc-button stacked size='normal' appearance='filled' shape='pill' icon='message-sent-line' label='With Icon'></vwc-button>
		<vwc-button stacked size='expanded' appearance='filled' shape='pill' icon='message-sent-line' label='With Icon'></vwc-button>
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
		<vwc-button appearance="ghost" label="ghost" pending></vwc-button>
		<vwc-button appearance="filled" label="filled" pending></vwc-button>
		<vwc-button appearance="outlined" label="outlined" pending></vwc-button>
		<vwc-button appearance="filled" label="super-condensed" size="super-condensed" pending></vwc-button>
	</div>
	<div style="margin: 5px;">
		<vwc-button appearance="ghost" icon="check-line" label="ghost" pending></vwc-button>
		<vwc-button appearance="filled" icon="check-line" label="filled" pending></vwc-button>
		<vwc-button appearance="outlined" icon="check-line" label="outlined" pending></vwc-button>
	</div>
	<div style="margin: 5px;">
		<vwc-button connotation='cta' shape='pill' icon='microphone-solid' aria-label="Mute"></vwc-button>
	</div>
	<div style="margin: 5px;">
		<vwc-button style='display: block;' label="I'm full width" shape='pill' appearance='filled'></vwc-button>
	</div>
	<div style="margin: 5px;">
		<vwc-button style="width: 150px" label='I am button with long text and text wrap' shape='pill' appearance='filled'></vwc-button>
	</div>
	<div style="margin: 5px;">
		<vwc-button style="width: 150px; --button-line-clamp: 2;"
		label="I'm button with long text and text wrap"shape='pill' appearance='filled'>
		</vwc-button>
	</div>
	</div>
	`;

	await page.setViewportSize({ width: 500, height: 1200 });

	await loadComponents({
		page,
		components,
	});
	await loadTemplate({
		page,
		template,
	});

	const testWrapper = await page.$('#wrapper');

	await page.evaluate(() => {
		const pendingButtons = (document.querySelectorAll('vwc-button[pending]') as NodeListOf<Button>);
		pendingButtons.forEach(button => {
			const indicator = button.shadowRoot?.querySelector('vwc-progress-ring') as ProgressRing;
			if (indicator) indicator.value = 66;
		});
	});

	await page.locator('vwc-button').nth(0).focus();

	await page.waitForLoadState('networkidle');

	expect(await testWrapper?.screenshot())
		.toMatchSnapshot(
			'./snapshots/button.png',
		);
});
