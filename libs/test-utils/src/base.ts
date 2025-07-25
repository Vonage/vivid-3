import type { Driver, DriverT } from './drivers/driver';

export type Context<D extends DriverT> = {
	prefix: string;
	rootLocator: D['rootLocator'];
	driver: Driver<D>;
};

export type ComponentInfo = {
	name: string;
};

export abstract class BaseWrapper<D extends DriverT> {
	constructor(
		protected readonly ctx: Context<D>,
		protected readonly locator: D['locator']
	) {}

	abstract componentInfo: ComponentInfo;

	unwrap() {
		return this.locator;
	}
}

export abstract class BaseComponent<
	D extends DriverT,
	W extends BaseWrapper<D>
> {
	constructor(protected readonly ctx: Context<D>) {}

	abstract componentInfo: ComponentInfo;

	abstract wrap(locator: D['locator']): W;

	all() {
		return new ComponentCollection(
			this.ctx,
			this,
			this.ctx.driver.querySelectorAll(
				this.ctx.rootLocator,
				`${this.ctx.prefix}-${this.componentInfo.name}`
			)
		);
	}
}

export type ComponentCollectionLocator<
	D extends DriverT,
	W extends BaseWrapper<D>
> = ComponentCollection<D, W>;

export class ComponentCollection<D extends DriverT, W extends BaseWrapper<D>> {
	constructor(
		private ctx: Context<D>,
		private readonly component: BaseComponent<D, W>,
		private readonly locator: D['locatorMultiple']
	) {}

	type = 'collection' as const;

	nth(n: number) {
		return this.component.wrap(this.ctx.driver.nth(this.locator, n));
	}
}

export class ComponentCollectionExpectations<D extends DriverT> {
	constructor(
		private readonly ctx: Context<D>,
		private readonly locator: ComponentCollectionLocator<D, any>
	) {}

	toHaveCount(n: number) {
		return this.ctx.driver.expectEq(
			{
				el: (this.locator as any).locator, // FIXME: retrieve the locator correctly
				type: 'count',
			},
			n
		);
	}
}
