import { axe, elementUpdated, fixture } from '@vivid-nx/shared';
import { AccordionItem } from './accordion-item';
import '.';

const COMPONENT_TAG = 'vwc-accordion-item';

describe('a11y: vwc-accordion-item', () => {
  let element: AccordionItem;
  
  beforeAll(async () => {
    await customElements.whenDefined(COMPONENT_TAG);
  });

  beforeEach(async () => {
    element = (await fixture(
      `<${COMPONENT_TAG}><div>Accordion content</div></${COMPONENT_TAG}>`
    )) as AccordionItem;
  });

  it('should pass html a11y test', async () => {
    element.id = 'test1';
    element.heading = 'Accordion item heading';
    await elementUpdated(element);

    expect(await axe(element)).toHaveNoViolations();
  });
});
