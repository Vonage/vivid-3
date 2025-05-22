import type { CalendarPickerLocale } from '../picker-field/mixins/calendar-picker.locale';
import type { FilePickerLocale } from '../../lib/file-picker/locale';
import type { AudioPlayerLocale } from '../../lib/audio-player/locale';
import type { AlertLocale } from '../../lib/alert/locale';
import type { DialogLocale } from '../../lib/dialog/locale';
import type { BannerLocale } from '../../lib/banner/locale';
import type { NumberFieldLocale } from '../../lib/number-field/locale';
import type { SplitButtonLocale } from '../../lib/split-button/locale';
import type { VideoPlayerLocale } from '../../lib/video-player/locale';
import type { TimePickerLocale } from '../../lib/time-picker/locale';
import type { RangeSliderLocale } from '../../lib/range-slider/locale';
import type { DialPadLocale } from '../../lib/dial-pad/locale';
import type { TabLocale } from '../../lib/tab/locale';
import type { SearchableSelectLocale } from '../../lib/searchable-select/locale';
import type { PickerFieldLocale } from '../picker-field/locale';
import type { DateTimePickerLocale } from '../../lib/date-time-picker/locale';
import type { RichTextEditorLocale } from '../../lib/rich-text-editor/locale';
import type { ButtonLocale } from '../../lib/button/locale';
import type { FeedbackMessageLocale } from '../feedback/locale';
import type { CharCountLocale } from '../char-count/locale';

export interface Locale {
	lang: string;
	common: {
		useCommaAsDecimalSeparator: boolean;
	};
	pickerField: PickerFieldLocale;
	calendarPicker: CalendarPickerLocale;
	timePicker: TimePickerLocale;
	dateTimePicker: DateTimePickerLocale;
	filePicker: FilePickerLocale;
	audioPlayer: AudioPlayerLocale;
	alert: AlertLocale;
	dialog: DialogLocale;
	banner: BannerLocale;
	numberField: NumberFieldLocale;
	splitButton: SplitButtonLocale;
	videoPlayer: VideoPlayerLocale;
	rangeSlider: RangeSliderLocale;
	dialPad: DialPadLocale;
	tab: TabLocale;
	searchableSelect: SearchableSelectLocale;
	richTextEditor: RichTextEditorLocale;
	button: ButtonLocale;
	feedbackMessage: FeedbackMessageLocale;
	charCount: CharCountLocale;
}
