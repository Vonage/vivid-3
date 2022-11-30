import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem, getPrefix } from '../../shared/design-system';

import { loadComponentsModules } from '../../shared/utils';
import styles from './text-area.scss';
import { TextArea } from './text-area';
import { TextAreaTemplate as template } from './text-area.template';

const prefix = getPrefix(import.meta.url);

export const vividTextArea = TextArea.compose<FoundationElementDefinition>({
	baseName: 'text-area',
	template: template as any,
	styles,
	shadowOptions: {
		delegatesFocus: true,
	},
});

(async () => {
	await loadComponentsModules(['icon', 'focus'], prefix);
	designSystem.withPrefix(prefix).register(vividTextArea());
})();
