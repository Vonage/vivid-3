import { iconDefinition } from '@vonage/vivid';
import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import { TextAnchor } from './text-anchor';
import { textAnchorTemplate as template } from './text-anchor.template';

export type {
	TextAnchorConnotation,
	TextAnchorAppearance,
} from './text-anchor';

/**
 * @internal
 */
export const textAnchorDefinition = defineVividComponent(
	'text-anchor',
	TextAnchor,
	template,
	[iconDefinition],
	{}
);

/**
 * Registers the text-anchor elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerTextAnchor = createRegisterFunction(textAnchorDefinition);
