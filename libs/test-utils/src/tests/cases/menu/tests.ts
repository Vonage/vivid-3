import { runSequence } from '../../../utils/runSequence';
import type { TestCase } from '../../test-case';

export const menuTests: TestCase[] = [
	{
		path: 'menu',
		name: 'menu: component wrapper',
		test: (vvd, expectState) =>
			runSequence([
				() => vvd.expect(vvd.menu.byLabel('Menu')).toBeClosed(),
				() => vvd.expect(vvd.menuItem.byText('Checkbox Item')).toBeUnchecked(),
				() =>
					vvd
						.expect(vvd.menuItem.byText('Checked Checkbox Item'))
						.toBeChecked(),
				() => vvd.expect(vvd.menuItem.byText('Radio Item')).toBeUnchecked(),
				() =>
					vvd.expect(vvd.menuItem.byText('Checked Radio Item')).toBeChecked(),
				() => vvd.button.byLabel('Menu Trigger').click(),
				() => vvd.expect(vvd.menu.byLabel('Menu')).toBeOpen(),
				() => vvd.menuItem.byText('Menu Item').click(),
				() => vvd.menuItem.byText('Checkbox Item').click(),
				() => vvd.expect(vvd.menuItem.byText('Checkbox Item')).toBeChecked(),
				() => vvd.menuItem.byText('Radio Item').click(),
				() => vvd.expect(vvd.menuItem.byText('Radio Item')).toBeChecked(),
				() =>
					vvd.expect(vvd.menuItem.byText('Checked Radio Item')).toBeUnchecked(),
				() => vvd.menuItem.byText('Checked Radio Item').click(),
				() =>
					expectState({
						triggered: true,
						checkboxChecked: true,
						radioChecked: false,
					}),
			]),
	},
];
