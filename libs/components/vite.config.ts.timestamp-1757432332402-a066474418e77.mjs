// vite.config.ts
import * as path2 from 'path';
import * as fs2 from 'fs';
import { viteStaticCopy } from 'file:///Users/jstaylor/Documents/Development/aug2025/vivid-3/node_modules/vite-plugin-static-copy/dist/index.js';
import {
	defineConfig as defineConfig2,
	mergeConfig as mergeConfig2,
} from 'file:///Users/jstaylor/Documents/Development/aug2025/vivid-3/node_modules/vite/dist/node/index.js';
import dts from 'file:///Users/jstaylor/Documents/Development/aug2025/vivid-3/node_modules/vite-plugin-dts/dist/index.mjs';

// vite.config.base.ts
import * as path from 'path';
import * as fs from 'fs';
import {
	defineConfig,
	mergeConfig,
} from 'file:///Users/jstaylor/Documents/Development/aug2025/vivid-3/node_modules/vite/dist/node/index.js';
import { NodePackageImporter } from 'file:///Users/jstaylor/Documents/Development/aug2025/vivid-3/node_modules/sass/sass.node.mjs';
import vitestBaseConfig from 'file:///Users/jstaylor/Documents/Development/aug2025/vivid-3/libs/vitest-config/dist/jsdom-config.mjs';
var __vite_injected_original_dirname =
	'/Users/jstaylor/Documents/Development/aug2025/vivid-3/libs/components';
var packageVersion = JSON.parse(
	fs.readFileSync(
		path.join(__vite_injected_original_dirname, 'package.json'),
		'utf-8'
	)
).version;
var isWatchMode = process.env.WATCH_MODE === 'true';
var vite_config_base_default = mergeConfig(
	vitestBaseConfig,
	defineConfig({
		build: {
			outDir: 'dist',
			cssMinify: true,
			target: 'esnext',
			watch: isWatchMode
				? {
						exclude: ['**/*.md'],
				  }
				: null,
		},
		define: {
			__PACKAGE_VERSION__: JSON.stringify(packageVersion),
		},
		css: {
			preprocessorOptions: {
				scss: {
					api: 'modern-compiler',
					importers: [new NodePackageImporter()],
				},
			},
		},
	})
);

