import { ComponentDef } from './ComponentDef';
import { kebabToCamel, kebabToPascal } from './utils/casing';
import { TypeUnion } from './types';
import { getImportPath } from './vividPackage';

type Import = {
	name: string;
	fromModule: string;
};

const renderImports = (imports: Import[], typeImport = false) => {
	const importsFromModule = new Map<string, string[]>();
	for (const { name, fromModule } of imports) {
		if (!importsFromModule.has(fromModule)) {
			importsFromModule.set(fromModule, []);
		}
		importsFromModule.get(fromModule)!.push(name);
	}
	return Array.from(importsFromModule.entries())
		.map(
			([fromModule, names]) =>
				`import ${typeImport ? 'type ' : ''}{ ${names.join(
					', '
				)} } from '${fromModule}';`
		)
		.join('\n');
};

const renderJsDoc = (description?: string, type?: TypeUnion) => {
	if (!description && !type) return '';

	const renderedDescription = description
		? `\n${description
				.split('\n')
				.map((line) => ` * ${line}`)
				.join('\n')}`
		: '';

	const renderedType = type
		? `\n * @type {${type.map((t) => t.text).join(' | ')}}`
		: '';

	return `/**${renderedDescription}${renderedType}
 */`;
};

export const renderComponent = (
	componentDef: ComponentDef,
	isVue3Stub = false
) => {
	const vueModule = isVue3Stub ? 'vue3' : 'vue';

	const imports: Import[] = [
		{ name: 'defineComponent', fromModule: vueModule },
		{ name: 'ref', fromModule: vueModule },
		{ name: 'h', fromModule: vueModule },
		{ name: 'isVue2', fromModule: '../../utils/vue' },
		{ name: 'VNodeData', fromModule: vueModule },
		{ name: componentDef.registerFunctionName, fromModule: '@vonage/vivid' },
		{ name: 'registerComponent', fromModule: '../../utils/register' },
	];

	// Filter out attributes that are overshadowed by v-model name
	// E.g. start model mapping to current-start attribute will overshadow start attribute (initial value)
	const attributes = componentDef.attributes.filter(
		({ name }) =>
			!componentDef.vueModels.some(
				(model) => model.name === name && model.attributeName !== name
			)
	);

	const declaredEvents = [...componentDef.events];

	// Find v-models and their corresponding attribute and event
	const vueModels = componentDef.vueModels.map((model) => {
		const attribute = componentDef.attributes.find(
			(attr) => attr.name === model.attributeName
		);
		if (!attribute)
			throw new Error(`v-model attribute not found: ${model.attributeName}`);
		for (const eventName of model.eventNames) {
			const event = componentDef.events.find((e) => e.name === eventName);
			if (!event) throw new Error(`v-model event not found: ${eventName}`);
		}

		return {
			...model,
			attribute,
		};
	});

	for (const vueModel of vueModels) {
		declaredEvents.push({
			name: `update:${vueModel.name}`,
			description: `Fires when the ${vueModel.name} value changes`,
			type: vueModel.attribute.type,
		});
	}

	if (attributes.length > 0) {
		imports.push({ name: 'PropType', fromModule: vueModule });
	}

	const typeImports: Import[] = [
		{
			name: componentDef.className,
			fromModule: getImportPath(componentDef.vividModulePath),
		},
	];

	// Import referenced types
	const referencedTypes = [
		...attributes.map((prop) => prop.type),
		...componentDef.events.map((event) => event.type),
		...componentDef.methods.flatMap((method) =>
			method.args.map((arg) => arg.type)
		),
	].flat();
	for (const type of referencedTypes) {
		if (type.importFromModule) {
			imports.push({ name: type.text, fromModule: type.importFromModule });
		}
	}

	if (isVue3Stub) {
		typeImports.push({ name: 'SlotsType', fromModule: vueModule });
	}

	/**
	 * Forward all props to their respective attribute / dom property.
	 * In Vue 2, attributes and properties are under separate keys.
	 * In Vue 3, we need to prefix attributes with '^' and properties with '.' to differentiate them.
	 */
	const renderProps = (
		attributes: ComponentDef['attributes'],
		syntax: 'vue2' | 'vue3'
	) =>
		attributes
			.map(({ name, forwardTo }) => {
				const vueModel = componentDef.vueModels.find(
					(model) => model.attributeName === name
				);

				let valueToUse = `this.${kebabToCamel(name)}`;
				if (vueModel && vueModel.name !== kebabToCamel(name)) {
					// If there is a v-model, we will prefer the v-model value
					valueToUse = `this.${vueModel.name} ?? ${valueToUse}`;
				}

				const nameToUse =
					syntax === 'vue2'
						? forwardTo.name
						: forwardTo.type === 'attribute'
						? `^${forwardTo.name}`
						: `.${forwardTo.name}`;

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

				return `...(${filter} ? {'${nameToUse}': ${valueToUse} } : {})`;
			})
			.join(',');

	const propsV3Src = renderProps(attributes, 'vue3');

	const propsV2Src = renderProps(
		attributes.filter((a) => a.forwardTo.type === 'attribute'),
		'vue2'
	);
	const domPropsV2Src = renderProps(
		attributes.filter((a) => a.forwardTo.type === 'property'),
		'vue2'
	);

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

	const renderAttributeType = (type: TypeUnion): string => {
		const values = Array.from(new Set(type.map((t) => t.vuePropType)).values());
		return values.length > 1 ? `[${values.join(', ')}]` : (values[0] as string);
	};

	/**
	 * Declare props.
	 * Note: All props are optional. Setting default to undefined, otherwise Vue 3 will default boolean props to false.
	 * myProp: {type: [String, Number] as PropType<string | number>, default: undefined},
	 */
	const propDefinitionsSrc = attributes
		.flatMap((attr) => {
			const vueModel = componentDef.vueModels.find(
				(model) => model.attributeName === attr.name
			);

			return [
				attr,
				...(vueModel && vueModel.name !== kebabToCamel(attr.name)
					? [
							{
								...attr,
								name: vueModel.name,
							},
					  ]
					: []),
			];
		})
		.map(({ name, description, type }) => {
			const propName = kebabToCamel(name);
			return `${renderJsDoc(description)}
        ${propName}: {type: ${renderAttributeType(type)} as PropType<${type
				.map((t) => t.text)
				.join(' | ')}>, default: undefined}`;
		})
		.join(',\n');

	const renderEventType = (type: TypeUnion): string => {
		// Event type should be a single type like `CustomEvent<undefined>`
		if (type.length > 1) {
			throw new Error('Multiple event types not supported');
		}

		// The event target will always be the host component. Therefore, type target accordingly to make it easier
		// to use for consumers.
		return `${type[0].text} & { target: ${componentDef.className}}`;
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
            attrs: { ${propsV2Src} },
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
					.map((a) => `${a.name}: ${a.type.map((t) => t.text).join(' | ')}`)
					.join(', ')}): ${method.returnType
					.map((t) => t.text)
					.join(' | ')} { return (this.element as any)?.${
					method.name
				}(${method.args.map((a) => a.name).join(', ')}); }`
		)
		.join(',\n');

	return `
${renderImports(imports)}
${renderImports(typeImports, true)}


${renderJsDoc(componentDef.description)}
export default defineComponent({
  name: '${componentDef.wrappedClassName}',
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
