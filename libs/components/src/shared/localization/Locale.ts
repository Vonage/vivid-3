import type { DatePickerLocale } from '../date-picker/locale';
import type { FilePickerLocale } from '../../lib/file-picker/locale';
import type { AudioPlayerLocale } from '../../lib/audio-player/locale';
import type { DialogLocale } from '../../lib/dialog/locale';
import type { NumberFieldLocale } from '../../lib/number-field/locale';

export interface Locale {
	datePicker: DatePickerLocale;
	filePicker: FilePickerLocale;
	audioPlayer: AudioPlayerLocale;
	dialog: DialogLocale;
	numberField: NumberFieldLocale;
}
