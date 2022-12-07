import { DesignSystem } from '@microsoft/fast-foundation';

// !important: remove export. only use register() to register components
export const getPrefix = (url: string) => new URL(url).searchParams.get('prefix') || 'vwc';

// common components dependency
/**
 * @param {HTMLElement} element - The element to get or create a design system for.
 * @param prefix
 * @returns {DesignSystem} - Represents a configurable design system. An API gateway to design system features.
 */
export const designSystem = DesignSystem.getOrCreate(); // !important: remove export. only use register() to register components

export const register = (prefix = 'vwc', ...elements: any[]) => {
	designSystem.withPrefix(prefix).register(elements);
};
