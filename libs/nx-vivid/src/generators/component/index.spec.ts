import { names, Tree } from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { VividComponentGeneratorOptions } from './schema';
import vividComponentGenerator from './index';

describe(`vivid component generator`, function () {
	let tree: Tree;
	const options: VividComponentGeneratorOptions = {
		name: 'test-component',
	};

	beforeEach(() => {
		tree = createTreeWithEmptyWorkspace({ layout: 'apps-libs' });
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
		const filePath = 'libs/components/src/lib/components.ts';

		it('should add the component to components.ts exports when addToExports is true', async function () {
			options.addToExports = true;
			tree.write(filePath, '');
			await vividComponentGenerator(tree, options);
			const result = tree.read(filePath, 'utf8').trim();
			expect(result).toBe(`export * from './${options.name}/definition';`);
		});

		it('should omit the component to components.ts exports when addToExports is false', async function () {
			options.addToExports = false;
			tree.write(filePath, '');
			await vividComponentGenerator(tree, options);
			const result = tree.read(filePath, 'utf8').trim();
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
