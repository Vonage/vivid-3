import type { DatePickerLocale } from '../date-picker/locale';
import type { FilePickerLocale } from '../../lib/file-picker/locale';
import type { AudioPlayerLocale } from '../../lib/audio-player/locale';
import type { AlertLocale } from '../../lib/alert/locale';
import type { DialogLocale } from '../../lib/dialog/locale';
import type { BannerLocale } from '../../lib/banner/locale';
import type { NumberFieldLocale } from '../../lib/number-field/locale';
import type { SplitButtonLocale } from '../../lib/split-button/locale';

export interface Locale {
	datePicker: DatePickerLocale;
	filePicker: FilePickerLocale;
	audioPlayer: AudioPlayerLocale;
	alert: AlertLocale;
	dialog: DialogLocale;
	banner: BannerLocale;
	numberField: NumberFieldLocale;
	splitButton: SplitButtonLocale;
}
