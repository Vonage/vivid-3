import { runSequence } from '../../../utils/runSequence';
import type { TestCase } from '../../test-case';

export const accordionTests: TestCase[] = [
	{
		path: 'accordion',
		name: 'accordion: component wrapper',
		test: (vvd, expectState) =>
			runSequence([
				() =>
					vvd
						.expect(vvd.accordionItem.byHeading('Accordion Item 1'))
						.toBeExpanded(),
				() =>
					vvd
						.expect(vvd.accordionItem.byHeading('Accordion Item 2'))
						.toBeCollapsed(),
				() => vvd.accordionItem.byHeading('Accordion Item 2').expand(),
				() =>
					vvd
						.expect(vvd.accordionItem.byHeading('Accordion Item 2'))
						.toBeExpanded(),
				() => vvd.button.byLabel('Click me').click(),
				() =>
					expectState({
						clicked: true,
					}),
				() =>
					vvd
						.expect(vvd.accordionItem.byHeading('Multi Item 1'))
						.toBeCollapsed(),
				() => vvd.accordionItem.byHeading('Multi Item 1').expand(),
				() =>
					vvd
						.expect(vvd.accordionItem.byHeading('Multi Item 1'))
						.toBeExpanded(),
				() => vvd.accordionItem.byHeading('Multi Item 1').collapse(),
				() =>
					vvd
						.expect(vvd.accordionItem.byHeading('Multi Item 1'))
						.toBeCollapsed(),
			]),
	},
	{
		path: 'accordion',
		name: 'accordion-item: .expand() should fail when already expanded',
		expectErrorMessage: 'Component is collapsed before it can be expanded',
		test: (vvd) =>
			runSequence([
				() => vvd.accordionItem.byHeading('Accordion Item 1').expand(),
			]),
	},
];
