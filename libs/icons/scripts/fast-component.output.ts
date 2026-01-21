import type { OutputFormat } from '@repo/tools';
import { camelCase, kebabCase, pascalCase } from 'change-case';

export const fastComponent: OutputFormat = {
	fileName: (entry) =>
		`components/${kebabCase(`${entry.name}-${entry.style}`)}.component.ts`,
	template: (entry, svg) => {
		const content = svg
			.replace(' fill="none"', '')
			.replace(/fill="\S+"/gm, 'fill="currentColor"');
		const iconDefinitionName = camelCase(
			`${entry.name}-${entry.style}-icon-definition`
		);
		const iconName = kebabCase(entry.name);
		const iconTagName = kebabCase(`icon-${entry.name}-${entry.style}`);
		const iconClassName = pascalCase(`${entry.name}-${entry.style}-icon`);
		const registerFunctionName = camelCase(
			`register-${entry.name}-${entry.style}-icon`
		);

		return `import { html, css } from '@microsoft/fast-element';
import { createRegisterFunction } from '../../internals/createRegisterFunction';
import { defineVividComponent } from '../../internals/defineVividComponent';
import { IconElement } from '../../internals/vivid-element';

class ${iconClassName} extends IconElement {}

/**
 * @internal
 */
export const ${iconDefinitionName} = defineVividComponent(
	'${iconTagName}',
	${iconClassName},
	html\`${content}\`,
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
