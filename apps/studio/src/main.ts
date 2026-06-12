import { initChrome } from './vivid-chrome';
import './styles/studio.css';
import { renderLanding } from './landing';
import { renderStudio } from './studio';
import { createProject, lastOpenedProject, type Project } from './projects';
import { templates } from './templates';

initChrome();

const root = document.getElementById('app')!;

function showLanding(): void {
	renderLanding(root, enterStudio, openProject);
}

function enterStudio(): void {
	const project = lastOpenedProject() ?? newFromTemplate('blank');
	openProject(project);
}

function newFromTemplate(templateId: string): Project {
	const template = templates.find((t) => t.id === templateId) ?? templates[0];
	return createProject(template.name, template.html);
}

function openProject(project: Project): void {
	renderStudio(root, project, {
		onHome: showLanding,
		onNewFromTemplate: (templateId) => openProject(newFromTemplate(templateId)),
		onOpenProject: openProject,
	});
}

showLanding();
