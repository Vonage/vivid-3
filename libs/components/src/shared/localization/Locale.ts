import type { DatePickerLocale } from '../../lib/date-picker/locale';
import type { FilePickerLocale } from '../../lib/file-picker/locale';

export interface Locale {
	datePicker: DatePickerLocale;
	filePicker: FilePickerLocale;
}
