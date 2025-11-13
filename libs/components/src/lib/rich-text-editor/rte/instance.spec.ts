import { RTEConfig } from './config';
import { RTECore } from './features/core';
import { RTEFreeformStructure } from './features/freeform';
import { docFactories } from './__tests__/doc-factories';

const { text_line: line } = docFactories;

describe('RTEInstance', () => {
	describe('getDoc', () => {
		it('should return the current document', () => {
			const config = new RTEConfig([new RTECore(), new RTEFreeformStructure()]);
			const instance = config.instantiateEditor([line('Hello world')]);
			expect(instance.getDoc()).toEqual([
				{ type: 'text_line', content: [{ type: 'text', text: 'Hello world' }] },
			]);
		});
	});

	describe('setDoc', () => {
		it('should replace the current document', () => {
			const config = new RTEConfig([new RTECore(), new RTEFreeformStructure()]);
			const instance = config.instantiateEditor([line('Hello world')]);
			instance.setDoc([line('Updated document')]);
			expect(instance.getDoc()).toEqual([
				{
					type: 'text_line',
					content: [{ type: 'text', text: 'Updated document' }],
				},
			]);
		});
	});

	describe('hostState', () => {
		it('should throw an error when host state has not been set', () => {
			const config = new RTEConfig([new RTECore(), new RTEFreeformStructure()]);
			const instance = config.instantiateEditor();
			expect(() => instance.hostState()).toThrowError(
				'No host state available'
			);
		});

		it('should return host state when it has been set', () => {
			const config = new RTEConfig([new RTECore(), new RTEFreeformStructure()]);
			const instance = config.instantiateEditor();
			const hostState = {} as any;

			instance.updateHostState(hostState);

			expect(instance.hostState()).toBe(hostState);
		});
	});
});
