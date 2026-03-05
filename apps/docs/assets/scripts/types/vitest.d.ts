/* eslint-disable @typescript-eslint/no-empty-object-type -- declaration merging */
import type { AxeMatchers } from 'vitest-axe';

declare module 'vitest' {
	interface Assertion extends AxeMatchers {}
	interface AsymmetricMatchersContaining extends AxeMatchers {}
}
/* eslint-enable @typescript-eslint/no-empty-object-type */
