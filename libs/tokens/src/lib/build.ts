
const SD = require('style-dictionary');

import resolveMath from './transforms/resolve-math';

import cssThemeableVariables from './formatters/themeable-variables/css';
import sassThemeableVariables from './formatters/themeable-variables/sass';

import configScssConstants from './configurations/sass-constants';
import getConfigTheme from './configurations/theme';
import configTypography from './configurations/typography';
import configSize from './configurations/size';


SD.registerTransform(resolveMath);
SD.registerFormat(cssThemeableVariables);
SD.registerFormat(sassThemeableVariables);

SD.extend(configScssConstants).buildAllPlatforms();

['light', 'dark'].forEach(theme => {
	SD.extend(getConfigTheme(theme)).buildAllPlatforms();
});

SD.extend(configTypography).buildAllPlatforms();

SD.extend(configSize).buildAllPlatforms();
