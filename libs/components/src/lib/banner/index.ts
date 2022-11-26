import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem, getPrefix } from '../../shared/design-system';
import { loadComponentsModules } from '../shared/utils';
import styles from './banner.scss';

import { Banner } from './banner';
import { BannerTemplate as template } from './banner.template';

const prefix = getPrefix(import.meta.url);

await loadComponentsModules(['button'], prefix);

export const vividBanner = Banner.compose<FoundationElementDefinition>({
	baseName: 'banner',
	template: template as any,
	styles,
});

designSystem.withPrefix(prefix).register(vividBanner());
