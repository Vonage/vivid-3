import { DesignSystem } from '@microsoft/fast-foundation';

// common components dependency
/**
 * @param element
 */
export function provideVividDesignSystem(element?: HTMLElement): DesignSystem {
	return DesignSystem.getOrCreate(element).withPrefix('vwc');
}

export const designSystem = provideVividDesignSystem();
