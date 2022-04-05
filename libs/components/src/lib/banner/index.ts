import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem } from '../../shared/design-system';
import styles from './banner.scss';

import { Banner } from './banner';
import { BannerTemplate as template } from './banner.template';

export const vividBanner = Banner.compose<FoundationElementDefinition>({
  baseName: 'banner',
  template: template as any,
  styles,
});

designSystem.register(vividBanner());
