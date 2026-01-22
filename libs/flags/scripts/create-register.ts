import { type IconEntry, writeFile } from '@repo/tools';
import { camelCase, kebabCase } from 'change-case';

const getRegisterFunctionName = (entry: IconEntry) =>
	camelCase(`register-${entry.name}`);

// create define.ts file
export function createRegister(icons: IconEntry[], path: string) {
	const imports = icons
		.map((entry) => {
			return `import { ${getRegisterFunctionName(
				entry
			)} } from './${`components/${kebabCase(entry.name)}.component`}';`;
		})
		.join('\n');

	const executions = icons
		.map((entry) => {
			return `${getRegisterFunctionName(entry)}();`;
		})
		.join('\n');

	const file = `${imports}\n\n\n${executions}`;

	writeFile(path, file);
}
