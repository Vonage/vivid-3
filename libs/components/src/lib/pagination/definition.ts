import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactory } from '../../shared/design-system';
import styles from './pagination.scss';

import { Pagination } from './pagination';
import { PaginationTemplate as template } from './pagination.template';
import {buttonRegistries} from "@vonage/vivid";

export const paginationDefinition =
	Pagination.compose<FoundationElementDefinition>({
		baseName: 'pagination',
		template: template as any,
		styles,
	});

/**
 * @internal
 */
export const paginationRegistries = [paginationDefinition(), buttonRegistries];

/**
 * Registers the pagination element with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerPagination = registerFactory(paginationRegistries);
