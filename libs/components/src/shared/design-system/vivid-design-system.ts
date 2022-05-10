import { DesignSystem } from '@microsoft/fast-foundation';

// common components dependency
/**
 * @param {HTMLElement} element - The element to get or create a design system for.
 * @returns {DesignSystem} - Represents a configurable design system. An API gateway to design system features.
 */
export function provideVividDesignSystem(element?: HTMLElement): DesignSystem {
	return DesignSystem.getOrCreate(element).withPrefix('vwc');
}

export const designSystem = provideVividDesignSystem();
