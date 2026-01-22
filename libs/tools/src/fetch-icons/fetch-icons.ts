import { join, resolve } from 'node:path';
import { walk } from 'figmash';
import { getClient } from './cached-client';
import type { FileResponse } from 'figma-js';

import type { DocumentNode } from '@figma/rest-api-spec';
import { writeJson } from '../shared/write-json.util';
import { writeFile } from '../shared/write-file.util';
import { FetchIconsOptions, IconEntry } from './types';
import { chunkify } from '../shared/chunk-array.util';
import { retry } from '../shared/retry.util';
import isSvg from 'is-svg';
import { kebabCase } from 'change-case';
import { createIconEntry } from './create-icon-entry';
import { readJson } from '../shared/read-json.util';
import { logger } from '../shared/logger.util';

export async function fetchIcons(
	figmaFileId: string,
	userOptions?: Partial<FetchIconsOptions>
): Promise<IconEntry[]> {
	const options: FetchIconsOptions = {
		cacheOptions: {
			dir: '.local',
			...userOptions?.cacheOptions,
		},
		createEntry: createIconEntry,
		dir: './src/icons/',
		filter: (node) => node.name.includes('icon'),
		forceUpdate: false,
		indexFileName: 'index.json',
		outputs: [
			{
				fileName: (entry) =>
					`${kebabCase([entry.name, entry.style].join(' '))}.svg`,
				template: (_entry, svg) => svg,
			},
		],
		...userOptions,
	};

	const client = getClient(!options.forceUpdate, options.cacheOptions);
	const file: FileResponse = await client.file(figmaFileId).then((r) => r.data);
	const { document } = file;
	const iconsMap: Map<string, IconEntry> = new Map();
	const fetchedIcons =
		readJson<IconEntry[]>(resolve(options.dir, options.indexFileName)) || [];
	const fetchedIconsIds = fetchedIcons.map((icon) => icon.figmaNodeId);

	// Walk recursively through the document tree and find all icon components.
	walk(document as DocumentNode, (node, path) => {
		if (options.filter(node, path)) {
			const entry = options.createEntry(node, path, file);

			iconsMap.set(node.id, entry);
		}
	});

	logger.info(`Found ${iconsMap.size} icons in ${file.name} Figma file.`);

	const ids = Array.from(iconsMap.values()).map((i) => i.figmaNodeId);

	// Split IDs into chunks of 500 (Figma API limit) and fetch image URLs for each chunk.
	const chunked = chunkify(ids, 500);

	// For each icon in a chunk get its image URL.
	for (const chunkedIds of chunked) {
		const imageLinks = await client
			.fileImages(figmaFileId, {
				ids: chunkedIds,
				format: 'svg',
				scale: 1,
				svg_simplify_stroke: true,
			})
			.then((r) => {
				return r.data.images;
			});

		for (const [id, url] of Object.entries(imageLinks)) {
			const entry = iconsMap.get(id);
			if (!entry) continue;
			entry.imageUrl = url;
			iconsMap.set(id, entry);
		}
	}

	// Validate whether all icon have their image URLs.
	for (const [id, entry] of iconsMap.entries()) {
		if (!entry.imageUrl) {
			logger.error(`No image URL for icon: ${entry.name} (${id})`);
			process.exit(1);
		}
	}

	logger.info('Everything seems fine. all icons has their image URLs.');

	// Save all metadata to index.json file for later usage. (e.g. search or icon library).
	writeJson(
		resolve(options.dir, options.indexFileName),
		Array.from(iconsMap.values())
	);

	logger.success('Wrote index.json file with all icons metadata.');

	// Now, fetch each SVG source and generate Fast Element icon component.
	for (const entry of iconsMap.values()) {
		if (!options.forceUpdate && fetchedIconsIds.includes(entry.figmaNodeId)) {
			logger.debug(
				`Icon ${entry.name} (${entry.style}) already exists. Skipping.`
			);
			continue;
		}

		// Fetch SVG source with retry logic to avoid fetching incomplete or malformed SVGs.
		const svgSource = await retry(
			async () => {
				const response = await fetch(entry.imageUrl);
				return await response.text();
			},
			(result) => isSvg(result)
		).catch(() => {
			iconsMap.delete(entry.figmaNodeId);
			logger.error(
				`Failed to fetch SVG for icon: ${entry.name} (${entry.figmaNodeId})`
			);
		});

		if (!svgSource) continue;

		for (const output of options.outputs) {
			const fileName = output.fileName(entry);
			const filePath = resolve(options.dir, fileName);
			const fileContent = output.template(entry, svgSource);
			if (fileContent === undefined) continue;
			writeFile(filePath, fileContent);

			logger.success(`Wrote icon file: ${join(options.dir, fileName)}`);
		}
	}

	return Array.from(iconsMap.values());
}
