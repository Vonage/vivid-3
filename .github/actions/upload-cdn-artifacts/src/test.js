import { resolve } from 'node:path';
import { upload } from './upload-artifacts.js';

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
	region: 'us-east-1',
	accessKey: '',
	secretAccessKey: '',
	bucket: 'vivid-icons-dev',
	baseFolder: 'NEW_UPLOAD_TEST',
	version: 'XX.X2',
	sourceDirs: [icons, brands, flags],
	dry: true,
});
