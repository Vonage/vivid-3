import { ComponentDef } from './ComponentDef';
import { camelToPascal, kebabToCamel, kebabToPascal } from './utils/casing';
import { isNumberLiteral, isStringLiteral, TypeUnion, withImportsResolved } from './types';

const isBasicString = (type: TypeUnion) => type.length === 1 && type[0].text === 'string';
const isBasicNumber = (type: TypeUnion) => type.length === 1 && type[0].text === 'number';
const isBasicBoolean = (type: TypeUnion) => type.length === 1 && type[0].text === 'boolean';
const isLiteralUnion = (type: TypeUnion) => type.every(t => isStringLiteral(t.text) || isNumberLiteral(t.text));

const renderArgType = (attr: ComponentDef['attributes'][0]) => {
  const type = withImportsResolved(attr.type);

  if (isBasicString(type)) {
    return `{ type: { name: 'string', required: false }, control: 'text' }`;
  }
  if (isBasicNumber(type)) {
    return `{ type: { name: 'number', required: false }, control: { type: 'number' } }`;
  }
  if (isBasicBoolean(type)) {
    return `{ type: { name: 'boolean', required: false }, control: 'boolean' }`;
  }
  if (isLiteralUnion(type)) {
    return `{ type: { name: 'string', required: false }, control: 'select', options: [${type
      .map(t => t.text)
      .join(', ')}]}`;
  }
  return `{ type: { name: 'object', required: false } }`;
};

export const renderStorybookTemplate = (def: ComponentDef) => {
  const propName = (attribute: string) => {
    const vueModel = def.vueModels.find(vm => vm.attributeName === attribute);
    return vueModel ? vueModel.name : kebabToCamel(attribute);
  };
  const eventHandlerName = (event: string) => {
    const vueModel = def.vueModels.find(vm => vm.eventName === event);
    return vueModel ? `onUpdate${camelToPascal(vueModel.name)}` : `on${kebabToPascal(event.replaceAll(':', '-'))}`;
  };
  const eventName = (event: string) => {
    const vueModel = def.vueModels.find(vm => vm.eventName === event);
    return vueModel ? `update:${vueModel.name}` : event;
  };

  const argTypesSrc = def.attributes.map(attr => `${propName(attr.name)}: ${renderArgType(attr)},`).join('\n');

  const eventsSrc = def.events
    .map(event => `${eventHandlerName(event.name)}: { action: '${eventName(event.name)}' },`)
    .join('\n');
  const eventListSrc = def.events.map(event => `${eventHandlerName(event.name)}, `).join('');
  const eventBindingsSrc = def.events
    .map(event => `@${eventName(event.name)}="${eventHandlerName(event.name)}"`)
    .join(' ');

  return `import { ${def.wrappedClassName} } from '@vonage/vivid-vue';

export const argTypes = {
  ${argTypesSrc}
  ${eventsSrc}
};

export const Template = args => ({
  components: { ${def.wrappedClassName} },
  setup() {
    const { ${eventListSrc} ...props } = args;
    return { ${eventListSrc} props };
  },
  template: '<${def.wrappedClassName} v-bind="props" ${eventBindingsSrc} />',
});
`;
};
