import type { DriverT } from './drivers/driver';
import { BaseComponent, BaseWrapper } from './base';
import { attributeSelector } from './utils/cssSelectors';

export function byTestId<D extends DriverT, W extends BaseWrapper<D>>(
	this: BaseComponent<D, W>,
	id: string
): W {
	return this.wrap(
		this.ctx.driver.querySelector(
			this.ctx.rootLocator,
			attributeSelector(this.componentInfo.name, [
				['data-testid', id],
				['data-test-id', id],
				['data-cy', id],
			])
		)
	);
}

export function byLabel<D extends DriverT, W extends BaseWrapper<D>>(
	this: BaseComponent<D, W>,
	label: string
): W {
	return this.wrap(
		this.ctx.driver.querySelector(
			this.ctx.rootLocator,
			attributeSelector(this.componentInfo.name, [
				['label', label],
				['aria-label', label],
				['data-vvd-aria-label', label],
			])
		)
	);
}

export function byHeading<D extends DriverT, W extends BaseWrapper<D>>(
	this: BaseComponent<D, W>,
	heading: string
): W {
	return this.wrap(
		this.ctx.driver.querySelector(
			this.ctx.rootLocator,
			attributeSelector(this.componentInfo.name, [['heading', heading]])
		)
	);
}

export function byHeadline<D extends DriverT, W extends BaseWrapper<D>>(
	this: BaseComponent<D, W>,
	headline: string
): W {
	return this.wrap(
		this.ctx.driver.querySelector(
			this.ctx.rootLocator,
			attributeSelector(this.componentInfo.name, [['headline', headline]])
		)
	);
}

export function byText<D extends DriverT, W extends BaseWrapper<D>>(
	this: BaseComponent<D, W>,
	text: string
): W {
	return this.wrap(
		this.ctx.driver.querySelector(
			this.ctx.rootLocator,
			attributeSelector(this.componentInfo.name, [['text', text]])
		)
	);
}
