import { iconDefinition } from '../icon/definition';
import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import { Tag } from './tag';
import styles from './tag.scss?inline';
import { tagTemplate as template } from './tag.template';

export type { TagConnotation, TagAppearance, TagShape } from './tag';

/**
 * @internal
 */
export const tagDefinition = defineVividComponent(
	'tag',
	Tag,
	template,
	[iconDefinition],
	{
		styles,
		shadowOptions: {
			delegatesFocus: true,
		},
	}
);

/**
 * Registers the tag elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerTag = createRegisterFunction(tagDefinition);
