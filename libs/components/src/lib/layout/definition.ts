import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import { Layout } from './layout';
import styles from './layout.scss?inline';
import { layoutTemplate as template } from './layout.template';

export type {
	AUTO_SIZING,
	ColumnBasis,
	ColumnSpacing,
	RowSpacing,
	Gutters,
} from './layout';

/**
 * @internal
 */
export const layoutDefinition = defineVividComponent(
	'layout',
	Layout,
	template,
	[],
	{
		styles,
	}
);

/**
 * Registers the layout elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerLayout = createRegisterFunction(layoutDefinition);
