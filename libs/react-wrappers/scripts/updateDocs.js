import { EOL } from 'os';
import {
	getComponentNameFromPackage,
	isVividPackageName,
} from './generateWrappers/utils.js';
import fsExtra from 'fs-extra';
const { outputFile, readFile } = fsExtra;
import { createRequire } from 'module';
const { dependencies, devDependencies } = createRequire(import.meta.url)(
	'../package.json'
);

const generateSupportedComponents = () => {
	const allDeps = Object.entries({
		...devDependencies,
		...dependencies,
	});

	const reducePackagesToVividComponentsList = (acc, [name, version]) => {
		if (!isVividPackageName(name)) {
			return acc;
		}
		const componentName = getComponentNameFromPackage(name);
		return [...acc, `| ${componentName} | ${name} | ${version} |`];
	};

	return allDeps.reduce(reducePackagesToVividComponentsList, [
		'| Component Name | Package Name | Package Version |',
		'|----------------|--------------|-----------------|',
	]);
};

const updateSupportedComponents = async (readmePath) => {
	const packageList = generateSupportedComponents();
	const readme = await readFile(readmePath, { encoding: 'utf8' });
	await outputFile(
		readmePath,
		// this finds a table, might be a problem if we have more than one ;)
		// need the extra empty string to have a new line before the next section
		readme.replace(
			/((\|[ -][^|\r\n]*)+\|(\r?\n|\r)?)+/gm,
			[...packageList, ''].join(EOL)
		)
	);
};

updateSupportedComponents('README.md');
