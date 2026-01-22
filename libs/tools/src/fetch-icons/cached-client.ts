import { Client, type ClientInterface } from 'figma-js';
import { hash } from 'ohash';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { writeJson } from '../shared/write-json.util';
import { logger } from '../shared/logger.util';

export interface GetClientUserOptions {
	dir: string;
}

export function getClient(
	cached = true,
	userOptions?: Partial<GetClientUserOptions>
): ClientInterface {
	if (!process.env.FIGMA_TOKEN) {
		logger.error(
			'FIGMA_TOKEN environment variable is not set. Please set it to your Figma Personal Access Token.'
		);
		process.exit(1);
	}
	const client = Client({ personalAccessToken: process.env.FIGMA_TOKEN || '' });

	const options: GetClientUserOptions = {
		dir: '.local',
		...userOptions,
	};

	if (!cached) {
		return client;
	}

	return new Proxy({} as ClientInterface, {
		get<C extends ClientInterface, M extends keyof ClientInterface>(
			_target: C,
			prop: M
		) {
			return async (...args: Parameters<C[M]>) => {
				const cacheHash = hash([prop, args]);
				const cacheFilePath = resolve(options.dir, `${cacheHash}.json`);

				if (existsSync(cacheFilePath)) {
					return { data: JSON.parse(readFileSync(cacheFilePath, 'utf-8')) };
				}

				const cachedJson = await client[prop](...args).then(
					(response) => response.data
				);

				writeJson(cacheFilePath, cachedJson);

				return { data: cachedJson };
			};
		},
	});
}
