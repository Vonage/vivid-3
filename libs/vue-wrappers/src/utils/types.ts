export type ComponentSlots<T> = T extends new (...args: any) => {
	$slots: infer S;
}
	? NonNullable<S>
	: T extends (
			props: any,
			ctx: { slots: infer S; attrs: any; emit: any },
			...args: any
	  ) => any
	? NonNullable<S>
	: never;
