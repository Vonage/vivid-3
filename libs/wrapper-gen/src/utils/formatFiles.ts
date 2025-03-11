import { execSync } from 'child_process';

export function formatFiles(filesArg: string) {
	// Run prettier first as eslint will destroy the code otherwise
	execSync(`npx prettier --write ${filesArg}`);
	execSync(`npx eslint --fix ${filesArg}`);
}
