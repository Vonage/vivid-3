import { fixture } from '@vivid-nx/shared';
import { Textfield } from './textfield';
import '.';

const COMPONENT_TAG = 'vwc-textfield';

describe('vwc-textfield', () => {
  let element: Textfield;

  beforeEach(async () => {
    element = (await fixture(
      `<${COMPONENT_TAG}></${COMPONENT_TAG}>`
    )) as Textfield;
  });

  describe('basic', () => {
    it('should be initialized as a vwc-textfield', async () => {
      expect(element).toBeInstanceOf(Textfield);
    });
  });
});
