import * as fs from 'node:fs';
import * as http from 'node:http';
import * as path from 'node:path';
import { createServer as createViteServer } from 'vite';
import vue from '@vitejs/plugin-vue';
import { NodePackageImporter } from 'sass';
import * as indexHandler from './index/handler.js';
import * as wcHandler from './wc/handler.js';
import * as vueHandler from './vue/handler.js';

const DEV_SERVER_ROOT = path.resolve(import.meta.dirname, '..');
const COMPONENTS_SRC = path.resolve(
	DEV_SERVER_ROOT,
	'../../libs/components/src'
);
const VUE_WRAPPERS_SRC = path.resolve(
	DEV_SERVER_ROOT,
	'../../libs/vue-wrappers/src'
);
const MONOREPO_ROOT = path.resolve(DEV_SERVER_ROOT, '../..');
const PORT = Number(process.env.PORT) || 5200;

async function start() {
	const exampleDirs = [wcHandler.EXAMPLES_DIR, vueHandler.EXAMPLES_DIR];

	const vite = await createViteServer({
		configFile: false,
		root: DEV_SERVER_ROOT,
		define: {
			__PACKAGE_VERSION__: JSON.stringify('dev'),
			__IMPORT_META_ENV_PLACEHOLDER__: 'import.meta.env',
		},
		resolve: {
			alias: {
				'@vonage/vivid': path.join(COMPONENTS_SRC, 'index.ts'),
				'@vonage/vivid-vue': path.join(VUE_WRAPPERS_SRC, 'index.ts'),
				vue3: 'vue',
			},
			dedupe: ['vue'],
		},
		css: {
			preprocessorOptions: {
				scss: {
					importers: [new NodePackageImporter()],
				},
			},
		},
		server: {
			middlewareMode: true,
			fs: {
				allow: [MONOREPO_ROOT],
			},
		},
		appType: 'custom',
		plugins: [
			vue(),
			{
				name: 'example-watcher',
				configureServer(server) {
					for (const dir of exampleDirs) {
						if (fs.existsSync(dir)) {
							server.watcher.add(dir);
						}
					}
					const isExampleFile = (p: string) =>
						exampleDirs.some((dir) => p.startsWith(dir));
					server.watcher.on('change', (changedPath) => {
						if (isExampleFile(changedPath)) {
							server.hot.send({ type: 'full-reload' });
						}
					});
					server.watcher.on('add', (addedPath) => {
						if (isExampleFile(addedPath)) {
							server.hot.send({ type: 'full-reload' });
						}
					});
				},
			},
		],
	});

	const handlers = [
		indexHandler.handleRequest,
		wcHandler.handleRequest,
		vueHandler.handleRequest,
	];

	const server = http.createServer(async (req, res) => {
		try {
			const url = new URL(req.url ?? '/', `http://localhost:${PORT}`);

			// Try Vite's middleware first (HMR, modules, static files)
			const handled = await new Promise<boolean>((resolve) => {
				vite.middlewares(req, res, () => resolve(false));
				res.on('close', () => {
					if (res.writableEnded) resolve(true);
				});
			});
			if (handled) return;

			// Try each handler
			let pageHtml: string | null = null;
			for (const handle of handlers) {
				pageHtml = handle(url.pathname);
				if (pageHtml) break;
			}

			if (pageHtml) {
				const html = await vite.transformIndexHtml(req.url!, pageHtml);
				res.writeHead(200, { 'Content-Type': 'text/html' });
				res.end(html);
				return;
			}

			// 404
			res.writeHead(404, { 'Content-Type': 'text/plain' });
			res.end('Not found');
		} catch (e) {
			vite.ssrFixStacktrace(e as Error);
			vite.config.logger.error(String(e));
			res.writeHead(500, { 'Content-Type': 'text/plain' });
			res.end('Internal server error');
		}
	});

	server.listen(PORT, () => {
		vite.config.logger.info(
			[
				'',
				'  Vivid Dev Server',
				`  → http://localhost:${PORT}`,
				'',
				'  Web Components → apps/dev-server/examples-wc/*.html',
				'  Vue            → apps/dev-server/examples-vue/*.vue',
				'',
			].join('\n')
		);
	});
}

start();
