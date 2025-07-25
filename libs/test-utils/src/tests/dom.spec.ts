import '../jsdom-polyfill';

import { expect, test } from 'vitest';
import { enableAutoUnmount, mount } from '@vue/test-utils';
import { vividDOM } from '../dom';
import { testCases } from './test-cases';

enableAutoUnmount(afterEach);

for (const testCase of testCases) {
	test(testCase.name, async () => {
		const Component = (await import(`./cases/${testCase.path}/App.vue`))
			.default;
		const wrapper = mount(Component, { attachTo: document.body });
		const vvd = vividDOM(expect, document.body);

		await testCase.test(vvd);

		expect(wrapper.find('pre').text()).toContain(
			JSON.stringify(testCase.expectedState)
		);
	});
}
