import packageJson from '../package.json';

export const ICONS_BASE_URL = 'https://icon.resources.vonage.com';
export const ICONS_VERSION = packageJson.version;
export const ICONS_MANIFEST_URL = `${ICONS_BASE_URL}/v${ICONS_VERSION}/manifest.json`;
