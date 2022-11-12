export default {
	/** Globs to analyze */
	globs: ['src/lib/**/*.ts'],
	/** Globs to exclude */
	exclude: [
		'src/lib/*.ts',
		'src/lib/**/*.md',
		'src/lib/**/ui.test.ts',
		'src/lib/**/*.spec.ts',
		'src/lib/**/*.template.ts',
		'src/lib/**/index.ts',
	],
	packagejson: true,
	/** Directory to output CEM to */
	// outdir: '../../dist/libs/components',
	/** Run in dev mode, provides extra logging */
	dev: false,
	/** Enable special handling for fast */
	fast: true,
};
