import { ensureDir } from './ensure-dir.util';
import { writeFileSync } from 'node:fs';

export function writeFile(file: string, content: string | Buffer) {
	ensureDir(file);
	if (Buffer.isBuffer(content)) {
		writeFileSync(file, content);
	} else {
		writeFileSync(file, content, 'utf-8');
	}
}
