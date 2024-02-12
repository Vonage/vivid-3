import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactory } from '../../shared/design-system';
import styles from './tag-group.scss?inline';

import { TagGroup } from './tag-group';
import { TagGroupTemplate as template } from './tag-group.template';

export const tagGroupDefinition = TagGroup.compose<FoundationElementDefinition>(
	{
		baseName: 'tag-group',
		template: template as any,
		styles,
	}
);

/**
 * @internal
 */
export const tagGroupRegistries = [tagGroupDefinition()];

/**
 * Registers the tag-group element with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerTagGroup = registerFactory(tagGroupRegistries);
