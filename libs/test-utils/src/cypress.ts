/// <reference types="cypress" />
import type { Context } from './base';
import type { CypressDriverT } from './drivers/driver';
import { VividWrapper } from './components.generated';
import { createCypressDriver } from './drivers/cypress';

export const vividCypress = (cy: Cypress.cy) => {
	const ctx: Context<CypressDriverT> = {
		rootLocator: cy,
		driver: createCypressDriver(cy),
	};

	return new VividWrapper(ctx);
};
