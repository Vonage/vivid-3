import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import styles from './tag-group.scss?inline';
import { TagGroup } from './tag-group';
import { TagGroupTemplate as template } from './tag-group.template';

/**
 * @internal
 */
export const tagGroupDefinition = defineVividComponent(
	'tag-group',
	TagGroup,
	template,
	[],
	{
		styles,
	}
);

/**
 * Registers the tag-group element with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerTagGroup = createRegisterFunction(tagGroupDefinition);
