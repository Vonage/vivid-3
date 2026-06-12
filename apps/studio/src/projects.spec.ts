import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
	createProject,
	deleteProject,
	getProject,
	lastOpenedProject,
	listProjects,
	markOpened,
	updateProject,
} from './projects';

describe('projects', () => {
	beforeEach(() => {
		localStorage.clear();
		vi.useFakeTimers();
		vi.setSystemTime(1000);
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it('creates a project and persists it', () => {
		const project = createProject('My app', '<p>hi</p>');

		expect(project.name).toBe('My app');
		expect(project.html).toBe('<p>hi</p>');
		expect(project.theme).toBe('light');
		expect(project.createdAt).toBe(1000);
		expect(getProject(project.id)).toEqual(project);
	});

	it('marks a new project as last opened', () => {
		const project = createProject('My app', '');
		expect(lastOpenedProject()?.id).toBe(project.id);
	});

	it('lists projects most recently updated first', () => {
		const first = createProject('First', '');
		vi.setSystemTime(2000);
		const second = createProject('Second', '');
		vi.setSystemTime(3000);
		updateProject(first.id, { html: '<p>updated</p>' });

		expect(listProjects().map((p) => p.name)).toEqual(['First', 'Second']);
		expect(second.updatedAt).toBe(2000);
	});

	it('updates fields and bumps updatedAt', () => {
		const project = createProject('My app', '');
		vi.setSystemTime(5000);
		updateProject(project.id, { name: 'Renamed', theme: 'dark' });

		const stored = getProject(project.id)!;
		expect(stored.name).toBe('Renamed');
		expect(stored.theme).toBe('dark');
		expect(stored.updatedAt).toBe(5000);
		expect(stored.createdAt).toBe(1000);
	});

	it('ignores updates to unknown projects', () => {
		createProject('My app', '');
		expect(() => updateProject('nope', { name: 'x' })).not.toThrow();
		expect(listProjects()).toHaveLength(1);
	});

	it('deletes a project and clears last opened', () => {
		const project = createProject('My app', '');
		deleteProject(project.id);

		expect(getProject(project.id)).toBeUndefined();
		expect(lastOpenedProject()).toBeUndefined();
	});

	it('keeps last opened when deleting another project', () => {
		const keep = createProject('Keep', '');
		const remove = createProject('Remove', '');
		markOpened(keep.id);
		deleteProject(remove.id);

		expect(lastOpenedProject()?.id).toBe(keep.id);
	});

	it('starts fresh when storage is corrupt', () => {
		localStorage.setItem('vivid-studio.v1', '{not json');
		expect(listProjects()).toEqual([]);
	});
});
