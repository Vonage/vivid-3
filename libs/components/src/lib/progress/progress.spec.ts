import { fixture } from '@vivid-nx/shared';
import { Progress } from './progress';
import '.';

const COMPONENT_TAG = 'vwc-progress';

describe('vwc-progress', () => {
  let element: Progress;

  beforeEach(async () => {
    element = (await fixture(
      `<${COMPONENT_TAG}></${COMPONENT_TAG}>`
    )) as Progress;
  });

  describe('basic', () => {
    it('should be initialized as a vwc-progress', async () => {
      expect(element).toBeInstanceOf(Progress);
    });
  });
});
