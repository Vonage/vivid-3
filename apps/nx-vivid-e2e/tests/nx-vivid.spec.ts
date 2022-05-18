import {
  checkFilesExist,
  ensureNxProject,
  readJson,
  runNxCommandAsync,
  uniq,
} from '@nrwl/nx-plugin/testing';

describe('nx-vivid e2e', () => {
  beforeAll(() => {
    ensureNxProject('@vonage/nx-vivid', 'dist/libs/nx-vivid');
  });

  afterAll(() => {
    runNxCommandAsync('reset');
  });

  describe('--directory', () => {
    it('should create src in the specified directory', async () => {
      const project = uniq('nx-vivid');
      await runNxCommandAsync(
        `generate @vonage/nx-vivid:component ${project}`
      );
      expect(() =>
        checkFilesExist(`libs/components/src/lib/${project}/index.ts`)
      ).not.toThrow();
      expect(() =>
        checkFilesExist(`libs/components/src/lib/${project}/ui.test.ts`)
      ).not.toThrow();
      expect(() =>
        checkFilesExist(`libs/components/src/lib/${project}/README.md`)
      ).not.toThrow();
      expect(() =>
        checkFilesExist(`libs/components/src/lib/${project}/${project}.ts`)
      ).not.toThrow();
      expect(() =>
        checkFilesExist(`libs/components/src/lib/${project}/${project}.template.ts`)
      ).not.toThrow();
      expect(() =>
        checkFilesExist(`libs/components/src/lib/${project}/${project}.spec.ts`)
      ).not.toThrow();
      expect(() =>
        checkFilesExist(`libs/components/src/lib/${project}/${project}.scss`)
      ).not.toThrow();
    }, 120000);
  });
});
