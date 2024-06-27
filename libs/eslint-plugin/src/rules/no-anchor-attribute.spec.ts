import { RuleTester } from 'eslint';
import { convertAnnotatedSourceToFailureCase } from '../utils/testing';
import { noAnchorAttribute } from './no-anchor-attribute';

const ruleTester = new RuleTester({
	parser: require.resolve('vue-eslint-parser'),
	parserOptions: {
		sourceType: 'module',
	},
});

ruleTester.run('no-anchor-attribute', noAnchorAttribute, {
	valid: [
		`<template><VTooltip><template #anchor><VButton /></template></VTooltip></template>`,
		`<template><VButton /><VTooltip /></template>`,
		`<template><VButton id="anchor"/><VTooltip :anchor="anchor"/></template>`,
	],
	invalid: [
		convertAnnotatedSourceToFailureCase({
			annotatedSource: `<template>
				<VButton id="anchor" />
				<VTooltip anchor="anchor"></VTooltip>
				          ~~~~~~~~~~~~~~~
			</template>`,
			fixedSource: `<template>
				<VTooltip ><template #anchor><VButton id="anchor" /></template></VTooltip>
			</template>`,
			message: 'Prefer anchor slot over the `anchor` prop.',
		}),
		convertAnnotatedSourceToFailureCase({
			annotatedSource: `<template>
				<VButton id="anchor" />
				<VTooltip anchor="anchor" />
				          ~~~~~~~~~~~~~~~
			</template>`,
			fixedSource: `<template>
				<VTooltip  ><template #anchor><VButton id="anchor" /></template></VTooltip>
			</template>`,
			message: 'Prefer anchor slot over the `anchor` prop.',
		}),
		convertAnnotatedSourceToFailureCase({
			annotatedSource: `<template>
				<VButton id="anchor"/><div /><VTooltip anchor="anchor"/>
				                                       ~~~~~~~~~~~~~~~
			</template>`,
			message: 'Prefer anchor slot over the `anchor` prop.',
		}),
		convertAnnotatedSourceToFailureCase({
			annotatedSource: `<template>
				<VButton id="other-id"/><VTooltip anchor="anchor"/>
				                                  ~~~~~~~~~~~~~~~
			</template>`,
			message: 'Prefer anchor slot over the `anchor` prop.',
		}),
		convertAnnotatedSourceToFailureCase({
			annotatedSource: `<template>
				<VButton :id="anchor"/><VTooltip anchor="anchor"/>
				                                 ~~~~~~~~~~~~~~~
			</template>`,
			message: 'Prefer anchor slot over the `anchor` prop.',
		}),
		convertAnnotatedSourceToFailureCase({
			annotatedSource: `<template>
				<VTooltip anchor="anchor"/>
				          ~~~~~~~~~~~~~~~
			</template>`,
			message: 'Prefer anchor slot over the `anchor` prop.',
		}),
	],
});
