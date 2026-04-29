import { Home } from '@ui/Home';
import { createRoot } from 'react-dom/client';
import 'figma-kit/styles.css';
import 'figma-kit/figma-development-theme.css';

(async () => {
	const rootElement = document.getElementById('root');
	if (!rootElement) return;

	const rootNode = createRoot(rootElement);
	rootNode.render(<Home />);
})();
