import { RuleTester } from 'eslint';
import { convertAnnotatedSourceToFailureCase } from '../utils/testing';
import { noDeprecatedAPIs } from './no-deprecated-apis';

const ruleTester = new RuleTester({
	parser: require.resolve('vue-eslint-parser'),
	parserOptions: {
		sourceType: 'module',
	},
});

ruleTester.run('no-deprecated-apis', noDeprecatedAPIs, {
	valid: [
		`<template><VSelectableBox clickable-box /></template>`,
		`<template><VSelectableBox :clickable-box="true" /></template>`,
		`<template><VSelectableBox @clickable/></template>`,
	],
	invalid: [
		convertAnnotatedSourceToFailureCase({
			annotatedSource: `
				<template><VSelectableBox clickable /></template>
				                          ~~~~~~~~~
			`,
			fixedSource: `
				<template><VSelectableBox clickable-box /></template>
			`,
			message:
				'VSelectableBox uses a deprecated prop `clickable`. Use `clickable-box` instead.',
		}),
		convertAnnotatedSourceToFailureCase({
			annotatedSource: `
				<template><v-selectable-box clickable /></template>
				                            ~~~~~~~~~
			`,
			fixedSource: `
				<template><v-selectable-box clickable-box /></template>
			`,
			message:
				'VSelectableBox uses a deprecated prop `clickable`. Use `clickable-box` instead.',
		}),
		convertAnnotatedSourceToFailureCase({
			annotatedSource: `
				<template><VSelectableBox :clickable="true" /></template>
				                           ~~~~~~~~~
			`,
			fixedSource: `
				<template><VSelectableBox :clickable-box="true" /></template>
			`,
			message:
				'VSelectableBox uses a deprecated prop `clickable`. Use `clickable-box` instead.',
		}),
	],
});
