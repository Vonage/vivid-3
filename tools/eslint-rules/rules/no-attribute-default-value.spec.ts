import { convertAnnotatedSourceToFailureCase } from '@angular-eslint/utils';
import { TSESLint } from '@typescript-eslint/experimental-utils';
import { noAttributeDefaultValue, noAttributeDefaultValueName } from './no-attribute-default-value';

const ruleTester = new TSESLint.RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
});

ruleTester.run(noAttributeDefaultValueName, noAttributeDefaultValue, {
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
        @someDecorator example = 'someValue';
    }`,
  ],
  invalid: [
    convertAnnotatedSourceToFailureCase({
      description: 'should fail \'attr\' decorated property if assigned with default value',
      annotatedSource: `
      class {
        @attr example = 'someValue';
                        ~~~~~~~~~~~
      }
      `,
      messageId: 'noAttributeDefaultValue'
    }),
    convertAnnotatedSourceToFailureCase({
      description: 'should fail property decorated with attr is assigned by default value',
      annotatedSource: `
      class {
        @attr({	mode: 'reflect' }) example = 'someValue';
                                             ~~~~~~~~~~~
      }
      `,
      messageId: 'noAttributeDefaultValue'
    }),
    convertAnnotatedSourceToFailureCase({
      description: 'should fail property decorated with attr is assigned by default value',
      annotatedSource: `
      class {
        @attr({	mode: 'boolean' }) example = 'someValue';
                                             ~~~~~~~~~~~
      }
      `,
      messageId: 'noAttributeDefaultValue'
    })
  ],
});
