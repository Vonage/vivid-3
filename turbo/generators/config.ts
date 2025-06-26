import type { PlopTypes } from '@turbo/gen';

// Helper functions to match the original Nx generator behavior
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

const updateDocsComponentList =
	(name: string, titleCasedName: string) => (contents: string) => {
		const title = `		"title": "${titleCasedName}",`;
		const lines = contents.split('\n');
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
		}

		return lines.join('\n');
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
			const name = rawName.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
			const className = toPascalCase(rawName);
			const titleCasedName = toTitleCase(className);
			const pascalCasedName = toPascalCase(className);
			const camelCasedName =
				className[0].toLowerCase() + className.substring(1);

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
					transform: updateDocsComponentList(rawName, titleCasedName),
				});
			}

			return actions;
		},
	});
}
