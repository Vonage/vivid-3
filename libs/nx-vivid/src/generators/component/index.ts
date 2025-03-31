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

function toPascalCase(string: string): string {
	return string
		.replace(/([a-z])([A-Z])/g, '$1 $2') // Splits camelCase words into separate words
		.replace(/[-_]+|[^\p{L}\p{N}]/gu, ' ') // Replaces dashes, underscores, and special characters with spaces
		.toLowerCase() // Converts the entire string to lowercase
		.replace(/(?:^|\s)(\p{L})/gu, (_, letter) => letter.toUpperCase()) // Capitalizes the first letter of each word
		.replace(/\s+/g, ''); // Removes all spaces
}

function toTitleCase(string: string): string {
	return string.replace(/([A-Z])/g, ' $1').trim();
}

export interface NormalizedSchema extends VividComponentGeneratorOptions {
	fileName: string;
	className: string;
	titleCasedName: string;
	camelCasedName: string;
	pascalCasedName: string;
	projectRoot: string;
	docsRoot: string;
}

function normalizeOptions(
	tree: Tree,
	options: VividComponentGeneratorOptions
): NormalizedSchema {
	const projectDirectory = names(options.name).fileName;
	const className = names(options.name).className;

	const name = projectDirectory.replace(new RegExp('/', 'g'), '-');
	const fileName = names(projectDirectory).fileName;
	const titleCasedName = toTitleCase(className);
	const pascalCasedName = toPascalCase(className);
	const camelCasedName = className[0].toLowerCase() + className.substr(1);

	const { libsDir, appsDir } = getWorkspaceLayout(tree);

	const projectRoot = joinPathFragments(
		libsDir,
		'components/src/lib',
		projectDirectory
	);

	const docsRoot = joinPathFragments(appsDir, 'docs/content/_data');

	return {
		...options,
		fileName,
		name,
		className,
		titleCasedName,
		camelCasedName,
		pascalCasedName,
		projectRoot,
		docsRoot,
	};
}

function createFiles(tree: Tree, options: NormalizedSchema) {
	const { titleCasedName, camelCasedName, pascalCasedName, addToExports } =
		options;
	const { className, name, propertyName } = names(options.name);

	generateFiles(tree, join(__dirname, './files'), options.projectRoot, {
		...options,
		dot: '.',
		className,
		title: titleCasedName,
		name,
		propertyName,
		camelCasedName,
		pascalCasedName,
		cliCommand: 'nx',
		strict: undefined,
		tmpl: '',
		offsetFromRoot: offsetFromRoot(options.projectRoot),
		addToExports,
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

function insertLineIntoSortedSection(
	content: string,
	relevantLineFilter: (line: string) => boolean,
	newLine: string
) {
	const lines = content.split('\n');
	const numberedLines = lines.map((line, nr) => ({ line, nr }));
	const relevantLines = numberedLines.filter(({ line }) =>
		relevantLineFilter(line)
	);

	const insertBeforeIndex = relevantLines.findIndex(
		({ line }) => line > newLine
	);
	if (insertBeforeIndex === -1) {
		lines[relevantLines[relevantLines.length - 1].nr] =
			relevantLines[relevantLines.length - 1].line + '\n' + newLine;
	} else {
		lines[relevantLines[insertBeforeIndex].nr] =
			newLine + '\n' + relevantLines[insertBeforeIndex].line;
	}

	return lines.join('\n');
}

function updateTagNameMap(tree: Tree, options: NormalizedSchema) {
	const tagNameMap = `libs/components/src/lib/tag-name-map.ts`;
	if (options.addToExports && tree.exists(tagNameMap)) {
		const contents = tree.read(tagNameMap, 'utf8');

		tree.write(
			tagNameMap,
			insertLineIntoSortedSection(
				insertLineIntoSortedSection(
					contents,
					(line) => line.startsWith('\tVwc'),
					`\tVwc${options.className}Element,`
				),
				(line) => line.startsWith("\t'vwc-"),
				`\t'vwc-${options.name}': Vwc${options.className}Element;`
			)
		);
	}
}

function updateDocsComponentList(tree: Tree, options: NormalizedSchema) {
	const componentsPath = `apps/docs/content/_data/components.json`;
	const { name, addToDocs, titleCasedName } = options;
	if (addToDocs && tree.exists(componentsPath)) {
		const title = `		"title": "${titleCasedName}",`;
		const lines = tree.read(componentsPath, 'utf8').split('\n');

		if (lines.indexOf(title) === -1) {
			const toAdd = `	{
${title}
		"description": "Short description of the component.",
		"variations": "./libs/components/src/lib/${name}/VARIATIONS.md",
		"guidelines": "./libs/components/src/lib/${name}/GUIDELINES.md",
		"hideGuidelines": "true",
		"code": "./libs/components/src/lib/${name}/README.md",
		"accessibility": "./libs/components/src/lib/${name}/ACCESSIBILITY.md",
		"useCases": "./libs/components/src/lib/${name}/USE-CASES.md",
		"status": "underlying"
	}`;
			const lastComponentLine = lines[lines.length - 3];
			if (lastComponentLine.indexOf('}') > 0) lines[lines.length - 3] = '	},';
			lines.splice(lines.length - 2, 0, toAdd);
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
	updateTagNameMap(tree, options);
	updateDocsComponentList(tree, options);

	await formatFiles(tree);
}
