import { RuleTester } from 'eslint';
import tsParser from '@typescript-eslint/parser';
import { convertAnnotatedSourceToFailureCase } from '../../../eslint-plugin/src/utils/testing';
import { rule, RULE_NAME } from './underscore-member-requires-internal';

const ruleTester = new RuleTester({
	languageOptions: {
		parser: tsParser as never,
	},
});

ruleTester.run(RULE_NAME, rule as never, {
	valid: [
		// private members are allowed
		`class Test { private _foo = 1; }`,
		`class Test { private _foo() {} }`,
		// protected members are allowed
		`class Test { protected _bar = 2; }`,
		`class Test { protected _bar() {} }`,
		// public members without underscore are allowed
		`class Test { foo = 1; }`,
		`class Test { public foo() {} }`,
		// @internal JSDoc tag allows public underscore members
		`class Test { /** @internal */ _baz = 3; }`,
		`class Test { /** @internal */ _baz() {} }`,
		`class Test { /** @internal */ public _qux = 4; }`,
		// @public JSDoc tag allows public underscore members
		`class Test { /** @public */ _baz = 3; }`,
		`class Test { /** @public */ _baz() {} }`,
		`class Test { /** @public */ public _qux = 4; }`,
		// non-underscore private/protected members are fine
		`class Test { private foo = 1; }`,
		`class Test { protected bar() {} }`,
	],
	invalid: [
		// public underscore property without @internal — adds new JSDoc
		convertAnnotatedSourceToFailureCase({
			annotatedSource: `
      class Test {
        _foo = 1;
        ~~~~
      }
      `,
			fixedSource: `
      class Test {
        /** @internal */
        _foo = 1;
      }
      `,
			message:
				"Member '_foo' starts with '_' and is public. It must be private, protected, or have an @internal JSDoc tag.",
		}),
		// explicit public underscore property without @internal — adds new JSDoc
		convertAnnotatedSourceToFailureCase({
			annotatedSource: `
      class Test {
        public _bar = 2;
               ~~~~
      }
      `,
			fixedSource: `
      class Test {
        /** @internal */
        public _bar = 2;
      }
      `,
			message:
				"Member '_bar' starts with '_' and is public. It must be private, protected, or have an @internal JSDoc tag.",
		}),
		// public underscore method without @internal — adds new JSDoc
		convertAnnotatedSourceToFailureCase({
			annotatedSource: `
      class Test {
        _baz() {}
        ~~~~
      }
      `,
			fixedSource: `
      class Test {
        /** @internal */
        _baz() {}
      }
      `,
			message:
				"Member '_baz' starts with '_' and is public. It must be private, protected, or have an @internal JSDoc tag.",
		}),
		// explicit public underscore method without @internal — adds new JSDoc
		convertAnnotatedSourceToFailureCase({
			annotatedSource: `
      class Test {
        public _qux() {}
               ~~~~
      }
      `,
			fixedSource: `
      class Test {
        /** @internal */
        public _qux() {}
      }
      `,
			message:
				"Member '_qux' starts with '_' and is public. It must be private, protected, or have an @internal JSDoc tag.",
		}),
		// existing JSDoc without @internal — inserts @internal into existing comment
		convertAnnotatedSourceToFailureCase({
			annotatedSource: `
      class Test {
        /** Some doc */ _foo = 1;
                        ~~~~
      }
      `,
			fixedSource: `
      class Test {
        /** @internal Some doc */ _foo = 1;
      }
      `,
			message:
				"Member '_foo' starts with '_' and is public. It must be private, protected, or have an @internal JSDoc tag.",
		}),
	],
});
