import * as fs from 'fs';
import * as path from 'path';

const dirname = path.dirname(new URL(import.meta.url).pathname);

/**
 * Update the version of @vonage/vivid dependency in the package.json to the current version.
 */
const main = async () => {
	const packageJson = JSON.parse(
		fs.readFileSync(path.join(dirname, '../package.json'), 'utf-8')
	);
	packageJson.dependencies['@vonage/vivid'] = `^${packageJson.version}`;
	fs.writeFileSync(
		path.join(dirname, '../package.json'),
		JSON.stringify(packageJson, null, 2)
	);
};

main();
