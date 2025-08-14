import { loadMetadata } from '@repo/wrapper-gen/metadataStore';
import * as fs from 'fs';
import * as path from 'path';

const kebabToCamel = (str: string): string => {
	return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
};

const kebabToPascal = (str: string): string => {
	return str
		.split('-')
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
		.join('');
};

export const camelToPascal = (camel: string) =>
	camel[0].toUpperCase() + camel.slice(1);

const dirname = new URL('.', import.meta.url).pathname;

const metadata = loadMetadata();

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
import type {
${metadata.componentDefs
	.map((def) => `Vwc${kebabToPascal(def.name)}Element`)
	.join(',\n')}
} from "@vonage/vivid";

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

type ${kebabToPascal(def.name)}Props = ${
					def.props.length
						? `{
	${def.props.map((prop) => `${prop.name}: ${prop.type};`).join('\n')}
}`
						: 'Record<string, never>'
				};

const ${kebabToCamel(def.name)}ComponentInfo = {
	name: '${def.name}'
};

export class ${kebabToPascal(
					def.name
				)}Wrapper<D extends DriverT> extends BaseWrapper<D, ${`Vwc${kebabToPascal(
					def.name
				)}Element`}> {
	type = '${kebabToCamel(def.name)}' as const;

	componentInfo = ${kebabToCamel(def.name)}ComponentInfo;

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

export class ${kebabToPascal(
					def.name
				)}<D extends DriverT> extends BaseComponent<
	D,
	${kebabToPascal(def.name)}Wrapper<D>
> {
	componentInfo = ${kebabToCamel(def.name)}ComponentInfo;

	wrap(locator: D['locator']) {
		return new ${kebabToPascal(def.name)}Wrapper(this.ctx, locator);
	}

	${def.testUtils.selectors
		.map(
			(selector) =>
				`// prettier-ignore
${selector.name} = this.ctx.driver.wrapSelector((selectors.${
					selector.args[0]
				}<D, ${kebabToPascal(def.name)}Wrapper<D>>).bind(this));`
		)
		.join('\n')}
}

export class ${kebabToPascal(def.name)}Expectations<D extends DriverT> {
	constructor(private readonly ctx: Context<D>, private readonly wrapper: ${kebabToPascal(
		def.name
	)}Wrapper<D>) {}

	${
		def.props.length
			? `
	toHaveProp = this.ctx.driver.wrapExpect(<T extends keyof ${kebabToPascal(
		def.name
	)}Props>(
		propName: T,
		value: ${kebabToPascal(def.name)}Props[T]
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
			let name = query.name;
			let isNegation = false;
			if (name.startsWith('!')) {
				isNegation = true;
				name = name.slice(1);
			}
			const isBoolean = query.args.length > 1;
			if (isBoolean) {
				name = isNegation
					? `notToBe${camelToPascal(name)}`
					: `toBe${camelToPascal(name)}`;
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
  toHave${camelToPascal(query.name)} = this.ctx.driver.wrapExpect((
		value: any
	) => this.ctx.driver.expectEq(
				{
					type: 'eval',
					el: this.wrapper.unwrap(),
					fn: queries.${query.args[0]},
				},
				value,
				"toHave${camelToPascal(query.name)}(\${value})"
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
			(def) =>
				`${kebabToCamel(def.name)}: ${kebabToPascal(def.name)}Expectations<D>;`
		)
		.join('\n')}
};

const expectationsConstructors= {
	collection: ComponentCollectionExpectations,
	${metadata.componentDefs
		.map(
			(def) =>
				`${kebabToCamel(def.name)}: ${kebabToPascal(def.name)}Expectations,`
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
			(def) =>
				`${kebabToCamel(def.name)} = new ${kebabToPascal(def.name)}(this.ctx);`
		)
		.join('\n')}
}
`
);

fs.writeFileSync(
	path.join(dirname, '../API.md'),
	`# Vivid Test Utils

${metadata.componentDefs
	.map(
		(componentDef) => `## ${kebabToPascal(componentDef.name)}

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
#### Queries

${componentDef.testUtils.queries
	.map((query) => `- \`${query.name}\``)
	.join('\n')}

`
		: ''
}

${
	componentDef.testUtils.refs.length
		? `
#### Refs

${componentDef.testUtils.refs.map((ref) => `- \`${ref.name}\``).join('\n')}

`
		: ''
}

`
	)
	.join('\n')}
`
);
