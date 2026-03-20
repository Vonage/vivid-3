import type { PlopTypes } from '@turbo/gen';
import { camelCase, capitalCase, kebabCase, pascalCase } from 'change-case';

interface ComponentListEntry {
	title: string;
	slug: string;
}

const updateComponentsExports = (name: string) => (contents: string) => {
	const toAdd = `export * from './${name}/definition';`;
	const lines = contents.split('\n');
	if (lines.indexOf(toAdd) === -1) {
		lines.push(toAdd);
		lines.sort();
	}
	return lines.join('\n');
};

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

const updateTagNameMap =
	(className: string, name: string) => (contents: string) =>
		insertLineIntoSortedSection(
			insertLineIntoSortedSection(
				contents,
				(line) => line.startsWith('\tVwc'),
				`\tVwc${className}Element,`
			),
			(line) => line.startsWith("\t'vwc-"),
			`\t'vwc-${name}': Vwc${className}Element;`
		);

const updateDocsComponentList = (name: string) => (contents: string) => {
	const componentsList = JSON.parse(contents) as ComponentListEntry[];

	if (componentsList.some(({ title }) => title === capitalCase(name)))
		return contents;

	componentsList.push({
		title: capitalCase(name),
		slug: kebabCase(name),
	});

	const uniqueEntries = [...new Set(componentsList)];

	uniqueEntries.sort((a, b) => a.title.localeCompare(b.title));

	return JSON.stringify(uniqueEntries, null, 2) + '\n';
};

export default function generator(plop: PlopTypes.NodePlopAPI): void {
	plop.setGenerator('component', {
		description: 'Create a new Vivid component',
		prompts: [
			{
				type: 'input',
				name: 'name',
				message: 'Component name:',
				validate: (value) => {
					if (value.trim().length > 0) {
						return true;
					}
					return 'Component name is required';
				},
			},
			{
				type: 'confirm',
				name: 'addToExports',
				message: 'Add to component.ts?',
				default: true,
			},
			{
				type: 'confirm',
				name: 'addToDocs',
				message: 'Add to docs? (component.json)',
				default: true,
			},
		],
		actions: function (data) {
			if (!data) return [];

			const rawName = data.name as string;
			const name = kebabCase(rawName);
			const className = pascalCase(rawName);
			const titleCasedName = capitalCase(className);
			const pascalCasedName = pascalCase(className);
			const camelCasedName = camelCase(className);

			const actions: PlopTypes.ActionType[] = [
				{
					type: 'addMany',
					destination: `libs/components/src/lib/${name}`,
					templateFiles: 'component/templates/**/*',
					base: 'component/templates',
					data: {
						fileName: name,
						name: name,
						className,
						titleCasedName,
						camelCasedName,
						pascalCasedName,
						addToExports: data.addToExports,
					},
				},
			];

			if (data.addToExports) {
				actions.push({
					type: 'modify',
					path: 'libs/components/src/lib/components.ts',
					transform: updateComponentsExports(rawName),
				});
				actions.push({
					type: 'modify',
					path: 'libs/components/src/lib/tag-name-map.ts',
					transform: updateTagNameMap(className, rawName),
				});
			}

			if (data.addToDocs) {
				actions.push({
					type: 'modify',
					path: 'apps/docs/content/_data/components.json',
					transform: updateDocsComponentList(rawName),
				});
			}

			return actions;
		},
	});
}
