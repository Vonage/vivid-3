import { RuleTester } from 'eslint';
import { convertAnnotatedSourceToFailureCase } from '../utils/testing';
import { noCurrentValueAttribute } from './no-current-value-attribute';

const ruleTester = new RuleTester({
	parser: require.resolve('vue-eslint-parser'),
	parserOptions: {
		sourceType: 'module',
	},
});

ruleTester.run('no-current-value-attribute', noCurrentValueAttribute, {
	valid: [
		`<template><VTextField :model-value="value" /></template>`,
		`<template><VTextField :value="value" /></template>`,
		`<template><VCheckbox :model-value="value" /></template>`,
		`<template><VCheckbox :checked="value" /></template>`,
		`<template><VNonVivid :current-value="value" /></template>`,
	],
	invalid: [
		convertAnnotatedSourceToFailureCase({
			annotatedSource: `
				<template><VTextField :current-value="value" /></template>
				                       ~~~~~~~~~~~~~
			`,
			fixedSource: `
				<template><VTextField :model-value="value" /></template>
			`,
			message:
				'Use `modelValue` instead of `currentValue` to set the current value.',
		}),
		convertAnnotatedSourceToFailureCase({
			annotatedSource: `
				<template><VTextField :currentValue="value" /></template>
				                       ~~~~~~~~~~~~
			`,
			fixedSource: `
				<template><VTextField :model-value="value" /></template>
			`,
			message:
				'Use `modelValue` instead of `currentValue` to set the current value.',
		}),
		convertAnnotatedSourceToFailureCase({
			annotatedSource: `
				<template><VTextField current-value="value" /></template>
				                      ~~~~~~~~~~~~~
			`,
			fixedSource: `
				<template><VTextField model-value="value" /></template>
			`,
			message:
				'Use `modelValue` instead of `currentValue` to set the current value.',
		}),
		convertAnnotatedSourceToFailureCase({
			annotatedSource: `
				<template><VCheckbox :current-checked="value" /></template>
				                      ~~~~~~~~~~~~~~~
			`,
			fixedSource: `
				<template><VCheckbox :model-value="value" /></template>
			`,
			message:
				'Use `modelValue` instead of `currentChecked` to set the current value.',
		}),
		convertAnnotatedSourceToFailureCase({
			annotatedSource: `
				<template><VDateRangePicker :current-start="value" /></template>
				                             ~~~~~~~~~~~~~
			`,
			fixedSource: `
				<template><VDateRangePicker :start="value" /></template>
			`,
			message:
				'Use `start` instead of `currentStart` to set the current value.',
		}),
		convertAnnotatedSourceToFailureCase({
			annotatedSource: `
				<template><VRangeSlider :current-end="value" /></template>
				                      	 ~~~~~~~~~~~
			`,
			fixedSource: `
				<template><VRangeSlider :end="value" /></template>
			`,
			message: 'Use `end` instead of `currentEnd` to set the current value.',
		}),
	],
});
