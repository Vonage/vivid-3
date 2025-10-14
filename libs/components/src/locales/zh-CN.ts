import * as videoPlayerLocale from 'video.js/dist/lang/zh-CN.json';
import type { Locale } from '../shared/localization/Locale';

/* eslint-disable max-len */
const zhCN: Locale = {
	lang: 'zh-CN',
	common: {
		useCommaAsDecimalSeparator: false,
	},
	pickerField: {
		clearLabel: '清除',
		okLabel: '确定',
	},
	calendarPicker: {
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
		todayLabel: '今天',
		selectedLabel: '已选择',
		currentLabel: '当前',
		changeMonthLabel: /* istanbul ignore next */ (month: string) =>
			`更改月份, ${month}已选择`,
		showCalendarForMonthLabel: /* istanbul ignore next */ (month: string) =>
			`显示 ${month} 的日历`,
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
		invalidTimeError: '请输入有效的时间。',
	},
	dateTimePicker: {
		chooseDateTimeLabel: '选择日期和时间',
		changeDateTimeLabel: /* istanbul ignore next */ (dateTime: string) =>
			`更改日期和时间, ${dateTime}`,
		invalidDateTimeError: '请输入有效的日期和时间。',
		dateBeforeMinDateError: /* istanbul ignore next */ (minDate: string) =>
			`日期必须是${minDate}或之后。`,
		dateAfterMaxDateError: /* istanbul ignore next */ (maxDate: string) =>
			`日期必须是${maxDate}或��前。`,
		timeBeforeMinTimeError: /* istanbul ignore next */ (minTime: string) =>
			`时间必须是${minTime}或之后。`,
		timeAfterMaxTimeError: /* istanbul ignore next */ (maxTime: string) =>
			`时间必须是${maxTime}或之前。`,
	},
	filePicker: {
		invalidFileTypeError: '您不能选择此类型的文件。',
		maxFilesExceededError: '您不能再选择任何文件。',
		fileTooBigError:
			'文件太大 ({{filesize}}MiB)。最大文件大小: {{maxFilesize}}MiB。',
		removeFileLabel: '删除文件',
		invalidFilesError:
			'所选的一个或多个文件无效。请仅上传大小限制内的有效文件类型。',
		uploadFilesLabel: '上传文件',
	},
	audioPlayer: {
		playButtonLabel: '草創',
		pauseButtonLabel: '停',
		sliderLabel: '音訊進度條',
		skipForwardButton: '向前跳',
		skipBackwardButton: '向后跳',
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
		incrementButtonLabel: /* istanbul ignore next */ (step: number) =>
			step === 1 ? '增加价值' : `价值增加 ${step}`,
		decrementButtonLabel: /* istanbul ignore next */ (step: number) =>
			step === 1 ? '减少价值' : `值减少 ${step}`,
		updatedValueAnnouncement: /* istanbul ignore next */ (value: string) =>
			`更新值：${value}`,
	},
	splitButton: {
		showMoreActionsLabel: '显示更多操作',
	},
	videoPlayer: videoPlayerLocale,
	rangeSlider: {
		startThumbLabel: '最小',
		endThumbLabel: '最大',
	},
	dialPad: {
		inputLabel: '电话号码',
		deleteButtonLabel: '删除最后一位数字',
		callButtonLabel: '称呼',
		endCallButtonLabel: '结束通话',
		digitOneLabel: '1',
		digitTwoLabel: '2 ABC',
		digitThreeLabel: '3 DEF',
		digitFourLabel: '4 GHI',
		digitFiveLabel: '5 JKL',
		digitSixLabel: '6 MNO',
		digitSevenLabel: '7 PQRS',
		digitEightLabel: '8 TUV',
		digitNineLabel: '9 WXYZ',
		digitAsteriskLabel: '*',
		digitZeroLabel: '0',
		digitHashtagLabel: '#',
		errorLabel: '错误：',
	},
	tab: {
		dismissButtonLabel: '按 DELETE 键关闭此选项卡',
	},
	searchableSelect: {
		clearButtonLabel: '清除选择',
		noOptionsMessage: '没有选项',
		noMatchesMessage: '未找到选项',
		loadingOptionsMessage: '加载中...',
		removeTagButtonLabel: /* istanbul ignore next */ (label: string) =>
			`${label} 删除`,
		optionSelectedMessage: /* istanbul ignore next */ (name: string) =>
			`选项 ${name} 已选择。`,
		optionDeselectedMessage: /* istanbul ignore next */ (name: string) =>
			`选项 ${name} 已取消选择。`,
		optionFocusedMessage: /* istanbul ignore next */ (
			name: string,
			position: number,
			total: number,
			selected: boolean
		) =>
			`选项 ${name} 已聚焦, ${
				selected ? '已选择, ' : ''
			}${position} 的 ${total}。`,
		maxSelectedMessage: /* istanbul ignore next */ (
			total: number,
			limit: number
		) => `已选择 ${limit} 个中的 ${total} 个。`,
	},
	richTextEditor: {
		paragraphStyles: '段落样式',
		textSize: '文字大小',
		bold: '粗体',
		italic: '斜体',
		underline: '下划线',
		strikethrough: '删除线',
		monospace: '等宽字体',
		undo: '撤销',
		redo: '重做',
		alignment: '对齐',
		alignments: {
			left: '左对齐',
			center: '居中',
			right: '右对齐',
		},
		hyperlink: '超链接',
		linkText: '文本',
		linkUrl: 'URL',
		linkTextPlaceholder: '输入要转换为链接的文本',
		linkUrlPlaceholder: '插入链接URL',
		cancel: '取消',
		apply: '应用',
		close: '关闭',
		edit: '编辑',
		delete: '删除',
		clickHere: '点击这里',
	},
	button: {
		pendingLabel: '加载中',
	},
	feedbackMessage: {
		errorIconText: '错误:',
		successIconText: '成功:',
	},
	connotationAnnoncement: {
		accentIcon: '口音:',
		alertIcon: '警报:',
		informationIcon: '信息:',
		successIcon: '成功:',
		warningIcon: '警告:',
		announcementIcon: '公告:',
		ctaIcon: '号召性用语:',
	},
	charCount: {
		charactersLimitMessage: /* istanbul ignore next */ (limit: number) =>
			`您最多可以输入 ${limit} 个字符`,
		charactersRemainingMessage: /* istanbul ignore next */ (total: number) =>
			`您还剩 ${total} 个字符`,
	},
	dataGrid: {
		cell: {
			selected: '已选择',
			button: '（按钮）',
		},
	},
	pagination: {
		previousPageLabel: '转至上一页',
		nextPageLabel: '转至下一页',
		goToPageLabel: /* istanbul ignore next */ (index: number | string) =>
			`转至第 ${index} 页`,
	},
	tag: {
		remove: /* istanbul ignore next */ (label: string) => `移除 ${label}`,
	},
	toggletip: {
		anchorLabel: /* istanbul ignore next */ (ariaLabel?: string) =>
			ariaLabel ? `关于 ${ariaLabel} 的更多信息` : `显示更多信息`,
	},
	simpleColorPicker: {
		colorPaletteLabel: '调色板',
		colorSwatchLabel: /* istanbul ignore next */ (
			value: string,
			label?: string,
			selected?: boolean
		) => {
			let swatchLabel = label
				? `选择${label}, 十六进制：${value}`
				: `选择${value}`;
			if (selected) swatchLabel += `，已选择。`;
			return swatchLabel;
		},
	},
};

export default zhCN;
