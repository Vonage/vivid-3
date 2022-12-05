import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem, getPrefix } from '../../shared/design-system';
import styles from './progress.scss';

import { Progress } from './progress';
import { ProgressTemplate as template } from './progress.template';

export const vividProgress = Progress.compose<FoundationElementDefinition>({
	baseName: 'progress',
	template: template as any,
	styles,
});

designSystem.withPrefix(getPrefix(import.meta.url)).register(vividProgress());
