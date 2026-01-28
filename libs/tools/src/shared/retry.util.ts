export async function retry<R>(
	fn: (...args: any[]) => R | Promise<R>,
	until: (result: R) => boolean,
	times: number = 3,
	delay: number = 0
): Promise<R | undefined> {
	return new Promise((resolve, reject) => {
		let attempts = 0;

		const execute = () => {
			attempts++;
			if (attempts < times) {
				setTimeout(attempt, delay);
			} else {
				reject('Max retries reached');
			}
		};

		const attempt = async () => {
			try {
				const result = await fn();
				if (until(result)) {
					resolve(result);
				} else {
					execute();
				}
			} catch (error) {
				execute();
			}
		};

		attempt();
	});
}
