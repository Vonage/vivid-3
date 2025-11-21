import { execSync } from 'child_process';

export function formatFiles(filesArg: string, lint = true) {
	execSync(`pnpm prettier --write ${filesArg}`);
	if (lint) {
		execSync(`pnpm eslint --fix ${filesArg}`);
	}
}
