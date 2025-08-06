import { testSequence } from '../../utils/testSequence';
import type { TestCase } from '../../test-case';

export const accordionTests: TestCase[] = [
	{
		path: 'accordion',
		name: 'toggle accordion',
		test: (vvd, expectState) =>
			testSequence([
				() =>
					vvd
						.expect(vvd.accordionItem.byHeading('Accordion Item 1'))
						.toBeExpanded(),
				() =>
					vvd
						.expect(vvd.accordionItem.byHeading('Accordion Item 2'))
						.toBeCollapsed(),
				() => vvd.accordionItem.byHeading('Accordion Item 2').toggle(),
				() =>
					vvd
						.expect(vvd.accordionItem.byHeading('Accordion Item 2'))
						.toBeExpanded(),
				() => vvd.button.byLabel('Click me').click(),
				() =>
					expectState({
						clicked: true,
					}),
			]),
	},
];
