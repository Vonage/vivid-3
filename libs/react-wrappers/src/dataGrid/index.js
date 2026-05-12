/* global HTMLElement */
import { createRoot } from 'react-dom/client';

/**
 * Renders the cell contents using React 18.x api
 *
 * @param {ReactNode} children - renderer contents
 * @param {Container & { rootRenderer?: Root }} container - HTMLElement root container
 */
export const cellRendererFactory = (children, container) => {
	const root = container?.rootRenderer ?? createRoot(container);

	root.render(children);
	container.rootRenderer = root;
};
