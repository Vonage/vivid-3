import StyleDictionary from 'style-dictionary';
import { sourceOnly } from './filters/source-only';
import { shadowShorthand } from './transforms/shadow-shorthand';
import { fontShorthand } from './transforms/font-shorthand';
import { scssConstants } from './formatters/scss-constants';
import { scssConstantsConfig } from './configurations/scss-constants';
import { getThemeConfig } from './configurations/theme';
import { getTypographyConfig } from './configurations/typography';

import themes from '@vonage/vivid-figma-tokens/data/$themes.json';

StyleDictionary
.registerTransform(shadowShorthand)
.registerTransform(fontShorthand)
.registerFilter(sourceOnly)
.registerFormat(scssConstants)





StyleDictionary
	.extend(scssConstantsConfig	).buildPlatform('scssConstants');

themes.forEach(({ name }) =>
	StyleDictionary
		.extend(getThemeConfig(name)).buildPlatform('web')
);

['desktop'/*, 'mobile'*/].forEach(viewport =>
	StyleDictionary
		.extend(getTypographyConfig(viewport)).buildPlatform('web')
);

