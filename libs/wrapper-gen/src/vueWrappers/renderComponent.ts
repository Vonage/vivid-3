import { ComponentDef } from '../common/ComponentDef';
import { kebabToCamel, kebabToPascal } from '../utils/casing';
import { parseTypeStr, TypeResolver, TypeStr } from '../common/types';
import { getExportedClassName } from '../metadata/vividPackage';
import { vuePropTypes } from './vuePropTypes';
import { wrappedComponentName } from './name';
import { determinePropForwarding } from './propForwarding';
import { Import, importsForTypes, renderImports } from './imports';

const renderJsDoc = (description?: string, type?: TypeStr) => {
	if (!description && !type) return '';

	const renderedDescription = description
		? `\n${description
				.split('\n')
				.map((line) => ` * ${line}`)
				.join('\n')}`
		: '';

	const renderedType = type ? `\n * @type {${type}}` : '';

	return `/**${renderedDescription}${renderedType}
 */`;
};

export const renderComponent = (
	componentDef: ComponentDef,
	importedTypesResolver: TypeResolver,
	isVue3Stub = false
) => {
	const vueModule = isVue3Stub ? 'vue3' : 'vue';

	const imports: Import[] = [
		{ name: 'defineComponent', fromModule: vueModule },
		{ name: 'ref', fromModule: vueModule },
		{ name: 'h', fromModule: vueModule },
		{ name: 'isVue2', fromModule: '../../utils/vue' },
		{ name: 'handleVue3Props', fromModule: '../../utils/ssr' },
		{ name: 'VNodeData', fromModule: vueModule },
		{ name: componentDef.registerFunctionName, fromModule: '@vonage/vivid' },
		{ name: 'registerComponent', fromModule: '../../utils/register' },
	];

	// Filter out props that are overshadowed by v-model name
	const props = componentDef.props.filter(
		({ name }) =>
			!componentDef.vueModels.some(
				(model) => model.name === name && model.propName !== name
			)
	);

	// Find v-models and their corresponding prop and event
	const vueModels = componentDef.vueModels.map((model) => {
		const prop = componentDef.props.find(
			(prop) => prop.name === model.propName
		);
		if (!prop) throw new Error(`v-model prop not found: ${model.propName}`);
		for (const eventName of model.eventNames) {
			const event = componentDef.events.find((e) => e.name === eventName);
			if (!event) throw new Error(`v-model event not found: ${eventName}`);
		}

		return {
			...model,
			prop,
		};
	});

	const vueModelEvents = vueModels.map((vueModel) => ({
		name: `update:${vueModel.name}`,
		description: `Fires when the ${vueModel.name} value changes`,
		type: vueModel.prop.type,
	}));

	if (props.length > 0) {
		imports.push({ name: 'PropType', fromModule: vueModule });
	}

	const typeImports: Import[] = [
		{
			name: getExportedClassName(componentDef.name),
			fromModule: '@vonage/vivid',
		},
	];

	// Import referenced types
	const referencesTypes = [
		...props.map((prop) => prop.type),
		...componentDef.events.map((event) => event.type),
		...componentDef.methods.flatMap((method) =>
			method.args.map((arg) => arg.type)
		),
	].flatMap(parseTypeStr);
	imports.push(...importsForTypes(referencesTypes));

	if (isVue3Stub) {
		typeImports.push({ name: 'SlotsType', fromModule: vueModule });
	}

	/**
	 * Forward all props to their respective attribute / dom property.
	 * In Vue 2, attributes and properties are under separate keys.
	 * In Vue 3, we need to prefix attributes with '^' and properties with '.' to differentiate them.
	 */
	const renderProps = (
		props: ComponentDef['props'],
		syntax: 'vue2-attrs' | 'vue2-domProps' | 'vue3'
	) => {
		const propsSrc = props
			.flatMap((prop) => {
				const forwardTo = determinePropForwarding(
					prop,
					parseTypeStr(importedTypesResolver(prop.type))
				);

				if (
					(syntax === 'vue2-attrs' && forwardTo.type === 'property') ||
					(syntax === 'vue2-domProps' && forwardTo.type === 'attribute')
				) {
					return [];
				}

				const vueModel = componentDef.vueModels.find(
					(model) => model.propName === prop.name
				);

				let valueToUse = `this.${prop.name}`;
				if (vueModel && vueModel.name !== prop.name) {
					// If there is a v-model, we will prefer the v-model value
					valueToUse = `this.${vueModel.name} ?? ${valueToUse}`;
				}

				const nameToUse =
					syntax === 'vue3'
						? forwardTo.type === 'attribute'
							? `^${forwardTo.name}`
							: `.${forwardTo.name}`
						: forwardTo.name;

				// Vue 2 and 3 differ in how they handle boolean attributes
				// Remove false attributes in Vue 3 to make it behave like Vue 2
				const booleanFilter =
					forwardTo.type === 'attribute' &&
					forwardTo.boolean &&
					syntax === 'vue3'
						? ` && (${valueToUse}) !== false`
						: '';

				// Vue requires us to filter out undefined properties before passing them into the h function
				const filter = `(${valueToUse}) !== undefined${booleanFilter}`;

				return [`...(${filter} ? {'${nameToUse}': ${valueToUse} } : {})`];
			})
			.join(',');
		if (syntax === 'vue3') {
			return `...handleVue3Props({${propsSrc}})`;
		}
		return propsSrc;
	};

	const propsV3Src = renderProps(props, 'vue3');

	const attrsV2Src = renderProps(props, 'vue2-attrs');
	const domPropsV2Src = renderProps(props, 'vue2-domProps');

	const renderEventType = (type: TypeStr, isVueModelEvent: boolean): string => {
		// Event type should be a single type like `CustomEvent<undefined>`
		if (parseTypeStr(type).length > 1) {
			throw new Error('Multiple event types not supported');
		}

		if (isVueModelEvent) {
			return type; // Vue model events use the prop's type, e.g. a `update:modelValue` will have type `string`
		}

		// The event `currentTarget` will always be the host component. Therefore, type `currentTarget` accordingly to make
		// it easier to use for consumers.
		// Originally we typed `target` instead, but this is not the case if the event bubbles from the light DOM, e.g. an
		// input event bubbling from a select slotted into a text-field. We will remove the inaccurate typing in a future
		// major version.
		return `${type} & {
			/**
			 * @deprecated Target may not refer to component in some cases. Use currentTarget instead.
			 */
			target: ${getExportedClassName(componentDef.name)},
			currentTarget: ${getExportedClassName(componentDef.name)}
		}`;
	};

	/**
	 * All events should be forwarded
	 */
	const eventsSrc = componentDef.events
		.map(({ name, type }) => {
			const eventVueModels = vueModels.filter((model) =>
				model.eventNames.includes(name)
			);
			return `'${name}': (event: ${renderEventType(type, false)}) => {
          ${eventVueModels
						.map(
							(vueModel) =>
								`this.$emit('update:${vueModel.name}', ${vueModel.valueMapping});`
						)
						.join('\n')}
          this.$emit('${name}', event);
        }`;
		})
		.join(',');

	const eventsV3Src = componentDef.events
		.map(({ name, type }) => {
			const eventVueModels = vueModels.filter((model) =>
				model.eventNames.includes(name)
			);
			return `'on${kebabToPascal(name)}': (event: ${renderEventType(
				type,
				false
			)}) => {
					 ${eventVueModels
							.map(
								(vueModel) =>
									`this.$emit('update:${vueModel.name}', ${vueModel.valueMapping});`
							)
							.join('\n')}
          this.$emit('${name}', event);
        }`;
		})
		.join(',');

	const slotsDeclarationSrc = isVue3Stub
		? `slots: Object as SlotsType<${
				componentDef.slots.length
					? `{
		${componentDef.slots
			.map(
				(slot) => `
		${renderJsDoc(slot.description)}
		"${slot.name}": Record<string, never>`
			)
			.join('\n')}
	}`
					: 'Record<string, never>'
		  }>,`
		: '';

	const renderNamedSlots = (syntax: 'vue2' | 'vue3') =>
		componentDef.slots
			.filter((slot) => slot.name !== 'default')
			.map(
				(slot) => `// @slot ${slot.name} ${slot.description ?? ''}
      ${syntax === 'vue2' ? 'handleNamedSlotV2' : 'handleNamedSlotV3'}('${
					slot.name
				}', this.$slots['${slot.name}']${syntax === 'vue3' ? ' as any' : ''})`
			)
			.join(',');

	const namedSlotsV2Src = renderNamedSlots('vue2');
	const namedSlotsV3Src = renderNamedSlots('vue3');

	if (namedSlotsV2Src) {
		imports.push({
			name: 'handleNamedSlotV2',
			fromModule: '../../utils/slots',
		});
	}

	if (namedSlotsV3Src) {
		imports.push({
			name: 'handleNamedSlotV3',
			fromModule: '../../utils/slots',
		});
	}

	const renderPropType = (type: TypeStr): string => {
		const propTypes = vuePropTypes(importedTypesResolver(type));
		return propTypes.length > 1 ? `[${propTypes.join(', ')}]` : propTypes[0];
	};

	/**
	 * Declare props.
	 * Note: All props are optional. Setting default to undefined, otherwise Vue 3 will default boolean props to false.
	 * myProp: {type: [String, Number] as PropType<string | number>, default: undefined},
	 * Note: When there are no props, props key needs to be omitted or the typings will break in Vue 3.
	 */
	const propDefinitionsSrc = props.length
		? `props: { ${props
				.flatMap((prop) => {
					const vueModel = componentDef.vueModels.find(
						(model) => model.propName === prop.name
					);

					return [
						prop,
						...(vueModel && vueModel.name !== prop.name
							? [
									{
										...prop,
										name: vueModel.name,
									},
							  ]
							: []),
					];
				})
				.map(({ name, description, type }) => {
					const propName = kebabToCamel(name);
					return `${renderJsDoc(description)}
        ${propName}: {type: ${renderPropType(
						type
					)} as PropType<${type}>, default: undefined}`;
				})
				.join(',\n')}
			},`
		: '';

	const renderEventDeclaration = ({
		name,
		description,
		type,
	}: ComponentDef['events'][number]) =>
		`
					${renderJsDoc(description, type)}
					'${name}'`;

	const renderEventDeclarationV3 =
		(isVueModelEvent: boolean) =>
		({ name, description, type }: ComponentDef['events'][number]) =>
			`
				${renderJsDoc(description, type)}
				['${name}'](event: ${renderEventType(type, isVueModelEvent)}) { return true }`;

	// Declare events
	const eventDefinitionsSrc = isVue3Stub
		? `{
			${[
				...componentDef.events.map(renderEventDeclarationV3(false)),
				...vueModelEvents.map(renderEventDeclarationV3(true)),
			].join(',\n')}}`
		: `[
			${[...componentDef.events, ...vueModelEvents]
				.map(renderEventDeclaration)
				.join(',\n')}]`;

	// For vue2, we rename v-model prop and event to the vue3 default names
	const vue2VModelSrc = vueModels.some((model) => model.name === 'modelValue')
		? `
  model: isVue2 ? {
    prop: 'modelValue',
    event: 'update:modelValue'
  } : undefined,`
		: '';

	// No need to render body for vue3 stubs, would run into type errors otherwise
	const renderMethodBody = isVue3Stub
		? 'return null;'
		: `
    if (isVue2) {
        return h(this.componentName, {
            ref: 'element',
            attrs: { ${attrsV2Src} },
            class: 'vvd-component',
            ${domPropsV2Src ? `domProps: { ${domPropsV2Src} },` : ''}
            on: { ${eventsSrc} },
        }, [
            this.$slots.default,
            ${namedSlotsV2Src}
        ]);
      }
      // @ts-ignore
      return h(this.componentName, {
          ref: 'element',
          class: 'vvd-component',
          ${[propsV3Src, eventsV3Src].filter(Boolean).join(',')}
      } as unknown as VNodeData, [
          // @ts-ignore
          this.$slots.default && this.$slots.default(),
          ${namedSlotsV3Src}
      ]);
    `;

	/**
	 * Forward methods like this:
	 * focus: (arg: string): void => {
	 *   this.element?.focus(arg);
	 * },
	 */
	const methodDefinitionsSrc = componentDef.methods
		.map(
			(method) =>
				`
        ${renderJsDoc(method.description)}
        ${method.name}(${method.args
					.map((a) => `${a.name}: ${a.type}`)
					.join(', ')}): ${method.returnType}{ return (this.element as any)?.${
					method.name
				}(${method.args.map((a) => a.name).join(', ')}); }`
		)
		.join(',\n');

	return `
${renderImports(imports)}
${renderImports(typeImports, true)}


${renderJsDoc(componentDef.description)}
export default defineComponent({
  name: '${wrappedComponentName(componentDef)}',
  ${vue2VModelSrc}
  ${propDefinitionsSrc}
  emits: ${eventDefinitionsSrc},
  methods: {
  	${methodDefinitionsSrc}
	},
	${slotsDeclarationSrc}
  setup(props, ctx) {
    const componentName = registerComponent('${componentDef.name}', ${
		componentDef.registerFunctionName
	});

    const element = ref<${getExportedClassName(
			componentDef.name
		)} | null>(null);

    return { componentName, element };
  },
  render() {
    ${renderMethodBody}
  },
});
`;
};
