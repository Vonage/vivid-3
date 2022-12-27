import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactory } from '../../shared/design-system';
import { elevationRegistries } from '../elevation/definition';
import styles from './header.scss';
import { Header } from './header';
import { headerTemplate as template } from './header.template';


/**
 * The header element.
 */
export const headerDefinition = Header.compose<FoundationElementDefinition>({
	baseName: 'header',
	template: template as any,
	styles,
});

/**
 * @internal
 */
export const headerRegistries = [headerDefinition(), ...elevationRegistries];

/**
 * Registers the header elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerHeader = registerFactory(headerRegistries);
