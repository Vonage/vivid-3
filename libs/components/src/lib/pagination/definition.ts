import { buttonDefinition } from '../button/definition';
import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import styles from './pagination.scss?inline';
import { Pagination } from './pagination';
import { PaginationTemplate as template } from './pagination.template';

export type { PaginationShape, PaginationSize } from './pagination';

/**
 * @internal
 */
export const paginationDefinition = defineVividComponent(
	'pagination',
	Pagination,
	template,
	[buttonDefinition],
	{
		styles,
	}
);

/**
 * Registers the pagination element with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerPagination = createRegisterFunction(paginationDefinition);

export { Pagination as VwcPaginationElement };
