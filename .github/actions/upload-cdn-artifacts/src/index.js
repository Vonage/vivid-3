import { getInput } from '@actions/core';
import { resolve } from 'node:path';
import { upload } from './upload-icons.js';

const icons = resolve('..', '..', '..', 'libs', 'icons', 'src', 'generated');

const brands = resolve(
	'..',
	'..',
	'..',
	'libs',
	'icons-brands',
	'src',
	'generated'
);
const flags = resolve(
	'..',
	'..',
	'..',
	'libs',
	'icons-flags',
	'src',
	'generated'
);

upload({
	region: getInput('region') || 'us-east-1',
	accessKey: getInput('accessKey'),
	secretAccessKey: getInput('secretAccessKey'),
	bucket: getInput('bucket') || 'vivid-icons-dev',
	baseFolder: getInput('baseFolder') || 'VIVID_ICONS_DEV',
	version: getInput('version'),
	sourceDirs: getInput('sourceDirs') || [icons, brands, flags],
});
