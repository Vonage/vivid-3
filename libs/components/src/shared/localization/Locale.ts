import type { DatePickerLocale } from '../date-picker/locale';
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

export interface Locale {
	lang: string;
	common: {
		useCommaAsDecimalSeparator: boolean;
	};
	datePicker: DatePickerLocale;
	timePicker: TimePickerLocale;
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
}
