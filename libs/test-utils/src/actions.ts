import type { DriverT } from './drivers/driver';
import type { ComponentInfo, Context } from './base';

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

export function check<D extends DriverT>(
	ctx: Context<D>,
	component: ComponentInfo,
	locator: () => D['locator']
): D['actionReturn'] {
	return ctx.driver.userClick(locator());
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

export function selectOptionByText<D extends DriverT>(
	ctx: Context<D>,
	component: ComponentInfo,
	locator: () => D['locator'],
	text: string
): D['actionReturn'] {
	return ctx.driver.actionSequence([
		() => ctx.driver.userClick(locator()),
		() =>
			ctx.driver.userClick(
				ctx.driver.querySelector(locator(), `[text="${text}"]`)
			),
	]);
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
