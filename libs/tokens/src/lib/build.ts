const SD = require('style-dictionary');

import resolveMath from './transforms/resolve-math';
import publicCssReferences from './transforms/public-css-references';

import cssThemeableVariables from './formatters/themeable-variables/css';

import configScssConstants from './configurations/scss-constants';
import getConfigTheme from './configurations/theme';
import configTypography from './configurations/typography';
import configSize from './configurations/size';


SD.registerTransform(publicCssReferences);
SD.registerTransform(resolveMath);
SD.registerFormat(cssThemeableVariables);

SD.extend(configScssConstants).buildAllPlatforms();

['light', 'dark'].forEach(theme => {
	SD.extend(getConfigTheme(theme)).buildAllPlatforms();
});

SD.extend(configTypography).buildAllPlatforms();

SD.extend(configSize).buildAllPlatforms();
