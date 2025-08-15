import { runSequence } from '../../../utils/runSequence';
import type { TestCase } from '../../test-case';

export const checkboxTests: TestCase[] = [
	{
		path: 'checkbox',
		name: 'checkbox: component wrapper',
		test: (vvd, expectState) =>
			runSequence([
				() => vvd.expect(vvd.checkbox.byLabel('Checkbox')).toBeUnchecked(),
				() =>
					vvd
						.expect(vvd.checkbox.byLabel('Indeterminate Checkbox'))
						.toBeIndeterminate(),
				() =>
					vvd
						.expect(vvd.checkbox.byLabel('Indeterminate Checkbox'))
						.toBeIndeterminate(),
				() =>
					vvd
						.expect(vvd.checkbox.byLabel('Indeterminate Checked Checkbox'))
						.toBeIndeterminate(),
				() => vvd.checkbox.byLabel('Checkbox').check(),
				() =>
					expectState({
						checked: true,
					}),
				() => vvd.expect(vvd.checkbox.byLabel('Checkbox')).toBeChecked(),
				() => vvd.checkbox.byLabel('Checkbox').uncheck(),
				() => vvd.expect(vvd.checkbox.byLabel('Checkbox')).toBeUnchecked(),
			]),
	},
];
