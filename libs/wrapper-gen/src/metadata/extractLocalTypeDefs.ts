// Importing from '@vonage/vivid' requires a DOM
import './polyfill/dom';

import * as fs from 'fs';
import {
	Appearance,
	AriaLive,
	Connotation,
	LayoutSize,
	Position,
	Shape,
	Size,
} from '@vonage/vivid';
import { toTypeStr, TypeStr } from '../common/types';
import { getTypescriptDefinitionPath } from './vividPackage';

export const extractLocalTypeDefs = (
	className: string,
	modulePath: string
): Record<string, TypeStr> => {
	const src = fs.readFileSync(getTypescriptDefinitionPath(modulePath), 'utf8');
	const lines = src.split('\n');

	const localTypeDefs: Record<string, TypeStr> = {};

	/**
	 * Extract type aliases for common enum subsets like this:
	 * export declare type BadgeShape = ExtractFromEnum<Shape, Shape.Rounded | Shape.Pill>;
	 */
	const enums: Record<string, Record<string, string>> = {
		Connotation,
		Shape,
		Appearance,
		Size,
		LayoutSize,
		Position,
		AriaLive,
	};
	for (const [enumName, enumObj] of Object.entries(enums)) {
		let typeName = `${className}${enumName}`;

		// Handle irregular naming
		if (typeName === 'FabSize') typeName = 'FABSize';

		for (const line of lines) {
			if (line.includes(`type ${typeName}`)) {
				// extract individual values like 'Connotation.Information' with regex
				const enumValuesReferenced =
					line.match(new RegExp(`${enumName}(Decorative)?\\.[A-Za-z]+`, 'g')) ??
					[];

				const stringLiterals = enumValuesReferenced.map(
					(enumValueReferenced) => {
						// Special case for ConnotationDecorative, which is not part of Connotation:
						// e.g. export declare type ProgressConnotation = Connotation.Accent | ConnotationDecorative.Pacific;
						if (enumValueReferenced === `ConnotationDecorative.Pacific`)
							return `'pacific'`;

						// e.g. 'Connotation.Information' -> 'Information'
						const valueName = enumValueReferenced.replace(`${enumName}.`, '');
						if (!(valueName in enumObj)) {
							throw new Error(
								`Enum value ${valueName} not found in ${enumName}`
							);
						}
						// Turn into string literal: 'Information' -> "'information'"
						return `'${enumObj[valueName]}'`;
					}
				);

				localTypeDefs[typeName] = toTypeStr(stringLiterals);
			}
		}
	}

	return localTypeDefs;
};
