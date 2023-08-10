import {
  readJson,
  readProjectConfiguration,
  Tree,
  updateJson,
} from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import libraryGenerator from './library';
import { Linter } from '@nx/linter';
import { Schema } from './schema';

describe('lib', () => {
  let appTree: Tree;

  const defaultSchema: Schema = {
    name: 'myLib',
    linter: Linter.EsLint,
    skipFormat: false,
    skipTsConfig: false,
    unitTestRunner: 'jest',
    strict: true,
  };

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace({ layout: 'apps-libs' });
    appTree.write('.gitignore', '');
  });

  describe('not nested', () => {
    it('should update project.json', async () => {
      await libraryGenerator(appTree, { ...defaultSchema, tags: 'one,two' });
      const projectConfiguration = readProjectConfiguration(appTree, 'my-lib');
      expect(projectConfiguration.root).toEqual('libs/my-lib');
      expect(projectConfiguration.targets.build).toBeUndefined();
      expect(projectConfiguration.targets.lint).toEqual({
        executor: '@nx/linter:eslint',
        outputs: ['{options.outputFile}'],
        options: {
          lintFilePatterns: ['libs/my-lib/**/*.{ts,tsx,js,jsx}'],
        },
      });
      expect(projectConfiguration.tags).toEqual(['one', 'two']);
    });

    it('should update root tsconfig.base.json', async () => {
      await libraryGenerator(appTree, defaultSchema);
      const tsconfigJson = readJson(appTree, '/tsconfig.base.json');
      expect(tsconfigJson.compilerOptions.paths['@proj/my-lib']).toEqual([
        'libs/my-lib/src/index.ts',
      ]);
    });

    it('should update root tsconfig.json when no tsconfig.base.json', async () => {
      appTree.rename('tsconfig.base.json', 'tsconfig.json');

      await libraryGenerator(appTree, defaultSchema);

      const tsconfigJson = readJson(appTree, '/tsconfig.json');
      expect(tsconfigJson.compilerOptions.paths['@proj/my-lib']).toEqual([
        'libs/my-lib/src/index.ts',
      ]);
    });

    it('should update root tsconfig.base.json (no existing path mappings)', async () => {
      updateJson(appTree, 'tsconfig.base.json', (json) => {
        json.compilerOptions.paths = undefined;
        return json;
      });

      await libraryGenerator(appTree, defaultSchema);
      const tsconfigJson = readJson(appTree, '/tsconfig.base.json');
      expect(tsconfigJson.compilerOptions.paths['@proj/my-lib']).toEqual([
        'libs/my-lib/src/index.ts',
      ]);
    });

    it('should create a local tsconfig.json', async () => {
      await libraryGenerator(appTree, defaultSchema);

      const tsconfigJson = readJson(appTree, 'libs/my-lib/tsconfig.json');
      expect(tsconfigJson.extends).toBe('../../tsconfig.base.json');
      expect(tsconfigJson.references).toEqual([
        {
          path: './tsconfig.lib.json',
        },
        {
          path: './tsconfig.spec.json',
        },
      ]);
      expect(
        tsconfigJson.compilerOptions.forceConsistentCasingInFileNames
      ).toEqual(true);
      expect(tsconfigJson.compilerOptions.strict).toEqual(true);
      expect(tsconfigJson.compilerOptions.noImplicitReturns).toEqual(true);
      expect(tsconfigJson.compilerOptions.noFallthroughCasesInSwitch).toEqual(
        true
      );
    });

    it('should extend from root tsconfig.json when no tsconfig.base.json', async () => {
      appTree.rename('tsconfig.base.json', 'tsconfig.json');

      await libraryGenerator(appTree, defaultSchema);

      const tsconfigJson = readJson(appTree, 'libs/my-lib/tsconfig.json');
      expect(tsconfigJson.extends).toBe('../../tsconfig.json');
    });

    it('should extend the local tsconfig.json with tsconfig.spec.json', async () => {
      await libraryGenerator(appTree, defaultSchema);
      const tsconfigJson = readJson(appTree, 'libs/my-lib/tsconfig.spec.json');
      expect(tsconfigJson.extends).toEqual('./tsconfig.json');
    });

    it('should extend the local tsconfig.json with tsconfig.lib.json', async () => {
      await libraryGenerator(appTree, defaultSchema);
      const tsconfigJson = readJson(appTree, 'libs/my-lib/tsconfig.lib.json');
      expect(tsconfigJson.extends).toEqual('./tsconfig.json');
    });
  });

  describe('nested', () => {
    it('should update nx.json', async () => {
      await libraryGenerator(appTree, {
        ...defaultSchema,
        directory: 'myDir',
        tags: 'one',
      });
      const projectConfiguration = readProjectConfiguration(
        appTree,
        'my-dir-my-lib'
      );
      expect(projectConfiguration).toMatchObject({
        tags: ['one'],
      });

      await libraryGenerator(appTree, {
        ...defaultSchema,
        name: 'myLib2',
        directory: 'myDir',
        tags: 'one,two',
      });

      const lib2ProjectConfiguration = readProjectConfiguration(
        appTree,
        'my-dir-my-lib2'
      );
      expect(lib2ProjectConfiguration).toMatchObject({
        tags: ['one', 'two'],
      });
    });

    it('should update project.json', async () => {
      await libraryGenerator(appTree, { ...defaultSchema, directory: 'myDir' });
      const projectConfiguration = readProjectConfiguration(
        appTree,
        'my-dir-my-lib'
      );

      expect(projectConfiguration.root).toEqual('libs/my-dir/my-lib');
      expect(projectConfiguration.targets.lint).toEqual({
        executor: '@nx/linter:eslint',
        outputs: ['{options.outputFile}'],
        options: {
          lintFilePatterns: ['libs/my-dir/my-lib/**/*.{ts,tsx,js,jsx}'],
        },
      });
    });

    it('should update root tsconfig.base.json', async () => {
      await libraryGenerator(appTree, { ...defaultSchema, directory: 'myDir' });
      const tsconfigJson = readJson(appTree, '/tsconfig.base.json');
      expect(tsconfigJson.compilerOptions.paths['@proj/my-dir/my-lib']).toEqual(
        ['libs/my-dir/my-lib/src/index.ts']
      );
      expect(
        tsconfigJson.compilerOptions.paths['my-dir-my-lib/*']
      ).toBeUndefined();
    });

    it('should update root tsconfig.json when no tsconfig.base.json', async () => {
      appTree.rename('tsconfig.base.json', 'tsconfig.json');

      await libraryGenerator(appTree, { ...defaultSchema, directory: 'myDir' });

      const tsconfigJson = readJson(appTree, '/tsconfig.json');
      expect(tsconfigJson.compilerOptions.paths['@proj/my-dir/my-lib']).toEqual(
        ['libs/my-dir/my-lib/src/index.ts']
      );
      expect(
        tsconfigJson.compilerOptions.paths['my-dir-my-lib/*']
      ).toBeUndefined();
    });

    it('should create a local tsconfig.json', async () => {
      await libraryGenerator(appTree, { ...defaultSchema, directory: 'myDir' });

      const tsconfigJson = readJson(
        appTree,
        'libs/my-dir/my-lib/tsconfig.json'
      );
      expect(tsconfigJson.extends).toBe('../../../tsconfig.base.json');
      expect(tsconfigJson.references).toEqual([
        {
          path: './tsconfig.lib.json',
        },
        {
          path: './tsconfig.spec.json',
        },
      ]);
    });

    it('should extend from root tsconfig.json when no tsconfig.base.json', async () => {
      appTree.rename('tsconfig.base.json', 'tsconfig.json');

      await libraryGenerator(appTree, { ...defaultSchema, directory: 'myDir' });

      const tsconfigJson = readJson(
        appTree,
        'libs/my-dir/my-lib/tsconfig.json'
      );
      expect(tsconfigJson.extends).toBe('../../../tsconfig.json');
    });
  });

  describe('--unit-test-runner none', () => {
    it('should not generate test configuration', async () => {
      await libraryGenerator(appTree, {
        ...defaultSchema,
        unitTestRunner: 'none',
      });

      expect(appTree.exists('libs/my-lib/tsconfig.spec.json')).toBeFalsy();
      expect(appTree.exists('libs/my-lib/jest.config.ts')).toBeFalsy();
      const projectConfiguration = readProjectConfiguration(appTree, 'my-lib');
      expect(projectConfiguration.targets.test).toBeUndefined();
      expect(projectConfiguration.targets.lint).toMatchObject({
        executor: '@nx/linter:eslint',
        options: {
          lintFilePatterns: ['libs/my-lib/**/*.{ts,tsx,js,jsx}'],
        },
        outputs: ['{options.outputFile}'],
      });
    });

    it('should generate test configuration', async () => {
      await libraryGenerator(appTree, {
        ...defaultSchema,
        unitTestRunner: 'jest',
      });

      expect(appTree.read('libs/my-lib/tsconfig.spec.json', 'utf-8'))
        .toMatchInlineSnapshot(`
        "{
          "extends": "./tsconfig.json",
          "compilerOptions": {
            "outDir": "../../dist/out-tsc",
            "module": "commonjs",
            "types": ["jest", "node"]
          },
          "include": [
            "jest.config.ts",
            "src/**/*.test.ts",
            "src/**/*.spec.ts",
            "src/**/*.test.tsx",
            "src/**/*.spec.tsx",
            "src/**/*.test.js",
            "src/**/*.spec.js",
            "src/**/*.test.jsx",
            "src/**/*.spec.jsx",
            "src/**/*.d.ts"
          ]
        }
        "
      `);
      expect(appTree.read('libs/my-lib/jest.config.ts', 'utf-8'))
        .toMatchInlineSnapshot(`
        "module.exports = {
          displayName: 'my-lib',
          preset: 'react-native',
          resolver: '@nx/jest/plugins/resolver',
          moduleFileExtensions: ['ts', 'js', 'html', 'tsx', 'jsx'],
          setupFilesAfterEnv: ['<rootDir>/test-setup.ts'],
          moduleNameMapper: {
            '\\\\.svg$': '@nx/react-native/plugins/jest/svg-mock',
          },
          coverageDirectory: '../../coverage/libs/my-lib',
        };
        "
      `);
      const projectConfiguration = readProjectConfiguration(appTree, 'my-lib');
      expect(projectConfiguration.targets.test).toMatchInlineSnapshot(`
        {
          "configurations": {
            "ci": {
              "ci": true,
              "codeCoverage": true,
            },
          },
          "executor": "@nx/jest:jest",
          "options": {
            "jestConfig": "libs/my-lib/jest.config.ts",
            "passWithNoTests": true,
          },
          "outputs": [
            "{workspaceRoot}/coverage/{projectRoot}",
          ],
        }
      `);
    });
  });

  describe('--buildable', () => {
    it('should have a builder defined', async () => {
      await libraryGenerator(appTree, {
        ...defaultSchema,
        buildable: true,
      });

      const projectConfiguration = readProjectConfiguration(appTree, 'my-lib');

      expect(projectConfiguration.targets.build).toBeDefined();
    });
  });

  describe('--publishable', () => {
    it('should add build architect', async () => {
      await libraryGenerator(appTree, {
        ...defaultSchema,
        publishable: true,
        importPath: '@proj/my-lib',
      });

      const projectConfiguration = readProjectConfiguration(appTree, 'my-lib');

      expect(projectConfiguration.targets.build).toMatchObject({
        executor: '@nx/rollup:rollup',
        outputs: ['{options.outputPath}'],
        options: {
          external: ['react/jsx-runtime', 'react-native', 'react', 'react-dom'],
          entryFile: 'libs/my-lib/src/index.ts',
          outputPath: 'dist/libs/my-lib',
          project: 'libs/my-lib/package.json',
          tsConfig: 'libs/my-lib/tsconfig.lib.json',
          rollupConfig: '@nx/react/plugins/bundle-rollup',
        },
      });
    });

    it('should fail if no importPath is provided with publishable', async () => {
      expect.assertions(1);

      try {
        await libraryGenerator(appTree, {
          ...defaultSchema,
          directory: 'myDir',
          publishable: true,
        });
      } catch (e) {
        expect(e.message).toContain(
          'For publishable libs you have to provide a proper "--importPath" which needs to be a valid npm package name (e.g. my-awesome-lib or @myorg/my-lib)'
        );
      }
    });

    it('should add package.json and .babelrc', async () => {
      await libraryGenerator(appTree, {
        ...defaultSchema,
        publishable: true,
        importPath: '@proj/my-lib',
      });

      const packageJson = readJson(appTree, '/libs/my-lib/package.json');
      expect(packageJson.name).toEqual('@proj/my-lib');
      expect(appTree.exists('/libs/my-lib/.babelrc'));
    });
  });

  describe('--js', () => {
    it('should generate JS files', async () => {
      await libraryGenerator(appTree, {
        ...defaultSchema,
        js: true,
      });

      expect(appTree.exists('/libs/my-lib/src/index.js')).toBe(true);
    });
  });

  describe('--importPath', () => {
    it('should update the package.json & tsconfig with the given import path', async () => {
      await libraryGenerator(appTree, {
        ...defaultSchema,
        publishable: true,
        directory: 'myDir',
        importPath: '@myorg/lib',
      });
      const packageJson = readJson(appTree, 'libs/my-dir/my-lib/package.json');
      const tsconfigJson = readJson(appTree, '/tsconfig.base.json');

      expect(packageJson.name).toBe('@myorg/lib');
      expect(
        tsconfigJson.compilerOptions.paths[packageJson.name]
      ).toBeDefined();
    });

    it('should fail if the same importPath has already been used', async () => {
      await libraryGenerator(appTree, {
        ...defaultSchema,
        name: 'myLib1',
        publishable: true,
        importPath: '@myorg/lib',
      });

      try {
        await libraryGenerator(appTree, {
          ...defaultSchema,
          name: 'myLib2',
          publishable: true,
          importPath: '@myorg/lib',
        });
      } catch (e) {
        expect(e.message).toContain(
          'You already have a library using the import path'
        );
      }

      expect.assertions(1);
    });
  });

  describe('--no-strict', () => {
    it('should not add options for strict mode', async () => {
      await libraryGenerator(appTree, {
        ...defaultSchema,
        strict: false,
      });
      const tsconfigJson = readJson(appTree, '/libs/my-lib/tsconfig.json');

      expect(
        tsconfigJson.compilerOptions.forceConsistentCasingInFileNames
      ).not.toBeDefined();
      expect(tsconfigJson.compilerOptions.strict).not.toBeDefined();
      expect(tsconfigJson.compilerOptions.noImplicitReturns).not.toBeDefined();
      expect(
        tsconfigJson.compilerOptions.noFallthroughCasesInSwitch
      ).not.toBeDefined();
    });
  });

  describe('--skipPackageJson', () => {
    it('should not add or update dependencies when true', async () => {
      const packageJsonBefore = readJson(appTree, 'package.json');

      await libraryGenerator(appTree, {
        ...defaultSchema,
        skipPackageJson: true,
      });

      expect(readJson(appTree, 'package.json')).toEqual(packageJsonBefore);
    });
  });
});