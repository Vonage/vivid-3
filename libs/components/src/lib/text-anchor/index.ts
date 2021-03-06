import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem } from '../../shared/design-system';

import { TextAnchor } from './text-anchor';
import { textAnchorTemplate as template } from './text-anchor.template';

export const vividTextAnchor = TextAnchor.compose<FoundationElementDefinition>({
	baseName: 'text-anchor',
	template: template as any,
});

designSystem.register(vividTextAnchor());
