import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem, getPrefix } from '../../shared/design-system';
import { Layout } from './layout';
import styles from './layout.scss';
import { layoutTemplate as template } from './layout.template';


/**
 * Represents a layout custom element.
 * layout is...
 */
export const vividLayout = Layout.compose<FoundationElementDefinition>({
	baseName: 'layout',
	template: template as any,
	styles,
});

designSystem.withPrefix(getPrefix(import.meta.url)).register(vividLayout());
