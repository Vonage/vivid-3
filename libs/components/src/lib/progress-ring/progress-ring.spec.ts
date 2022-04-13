import { fixture } from '@vivid-nx/shared';
import { ProgressRing } from './progress-ring';
import '.';

const COMPONENT_TAG = 'vwc-progress-ring';

describe('vwc-progress-ring', () => {
  let element: ProgressRing;

  beforeEach(async () => {
    element = (await fixture(
      `<${COMPONENT_TAG}></${COMPONENT_TAG}>`
    )) as ProgressRing;
  });

  describe('basic', () => {
    it('should be initialized as a vwc-progress-ring', async () => {
      expect(element).toBeInstanceOf(ProgressRing);
    });
  });
});
