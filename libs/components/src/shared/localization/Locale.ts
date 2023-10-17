import type { DatePickerLocale } from '../date-picker/locale';
import type { FilePickerLocale } from '../../lib/file-picker/locale';

export interface Locale {
	datePicker: DatePickerLocale;
	filePicker: FilePickerLocale;
}
