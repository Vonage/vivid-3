import type { Locale } from '../shared/localization/Locale';

const jaJP: Locale = {
	datePicker: {
		months: {
			name: [
				'1月',
				'2月',
				'3月',
				'4月',
				'5月',
				'6月',
				'7月',
				'8月',
				'9月',
				'10月',
				'11月',
				'12月',
			],
			shorthand: [
				'1月',
				'2月',
				'3月',
				'4月',
				'5月',
				'6月',
				'7月',
				'8月',
				'9月',
				'10月',
				'11月',
				'12月',
			],
		},
		weekdays: {
			name: [
				'日曜日',
				'月曜日',
				'火曜日',
				'水曜日',
				'木曜日',
				'金曜日',
				'土曜日',
			],
			shorthand: ['日', '月', '火', '水', '木', '金', '土'],
		},
		firstDayOfWeek: 0,
		dateFormat: 'yyyy年MM月dd日',
		dateFormatPlaceholder: 'YYYY年MM月DD日',
		chooseDateLabel: '日付を選択',
		prevYearLabel: '前年',
		prevMonthLabel: '前月',
		nextMonthLabel: '次月',
		nextYearLabel: '翌年',
		clearLabel: 'クリア',
		okLabel: 'OK',
		invalidDateError: '有効な日付を入力してください。',
	},
	filePicker: {
		invalidFileTypeError: 'この種類のファイルは選択できません。',
		maxFilesExceededError: 'これ以上ファイルを選択できません。',
		fileTooBigError:
			'ファイルが大きすぎます ({{filesize}}MiB)。最大ファイルサイズ: {{maxFilesize}}MiB。',
		removeFileLabel: 'ファイルを削除',
	},
};

export default jaJP;
