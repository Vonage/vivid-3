import { axe, elementUpdated, fixture } from '@vivid-nx/shared';
import { TagGroup } from './tag-group';
import '.';

const COMPONENT_TAG = 'vwc-tag-group';

describe('vwc-tag-group', () => {
	let element: TagGroup;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as TagGroup;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-tag-group', async () => {
			expect(element).toBeInstanceOf(TagGroup);
		});
	});

	describe('a11y', () => {
		it('should pass html a11y test', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG} aria-label="Tag group">
					<vwc-tag label="Label 1"></vwc-tag>
					<vwc-tag label="Label 2"></vwc-tag>
					<vwc-tag label="Label 3"></vwc-tag>
				</${COMPONENT_TAG}>`
			)) as TagGroup;
			element.ariaLabel = 'Tag group';
			await elementUpdated(element);

			expect(await axe(element)).toHaveNoViolations();
		});
	});
});
