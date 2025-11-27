import { promiseWithResolvers } from './promise';

export const asyncGeneratorMock = <TYield, TReturn = undefined>() => {
	let nextCalled = promiseWithResolvers();
	let nextPromise = promiseWithResolvers();

	const resolveNext = async (result: IteratorResult<TYield, TReturn>) => {
		await nextCalled.promise;
		const current = nextPromise;
		nextCalled = promiseWithResolvers();
		nextPromise = promiseWithResolvers();
		current.resolve(result);
		if (!result.done) {
			await nextCalled.promise;
		}
	};

	return {
		generator: {
			next: () => {
				nextCalled.resolve(undefined);
				return nextPromise.promise;
			},
			[Symbol.asyncIterator]() {
				return this;
			},
		} as AsyncGenerator<TYield, TReturn>,
		yield: (value: TYield) => resolveNext({ done: false, value }),
		return: (value: TReturn) => resolveNext({ done: true, value }),
	};
};
