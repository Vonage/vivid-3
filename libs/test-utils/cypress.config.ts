import { defineConfig } from 'cypress';

export default defineConfig({
	e2e: {
		specPattern: 'src/tests/**/*.cy.ts',
	},
});
