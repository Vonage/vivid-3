import type { DriverT } from './drivers/driver';
import type { ComponentInfo, Context } from './base';
import { testSequence } from './tests/utils/testSequence';
import { type ButtonWrapper, TextFieldWrapper } from './components.generated';

export function click<D extends DriverT>(
	ctx: Context<D>,
	component: ComponentInfo,
	locator: () => D['locator']
): D['actionReturn'] {
	return ctx.driver.userClick(locator());
}

export function fill<D extends DriverT>(
	ctx: Context<D>,
	component: ComponentInfo,
	locator: () => D['locator'],
	text: string
): D['actionReturn'] {
	return ctx.driver.userFill(locator(), text);
}

export function comboboxFill<D extends DriverT>(
	ctx: Context<D>,
	component: ComponentInfo,
	locator: () => D['locator'],
	text: string
): D['actionReturn'] {
	return ctx.driver.actionSequence([
		() => ctx.driver.userFill(locator(), text),
		() => ctx.driver.userBlur(locator()), // Combobox only updates value on blur
	]);
}

export function clear<D extends DriverT>(
	ctx: Context<D>,
	component: ComponentInfo,
	locator: () => D['locator']
): D['actionReturn'] {
	return ctx.driver.userClear(locator());
}

export function comboboxClear<D extends DriverT>(
	ctx: Context<D>,
	component: ComponentInfo,
	locator: () => D['locator']
): D['actionReturn'] {
	return ctx.driver.actionSequence([
		() => ctx.driver.userClear(locator()),
		() => ctx.driver.userBlur(locator()), // Combobox only updates value on blur
	]);
}

export function check<D extends DriverT>(
	ctx: Context<D>,
	component: ComponentInfo,
	locator: () => D['locator']
): D['actionReturn'] {
	return testSequence([() => ctx.driver.userClick(locator())]);
}

export function uncheck<D extends DriverT>(
	ctx: Context<D>,
	component: ComponentInfo,
	locator: () => D['locator']
): D['actionReturn'] {
	return testSequence([() => ctx.driver.userClick(locator())]);
}

export function focus<D extends DriverT>(
	ctx: Context<D>,
	component: ComponentInfo,
	locator: () => D['locator']
): D['actionReturn'] {
	return ctx.driver.userFocus(locator());
}

export function blur<D extends DriverT>(
	ctx: Context<D>,
	component: ComponentInfo,
	locator: () => D['locator']
): D['actionReturn'] {
	return ctx.driver.userBlur(locator());
}

export function hover<D extends DriverT>(
	ctx: Context<D>,
	component: ComponentInfo,
	locator: () => D['locator']
): D['actionReturn'] {
	return ctx.driver.userHover(locator());
}

export function selectOptionByValue<D extends DriverT>(
	ctx: Context<D>,
	component: ComponentInfo,
	locator: () => D['locator'],
	value: string
): D['actionReturn'] {
	return ctx.driver.actionSequence([
		() => ctx.driver.userClick(locator()),
		() =>
			ctx.driver.userClick(
				ctx.driver.querySelector(
					locator(),
					`[data-vvd-component=option][value="${value}"]`
				)
			),
	]);
}

export function selectOptionByText<D extends DriverT>(
	ctx: Context<D>,
	component: ComponentInfo,
	locator: () => D['locator'],
	text: string
): D['actionReturn'] {
	return ctx.driver.eval(
		locator(),
		(host: any) => host.open,
		undefined,
		(open: boolean) => {
			return testSequence([
				// Open the component if needed
				() => {
					if (!open) {
						return ctx.driver.userClick(locator());
					} else {
						return undefined;
					}
				},
				// Check that the option is not already selected
				() =>
					ctx.driver.expectEq(
						{
							type: 'eval',
							el: ctx.driver.querySelector(
								locator(),
								`[data-vvd-component=option][text="${text}"]`
							),
							fn: (el: any) => Boolean(el.selected),
						},
						false
					),
				// Check that the option is not disabled
				() =>
					ctx.driver.expectEq(
						{
							type: 'eval',
							el: ctx.driver.querySelector(
								locator(),
								`[data-vvd-component=option][text="${text}"]`
							),
							fn: (el: any) => Boolean(el.disabled),
						},
						false
					),
				// Click the option to select it
				// Note: simulate click instead of using userClick to work around Cypress bug
				// When clicking on an option, Cypress incorrectly blurs the host, which in case of combobox closes it
				() =>
					ctx.driver.eval(
						ctx.driver.querySelector(
							locator(),
							`[data-vvd-component=option][text="${text}"]`
						),
						(el: any) => el.click()
					),
			]);
		}
	);
}

