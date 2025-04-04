import type { AxeMatchers } from 'vitest-axe';

declare module '@vitest/expect' {
	interface Assertion extends AxeMatchers {}
	interface AsymmetricMatchersContaining extends AxeMatchers {}
}
