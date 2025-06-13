import { convertAnnotatedSourceToFailureCase } from '@angular-eslint/utils';
import { TSESLint } from '@typescript-eslint/utils';
import { rule, RULE_NAME } from './no-attribute-default-value';

const ruleTester = new TSESLint.RuleTester({
	parser: require.resolve('@typescript-eslint/parser'),
});

ruleTester.run(RULE_NAME, rule, {
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
	invalid: [
		convertAnnotatedSourceToFailureCase({
			description:
				"should fail property decorated by 'attr' decorator, if assignment mutates DOM tree",
			annotatedSource: `
      class Test {
        @attr example = 'someValue';
                        ~~~~~~~~~~~
      }
      `,
			messageId: 'noAttributeDefaultValue',
		}) as TSESLint.InvalidTestCase<'noAttributeDefaultValue', []>,
		convertAnnotatedSourceToFailureCase({
			description:
				"should fail property decorated by 'attr' decorator, if assignment mutates DOM tree",
			annotatedSource: `
      class Test {
        @attr({ mode: 'reflect' }) example = 'someValue';
                                             ~~~~~~~~~~~
      }
      `,
			messageId: 'noAttributeDefaultValue',
		}) as TSESLint.InvalidTestCase<'noAttributeDefaultValue', []>,
		convertAnnotatedSourceToFailureCase({
			description:
				"should fail property decorated by 'attr' decorator, if assignment mutates DOM tree",
			annotatedSource: `
      class Test {
        @attr({ mode: 'boolean' }) example = true;
                                             ~~~~
      }
      `,
			messageId: 'noAttributeDefaultValue',
		}) as TSESLint.InvalidTestCase<'noAttributeDefaultValue', []>,
	],
});
