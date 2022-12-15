import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactory } from '../../shared/design-system';
import { buttonElements } from '../button/definition';
import { iconRegistries } from '../icon/definition';
import styles from './banner.scss';

import { Banner } from './banner';
import { BannerTemplate as template } from './banner.template';


/**
 *
 * @internal
 */
export const bannerDefinition = Banner.compose<FoundationElementDefinition>({
	baseName: 'banner',
	template: template as any,
	styles,
});

export const bannerRegistries = [banner(), ...iconRegistries, ...buttonRegistries];

/**
 * Registers the banner elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerBanner = registerFactory(bannerRegistries);

