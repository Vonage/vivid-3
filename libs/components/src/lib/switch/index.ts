import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem, getPrefix } from '../../shared/design-system';
import { loadComponentsModules } from '../../shared/utils';
import styles from './switch.scss';
import { Switch } from './switch';
import { SwitchTemplate as template } from './switch.template';

const prefix = getPrefix(import.meta.url);

await loadComponentsModules(['icon', 'focus'], prefix);

export const vividSwitch = Switch.compose<FoundationElementDefinition>({
	baseName: 'switch',
	template: template as any,
	styles,
	shadowOptions: {
		delegatesFocus: true,
	}
});

designSystem.withPrefix(prefix).register(vividSwitch());
