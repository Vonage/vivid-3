import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import styles from './progress-ring.scss?inline';
import { ProgressRing } from './progress-ring';
import { ProgressRingTemplate as template } from './progress-ring.template';

export type { ProgressRingConnotation } from './progress-ring';

/**
 * @internal
 */
export const progressRingDefinition = defineVividComponent(
	'progress-ring',
	ProgressRing,
	template,
	[],
	{
		styles,
	}
);

/**
 * Registers the progress-ring  elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerProgressRing = createRegisterFunction(
	progressRingDefinition
);

export { ProgressRing as VwcProgressRingElement };
