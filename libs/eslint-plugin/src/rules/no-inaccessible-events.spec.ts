import { RuleTester } from 'eslint';
import { noInaccessibleEvents } from './no-inaccessible-events';
import { convertAnnotatedSourceToFailureCase } from '../utils/testing';

const ruleTester = new RuleTester({
	parser: require.resolve('vue-eslint-parser'),
	parserOptions: {
		sourceType: 'module',
	},
});

ruleTester.run('no-inaccessible-events', noInaccessibleEvents, {
	valid: [
		`<template><VBadge /></template>`,
		`<template><VBadge click="handler" /></template>`,
		`<template><VBadge @event="handler" /></template>`,
	],
	invalid: [
		convertAnnotatedSourceToFailureCase({
			annotatedSource: `
				<template><VBadge @click="handler" /></template>
				                  ~~~~~~~~~~~~~~~~
			`,
			message:
				'Using the `click` event on VBadge is an accessibility concern because the component is non-interactive.',
		}),
		convertAnnotatedSourceToFailureCase({
			annotatedSource: `
				<template><v-badge @click="handler" /></template>
				                   ~~~~~~~~~~~~~~~~
			`,
			message:
				'Using the `click` event on VBadge is an accessibility concern because the component is non-interactive.',
		}),
	],
});
