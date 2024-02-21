import { ComponentDef } from './ComponentDef';
import { kebabToCamel, kebabToPascal } from './utils/casing';
import { isBooleanLiteral, isNumberLiteral, isStringLiteral, TypeUnion, withImportsResolved } from './types';
import { getImportPath } from './vividPackage';

type Import = {
  name: string;
  as?: string;
  fromModule: string;
};

const renderImports = (imports: Import[], typeImport = false) => {
  const importsFromModule = new Map<string, string[]>();
  for (const { name, as, fromModule } of imports) {
    if (!importsFromModule.has(fromModule)) {
      importsFromModule.set(fromModule, []);
    }
    importsFromModule.get(fromModule)?.push(as ? `${name} as ${as}` : name);
  }
  return Array.from(importsFromModule.entries())
    .map(([fromModule, names]) => `import ${typeImport ? 'type ' : ''}{ ${names.join(', ')} } from '${fromModule}';`)
    .join('\n');
};

const renderJsDoc = (description?: string, type?: TypeUnion) => {
  if (!description && !type) return '';

  const renderedDescription = description
    ? `\n${description
        .split('\n')
        .map(line => ` * ${line}`)
        .join('\n')}`
    : '';

  const renderedType = type ? `\n * @type {${type.map(t => t.text).join(' | ')}}` : '';

  return `/**${renderedDescription}${renderedType}
 */`;
};

