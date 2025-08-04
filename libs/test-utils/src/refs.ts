import type { DriverT } from './drivers/driver';
import { BaseWrapper, type Context } from './base';

export function light<D extends DriverT>(
	ctx: Context<D>,
	component: BaseWrapper<D>,
	selector: string
): D['locator'] {
	return ctx.driver.querySelector(component.unwrap(), selector);
}

export function shadow<D extends DriverT>(
	ctx: Context<D>,
	component: BaseWrapper<D>,
	selector: string
): D['locator'] {
	return ctx.driver.querySelector(
		ctx.driver.enterShadow(component.unwrap()),
		selector
	);
}
