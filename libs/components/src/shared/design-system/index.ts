import { DesignSystem } from '@microsoft/fast-foundation';

const defaultPrefix = 'vwc';

// common components dependency
/**
 * @param HTMLElement - The element to get or create a design system for.
 * @returns DesignSystem - Represents a configurable design system. An API gateway to design system features.
 */
export const designSystem = DesignSystem.getOrCreate();

export const registerFactory = (registries: any[]) => (prefix = defaultPrefix) => designSystem.withPrefix(prefix).register(...registries);
