import * as videoPlayerLocale from 'video.js/dist/lang/zh-CN.json';
import type { Locale } from '../shared/localization/Locale';

/* eslint-disable max-len */
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
		changeDateLabel: /* istanbul ignore next */ (date: string) =>
			`更改日期, ${date}`,
		chooseDatesLabel: '选择日期',
		changeDatesLabel: /* istanbul ignore next */ (range: string) =>
			`更改日期, ${range}`,
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
	timePicker: {
		defaultTo12HourClock: false,
		chooseTimeLabel: '选择时间',
		changeTimeLabel: /* istanbul ignore next */ (time: string) =>
			`更改时间, ${time}`,
		hoursLabel: '小时',
		minutesLabel: '分钟',
		secondsLabel: '秒',
		meridiesLabel: '上午/下午',
		clearLabel: '清除',
		okLabel: '确定',
		invalidTimeError: '请输入有效的时间。',
	},
	filePicker: {
		invalidFileTypeError: '您不能选择此类型的文件。',
		maxFilesExceededError: '您不能再选择任何文件。',
		fileTooBigError:
			'文件太大 ({{filesize}}MiB)。最大文件大小: {{maxFilesize}}MiB。',
		removeFileLabel: '删除文件',
	},
	audioPlayer: {
		playButtonLabel: '草創',
		pauseButtonLabel: '停',
		sliderLabel: '音訊進度條',
	},
	alert: {
		dismissButtonLabel: '关',
	},
	dialog: {
		dismissButtonLabel: '关',
	},
	banner: {
		dismissButtonLabel: '关',
	},
	numberField: {
		incrementButtonLabel: '增量',
		decrementButtonLabel: '递减',
	},
	splitButton: {
		showMoreActionsLabel: '显示更多操作',
	},
	videoPlayer: videoPlayerLocale,
	rangeSlider: {
		startThumbLabel: '最小',
		endThumbLabel: '最大',
	},
};

export default zhCN;
