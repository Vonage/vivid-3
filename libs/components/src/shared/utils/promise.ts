export const resolvePromise = async <T>(
	promise: Promise<T>
): Promise<{ type: 'ok'; result: T } | { type: 'error'; error: unknown }> => {
	try {
		const result = await promise;
		return { type: 'ok', result };
	} catch (e) {
		return { type: 'error', error: e };
	}
};
