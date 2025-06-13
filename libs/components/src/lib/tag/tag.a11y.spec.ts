import { axe, elementUpdated, fixture } from '@repo/shared';
import { Tag } from './tag';
import '.';

const COMPONENT_TAG = 'vwc-tag';

describe('a11y: vwc-tag', () => {
	let element: Tag;

	beforeAll(async () => {
		await customElements.whenDefined(COMPONENT_TAG);
	});

	beforeEach(async () => {
		element = (await fixture(`<${COMPONENT_TAG}></${COMPONENT_TAG}>`)) as Tag;
	});

	describe('selectable', () => {
		it('should pass html a11y test', async () => {
			element.label = 'lorem';
			element.selectable = true;
			await elementUpdated(element);
			const exposedHTMLString = `
        <div role="listbox" aria-label="tag group">
          ${element.shadowRoot?.innerHTML}
        </div>
      `;

			expect(await axe(exposedHTMLString)).toHaveNoViolations();
		});
	});

	describe('removable', () => {
		it('should pass html a11y test', async () => {
			element.removable = true;
			await elementUpdated(element);
			const exposedHTMLString = `
        <div role="listbox" aria-label="tag group">
          ${element.shadowRoot?.innerHTML}
        </div>
      `;

			expect(await axe(exposedHTMLString)).toHaveNoViolations();
		});
	});
});
