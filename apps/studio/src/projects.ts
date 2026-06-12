import type { ChatTurn } from './ai';

export interface Project {
	id: string;
	name: string;
	html: string;
	theme: 'light' | 'dark';
	/** AI generation conversation history (user prompts + generated HTML). */
	chat?: ChatTurn[];
	createdAt: number;
	updatedAt: number;
}

const STORAGE_KEY = 'vivid-studio.v1';

interface StoreShape {
	projects: Project[];
	lastOpenedId: string | null;
}

function load(): StoreShape {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (raw) return JSON.parse(raw) as StoreShape;
	} catch {
		// Corrupt storage — start fresh.
	}
	return { projects: [], lastOpenedId: null };
}

function save(store: StoreShape): void {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

export function listProjects(): Project[] {
	return load().projects.sort((a, b) => b.updatedAt - a.updatedAt);
}

export function getProject(id: string): Project | undefined {
	return load().projects.find((p) => p.id === id);
}

export function lastOpenedProject(): Project | undefined {
	const store = load();
	return store.projects.find((p) => p.id === store.lastOpenedId);
}

export function createProject(name: string, html: string): Project {
	const store = load();
	const now = Date.now();
	const project: Project = {
		id: crypto.randomUUID(),
		name,
		html,
		theme: 'light',
		createdAt: now,
		updatedAt: now,
	};
	store.projects.push(project);
	store.lastOpenedId = project.id;
	save(store);
	return project;
}

export function updateProject(
	id: string,
	patch: Partial<Pick<Project, 'name' | 'html' | 'theme' | 'chat'>>
): void {
	const store = load();
	const project = store.projects.find((p) => p.id === id);
	if (!project) return;
	Object.assign(project, patch, { updatedAt: Date.now() });
	save(store);
}

export function deleteProject(id: string): void {
	const store = load();
	store.projects = store.projects.filter((p) => p.id !== id);
	if (store.lastOpenedId === id) store.lastOpenedId = null;
	save(store);
}

export function markOpened(id: string): void {
	const store = load();
	store.lastOpenedId = id;
	save(store);
}
