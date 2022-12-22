import { names, Tree } from "@nrwl/devkit";
import { createTreeWithEmptyV1Workspace } from "@nrwl/devkit/testing";
import { VividComponentGeneratorOptions } from "./schema";
import vividComponentGenerator from "./index";

describe(`vivid component generator`, function () {
  let tree: Tree;
  const options: VividComponentGeneratorOptions = {
    name: "test-component",
  };

  beforeEach(() => {
    tree = createTreeWithEmptyV1Workspace();
  });

  it(`should generate files`, async function () {
    const {fileName} = names(options.name);
    await vividComponentGenerator(tree, options);
    expect(tree.exists(`libs/components/src/lib/${options.name}`)).toBeTruthy();
    expect(tree.exists(`libs/components/src/lib/${options.name}/index.ts`)).toBeTruthy();
    expect(tree.exists(`libs/components/src/lib/${options.name}/definition.ts`)).toBeTruthy();
    expect(tree.exists(`libs/components/src/lib/${options.name}/README.md`)).toBeTruthy();
    expect(tree.exists(`libs/components/src/lib/${options.name}/ui.test.ts`)).toBeTruthy();
    expect(tree.exists(`libs/components/src/lib/${options.name}/${fileName}.ts`)).toBeTruthy();
    expect(tree.exists(`libs/components/src/lib/${options.name}/${fileName}.spec.ts`)).toBeTruthy();
    expect(tree.exists(`libs/components/src/lib/${options.name}/${fileName}.template.ts`)).toBeTruthy();
	expect(tree.exists(`libs/components/src/lib/${options.name}/${fileName}.scss`)).toBeTruthy();
  });

  it("should add the component to package.json exports if given this option", async function () {
    const { fileName } = names(options.name);
    options.exportComponent = true;
    tree.write(`libs/components/package.json`, `{}`);
    await vividComponentGenerator(tree, options);
    const packageJson = JSON.parse(
      tree.read(`libs/components/package.json`).toString()
    );
    expect(packageJson.exports[`./${fileName}`]).toEqual(`./${fileName}`);
  });

  it(`should create a component without an export`, async function () {
    const { fileName } = names(options.name);
    options.exportComponent = false;
    tree.write(`libs/components/package.json`, `{ "exports": {} }`);
    await vividComponentGenerator(tree, options);
    const packageJson = JSON.parse(
      tree.read(`libs/components/package.json`).toString()
    );
    expect(packageJson.exports[`./${fileName}`]).toBeUndefined();
  });

  it('should add the component to components.ts exports if given this option', async function() {
    const filePath = 'libs/components/src/lib/components.ts';
    options.addToExports = true;
    tree.write(filePath, '');
    await vividComponentGenerator(tree, options);
    const result = tree.read(filePath, 'utf8').trim();
    expect(result).toBe(`export * from './${options.name}';`);
  });

  it('should not add the component to components.ts exports without the option', async function() {
    const filePath = 'libs/components/src/lib/components.ts';
    options.addToExports = false;
    tree.write(filePath, '');
    await vividComponentGenerator(tree, options);
    const result = tree.read(filePath, 'utf8').trim();
    expect(result).toBe('');
  });
});
