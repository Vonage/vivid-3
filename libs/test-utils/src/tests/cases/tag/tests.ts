import { runSequence } from '../../../utils/runSequence';
import type { TestCase } from '../../test-case';

export const tagTests: TestCase[] = [
	{
		path: 'tag',
		name: 'tag: component wrapper',
		test: (vvd, expectState) =>
			runSequence([
				() => vvd.tag.byLabel('Tag').click(),
				() => vvd.tag.byLabel('Removable').remove(),
				() => vvd.expect(vvd.tag.byLabel('Selectable')).toBeUnselected(),
				() => vvd.expect(vvd.tag.byLabel('Selected')).toBeSelected(),
				() => vvd.tag.byLabel('Selectable').select(),
				() => vvd.expect(vvd.tag.byLabel('Selectable')).toBeSelected(),
				() => vvd.expect(vvd.tag.byLabel('Disabled')).toBeDisabled(),
				() =>
					expectState({
						clicked: true,
						removed: true,
						selected: true,
					}),
				() => vvd.tag.byLabel('Selectable').unselect(),
				() => vvd.expect(vvd.tag.byLabel('Selectable')).toBeUnselected(),
			]),
	},
];
