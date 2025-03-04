import { buttonDefinition } from '../button/definition';
import { iconDefinition } from '../icon/definition';
import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import styles from './banner.scss?inline';
import { Banner } from './banner';
import { BannerTemplate as template } from './banner.template';

export type { BannerConnotation } from './banner';

/**
 * @internal
 */
export const bannerDefinition = defineVividComponent(
	'banner',
	Banner,
	template,
	[iconDefinition, buttonDefinition],
	{
		styles,
	}
);

/**
 * Registers the banner elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerBanner = createRegisterFunction(bannerDefinition);

export { Banner as VwcBannerElement };
