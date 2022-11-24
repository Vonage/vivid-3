import { DesignSystem } from '@microsoft/fast-foundation';

let prefix = 'vwc';

export const overridePrefix = (customPrefix: string) => prefix = customPrefix;

// common components dependency
/**
 * @param {HTMLElement} element - The element to get or create a design system for.
 * @returns {DesignSystem} - Represents a configurable design system. An API gateway to design system features.
 */
export function provideVividDesignSystem(element?: HTMLElement): DesignSystem {
	return DesignSystem.getOrCreate(element).withPrefix(prefix);
}

export const designSystem = provideVividDesignSystem();
