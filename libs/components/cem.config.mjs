import { readonlyPlugin } from 'cem-plugin-readonly';
import { asyncFunctionPlugin } from 'cem-plugin-async-function';
import { jsdocFunctionPlugin } from 'cem-plugin-jsdoc-function';
import { jsdocExamplePlugin } from 'cem-plugin-jsdoc-example';
import {
	cssPropertiesPlugin,
	improvedAttrSupportPlugin,
	improvedMixinSupportPlugin,
	testUtilsTagsPlugin,
	vividComponentPlugin,
} from '@repo/cem-analyzer-plugins';

export default {
	/** Globs to analyze */
	globs: [
		'src/lib/**/*.ts',
		'src/shared/foundation/**/*.ts',
		'src/shared/patterns/**/*.ts',
		'src/shared/aria/**/*.ts',
		'src/shared/feedback/**/*.ts',
		'src/shared/picker-field/**/*.ts',
		'src/shared/deprecation/**/*.ts',
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
	/** Run in dev mode, provides extra logging */
	dev: false,
	/** Enable special handling for fast */
	fast: true,
	plugins: [
		jsdocFunctionPlugin(),
		jsdocExamplePlugin(),
		asyncFunctionPlugin(),
		readonlyPlugin(),
		cssPropertiesPlugin(),
		vividComponentPlugin(),
		testUtilsTagsPlugin(),
		improvedMixinSupportPlugin(),
		improvedAttrSupportPlugin(),
	],
};
