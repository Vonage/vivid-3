import { type CalendarPickerLocale } from '../calendar-picker.locale.ts';
import { buildMonthPickerGrid } from './monthPickerGrid.ts';

const enUsLocale = {
	months: {
		name: [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'Oktober',
			'November',
			'December',
		],
		shorthand: [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'Jun',
			'Jul',
			'Aug',
			'Sep',
			'Okt',
			'Nov',
			'Dec',
		],
	},
} as CalendarPickerLocale;
describe('buildMonthPickerGrid', () => {
	it('should return the correct 4 by 4 grid for the year 2023 and en-US locale', () => {
		expect(buildMonthPickerGrid(2023, enUsLocale)).toMatchSnapshot();
	});
});
