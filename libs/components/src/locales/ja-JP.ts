import * as videoPlayerLocale from 'video.js/dist/lang/ja.json';
import type { Locale } from '../shared/localization/Locale';

/* eslint-disable max-len */
const jaJP: Locale = {
	lang: 'ja-JP',
	common: {
		useCommaAsDecimalSeparator: false,
	},
	pickerField: {
		clearLabel: 'クリア',
		okLabel: 'OK',
	},
	calendarPicker: {
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
		changeDateLabel: /* istanbul ignore next */ (date: string) =>
			`日付を変更, ${date}`,
		chooseDatesLabel: '日付を選択',
		changeDatesLabel: /* istanbul ignore next */ (range: string) =>
			`日付を変更, ${range}`,
		prevYearLabel: '前年',
		prevMonthLabel: '前月',
		nextMonthLabel: '次月',
		nextYearLabel: '翌年',
		todayLabel: '今日',
		selectedLabel: '選択済',
		currentLabel: '現在',
		changeMonthLabel: /* istanbul ignore next */ (month: string) =>
			`月を変更, ${month}が選択されています`,
		showCalendarForMonthLabel: /* istanbul ignore next */ (month: string) =>
			`${month}のカレンダーを表示`,
		invalidDateError: '有効な日付を入力してください。',
		invalidDateRangeError: '有効な日付範囲を入力してください。',
		startDateAfterMinDateError: /* istanbul ignore next */ (minDate: string) =>
			`開始日は${minDate}以降である必要があります。`,
		endDateBeforeMaxDateError: /* istanbul ignore next */ (maxDate: string) =>
			`終了日は${maxDate}以前である必要があります。`,
	},
	timePicker: {
		defaultTo12HourClock: false,
		chooseTimeLabel: '時間を選択',
		changeTimeLabel: /* istanbul ignore next */ (time: string) =>
			`時間を変更, ${time}`,
		hoursLabel: '時間',
		minutesLabel: '分',
		secondsLabel: '秒',
		meridiesLabel: '午前/午後',
		invalidTimeError: '有効な時間を入力してください。',
	},
	dateTimePicker: {
		chooseDateTimeLabel: '日付と時刻を選択',
		changeDateTimeLabel: /* istanbul ignore next */ (dateTime: string) =>
			`日付と時刻を変更, ${dateTime}`,
		invalidDateTimeError: '有効な日付と時刻を入力してください。',
		dateBeforeMinDateError: /* istanbul ignore next */ (minDate: string) =>
			`日付は${minDate}以降である必要があります。`,
		dateAfterMaxDateError: /* istanbul ignore next */ (maxDate: string) =>
			`日付は${maxDate}以前である必要があります。`,
		timeBeforeMinTimeError: /* istanbul ignore next */ (minTime: string) =>
			`時刻は${minTime}以降である必要があります。`,
		timeAfterMaxTimeError: /* istanbul ignore next */ (maxTime: string) =>
			`時刻は${maxTime}以前である必要があります。`,
	},
	filePicker: {
		invalidFileTypeError: 'この種類のファイルは選択できません。',
		maxFilesExceededError: 'これ以上ファイルを選択できません。',
		fileTooBigError:
			'ファイルが大きすぎます ({{filesize}}MiB)。最大ファイルサイズ: {{maxFilesize}}MiB。',
		removeFileLabel: 'ファイルを削除',
		invalidFilesError:
			'選択したファイルの1つ以上が無効です。サイズ制限以下の有効なファイル形式のみをアップロードしてください。',
		uploadFilesLabel: 'ファイルをアップロード',
	},
	audioPlayer: {
		playButtonLabel: '開始',
		pauseButtonLabel: '休止',
		sliderLabel: 'オーディオプログレスバー',
		skipForwardButton: '前にスキップ',
		skipBackwardButton: '後方にスキップ',
	},
	alert: {
		dismissButtonLabel: '閉じる',
	},
	dialog: {
		dismissButtonLabel: '閉じる',
	},
	banner: {
		dismissButtonLabel: '閉じる',
	},
	numberField: {
		incrementButtonLabel: /* istanbul ignore next */ (step: number) =>
			step === 1 ? '価値を高める' : `値を${step}増加`,
		decrementButtonLabel: /* istanbul ignore next */ (step: number) =>
			step === 1 ? '値を下げる' : `値を${step}減らす`,
		updatedValueAnnouncement: /* istanbul ignore next */ (value: string) =>
			`更新された値: ${value}`,
	},
	splitButton: {
		showMoreActionsLabel: 'その他の操作を表示',
	},
	videoPlayer: videoPlayerLocale,
	rangeSlider: {
		startThumbLabel: '最小',
		endThumbLabel: '最大',
	},
	dialPad: {
		inputLabel: '電話番号',
		deleteButtonLabel: '最後の桁を削除',
		callButtonLabel: '電話',
		endCallButtonLabel: '通話終了',
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
		errorLabel: 'エラー：',
	},
	tab: {
		dismissButtonLabel: 'このタブを閉じるにはDELETEキーを押してください',
	},
	searchableSelect: {
		clearButtonLabel: '選択をクリア',
		noOptionsMessage: 'オプションがありません',
		noMatchesMessage: 'オプションが見つかりません',
		selectAllLabel: 'すべて選択',
		deselectAllLabel: 'すべて選択解除',
		loadingOptionsMessage: '読み込み中...',
		selectedAllMessage: 'すべてのオプションが選択されました',
		deselectedAllMessage: 'すべてのオプションの選択を解除',
		removeTagButtonLabel: /* istanbul ignore next */ (label: string) =>
			`${label}を削除`,
		optionSelectedMessage: /* istanbul ignore next */ (name: string) =>
			`オプション ${name} が選択されました。`,
		optionDeselectedMessage: /* istanbul ignore next */ (name: string) =>
			`オプション ${name} が選択解除されました。`,
		optionFocusedMessage: /* istanbul ignore next */ (
			name: string,
			position: number,
			total: number,
			selected: boolean
		) =>
			`オプション ${name} ${
				selected ? ', 選択, ' : ''
			} がフォーカスされました。${position}/${total}`,
		maxSelectedMessage: /* istanbul ignore next */ (
			total: number,
			limit: number
		) => `${limit}件中${total}件を選択。`,
	},
	richTextEditor: {
		paragraphStyles: '段落スタイル',
		textSize: '文字サイズ',
		bold: '太字',
		italic: '斜体',
		underline: '下線',
		strikethrough: '取り消し線',
		monospace: '等幅フォント',
		undo: '元に戻す',
		redo: 'やり直し',
		bulletList: '箇条書き',
		numberedList: '番号付きリスト',
		alignment: '配置',
		alignments: {
			left: '左揃え',
			center: '中央揃え',
			right: '右揃え',
		},
		hyperlink: 'ハイパーリンク',
		linkText: 'テキスト',
		linkUrl: 'URL',
		linkTextPlaceholder: 'リンクに変換するテキストを入力',
		linkUrlPlaceholder: 'リンクURLを挿入',
		cancel: 'キャンセル',
		apply: '適用',
		close: '閉じる',
		edit: '編集',
		delete: '削除',
		clickHere: 'ここをクリック',
	},
	button: {
		pendingLabel: '読み込み中',
	},
	feedbackMessage: {
		errorIconText: 'エラー:',
		successIconText: '成功:',
	},
	connotationAnnoncement: {
		accentIcon: 'アクセント:',
		alertIcon: 'アラート:',
		informationIcon: '情報:',
		successIcon: '成功:',
		warningIcon: '警告:',
		announcementIcon: '発表:',
		ctaIcon: '行動喚起:',
	},
	charCount: {
		charactersLimitMessage: /* istanbul ignore next */ (limit: number) =>
			`最大${limit}文字まで入力できます`,
		charactersRemainingMessage: /* istanbul ignore next */ (total: number) =>
			`残り${total}文字`,
	},
	dataGrid: {
		cell: {
			selected: '選択済み',
			button: '（ボタン）',
			sortStatus: {
				ascending: '昇順で並べ替えています。',
				descending: '降順で並べ替えています。',
				none: '並べ替えは適用されていません。',
				other: 'カスタムの並べ替えが適用されています。',
			},
			sortInstruction: {
				ascending: 'クリックすると降順で並べ替えます。',
				descending: 'クリックすると並べ替えを解除します。',
				none: 'クリックすると昇順で並べ替えます。',
				other: 'クリックすると並べ替えをリセットします。',
			},
		},
	},
	pagination: {
		previousPageLabel: '前のページへ',
		nextPageLabel: '次のページへ',
		goToPageLabel: /* istanbul ignore next */ (index: number | string) =>
			`${index}ページへ`,
	},
	tag: {
		remove: /* istanbul ignore next */ (label: string) => `削除する ${label}`,
	},
	toggletip: {
		anchorLabel: /* istanbul ignore next */ (ariaLabel?: string) =>
			ariaLabel ? `さらに情報を表示 ${ariaLabel}` : `さらに情報を表示`,
	},
	baseColorPicker: {
		colorSwatchLabel: /* istanbul ignore next */ (
			value: string,
			label?: string,
			selected?: boolean
		) => {
			let swatchLabel = label
				? `${label}選択, 16 進数: ${value}`
				: `${value}選択`;
			if (selected) swatchLabel += `、選択済み。`;
			return swatchLabel;
		},
	},
	simpleColorPicker: {
		colorPaletteLabel: 'カラーパレット',
	},
	colorPicker: {
		popupLabel: 'カラーピッカー',
		swatchesLabel: '保存された色',
		pickerButtonLabel: 'カラーピッカー',
		hexInputLabel: 'HEXカラーコード',
		saveButtonLabel: '現在の色を保存',
		closeButtonLabel: 'カラーピッカーを閉じる',
		copyButtonLabel: '色をクリップボードにコピー',
		copyErrorText:
			'コピーに失敗しました。クリップボードへのアクセスがブロックされました。もう一度お試しください。',
		copySuccessMessage: /* istanbul ignore next */ (value: string): string =>
			`カラー ${value} がクリップボードにコピーされました。`,
		selectionSuccessMessage: /* istanbul ignore next */ (
			value: string
		): string => `色 ${value} が選択されました。`,
		maxSwatchesMessage: /* istanbul ignore next */ (total, limit): string =>
			`${limit} 色中 ${total} 色を保存しました。`,
	},
};
export default jaJP;
