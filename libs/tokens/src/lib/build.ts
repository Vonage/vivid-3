
const SD = require('style-dictionary');

import { resolveMath } from './transforms/resolve-math';

import cssThemeableVariables from './formatters/css-themeable-variables';
import configTypography from './configurations/typography';


SD.registerTransform(resolveMath);
SD.registerFormat(cssThemeableVariables);

SD.extend(configTypography).buildAllPlatforms();
