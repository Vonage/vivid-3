import type { Constructor } from '../../../shared/utils/mixins';
import type { RteBase } from './features/base';
import type { RteFeature } from './feature';
import type { RteToolbarFeature } from './features/toolbar';
import type { RteCharacterCountFeature } from './features/character-count';

// Type-only function that can be overloaded to return the correct public interface for a feature facade.
export declare function getPublicInterface(
	facade: Constructor<RteFeature>
): unknown;

export interface RteBasePublicInterface {
	/**
	 * Whether the editor is disabled. When disabled, user input is prevented and UI elements are disabled.
	 */
	disabled: boolean;
}
export declare function getPublicInterface(
	facade: typeof RteBase
): RteBasePublicInterface;

export interface RteToolbarPublicInterface {
	/**
	 * Whether the toolbar is hidden.
	 */
	hidden: boolean;
}
export declare function getPublicInterface(
	facade: typeof RteToolbarFeature
): RteToolbarPublicInterface;

export interface RteCharacterCountPublicInterface {
	/**
	 * The current number of characters in the document.
	 */
	readonly characters: number;
	/**
	 * The configured character limit, or undefined if no limit is set.
	 */
	readonly limit: number | undefined;
}
export declare function getPublicInterface(
	facade: typeof RteCharacterCountFeature
): RteCharacterCountPublicInterface;
