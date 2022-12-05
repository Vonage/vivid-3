import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem, getPrefix } from '../../shared/design-system';
import { loadComponentsModules } from '../../shared/utils';
import styles from './tooltip.scss';

import { Tooltip } from './tooltip';
import { TooltipTemplate as template } from './tooltip.template';

const prefix = getPrefix(import.meta.url);

export const vividTooltip = Tooltip.compose<FoundationElementDefinition>({
	baseName: 'tooltip',
	template: template as any,
	styles,
});

(async () => {
	await loadComponentsModules(['popup'], prefix);
	designSystem.withPrefix(prefix).register(vividTooltip());
})();
