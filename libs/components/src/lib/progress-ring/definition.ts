import type {FoundationElementDefinition} from '@microsoft/fast-foundation';
import { registerFactory } from '../../shared/design-system';
import styles from './progress-ring.scss';

import {ProgressRing} from './progress-ring';
import {ProgressRingTemplate as template} from './progress-ring.template';

export type { ProgressRingConnotation } from './progress-ring';

/**
 * The progress-ring element.
 */
export const progressRingDefinition =
	ProgressRing.compose<FoundationElementDefinition>({
		baseName: 'progress-ring',
		template: template as any,
		styles,
	});

/**
 * @internal
 */
export const progressRingRegistries = [progressRingDefinition()];

/**
 * Registers the progress-ring  elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerProgressRing = registerFactory(progressRingRegistries);
