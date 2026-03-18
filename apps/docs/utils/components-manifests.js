const { globSync } = require('glob');
const { readFileSync } = require('node:fs');
const { resolve, dirname } = require('node:path');
const { parse: parseYaml } = require('yaml');

const WORKSPACE_ROOT = resolve(__dirname, '..', '..', '..');

const componentsDir = resolve(
	WORKSPACE_ROOT,
	'libs',
	'components',
	'src',
	'lib'
);

const manifestFiles = globSync('**/manifest.yaml', {
	cwd: componentsDir,
	absolute: true,
});

const manifestsMap = new Map();

for (const manifestFile of manifestFiles) {
	const contents = readFileSync(manifestFile, 'utf-8');
	const dir = dirname(manifestFile);
	const data = parseYaml(contents);

	if (data.documentation.legacy) {
		data.documentation.legacy = resolve(dir, data.documentation.legacy);
	}

	if (data.documentation.code) {
		data.documentation.code = resolve(dir, data.documentation.code);
	}

	if (data.documentation.guidelines) {
		data.documentation.guidelines = resolve(dir, data.documentation.guidelines);
	}

	if (data.documentation.variations) {
		data.documentation.variations = resolve(dir, data.documentation.variations);
	}

	if (data.documentation.accessibility) {
		data.documentation.accessibility = resolve(
			dir,
			data.documentation.accessibility
		);
	}

	if (data.documentation.useCases) {
		data.documentation.useCases = resolve(dir, data.documentation.useCases);
	}

	manifestsMap.set(data.slug, data);
}

exports.manifestsBySlug = manifestsMap;

exports.manifestsArray = Array.from(manifestsMap.values());
