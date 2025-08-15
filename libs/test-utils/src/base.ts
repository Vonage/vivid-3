import type { Driver, DriverT } from './drivers/driver';

export type Context<D extends DriverT> = {
	rootLocator: D['rootLocator'];
	driver: Driver<D>;
};

export type ComponentInfo = {
	name: string;
};

export abstract class BaseWrapper<
	D extends DriverT,
	E extends HTMLElement = HTMLElement
> {
	constructor(
		protected readonly ctx: Context<D>,
		protected readonly locator: D['locator']
	) {}

	abstract componentInfo: ComponentInfo;

	unwrap() {
		return this.locator;
	}

	protected assert<A = unknown, Q = unknown>(
		message: string,
		query: (el: E, arg: A) => Q,
		expectedValue: Q,
		arg?: A
	) {
		return this.ctx.driver.expectEq(
			{
				type: 'eval',
				el: this.locator,
				fn: query,
				arg,
			},
			expectedValue,
			`Failed to assert condition: "${message}"`
		);
	}
}

export abstract class BaseComponent<
	D extends DriverT,
	W extends BaseWrapper<D>
> {
	constructor(protected readonly ctx: Context<D>) {}

	abstract componentInfo: ComponentInfo;

	abstract wrap(locator: D['locator']): W;

	all = this.ctx.driver.wrapSelector(
		() =>
			new ComponentCollection(
				this.ctx,
				this,
				this.ctx.driver.querySelectorAll(
					this.ctx.rootLocator,
					`[data-vvd-component="${this.componentInfo.name}"]`
				)
			)
	);
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

	nth = this.ctx.driver.wrapSelector((n: number) =>
		this.component.wrap(this.ctx.driver.nth(this.locator, n))
	);
}

export class ComponentCollectionExpectations<D extends DriverT> {
	constructor(
		private readonly ctx: Context<D>,
		private readonly locator: ComponentCollectionLocator<D, any>
	) {}

	toHaveCount = this.ctx.driver.wrapExpect((n: number) =>
		this.ctx.driver.expectEq(
			{
				el: (this.locator as any).locator, // FIXME: retrieve the locator correctly
				type: 'count',
			},
			n,
			`toHaveCount(${n})`
		)
	);
}
