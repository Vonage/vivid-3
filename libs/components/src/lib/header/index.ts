import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem, getPrefix } from '../../shared/design-system';
import { loadComponentsModules } from '../../shared/utils';
import styles from './header.scss';
import { Header } from './header';
import { headerTemplate as template } from './header.template';


const prefix = getPrefix(import.meta.url);

export const vividHeader = Header.compose<FoundationElementDefinition>({
	baseName: 'header',
	template: template as any,
	styles,
});

(async () => {
	await loadComponentsModules(['elevation'], prefix);
	designSystem.withPrefix(prefix).register(vividHeader());
})();
