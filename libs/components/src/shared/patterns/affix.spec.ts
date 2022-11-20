import {AffixIconWithTrailing} from './affix';

describe('affix', function () {
	describe('affixWithTrailing', function () {
		it('should resolve', async function() {
			const affixWithTrailing = new AffixIconWithTrailing();
			expect(affixWithTrailing).toBeTruthy();
		}); 
	});
});
