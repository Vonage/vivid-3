import type { Locale } from '../shared/localization/Locale';

const zhCN: Locale = {
	datePicker: {
		months: {
			name: [
				'一月',
				'二月',
				'三月',
				'四月',
				'五月',
				'六月',
				'七月',
				'八月',
				'九月',
				'十月',
				'十一月',
				'十二月',
			],
			shorthand: [
				'一月',
				'二月',
				'三月',
				'四月',
				'五月',
				'六月',
				'七月',
				'八月',
				'九月',
				'十月',
				'十一月',
				'十二月',
			],
		},
		weekdays: {
			name: [
				'星期日',
				'星期一',
				'星期二',
				'星期三',
				'星期四',
				'星期五',
				'星期六',
			],
			shorthand: ['日', '一', '二', '三', '四', '五', '六'],
		},
		firstDayOfWeek: 1,
		dateFormat: 'yyyy年MM月dd日',
		dateFormatPlaceholder: 'YYYY年MM月DD日',
		chooseDateLabel: '选择日期',
		changeDateLabel: /* istanbul ignore next */ (date: string) => `更改日期, ${date}`,
		chooseDatesLabel: '选择日期',
		changeDatesLabel: /* istanbul ignore next */ (range: string) => `更改日期, ${range}`,
		prevYearLabel: '上一年',
		prevMonthLabel: '上个月',
		nextMonthLabel: '下个月',
		nextYearLabel: '下一年',
		clearLabel: '清除',
		okLabel: '确定',
		invalidDateError: '请输入有效的日期。',
		invalidDateRangeError: '请输入有效的日期范围。',
		startDateAfterMinDateError: /* istanbul ignore next */ (minDate: string) =>
			`开始日期必须是${minDate}或之后。`,
		endDateBeforeMaxDateError: /* istanbul ignore next */ (maxDate: string) =>
			`结束日期必须是${maxDate}或之前。`,
	},
};

export default zhCN;
