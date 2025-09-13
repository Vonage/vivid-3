import type { Page } from '@playwright/test';
import { test } from '@playwright/test';
import type { ProgressRing } from '../progress-ring/progress-ring';
import {
	loadComponents,
	renderTemplate,
	takeScreenshot,
} from '../../visual-tests/visual-tests-utils.js';
import type { Button } from './button';

const components = ['button', 'icon'];
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
		<vwc-button appearance="ghost" label='announcement' connotation='announcement'></vwc-button>
	</div>
	<div style="margin: 5px;">
		<vwc-button appearance="filled" label='accent' connotation='accent'></vwc-button>
		<vwc-button appearance="filled" label='cta' connotation='cta'></vwc-button>
		<vwc-button appearance="filled" label='success' connotation='success'></vwc-button>
		<vwc-button appearance="filled" label='alert' connotation='alert'></vwc-button>
		<vwc-button appearance="filled" label='announcement' connotation='announcement'></vwc-button>
	</div>
	<div style="margin: 5px;">
		<vwc-button appearance="outlined" label='accent' connotation='accent'></vwc-button>
		<vwc-button appearance="outlined" label='cta' connotation='cta'></vwc-button>
		<vwc-button appearance="outlined" label='success' connotation='success'></vwc-button>
		<vwc-button appearance="outlined" label='alert' connotation='alert'></vwc-button>
		<vwc-button appearance="outlined" label='announcement' connotation='announcement'></vwc-button>
	</div>
		<div style="margin: 5px;">
		<vwc-button appearance="outlined-light" label='accent' connotation='accent'></vwc-button>
		<vwc-button appearance="outlined-light" label='cta' connotation='cta'></vwc-button>
		<vwc-button appearance="outlined-light" label='success' connotation='success'></vwc-button>
		<vwc-button appearance="outlined-light" label='alert' connotation='alert'></vwc-button>
		<vwc-button appearance="outlined-light" label='announcement' connotation='announcement'></vwc-button>
	</div>
		<div style="margin: 5px;">
			<vwc-button appearance="ghost-light" label="accent" connotation="accent"></vwc-button>
		<vwc-button appearance="ghost-light" label="cta" connotation="cta"></vwc-button>
		<vwc-button appearance="ghost-light" label="success" connotation="success"></vwc-button>
		<vwc-button appearance="ghost-light" label="alert" connotation="alert"></vwc-button>
		<vwc-button appearance="ghost-light" label="announcement" connotation="announcement"></vwc-button>
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
		<vwc-button appearance="outlined" icon="check-line" label="outlined" pending icon-trailing></vwc-button>
	</div>
	<div style="margin: 5px;">
		<vwc-button connotation='cta' shape='pill' icon='microphone-solid' aria-label="Mute"></vwc-button>
	</div>
	<div style="margin: 5px;">
		<vwc-button style='display: block;' label="I'm full width" shape='pill' icon='message-sent-line' appearance='filled'></vwc-button>
	</div>
	<div style="margin: 5px;">
		<vwc-button style="width: 150px" label='I am button with long text and text wrap' shape='pill' appearance='filled'></vwc-button>
	</div>
	<div style="margin: 5px;">
		<vwc-button style="width: 150px; --button-line-clamp: 2;"
		label="I'm button with long text and text wrap"shape='pill' appearance='filled'>
		</vwc-button>
	</div>
	<div style="margin: 5px;">
		<vwc-button href="#" label='Button With a Link'></vwc-button>
	</div>
	<div style="margin: 5px;">
		<vwc-button appearance="filled" label="With Icon Slot">
			<vwc-icon slot="icon" name="check-circle-solid" connotation="success"></vwc-icon>
		</vwc-button>
		<vwc-button appearance="filled" label="With Icon Slot" icon-trailing>
			<vwc-icon slot="icon" name="check-circle-solid" connotation="success"></vwc-icon>
		</vwc-button>
		<vwc-button appearance="filled" shape="pill">
			<vwc-icon slot="icon" name="check-circle-solid" connotation="success"></vwc-icon>
		</vwc-button>
	</div>
	<div style="margin: 5px;">
		<vwc-button label="Expanded" data-expanded="true" aria-expanded="true"></vwc-button>
		<vwc-button label="Active" active></vwc-button>
	</div>
	<div style="margin: 5px;">
		<vwc-button active appearance="ghost" label='accent' connotation='accent'></vwc-button>
		<vwc-button active appearance="ghost" label='cta' connotation='cta'></vwc-button>
		<vwc-button active appearance="ghost" label='success' connotation='success'></vwc-button>
		<vwc-button active appearance="ghost" label='alert' connotation='alert'></vwc-button>
		<vwc-button active appearance="ghost" label='announcement' connotation='announcement'></vwc-button>
	</div>
	<div style="margin: 5px;">
		<vwc-button active appearance="filled" label='accent' connotation='accent'></vwc-button>
		<vwc-button active appearance="filled" label='cta' connotation='cta'></vwc-button>
		<vwc-button active appearance="filled" label='success' connotation='success'></vwc-button>
		<vwc-button active appearance="filled" label='alert' connotation='alert'></vwc-button>
		<vwc-button active appearance="filled" label='announcement' connotation='announcement'></vwc-button>
	</div>
	<div style="margin: 5px;">
		<vwc-button active appearance="outlined" label='accent' connotation='accent'></vwc-button>
		<vwc-button active appearance="outlined" label='cta' connotation='cta'></vwc-button>
		<vwc-button active appearance="outlined" label='success' connotation='success'></vwc-button>
		<vwc-button active appearance="outlined" label='alert' connotation='alert'></vwc-button>
		<vwc-button active appearance="outlined" label='announcement' connotation='announcement'></vwc-button>
	</div>
		<div style="margin: 5px;">
			<vwc-button active appearance="ghost-light" label="accent" connotation="accent"></vwc-button>
		<vwc-button active appearance="ghost-light" label="cta" connotation="cta"></vwc-button>
		<vwc-button active appearance="ghost-light" label="success" connotation="success"></vwc-button>
		<vwc-button active appearance="ghost-light" label="alert" connotation="alert"></vwc-button>
		<vwc-button active appearance="ghost-light" label="announcement" connotation="announcement"></vwc-button>
	</div>
		<div style="margin: 5px;">
		<vwc-button active appearance="outlined-light" label='accent' connotation='accent'></vwc-button>
		<vwc-button active appearance="outlined-light" label='cta' connotation='cta'></vwc-button>
		<vwc-button active appearance="outlined-light" label='success' connotation='success'></vwc-button>
		<vwc-button active appearance="outlined-light" label='alert' connotation='alert'></vwc-button>
		<vwc-button active appearance="outlined-light" label='announcement' connotation='announcement'></vwc-button>
	</div>
	<div style="margin: 5px;">
		<vwc-button dropdown-indicator appearance="ghost" label="ghost"></vwc-button>
		<vwc-button dropdown-indicator appearance="outlined" label="outlined"></vwc-button>
		<vwc-button dropdown-indicator appearance="filled" label="filled"></vwc-button>
	</div>
	<div style="margin: 5px;">
		<vwc-button dropdown-indicator appearance="ghost-light" label="ghost-light"></vwc-button>
		<vwc-button dropdown-indicator appearance="outlined-light" label="outlined-light"></vwc-button>
	</div>
	<div style="margin: 5px;">
		<vwc-button dropdown-indicator connotation="cta" appearance="ghost" label="ghost"></vwc-button>
		<vwc-button dropdown-indicator connotation="cta" appearance="outlined" label="outlined"></vwc-button>
		<vwc-button dropdown-indicator connotation="cta" appearance="filled" label="filled"></vwc-button>
	</div>
	<div style="margin: 5px;">
		<vwc-button dropdown-indicator connotation="cta" appearance="ghost-light" label="ghost-light"></vwc-button>
		<vwc-button dropdown-indicator connotation="cta" appearance="outlined-light" label="outlined-light"></vwc-button>
	</div>
	<div style="margin: 5px;">
		<vwc-button style="width: 200px" appearance="filled" dropdown-indicator label="wide"></vwc-button>
		<vwc-button style="width: 100px" appearance="filled" dropdown-indicator label="too small for label"></vwc-button>
		<vwc-button appearance="filled" dropdown-indicator icon="user-line"></vwc-button>
	</div>
		<div style="margin: 5px;">
		<vwc-button style="width: 200px" appearance="filled" dropdown-indicator shape="pill" label="wide"></vwc-button>
		<vwc-button style="width: 100px" appearance="filled" dropdown-indicator shape="pill" label="too small for label"></vwc-button>
		<vwc-button appearance="filled" dropdown-indicator shape="pill" icon="user-line"></vwc-button>
	</div>
	<div style="margin: 5px;">
		<vwc-button appearance="filled" dropdown-indicator label="expanded" data-expanded="true" aria-expanded="true"></vwc-button>
	</div>
	<div style="margin: 5px;">
		<vwc-button appearance="filled" dropdown-indicator icon="user-line" label="stacked" stacked></vwc-button>
		<vwc-button style="width: 200px" appearance="filled" dropdown-indicator icon="user-line" label="wide" stacked></vwc-button>
		<vwc-button style="width: 100px" appearance="filled" dropdown-indicator icon="user-line" label="too small for label" stacked></vwc-button>
	</div>
	<div style="margin: 5px;">
		<vwc-button dropdown-indicator appearance="filled" label="super-condensed" size="super-condensed"></vwc-button>
		<vwc-button dropdown-indicator appearance="filled" label="condensed" size="condensed"></vwc-button>
		<vwc-button dropdown-indicator appearance="filled" label="normal" size="normal"></vwc-button>
		<vwc-button dropdown-indicator appearance="filled" label="expanded" size="expanded"></vwc-button>
	</div>
	<div style="margin: 5px;">
		<vwc-button dropdown-indicator icon="user-line" stacked appearance="filled" label="super-condensed" size="super-condensed"></vwc-button>
		<vwc-button dropdown-indicator icon="user-line" stacked appearance="filled" label="condensed" size="condensed"></vwc-button>
		<vwc-button dropdown-indicator icon="user-line" stacked appearance="filled" label="normal" size="normal"></vwc-button>
		<vwc-button dropdown-indicator icon="user-line" stacked appearance="filled" label="expanded" size="expanded"></vwc-button>
	</div>
		<div style="margin: 5px;">
		<vwc-button dropdown-indicator icon="user-line"  appearance="filled" label="align-start" size="normal" style="width: 280px;"></vwc-button>
		<vwc-button dropdown-indicator icon="user-line"  appearance="filled" label="Example of SuperLongButtonTitle" size="normal" style="width: 280px;"></vwc-button>
		<vwc-button dropdown-indicator icon="user-line"  appearance="filled" label="keep align-center" size="normal" style="width: 280px; --button-content-alignment: center;"></vwc-button>
	</div>
	</div>
	`;

	await page.setViewportSize({ width: 600, height: 1500 });

	await loadComponents({
		page,
		components,
	});
	await renderTemplate({
		page,
		template,
		setup: async () => {
			await page.evaluate(() => {
				const pendingButtons = document.querySelectorAll(
					'vwc-button[pending]'
				) as NodeListOf<Button>;
				pendingButtons.forEach((button) => {
					const indicator = button.shadowRoot?.querySelector(
						'vwc-progress-ring'
					) as ProgressRing;
					if (indicator) indicator.value = 66;
				});
			});

			await page.locator('vwc-button').nth(0).focus();
		},
	});

	await takeScreenshot(page, 'button');
});
