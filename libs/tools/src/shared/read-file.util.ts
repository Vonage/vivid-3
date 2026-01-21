import { readFileSync } from 'node:fs';

export function readFile(path: string) {
	return readFileSync(path, 'utf-8');
}
