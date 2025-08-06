import type { DriverT } from './drivers/driver';
import { BaseWrapper, type Context } from './base';
import { ButtonWrapper, TextFieldWrapper } from './components.generated';

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

export function nestedShadow<D extends DriverT>(
	ctx: Context<D>,
	component: BaseWrapper<D>,
	selector1: string,
	selector2: string
): D['locator'] {
	return ctx.driver.querySelector(
		ctx.driver.enterShadow(
			ctx.driver.querySelector(
				ctx.driver.enterShadow(component.unwrap()),
				selector1
			)
		),
		selector2
	);
}

export function shadowButton<D extends DriverT>(
	ctx: Context<D>,
	component: BaseWrapper<D>,
	selector: string
): ButtonWrapper<D> {
	return new ButtonWrapper(
		ctx,
		ctx.driver.querySelector(
			ctx.driver.enterShadow(component.unwrap()),
			selector
		)
	);
}

export function shadowTextField<D extends DriverT>(
	ctx: Context<D>,
	component: BaseWrapper<D>,
	selector: string
): TextFieldWrapper<D> {
	return new TextFieldWrapper(
		ctx,
		ctx.driver.querySelector(
			ctx.driver.enterShadow(component.unwrap()),
			selector
		)
	);
}
