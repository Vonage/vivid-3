import { resolvePromise } from './promise';

describe('resolvePromise', () => {
	it('should resolve with type ok and result when promise resolves', async () => {
		expect(await resolvePromise(Promise.resolve(42))).toEqual({
			type: 'ok',
			result: 42,
		});
	});

	it('should resolve with type error and error when promise rejects', async () => {
		const error = new Error('Test error');
		expect(await resolvePromise(Promise.reject(error))).toEqual({
			type: 'error',
			error,
		});
	});
});
