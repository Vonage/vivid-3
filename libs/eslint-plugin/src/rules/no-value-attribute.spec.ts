import { RuleTester } from 'eslint';
import { convertAnnotatedSourceToFailureCase } from '../utils/testing';
import { noValueAttribute } from './no-value-attribute';

const ruleTester = new RuleTester({
	parser: require.resolve('vue-eslint-parser'),
	parserOptions: {
		sourceType: 'module',
	},
});

const varyFixByOptions = (
	baseCaseOptions: {
		annotatedSource: string;
		message: string;
	},
	fixVariations: Array<{
		options?: unknown[];
		fixedSource?: string;
	}>
) =>
	fixVariations.map((fixVariation) =>
		convertAnnotatedSourceToFailureCase({
			...baseCaseOptions,
			...fixVariation,
		})
	);

ruleTester.run('no-value-attribute', noValueAttribute, {
	valid: [
		`<template><VTextField :model-value="value" /></template>`,
		`<template><VTextField :current-value="value" /></template>`,
		`<template><VCheckbox :current-checked="value" /></template>`,
		`<template><VNonVivid :value="value" /></template>`,
		`<template><VNonVivid :checked="value" /></template>`,
	],
	invalid: [
		...varyFixByOptions(
			{
				annotatedSource: `
					<template><VTextField :value="value" /></template>
					                       ~~~~~
				`,
				message:
					'Do not use `value`. Use `modelValue` to set the current value or `initialValue` to set the initial value.',
			},
			[
				{},
				{
					options: [{ replaceWith: 'modelValue' }],
					fixedSource: `
					<template><VTextField :model-value="value" /></template>
				`,
				},
				{
					options: [{ replaceWith: 'initialValue' }],
					fixedSource: `
					<template><VTextField :initial-value="value" /></template>
				`,
				},
			]
		),
		...varyFixByOptions(
			{
				annotatedSource: `
					<template><VTextField value="value" /></template>
					                      ~~~~~
				`,
				message:
					'Do not use `value`. Use `modelValue` to set the current value or `initialValue` to set the initial value.',
			},
			[
				{},
				{
					options: [{ replaceWith: 'modelValue' }],
					fixedSource: `
					<template><VTextField model-value="value" /></template>
				`,
				},
				{
					options: [{ replaceWith: 'initialValue' }],
					fixedSource: `
					<template><VTextField initial-value="value" /></template>
				`,
				},
			]
		),
		...varyFixByOptions(
			{
				annotatedSource: `
					<template><VCheckbox :checked="value" /></template>
					                      ~~~~~~~
				`,
				message:
					'Do not use `checked`. Use `modelValue` to set the current value or `defaultChecked` to set the initial value.',
			},
			[
				{},
				{
					options: [{ replaceWith: 'modelValue' }],
					fixedSource: `
					<template><VCheckbox :model-value="value" /></template>
				`,
				},
				{
					options: [{ replaceWith: 'initialValue' }],
					fixedSource: `
					<template><VCheckbox :default-checked="value" /></template>
				`,
				},
			]
		),
		...varyFixByOptions(
			{
				annotatedSource: `
					<template><VCheckbox checked /></template>
					                     ~~~~~~~
				`,
				message:
					'Do not use `checked`. Use `modelValue` to set the current value or `defaultChecked` to set the initial value.',
			},
			[
				{},
				{
					options: [{ replaceWith: 'modelValue' }],
					fixedSource: `
					<template><VCheckbox model-value /></template>
				`,
				},
				{
					options: [{ replaceWith: 'initialValue' }],
					fixedSource: `
					<template><VCheckbox default-checked /></template>
				`,
				},
			]
		),
	],
});
