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
				)}Wrapper<D extends DriverT> extends BaseWrapper<D> {
	type = '${kebabToCamel(def.name)}' as const;

	componentInfo = ${kebabToCamel(def.name)}ComponentInfo;

	${def.testUtils.actions
		.map(
			(action) =>
				`// prettier-ignore
${action.name} = (actions.${
					action.args[0]
				}<D>).bind(null, this.ctx, this.componentInfo, () => this.${
					action.args[1] ? `${action.args[1]}()` : 'locator'
				});`
		)
		.join('\n')}

	${def.testUtils.refs
		.map(
			(ref) =>
				`// prettier-ignore
${ref.name} = (refs.${ref.args[0]}<D>).bind(null, this.ctx, this, '${ref.args[1]}');`
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
${selector.name} = (selectors.${selector.args[0]}<D, ${kebabToPascal(
					def.name
				)}Wrapper<D>>).bind(null, this.ctx, this.componentInfo, this.wrap.bind(this));`
		)
		.join('\n')}
}

export class ${kebabToPascal(def.name)}Expectations<D extends DriverT> {
	constructor(private readonly ctx: Context<D>, private readonly wrapper: ${kebabToPascal(
		def.name
	)}Wrapper<D>) {}

	toHaveProp<T extends keyof ${kebabToPascal(def.name)}Props>(
		propName: T,
		value: ${kebabToPascal(def.name)}Props[T]
	) {
		return this.ctx.driver.expectEq(
			{
				type: 'eval',
				el: this.wrapper.unwrap(),
				fn: (el: any, propName: any) => el[propName],
				arg: propName
			},
			value
		);
	}

  ${def.testUtils.queries
		.map(
			(query) => `
  toHave${camelToPascal(query.name)}(
		value: any
	) {
		return this.ctx.driver.expectEq(
			{
				type: 'eval',
				el: this.wrapper.unwrap(),
				fn: queries.${query.args[0]},
			},
			value
		);
	}`
		)
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
