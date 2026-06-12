import { RuleTester } from 'eslint';
import { noSlotAttribute } from './no-slot-attribute';
import { convertAnnotatedSourceToFailureCase } from '../utils/testing';
import vueEslintParser from 'vue-eslint-parser';

const ruleTester = new RuleTester({
	languageOptions: {
		parser: vueEslintParser,
		parserOptions: {
			sourceType: 'module',
		},
	},
});

ruleTester.run('no-slot-attribute', noSlotAttribute, {
	valid: [
		`<template><VButton><template #icon><img /></template></VButton></template>`,
		`<template><VHeader>default slot</VHeader></template>`,
		`<template><NonVivid><img slot="icon" /></NonVivid></template>`,
	],
	invalid: [
		convertAnnotatedSourceToFailureCase({
			annotatedSource: `
				<template><VTextField><VButton slot="action-items" /></VTextField></template>
				                               ~~~~
			`,
			fixedSource: `
				<template><VTextField><template #action-items><VButton  /></template></VTextField></template>
			`,
			message: 'Use Vue template slot syntax instead of the `slot` attribute.',
		}),
	],
});
