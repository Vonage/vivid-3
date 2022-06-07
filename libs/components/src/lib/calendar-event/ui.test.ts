import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import {
	loadComponents,
	loadTemplate,
} from '../../visual-tests/visual-tests-utils.ts';

const components = ['calendar', 'calendar-event'];

test.only('should show the component', async ({ page }: { page: Page }) => {
	const template = `
    <vwc-calendar>
      <vwc-calendar-event slot="day-0" start="0" duration="1" color="rgb(43, 158, 250)" heading="Pool party" description="2pm">
      </vwc-calendar-event>
      <vwc-calendar-event slot="day-0" start="14" duration="2.25" heading="Summer time" description="All Day">
      </vwc-calendar-event>
      <vwc-calendar-event slot="day-2" start="4" duration="4" color="rgb(214, 33, 156)" heading="Team meeting" description="11am - 13pm">
      </vwc-calendar-event>
      <vwc-calendar-event slot="day-3" start="16" duration="8" color="rgb(50, 175, 76)" heading="Main event" description="12:30pm"
        overlap-count="2">
      </vwc-calendar-event>
      <vwc-calendar-event slot="day-3" start="17" duration="7" color="rgb(43, 158, 250)" heading="Roadmap discussion" description="All Day">
      </vwc-calendar-event>
      <vwc-calendar-event slot="day-3" start="18.5" duration="7.5" heading="Summer time" description="15:30pm" overlap-count="1">
      </vwc-calendar-event>
      <vwc-calendar-event slot="day-6" start="12" duration="4" color="rgb(183, 126, 249)" heading="Team social" description="14pm">
      </vwc-calendar-event>
      <vwc-calendar-event slot="day-6" start="20" duration="5" color="rgb(50, 175, 76)" heading="Summer time" description="18pm">
      </vwc-calendar-event>
    </vwc-calendar>
  `;

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

	expect(await testWrapper?.screenshot()).toMatchSnapshot(
		'./snapshots/calendar-event.png'
	);
});
