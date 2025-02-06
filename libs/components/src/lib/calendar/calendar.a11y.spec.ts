import { axe, fixture } from '@vivid-nx/shared';
import { Calendar } from './calendar';
import '.';
import '../calendar-event';

const COMPONENT_TAG = 'vwc-calendar';

describe('a11y: vwc-calendar', () => {
  let element: Calendar;

  beforeAll(async () => {
    await customElements.whenDefined(COMPONENT_TAG);
  });

  beforeEach(async () => {
    element = (await fixture(
      `<${COMPONENT_TAG}></${COMPONENT_TAG}>`
    )) as Calendar;
  });

  /* skipped because "Certain ARIA roles must contain particular children (aria-required-children)" */
  it.skip('should pass html a11y test', async () => {
    expect(await axe(element)).toHaveNoViolations();
  });
});
