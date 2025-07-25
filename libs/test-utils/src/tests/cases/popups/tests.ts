import type { TestCase } from '../../test-case';
import { testSequence } from '../../utils/testSequence';

export const popupTests: TestCase[] = [
	{
		path: 'popups',
		name: 'modal',
		test: (vvd) =>
			testSequence([
				() => vvd.button.byLabel('Open Dialog').click(),
				() =>
					vvd.expect(vvd.dialog.byHeadline('My Dialog')).toHaveOpen('modal'),
				() => vvd.dialog.byHeadline('My Dialog').clickDismissButton(),
				() =>
					vvd.expect(vvd.dialog.byHeadline('My Dialog')).toHaveOpen('closed'),
			]),
		expectedState: { isOpen: false, selected: '1' },
	},
	{
		path: 'popups',
		name: 'tooltip',
		test: (vvd) =>
			testSequence([
				() => vvd.button.byLabel('Open Dialog').click(),
				() => vvd.expect(vvd.tooltip.byText('Tooltip')).toHaveOpen(false),
				() => vvd.button.byLabel('With tooltip').hover(),
				() => vvd.expect(vvd.tooltip.byText('Tooltip')).toHaveOpen(true),
			]),
		expectedState: { isOpen: true, selected: '1' },
	},
	{
		path: 'popups',
		name: 'select',
		test: (vvd) =>
			testSequence([
				() => vvd.button.byLabel('Open Dialog').click(),
				() => vvd.select.byLabel('Select').selectOptionByText('Text 2'),
				() => vvd.expect(vvd.select.byLabel('Select')).toHaveValue('2'),
			]),
		expectedState: { isOpen: true, selected: '2' },
	},
	{
		path: 'popups',
		name: 'searchable-select',
		test: (vvd) =>
			testSequence([
				() => vvd.button.byLabel('Open Dialog').click(),
				() =>
					vvd.searchableSelect
						.byLabel('Searchable')
						.toggleOptionsByValue(['1', '2']),
				() =>
					vvd
						.expect(vvd.searchableSelect.byLabel('Searchable'))
						.toHaveValues(['1', '2']),
			]),
		expectedState: { isOpen: true, selected: '1' },
	},
];
