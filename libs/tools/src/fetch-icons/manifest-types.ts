import { IconCategory, IconStyle } from './types';

export type IconTag =
  | `style_weight_${IconStyle}`
  | `style_color_${IconStyle}`
  | `category_${IconCategory}`
  // eslint-disable-next-line
  | ({} & string);

export interface IconDefinition {
  id: string;
  keyword: string[];
  tag: IconTag[];
}

export type IconsManifest = IconDefinition[];
