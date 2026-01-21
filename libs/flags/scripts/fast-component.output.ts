import type { OutputFormat } from '@repo/tools';
import { camelCase, kebabCase, pascalCase } from 'change-case';

export const fastComponent: OutputFormat = {
	fileName: (entry) => `components/${kebabCase(entry.name)}.component.ts`,
	template: (entry, content) => {
		const iconDefinitionName = camelCase(`${entry.name}-flag-icon-definition`);
		const iconName = kebabCase(entry.name);
		const iconTagName = kebabCase(`icon-${entry.name}`);
		const iconClassName = pascalCase(`${entry.name}-flag-icon`);
		const registerFunctionName = camelCase(`register-${entry.name}`);

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
  }
  :host svg {
    display: block;
  }
		\`
	}
);

/**
 * Registers the ${iconName} flag icon.
 *
 * @param prefix - the prefix to use for the component name
 */
export const ${registerFunctionName} = createRegisterFunction(${iconDefinitionName});

export { ${iconClassName} };

		`;
	},
};
