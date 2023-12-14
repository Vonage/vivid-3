export type TypeRef = {
  text: string; // e.g. 'string', "'cta'", 'Date', 'HTMLElement'
  vuePropType: string; // For vue prop type checking, e.g. 'String', 'Number'
  importFromModule?: string;
  resolvedType?: TypeRef; // When importFromModule is used, this may contain the actual type
};
export type TypeUnion = TypeRef[];

export const isStringLiteral = (typeStr: string) => typeStr.match(/^['"].*['"]$/);
export const isNumberLiteral = (typeStr: string) => typeStr.match(/^-?[0-9]+$/);
export const isBooleanLiteral = (typeStr: string) => typeStr.match(/^true|false$/);

const vuePropTypeFor = (typeStr: string) => {
  if (isStringLiteral(typeStr)) {
    return 'String';
  }
  if (isNumberLiteral(typeStr)) {
    return 'Number';
  }
  if (isBooleanLiteral(typeStr)) {
    return 'Boolean';
  }

  switch (typeStr) {
    case 'string':
      return 'String';
    case 'number':
      return 'Number';
    case 'boolean':
      return 'Boolean';
    case 'string[]':
      return 'Array';
    case 'Date':
    case 'HTMLElement':
    case 'Event':
    case 'MouseEvent':
    case 'FocusEvent':
    case 'KeyboardEvent':
      return typeStr;
    case 'any':
    case 'unknown':
    case 'undefined':
    case 'null':
    case 'void':
      return 'null as unknown'; // will pass any validation
    default:
      throw new Error(`Unknown type ${typeStr}`);
  }
};

const resolveSingleType = (typeStr: string): TypeRef => ({ text: typeStr, vuePropType: vuePropTypeFor(typeStr) });

export const makeTypeResolver =
  (typeDefs: Record<string, TypeUnion>) =>
  (typeStr = 'unknown', isAttribute = false): TypeUnion => {
    let unionMembers = typeStr.split('|').map(t => t.trim());

    if (isAttribute) {
      // Remove null and optional, as all attributes are optional
      unionMembers = unionMembers.filter(t => t !== 'undefined' && t !== 'null');
    }

    return unionMembers.flatMap(t => {
      // Replace known type aliases with their underlying values
      // E.g. BadgeShape -> 'rounded' | 'pill'
      if (t in typeDefs) {
        return typeDefs[t];
      }

      return [resolveSingleType(t)];
    });
  };

export const withImportsResolved = (type: TypeRef[]) => type.flatMap(t => (t.resolvedType ? t.resolvedType : [t]));
