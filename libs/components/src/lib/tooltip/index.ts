import '../popup';

import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem } from '../../shared/design-system';
import styles from './tooltip.scss';

import { Tooltip } from './tooltip';
import { TooltipTemplate as template } from './tooltip.template';

export const vividTooltip = Tooltip.compose<FoundationElementDefinition>({
	baseName: 'tooltip',
	template: template as any,
	styles,
});

designSystem.register(vividTooltip());
