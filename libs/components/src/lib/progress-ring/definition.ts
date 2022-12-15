import type {FoundationElementDefinition} from '@microsoft/fast-foundation';
import { registerFactory } from '../../shared/design-system';
import styles from './progress-ring.scss';

import {ProgressRing} from './progress-ring';
import {ProgressRingTemplate as template} from './progress-ring.template';

/**
 * The progress-ring element.
 *
 * @internal
 */
export const progressRing =
	ProgressRing.compose<FoundationElementDefinition>({
		baseName: 'progress-ring',
		template: template as any,
		styles,
	});

export const progressRingRegistries = [progressRingDefinition()];

/**
 * Registers the progress-ring  elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerProgressRing = registerFactory(progressRingRegistries);
