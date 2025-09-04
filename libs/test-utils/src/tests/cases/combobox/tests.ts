import type { TestCase } from '../../test-case';
import { runSequence } from '../../../utils/runSequence';

export const comboboxTests: TestCase[] = [
	{
		path: 'combobox',
		name: 'combobox: component wrapper',
		test: (vvd, expectState) =>
			runSequence([
				() => vvd.expect(vvd.combobox.byLabel('Combobox')).toHaveValue(''),
				() => vvd.combobox.byLabel('Combobox').fill('Hello'),
				() => vvd.expect(vvd.combobox.byLabel('Combobox')).toHaveValue('Hello'),
				() => expectState({ value: 'Hello' }),
				() => vvd.combobox.byLabel('Combobox').clear(),
				() => vvd.expect(vvd.combobox.byLabel('Combobox')).toHaveValue(''),
				() => expectState({ value: '' }),
				() => vvd.combobox.byLabel('Combobox').selectOptionByText('Text 2'),
				() =>
					vvd.expect(vvd.combobox.byLabel('Combobox')).toHaveValue('Text 2'),
				() => expectState({ value: 'Text 2' }),
			]),
	},
];
