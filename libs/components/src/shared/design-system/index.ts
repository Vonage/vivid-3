import { DesignSystem } from '@microsoft/fast-foundation';

const defaultPrefix = 'vwc';

// !important: remove export. only use registerFactorial()
export const getPrefix = (url: string) => new URL(url).searchParams.get('prefix') || 'vwc';

// common components dependency
/**
 * @param {HTMLElement} element - The element to get or create a design system for.
 * @param prefix
 * @returns {DesignSystem} - Represents a configurable design system. An API gateway to design system features.
 */
export const designSystem = DesignSystem.getOrCreate(); // !important: remove export. only use registerFactorial()

export const registerFactorial = (...args: any[]) => (prefix = defaultPrefix) => designSystem.withPrefix(prefix).register(...args);