export function toggleOptionsByValue<D extends DriverT>(
	ctx: Context<D>,
	component: ComponentInfo,
	locator: () => D['locator'],
	values: string[]
): D['actionReturn'] {
	return ctx.driver.actionSequence([
		() => ctx.driver.userClick(locator()),
		...values.map(
			(value) => () =>
				ctx.driver.userClick(
					ctx.driver.querySelector(
						locator(),
						`[data-vvd-component=option][value="${value}"]`
					)
				)
		),
	]);
}

export function clickButton<D extends DriverT>(
	ctx: Context<D>,
	component: ComponentInfo,
	locator: () => ButtonWrapper<D>
): D['actionReturn'] {
	return locator().click();
}

const formatDateEnUS = (date: string): string => {
	const [year, month, day] = date.split('-');
	return `${month}/${day}/${year}`;
};

export function selectDate<D extends DriverT>(
	ctx: Context<D>,
	component: ComponentInfo,
	locator: () => TextFieldWrapper<D>,
	date: string
): D['actionReturn'] {
	return ctx.driver.actionSequence([
		() => locator().fill(formatDateEnUS(date)),
		() => locator().blur(),
	]);
}

export function clearPicker<D extends DriverT>(
	ctx: Context<D>,
	component: ComponentInfo,
	pickerButton: () => ButtonWrapper<D>,
	clearButton: () => ButtonWrapper<D>
): D['actionReturn'] {
	return ctx.driver.actionSequence([
		() => pickerButton().click(),
		() => clearButton().click(),
	]);
}

const formatTimeEnUS = (time: string): string => {
	const [hours, minutes, seconds] = time.split(':');
	const formattedHours = +hours % 12 || 12; // Convert to 12-hour format
	const meridian = +hours < 12 ? 'AM' : 'PM';
	return `${formattedHours}:${minutes}:${seconds} ${meridian}`;
};

export function selectTime<D extends DriverT>(
	ctx: Context<D>,
	component: ComponentInfo,
	locator: () => TextFieldWrapper<D>,
	time: string
): D['actionReturn'] {
	return ctx.driver.actionSequence([
		() => locator().fill(formatTimeEnUS(time)),
		() => locator().blur(),
	]);
}

const formatDateRangeEnUS = ([start, end]: [string, string]): string => {
	return `${formatDateEnUS(start)} – ${formatDateEnUS(end)}`;
};

export function selectDateRange<D extends DriverT>(
	ctx: Context<D>,
	component: ComponentInfo,
	locator: () => TextFieldWrapper<D>,
	range: [string, string]
): D['actionReturn'] {
	return ctx.driver.actionSequence([
		() => locator().fill(formatDateRangeEnUS(range)),
		() => locator().blur(),
	]);
}

const formatDateTimeEnUS = (dateTime: string): string => {
	const [date, time] = dateTime.split('T');
	return `${formatDateEnUS(date)} ${formatTimeEnUS(time)}`;
};

export function selectDateTime<D extends DriverT>(
	ctx: Context<D>,
	component: ComponentInfo,
	locator: () => TextFieldWrapper<D>,
	dateTime: string
): D['actionReturn'] {
	return ctx.driver.actionSequence([
		() => locator().fill(formatDateTimeEnUS(dateTime)),
		() => locator().blur(),
	]);
}

export function slideTo<D extends DriverT>(
	ctx: Context<D>,
	component: ComponentInfo,
	locator: () => D['locator'],
	track: () => D['locator'],
	thumb: () => D['locator'],
	value: number
): D['actionReturn'] {
	return ctx.driver.userDragSlider(locator(), track(), thumb(), value);
}

export function clickPaginationPage<D extends DriverT>(
	ctx: Context<D>,
	component: ComponentInfo,
	locator: () => D['locator'],
	pageIndex: number
): D['actionReturn'] {
	return ctx.driver.userClick(
		ctx.driver.querySelector(
			ctx.driver.enterShadow(locator()),
			`.vwc-pagination-button[label="${pageIndex + 1}"]`
		)
	);
}
