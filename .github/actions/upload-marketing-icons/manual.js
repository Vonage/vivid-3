const { upload } = require('./src/upload-marketing-icons.js');
const { resolve } = require('node:path');
const { defineCommand, runMain } = require('citty');
const marketingIconsPackageJson = require('../../../libs/marketing-icons/package.json');
const marketingIconsVersion = marketingIconsPackageJson.version;

const main = defineCommand({
	meta: {
		name: 'manual marketing icons upload',
		description: 'This script should be executed ONLY in local environment.',
	},
	args: {
		version: {
			type: 'string',
			description: 'Marketing icons package version',
			alias: 'v',
			default: marketingIconsVersion,
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

		console.log('Uploading marketing icons with the following configuration:');
		console.log(`- Version: ${args.version}`);
		console.log(`- Bucket: ${args.bucket}`);
		console.log(`- Base folder: ${args.folder}`);
		console.log(`- Region: ${args.region}`);

		upload({
			accessKey: args.key,
			secretAccessKey: args.secret,
			version: args.version,
			sourceDir: resolve('../../../libs/marketing-icons/src/generated'),
			bucket: args.bucket,
			baseFolder: args.folder,
			region: args.region,
			dry: args.dry,
		});
	},
});

runMain(main);
