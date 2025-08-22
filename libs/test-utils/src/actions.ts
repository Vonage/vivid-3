import type { DriverT } from './drivers/driver';
import { BaseWrapper } from './base';
import { runSequence } from './utils/runSequence';
import {
	type AccordionItemWrapper,
	type ButtonWrapper,
	type ComboboxWrapper,
	type DatePickerWrapper,
	type DateRangePickerWrapper,
	type DateTimePickerWrapper,
	type NavDisclosureWrapper,
	type PaginationWrapper,
	TagWrapper,
	type TimePickerWrapper,
} from './components.generated';
import * as queries from './queries';
import { attributeSelector } from './utils/cssSelectors';

export function click<D extends DriverT>(
	this: BaseWrapper<D>,
	locator: () => D['locator']
): D['actionReturn'] {
	return this.ctx.driver.userClick(locator());
}

export function fill<D extends DriverT>(
	this: BaseWrapper<D>,
	locator: () => D['locator'],
	text: string
): D['actionReturn'] {
	return this.ctx.driver.userFill(locator(), text);
}

export function comboboxFill<D extends DriverT>(
	this: ComboboxWrapper<D>,
	text: string
): D['actionReturn'] {
	return runSequence([
		() => this.ctx.driver.userFill(this.control(), text),
		() => this.ctx.driver.userBlur(this.control()), // Combobox only updates value on blur
	]);
}

export function clear<D extends DriverT>(
	this: BaseWrapper<D>,
	locator: () => D['locator']
): D['actionReturn'] {
	return this.ctx.driver.userClear(locator());
}

export function comboboxClear<D extends DriverT>(
	this: ComboboxWrapper<D>
): D['actionReturn'] {
	return runSequence([
		() => this.ctx.driver.userClear(this.control()),
		() => this.ctx.driver.userBlur(this.control()), // Combobox only updates value on blur
	]);
}

export function check<D extends DriverT>(
	this: BaseWrapper<D>,
	locator: () => D['locator']
): D['actionReturn'] {
	return runSequence([
		() =>
			this.assert(
				'Component is unchecked before it can be checked',
				queries.checkedState,
				'unchecked'
			),
		() => this.ctx.driver.userClick(locator()),
		() =>
			this.assert(
				'Component is checked after checking it',
				queries.checkedState,
				'checked'
			),
	]);
}

export function uncheck<D extends DriverT>(
	this: BaseWrapper<D>,
	locator: () => D['locator']
): D['actionReturn'] {
	return runSequence([
		() =>
			this.assert(
				'Component is checked before it can be unchecked',
				queries.checkedState,
				'checked'
			),
		() => this.ctx.driver.userClick(locator()),
		() =>
			this.assert(
				'Component is unchecked after unchecking it',
				queries.checkedState,
				'unchecked'
			),
	]);
}

export function focus<D extends DriverT>(
	this: BaseWrapper<D>,
	locator: () => D['locator']
): D['actionReturn'] {
	return this.ctx.driver.userFocus(locator());
}

export function blur<D extends DriverT>(
	this: BaseWrapper<D>,
	locator: () => D['locator']
): D['actionReturn'] {
	return this.ctx.driver.userBlur(locator());
}

export function hover<D extends DriverT>(
	this: BaseWrapper<D>,
	locator: () => D['locator']
): D['actionReturn'] {
	return this.ctx.driver.userHover(locator());
}

export function selectOptionByValue<D extends DriverT>(
	this: BaseWrapper<D>,
	value: string
): D['actionReturn'] {
	// prettier-ignore
	return (selectOption<D>).call(this, attributeSelector("option", [["value", value]]))
}

export function selectOptionByText<D extends DriverT>(
	this: BaseWrapper<D>,
	text: string
): D['actionReturn'] {
	// prettier-ignore
	return (selectOption<D>).call(this, attributeSelector("option", [["text", text]]))
}

function selectOption<D extends DriverT>(
	this: BaseWrapper<D>,
	optionSelector: string
): D['actionReturn'] {
	return this.ctx.driver.eval(
		this.locator,
		(host: any) => host.open,
		undefined,
		(open: boolean) => {
			return runSequence([
				// Open the component if needed
				() => {
					if (!open) {
						return this.ctx.driver.userClick(this.locator);
					} else {
						return undefined;
					}
				},
				() =>
					this.ctx.driver.expectEq(
						{
							type: 'eval',
							el: this.ctx.driver.querySelector(this.locator, optionSelector),
							fn: (el: any) => Boolean(el.selected),
						},
						false,
						'Option is unselected before it can be selected'
					),
				() =>
					this.ctx.driver.expectEq(
						{
							type: 'eval',
							el: this.ctx.driver.querySelector(this.locator, optionSelector),
							fn: (el: any) => Boolean(el.disabled),
						},
						false,
						'Option is not disabled before it can be selected'
					),
				// Click the option to select it
				// Note: simulate click instead of using userClick to work around Cypress bug
				// When clicking on an option, Cypress incorrectly blurs the host, which in case of combobox closes it
				() =>
					this.ctx.driver.eval(
						this.ctx.driver.querySelector(this.locator, optionSelector),
						(el: any) => el.click()
					),
				() =>
					this.ctx.driver.expectEq(
						{
							type: 'eval',
							el: this.ctx.driver.querySelector(this.locator, optionSelector),
							fn: (el: any) => Boolean(el.selected),
						},
						true,
						'Option is selected after selecting it'
					),
			]);
		}
	);
}

