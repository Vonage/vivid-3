import { testSequence } from '../../utils/testSequence';
import type { TestCase } from '../../test-case';

export const tagTests: TestCase[] = [
	{
		path: 'tag',
		name: 'interactions',
		test: (vvd, expectState) =>
			testSequence([
				() => vvd.tag.byLabel('Tag').click(),
				() => vvd.tag.byLabel('Removable').clickRemove(),
				() => vvd.expect(vvd.tag.byLabel('Selectable')).toBeUnselected(),
				() => vvd.expect(vvd.tag.byLabel('Selected')).toBeSelected(),
				() => vvd.tag.byLabel('Selectable').click(),
				() => vvd.expect(vvd.tag.byLabel('Selectable')).toBeSelected(),
				() => vvd.expect(vvd.tag.byLabel('Disabled')).toHaveDisabled(true),
				() =>
					expectState({
						clicked: true,
						removed: true,
						selected: true,
					}),
			]),
	},
];
