import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactory } from '../../shared/design-system';
import styles from './pagination.scss';

import { Pagination } from './pagination';
import { PaginationTemplate as template } from './pagination.template';

export const paginationDefinition =
	Pagination.compose<FoundationElementDefinition>({
		baseName: 'pagination',
		template: template as any,
		styles,
	});

/**
 * @internal
 */
export const paginationRegistries = [paginationDefinition()];

/**
 * Registers the pagination element with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerPagination = registerFactory(paginationRegistries);
