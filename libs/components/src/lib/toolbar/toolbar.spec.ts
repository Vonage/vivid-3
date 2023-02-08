import { fixture } from '@vivid-nx/shared';
import { FoundationElementRegistry } from '@microsoft/fast-foundation';
import { Toolbar } from './toolbar';
import { toolbarDefinition } from './definition';
import '.';

const COMPONENT_TAG = 'vwc-toolbar';

describe('vwc-toolbar', () => {
	let element: Toolbar;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as Toolbar;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-toolbar', async () => {
			expect(toolbarDefinition()).toBeInstanceOf(FoundationElementRegistry);
			expect(element).toBeInstanceOf(Toolbar);
		});
	});
});
