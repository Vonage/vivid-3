import { error, getInput, info } from '@actions/core';
import { resolve } from 'node:path';
import { upload } from './upload-icons.js';

const accessKey = getInput('access-key', { required: true });
const secretAccessKey = getInput('secret-access-key', { required: true });
const version = getInput('version', { required: true });
const mode = getInput('mode') || 'icons';
const sourceDir = resolve(getInput('source-dir', { required: true }));
const bucket = getInput('bucket') || 'vivid-icons-dev';
const baseFolder = getInput('base-folder') || 'VIVID_ICONS_DEV';
const region = getInput('region') || 'us-east-1';

info(`Mode: ${mode}`);
info(`Region: ${region}`);
info(`Bucket: ${bucket}`);
info(`Base folder: ${baseFolder}`);
info(`Version: ${version}`);
info(`Source directory: ${sourceDir}`);

upload({
	accessKey,
	secretAccessKey,
	version,
	mode,
	sourceDir,
	bucket,
	baseFolder,
	region,
}).catch((e) => {
	error(e.message);
});
