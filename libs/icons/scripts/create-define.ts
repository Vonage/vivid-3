import { type IconEntry, writeFile } from '@repo/tools';
import { camelCase, kebabCase } from 'change-case';

// create define.ts file
export function createDefine(icons: IconEntry[], path: string) {
	const imports = icons
		.map((entry) => {
			const registerFunctionName = camelCase(
				`register-${entry.name}-${entry.style}-icon`
			);
			return `import { ${registerFunctionName} } from './${`components/${kebabCase(
				`${entry.name}-${entry.style}`
			)}.component`}';`;
		})
		.join('\n');

	const executions = icons
		.map((entry) => {
			const registerFunctionName = camelCase(
				`register-${entry.name}-${entry.style}-icon`
			);
			return `${registerFunctionName}();`;
		})
		.join('\n');

	const file = `${imports}\n\n\n${executions}`;

	writeFile(path, file);
}
