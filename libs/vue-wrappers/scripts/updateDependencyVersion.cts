import * as fs from 'fs';
import * as path from 'path';

/**
 * Update the version of @vonage/vivid dependency in the package.json to the current version.
 */
const main = async () => {
	const packageJson = JSON.parse(
		fs.readFileSync(
			path.join(__dirname, '../../../dist/libs/vue-wrappers/package.json'),
			'utf-8'
		)
	);
	packageJson.dependencies['@vonage/vivid'] = `^${packageJson.version}`;
	fs.writeFileSync(
		path.join(__dirname, '../../../dist/libs/vue-wrappers/package.json'),
		JSON.stringify(packageJson, null, 2)
	);
};

main();
