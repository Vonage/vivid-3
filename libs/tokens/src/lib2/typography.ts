import typographyTokens from '../typography.json';
import { kebabCase } from 'change-case';

for (const [name, token] of Object.entries(typographyTokens)) {
	if (token.$type !== 'typography') continue;

	const values = token.$value;
	const tokenName = kebabCase(name);
	const tokenValue = `${values.fontWeight} ${values.fontSize.value}px/${values.lineHeight}px ${values.fontFamily}`;
	const tokenEntry = `--vvd-${tokenName}: ${tokenValue};`;

	console.log(tokenEntry);
}

// Output:
// --vvd-heading-heading-4: Wide Medium 20px/1px Spezia;
// --vvd-body-base-extended: Regular 16px/2px Spezia;
// --vvd-body-base-extended-bold: SemiBold 16px/2px Spezia;
// --vvd-body-base-bold: SemiBold 14px/1px Spezia;
// --vvd-body-base-link: Regular 14px/1px Spezia;
