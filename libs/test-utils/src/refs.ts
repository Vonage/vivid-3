import type { DriverT } from './drivers/driver';
import { BaseWrapper } from './base';
import { ButtonWrapper, TextFieldWrapper } from './components.generated';

export function light<D extends DriverT>(
	this: BaseWrapper<D>,
	selector: string
): D['locator'] {
	return this.ctx.driver.querySelector(this.unwrap(), selector);
}

export function shadow<D extends DriverT>(
	this: BaseWrapper<D>,
	selector: string
): D['locator'] {
	return this.ctx.driver.querySelector(
		this.ctx.driver.enterShadow(this.unwrap()),
		selector
	);
}

export function nestedShadow<D extends DriverT>(
	this: BaseWrapper<D>,
	selector1: string,
	selector2: string
): D['locator'] {
	return this.ctx.driver.querySelector(
		this.ctx.driver.enterShadow(
			this.ctx.driver.querySelector(
				this.ctx.driver.enterShadow(this.unwrap()),
				selector1
			)
		),
		selector2
	);
}

export function shadowButton<D extends DriverT>(
	this: BaseWrapper<D>,
	selector: string
): ButtonWrapper<D> {
	return new ButtonWrapper(
		this.ctx,
		this.ctx.driver.querySelector(
			this.ctx.driver.enterShadow(this.unwrap()),
			selector
		)
	);
}

export function shadowTextField<D extends DriverT>(
	this: BaseWrapper<D>,
	selector: string
): TextFieldWrapper<D> {
	return new TextFieldWrapper(
		this.ctx,
		this.ctx.driver.querySelector(
			this.ctx.driver.enterShadow(this.unwrap()),
			selector
		)
	);
}
