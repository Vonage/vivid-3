
const SD = require('style-dictionary');

import { resolveMath } from './transforms/resolve-math';

import cssThemeableVariables from './formatters/css-themeable-variables';

import configScssConstants from './configurations/scss-constants';
import configTypography from './configurations/typography';
import getConfigTheme from './configurations/theme';


SD.registerTransform(resolveMath);
SD.registerFormat(cssThemeableVariables);

SD.extend(configScssConstants).buildAllPlatforms();

['light', 'dark'].forEach(theme => {
	SD.extend(getConfigTheme(theme)).buildAllPlatforms();
});

SD.extend(configTypography).buildAllPlatforms();
