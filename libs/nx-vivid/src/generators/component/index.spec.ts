import { names, Tree } from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { VividComponentGeneratorOptions } from './schema';
import vividComponentGenerator from './index';

describe(`vivid component generator`, function () {
	let tree: Tree;
	let options: VividComponentGeneratorOptions;

	beforeEach(() => {
		tree = createTreeWithEmptyWorkspace({ layout: 'apps-libs' });
		options = {
			name: 'test-component',
		};
	});

	it(`should generate files`, async function () {
		const { fileName } = names(options.name);
		await vividComponentGenerator(tree, options);
		expect(tree.exists(`libs/components/src/lib/${options.name}`)).toBeTruthy();
		expect(
			tree.exists(`libs/components/src/lib/${options.name}/index.ts`)
		).toBeTruthy();
		expect(
			tree.exists(`libs/components/src/lib/${options.name}/definition.ts`)
		).toBeTruthy();
		expect(
			tree.exists(`libs/components/src/lib/${options.name}/README.md`)
		).toBeTruthy();
		expect(
			tree.exists(`libs/components/src/lib/${options.name}/ACCESSIBILITY.md`)
		).toBeTruthy();
		expect(
			tree.exists(`libs/components/src/lib/${options.name}/USE-CASES.md`)
		).toBeTruthy();
		expect(
			tree.exists(`libs/components/src/lib/${options.name}/GUIDELINES.md`)
		).toBeTruthy();
		expect(
			tree.exists(`libs/components/src/lib/${options.name}/VARIATIONS.md`)
		).toBeTruthy();
		expect(
			tree.exists(`libs/components/src/lib/${options.name}/ui.test.ts`)
		).toBeTruthy();
		expect(
			tree.exists(`libs/components/src/lib/${options.name}/${fileName}.ts`)
		).toBeTruthy();
		expect(
			tree.exists(`libs/components/src/lib/${options.name}/${fileName}.spec.ts`)
		).toBeTruthy();
		expect(
			tree.exists(
				`libs/components/src/lib/${options.name}/${fileName}.template.ts`
			)
		).toBeTruthy();
		expect(
			tree.exists(`libs/components/src/lib/${options.name}/${fileName}.scss`)
		).toBeTruthy();
	});

	it(`should create a component without an export`, async function () {
		const { fileName } = names(options.name);
		tree.write(`libs/components/package.json`, `{ "exports": {} }`);
		await vividComponentGenerator(tree, options);
		const packageJson = JSON.parse(
			tree.read(`libs/components/package.json`).toString()
		);
		expect(packageJson.exports[`./${fileName}`]).toBeUndefined();
	});

	describe('addToExports', () => {
		const componentFilePath = 'libs/components/src/lib/components.ts';
		const tagNameMapFilePath = 'libs/components/src/lib/tag-name-map.ts';

		it('should add the component to components.ts exports when addToExports is true', async function () {
			options.addToExports = true;
			tree.write(componentFilePath, '');
			await vividComponentGenerator(tree, options);
			const result = tree.read(componentFilePath, 'utf8').trim();
			expect(result).toBe(`export * from './${options.name}/definition';`);
		});

		it('should export the component class when addToExports is true', async function () {
			options.addToExports = true;
			tree.write(componentFilePath, '');
			await vividComponentGenerator(tree, options);
			const result = tree
				.read('libs/components/src/lib/test-component/definition.ts', 'utf8')
				.trim();
			expect(result).toContain(
				'export { TestComponent as VwcTestComponentElement };'
			);
		});

		it('should add the component to tag-name-map.ts following sort order when addToExports is true', async function () {
			options.name = 'b';
			options.addToExports = true;
			tree.write(
				tagNameMapFilePath,
				`import {
	VwcAElement,
	VwcCElement,
} from './components';

type DefaultVividTagNameMap = {
\t'vwc-a': VwcAElement;
\t'vwc-c': VwcCElement;
};
`
			);
			await vividComponentGenerator(tree, options);
			const result = tree.read(tagNameMapFilePath, 'utf8').trim();
			expect(result).toMatchInlineSnapshot(`
				"import { VwcAElement, VwcBElement, VwcCElement } from './components';

				type DefaultVividTagNameMap = {
				  'vwc-a': VwcAElement;
				  'vwc-b': VwcBElement;
				  'vwc-c': VwcCElement;
				};"
			`);
		});

		it('should add the component to tag-name-map.ts when addToExports is true and it is the last element in sort order', async function () {
			options.name = 'c';
			options.addToExports = true;
			tree.write(
				tagNameMapFilePath,
				`import {
	VwcAElement,
	VwcBElement,
} from './components';

type DefaultVividTagNameMap = {
\t'vwc-a': VwcAElement;
\t'vwc-b': VwcBElement;
};
`
			);
			await vividComponentGenerator(tree, options);
			const result = tree.read(tagNameMapFilePath, 'utf8').trim();
			expect(result).toMatchInlineSnapshot(`
				"import { VwcAElement, VwcBElement, VwcCElement } from './components';

				type DefaultVividTagNameMap = {
				  'vwc-a': VwcAElement;
				  'vwc-b': VwcBElement;
				  'vwc-c': VwcCElement;
				};"
			`);
		});

		it('should omit the component to components.ts exports when addToExports is false', async function () {
			options.addToExports = false;
			tree.write(componentFilePath, '');
			await vividComponentGenerator(tree, options);
			const result = tree.read(componentFilePath, 'utf8').trim();
			expect(result).toBe('');
		});
	});

	describe('addToDocs', () => {
		const filePath = 'apps/docs/content/_data/components.json';
		const initialContents = `[
	{
		"title": "First Component"
	}
]
`;

		it('should add the component to the docs components.json when addToDocs is true', async function () {
			options.addToExports = true;
			options.addToDocs = true;

			const expectedContents = `[
				{
					"title": "First Component"
				},
				{
					"title": "Test Component",
					"description": "Short description of the component.",
					"variations": "./libs/components/src/lib/${options.name}/VARIATIONS.md",
					"guidelines": "./libs/components/src/lib/${options.name}/GUIDELINES.md",
					"hideGuidelines": "true",
					"code": "./libs/components/src/lib/${options.name}/README.md",
					"accessibility": "./libs/components/src/lib/${options.name}/ACCESSIBILITY.md",
					"useCases": "./libs/components/src/lib/${options.name}/USE-CASES.md",
					"status": "underlying"
				}
			]`;
			tree.write(filePath, initialContents);
			await vividComponentGenerator(tree, options);
			const result = tree.read(filePath, 'utf8');
			const resultJson = JSON.parse(result);
			const expectedJson = JSON.parse(expectedContents);
			expect(resultJson).toEqual(expectedJson);
		});

		it('should omit the component to the docs components.json when addToDocs is false', async function () {
			options.addToExports = true;
			options.addToDocs = false;

			tree.write(filePath, initialContents);
			await vividComponentGenerator(tree, options);
			const result = tree.read(filePath, 'utf8');
			const resultJson = JSON.parse(result);
			const expectedJson = JSON.parse(initialContents);
			expect(resultJson).toEqual(expectedJson);
		});
	});
});
