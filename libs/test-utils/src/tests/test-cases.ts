import { accordionTests } from './cases/accordion/tests';
import { alertTests } from './cases/alert/tests';
import { bannerTests } from './cases/banner/tests';
import { navTests } from './cases/nav/tests';
import { switchTests } from './cases/switch/tests';
import { tabsTests } from './cases/tabs/tests';
import { tooltipTests } from './cases/tooltip/tests';
import { tagTests } from './cases/tag/tests';
import { checkboxTests } from './cases/checkbox/tests';
import { menuTests } from './cases/menu/tests';
import { toggletipTests } from './cases/toggletip/tests';
import { radioTests } from './cases/radio/tests';
import { selectTests } from './cases/select/tests';
import { textFieldTests } from './cases/text-field/tests';
import { textAreaTests } from './cases/text-area/tests';
import { buttonTests } from './cases/button/tests';
import { fabTests } from './cases/fab/tests';
import { searchableSelectTests } from './cases/searchable-select/tests';
import { selectableBoxTests } from './cases/selectable-box/tests';
import { dialogTests } from './cases/dialog/tests';
import { datePickerTests } from './cases/date-picker/tests';
import { timePickerTests } from './cases/time-picker/tests';
import { dateRangePickerTests } from './cases/date-range-picker/tests';
import { dateTimePickerTests } from './cases/date-time-picker/tests';
import { iconTests } from './cases/icon/tests';
import { sliderTests } from './cases/slider/tests';
import { rangeSliderTests } from './cases/range-slider/tests';
import { numberFieldTests } from './cases/number-field/tests';
import { comboboxTests } from './cases/combobox/tests';
import { splitButtonTests } from './cases/split-button/tests';
import { paginationTests } from './cases/pagination/tests';
import { collectionsTests } from './cases/collections/tests';

export const testCases = [
	...accordionTests,
	...alertTests,
	...bannerTests,
	...collectionsTests,
	...navTests,
	...radioTests,
	...selectTests,
	...switchTests,
	...tabsTests,
	...tooltipTests,
	...toggletipTests,
	...tagTests,
	...menuTests,
	...checkboxTests,
	...textFieldTests,
	...textAreaTests,
	...buttonTests,
	...fabTests,
	...searchableSelectTests,
	...selectableBoxTests,
	...dialogTests,
	...datePickerTests,
	...timePickerTests,
	...dateRangePickerTests,
	...dateTimePickerTests,
	...iconTests,
	...sliderTests,
	...rangeSliderTests,
	...numberFieldTests,
	...comboboxTests,
	...splitButtonTests,
	...paginationTests,
];
