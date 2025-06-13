import * as fs from 'fs';
import * as path from 'path';
import glob from 'glob';

const dirname = path.dirname(new URL(import.meta.url).pathname);

/**
 * Replace imports from 'vue3' with 'vue', which is the name of the package that consumers will have installed.
 */
const updateVue3Imports = (filePath: string) => {
	const content = fs.readFileSync(filePath, 'utf-8');
	const newContent = content.replace(/vue3/g, 'vue');
	fs.writeFileSync(filePath, newContent);
};

/**
 * Add @ts-ignore comment in front of lines that contain the word Plugin to suppress errors when using Vue 2.
 */
const addTsIgnoreToPlugin = (filePath: string) => {
	const content = fs.readFileSync(filePath, 'utf-8');
	const newContent = content
		.split('\n')
		.flatMap((line) => {
			if (line.includes('Plugin')) {
				return ['// @ts-ignore', line];
			}
			return [line];
		})
		.join('\n');
	fs.writeFileSync(filePath, newContent);
};

/**
 * Generate code that automatically switches between the generated vue2 and vue3 definitions based on the version of the
 * installed vue library.
 *
 * To detect the library version we check for VNode["data"], which doesn't exist in vue3 but does in vue2.
 */
const generateVueVersionSwitch = async () => {
	const componentTypesPath = path.join(dirname, '../dist/generated/components');
	const vue3Definitions = glob.sync('*.vue3.d.ts', { cwd: componentTypesPath });

	for (const vue3Definition of vue3Definitions) {
		updateVue3Imports(path.join(componentTypesPath, vue3Definition));

		// Give the vue2 definition vue2.d.ts extension
		const componentName = vue3Definition.replace('.vue3.d.ts', '');
		fs.renameSync(
			path.join(componentTypesPath, `${componentName}.d.ts`),
			path.join(componentTypesPath, `${componentName}.vue2.d.ts`)
		);

		// Generate the code for switching between the definitions
		fs.writeFileSync(
			path.join(componentTypesPath, `${componentName}.d.ts`),
			`import { VNode } from 'vue';
import ${componentName}Vue2 from './${componentName}.vue2';
import ${componentName}Vue3 from './${componentName}.vue3';

type IsVue2 = "data" extends keyof VNode ? true : false;
declare const _default: IsVue2 extends true ? typeof ${componentName}Vue2 : typeof ${componentName}Vue3;
export default _default;
`
		);
	}
};

const main = async () => {
	updateVue3Imports(path.join(dirname, '../dist/plugin/index.d.ts'));
	addTsIgnoreToPlugin(path.join(dirname, '../dist/plugin/index.d.ts'));
	await generateVueVersionSwitch();
};

main();
