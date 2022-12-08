import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactorial } from '../../shared/design-system';
import { button } from '../button/definition';
import styles from './banner.scss';

import { Banner } from './banner';
import { BannerTemplate as template } from './banner.template';


export const banner = Banner.compose<FoundationElementDefinition>({
	baseName: 'banner',
	template: template as any,
	styles,
});

/**
 * Registers the banner component & its prerequisite components with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerBanner = registerFactorial(banner, button);

