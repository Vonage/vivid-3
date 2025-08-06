import '../jsdom-polyfill';

import { expect, test } from 'vitest';
import { enableAutoUnmount, mount } from '@vue/test-utils';
import { vividDOM } from '../dom';
import { testCases } from './test-cases';
import { elementUpdated } from '@repo/shared';

enableAutoUnmount(afterEach);

describe('test cases', () => {
	for (const testCase of testCases) {
		test(testCase.name, async () => {
			const Component = (await import(`./cases/${testCase.path}/App.vue`))
				.default;
			const wrapper = mount(Component, { attachTo: document.body });
			const vvd = vividDOM(expect, document.body);
			await elementUpdated(wrapper.element);

			const runTest = async () => {
				await testCase.test(vvd, (expectedState) => {
					expect(wrapper.find('pre').text()).toContain(
						JSON.stringify(expectedState)
					);
				});
			};

			if (testCase.expectErrorMessage) {
				await expect(runTest).rejects.toThrowError(testCase.expectErrorMessage);
			} else {
				await runTest();
			}
		});
	}
});
