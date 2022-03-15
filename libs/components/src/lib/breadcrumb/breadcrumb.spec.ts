import { fixture } from '@vivid-nx/shared';
import { Breadcrumb } from './breadcrumb';
import '.';

const COMPONENT_TAG = 'vwc-breadcrumb';

describe('vwc-breadcrumb', () => {
  let element: Breadcrumb;

  beforeEach(async () => {
    element = (await fixture(
      `<${COMPONENT_TAG}></${COMPONENT_TAG}>`
    )) as Breadcrumb;
  });

  describe('basic', () => {
    it('should be initialized as a vwc-breadcrumb', async () => {
      expect(element).toBeInstanceOf(Breadcrumb);
    });
  });
});
