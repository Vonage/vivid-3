import { dirname, resolve } from 'node:path';
import { existsSync, mkdirSync } from 'node:fs';

export function ensureDir(path: string): void {
	const directory = dirname(resolve(path));
	if (!existsSync(directory)) {
		mkdirSync(directory, { recursive: true });
	}
}
