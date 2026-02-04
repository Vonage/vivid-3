import { ComponentDef } from '../common/ComponentDef';
import { kebabToCamel, kebabToPascal } from '../utils/casing';
import { parseTypeStr, TypeResolver, TypeStr } from '../common/types';
import { getExportedClassName } from '../metadata/vividPackage';
import { vuePropTypes } from './vuePropTypes';
import { wrappedComponentName } from './name';
import { determinePropForwarding } from './propForwarding';
import { Import, importsForTypes, renderImports } from './imports';
import { getEventType } from './types';
import { renderJsDoc } from './jsDoc';
import { resolveVueModels } from './vueModels';

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

	const typeImports: Import[] = [
		{
			name: getExportedClassName(componentDef.name),
			fromModule: '@vonage/vivid',
		},
	];

	const { props, vueModels, vueModelEvents } = resolveVueModels(componentDef);

	if (props.length > 0) {
		imports.push({ name: 'PropType', fromModule: vueModule });
	}

	// Import referenced types
	const referencesTypes = [
		...props.map((prop) => prop.type),
		...componentDef.events.map((event) => event.type),
		...componentDef.methods.flatMap((method) =>
			method.args.map((arg) => arg.type)
		),
		...componentDef.slots.flatMap((slot) =>
			slot.dynamicProps ? [slot.dynamicProps] : []
		),
	].flatMap(parseTypeStr);
	imports.push(...importsForTypes(referencesTypes));

	if (isVue3Stub) {
		typeImports.push({ name: 'SlotsType', fromModule: vueModule });
	}

	const hasScopedSlots = componentDef.slots.some((slot) => slot.dynamicProps);

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
	 * All events should be forwarded. If there are scoped slots, we also need to handle slottable-request events.
	 */
	const additionEventHandlersV2 = [];
	const additionEventHandlersV3 = [];

	if (hasScopedSlots) {
		typeImports.push({
			name: 'SlottableRequestEvent',
			fromModule: '../../utils/slottableRequest',
		});
		imports.push({
			name: 'isRemoveRequest',
			fromModule: '../../utils/slottableRequest',
		});

		additionEventHandlersV2.push(`'slottable-request': (event: SlottableRequestEvent) => {
		if (isRemoveRequest(event.data)) {
			this.slottableRequests.delete(event.slotName);
		} else {
			this.slottableRequests.set(event.slotName, { name: event.name, data: event.data });
		}
		this.$forceUpdate();
	}`);

		additionEventHandlersV3.push(`'onSlottable-request': (event: SlottableRequestEvent) => {
		if (isRemoveRequest(event.data)) {
			this.slottableRequests.delete(event.slotName);
		} else {
			this.slottableRequests.set(event.slotName, { name: event.name, data: event.data });
		}
	}`);
	}

	const eventsSrc = [
		...componentDef.events.map(({ name, type }) => {
			const eventVueModels = vueModels.filter((model) =>
				model.eventNames.includes(name)
			);
			return `'${name}': (event: ${getEventType(
				type,
				getExportedClassName(componentDef.name),
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
		}),
		...additionEventHandlersV2,
	].join(',');

	const eventsV3Src = [
		...componentDef.events.map(({ name, type }) => {
			const eventVueModels = vueModels.filter((model) =>
				model.eventNames.includes(name)
			);
			return `'on${kebabToPascal(name)}': (event: ${getEventType(
				type,
				getExportedClassName(componentDef.name),
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
		}),
		...additionEventHandlersV3,
	].join(',');

	const slotsDeclarationSrc = isVue3Stub
		? `slots: Object as SlotsType<${
				componentDef.slots.length
					? `{
		${componentDef.slots
			.map(
				(slot) => `
		${renderJsDoc(slot.description)}
		"${slot.name}": ${slot.dynamicProps ?? 'Record<string, never>'}`
			)
			.join('\n')}
	}`
					: 'Record<string, never>'
		  }>,`
		: '';

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
				['${name}'](event: ${getEventType(
				type,
				getExportedClassName(componentDef.name),
				isVueModelEvent
			)}) { return true }`;

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

	const namedSlots = componentDef.slots.filter(
		(slot) => slot.name !== 'default' && !slot.dynamicProps
	);
	const renderNamedSlots = (syntax: 'vue2' | 'vue3') =>
		namedSlots
			.map(
				(slot) => `// @slot ${slot.name} ${slot.description ?? ''}
      ${
				syntax === 'vue2'
					? `handleNamedSlotV2('${slot.name}', this.$slots['${slot.name}'])`
					: `handleNamedSlotV3('${slot.name}', (this.$slots['${slot.name}'] as any)?.())`
			}`
			)
			.join(',');

	if (namedSlots || hasScopedSlots) {
		imports.push({
			name: 'handleNamedSlotV2',
			fromModule: '../../utils/slots',
		});
		imports.push({
			name: 'handleNamedSlotV3',
			fromModule: '../../utils/slots',
		});
	}

	const slotsV2 = ['this.$slots.default'];
	const slotsV3 = [
		`// @ts-ignore
		this.$slots.default?.()`,
	];

	if (namedSlots) {
		slotsV2.push(renderNamedSlots('vue2'));
		slotsV3.push(renderNamedSlots('vue3'));
	}
	if (hasScopedSlots) {
		slotsV2.push(`...Array.from(this.slottableRequests.entries()).flatMap(
				([slotName, { name, data }]) =>
					handleNamedSlotV2(slotName, this.$scopedSlots[name]?.(data)) ?? []
			)`);
		slotsV3.push(`...Array.from(this.slottableRequests.entries()).flatMap(
				([slotName, { name, data }]) =>
					// @ts-ignore
					handleNamedSlotV3(slotName, this.$slots[name]?.(data)) ?? []
			)`);
	}

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
					${slotsV2.join(',\n')}
        ]);
      }
      // @ts-ignore
      return h(this.componentName, {
          ref: 'element',
          class: 'vvd-component',
          ${[propsV3Src, eventsV3Src].filter(Boolean).join(',')}
      } as unknown as VNodeData, [
          ${slotsV3.join(',\n')}
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

		${
			hasScopedSlots
				? `const slottableRequests = ref(new Map<string, { name: string; data: unknown }>());`
				: ''
		}

    return { componentName, element ${
			hasScopedSlots ? `, slottableRequests` : ''
		} };
  },
  render() {
    ${renderMethodBody}
  },
});
`;
};
