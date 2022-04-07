import { fixture } from '@vivid-nx/shared';
import { Accordion } from './accordion';
import '.';

const COMPONENT_TAG = 'vwc-accordion';

describe('vwc-accordion', () => {
  let element: Accordion;

  beforeEach(async () => {
    element = (await fixture(
      `<${COMPONENT_TAG}></${COMPONENT_TAG}>`
    )) as Accordion;
  });

  describe('basic', () => {
    it('should be initialized as a vwc-accordion', async () => {
      expect(element).toBeInstanceOf(Accordion);
    });
  });
});
