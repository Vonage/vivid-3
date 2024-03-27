import { getImportPath, getTypescriptDefinitionPath } from './vividPackage';

describe('getTypescriptDefinitionPath', () => {
	it('should return the path to the corresponding .d.ts file', () => {
		expect(
			getTypescriptDefinitionPath(
				'libs/components/src/components/button/button.ts'
			)
		).toBe('../../dist/libs/components/components/button/button.d.ts');
	});
});

describe('getImportPath', () => {
	it('should package import for a file', () => {
		expect(
			getImportPath('libs/components/src/components/button/button.ts')
		).toBe('@vonage/vivid/components/button/button');
	});
});
