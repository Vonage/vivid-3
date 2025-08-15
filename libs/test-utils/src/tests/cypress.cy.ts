/// <reference types="cypress" />

import { vividCypress } from '../cypress';
import { testCases } from './test-cases';

for (const testCase of testCases) {
	it(testCase.name, () => {
		cy.visit(`http://localhost:5173/${testCase.path}/`);
		const vvd = vividCypress(cy);

		const failHandler = (err: Error, runnable: any) => {
			if (
				runnable.title === testCase.name &&
				err.message.includes(testCase.expectErrorMessage!)
			) {
				// Expected failure
			} else {
				throw err;
			}
		};
		if (testCase.expectErrorMessage) {
			Cypress.once('fail', failHandler);
		}

		testCase.test(vvd, (expectedState) => {
			cy.get('pre').should('contain.text', JSON.stringify(expectedState));
		});

		if (testCase.expectErrorMessage) {
			cy.then(() => {
				Cypress.off('fail', failHandler);
				throw new Error('Test did not fail with expected error');
			});
		}
	});
}
