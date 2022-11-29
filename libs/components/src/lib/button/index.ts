import {
	Button as FastButton,
	type FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { designSystem, getPrefix } from '../../shared/design-system';
import { loadComponentsModules } from '../../shared/utils';
import { Button } from './button';
import styles from './button.scss';
import { buttonTemplate as template } from './button.template';


const prefix = getPrefix(import.meta.url);

const vividButton = Button.compose<FoundationElementDefinition>({
	baseName: 'button',
	baseClass: FastButton,
	template: template as any,
	styles,
	shadowOptions: {
		delegatesFocus: true,
	},
});

(async () => {
	await loadComponentsModules(['icon', 'focus'], prefix);
	designSystem.withPrefix(prefix).register(vividButton());
})();
