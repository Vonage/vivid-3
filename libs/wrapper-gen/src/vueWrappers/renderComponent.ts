import { ComponentDef } from '../common/ComponentDef';
import { kebabToCamel, kebabToPascal } from '../utils/casing';
import { parseTypeStr, TypeResolver, TypeStr } from '../common/types';
import { getImportPath } from '../metadata/vividPackage';
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

	const declaredEvents = [...componentDef.events];

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

	for (const vueModel of vueModels) {
		declaredEvents.push({
			name: `update:${vueModel.name}`,
			description: `Fires when the ${vueModel.name} value changes`,
			type: vueModel.prop.type,
		});
	}

	if (props.length > 0) {
		imports.push({ name: 'PropType', fromModule: vueModule });
	}

	const typeImports: Import[] = [
		{
			name: componentDef.className,
			fromModule: getImportPath(componentDef.vividModulePath),
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

	/**
	 * All events should be forwarded
	 */
	const eventsSrc = componentDef.events
		.map(({ name }) => {
			const eventVueModels = vueModels.filter((model) =>
				model.eventNames.includes(name)
			);
			return `'${name}': (event: Event) => {
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
		.map(({ name }) => {
			const eventVueModels = vueModels.filter((model) =>
				model.eventNames.includes(name)
			);
			return `'on${kebabToPascal(name)}': (event: Event) => {
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

	const namedSlotsSource = componentDef.slots
		.filter((slot) => slot.name !== 'default')
		.map(
			(slot) => `// @slot ${slot.name} ${slot.description ?? ''}
      handleNamedSlot('${slot.name}', this.$slots['${slot.name}'])`
		)
		.join(',');

	const slotsSrc = isVue3Stub
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

	if (namedSlotsSource)
		imports.push({ name: 'handleNamedSlot', fromModule: '../../utils/slots' });

	const renderPropType = (type: TypeStr): string => {
		const propTypes = vuePropTypes(importedTypesResolver(type));
		return propTypes.length > 1 ? `[${propTypes.join(', ')}]` : propTypes[0];
	};

	/**
	 * Declare props.
	 * Note: All props are optional. Setting default to undefined, otherwise Vue 3 will default boolean props to false.
	 * myProp: {type: [String, Number] as PropType<string | number>, default: undefined},
	 */
	const propDefinitionsSrc = props
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
		.join(',\n');

	const renderEventType = (type: TypeStr): string => {
		// Event type should be a single type like `CustomEvent<undefined>`
		if (parseTypeStr(type).length > 1) {
			throw new Error('Multiple event types not supported');
		}

		// The event target will always be the host component. Therefore, type target accordingly to make it easier
		// to use for consumers.
		return `${type} & { target: ${componentDef.className}}`;
	};

	// Declare events
	const eventDefinitionsSrc = isVue3Stub
		? `{
			${declaredEvents
				.map(
					({ name, description, type }) => `
						${renderJsDoc(description, type)}
						['${name}'](event: ${renderEventType(type)}) { return true }`
				)
				.join(',\n')}}`
		: `[
			${declaredEvents
				.map(
					({ name, description, type }) => `
						${renderJsDoc(description, type)}
							'${name}'`
				)
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
            ${namedSlotsSource}
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
          ${namedSlotsSource}
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
  props: {
    ${propDefinitionsSrc}
  },
  emits: ${eventDefinitionsSrc},
  methods: {
  	${methodDefinitionsSrc}
	},
	${slotsSrc}
  setup(props, ctx) {
    const componentName = registerComponent('${componentDef.name}', ${
		componentDef.registerFunctionName
	});

    const element = ref<${componentDef.className} | null>(null);

    return { componentName, element };
  },
  render() {
    ${renderMethodBody}
  },
});
`;
};
