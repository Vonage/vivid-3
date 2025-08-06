import { testSequence } from '../../utils/testSequence';
import type { TestCase } from '../../test-case';

export const textAreaTests: TestCase[] = [
	{
		path: 'text-area',
		name: 'text-area interactions',
		test: (vvd, expectState) =>
			testSequence([
				() => vvd.expect(vvd.textArea.byLabel('Text Area')).toHaveValue(''),
				() => vvd.textArea.byLabel('Text Area').fill('Hello World'),
				() =>
					vvd
						.expect(vvd.textArea.byLabel('Text Area'))
						.toHaveValue('Hello World'),
				() =>
					expectState({
						value: 'Hello World',
					}),
				() => vvd.textArea.byLabel('Text Area').fill(''),
				() => vvd.expect(vvd.textArea.byLabel('Text Area')).toHaveValue(''),
			]),
	},
];
