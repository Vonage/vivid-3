import { fixture } from '@vivid-nx/shared';
import { Banner } from './banner';
import '.';

const COMPONENT_TAG = 'vwc-banner';

describe('vwc-banner', () => {
  let element: Banner;

  beforeEach(async () => {
    element = (await fixture(
      `<${COMPONENT_TAG}></${COMPONENT_TAG}>`
    )) as Banner;
  });

  describe('basic', () => {
    it('should be initialized as a vwc-banner', async () => {
      expect(element).toBeInstanceOf(Banner);
    });
  });
});
