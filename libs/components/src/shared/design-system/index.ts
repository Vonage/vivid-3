import { DesignSystem } from '@microsoft/fast-foundation';


// common components dependency
/**
 * @param {HTMLElement} element - The element to get or create a design system for.
 * @param prefix
 * @returns {DesignSystem} - Represents a configurable design system. An API gateway to design system features.
 */
const designSystem = DesignSystem.getOrCreate();

export const register = (prefix = 'vwc', ...elements: any[]) => {
	designSystem.withPrefix(prefix).register(elements);
};
