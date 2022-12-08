import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactorial } from '../../shared/design-system';
import { buttonElements } from '../button/definition';
import { icon } from '../icon/definition';
import styles from './banner.scss';

import { Banner } from './banner';
import { BannerTemplate as template } from './banner.template';


const banner = Banner.compose<FoundationElementDefinition>({
	baseName: 'banner',
	template: template as any,
	styles,
})();

export const bannerElements = [banner, icon, ...buttonElements];

/**
 * Registers the banner elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerBanner = registerFactorial(...bannerElements);

