import { accessibleNames } from './accessible-names';
import { RuleTester } from 'eslint';
import { convertAnnotatedSourceToFailureCase } from '../utils/testing';

const ruleTester = new RuleTester({
	parser: require.resolve('vue-eslint-parser'),
	parserOptions: {
		sourceType: 'module',
	},
});

ruleTester.run('accessible-names', accessibleNames, {
	valid: [
		`<template><VButton label="label" /></template>`,
		`<template><VButton aria-label="label" /></template>`,
		`<template><VButton title="label" /></template>`,
		`<template><VButton label="label" aria-label="label" /></template>`,
		`<template><VButton v-bind="attrs" /></template>`,
		`<template><VButton :label="'label'" /></template>`,
		`<template><VCheckbox label="label" /></template>`,
		`<template><VCheckbox>label</VCheckbox></template>`,
		`<template><VButton aria-hidden="true" /></template>`,
	],
	invalid: [
		convertAnnotatedSourceToFailureCase({
			annotatedSource: `
				<template><VButton icon="user" /></template>
				          ~~~~~~~~~~~~~~~~~~~~~~~
			`,
			message: 'VButton does not have an accessible name.',
		}),
		convertAnnotatedSourceToFailureCase({
			annotatedSource: `
				<template><VCheckbox /></template>
				          ~~~~~~~~~~~~~
			`,
			message: 'VCheckbox does not have an accessible name.',
		}),
	],
});
