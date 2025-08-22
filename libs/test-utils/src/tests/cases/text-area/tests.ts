import { runSequence } from '../../../utils/runSequence';
import type { TestCase } from '../../test-case';

export const textAreaTests: TestCase[] = [
	{
		path: 'text-area',
		name: 'text-area: component wrapper',
		test: (vvd, expectState) =>
			runSequence([
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
