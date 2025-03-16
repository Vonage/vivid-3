import { TypeUnion } from '../common/types';

export type Import = {
	name: string;
	fromModule: string;
};

export const renderImports = (imports: Import[], typeImport = false) => {
	const importsFromModule = new Map<string, string[]>();
	for (const { name, fromModule } of imports) {
		if (!importsFromModule.has(fromModule)) {
			importsFromModule.set(fromModule, []);
		}
		importsFromModule.get(fromModule)!.push(name);
	}
	return Array.from(importsFromModule.entries())
		.map(
			([fromModule, names]) =>
				`import ${typeImport ? 'type ' : ''}{ ${names.join(
					', '
				)} } from '${fromModule}';`
		)
		.join('\n');
};

const typeImports = new Map([
	['IconId', [{ name: 'IconId', fromModule: '../icons' }]],
]);
export const importsForTypes = (typeRefs: TypeUnion): Import[] =>
	typeRefs.flatMap((t) => typeImports.get(t) ?? []);
