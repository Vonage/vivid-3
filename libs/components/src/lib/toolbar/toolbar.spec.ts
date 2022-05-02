import { fixture } from '@vivid-nx/shared';
import { Toolbar } from './toolbar';
import '.';

const COMPONENT_TAG = 'vwc-toolbar';

describe('vwc-toolbar', () => {
  let element: Toolbar;

  beforeEach(async () => {
    element = (await fixture(
      `<${COMPONENT_TAG}></${COMPONENT_TAG}>`
    )) as Toolbar;
  });

  describe('basic', () => {
    it('should be initialized as a vwc-toolbar', async () => {
      expect(element).toBeInstanceOf(Toolbar);
    });
  });
});
