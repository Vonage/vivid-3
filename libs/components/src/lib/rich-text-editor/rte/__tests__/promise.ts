/// Polyfill for Promise.withResolvers
export const promiseWithResolvers = <T>() => {
	let resolve!: (value: T) => void;
	let reject!: (reason?: any) => void;
	const promise = new Promise<T>((res, rej) => {
		resolve = res;
		reject = rej;
	});
	return { promise, resolve, reject };
};
