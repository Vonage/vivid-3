import * as fs from 'node:fs/promises';
import * as path from 'node:path';

// While we could publish directly from the components folder, we need to maintain backwards compatibility of the
// package structure (where there is no 'dist' folder). For this reason, we will build the package in 'dist' and publish
// from there.
// This script copies the package.json to dist and updates all the paths accordingly (removing the 'dist/' prefix).

async function copyPackageJson() {
	try {
		// Define paths
		const rootDir = path.resolve(process.cwd());
		const sourcePackageJsonPath = path.join(rootDir, 'package.json');
		const distDir = path.join(rootDir, 'dist');
		const targetPackageJsonPath = path.join(distDir, 'package.json');

		// Ensure dist directory exists
		await fs.mkdir(distDir, { recursive: true });

		// Read original package.json
		const packageJsonContent = await fs.readFile(sourcePackageJsonPath, 'utf8');
		const packageJson = JSON.parse(packageJsonContent);

		// Modify paths to remove 'dist/' prefix

		// Update module and main paths
		if (packageJson.module?.startsWith('./dist/')) {
			packageJson.module = packageJson.module.replace('./dist/', './');
		}
		if (packageJson.main?.startsWith('./dist/')) {
			packageJson.main = packageJson.main.replace('./dist/', './');
		}

		// Update exports paths
		if (packageJson.exports) {
			const processExportsObject = (obj: Record<string, any>) => {
				for (const [key, value] of Object.entries(obj)) {
					if (typeof value === 'string' && value.startsWith('./dist/')) {
						obj[key] = value.replace('./dist/', './');
					} else if (typeof value === 'object' && value !== null) {
						processExportsObject(value);
					}
				}
			};

			processExportsObject(packageJson.exports);
		}

		// Update sideEffects paths
		if (Array.isArray(packageJson.sideEffects)) {
			packageJson.sideEffects = packageJson.sideEffects.map((item: string) => {
				if (typeof item === 'string' && item.startsWith('./dist/')) {
					return item.replace('./dist/', './');
				}
				return item;
			});
		}

		// Write the modified package.json to dist directory
		await fs.writeFile(
			targetPackageJsonPath,
			JSON.stringify(packageJson, null, 2),
			'utf8'
		);

		process.stdout.write(
			`Package.json was successfully copied to ${targetPackageJsonPath} with updated paths.\n`
		);
	} catch (error) {
		process.stderr.write(`Error setting up package.json: ${error}\n`);
		process.exit(1);
	}
}

copyPackageJson();
