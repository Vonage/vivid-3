import type {FoundationElementDefinition} from '@microsoft/fast-foundation';
import {designSystem} from '../../shared/design-system';
import styles from './progress-ring.scss';

import {ProgressRing} from './progress-ring';
import {ProgressRingTemplate as template} from './progress-ring.template';

export const vividProgressRing =
	ProgressRing.compose<FoundationElementDefinition>({
		baseName: 'progress-ring',
		template: template as any,
		styles,
	});

designSystem.register(vividProgressRing());
