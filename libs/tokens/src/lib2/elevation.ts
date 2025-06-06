import elevationTokens from '../elevation.json';
import { kebabCase } from 'change-case';

for (const [name, token] of Object.entries(elevationTokens)) {
	if (token.$type !== 'shadow') continue;

	const tokenName = kebabCase(name);
	const shadowStops = token.$value.map(
		(stop) =>
			`${stop.offsetX}px ${stop.offsetY}px ${stop.blur}px ${stop.spread}px ${stop.color}`
	);
	const tokenEntry = `--vvd-${tokenName}: ${shadowStops.join(', ')};`;

	console.log(tokenEntry);
}

// Output:
// --vvd-elevation-dark-8-dp: 0px 2px 16px 0px #13141540, 0px 8px 8px 0px #13141540, 0px 4px 4px 1px #00000040;
// --vvd-elevation-dark-12-dp: 0px 4px 24px 0px #00000040, 0px 12px 16px 0px #00000040, 0px 6px 8px 2px #00000040;
// --vvd-elevation-light-neutral-tinted-4-dp: 0px 4px 2px 0px #26044d0d, 0px 2px 4px 0px #26044d0d, 0px 2px 8px 0px #26044d1a;
// --vvd-elevation-light-neutral-tinted-8-dp: 0px 4px 4px 0px #26044d0d, 0px 8px 8px 0px #26044d0d, 0px 2px 16px 0px #26044d1a;
