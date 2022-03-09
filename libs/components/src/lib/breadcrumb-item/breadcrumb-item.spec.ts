import { fixture } from '@vivid-nx/shared';
import { BreadcrumbItem } from './breadcrumb-item';
import '.';

const COMPONENT_TAG = 'vwc-breadcrumb-item';

describe('vwc-breadcrumb-item', () => {
  let element: BreadcrumbItem;

  beforeEach(async () => {
    element = (await fixture(
      `<${COMPONENT_TAG}></${COMPONENT_TAG}>`
    )) as BreadcrumbItem;
  });

  it('should be initialized as a vwc-breadcrumb-item', async () => {
    expect(element).toBeInstanceOf(BreadcrumbItem);
  });
});