// vite.config.ts
function generateRollupInput() {
	const locales = fs2.readdirSync('./src/locales');
	const components = fs2
		.readdirSync('./src/lib/', {
			withFileTypes: true,
		})
		.filter((entry) => entry.isDirectory())
		.map((entry) => entry.name);
	return {
		index: 'src/index.ts',
		...Object.fromEntries(
			locales.map((locale) => [
				`locales/${path2.parse(locale).name}`,
				`src/locales/${locale}`,
			])
		),
		// Force vite to split up the build. This is important to enable tree-shaking
		...Object.fromEntries(
			components.map((componentName) => [
				`${componentName}/definition`,
				`src/lib/${componentName}/definition.ts`,
			])
		),
	};
}
var input = generateRollupInput();
var isWatchMode2 = process.env.WATCH_MODE === 'true';
var vite_config_default = mergeConfig2(
	vite_config_base_default,
	defineConfig2({
		test: {
			setupFiles: ['vitest.setup.ts'],
			pool: 'threads',
			poolOptions: {
				threads: {
					useAtomics: true,
				},
			},
		},
		plugins: [
			viteStaticCopy({
				targets: [
					{
						src: './api-extractor.json',
						dest: '.',
					},
					{
						src: './custom-elements.json',
						dest: '.',
					},
					{
						src: './.npmignore',
						dest: '.',
					},
					{
						src: './README.md',
						dest: '.',
					},
					{
						src: `${
							new URL(await import.meta.resolve('@repo/styles/dist')).pathname
						}/*`,
						dest: './styles',
					},
				],
			}),
			!isWatchMode2
				? dts({
						skipDiagnostics: true,
				  })
				: void 0,
		],
		build: {
			emptyOutDir: true,
			lib: {
				entry: input,
				name: 'components',
				formats: ['es', 'cjs'],
			},
			minify: false,
			rollupOptions: {
				external: [
					'@microsoft/fast-element',
					'@microsoft/fast-web-utilities',
					'video.js',
					'@floating-ui/dom',
					'dropzone',
					'prosemirror-state',
					'prosemirror-model',
					'prosemirror-view',
					'prosemirror-keymap',
					'prosemirror-commands',
					'prosemirror-schema-basic',
					'date-fns',
					'ramda',
					'uuid',
				],
				input,
				output: [
					{
						format: 'es',
						chunkFileNames: 'unbundled/[name].js',
					},
					{
						format: 'cjs',
						chunkFileNames: 'unbundled/[name].cjs',
					},
				],
			},
		},
	})
);
export { vite_config_default as default };
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAidml0ZS5jb25maWcuYmFzZS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9qc3RheWxvci9Eb2N1bWVudHMvRGV2ZWxvcG1lbnQvYXVnMjAyNS92aXZpZC0zL2xpYnMvY29tcG9uZW50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2pzdGF5bG9yL0RvY3VtZW50cy9EZXZlbG9wbWVudC9hdWcyMDI1L3ZpdmlkLTMvbGlicy9jb21wb25lbnRzL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9qc3RheWxvci9Eb2N1bWVudHMvRGV2ZWxvcG1lbnQvYXVnMjAyNS92aXZpZC0zL2xpYnMvY29tcG9uZW50cy92aXRlLmNvbmZpZy50c1wiOy8vLyA8cmVmZXJlbmNlIHR5cGVzPVwidml0ZXN0L2NvbmZpZ1wiIC8+XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0ICogYXMgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHsgdml0ZVN0YXRpY0NvcHkgfSBmcm9tICd2aXRlLXBsdWdpbi1zdGF0aWMtY29weSc7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcsIG1lcmdlQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgZHRzIGZyb20gJ3ZpdGUtcGx1Z2luLWR0cyc7XG5pbXBvcnQgYmFzZUNvbmZpZyBmcm9tICcuL3ZpdGUuY29uZmlnLmJhc2UnO1xuXG5mdW5jdGlvbiBnZW5lcmF0ZVJvbGx1cElucHV0KCkge1xuXHRjb25zdCBsb2NhbGVzID0gZnMucmVhZGRpclN5bmMoJy4vc3JjL2xvY2FsZXMnKTtcblx0Y29uc3QgY29tcG9uZW50cyA9IGZzXG5cdFx0LnJlYWRkaXJTeW5jKCcuL3NyYy9saWIvJywge1xuXHRcdFx0d2l0aEZpbGVUeXBlczogdHJ1ZSxcblx0XHR9KVxuXHRcdC5maWx0ZXIoKGVudHJ5KSA9PiBlbnRyeS5pc0RpcmVjdG9yeSgpKVxuXHRcdC5tYXAoKGVudHJ5KSA9PiBlbnRyeS5uYW1lKTtcblxuXHRyZXR1cm4ge1xuXHRcdGluZGV4OiAnc3JjL2luZGV4LnRzJyxcblx0XHQuLi5PYmplY3QuZnJvbUVudHJpZXMoXG5cdFx0XHRsb2NhbGVzLm1hcCgobG9jYWxlKSA9PiBbXG5cdFx0XHRcdGBsb2NhbGVzLyR7cGF0aC5wYXJzZShsb2NhbGUpLm5hbWV9YCxcblx0XHRcdFx0YHNyYy9sb2NhbGVzLyR7bG9jYWxlfWAsXG5cdFx0XHRdKVxuXHRcdCksXG5cdFx0Ly8gRm9yY2Ugdml0ZSB0byBzcGxpdCB1cCB0aGUgYnVpbGQuIFRoaXMgaXMgaW1wb3J0YW50IHRvIGVuYWJsZSB0cmVlLXNoYWtpbmdcblx0XHQuLi5PYmplY3QuZnJvbUVudHJpZXMoXG5cdFx0XHRjb21wb25lbnRzLm1hcCgoY29tcG9uZW50TmFtZSkgPT4gW1xuXHRcdFx0XHRgJHtjb21wb25lbnROYW1lfS9kZWZpbml0aW9uYCxcblx0XHRcdFx0YHNyYy9saWIvJHtjb21wb25lbnROYW1lfS9kZWZpbml0aW9uLnRzYCxcblx0XHRcdF0pXG5cdFx0KSxcblx0fTtcbn1cblxuY29uc3QgaW5wdXQgPSBnZW5lcmF0ZVJvbGx1cElucHV0KCk7XG5cbmNvbnN0IGlzV2F0Y2hNb2RlID0gcHJvY2Vzcy5lbnYuV0FUQ0hfTU9ERSA9PT0gJ3RydWUnO1xuXG5leHBvcnQgZGVmYXVsdCBtZXJnZUNvbmZpZyhcblx0YmFzZUNvbmZpZyxcblx0ZGVmaW5lQ29uZmlnKHtcblx0XHR0ZXN0OiB7XG5cdFx0XHRzZXR1cEZpbGVzOiBbJ3ZpdGVzdC5zZXR1cC50cyddLFxuXG5cdFx0XHRwb29sOiAndGhyZWFkcycsXG5cdFx0XHRwb29sT3B0aW9uczoge1xuXHRcdFx0XHR0aHJlYWRzOiB7XG5cdFx0XHRcdFx0dXNlQXRvbWljczogdHJ1ZSxcblx0XHRcdFx0fSxcblx0XHRcdH0sXG5cdFx0fSxcblxuXHRcdHBsdWdpbnM6IFtcblx0XHRcdHZpdGVTdGF0aWNDb3B5KHtcblx0XHRcdFx0dGFyZ2V0czogW1xuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHNyYzogJy4vYXBpLWV4dHJhY3Rvci5qc29uJyxcblx0XHRcdFx0XHRcdGRlc3Q6ICcuJyxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHNyYzogJy4vY3VzdG9tLWVsZW1lbnRzLmpzb24nLFxuXHRcdFx0XHRcdFx0ZGVzdDogJy4nLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0c3JjOiAnLi8ubnBtaWdub3JlJyxcblx0XHRcdFx0XHRcdGRlc3Q6ICcuJyxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHNyYzogJy4vUkVBRE1FLm1kJyxcblx0XHRcdFx0XHRcdGRlc3Q6ICcuJyxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHNyYzogYCR7XG5cdFx0XHRcdFx0XHRcdG5ldyBVUkwoYXdhaXQgaW1wb3J0Lm1ldGEucmVzb2x2ZSgnQHJlcG8vc3R5bGVzL2Rpc3QnKSkucGF0aG5hbWVcblx0XHRcdFx0XHRcdH0vKmAsXG5cdFx0XHRcdFx0XHRkZXN0OiAnLi9zdHlsZXMnLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdF0sXG5cdFx0XHR9KSxcblx0XHRcdCFpc1dhdGNoTW9kZVxuXHRcdFx0XHQ/IGR0cyh7XG5cdFx0XHRcdFx0XHRza2lwRGlhZ25vc3RpY3M6IHRydWUsXG5cdFx0XHRcdCAgfSlcblx0XHRcdFx0OiB1bmRlZmluZWQsXG5cdFx0XSxcblx0XHRidWlsZDoge1xuXHRcdFx0ZW1wdHlPdXREaXI6IHRydWUsXG5cdFx0XHRsaWI6IHtcblx0XHRcdFx0ZW50cnk6IGlucHV0LFxuXHRcdFx0XHRuYW1lOiAnY29tcG9uZW50cycsXG5cdFx0XHRcdGZvcm1hdHM6IFsnZXMnLCAnY2pzJ10sXG5cdFx0XHR9LFxuXHRcdFx0bWluaWZ5OiBmYWxzZSxcblx0XHRcdHJvbGx1cE9wdGlvbnM6IHtcblx0XHRcdFx0ZXh0ZXJuYWw6IFtcblx0XHRcdFx0XHQnQG1pY3Jvc29mdC9mYXN0LWVsZW1lbnQnLFxuXHRcdFx0XHRcdCdAbWljcm9zb2Z0L2Zhc3Qtd2ViLXV0aWxpdGllcycsXG5cdFx0XHRcdFx0J3ZpZGVvLmpzJyxcblx0XHRcdFx0XHQnQGZsb2F0aW5nLXVpL2RvbScsXG5cdFx0XHRcdFx0J2Ryb3B6b25lJyxcblx0XHRcdFx0XHQncHJvc2VtaXJyb3Itc3RhdGUnLFxuXHRcdFx0XHRcdCdwcm9zZW1pcnJvci1tb2RlbCcsXG5cdFx0XHRcdFx0J3Byb3NlbWlycm9yLXZpZXcnLFxuXHRcdFx0XHRcdCdwcm9zZW1pcnJvci1rZXltYXAnLFxuXHRcdFx0XHRcdCdwcm9zZW1pcnJvci1jb21tYW5kcycsXG5cdFx0XHRcdFx0J3Byb3NlbWlycm9yLXNjaGVtYS1iYXNpYycsXG5cdFx0XHRcdFx0J2RhdGUtZm5zJyxcblx0XHRcdFx0XHQncmFtZGEnLFxuXHRcdFx0XHRcdCd1dWlkJyxcblx0XHRcdFx0XSxcblx0XHRcdFx0aW5wdXQsXG5cdFx0XHRcdG91dHB1dDogW1xuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGZvcm1hdDogJ2VzJyxcblx0XHRcdFx0XHRcdGNodW5rRmlsZU5hbWVzOiAndW5idW5kbGVkL1tuYW1lXS5qcycsXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRmb3JtYXQ6ICdjanMnLFxuXHRcdFx0XHRcdFx0Y2h1bmtGaWxlTmFtZXM6ICd1bmJ1bmRsZWQvW25hbWVdLmNqcycsXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XSxcblx0XHRcdH0sXG5cdFx0fSxcblx0fSlcbik7XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9qc3RheWxvci9Eb2N1bWVudHMvRGV2ZWxvcG1lbnQvYXVnMjAyNS92aXZpZC0zL2xpYnMvY29tcG9uZW50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2pzdGF5bG9yL0RvY3VtZW50cy9EZXZlbG9wbWVudC9hdWcyMDI1L3ZpdmlkLTMvbGlicy9jb21wb25lbnRzL3ZpdGUuY29uZmlnLmJhc2UudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2pzdGF5bG9yL0RvY3VtZW50cy9EZXZlbG9wbWVudC9hdWcyMDI1L3ZpdmlkLTMvbGlicy9jb21wb25lbnRzL3ZpdGUuY29uZmlnLmJhc2UudHNcIjsvLy8gPHJlZmVyZW5jZSB0eXBlcz1cInZpdGVzdC9jb25maWdcIiAvPlxuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzJztcbmltcG9ydCB7IGRlZmluZUNvbmZpZywgbWVyZ2VDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCB7IE5vZGVQYWNrYWdlSW1wb3J0ZXIgfSBmcm9tICdzYXNzJztcbmltcG9ydCB2aXRlc3RCYXNlQ29uZmlnIGZyb20gJ0ByZXBvL3ZpdGVzdC1jb25maWcvdWknO1xuXG5jb25zdCBwYWNrYWdlVmVyc2lvbiA9IEpTT04ucGFyc2UoXG5cdGZzLnJlYWRGaWxlU3luYyhwYXRoLmpvaW4oX19kaXJuYW1lLCAncGFja2FnZS5qc29uJyksICd1dGYtOCcpXG4pLnZlcnNpb247XG5cbmNvbnN0IGlzV2F0Y2hNb2RlID0gcHJvY2Vzcy5lbnYuV0FUQ0hfTU9ERSA9PT0gJ3RydWUnO1xuXG5leHBvcnQgZGVmYXVsdCBtZXJnZUNvbmZpZyhcblx0dml0ZXN0QmFzZUNvbmZpZyxcblx0ZGVmaW5lQ29uZmlnKHtcblx0XHRidWlsZDoge1xuXHRcdFx0b3V0RGlyOiAnZGlzdCcsXG5cdFx0XHRjc3NNaW5pZnk6IHRydWUsXG5cdFx0XHR0YXJnZXQ6ICdlc25leHQnLFxuXHRcdFx0d2F0Y2g6IGlzV2F0Y2hNb2RlXG5cdFx0XHRcdD8ge1xuXHRcdFx0XHRcdFx0ZXhjbHVkZTogWycqKi8qLm1kJ10sXG5cdFx0XHRcdCAgfVxuXHRcdFx0XHQ6IG51bGwsXG5cdFx0fSxcblx0XHRkZWZpbmU6IHtcblx0XHRcdF9fUEFDS0FHRV9WRVJTSU9OX186IEpTT04uc3RyaW5naWZ5KHBhY2thZ2VWZXJzaW9uKSxcblx0XHR9LFxuXHRcdGNzczoge1xuXHRcdFx0cHJlcHJvY2Vzc29yT3B0aW9uczoge1xuXHRcdFx0XHRzY3NzOiB7XG5cdFx0XHRcdFx0YXBpOiAnbW9kZXJuLWNvbXBpbGVyJyxcblx0XHRcdFx0XHRpbXBvcnRlcnM6IFtuZXcgTm9kZVBhY2thZ2VJbXBvcnRlcigpXSxcblx0XHRcdFx0fSxcblx0XHRcdH0sXG5cdFx0fSxcblx0fSlcbik7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQ0EsWUFBWUEsV0FBVTtBQUN0QixZQUFZQyxTQUFRO0FBQ3BCLFNBQVMsc0JBQXNCO0FBQy9CLFNBQVMsZ0JBQUFDLGVBQWMsZUFBQUMsb0JBQW1CO0FBQzFDLE9BQU8sU0FBUzs7O0FDSmhCLFlBQVksVUFBVTtBQUN0QixZQUFZLFFBQVE7QUFDcEIsU0FBUyxjQUFjLG1CQUFtQjtBQUMxQyxTQUFTLDJCQUEyQjtBQUNwQyxPQUFPLHNCQUFzQjtBQUw3QixJQUFNLG1DQUFtQztBQU96QyxJQUFNLGlCQUFpQixLQUFLO0FBQUEsRUFDeEIsZ0JBQWtCLFVBQUssa0NBQVcsY0FBYyxHQUFHLE9BQU87QUFDOUQsRUFBRTtBQUVGLElBQU0sY0FBYyxRQUFRLElBQUksZUFBZTtBQUUvQyxJQUFPLDJCQUFRO0FBQUEsRUFDZDtBQUFBLEVBQ0EsYUFBYTtBQUFBLElBQ1osT0FBTztBQUFBLE1BQ04sUUFBUTtBQUFBLE1BQ1IsV0FBVztBQUFBLE1BQ1gsUUFBUTtBQUFBLE1BQ1IsT0FBTyxjQUNKO0FBQUEsUUFDQSxTQUFTLENBQUMsU0FBUztBQUFBLE1BQ25CLElBQ0E7QUFBQSxJQUNKO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFDUCxxQkFBcUIsS0FBSyxVQUFVLGNBQWM7QUFBQSxJQUNuRDtBQUFBLElBQ0EsS0FBSztBQUFBLE1BQ0oscUJBQXFCO0FBQUEsUUFDcEIsTUFBTTtBQUFBLFVBQ0wsS0FBSztBQUFBLFVBQ0wsV0FBVyxDQUFDLElBQUksb0JBQW9CLENBQUM7QUFBQSxRQUN0QztBQUFBLE1BQ0Q7QUFBQSxJQUNEO0FBQUEsRUFDRCxDQUFDO0FBQ0Y7OztBRDlCQSxTQUFTLHNCQUFzQjtBQUM5QixRQUFNLFVBQWEsZ0JBQVksZUFBZTtBQUM5QyxRQUFNLGFBQ0osZ0JBQVksY0FBYztBQUFBLElBQzFCLGVBQWU7QUFBQSxFQUNoQixDQUFDLEVBQ0EsT0FBTyxDQUFDLFVBQVUsTUFBTSxZQUFZLENBQUMsRUFDckMsSUFBSSxDQUFDLFVBQVUsTUFBTSxJQUFJO0FBRTNCLFNBQU87QUFBQSxJQUNOLE9BQU87QUFBQSxJQUNQLEdBQUcsT0FBTztBQUFBLE1BQ1QsUUFBUSxJQUFJLENBQUMsV0FBVztBQUFBLFFBQ3ZCLFdBQWdCLFlBQU0sTUFBTSxFQUFFLElBQUk7QUFBQSxRQUNsQyxlQUFlLE1BQU07QUFBQSxNQUN0QixDQUFDO0FBQUEsSUFDRjtBQUFBO0FBQUEsSUFFQSxHQUFHLE9BQU87QUFBQSxNQUNULFdBQVcsSUFBSSxDQUFDLGtCQUFrQjtBQUFBLFFBQ2pDLEdBQUcsYUFBYTtBQUFBLFFBQ2hCLFdBQVcsYUFBYTtBQUFBLE1BQ3pCLENBQUM7QUFBQSxJQUNGO0FBQUEsRUFDRDtBQUNEO0FBRUEsSUFBTSxRQUFRLG9CQUFvQjtBQUVsQyxJQUFNQyxlQUFjLFFBQVEsSUFBSSxlQUFlO0FBRS9DLElBQU8sc0JBQVFDO0FBQUEsRUFDZDtBQUFBLEVBQ0FDLGNBQWE7QUFBQSxJQUNaLE1BQU07QUFBQSxNQUNMLFlBQVksQ0FBQyxpQkFBaUI7QUFBQSxNQUU5QixNQUFNO0FBQUEsTUFDTixhQUFhO0FBQUEsUUFDWixTQUFTO0FBQUEsVUFDUixZQUFZO0FBQUEsUUFDYjtBQUFBLE1BQ0Q7QUFBQSxJQUNEO0FBQUEsSUFFQSxTQUFTO0FBQUEsTUFDUixlQUFlO0FBQUEsUUFDZCxTQUFTO0FBQUEsVUFDUjtBQUFBLFlBQ0MsS0FBSztBQUFBLFlBQ0wsTUFBTTtBQUFBLFVBQ1A7QUFBQSxVQUNBO0FBQUEsWUFDQyxLQUFLO0FBQUEsWUFDTCxNQUFNO0FBQUEsVUFDUDtBQUFBLFVBQ0E7QUFBQSxZQUNDLEtBQUs7QUFBQSxZQUNMLE1BQU07QUFBQSxVQUNQO0FBQUEsVUFDQTtBQUFBLFlBQ0MsS0FBSztBQUFBLFlBQ0wsTUFBTTtBQUFBLFVBQ1A7QUFBQSxVQUNBO0FBQUEsWUFDQyxLQUFLLEdBQ0osSUFBSSxJQUFJLE1BQU0sWUFBWSxRQUFRLG1CQUFtQixDQUFDLEVBQUUsUUFDekQ7QUFBQSxZQUNBLE1BQU07QUFBQSxVQUNQO0FBQUEsUUFDRDtBQUFBLE1BQ0QsQ0FBQztBQUFBLE1BQ0QsQ0FBQ0YsZUFDRSxJQUFJO0FBQUEsUUFDSixpQkFBaUI7QUFBQSxNQUNqQixDQUFDLElBQ0Q7QUFBQSxJQUNKO0FBQUEsSUFDQSxPQUFPO0FBQUEsTUFDTixhQUFhO0FBQUEsTUFDYixLQUFLO0FBQUEsUUFDSixPQUFPO0FBQUEsUUFDUCxNQUFNO0FBQUEsUUFDTixTQUFTLENBQUMsTUFBTSxLQUFLO0FBQUEsTUFDdEI7QUFBQSxNQUNBLFFBQVE7QUFBQSxNQUNSLGVBQWU7QUFBQSxRQUNkLFVBQVU7QUFBQSxVQUNUO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFFBQ0Q7QUFBQSxRQUNBO0FBQUEsUUFDQSxRQUFRO0FBQUEsVUFDUDtBQUFBLFlBQ0MsUUFBUTtBQUFBLFlBQ1IsZ0JBQWdCO0FBQUEsVUFDakI7QUFBQSxVQUNBO0FBQUEsWUFDQyxRQUFRO0FBQUEsWUFDUixnQkFBZ0I7QUFBQSxVQUNqQjtBQUFBLFFBQ0Q7QUFBQSxNQUNEO0FBQUEsSUFDRDtBQUFBLEVBQ0QsQ0FBQztBQUNGOyIsCiAgIm5hbWVzIjogWyJwYXRoIiwgImZzIiwgImRlZmluZUNvbmZpZyIsICJtZXJnZUNvbmZpZyIsICJpc1dhdGNoTW9kZSIsICJtZXJnZUNvbmZpZyIsICJkZWZpbmVDb25maWciXQp9Cg==
