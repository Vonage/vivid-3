const SD = require('style-dictionary');

import resolveMath from './transforms/resolve-math';
import publicCssReferences from './transforms/public-css-references';

import configScssConstants from './configurations/scss-constants';
import getConfigTheme from './configurations/theme';
import configTypography from './configurations/typography';
import configSize from './configurations/size';
import cssAtRuleProperty from './configurations/@property';

SD.registerTransform(publicCssReferences);
SD.registerTransform(resolveMath);

SD.extend(configScssConstants).buildAllPlatforms();

['light', 'dark'].forEach((theme) => {
	SD.extend(getConfigTheme(theme)).buildAllPlatforms();
});

SD.extend(configTypography).buildAllPlatforms();

SD.extend(configSize).buildAllPlatforms();

SD.extend(cssAtRuleProperty).buildAllPlatforms();
