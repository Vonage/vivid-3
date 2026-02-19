import { error, getInput, info } from '@actions/core';
import { resolve } from 'node:path';
import { upload } from './upload-icons.js';

function parseStringArray(input) {
	if (!input) return [];

	return input
		.split('\n')
		.map((directory) => directory.trim())
		.filter(Boolean)
		.map((directory) => resolve(directory));
}

const accessKey = getInput('access-key', { required: true });
const secretAccessKey = getInput('secret-access-key', { required: true });
const version = getInput('version', { required: true });
const sourceDirs = parseStringArray(
	getInput('source-dirs', { required: true })
);
const bucket = getInput('bucket') || 'vivid-icons-dev';
const baseFolder = getInput('base-folder') || 'VIVID_ICONS_DEV';
const region = getInput('region') || 'us-east-1';

info(`Region: ${region}`);
info(`Bucket: ${bucket}`);
info(`Base folder: ${bucket}`);
info(`Version: ${bucket}`);
info(`Directories:`);
for (const dir of sourceDirs) {
	info(`  - ${dir}`);
}

try {
	upload({
		accessKey,
		secretAccessKey,
		version,
		sourceDirs,
		bucket,
		baseFolder,
		region,
	});
} catch (e) {
	error(e.message);
}
