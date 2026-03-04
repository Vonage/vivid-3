/**
 * Extracted information about a type.
 * `type` is the structure of the resolved type, e.g. `{ value: string }`.
 * `typeNode` is the AST level structure of the declared type, e.g. `Container<string>`
 */
export type ExtractedType = { type: TypeStructure; typeNode?: NodeId };

export type NodeId = string;

export type SymbolStructure = {
	kind: 'Symbol';
	name: string;
	declarations: NodeId[];
};

export type NodeStructure =
	/** Node outside of project */
	| { kind: 'ExternalNode'; file: string }
	/** Special cased handling for classes that are components */
	| { kind: 'ComponentClass'; componentName: string }
	| {
			kind: 'Class';
			members: NodeId[];
			type: TypeStructure;
	  }
	| {
			kind: 'Property';
			name: string;
			typeNode?: NodeId;
			type: TypeStructure;
	  }
	| {
			kind: 'Method';
			name: string;
			parameters: NodeId[];
			returnTypeNode?: NodeId;
			returnType: TypeStructure;
			typeParameters: NodeId[];
	  }
	| {
			kind: 'Parameter';
			name: string;
			typeNode?: NodeId;
			type: TypeStructure;
			isOptional: boolean;
	  }
	| {
			kind: 'GetAccessor';
			name: string;
			returnTypeNode?: NodeId;
			returnType: TypeStructure;
			typeParameters: NodeId[];
	  }
	| {
			kind: 'SetAccessor';
			name: string;
			type: TypeStructure;
	  }
	| {
			kind: 'VariableDeclaration';
			name: string;
			typeNode?: NodeId;
			type: TypeStructure;
	  }
	| {
			kind: 'TypeReference';
			typeName: NodeId;
			typeArguments: NodeId[];
	  }
	| {
			kind: 'Identifier';
			definitionNodes: NodeId[];
			symbol: SymbolStructure;
	  }
	/** e.g. `type X = Y` */
	| {
			kind: 'TypeAlias';
			name: string;
			typeNode: NodeId;
			typeParameters: NodeId[];
			type: TypeStructure;
	  }
	| {
			kind: 'InterfaceDeclaration';
			name: string;
			members: NodeId[];
			typeParameters: NodeId[];
			extends: NodeId[];
	  }
	/** e.g. `{ a: string }` */
	| { kind: 'TypeLiteral'; members: NodeId[] }
	| {
			kind: 'ImportSpecifier';
			name: string;
			alias?: string;
			fromModule: string;
			definitionNodes: NodeId[];
	  }
	/** An import from a module outside the project */
	| {
			kind: 'ExternalImportSpecifier';
			name: string;
			alias?: string;
			fromModule: string;
	  }
	/** An export like: `export { X } from '...'` or `export { X }` */
	| {
			kind: 'ExportSpecifier';
			name: string;
			alias?: string;
			fromModule?: string;
			targetSymbol?: SymbolStructure;
	  }
	/** Reexport from a module outside the package */
	| {
			kind: 'ExternalExportSpecifier';
			name: string;
			alias?: string;
			fromModule: string;
	  }
	| {
			kind: 'Keyword';
			name:
				| 'string'
				| 'number'
				| 'boolean'
				| 'undefined'
				| 'any'
				| 'never'
				| 'unknown'
				| 'void';
	  }
	| {
			kind: 'Literal';
			value: string | number | boolean | null;
	  }
	| { kind: 'UnionType'; typeNodes: NodeId[]; type: TypeStructure }
	/** Something like `X.Y` where X is a namespace / enum */
	| {
			kind: 'QualifiedName';
			left: NodeId;
			right: string;
			type: TypeStructure;
	  }
	/** Note that this only captures array types declared with the `T[]` syntax, not `Array<T>`. */
	| { kind: 'ArrayType'; elementTypeNode: NodeId; type: TypeStructure }
	| { kind: 'NotImplemented'; kindName: string; src: string };

export type TypeStructure =
	/** A literal type like "'str'" or "5" or "true" */
	| { kind: 'literal'; value: string }
	/** A primitive type like string/number/boolean/undefined */
	| { kind: 'primitive'; name: string }
	| { kind: 'union'; types: TypeStructure[] }
	| { kind: 'intersection'; types: TypeStructure[] }
	| { kind: 'array'; elementType: TypeStructure }
	| {
			kind: 'object';
			symbol?: SymbolStructure;
			typeArguments: TypeStructure[];
			properties: PropertyTypeStructure[];
	  }
	| {
			kind: 'callable';
			signatures: SignatureTypeStructure[];
	  }
	/** If type is a reference to an external module. E.g. `ViewTemplate<X>` */
	| {
			kind: 'external';
			name: string;
			fromModule: string;
			typeArguments: TypeStructure[];
	  }
	/** If type is a reference to an external module but wasn't imported. Most likely a builtin type, e.g. `Array<X>` or `HTMLElement` */
	| {
			kind: 'ambient';
			symbol: SymbolStructure;
			typeArguments: TypeStructure[];
	  }
	/** Special cased handling components */
	| { kind: 'component'; symbol: SymbolStructure }

	/** The type references itself recursively. */
	| {
			kind: 'recursive';
			text: string;
	  }
	| { kind: 'not-implemented'; text: string };

export type PropertyTypeStructure = {
	name: string;
	isOptional: boolean;
	type: TypeStructure;
	declarations: NodeId[];
};

type SignatureTypeStructure = {
	declaration: NodeId;
	parameters: ParameterTypeStructure[];
	returnType: TypeStructure;
	typeParameters: TypeStructure[];
};

type ParameterTypeStructure = { name: string; type: TypeStructure };
