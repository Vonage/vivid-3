import type {
	TokenTypeName,
	WithAliasValue,
} from 'design-tokens-format-module';
import type { TokenSignature } from 'design-tokens-format-module';
import {
	Border,
	Color,
	CubicBezier,
	Dimension,
	Duration,
	FontFamily,
	FontWeight,
	Gradient,
	Number,
	Shadow,
	StrokeStyle,
	Transition,
	Typography,
} from 'design-tokens-format-module/dist/definitions/tokenTypes';

declare module '*.module.css' {
	const classes: Record<string, string>;
	export default classes;
}

declare module 'design-tokens-format-module' {
	declare const stringTypeName = 'string';
	declare namespace String {
		type TypeName = typeof stringTypeName;
		type RawValue = string;
		type Value = WithAliasValue<String.RawValue>;
		type Token = TokenSignature<String.TypeName, String.Value>;
	}

	declare const booleanTypeName = 'boolean';
	declare namespace Boolean {
		type TypeName = typeof booleanTypeName;
		type RawValue = boolean | string;
		type Value = WithAliasValue<Boolean.RawValue>;
		type Token = TokenSignature<Boolean.TypeName, Boolean.Value>;
	}

	export declare const tokenTypeNames: readonly [
		'color',
		'dimension',
		'fontFamily',
		'fontWeight',
		'duration',
		'cubicBezier',
		'number',
		'strokeStyle',
		'border',
		'transition',
		'shadow',
		'gradient',
		'typography',
		'string',
		'boolean',
	];
	export declare const tokenTypeNamesMapping: {
		number: 'number';
		color: 'color';
		dimension: 'dimension';
		fontFamily: 'fontFamily';
		fontWeight: 'fontWeight';
		duration: 'duration';
		cubicBezier: 'cubicBezier';
		strokeStyle: 'strokeStyle';
		border: 'border';
		transition: 'transition';
		shadow: 'shadow';
		gradient: 'gradient';
		typography: 'typography';
		string: 'string';
		boolean: 'boolean';
	};
	export type TokenTypeName =
		| Color.TypeName
		| Dimension.TypeName
		| FontFamily.TypeName
		| FontWeight.TypeName
		| Duration.TypeName
		| CubicBezier.TypeName
		| Number.TypeName
		| StrokeStyle.TypeName
		| Border.TypeName
		| Transition.TypeName
		| Shadow.TypeName
		| Gradient.TypeName
		| Typography.TypeName
		| String.TypeName
		| Boolean.TypeName;
	export type DesignToken =
		| Color.Token
		| Dimension.Token
		| FontFamily.Token
		| FontWeight.Token
		| Duration.Token
		| CubicBezier.Token
		| Number.Token
		| StrokeStyle.Token
		| Border.Token
		| Transition.Token
		| Shadow.Token
		| Gradient.Token
		| Typography.Token
		| String.Token
		| Boolean.Token;
	export type PickTokenByType<T extends TokenTypeName> = {
		color: Color.Token;
		dimension: Dimension.Token;
		fontFamily: FontFamily.Token;
		fontWeight: FontWeight.Token;
		duration: Duration.Token;
		cubicBezier: CubicBezier.Token;
		number: Number.Token;
		strokeStyle: StrokeStyle.Token;
		border: Border.Token;
		transition: Transition.Token;
		shadow: Shadow.Token;
		gradient: Gradient.Token;
		typography: Typography.Token;
		string: String.Token;
		boolean: Boolean.Token;
	}[T];
}
