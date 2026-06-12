import { readFileSync } from 'node:fs';

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
export function readJson<O = any>(path: string): O | undefined {
	try {
		const jsonString = readFileSync(path, 'utf-8');
		return JSON.parse(jsonString) as O;
	} catch {
		return undefined;
	}
}
