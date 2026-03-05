import { FlatCompat } from '@eslint/eslintrc';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

export default compat.config({
	root: true,
	extends: ['@repo/eslint-config/base.js'],
	overrides: [
		{
			files: ['*.ts', '*.tsx', '*.stories.js'],
			rules: {
				'@typescript-eslint/no-unused-vars': 0,
				'@typescript-eslint/ban-ts-comment': 0,
				'no-mixed-spaces-and-tabs': 0,
			},
		},
	],
});
