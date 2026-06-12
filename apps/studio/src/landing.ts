import { listProjects, type Project } from './projects';

const FEATURES = [
	'85 Vivid components',
	'Live preview',
	'Light & dark themes',
	'Responsive frames',
	'One-click HTML export',
];

export function renderLanding(
	root: HTMLElement,
	onEnter: () => void,
	onOpenProject: (project: Project) => void
): void {
	root.innerHTML = `
		<div class="landing">
			<div class="landing-inner">
				<div class="landing-logo">
					<vwc-icon name="sparkles-line"></vwc-icon>
					<span>Vonage · Vivid Design System</span>
				</div>
				<h1>Vivid Studio</h1>
				<p class="tagline">
					Prototype real product UI in seconds. Compose, tweak and preview
					every Vivid component live in your browser — then export clean,
					standalone HTML.
				</p>
				<div class="landing-features">
					${FEATURES.map(
						(f) =>
							`<vwc-badge text="${f}" appearance="subtle" connotation="cta" shape="pill"></vwc-badge>`
					).join('')}
				</div>
				<vwc-button
					id="enter-button"
					label="Enter Studio"
					icon="rocket-solid"
					appearance="filled"
					connotation="cta"
					size="expanded"
					shape="pill"
				></vwc-button>
				<div class="landing-recents" id="recents"></div>
			</div>
		</div>
	`;

	root
		.querySelector('#enter-button')!
		.addEventListener('click', () => onEnter());

	const recents = listProjects().slice(0, 6);
	if (recents.length > 0) {
		const container = root.querySelector('#recents')!;
		container.innerHTML = `
			<h2>Recent projects</h2>
			<div class="recent-grid">
				${recents
					.map(
						(p) => `
					<vwc-card
						class="recent-card"
						headline="${escapeAttr(p.name)}"
						subtitle="Edited ${timeAgo(p.updatedAt)}"
						appearance="outlined"
						data-project-id="${p.id}"
					></vwc-card>`
					)
					.join('')}
			</div>
		`;
		for (const card of container.querySelectorAll<HTMLElement>(
			'.recent-card'
		)) {
			card.addEventListener('click', () => {
				const project = recents.find((p) => p.id === card.dataset.projectId);
				if (project) onOpenProject(project);
			});
		}
	}
}

function timeAgo(timestamp: number): string {
	const seconds = Math.floor((Date.now() - timestamp) / 1000);
	if (seconds < 60) return 'just now';
	const minutes = Math.floor(seconds / 60);
	if (minutes < 60) return `${minutes}m ago`;
	const hours = Math.floor(minutes / 60);
	if (hours < 24) return `${hours}h ago`;
	return `${Math.floor(hours / 24)}d ago`;
}

function escapeAttr(text: string): string {
	return text.replaceAll('&', '&amp;').replaceAll('"', '&quot;');
}
