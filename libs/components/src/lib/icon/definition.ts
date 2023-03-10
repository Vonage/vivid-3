import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactory } from '../../shared/design-system';
import styles from './icon.scss';
import { Icon } from './icon';
import { iconTemplate as template } from './icon.template';

export type { IconConnotation } from './icon';

export const iconDefinition = Icon.compose<FoundationElementDefinition>({
	baseName: 'icon',
	template: template as any,
	styles,
});

/**
 * @internal
 */
export const iconRegistries = [iconDefinition()];

/**
 * Registers the icon component & its prerequisite components with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerIcon = registerFactory(iconRegistries);
