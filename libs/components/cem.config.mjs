import { readonlyPlugin } from 'cem-plugin-readonly';
import { asyncFunctionPlugin } from 'cem-plugin-async-function';
import { jsdocFunctionPlugin } from 'cem-plugin-jsdoc-function';
import { jsdocExamplePlugin } from 'cem-plugin-jsdoc-example';
import plugins from '@vivid-nx/cem-analyzer-plugins';

export default {
	/** Globs to analyze */
	globs: [
		'libs/components/src/lib/**/*.ts',
		'libs/components/src/shared/foundation/**/*.ts',
		'libs/components/src/shared/patterns/**/*.ts',
		'libs/components/src/shared/aria/**/*.ts',
		'libs/components/src/shared/feedback/**/*.ts',
		'libs/components/src/shared/picker-field/**/*.ts',
	],
	/** Globs to exclude */
	exclude: [
		'**/*.md',
		'**/*.spec.ts',
		'**/index.ts',
		'**/*.template.ts',
		'**/enums.ts',
		'**/components.ts',
		'**/helpers/*.ts',
	],
	/** Directory to output CEM to */
	outdir: '/dist/libs/components',
	/** Run in dev mode, provides extra logging */
	dev: false,
	/** Enable special handling for fast */
	fast: true,
	plugins: [
		jsdocFunctionPlugin(),
		jsdocExamplePlugin(),
		asyncFunctionPlugin(),
		readonlyPlugin(),
		plugins.cssPropertiesPlugin(),
		plugins.vividComponentPlugin(),
		plugins.improvedMixinSupportPlugin(),
		plugins.improvedAttrSupportPlugin(),
	],
};
