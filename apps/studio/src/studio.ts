import { generateUi, type ChatTurn } from './ai';
import { groupedCatalog } from './catalog';
import { createEditor, type StudioEditor } from './editor';
import { buildStandaloneHtml, downloadHtml } from './export';
import {
	deleteProject,
	getProject,
	listProjects,
	markOpened,
	updateProject,
	type Project,
} from './projects';
import { templates } from './templates';

type Device = 'desktop' | 'tablet' | 'mobile';

export interface StudioCallbacks {
	onHome: () => void;
	onNewFromTemplate: (templateId: string) => void;
	onOpenProject: (project: Project) => void;
}

export function renderStudio(
	root: HTMLElement,
	project: Project,
	callbacks: StudioCallbacks
): void {
	markOpened(project.id);
	let theme = project.theme;
	let device: Device = 'desktop';

	root.innerHTML = `
		<div class="studio">
			<header class="studio-header">
				<span class="brand" id="brand" title="Back to home">
					<vwc-icon name="sparkles-line" class="accent"></vwc-icon>
					VIVID<span class="accent">STUDIO</span>
				</span>
				<vwc-divider orientation="vertical" style="block-size: 24px;"></vwc-divider>
				<vwc-text-field
					id="project-name"
					class="project-name-field"
					aria-label="Project name"
					value="${escapeAttr(project.name)}"
					appearance="ghost"
					scale="condensed"
				></vwc-text-field>
				<vwc-badge id="save-state" text="Saved" appearance="subtle" connotation="success" scale="condensed"></vwc-badge>
				<span class="spacer"></span>

				<vwc-menu id="new-menu" placement="bottom-end" trigger="auto" auto-dismiss>
					<vwc-button slot="anchor" label="New" icon="plus-line" appearance="outlined" scale="condensed" dropdown-indicator></vwc-button>
					${templates
						.map(
							(t) =>
								`<vwc-menu-item text="${escapeAttr(t.name)}" text-secondary="${escapeAttr(t.description)}" icon="${t.icon}" data-template-id="${t.id}"></vwc-menu-item>`
						)
						.join('')}
				</vwc-menu>

				<vwc-menu id="open-menu" placement="bottom-end" trigger="auto" auto-dismiss>
					<vwc-button slot="anchor" label="Open" icon="inbox-line" appearance="outlined" scale="condensed" dropdown-indicator></vwc-button>
					<div id="open-menu-items"></div>
				</vwc-menu>

				<vwc-button id="delete-button" icon="delete-line" aria-label="Delete project" appearance="ghost" scale="condensed" connotation="alert"></vwc-button>
				<vwc-divider orientation="vertical" style="block-size: 24px;"></vwc-divider>
				<vwc-button id="export-button" label="Export HTML" icon="download-line" appearance="filled" connotation="cta" scale="condensed"></vwc-button>
			</header>

			<aside class="palette">
				<div class="palette-search">
					<vwc-text-field
						id="palette-search"
						placeholder="Search ${'components'}…"
						icon="search-line"
						aria-label="Search components"
						scale="condensed"
					></vwc-text-field>
					<vwc-button
						id="palette-toggle"
						icon="double-chevron-left-line"
						aria-label="Collapse components panel"
						aria-expanded="true"
						appearance="ghost"
						scale="condensed"
					></vwc-button>
				</div>
				<div class="palette-list" id="palette-list"></div>
			</aside>

			<div class="workbench" id="workbench">
				<section class="editor-pane">
					<div class="pane-toolbar">
						<vwc-icon name="code-line"></vwc-icon>
						<span>index.html</span>
						<span class="spacer"></span>
						<span id="component-count"></span>
						<vwc-button
							id="editor-toggle"
							icon="double-chevron-left-line"
							aria-label="Collapse code editor"
							aria-expanded="true"
							appearance="ghost"
							scale="condensed"
						></vwc-button>
					</div>
					<div class="editor-host" id="editor-host"></div>
					<div class="ai-bar">
						<vwc-note id="ai-error" connotation="alert" icon="info-solid" hidden></vwc-note>
						<div class="ai-bar-row">
							<vwc-text-field
								id="ai-prompt"
								placeholder="Describe the UI to build — e.g. “an application settings page”"
								icon="sparkles-line"
								aria-label="Describe the UI to generate"
								scale="condensed"
							></vwc-text-field>
							<vwc-button
								id="ai-generate"
								label="Generate"
								icon="ai-solid"
								appearance="filled"
								connotation="cta"
								scale="condensed"
							></vwc-button>
						</div>
						<div class="ai-hint" id="ai-hint">
							Generates with Claude, replacing the editor content. Follow-up
							prompts refine the current design.
						</div>
					</div>
				</section>

				<div class="splitter" id="splitter" role="separator" aria-label="Resize panes"></div>

				<section class="preview-pane">
					<div class="pane-toolbar">
						<vwc-icon name="eye-line"></vwc-icon>
						<span>Preview</span>
						<span class="spacer"></span>
						<vwc-button id="device-desktop" icon="laptop-line" aria-label="Desktop preview" appearance="filled" scale="condensed"></vwc-button>
						<vwc-button id="device-tablet" icon="mobile-devices-line" aria-label="Tablet preview" appearance="ghost" scale="condensed"></vwc-button>
						<vwc-button id="device-mobile" icon="mobile-line" aria-label="Mobile preview" appearance="ghost" scale="condensed"></vwc-button>
					<vwc-divider orientation="vertical" style="block-size: 20px;"></vwc-divider>
						<vwc-switch id="theme-switch" label="Dark" ${theme === 'dark' ? 'checked' : ''}></vwc-switch>
					</div>
					<div class="preview-scroll">
						<div class="preview-frame-wrap" id="frame-wrap">
							<iframe id="preview-frame" src="/preview.html" title="Live preview"></iframe>
						</div>
					</div>
				</section>
			</div>
		</div>
	`;

	const query = <T extends HTMLElement>(selector: string): T =>
		root.querySelector(selector) as T;

	/* ---------- Preview wiring ---------- */
	const frame = query<HTMLIFrameElement>('#preview-frame');
	let previewReady = false;

	function pushPreview(): void {
		if (!previewReady) return;
		frame.contentWindow?.postMessage(
			{ type: 'vivid-studio:render', html: editor.getValue(), theme },
			window.location.origin
		);
		updateComponentCount();
	}

	window.addEventListener('message', (event: MessageEvent) => {
		if (event.origin !== window.location.origin) return;
		if (
			(event.data as { type?: string } | null)?.type === 'vivid-studio:ready'
		) {
			previewReady = true;
			pushPreview();
		}
	});

	/* ---------- Editor ---------- */
	const saveBadge = query('#save-state');
	let saveTimer: ReturnType<typeof setTimeout> | undefined;
	let previewTimer: ReturnType<typeof setTimeout> | undefined;

	const editor: StudioEditor = createEditor(
		query('#editor-host'),
		project.html,
		(value) => {
			saveBadge.setAttribute('text', 'Editing…');
			saveBadge.setAttribute('connotation', 'warning');
			clearTimeout(previewTimer);
			previewTimer = setTimeout(pushPreview, 200);
			clearTimeout(saveTimer);
			saveTimer = setTimeout(() => {
				updateProject(project.id, { html: value });
				saveBadge.setAttribute('text', 'Saved');
				saveBadge.setAttribute('connotation', 'success');
			}, 500);
		}
	);

	function updateComponentCount(): void {
		const tags = new Set(
			[...editor.getValue().matchAll(/<vwc-([a-z0-9-]+)/g)].map((m) => m[1])
		);
		query('#component-count').textContent =
			tags.size === 0
				? ''
				: `${tags.size} Vivid component${tags.size === 1 ? '' : 's'}`;
	}
	updateComponentCount();

	/* ---------- Palette ---------- */
	const paletteList = query('#palette-list');

	function renderPalette(filter = ''): void {
		const groups = groupedCatalog(filter);
		if (groups.size === 0) {
			paletteList.innerHTML = `<div class="palette-empty">No components match “${escapeHtml(filter)}”</div>`;
			return;
		}
		paletteList.innerHTML = [...groups.entries()]
			.map(
				([category, entries]) => `
				<div class="palette-category">${category}</div>
				${entries
					.map(
						(entry) => `
					<div class="palette-item" draggable="true" data-name="${entry.name}" title="${escapeAttr(entry.description || entry.title)}">
						<vwc-icon class="item-icon" name="${entry.icon}"></vwc-icon>
						<span class="item-title">${entry.title}</span>
					</div>`
					)
					.join('')}`
			)
			.join('');

		for (const item of paletteList.querySelectorAll<HTMLElement>(
			'.palette-item'
		)) {
			const entry = [...groups.values()]
				.flat()
				.find((e) => e.name === item.dataset.name)!;
			item.addEventListener('click', () => editor.insertSnippet(entry.snippet));
			item.addEventListener('dragstart', (event: DragEvent) => {
				event.dataTransfer?.setData('text/plain', entry.snippet);
			});
		}
	}
	renderPalette();

	query('#palette-search').addEventListener('input', (event) => {
		renderPalette((event.target as HTMLInputElement).value);
	});

	/* ---------- Header actions ---------- */
	query('#brand').addEventListener('click', callbacks.onHome);

	query('#project-name').addEventListener('change', (event) => {
		const name = (event.target as HTMLInputElement).value.trim() || 'Untitled';
		updateProject(project.id, { name });
	});

	for (const item of root.querySelectorAll<HTMLElement>(
		'#new-menu [data-template-id]'
	)) {
		item.addEventListener('click', () =>
			callbacks.onNewFromTemplate(item.dataset.templateId!)
		);
	}

	const openMenu = query('#open-menu');
	openMenu.addEventListener('open', () => {
		const items = listProjects()
			.filter((p) => p.id !== project.id)
			.slice(0, 12);
		query('#open-menu-items').innerHTML =
			items.length === 0
				? '<vwc-menu-item text="No other projects" disabled></vwc-menu-item>'
				: items
						.map(
							(p) =>
								`<vwc-menu-item text="${escapeAttr(p.name)}" icon="code-line" data-project-id="${p.id}"></vwc-menu-item>`
						)
						.join('');
		for (const item of root.querySelectorAll<HTMLElement>(
			'#open-menu-items [data-project-id]'
		)) {
			item.addEventListener('click', () => {
				const target = items.find((p) => p.id === item.dataset.projectId);
				if (target) callbacks.onOpenProject(target);
			});
		}
	});

	query('#delete-button').addEventListener('click', () => {
		deleteProject(project.id);
		callbacks.onHome();
	});

	query('#export-button').addEventListener('click', () => {
		const name = project.name.replace(/[^a-z0-9-]+/gi, '-').toLowerCase();
		downloadHtml(
			`${name || 'prototype'}.html`,
			buildStandaloneHtml(project.name, editor.getValue(), theme)
		);
	});

	/* ---------- Preview toolbar ---------- */
	query('#theme-switch').addEventListener('change', (event) => {
		theme = (event.target as HTMLInputElement).checked ? 'dark' : 'light';
		updateProject(project.id, { theme });
		pushPreview();
	});

	const frameWrap = query('#frame-wrap');
	const deviceButtons: Record<Device, HTMLElement> = {
		desktop: query('#device-desktop'),
		tablet: query('#device-tablet'),
		mobile: query('#device-mobile'),
	};
	for (const [name, button] of Object.entries(deviceButtons)) {
		button.addEventListener('click', () => {
			device = name as Device;
			frameWrap.className = `preview-frame-wrap device-${device}`;
			for (const [other, otherButton] of Object.entries(deviceButtons)) {
				otherButton.setAttribute(
					'appearance',
					other === device ? 'filled' : 'ghost'
				);
			}
		});
	}

	/* ---------- AI generation ---------- */
	const aiPrompt = query('#ai-prompt');
	const aiButton = query('#ai-generate');
	const aiError = query('#ai-error');
	let generating = false;

	async function runGeneration(): Promise<void> {
		const promptText = (aiPrompt as unknown as HTMLInputElement).value.trim();
		if (!promptText || generating) return;

		generating = true;
		aiError.toggleAttribute('hidden', true);
		aiButton.toggleAttribute('pending', true);
		aiPrompt.toggleAttribute('disabled', true);

		const history: ChatTurn[] = [...(getProject(project.id)?.chat ?? [])];
		// If the editor no longer matches the last generated HTML, the user
		// edited by hand — tell the model so refinements build on their version.
		const lastAssistant = [...history]
			.reverse()
			.find((turn) => turn.role === 'assistant');
		const currentHtml = editor.getValue();
		if (lastAssistant && lastAssistant.content.trim() !== currentHtml.trim()) {
			history.push({
				role: 'user',
				content: `I manually edited the code. The current HTML is now:\n\n${currentHtml}`,
			});
		} else if (!lastAssistant && currentHtml.trim()) {
			history.push({
				role: 'user',
				content: `The editor currently contains this HTML, use it as the starting point if relevant:\n\n${currentHtml}`,
			});
		}
		history.push({ role: 'user', content: promptText });

		try {
			const html = await generateUi(history);
			history.push({ role: 'assistant', content: html });
			editor.setValue(html);
			pushPreview();
			updateProject(project.id, { html, chat: history });
			(aiPrompt as unknown as HTMLInputElement).value = '';
		} catch (error) {
			aiError.setAttribute(
				'headline',
				error instanceof Error ? error.message : 'Generation failed'
			);
			aiError.toggleAttribute('hidden', false);
		} finally {
			generating = false;
			aiButton.toggleAttribute('pending', false);
			aiPrompt.toggleAttribute('disabled', false);
		}
	}

	aiButton.addEventListener('click', () => void runGeneration());
	aiPrompt.addEventListener('keydown', (event: KeyboardEvent) => {
		if (event.key === 'Enter') void runGeneration();
	});

	/* ---------- Splitter ---------- */
	const workbench = query('#workbench');
	const splitter = query('#splitter');
	splitter.addEventListener('pointerdown', (event: PointerEvent) => {
		event.preventDefault();
		splitter.classList.add('dragging');
		splitter.setPointerCapture(event.pointerId);
		const bounds = workbench.getBoundingClientRect();
		const onMove = (move: PointerEvent): void => {
			const ratio = Math.min(
				0.8,
				Math.max(0.2, (move.clientX - bounds.left) / bounds.width)
			);
			workbench.style.setProperty(
				'--editor-width',
				`${(ratio * 100).toFixed(1)}%`
			);
		};
		const onUp = (): void => {
			splitter.classList.remove('dragging');
			splitter.removeEventListener('pointermove', onMove);
			splitter.removeEventListener('pointerup', onUp);
		};
		splitter.addEventListener('pointermove', onMove);
		splitter.addEventListener('pointerup', onUp);
	});

	/* ---------- Collapsible panes ---------- */
	const PANES_KEY = 'vivid-studio.panes.v1';
	const panes = ((): { palette: boolean; editor: boolean } => {
		try {
			return {
				palette: false,
				editor: false,
				...(JSON.parse(localStorage.getItem(PANES_KEY) ?? '{}') as object),
			};
		} catch {
			return { palette: false, editor: false };
		}
	})();

	const studioShell = query('.studio');
	const paletteToggle = query('#palette-toggle');
	const editorToggle = query('#editor-toggle');

	function applyPaneState(): void {
		studioShell.classList.toggle('palette-collapsed', panes.palette);
		workbench.classList.toggle('editor-collapsed', panes.editor);
		paletteToggle.setAttribute(
			'icon',
			panes.palette ? 'double-chevron-right-line' : 'double-chevron-left-line'
		);
		paletteToggle.setAttribute(
			'aria-label',
			panes.palette ? 'Expand components panel' : 'Collapse components panel'
		);
		paletteToggle.setAttribute('aria-expanded', String(!panes.palette));
		editorToggle.setAttribute(
			'icon',
			panes.editor ? 'double-chevron-right-line' : 'double-chevron-left-line'
		);
		editorToggle.setAttribute(
			'aria-label',
			panes.editor ? 'Expand code editor' : 'Collapse code editor'
		);
		editorToggle.setAttribute('aria-expanded', String(!panes.editor));
	}
	applyPaneState();

	paletteToggle.addEventListener('click', () => {
		panes.palette = !panes.palette;
		localStorage.setItem(PANES_KEY, JSON.stringify(panes));
		applyPaneState();
	});

	editorToggle.addEventListener('click', () => {
		panes.editor = !panes.editor;
		localStorage.setItem(PANES_KEY, JSON.stringify(panes));
		applyPaneState();
	});

	/* ---------- Shortcuts ---------- */
	root.addEventListener('keydown', (event: KeyboardEvent) => {
		if ((event.metaKey || event.ctrlKey) && event.key === 's') {
			event.preventDefault();
			updateProject(project.id, { html: editor.getValue() });
			saveBadge.setAttribute('text', 'Saved');
			saveBadge.setAttribute('connotation', 'success');
		}
	});
}

function escapeAttr(text: string): string {
	return text.replaceAll('&', '&amp;').replaceAll('"', '&quot;');
}

function escapeHtml(text: string): string {
	return text
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;');
}
