import { axe, elementUpdated, fixture } from '@vivid-nx/shared';
import '.';
import '../option';
import { SearchableSelect } from './searchable-select';

const COMPONENT_TAG = 'vwc-searchable-select';
const OPTION_TAG = 'vwc-option';

describe('a11y: vwc-searchable-select', () => {
	let element: SearchableSelect;

	beforeAll(async () => {
		await customElements.whenDefined(COMPONENT_TAG);
	});

	beforeEach(async () => {
		const template = `
      <${COMPONENT_TAG}>
        <${OPTION_TAG} value="apple" text="Apple"></${OPTION_TAG}>
        <${OPTION_TAG} value="banana" text="Banana"></${OPTION_TAG}>
        <${OPTION_TAG} value="cherry" text="Cherry"></${OPTION_TAG}>
      </${COMPONENT_TAG}>
    `;
		const root = fixture(template);
		element = (
			root.tagName === COMPONENT_TAG.toUpperCase()
				? root
				: root.querySelector(COMPONENT_TAG)!
		) as SearchableSelect;
	});

	it('should pass html a11y test', async () => {
		element.label = 'Label';
		await elementUpdated(element);
		expect(await axe(element)).toHaveNoViolations();
	});
});
