import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import styles from './progress.scss?inline';
import { Progress } from './progress';
import { ProgressTemplate as template } from './progress.template';

export type { ProgressConnotation, ProgressShape } from './progress';

/**
 * @internal
 */
export const progressDefinition = defineVividComponent(
	'progress',
	Progress,
	template,
	[],
	{
		styles,
	}
);

/**
 * Registers the progress elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerProgress = createRegisterFunction(progressDefinition);
