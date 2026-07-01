import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import type { Plugin } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Vite plugin that serves icons from the local filesystem instead of the CDN.
 * The setup file intercepts fetch requests to the icon CDN and redirects them
 * to `/__icons__/`, which this plugin serves from the generated icons directory.
 */
export default function ServeLocalIcons(): Plugin {
	const iconsDir = path.resolve(__dirname, '../../icons/src/generated');

	return {
		name: 'serve-local-icons',
		configureServer(server) {
			server.middlewares.use('/__icons__', (req, res) => {
				const fileName = (req.url || '').replace(/^\//, '');
				const filePath = path.join(iconsDir, fileName);
				if (fs.existsSync(filePath)) {
					res.setHeader('Content-Type', 'image/svg+xml');
					res.end(fs.readFileSync(filePath, 'utf-8'));
				} else {
					res.statusCode = 404;
					res.end('Not found');
				}
			});
		},
	};
}