export function clickButton<D extends DriverT>(
	this: BaseWrapper<D>,
	locator: () => ButtonWrapper<D>
): D['actionReturn'] {
	return locator().click();
}

const formatDateEnUS = (date: string): string => {
	const [year, month, day] = date.split('-');
	return `${month}/${day}/${year}`;
};

export function selectDate<D extends DriverT>(
	this: DatePickerWrapper<D>,
	date: string
): D['actionReturn'] {
	return runSequence([
		() => this.control().fill(formatDateEnUS(date)),
		() => this.control().blur(),
	]);
}

interface PickerWrapper<D extends DriverT> extends BaseWrapper<D> {
	pickerButton(): ButtonWrapper<D>;
	clearButton(): ButtonWrapper<D>;
}

export function clearPicker<D extends DriverT>(
	this: PickerWrapper<D>
): D['actionReturn'] {
	return runSequence([
		() => this.pickerButton().click(),
		() => this.clearButton().click(),
	]);
}

const formatTimeEnUS = (time: string): string => {
	const [hours, minutes, seconds] = time.split(':');
	const formattedHours = +hours % 12 || 12; // Convert to 12-hour format
	const meridian = +hours < 12 ? 'AM' : 'PM';
	return `${formattedHours}:${minutes}:${seconds} ${meridian}`;
};

export function selectTime<D extends DriverT>(
	this: TimePickerWrapper<D>,
	time: string
): D['actionReturn'] {
	return runSequence([
		() => this.control().fill(formatTimeEnUS(time)),
		() => this.control().blur(),
	]);
}

const formatDateRangeEnUS = ([start, end]: [string, string]): string => {
	return `${formatDateEnUS(start)} – ${formatDateEnUS(end)}`;
};

export function selectDateRange<D extends DriverT>(
	this: DateRangePickerWrapper<D>,
	range: [string, string]
): D['actionReturn'] {
	return runSequence([
		() => this.control().fill(formatDateRangeEnUS(range)),
		() => this.control().blur(),
	]);
}

const formatDateTimeEnUS = (dateTime: string): string => {
	const [date, time] = dateTime.split('T');
	return `${formatDateEnUS(date)} ${formatTimeEnUS(time)}`;
};

export function selectDateTime<D extends DriverT>(
	this: DateTimePickerWrapper<D>,
	dateTime: string
): D['actionReturn'] {
	return runSequence([
		() => this.control().fill(formatDateTimeEnUS(dateTime)),
		() => this.control().blur(),
	]);
}

export function slideTo<D extends DriverT>(
	this: BaseWrapper<D>,
	track: () => D['locator'],
	thumb: () => D['locator'],
	value: number
): D['actionReturn'] {
	return this.ctx.driver.userDragSlider(this.locator, track(), thumb(), value);
}

export function clickPaginationPage<D extends DriverT>(
	this: PaginationWrapper<D>,
	pageIndex: number
): D['actionReturn'] {
	return this.ctx.driver.userClick(
		this.ctx.driver.querySelector(
			this.ctx.driver.enterShadow(this.locator),
			`.vwc-pagination-button[label="${pageIndex + 1}"]`
		)
	);
}

export function toggleAccordionItem<D extends DriverT>(
	this: AccordionItemWrapper<D>,
	expand: boolean
): D['actionReturn'] {
	return runSequence([
		() =>
			this.assert(
				`Component is ${expand ? 'collapsed' : 'expanded'} before it can be ${
					expand ? 'expanded' : 'collapsed'
				}`,
				(el) => Boolean(el.expanded),
				!expand
			),
		() => this.ctx.driver.userClick(this.button()),
		() =>
			this.assert(
				`Component is ${expand ? 'expanded' : 'collapsed'} after ${
					expand ? 'expanding' : 'collapsing'
				} it`,
				(el) => Boolean(el.expanded),
				expand
			),
	]);
}

export function toggleNavDisclosure<D extends DriverT>(
	this: NavDisclosureWrapper<D>,
	expand: boolean
): D['actionReturn'] {
	return runSequence([
		() =>
			this.assert(
				`Component is ${expand ? 'closed' : 'open'} before it can be ${
					expand ? 'expanded' : 'collapsed'
				}`,
				(el) => Boolean(el.open),
				!expand
			),
		() => this.ctx.driver.userClick(this.summary()),
		() =>
			this.assert(
				`Component is ${expand ? 'open' : 'closed'} after ${
					expand ? 'expanding' : 'collapsing'
				} it`,
				(el) => Boolean(el.open),
				expand
			),
	]);
}

export function toggleTag<D extends DriverT>(
	this: TagWrapper<D>,
	select: boolean
): D['actionReturn'] {
	return runSequence([
		() => this.ctx.driver.userClick(this.base()),
		() =>
			this.assert(
				`Component is ${select ? 'selected' : 'unselected'} after ${
					select ? 'selecting' : 'unselecting'
				} it`,
				(el) => Boolean(el.selected),
				select
			),
	]);
}
