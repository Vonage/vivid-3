import { fixture } from '@vivid-nx/shared';
import { Card } from './card';
import '.';

const COMPONENT_TAG = 'vwc-card';

describe('vwc-card', () => {
  let element: Card;

  beforeEach(async () => {
    element = (await fixture(`<${COMPONENT_TAG}></${COMPONENT_TAG}>`)) as Card;
  });

  describe('basic', () => {
    it('should be initialized as a vwc-card', async () => {
      expect(element).toBeInstanceOf(Card);
    });
  });
});
