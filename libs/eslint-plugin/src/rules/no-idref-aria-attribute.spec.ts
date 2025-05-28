import { RuleTester } from 'eslint';
import { noIdrefAriaAttribute } from './no-idref-aria-attribute';
import { convertAnnotatedSourceToFailureCase } from '../utils/testing';

const ruleTester = new RuleTester({
	parser: require.resolve('vue-eslint-parser'),
	parserOptions: {
		sourceType: 'module',
	},
});

ruleTester.run('no-idref-aria-attribute', noIdrefAriaAttribute, {
	valid: [
		{
			code: '<template><VBreadcrumb aria-label="breadcrumb"></VBreadcrumb></template>',
		},
		{
			code: '<template><VButton aria-label="button"></VButton></template>',
		},
		{
			code: '<template><VNav aria-label="navigation"></VNav></template>',
		},
		{
			code: '<template><VTagGroup aria-label="tags"></VTagGroup></template>',
		},
		{
			code: '<template><VTag aria-label="tag"></VTag></template>',
		},
		{
			code: '<template><VActionGroup aria-label="actions"></VActionGroup></template>',
		},
		{
			code: '<template><VHeader aria-label="header"></VHeader></template>',
		},
		{
			code: '<template><VSwitch aria-label="switch"></VSwitch></template>',
		},
		{
			code: '<template><VDivider aria-label="divider"></VDivider></template>',
		},
		{
			code: '<template><VTextArea aria-label="textarea"></VTextArea></template>',
		},
		{
			code: '<template><VCheckbox aria-label="checkbox"></VCheckbox></template>',
		},
		{
			code: '<template><VSearchableSelect aria-label="select"></VSearchableSelect></template>',
		},
		{
			code: '<template><VFilePicker aria-label="file picker"></VFilePicker></template>',
		},
		{
			code: '<template><VCalendarEvent aria-label="event"></VCalendarEvent></template>',
		},
		{
			code: '<template><VProgress aria-label="progress"></VProgress></template>',
		},
		{
			code: '<template><VProgressRing aria-label="progress"></VProgressRing></template>',
		},
		{
			code: '<template><VSelectableBox aria-label="box"></VSelectableBox></template>',
		},
		{
			code: '<template><VBanner aria-label="banner"></VBanner></template>',
		},
		{
			code: '<template><VMenu aria-label="menu"></VMenu></template>',
		},
		{
			code: '<template><VTextField aria-label="text field"></VTextField></template>',
		},
		{
			code: '<template><VDialog aria-label="dialog"></VDialog></template>',
		},
		{
			code: '<template><VSlider aria-label="slider"></VSlider></template>',
		},
		{
			code: '<template><VSplitButton aria-label="split button"></VSplitButton></template>',
		},
		{
			code: '<template><VNumberField aria-label="number field"></VNumberField></template>',
		},
		{
			code: '<template><VNavDisclosure aria-label="disclosure"></VNavDisclosure></template>',
		},
	],
	invalid: [
		convertAnnotatedSourceToFailureCase({
			annotatedSource: `
				<template><VMenu aria-controls="id"></VMenu></template>
				                 ~~~~~~~~~~~~~
			`,
			message:
				'IDREF ARIA attributes (like aria-controls) should not be used on components that delegate ARIA attributes, as they will not work correctly with shadow DOM.',
		}),
		convertAnnotatedSourceToFailureCase({
			annotatedSource: `
				<template><VButton aria-labelledby="id"></VButton></template>
				                   ~~~~~~~~~~~~~~~
			`,
			message:
				'IDREF ARIA attributes (like aria-labelledby) should not be used on components that delegate ARIA attributes, as they will not work correctly with shadow DOM.',
		}),
		convertAnnotatedSourceToFailureCase({
			annotatedSource: `
				<template><VTextField aria-owns="id"></VTextField></template>
				                      ~~~~~~~~~
			`,
			message:
				'IDREF ARIA attributes (like aria-owns) should not be used on components that delegate ARIA attributes, as they will not work correctly with shadow DOM.',
		}),
		convertAnnotatedSourceToFailureCase({
			annotatedSource: `
				<template><VDialog aria-details="id"></VDialog></template>
				                   ~~~~~~~~~~~~
			`,
			message:
				'IDREF ARIA attributes (like aria-details) should not be used on components that delegate ARIA attributes, as they will not work correctly with shadow DOM.',
		}),
		convertAnnotatedSourceToFailureCase({
			annotatedSource: `
				<template><VMenu aria-errormessage="id"></VMenu></template>
				                 ~~~~~~~~~~~~~~~~~
			`,
			message:
				'IDREF ARIA attributes (like aria-errormessage) should not be used on components that delegate ARIA attributes, as they will not work correctly with shadow DOM.',
		}),
		convertAnnotatedSourceToFailureCase({
			annotatedSource: `
				<template><VButton aria-flowto="id"></VButton></template>
				                   ~~~~~~~~~~~
			`,
			message:
				'IDREF ARIA attributes (like aria-flowto) should not be used on components that delegate ARIA attributes, as they will not work correctly with shadow DOM.',
		}),
	],
});
