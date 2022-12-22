import {
  Tree,
  formatFiles,
  names,
  joinPathFragments,
  getWorkspaceLayout,
  generateFiles, offsetFromRoot
} from '@nrwl/devkit';
import {VividComponentGeneratorOptions} from "./schema";
import {join} from "path";

export interface NormalizedSchema extends VividComponentGeneratorOptions {
  fileName: string;
  className: string;
  projectRoot: string;
}

function normalizeOptions(tree: Tree, options: VividComponentGeneratorOptions): NormalizedSchema {
  const projectDirectory = names(options.name).fileName;
  const className = names(options.name).className;

  const name = projectDirectory.replace(new RegExp('/', 'g'), '-');
  const fileName = names(projectDirectory).fileName;

  const { libsDir } = getWorkspaceLayout(tree);

  const projectRoot = joinPathFragments(libsDir, 'components/src/lib', projectDirectory);

  return {
    ...options,
    fileName,
    name,
    className,
    projectRoot
  };
}

function createFiles(tree: Tree, options: NormalizedSchema) {
  const {className, name, propertyName} = names(options.name);

  generateFiles(tree, join(__dirname, './files'), options.projectRoot, {
    ...options,
    dot: '.',
    className,
    name,
    propertyName,
    camelCasedName: className[0].toLowerCase() + className.substr(1),
    cliCommand: 'nx',
    strict: undefined,
    tmpl: '',
    offsetFromRoot: offsetFromRoot(options.projectRoot)
  });
}

function updatePackageJsonExports(tree: Tree, options: NormalizedSchema) {
  const packageJsonPath = `libs/components/package.json`;
  if (options.exportComponent && tree.exists(packageJsonPath)) {
    const packageJson = JSON.parse(tree.read(packageJsonPath)
      .toString());
    if (!packageJson.exports) {
      packageJson.exports = {};
    }
    const exportsValue = `./${names(options.name).fileName}`;
    packageJson.exports[exportsValue] = exportsValue;
    tree.write(packageJsonPath, JSON.stringify(packageJson));
  }
}

function updateComponentsExports(tree: Tree, options: NormalizedSchema) {
  const componentsPath = `libs/components/src/lib/components.ts`;
  if (options.addToExports && tree.exists(componentsPath)) {
    const toAdd = `export * from './${options.name}';`;
    const lines = tree.read(componentsPath, 'utf8').split('\n');
    if (lines.indexOf(toAdd) === -1) {
      lines.push(toAdd);
      lines.sort();
      tree.write(componentsPath, lines.join('\n'));
    }
  }
}

export default async function vividComponentGenerator(tree: Tree, schema: VividComponentGeneratorOptions) {
  const options = normalizeOptions(tree, schema);
  createFiles(tree, options);
  updatePackageJsonExports(tree, options);
  updateComponentsExports(tree, options);

  await formatFiles(tree);
}
