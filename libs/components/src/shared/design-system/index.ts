import { DesignSystem } from '@microsoft/fast-foundation';

export let defaultPrefix = 'vwc';

export const setDefaultPrefix = (prefix: string) => defaultPrefix = prefix;

export const getPrefix = (url: string) => new URL(url).searchParams.get('prefix') || defaultPrefix;

// common components dependency
/**
 * @param {HTMLElement} element - The element to get or create a design system for.
 * @param prefix
 * @returns {DesignSystem} - Represents a configurable design system. An API gateway to design system features.
 */
export const designSystem = DesignSystem.getOrCreate();
