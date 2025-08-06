import { testSequence } from '../../utils/testSequence';
import type { TestCase } from '../../test-case';

export const textFieldTests: TestCase[] = [
	{
		path: 'text-field',
		name: 'text-field interactions',
		test: (vvd, expectState) =>
			testSequence([
				() => vvd.expect(vvd.textField.byLabel('Text Field')).toHaveValue(''),
				() => vvd.textField.byLabel('Text Field').fill('Hello World'),
				() =>
					vvd
						.expect(vvd.textField.byLabel('Text Field'))
						.toHaveValue('Hello World'),
				() =>
					expectState({
						value: 'Hello World',
						focused: true,
						changed: false,
					}),
				() => vvd.textField.byLabel('Text Field').fill(''),
				() => vvd.expect(vvd.textField.byLabel('Text Field')).toHaveValue(''),
			]),
	},
	{
		path: 'text-field',
		name: 'text-field blur',
		test: (vvd, expectState) =>
			testSequence([
				() => vvd.textField.byLabel('Text Field').fill('Hello World'),
				() => vvd.textField.byLabel('Text Field').blur(),
				() =>
					expectState({
						value: 'Hello World',
						focused: false,
						changed: true,
					}),
			]),
	},
	{
		path: 'text-field',
		name: 'text-field blur by clicking outside',
		test: (vvd, expectState) =>
			testSequence([
				() => vvd.textField.byLabel('Text Field').fill('Hello World'),
				() => vvd.button.byLabel('Button').click(),
				() =>
					expectState({
						value: 'Hello World',
						focused: false,
						changed: true,
					}),
			]),
	},
];
