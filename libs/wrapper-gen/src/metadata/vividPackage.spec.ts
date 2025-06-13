import {
	getExportedClassName,
	getTypescriptDefinitionPath,
} from './vividPackage';

describe('getTypescriptDefinitionPath', () => {
	it('should return the path to the corresponding .d.ts file', () => {
		expect(
			getTypescriptDefinitionPath(
				'libs/components/src/components/button/button.ts'
			)
		).toBe('libs/components/src/components/button/button.d.ts');
	});
});

describe('getExportedClassName', () => {
	it('should return the exported class name', () => {
		expect(getExportedClassName('accordion-item')).toBe(
			'VwcAccordionItemElement'
		);
	});
});
