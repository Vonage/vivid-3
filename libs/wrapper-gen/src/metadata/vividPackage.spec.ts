import {
	getImportPath,
	getTypescriptDefinitionPath,
	isVividComponentPath,
} from './vividPackage';

describe('isVividComponentPath', () => {
	it('should return true for a Vivid component path', () => {
		expect(
			isVividComponentPath('libs/components/src/lib/button/button.ts')
		).toBe(true);
	});

	it('should return false for a non-component path', () => {
		expect(isVividComponentPath('libs/components/src/index.ts')).toBe(false);
	});
});

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
