import { ensureDir } from './ensure-dir.util';
import { writeFileSync } from 'node:fs';

export function writeJson(file: string, object: object) {
	ensureDir(file);
	const data = JSON.stringify(object, null, 2);
	writeFileSync(file, data, 'utf-8');
}
