import * as path from 'path';
import { DefaultTheme } from 'vitepress';
import { existsSync } from 'fs';

const ExamplesFolder = path.resolve(path.join(__dirname, '..', 'examples'));

export function getComponentsMenu(
	menu: DefaultTheme.SidebarItem[]
): DefaultTheme.SidebarItem[] {
	return menu.map(({ text, link }) => {
		const componentName = path.parse(link).base;

		return {
			text,
			link,
			items: existsSync(path.join(ExamplesFolder, componentName))
				? [{ text: 'Examples', link: `/examples/${componentName}` }]
				: [],
		};
	});
}
