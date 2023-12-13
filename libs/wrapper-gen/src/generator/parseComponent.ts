import { ClassMember, ClassMethod } from 'custom-elements-manifest';
import { ComponentDef } from './ComponentDef';
import { kebabToPascal } from './utils/casing';
import { extractLocalTypeDefs } from './extractLocalTypeDefs';
import { getAttributeName, getVividComponentDeclaration } from './customElementDeclarations';
import { makeTypeResolver } from './types';
import { globalTypeDefs } from './globalTypeDefs';

export const parseComponent = (name: string): ComponentDef => {
  let className = kebabToPascal(name);
  if (className === 'Option') className = 'ListboxOption'; // Handle inconsistent naming

  const declaration = getVividComponentDeclaration(name, className);

  const localTypeDefs = extractLocalTypeDefs(name, declaration._modulePath);
  const resolveLocalType = makeTypeResolver({
    ...globalTypeDefs,
    ...localTypeDefs,
  });

  const attributes: ComponentDef['attributes'] = (declaration.attributes ?? []).map(attribute => {
    if (!attribute.type) {
      throw new Error(`Attribute type is missing: ${attribute}`);
    }

    return {
      name: getAttributeName(attribute),
      description: attribute.description,
      type: resolveLocalType(attribute.type.text, true),
    };
  });

  const isClassMethod = (m: ClassMember): m is ClassMethod =>
    m.kind === 'method' &&
    (m.privacy === undefined || m.privacy === 'public') &&
    (m.static === undefined || !m.static) &&
    !m.name.startsWith('#');
  const methods: ComponentDef['methods'] = (declaration.members ?? []).filter(isClassMethod).map(m => ({
    name: m.name,
    description: m.description,
    args: (m.parameters ?? []).map((p, index) => {
      let paramName = p.name;

      // Handle parameters without a proper name like '{ key }'
      if (paramName.startsWith('{')) {
        paramName = `_arg${index}`;
      }

      return {
        name: paramName,
        type: resolveLocalType(p.type?.text),
      };
    }),
    returnType: resolveLocalType(m.return?.type.text ?? 'unknown'),
  }));

  const events: ComponentDef['events'] = (declaration.events ?? []).map(e => ({
    name: e.name,
    description: e.description,
    type: resolveLocalType(e.type?.text),
  }));

  const slots: ComponentDef['slots'] = (declaration.slots ?? []).map(s => ({
    name: s.name || 'default',
    description: s.description,
  }));

  // Assume that the register function is named after the component directory
  // e.g. libs/components/src/lib/data-grid/data-grid-cell.ts is registered by registerDataGrid
  const componentDirName = declaration._modulePath.split('/').slice(-2)[0];
  const registerFunctionName = `register${kebabToPascal(componentDirName)}`;

  return {
    name,
    className,
    wrappedClassName: `V${kebabToPascal(name)}`,
    vividModulePath: declaration._modulePath,
    registerFunctionName,
    description: declaration.description,
    attributes,
    events,
    vueModels: [],
    methods,
    slots,
    localTypeDefs,
  };
};
