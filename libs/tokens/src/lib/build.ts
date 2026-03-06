import StyleDictionary from 'style-dictionary';

import resolveMath from './transforms/resolve-math';
import publicCssReferences from './transforms/public-css-references';

import configScssConstants from './configurations/scss-constants';
import getConfigTheme from './configurations/theme';
import configTypography from './configurations/typography';
import configSize from './configurations/size';
import cssAtRuleProperty from './configurations/@property';

StyleDictionary.registerTransform(publicCssReferences);
StyleDictionary.registerTransform(resolveMath);

const base = new StyleDictionary({});

let extended = await base.extend(configScssConstants);
await extended.buildAllPlatforms();

for (const theme of ['light', 'dark']) {
	extended = await base.extend(getConfigTheme(theme));
	await extended.buildAllPlatforms();
}

extended = await base.extend(configTypography);
await extended.buildAllPlatforms();

extended = await base.extend(configSize);
await extended.buildAllPlatforms();

extended = await base.extend(cssAtRuleProperty);
await extended.buildAllPlatforms();
