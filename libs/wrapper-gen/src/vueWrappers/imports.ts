import type { TypeUnion } from '@repo/metadata-extractor/metadata/type-str';
import { parseTypeImports } from '@repo/metadata-extractor/metadata/type-str';

export type Import = {
	name: string;
	fromModule: string;
};

export const renderImports = (imports: Import[], typeImport = false) => {
	const importsFromModule = new Map<string, Set<string>>();
	for (const { name, fromModule } of imports) {
		if (!importsFromModule.has(fromModule)) {
			importsFromModule.set(fromModule, new Set());
		}
		importsFromModule.get(fromModule)!.add(name);
	}
	return Array.from(importsFromModule.entries())
		.map(
			([fromModule, names]) =>
				`import ${typeImport ? 'type ' : ''}{ ${[...names].join(
					', '
				)} } from '${fromModule}';`
		)
		.join('\n');
};

const typeImports = new Map([
	['IconId', [{ name: 'IconId', fromModule: '../icons' }]],
]);
export const importsForTypes = (typeRefs: TypeUnion): Import[] =>
	typeRefs.flatMap((t) => typeImports.get(t) ?? parseTypeImports(t).imports);
