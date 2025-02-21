/* eslint-disable @typescript-eslint/ban-types */

// Utilities to create mixins using the pattern described in https://www.typescriptlang.org/docs/handbook/mixins.html

export type Constructor<T = {}> = new (...args: any[]) => T;
export type AbstractConstructor<T = {}> = abstract new (...args: any[]) => T;

/**
 * Returns the instance type of a mixin function.
 */
export type MixinType<T extends (...args: any) => any> = InstanceType<
	ReturnType<T>
>;
