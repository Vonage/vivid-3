import type { Page } from '@playwright/test';
import { test } from '@playwright/test';
import {
	loadComponents,
	renderTemplate,
	takeScreenshot,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['calendar', 'calendar-event'];

test('should show the component', async ({ page }: { page: Page }) => {
	const template = `
    <vwc-calendar sticky-mode="none" datetime="2022-01-01">
      <vwc-calendar-event slot="day-0" start="0" duration="1" heading="Pool party" description="2pm">
      </vwc-calendar-event>
      <vwc-calendar-event slot="day-0" start="14" duration="2.25" heading="Summer time" description="All Day" connotation="cta">
      </vwc-calendar-event>
      <vwc-calendar-event slot="day-2" start="4" duration="4" heading="Team meeting" description="11am - 13pm" connotation="alert"
      appearance="subtle">
      </vwc-calendar-event>
      <vwc-calendar-event slot="day-3" start="16" duration="8" heading="Main event" description="12:30pm" overlap-count="2"
      connotation="success"></vwc-calendar-event>
      <vwc-calendar-event slot="day-3" start="17" duration="7" heading="Roadmap discussion" description="All Day"
      connotation="announcement" appearance="subtle">
      </vwc-calendar-event>
      <vwc-calendar-event slot="day-3" start="18.5" duration="7.5" heading="Summer time" description="15:30pm" overlap-count="1">
      </vwc-calendar-event>
      <vwc-calendar-event slot="day-6" start="12" duration="4" heading="Team social" description="14pm" connotation="warning">
      </vwc-calendar-event>
      <vwc-calendar-event slot="day-6" start="20" duration="5" heading="Summer time" description="18pm" connotation="accent"
      appearance="subtle">
      </vwc-calendar-event>
    </vwc-calendar>
  `;

	await page.setViewportSize({ width: 1200, height: 720 });

	await loadComponents({
		page,
		components,
	});
	await renderTemplate({
		page,
		template,
	});

	await takeScreenshot(page, 'calendar-event');
});
