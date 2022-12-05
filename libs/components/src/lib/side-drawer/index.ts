import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem, getPrefix } from '../../shared/design-system';
import { SideDrawer } from './side-drawer';
import styles from './side-drawer.scss';
import { sideDrawerTemplate as template } from './side-drawer.template';

/**
 * Represents a side-drawer custom element.
 */
export const vividSideDrawer = SideDrawer.compose<FoundationElementDefinition>({
	baseName: 'side-drawer',
	template: template as any,
	styles,
});

designSystem.withPrefix(getPrefix(import.meta.url)).register(vividSideDrawer());
