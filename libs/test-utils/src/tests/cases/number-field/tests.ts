import { runSequence } from '../../../utils/runSequence';
import type { TestCase } from '../../test-case';

export const numberFieldTests: TestCase[] = [
	{
		path: 'number-field',
		name: 'number-field: component wrapper',
		test: (vvd, expectState) =>
			runSequence([
				() =>
					vvd.expect(vvd.numberField.byLabel('Number Field')).toHaveValue('0'),
				() =>
					vvd
						.expect(vvd.numberField.byLabel('Number Field'))
						.toHaveValueAsNumber(0),
				() => vvd.numberField.byLabel('Number Field').fill('10'),
				() =>
					vvd.expect(vvd.numberField.byLabel('Number Field')).toHaveValue('10'),
				() =>
					vvd
						.expect(vvd.numberField.byLabel('Number Field'))
						.toHaveValueAsNumber(10),
				() =>
					expectState({
						value: 10,
					}),
				() => vvd.numberField.byLabel('Number Field').clickIncrement(),
				() =>
					vvd
						.expect(vvd.numberField.byLabel('Number Field'))
						.toHaveValueAsNumber(11),
				() =>
					expectState({
						value: 11,
					}),
				() => vvd.numberField.byLabel('Number Field').clickDecrement(),
				() =>
					vvd
						.expect(vvd.numberField.byLabel('Number Field'))
						.toHaveValueAsNumber(10),
				() =>
					expectState({
						value: 10,
					}),
				() => vvd.numberField.byLabel('Number Field').clear(),
				() =>
					vvd.expect(vvd.numberField.byLabel('Number Field')).toHaveValue(''),
				() =>
					vvd
						.expect(vvd.numberField.byLabel('Number Field'))
						.toHaveValueAsNumber(NaN),
			]),
	},
];
