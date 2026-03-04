import {
	isBooleanLiteral,
	isNumberLiteral,
	isStringLiteral,
} from '../common/types';
import { TypeUnion } from '@repo/metadata-extractor/metadata/type-str';

/**
 * DOM attributes can only be strings, therefore complex data (e.g. HTMLElement) needs to be passed as props.
 * We can determine this by type.
 */
const canBePassedAsAttribute = (type: TypeUnion) => {
	return type.every(
		(t) =>
			t === 'string' ||
			t === 'number' ||
			t === 'boolean' ||
			isStringLiteral(t) ||
			isNumberLiteral(t) ||
			isBooleanLiteral(t)
	);
};

type ForwardTo =
	| {
			type: 'attribute';
			name: string;
			boolean: boolean;
	  }
	| {
			type: 'property';
			name: string;
	  };

export const determinePropForwarding = (
	prop: {
		propertyName?: string;
		attributeName?: string;
	},
	resolvedType: TypeUnion
): ForwardTo => {
	if (prop.attributeName && canBePassedAsAttribute(resolvedType)) {
		return {
			type: 'attribute',
			name: prop.attributeName,
			boolean: resolvedType.some((t) => t === 'boolean'),
		};
	} else if (prop.propertyName) {
		return {
			type: 'property',
			name: prop.propertyName,
		};
	} else {
		throw new Error(
			`Cannot determine forwarding type: ${JSON.stringify(prop)}`
		);
	}
};