export const renderComponent = (componentDef: ComponentDef, isVue3Stub = false) => {
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
	const attributes = componentDef.attributes.filter(
		({ name }) =>
			!componentDef.vueModels.some(
				(model) => model.name === name && model.attributeName !== name
			)
	);

	if (attributes.length > 0) {
		imports.push({ name: 'PropType', fromModule: vueModule });
	}

  const typeImports: Import[] = [
    { name: componentDef.className, fromModule: getImportPath(componentDef.vividModulePath) },
  ];

  // Import referenced types
  const referencedTypes = [
    ...attributes.map(prop => prop.type),
    ...componentDef.events.map(event => event.type),
    ...componentDef.methods.flatMap(method => method.args.map(arg => arg.type)),
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
   * All props should be forwarded.
   * Vue requires us to filter out undefined properties
   * before passing them into the h function
   */
  const renderProps = attributes =>
    attributes
      .map(({ name }) => {
        const vueModel = componentDef.vueModels.find(model => model.attributeName === name);
        return vueModel
          ? `...(this.${vueModel.name} !== undefined ? {'${name}': this.${vueModel.name} } : {})`
          : `...(this.${kebabToCamel(name)} !== undefined ? {'${name}': this.${kebabToCamel(name)} } : {})`;
      })
      .join(',');
  const propsV3Src = renderProps(attributes);

  /**
   * DOM attributes can only be strings, therefore complex data (e.g. HTMLElement) needs to be passed as props.
   * While Vue 3 handles this for us, in Vue 2 we need to figure out which attributes should be passed as props.
   */
  const canBePassedAsAttribute = (type: TypeUnion) =>
    withImportsResolved(type).every(
      t =>
        t.text === 'string' ||
        t.text === 'number' ||
        t.text === 'boolean' ||
        isStringLiteral(t.text) ||
        isNumberLiteral(t.text) ||
        isBooleanLiteral(t.text) ||
        // If unknown, default to attribute
        t.text === 'any' ||
        t.text === 'unknown'
    );
  const propsV2Src = renderProps(attributes.filter(prop => canBePassedAsAttribute(prop.type)));
  const domPropsV2Src = renderProps(attributes.filter(prop => !canBePassedAsAttribute(prop.type)));

  /**
   * All events should be forwarded
   */
  const eventsSrc = componentDef.events
    .map(({ name }) => {
      const vueModel = componentDef.vueModels.find(model => model.eventName === name);
      return vueModel
        ? `'${name}': (event: Event) => {
          this.$emit('update:${vueModel.name}', ${vueModel.valueMapping});
          this.$emit('${name}', event);
        }`
        : `'${name}': (event: Event) => this.$emit('${name}', event)`;
    })
    .join(',');

  const eventsV3Src = componentDef.events
    .map(({ name }) => {
      const vueModel = componentDef.vueModels.find(model => model.eventName === name);
      return vueModel
        ? `'on${kebabToPascal(name)}': (event: Event) => {
          this.$emit('update:${vueModel.name}', ${vueModel.valueMapping});
          this.$emit('${name}', event);
        }`
        : `'on${kebabToPascal(name)}': (event: Event) => this.$emit('${name}', event)`;
    })
    .join(',');

  const namedSlotsSource = componentDef.slots
    .filter(slot => slot.name !== 'default')
    .map(
      slot => `// @slot ${slot.name} ${slot.description ?? ''}
      handleNamedSlot('${slot.name}', this.$slots['${slot.name}'])`
    )
    .join(',');

	const slotsSrc = isVue3Stub ? `slots: Object as SlotsType<${componentDef.slots.length ? `{
		${componentDef.slots.map(slot => `
		${renderJsDoc(slot.description)}
		"${slot.name}": Record<string, never>`).join('\n')}
	}` : 'Record<string, never>'}>,` : '';

  if (namedSlotsSource) imports.push({ name: 'handleNamedSlot', fromModule: '../../utils/slots' });

  const renderAttributeType = (type: TypeUnion): string => {
    const values = Array.from(new Set(type.map(t => t.vuePropType)).values());
    return values.length > 1 ? `[${values.join(', ')}]` : (values[0] as string);
  };

  /**
   * Declare props.
   * Note: All props are optional. Setting default to undefined, otherwise Vue 3 will default boolean props to false.
   * myProp: {type: [String, Number] as PropType<string | number>, default: undefined},
   */
  const propDefinitionsSrc = attributes
    .map(({ name, description, type }) => {
      const vueModel = componentDef.vueModels.find(model => model.attributeName === name);
      const propName = vueModel ? vueModel.name : kebabToCamel(name);
      return `${renderJsDoc(description)}
        ${propName}: {type: ${renderAttributeType(type)} as PropType<${type
        .map(t => t.text)
        .join(' | ')}>, default: undefined}`;
    })
    .join(',\n');

  // Declare events
  const eventDefs = componentDef.events;
  for (const vueModel of componentDef.vueModels) {
    const modelEvent = componentDef.events.find(e => e.name === vueModel.eventName);
    const modelAttr = attributes.find(a => a.name === vueModel.attributeName);
    if (!modelEvent) throw new Error('v-model event not found');
    if (!modelAttr) throw new Error('v-model attribute not found');

    eventDefs.push({
      name: `update:${vueModel.name}`,
      description: modelEvent.description,
      type: modelAttr.type,
    });
  }
  const eventDefinitionsSrc = eventDefs
    .map(
      ({ name, description, type }) => `
        ${renderJsDoc(description, type)}
        '${name}'`
    )
    .join(',\n');

  for (const vueModel of componentDef.vueModels) {
    // Ensure v-model attribute and event are present on the component
    if (!attributes.some(attr => attr.name === vueModel.attributeName)) {
      throw new Error(
        `v-model attribute ${vueModel.attributeName} not found in attributes for component ${componentDef.name}`
      );
    }
    if (!componentDef.events.some(event => event.name === vueModel.eventName)) {
      throw new Error(`v-model event ${vueModel.eventName} not found in events for component ${componentDef.name}`);
    }
  }

  // For vue2, we rename v-model prop and event to the vue3 default names
  const vue2VModelSrc = componentDef.vueModels.some(model => model.name === 'modelValue')
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
      method =>
        `
        ${renderJsDoc(method.description)}
        ${method.name}(${method.args
          .map(a => `${a.name}: ${a.type.map(t => t.text).join(' | ')}`)
          .join(', ')}): ${method.returnType.map(t => t.text).join(' | ')} { return (this.element as any)?.${
          method.name
        }(${method.args.map(a => a.name).join(', ')}); }`
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
  emits: [
    ${eventDefinitionsSrc}
  ],
  methods: {
  	${methodDefinitionsSrc}
	},
	${slotsSrc}
  setup(props, ctx) {
    const componentName = registerComponent('${componentDef.name}', ${componentDef.registerFunctionName});

    const element = ref<${componentDef.className} | null>(null);

    return { componentName, element };
  },
  render() {
    ${renderMethodBody}
  },
});
`;
};
