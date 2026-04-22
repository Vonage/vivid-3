import { upload } from './src/upload-icons.js';
import { resolve } from 'node:path';
import { defineCommand, runMain } from 'citty';
import iconsPackageJson from '../../../libs/icons/package.json' with { type: 'json' };
import marketingIconsPackageJson from '../../../libs/marketing-icons/package.json' with { type: 'json' };

const main = defineCommand({
	meta: {
		name: 'manual icons upload',
		description: 'This script should be executed ONLY in local environment.',
	},
	args: {
		mode: {
			type: 'string',
			alias: 'm',
			description: "Upload mode: 'icons' (default) or 'marketing-icons'",
			default: 'icons',
		},
		version: {
			type: 'string',
			description:
				'Package version (defaults to version from package.json for the selected mode)',
			alias: 'v',
		},
		'source-dir': {
			type: 'string',
			description:
				'Source directory containing index.json and icon files (defaults based on mode)',
		},
		key: {
			type: 'string',
			alias: 'k',
			required: true,
			description: 'AWS access key',
		},
		secret: {
			type: 'string',
			alias: 's',
			required: true,
			description: 'AWS secret access key',
		},
		bucket: {
			type: 'string',
			alias: 'b',
			description: 'AWS bucket',
			default: 'vivid-icons-prod',
		},
		folder: {
			type: 'string',
			alias: 'f',
			description: 'AWS base folder',
			default: '3f7739a0-a898-4f69-a82b-ad9d743170b6',
		},
		region: {
			type: 'string',
			alias: 'r',
			description: 'AWS region',
			default: 'us-east-1',
		},
		dry: {
			type: 'boolean',
			alias: 'd',
			description: 'Print what would be uploaded without actually uploading',
			default: false,
		},
	},
	run({ args }) {
		if (!args.key || !args.secret) {
			console.error('AWS access key and secret access key are required');
			return;
		}

		const isMarketing = args.mode === 'marketing-icons';
		const version =
			args.version ||
			(isMarketing
				? marketingIconsPackageJson.version
				: iconsPackageJson.version);
		const sourceDir = resolve(
			args['source-dir'] ||
				(isMarketing
					? '../../../libs/marketing-icons/src/generated'
					: '../../../libs/icons/src/generated')
		);

		console.log('Uploading icons with the following configuration:');
		console.log(`- Mode: ${args.mode}`);
		console.log(`- Version: ${version}`);
		console.log(`- Source directory: ${sourceDir}`);
		console.log(`- Bucket: ${args.bucket}`);
		console.log(`- Base folder: ${args.folder}`);
		console.log(`- Region: ${args.region}`);

		upload({
			accessKey: args.key,
			secretAccessKey: args.secret,
			version,
			mode: args.mode,
			sourceDir,
			bucket: args.bucket,
			baseFolder: args.folder,
			region: args.region,
			dry: args.dry,
		});
	},
});

runMain(main);
