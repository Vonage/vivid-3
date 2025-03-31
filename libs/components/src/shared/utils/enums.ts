export type ExtractFromEnum<T, U extends string> = `${Extract<T, U>}`;
