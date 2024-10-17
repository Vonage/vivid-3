/* eslint-disable-next-line @typescript-eslint/ban-types */
export type Class<T, C = {}> = C & {
  readonly prototype: T;
  new (...args: any[]): T;
};