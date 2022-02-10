import { TSESLint } from '@typescript-eslint/experimental-utils';
import { rule, RULE_NAME } from './no-default-attribute';

const ruleTester = new TSESLint.RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
});

ruleTester.run(RULE_NAME, rule, {
  valid: [`class Badge extends FoundationElement {
    @attr connotation;
  }`,
  `class Badge extends FoundationElement {
    @attr({	mode: 'fromView' }) connotation = 'cta';
  }`,
  `class Badge extends FoundationElement {
    @someDecorator connotation = 'cta';
  }`],
  invalid: [
    {
      code: `class Badge extends FoundationElement {
        @attr connotation = 'cta';
      }`,
      errors: [
        {
          messageId: 'attrDecorator'
        }
      ]
    },
    {
      code: `class Badge extends FoundationElement {
        @attr({	mode: 'reflect' }) connotation = 'cta';
      }`,
      errors: [
        {
          messageId: 'attrDecorator'
        }
      ]
    },
    {
      code: `class Badge extends FoundationElement {
        @attr({	mode: 'boolean' }) connotation = 'cta';
      }`,
      errors: [
        {
          messageId: 'attrDecorator'
        }
      ]
    }
  ],
});
