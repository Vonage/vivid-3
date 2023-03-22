import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactory } from '../../shared/design-system';
import styles from './progress.scss';

import { Progress } from './progress';
import { ProgressTemplate as template } from './progress.template';

export type { ProgressConnotation, ProgressShape } from './progress';

/**
 * The progress element.
 */
export const progressDefinition = Progress.compose<FoundationElementDefinition>({
	baseName: 'progress',
	template: template as any,
	styles,
});

/**
 * @internal
 */
export const progressRegistries = [progressDefinition()];

/**
 * Registers the progress elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerProgress = registerFactory(progressRegistries);
