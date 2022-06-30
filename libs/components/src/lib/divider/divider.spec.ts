import { fixture } from '@vivid-nx/shared';
import { Divider } from './divider';
import '.';

const COMPONENT_TAG = 'vwc-divider';

describe('vwc-divider', () => {
  let element: Divider;

  beforeEach(async () => {
    element = (await fixture(
      `<${COMPONENT_TAG}></${COMPONENT_TAG}>`
    )) as Divider;
  });

  describe('basic', () => {
    it('should be initialized as a vwc-divider', async () => {
      expect(element).toBeInstanceOf(Divider);
    });
  });
});
