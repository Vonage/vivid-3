import { RTEConfig } from './config';
import { RTECore } from './features/core';
import { RTEFreeformStructure } from './features/freeform';

describe('RTEInstance', () => {
	describe('getDoc', () => {
		it('should return the current document', () => {
			const config = new RTEConfig([new RTECore(), new RTEFreeformStructure()]);
			const instance = config.instantiateEditor([
				{ type: 'text', text: 'Hello world' },
			]);
			expect(instance.getDoc()).toEqual([
				{ type: 'text', text: 'Hello world' },
			]);
		});
	});

	describe('setDoc', () => {
		it('should replace the current document', () => {
			const config = new RTEConfig([new RTECore(), new RTEFreeformStructure()]);
			const instance = config.instantiateEditor([
				{ type: 'text', text: 'Hello world' },
			]);
			instance.setDoc([{ type: 'text', text: 'Updated document' }]);
			expect(instance.getDoc()).toEqual([
				{ type: 'text', text: 'Updated document' },
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
