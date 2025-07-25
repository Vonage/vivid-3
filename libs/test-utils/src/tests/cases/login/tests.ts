import { testSequence } from '../../utils/testSequence';
import type { TestCase } from '../../test-case';

export const loginTests: TestCase[] = [
	{
		path: 'login',
		name: 'login',
		test: (vvd) =>
			testSequence([
				() => vvd.textField.byLabel('Email').fill('user@example.com'),
				() =>
					vvd
						.expect(vvd.textField.byLabel('Email'))
						.toHaveVisibleError('My error'),
				() => vvd.textField.byLabel('Password').fill('password'),
				() =>
					vvd
						.expect(vvd.textField.byLabel('Password'))
						.toHaveProp('value', 'password'),
				() => vvd.textArea.byLabel('Note').fill('note'),
				() => vvd.checkbox.byLabel('Remember').check(),
				() => vvd.expect(vvd.checkbox.byLabel('Remember')).toHaveChecked(true),
				() => vvd.button.byLabel('Login').click(),
			]),
		expectedState: {
			email: 'user@example.com',
			password: 'password',
			note: 'note',
			remember: true,
			didLogin: true,
		},
	},
];
