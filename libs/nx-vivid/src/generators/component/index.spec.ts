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

  it(`should create a component without an export`, async function () {
    const { fileName } = names(options.name);
    tree.write(`libs/components/package.json`, `{ "exports": {} }`);
    await vividComponentGenerator(tree, options);
    const packageJson = JSON.parse(
      tree.read(`libs/components/package.json`).toString()
    );
    expect(packageJson.exports[`./${fileName}`]).toBeUndefined();
  });
});
