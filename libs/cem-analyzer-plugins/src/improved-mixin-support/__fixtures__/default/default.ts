type Constructor<T = {}> = new (...args: any[]) => T;
type MixinType<T extends (...args: any) => any> = InstanceType<ReturnType<T>>;

export const MyMixin = <T extends Constructor<HTMLElement>>(Base: T) => {
	/**
	 * @event mixin-event
	 * @slot mixin-slot
	 */
	class MyMixinElement extends Base {
		static observedAttributes = ['attribute'];
		attribute?: string;
		property?: string;
		method(): void {}
	}

	return MyMixinElement;
};

export type MyMixinElement = MixinType<typeof MyMixin>;
