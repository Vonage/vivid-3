import { loadMetadata } from '@repo/wrapper-gen/metadataStore';
import * as fs from 'fs';
import * as path from 'path';
import {
	parseTypeImports,
	parseTypeStr,
	type TypeUnion,
} from '@repo/metadata-extractor/metadata/type-str';
import { camelCase, pascalCase } from 'change-case';

const parseQuery = (query: { name: string; args: string[] }) => {
	let name = query.name;
	let isNegation = false;
	if (name.startsWith('!')) {
		isNegation = true;
		name = name.slice(1);
	}
	const isBoolean = query.args.length > 1;

	name = isBoolean
		? isNegation
			? `notToBe${pascalCase(name)}`
			: `toBe${pascalCase(name)}`
		: `toHave${pascalCase(query.name)}`;

	return { name, isBoolean };
};

const dirname = new URL('.', import.meta.url).pathname;

const metadata = loadMetadata();

type Import = {
	name: string;
	fromModule: string;
};

const renderImports = (imports: Import[], typeImport = false) => {
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

export const importsForTypes = (typeRefs: TypeUnion): Import[] =>
	typeRefs.flatMap((t) => parseTypeImports(t).imports);

const typeImports: Import[] = metadata.componentDefs.map((def) => ({
	name: `Vwc${pascalCase(def.name)}Element`,
	fromModule: '@vonage/vivid',
}));

// Import referenced types
const referencesTypes = [
	...metadata.componentDefs.flatMap((def) =>
		def.props.map((prop) => prop.type)
	),
].flatMap(parseTypeStr);
typeImports.push(...importsForTypes(referencesTypes));

fs.writeFileSync(
	path.join(dirname, '../src/components.generated.ts'),
	`import type { DriverT } from './drivers/driver';
import {
	BaseComponent,
	BaseWrapper,
	ComponentCollectionExpectations,
	type ComponentCollectionLocator,
	type Context,
} from './base';
import * as selectors from './selectors';
import * as actions from './actions';
import * as refs from './refs';
import * as queries from './queries';
${renderImports(typeImports, true)}

type IconId = string;

` +
		metadata.componentDefs
			.map((def) => {
				return `

/**
* Generated from:
${JSON.stringify(def, null, 2)
	.split('\n')
	.map((l) => ` * ${l}`)
	.join('\n')}
*/

type ${pascalCase(def.name)}Props = ${
					def.props.length
						? `{
	${def.props
		.map((prop) => `${prop.name}: ${parseTypeImports(prop.type).typeStr};`)
		.join('\n')}
}`
						: 'Record<string, never>'
				};

const ${camelCase(def.name)}ComponentInfo = {
	name: '${def.name}'
};

export class ${pascalCase(
					def.name
				)}Wrapper<D extends DriverT> extends BaseWrapper<D, ${`Vwc${pascalCase(
					def.name
				)}Element`}> {
	type = '${camelCase(def.name)}' as const;

	componentInfo = ${camelCase(def.name)}ComponentInfo;

	${def.testUtils.actions
		.map(
			(action) =>
				`// prettier-ignore
${action.name} = this.ctx.driver.wrapAction((actions.${
					action.args[0]
				}<D>).bind(this, ${[
					...action.args.slice(1).map((arg) => {
						if (arg === '#locator') {
							return `() => this.locator`;
						}
						if (arg.startsWith('#')) {
							return `() => this.${arg.slice(1)}()`;
						} else {
							return arg;
						}
					}),
				].join(', ')}));`
		)
		.join('\n')}

	${def.testUtils.refs
		.map(
			(ref) =>
				`/** @internal */
// prettier-ignore
${ref.name} = (refs.${ref.args[0]}<D>).bind(this, ${ref.args
					.slice(1)
					.map((arg) => `'${arg}'`)
					.join(', ')});`
		)
		.join('\n')}
}

export class ${pascalCase(def.name)}<D extends DriverT> extends BaseComponent<
	D,
	${pascalCase(def.name)}Wrapper<D>
> {
	componentInfo = ${camelCase(def.name)}ComponentInfo;

	wrap(locator: D['locator']) {
		return new ${pascalCase(def.name)}Wrapper(this.ctx, locator);
	}

	${def.testUtils.selectors
		.map(
			(selector) =>
				`// prettier-ignore
${selector.name} = this.ctx.driver.wrapSelector((selectors.${
					selector.args[0]
				}<D, ${pascalCase(def.name)}Wrapper<D>>).bind(this));`
		)
		.join('\n')}
}

export class ${pascalCase(def.name)}Expectations<D extends DriverT> {
	constructor(private readonly ctx: Context<D>, private readonly wrapper: ${pascalCase(
		def.name
	)}Wrapper<D>) {}

	${
		def.props.length
			? `
	toHaveProp = this.ctx.driver.wrapExpect(<T extends keyof ${pascalCase(
		def.name
	)}Props>(
		propName: T,
		value: ${pascalCase(def.name)}Props[T]
	) => this.ctx.driver.expectEq(
			{
				type: 'eval',
				el: this.wrapper.unwrap(),
				fn: (el: any, propName: any) => el[propName],
				arg: propName
			},
			value,
			\`toHaveProp("\${propName}", \${value})\`
		));
	`
			: `
	toHaveProp = (propName: never, value: never) => {
		throw new Error('Component does not have props.');
	}
	`
	}

  ${def.testUtils.queries
		.map((query) => {
			const { name, isBoolean } = parseQuery(query);

			if (isBoolean) {
				return `
  ${name} = this.ctx.driver.wrapExpect(() => this.ctx.driver.expectEq(
				{
					type: 'eval',
					el: this.wrapper.unwrap(),
					fn: queries.${query.args[0]},
				},
				${query.args[1]},
				"${name}()"
			));
	`;
			} else {
				return `
  ${name} = this.ctx.driver.wrapExpect((
		value: any
	) => this.ctx.driver.expectEq(
				{
					type: 'eval',
					el: this.wrapper.unwrap(),
					fn: queries.${query.args[0]},
				},
				value,
				"${name}(\${value})"
			));
	`;
			}
		})
		.join('\n')}
}
	`;
			})
			.join('\n') +
		`
type Expectations<D extends DriverT> = {
	collection: ComponentCollectionExpectations<D>;
	${metadata.componentDefs
		.map(
			(def) => `${camelCase(def.name)}: ${pascalCase(def.name)}Expectations<D>;`
		)
		.join('\n')}
};

const expectationsConstructors= {
	collection: ComponentCollectionExpectations,
	${metadata.componentDefs
		.map(
			(def) => `${camelCase(def.name)}: ${pascalCase(def.name)}Expectations,`
		)
		.join('\n')}
};

type ComponentLocator<D extends DriverT> = BaseWrapper<D> & {
	type: keyof Expectations<D>;
};

export class VividWrapper<D extends DriverT> {
	constructor(protected readonly ctx: Context<D>) {}

	expect<K extends ComponentLocator<D> | ComponentCollectionLocator<D, any>>(
		componentLocator: K
	): Expectations<D>[K['type']] {
		if (componentLocator.type in expectationsConstructors) {
			return new expectationsConstructors[componentLocator.type](
				this.ctx,
				componentLocator as any
			) as any;
		}
		throw new Error(\`Unknown component type: \${componentLocator.type}\`);
	}

	${metadata.componentDefs
		.map(
			(def) => `${camelCase(def.name)} = new ${pascalCase(def.name)}(this.ctx);`
		)
		.join('\n')}
}
`
);

fs.writeFileSync(
	path.join(dirname, '../API.md'),
	`${metadata.componentDefs
		.map(
			(componentDef) => `### ${pascalCase(componentDef.name)}

#### Selectors

${componentDef.testUtils.selectors
	.map((selector) => `- \`${selector.name}\``)
	.join('\n')}

${
	componentDef.testUtils.actions.length
		? `
#### Actions

${componentDef.testUtils.actions
	.map((action) => `- \`${action.name}\``)
	.join('\n')}

`
		: ''
}

${
	componentDef.testUtils.queries.length
		? `
#### Expectations

- \`toHaveProp\`
${componentDef.testUtils.queries
	.map((query) => {
		const { name } = parseQuery(query);
		return `- \`${name}\``;
	})
	.join('\n')}

`
		: ''
}

`
		)
		.join('\n')}
`
);
