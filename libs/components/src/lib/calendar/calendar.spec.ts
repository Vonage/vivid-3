import { fixture } from '@vivid-nx/shared';
import { Calendar } from './calendar';
import '.';

const COMPONENT_TAG = 'vwc-calendar';

describe('vwc-calendar', () => {
  let element: Calendar;

  beforeEach(async () => {
    element = (await fixture(
      `<${COMPONENT_TAG}></${COMPONENT_TAG}>`
    )) as Calendar;
  });

  describe('basic', () => {
    it('should be initialized as a vwc-calendar', async () => {
      expect(element).toBeInstanceOf(Calendar);
    });
  });
});
