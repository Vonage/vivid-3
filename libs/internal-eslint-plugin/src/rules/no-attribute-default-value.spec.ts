import { RuleTester } from 'eslint';
import tsParser from '@typescript-eslint/parser';
import { convertAnnotatedSourceToFailureCase } from '../../../eslint-plugin/src/utils/testing';
import { rule, RULE_NAME } from './no-attribute-default-value';

const ruleTester = new RuleTester({
	languageOptions: {
		parser: tsParser as never,
	},
});

ruleTester.run(RULE_NAME, rule as never, {
	valid: [
		`
    class Test{
        @attr example;
    }`,
		`
    class Test{
        @attr({ mode: 'fromView' }) example = 'someValue';
    }`,
		`
    class Test {
        @attr({ mode: 'boolean' }) example = false;
    }`,
		`
    class Test {
        @attr({ mode: 'boolean' }) example;
    }`,
		`
    class Test {
        @attr nullExample = null;
    }`,
		`
    class Test {
        @attr({ attribute: null-example}) nullExample = null;
    }`,
		`
    class Test {
        @someDecorator example = 'someValue';
    }`,
	],
	// should fail property decorated by 'attr' decorator, if assignment mutates DOM tree
	invalid: [
		convertAnnotatedSourceToFailureCase({
			annotatedSource: `
      class Test {
        @attr example = 'someValue';
                        ~~~~~~~~~~~
      }
      `,
			message:
				"'attr' decorator assigned with a default value (unless mode is set to 'fromView', or, to 'boolean' assigned to false) will mutate the custom element in the DOM light tree.",
		}),
		convertAnnotatedSourceToFailureCase({
			annotatedSource: `
      class Test {
        @attr({ mode: 'reflect' }) example = 'someValue';
                                             ~~~~~~~~~~~
      }
      `,
			message:
				"'attr' decorator assigned with a default value (unless mode is set to 'fromView', or, to 'boolean' assigned to false) will mutate the custom element in the DOM light tree.",
		}),
		convertAnnotatedSourceToFailureCase({
			annotatedSource: `
      class Test {
        @attr({ mode: 'boolean' }) example = true;
                                             ~~~~
      }
      `,
			message:
				"'attr' decorator assigned with a default value (unless mode is set to 'fromView', or, to 'boolean' assigned to false) will mutate the custom element in the DOM light tree.",
		}),
	],
});
