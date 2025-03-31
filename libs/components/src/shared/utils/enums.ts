/**
 * Extracts a subset of enum members from an enum and returns a union of their string literal values.
 * Usage: type MyShape = ExtractFromEnum<Shape, Shape.Rounded | Shape.Pill>;
 * MyShape will have the type 'rounded' | 'pill'
 */
export type ExtractFromEnum<T, U extends string> = `${Extract<T, U>}`;
