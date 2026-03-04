import { ClassDeclaration, Project, SourceFile } from 'ts-morph';
import { getComponentName, hasJSDocTag } from '../types/jsdoc';

export interface DiscoveredComponent {
	/** The un-prefixed web component tag name. e.g. 'accordion-item' */
	name: string;
	className: string;
	classDeclaration: ClassDeclaration;
	sourceFile: SourceFile;
	/** The path of the module relative to the components src dir */
	modulePath: string;
}

/**
 * Finds all classes in the project that are annotated with both @public and @component.
 */
export function discoverComponents(project: Project): DiscoveredComponent[] {
	const components: DiscoveredComponent[] = [];

	for (const sourceFile of project.getSourceFiles()) {
		for (const classDecl of sourceFile.getClasses()) {
			const componentName = getComponentName(classDecl);
			if (!componentName) continue;
			if (!hasJSDocTag(classDecl, 'public')) continue;

			const className = classDecl.getName();
			if (!className) continue;

			const filePath = sourceFile.getFilePath();
			// Extract module path relative to components src, e.g. 'src/lib/button/button.ts'
			const srcIndex = filePath.indexOf('/src/');
			const modulePath =
				srcIndex >= 0 ? filePath.slice(srcIndex + 1) : filePath;

			components.push({
				name: componentName,
				className,
				classDeclaration: classDecl,
				sourceFile,
				modulePath,
			});
		}
	}

	return components;
}
