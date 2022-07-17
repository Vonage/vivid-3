import { convertAnnotatedSourceToFailureCase } from '@angular-eslint/utils';
import { TSESLint } from '@typescript-eslint/experimental-utils';
import { rule, RULE_NAME } from './no-attribute-default-value';

const ruleTester = new TSESLint.RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
});

ruleTester.run(RULE_NAME, rule, {
  valid: [
    `
    class {
        @attr example;
    }`,
    `
    class {
        @attr({ mode: 'fromView' }) example = 'someValue';
    }`,
    `
    class {
        @attr({ mode: 'boolean' }) example = false;
    }`,
    `
    class {
        @attr({ mode: 'boolean' }) example;
    }`,
    `
    class {
        @attr nullExample = null;
    }`,
    `
    class {
        @attr({ attribute: null-example}) nullExample = null;
    }`,
    `
    class {
        @someDecorator example = 'someValue';
    }`,
  ],
  invalid: [
    convertAnnotatedSourceToFailureCase({
      description: 'should fail property decorated by \'attr\' decorator, if assignment mutates DOM tree',
      annotatedSource: `
      class {
        @attr example = 'someValue';
                        ~~~~~~~~~~~
      }
      `,
      messageId: 'noAttributeDefaultValue'
    }),
    convertAnnotatedSourceToFailureCase({
      description: 'should fail property decorated by \'attr\' decorator, if assignment mutates DOM tree',
      annotatedSource: `
      class {
        @attr({ mode: 'reflect' }) example = 'someValue';
                                             ~~~~~~~~~~~
      }
      `,
      messageId: 'noAttributeDefaultValue'
    }),
    convertAnnotatedSourceToFailureCase({
      description: 'should fail property decorated by \'attr\' decorator, if assignment mutates DOM tree',
      annotatedSource: `
      class {
        @attr({ mode: 'boolean' }) example = true;
                                             ~~~~
      }
      `,
      messageId: 'noAttributeDefaultValue'
    })
  ],
});
