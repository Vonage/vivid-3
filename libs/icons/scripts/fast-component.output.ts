import type { OutputFormat } from '@repo/tools';
import { camelCase, kebabCase, pascalCase } from 'change-case';

// This cache is an workaround for creating a component that has two styles of icons - solid and line
// Usually each icon is separate file.
const lineSvgCache = new Map<string, string>();
const solidSvgCache = new Map<string, string>();

export const fastComponent: OutputFormat = {
	fileName: (entry) => `components/${kebabCase(`${entry.name}`)}.component.ts`,
	template: (entry, svg) => {
		const content = svg
			.replace(' fill="none"', '')
			.replace(/fill="\S+"/gm, 'fill="currentColor"');
		const iconDefinitionName = camelCase(
			`${entry.name}-${entry.style}-icon-definition`
		);
		const iconName = kebabCase(entry.name);
		const iconTagName = kebabCase(`icon-${entry.name}`);
		const iconClassName = pascalCase(`${entry.name}-icon`);
		const registerFunctionName = camelCase(`register-${entry.name}-icon`);

		const cacheKey = `${entry.category}-${entry.name}`;

		if (entry.style === 'line' && !lineSvgCache.has(cacheKey)) {
			lineSvgCache.set(cacheKey, content);
		}

		if (entry.style === 'solid' && !solidSvgCache.has(cacheKey)) {
			solidSvgCache.set(cacheKey, content);
		}

		const lineTemplate = lineSvgCache.get(cacheKey);
		const solidTemplate = solidSvgCache.get(cacheKey);

		if (!lineTemplate || !solidTemplate) return;

		return `import { html, css } from '@microsoft/fast-element';
import { createRegisterFunction } from '../../internals/createRegisterFunction';
import { defineVividComponent } from '../../internals/defineVividComponent';
import { IconElement } from '../../internals/vivid-element';

class ${iconClassName} extends IconElement {
	override lineIconTemplate = html\`${lineTemplate}\`;
	override solidIconTemplate = html\`${solidTemplate}\`;
}

/**
 * @internal
 */
export const ${iconDefinitionName} = defineVividComponent(
	'${iconTagName}',
	${iconClassName},
	html\`\${ (x) => x.iconStyle === 'solid' ? x.solidIconTemplate : x.lineIconTemplate }\`,
	[],
	{
		styles: css\`:host {
    display: inline-block;
    color: currentColor;
  }
  :host svg {
    display: block;
    color: inherit;
  }
		\`
	}
);

/**
 * Registers the ${iconName} (${entry.style}) icon.
 *
 * @param prefix - the prefix to use for the component name
 */
export const ${registerFunctionName} = createRegisterFunction(${iconDefinitionName});

export { ${iconClassName} };

		`;
	},
};
