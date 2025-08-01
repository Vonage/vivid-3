/// <reference types="cypress" />

import { vividCypress } from '../cypress';
import { testCases } from './test-cases';

for (const testCase of testCases) {
	it(testCase.name, () => {
		cy.visit(`http://localhost:5173/${testCase.path}/`);
		const vvd = vividCypress(cy);

		testCase.test(vvd);

		cy.get('pre').should(
			'contain.text',
			JSON.stringify(testCase.expectedState)
		);
	});
}
