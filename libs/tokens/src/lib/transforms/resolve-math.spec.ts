import { resolveMath } from './resolve-math';

const { transformer } = resolveMath;

const token = {
	value: 4 * 10
};

describe('basic', () => {
	it('should evaluate math expression', () => {
		expect(transformer(token)).toEqual('40');
	});
});
