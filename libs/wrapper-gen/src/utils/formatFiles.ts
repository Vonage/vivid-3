import { execSync } from 'child_process';

export function formatFiles(filesArg: string, lint = true) {
	execSync(`npx prettier --write ${filesArg}`);
	if (lint) {
		execSync(`npx eslint --fix ${filesArg}`);
	}
}
