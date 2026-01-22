import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createIconEntry } from './create-icon-entry';
import type { Node } from '@figma/rest-api-spec';
import type { FileResponse } from 'figma-js';

describe('createIconEntry', () => {
	const mockNode = {
		id: '1:1',
		name: 'style=solid',
		type: 'COMPONENT',
		children: [],
	} as Node;

	const mockPath: Node[] = [
		{ id: '0:1', name: 'Page 1', type: 'CANVAS' },
		{ id: '0:2', name: 'alert', type: 'FRAME' }, // Category
		{ id: '0:3', name: 'icon-name', type: 'FRAME' }, // Component Name
		mockNode,
	] as any;

	const mockFile: FileResponse = {
		name: 'Figma File',
		lastModified: '2023-01-01',
		thumbnailUrl: 'http://thumb.url',
		version: '1.0',
		role: 'viewer',
		components: {
			'1:1': {
				key: 'key',
				name: 'icon-name',
				description: 'keyword: tag1, tag2',
			},
		},
		document: { id: '0:0', name: 'Document', type: 'DOCUMENT', children: [] },
		schemaVersion: 0,
		styles: {},
	};

	beforeEach(() => {
		vi.resetAllMocks();
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('should create an icon entry with correct properties', () => {
		const entry = createIconEntry(mockNode, mockPath, mockFile);

		expect(entry).toEqual({
			figmaNodeId: '1:1',
			imageUrl: '',
			figmaComponentName: 'icon-name',
			name: 'icon-name',
			style: 'solid',
			category: 'alert',
			keywords: ['tag1', 'tag2'],
		});
	});

	it('should handle missing description/keywords', () => {
		const fileWithoutDesc = {
			...mockFile,
			components: {
				'1:1': {
					...mockFile.components['1:1'],
					description: '',
				},
			},
		};

		const entry = createIconEntry(mockNode, mockPath, fileWithoutDesc);
		expect(entry.keywords).toEqual(['']);
	});

	it('should handle missing path elements (fallback for name and component name)', () => {
		const shortPath = [mockNode]; // No parent frames
		const entry = createIconEntry(mockNode, shortPath, mockFile);

		expect(entry.figmaComponentName).toBe('[UNKNOWN]');
		expect(entry.name).toBe('1-1'); // Fallback to node ID with replaced colon
		expect(entry.category).toBeUndefined();
	});

	it('should handle missing component data in file response', () => {
		const fileWithoutComponent = {
			...mockFile,
			components: {},
		};

		const entry = createIconEntry(mockNode, mockPath, fileWithoutComponent);
		expect(entry.keywords).toEqual(['']);
	});

	it('should parse style from node name', () => {
		const lineNode = { ...mockNode, name: 'style=line' };
		const entry = createIconEntry(lineNode, mockPath, mockFile);
		expect(entry.style).toBe('line');
	});
});
