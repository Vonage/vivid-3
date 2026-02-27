import { pascalCase } from 'change-case';

/**
 * Derive registerFunctionName from the component directory
 * e.g. 'src/lib/data-grid/data-grid-cell.ts' → 'data-grid' → 'registerDataGrid'
 */
export const getRegisterFunctionName = (modulePath: string) => {
	const pathParts = modulePath.split('/');
	const componentDirName = pathParts[pathParts.length - 2];
	const registerFunctionName = `register${pascalCase(componentDirName)}`;
	return registerFunctionName;
};
