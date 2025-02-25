import {
	Tree,
	formatFiles,
	names,
	joinPathFragments,
	getWorkspaceLayout,
	generateFiles,
	offsetFromRoot,
} from '@nrwl/devkit';
import { VividComponentGeneratorOptions } from './schema';
import { join } from 'path';

export interface NormalizedSchema extends VividComponentGeneratorOptions {
	fileName: string;
	className: string;
	projectRoot: string;
}

function normalizeOptions(
	tree: Tree,
	options: VividComponentGeneratorOptions
): NormalizedSchema {
	const projectDirectory = names(options.name).fileName;
	const className = names(options.name).className;

	const name = projectDirectory.replace(new RegExp('/', 'g'), '-');
	const fileName = names(projectDirectory).fileName;

	const { libsDir } = getWorkspaceLayout(tree);

	const projectRoot = joinPathFragments(
		libsDir,
		'components/src/lib',
		projectDirectory
	);

	return {
		...options,
		fileName,
		name,
		className,
		projectRoot,
	};
}

function toPascalCase(string: string): string {
	return string
		.replace(/([a-z])([A-Z])/g, '$1 $2') // Splits camelCase words into separate words
		.replace(/[-_]+|[^\p{L}\p{N}]/gu, ' ') // Replaces dashes, underscores, and special characters with spaces
		.toLowerCase() // Converts the entire string to lowercase
		.replace(/(?:^|\s)(\p{L})/gu, (_, letter) => letter.toUpperCase()) // Capitalizes the first letter of each word
		.replace(/\s+/g, ''); // Removes all spaces
}

function createFiles(tree: Tree, options: NormalizedSchema) {
	const { className, name, propertyName } = names(options.name);

	console.log('createFiles', tree);

	generateFiles(tree, join(__dirname, './files'), options.projectRoot, {
		...options,
		dot: '.',
		className,
		title: className.replace(/([A-Z])/g, ' $1').trim(),
		name,
		propertyName,
		camelCasedName: className[0].toLowerCase() + className.substr(1),
		pascalCasedName: toPascalCase(className),
		cliCommand: 'nx',
		strict: undefined,
		tmpl: '',
		offsetFromRoot: offsetFromRoot(options.projectRoot),
	});
}

function updateComponentsExports(tree: Tree, options: NormalizedSchema) {
	const componentsPath = `libs/components/src/lib/components.ts`;
	if (options.addToExports && tree.exists(componentsPath)) {
		const toAdd = `export * from './${options.name}/definition';`;
		const lines = tree.read(componentsPath, 'utf8').split('\n');
		if (lines.indexOf(toAdd) === -1) {
			lines.push(toAdd);
			lines.sort();
			tree.write(componentsPath, lines.join('\n'));
		}
	}
}

export default async function vividComponentGenerator(
	tree: Tree,
	schema: VividComponentGeneratorOptions
) {
	const options = normalizeOptions(tree, schema);
	createFiles(tree, options);
	updateComponentsExports(tree, options);

	await formatFiles(tree);
}
