import { RuleTester } from 'eslint';
import { convertAnnotatedSourceToFailureCase } from '../utils/testing';
import { noValueAttribute } from './no-value-attribute';

const ruleTester = new RuleTester({
	parser: require.resolve('vue-eslint-parser'),
	parserOptions: {
		sourceType: 'module',
	},
});

ruleTester.run('no-value-attribute', noValueAttribute, {
	valid: [
		`<template><VTextField :model-value="value" /></template>`,
		`<template><VTextField :current-value="value" /></template>`,
		`<template><VCheckbox :current-checked="value" /></template>`,
		`<template><VNonVivid :value="value" /></template>`,
		`<template><VNonVivid :checked="value" /></template>`,
	],
	invalid: [
		convertAnnotatedSourceToFailureCase({
			annotatedSource: `
				<template><VTextField :value="value" /></template>
				                       ~~~~~
			`,
			message:
				'Do not use `value`. Use `modelValue` to set the current value or `initialValue` to set the initial value.',
		}),
		convertAnnotatedSourceToFailureCase({
			annotatedSource: `
				<template><VTextField value="value" /></template>
				                      ~~~~~
			`,
			message:
				'Do not use `value`. Use `modelValue` to set the current value or `initialValue` to set the initial value.',
		}),
		convertAnnotatedSourceToFailureCase({
			annotatedSource: `
				<template><VCheckbox :checked="value" /></template>
				                      ~~~~~~~
			`,
			message:
				'Do not use `checked`. Use `modelValue` to set the current value or `defaultChecked` to set the initial value.',
		}),
		convertAnnotatedSourceToFailureCase({
			annotatedSource: `
				<template><VCheckbox checked /></template>
				                     ~~~~~~~
			`,
			message:
				'Do not use `checked`. Use `modelValue` to set the current value or `defaultChecked` to set the initial value.',
		}),
	],
});
