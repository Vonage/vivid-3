import { fixture } from '@vivid-nx/shared';
import { Note } from './note';
import '.';

const COMPONENT_TAG = 'vwc-note';

describe('vwc-note', () => {
  let element: Note;

  beforeEach(async () => {
    element = (await fixture(`<${COMPONENT_TAG}></${COMPONENT_TAG}>`)) as Note;
  });

  describe('basic', () => {
    it('should be initialized as a vwc-note', async () => {
      expect(element).toBeInstanceOf(Note);
    });
  });
});
