import { axe, fixture } from '@repo/shared';
import '.';

const COMPONENT_TAG = 'vwc-menu-item';

describe('a11y: vwc-menu-item', () => {
	let container: Element;

	beforeEach(async () => {
		container = await fixture(
			`<div role="menu">
					<${COMPONENT_TAG} text="Menu item"></${COMPONENT_TAG}>
					<${COMPONENT_TAG} control-type="checkbox" text="Checkbox"></${COMPONENT_TAG}>
					<${COMPONENT_TAG} control-type="radio" text="Radio"></${COMPONENT_TAG}>
			</div>`
		);
	});

	it('should pass html a11y test', async () => {
		expect(await axe(container)).toHaveNoViolations();
	});
});
