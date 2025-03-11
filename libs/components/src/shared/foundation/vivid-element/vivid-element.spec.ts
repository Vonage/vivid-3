import { VividElement } from './vivid-element';

describe('VividElement', () => {
	describe('VIVID_VERSION', () => {
		it('should expose the current version of the Vivid library', () => {
			const majorVersion = parseInt(
				VividElement.VIVID_VERSION.split('.')[0],
				10
			);

			expect(majorVersion).toBeGreaterThanOrEqual(3);
		});
	});
});
