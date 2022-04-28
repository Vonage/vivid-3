import { fixture } from '@vivid-nx/shared';
import { Fab } from './fab';
import '.';

const COMPONENT_TAG = 'vwc-fab';

describe('vwc-fab', () => {
  let element: Fab;

  beforeEach(async () => {
    element = (await fixture(`<${COMPONENT_TAG}></${COMPONENT_TAG}>`)) as Fab;
  });

  describe('basic', () => {
    it('should be initialized as a vwc-fab', async () => {
      expect(element).toBeInstanceOf(Fab);
    });
  });
});
