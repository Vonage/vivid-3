import { fixture } from '@vivid-nx/shared';
import { TopAppBar } from './top-app-bar';
import '.';

const COMPONENT_TAG = 'vwc-top-app-bar';

describe('vwc-top-app-bar', () => {
  let element: TopAppBar;

  beforeEach(async () => {
    element = (await fixture(
      `<${COMPONENT_TAG}></${COMPONENT_TAG}>`
    )) as TopAppBar;
  });

  describe('basic', () => {
    it('should be initialized as a vwc-top-app-bar', async () => {
      expect(element).toBeInstanceOf(TopAppBar);
    });
  });
});
