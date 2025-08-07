import type { DriverT } from './drivers/driver';
import { BaseWrapper, type ComponentInfo, type Context } from './base';

const attributeSelector = (
	prefix: string,
	componentName: string,
	attributes: Array<[string, string]>
) => {
	return attributes
		.map(([attr, value]) => `${prefix}-${componentName}[${attr}="${value}"]`)
		.join(',');
};

export function byTestId<D extends DriverT, W extends BaseWrapper<D>>(
	ctx: Context<D>,
	component: ComponentInfo,
	wrap: (locator: D['locator']) => W,
	label: string
): W {
	return wrap(
		ctx.driver.querySelector(
			ctx.rootLocator,
			attributeSelector(ctx.prefix, component.name, [
				['data-testid', label],
				['data-test-id', label],
			])
		)
	);
}

export function byLabel<D extends DriverT, W extends BaseWrapper<D>>(
	ctx: Context<D>,
	component: ComponentInfo,
	wrap: (locator: D['locator']) => W,
	label: string
): W {
	return wrap(
		ctx.driver.querySelector(
			ctx.rootLocator,
			attributeSelector(ctx.prefix, component.name, [
				['label', label],
				['aria-label', label],
			])
		)
	);
}

export function byHeadline<D extends DriverT, W extends BaseWrapper<D>>(
	ctx: Context<D>,
	component: ComponentInfo,
	wrap: (locator: D['locator']) => W,
	headline: string
): W {
	return wrap(
		ctx.driver.querySelector(
			ctx.rootLocator,
			attributeSelector(ctx.prefix, component.name, [['headline', headline]])
		)
	);
}

export function byText<D extends DriverT, W extends BaseWrapper<D>>(
	ctx: Context<D>,
	component: ComponentInfo,
	wrap: (locator: D['locator']) => W,
	text: string
): W {
	return wrap(
		ctx.driver.querySelector(
			ctx.rootLocator,
			attributeSelector(ctx.prefix, component.name, [['text', text]])
		)
	);
}
