import { ensureDir } from './ensure-dir.util';
import { writeFileSync } from 'node:fs';

export function writeFile(file: string, content: string) {
	ensureDir(file);
	writeFileSync(file, content, 'utf-8');
}
