import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem } from '../../shared/design-system/vivid-design-system.js';

import { TextAnchor } from './text-anchor.js';
import { textAnchorTemplate as template } from './text-anchor.template';

export const vividTextAnchor = TextAnchor.compose<FoundationElementDefinition>({
	baseName: 'text-anchor.js',
	template: template as any,
});

designSystem.register(vividTextAnchor());
