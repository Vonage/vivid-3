import colorTokens from '../colors.json';
import { kebabCase } from 'change-case';

for (const [name, token] of Object.entries(colorTokens)) {
	if (token.$type !== 'color') continue;

	const hexColor = token.$value;
	const tokenName = kebabCase(name);

	const tokenEntry = `--vvd-${tokenName}: ${hexColor};`;

	console.log(tokenEntry);
}

// Output:
// --vvd-neutral-400: #929292ff;
// --vvd-neutral-500: #757575ff;
// --vvd-accent-50: #f2f2f2ff;
// --vvd-accent-100: #e6e6e6ff;
