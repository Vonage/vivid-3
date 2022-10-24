
const SD = require('style-dictionary');

import { resolveMath } from './transforms/resolve-math';

import cssThemeableVariables from './formatters/css-themeable-variables';
import configTypography from './configurations/typography';
import getConfigTheme from './configurations/theme';


SD.registerTransform(resolveMath);
SD.registerFormat(cssThemeableVariables);

SD.extend(configTypography).buildAllPlatforms();
['light', 'dark'].forEach(theme => {
	SD.extend(getConfigTheme(theme)).buildAllPlatforms();
});
