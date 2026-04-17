const vue = require('@vitejs/plugin-vue');
const { EleventyRenderPlugin } = require('@11ty/eleventy');
const pluginTOC = require('eleventy-plugin-nesting-toc');
const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');
const markdownLibrary = require('./libraries/markdown-it');
const CleanCSS = require('clean-css');
const fs = require('fs');
const path = require('path');
const packageInstallation = require('./shortcodes/packageInstallation');
const { globSync } = require('glob');
const { spawnSync } = require('child_process');
const {
	resetExampleIndex,
} = require('./code-example-preview/createCodeExample');
const { githubEditLinkFromPath } = require('./filters/githubEditLink');
const { isNavItemActive } = require('./filters/isNavItemActive');
const { onlyPublicPages } = require('./filters/publicPages');
const { componentSlug } = require('./filters/componentSlug');
const { spawn } = require('node:child_process');
const { NodePackageImporter } = require('sass');
const {
	manifestsArray: components,
	manifestsBySlug,
} = require('./utils/components-manifests');
const { componentsNav } = require('./utils/components-navigation');
const { metadataByTag } = require('./utils/components-metadata');
const {
	camelCase,
	pascalCase,
	pascalSnakeCase,
	capitalCase,
	constantCase,
	dotCase,
	kebabCase,
	pathCase,
	sentenceCase,
	snakeCase,
	trainCase,
} = require('change-case');

const WORKSPACE_ROOT = path.resolve(__dirname, '..', '..');
const DOCS_DIR = '.';
const INPUT_DIR = `${DOCS_DIR}/content`;
const OUTPUT_DIR = 'dist';

module.exports = async (eleventyConfig) => {
	eleventyConfig.setLibrary('md', markdownLibrary);

	eleventyConfig.addPlugin(EleventyRenderPlugin);

	/**
	 * Hack to inject the generated code example frames into the Eleventy results, so that they will be processed by Vite.
	 */
	eleventyConfig.on('eleventy.after', async ({ results }) => {
		const matchedFiles = globSync(`${OUTPUT_DIR}/frames/*.html`);
		for (const matchedFile of matchedFiles) {
			results.push({
				inputPath: '',
				outputPath: `./${OUTPUT_DIR}/frames/${path.basename(matchedFile)}`,
				url: '',
				content: '',
			});
		}

		// Generate llms_full.txt from entire site content
		await generateLLMSFullExport();
	});

	/**
	 * Generate llms_full.txt containing the entire site content in machine-readable format
	 */
	async function generateLLMSFullExport() {
		// Build navigation order map from nav-groups
		const navGroupFiles = globSync(`${DOCS_DIR}/content/nav-groups/*.md`);
		const navGroupOrder = new Map();

		for (const file of navGroupFiles) {
			const content = fs.readFileSync(file, 'utf8');
			const match = content.match(/title:\s*(.+)\n[\s\S]*?order:\s*(\d+)/);
			if (match) {
				const title = match[1].trim();
				const order = parseInt(match[2], 10);
				navGroupOrder.set(title.toLowerCase(), { title, order });
			}
		}

		// Determine section order from path
		function getSectionOrder(path) {
			const lowerPath = path.toLowerCase();

			// Check for specific sections
			if (lowerPath.startsWith('/whats-new'))
				return navGroupOrder.get("what's new")?.order || 1;
			if (lowerPath.startsWith('/getting-started'))
				return navGroupOrder.get('getting started')?.order || 0;
			if (lowerPath.startsWith('/guides'))
				return navGroupOrder.get('guides')?.order || 3;
			if (lowerPath.startsWith('/designs'))
				return navGroupOrder.get('designs')?.order || 5;
			if (lowerPath.startsWith('/design-tokens'))
				return navGroupOrder.get('design tokens')?.order || 5;
			if (lowerPath.startsWith('/migration-guides'))
				return navGroupOrder.get('migration guides')?.order || 6;
			if (lowerPath.startsWith('/resources'))
				return navGroupOrder.get('resources')?.order || 8;
			if (lowerPath.startsWith('/icons'))
				return navGroupOrder.get('icons')?.order || 9;
			if (lowerPath.startsWith('/components')) return 4; // Components between guides and designs
			if (lowerPath.startsWith('/accessibility')) return 7; // Root section
			if (lowerPath === '/') return -1; // Home page first

			return 999; // Other pages last
		}

		const ignorePatterns = [
			'**/assets/**',
			'**/pagefind/**',
			'**/whats-new/**',
			'**/llms_full.txt',
			'**/404.html',
		];

		// Collect HTML files
		const htmlFiles = globSync(`${OUTPUT_DIR}/**/*.html`, {
			ignore: ignorePatterns,
		});

		// Collect .txt files (like individual llms.txt exports)
		const txtFiles = globSync(`${OUTPUT_DIR}/**/*.txt`, {
			ignore: ['**/llms_full.txt', ...ignorePatterns],
		});

		const entries = [];

		// Process HTML files
		for (const filePath of htmlFiles) {
			const html = fs.readFileSync(filePath, 'utf8');
			const text = extractTextFromHTML(html);

			if (text) {
				const normalizedPath = normalizePath(
					filePath.replace(`${OUTPUT_DIR}/`, '')
				);
				entries.push({
					path: normalizedPath,
					content: text,
					sectionOrder: getSectionOrder(normalizedPath),
				});
			}
		}

		// Process .txt files
		for (const filePath of txtFiles) {
			const text = fs.readFileSync(filePath, 'utf8').trim();

			if (text) {
				const normalizedPath = normalizePath(
					filePath.replace(`${OUTPUT_DIR}/`, '')
				);
				entries.push({
					path: normalizedPath,
					content: text,
					sectionOrder: getSectionOrder(normalizedPath),
				});
			}
		}

		// Sort by section order, then by path
		entries.sort((a, b) => {
			if (a.sectionOrder !== b.sectionOrder) {
				return a.sectionOrder - b.sectionOrder;
			}
			return a.path.localeCompare(b.path);
		});

		// Generate output
		const output = entries
			.map((entry) => `=== ${entry.path} ===\n\n${entry.content}`)
			.join('\n\n');

		const outputPath = path.join(OUTPUT_DIR, 'llms_full.txt');
		fs.writeFileSync(outputPath, output, 'utf8');
		console.log(`[11ty] Generated ${outputPath} (${entries.length} pages)`);
	}

	/**
	 * Extract plain text from HTML content
	 */
	function extractTextFromHTML(html) {
		// Remove script, style, and other non-content tags
		let text = html
			.replace(/<\s*script[^>]*>[\s\S]*?<\s*\/\s*script\s*>/gi, '')
			.replace(/<\s*style[^>]*>[\s\S]*?<\s*\/\s*style\s*>/gi, '')
			.replace(/<\s*noscript[^>]*>[\s\S]*?<\s*\/\s*noscript\s*>/gi, '')
			.replace(/<\s*template[^>]*>[\s\S]*?<\s*\/\s*template\s*>/gi, '')
			.replace(/<\s*svg[^>]*>[\s\S]*?<\s*\/\s*svg\s*>/gi, '');

		// Remove HTML tags but preserve content
		text = text.replace(/<[^>]+>/g, ' ');

		// Normalize whitespace
		text = text
			.replace(/&nbsp;/g, ' ')
			.replace(/&amp;/g, '&')
			.replace(/&lt;/g, '<')
			.replace(/&gt;/g, '>')
			.replace(/&quot;/g, '"')
			.replace(/&#39;/g, "'")
			.replace(/[\r\n\t]+/g, ' ')
			.replace(/\s+/g, ' ')
			.trim();

		return text;
	}

	/**
	 * Normalize file path to URL format
	 */
	function normalizePath(filePath) {
		// Convert to forward slashes
		filePath = filePath.replace(/\\/g, '/');

		// Remove index.html → directory
		if (filePath.endsWith('index.html')) {
			filePath = filePath.slice(0, -'index.html'.length);
		}

		// Remove trailing slash, unless it's root
		if (filePath !== '/' && filePath.endsWith('/')) {
			filePath = filePath.slice(0, -1);
		}

		// Ensure root path
		if (!filePath || filePath === '') {
			return '/';
		}

		if (!filePath.startsWith('/')) {
			filePath = '/' + filePath;
		}

		return filePath;
	}

	const EleventyVitePlugin = await import('@11ty/eleventy-plugin-vite');

	eleventyConfig.addPlugin(EleventyVitePlugin.default, {
		tempFolderName: '.11ty-vite',
		viteOptions: {
			plugins: [
				vue({
					template: {
						compilerOptions: {
							// 'preserve' will keep all whitespace
							// 'condense' (default) removes whitespace between tags
							whitespace: 'preserve',
						},
					},
				}),
				{
					name: 'emit-llms-txt',
					generateBundle() {
						const files = globSync(`${DOCS_DIR}/.11ty-vite/**/*.txt`, {}) || [];
						for (const file of files) {
							const source = fs.readFileSync(file, 'utf-8');
							const fileName = path.relative(`${DOCS_DIR}/.11ty-vite/`, file);

							this.emitFile({
								type: 'asset',
								fileName,
								source,
							});
						}
					},
				},
			],
			build: {
				emptyOutDir: false,
			},
			resolve: {
				alias: {
					'/docs': path.resolve('.'),
					/**
					 * While importing @vonage/vivid works fine, it will load too many files in dev mode.
					 * Therefore, we bundle it into a single file and reference it here.
					 */
					'@vonage/vivid': path.resolve('.', 'tmp/components-bundle.js'),
					'vivid-locales': path.resolve('.', 'tmp/locales-bundle.js'),
				},
			},
			server: {
				watch: {
					ignored: '**/frames/**',
				},
			},
			css: {
				preprocessorOptions: {
					scss: {
						api: 'modern-compiler', // not yet supported, instead silence warnings:
						// silenceDeprecations: ['legacy-js-api'],
						importers: [new NodePackageImporter()],
					},
				},
			},
		},
	});

	eleventyConfig.addPlugin(pluginTOC);

	eleventyConfig.addPlugin(eleventyNavigationPlugin);

	eleventyConfig.addPassthroughCopy({
		[`${WORKSPACE_ROOT}/assets/images`]: 'public/assets/images',
		[`${WORKSPACE_ROOT}/assets/fonts`]: 'public/assets/fonts',
	});

	eleventyConfig.addWatchTarget(
		`${WORKSPACE_ROOT}/libs/components/src/lib/*/manifest.yaml`
	);
	eleventyConfig.addWatchTarget(
		`${WORKSPACE_ROOT}/libs/components/src/lib/*/README.md`
	);
	eleventyConfig.addWatchTarget(
		`${WORKSPACE_ROOT}/libs/components/src/lib/*/VARIATIONS.md`
	);
	eleventyConfig.addWatchTarget(
		`${WORKSPACE_ROOT}/libs/components/src/lib/*/GUIDELINES.md`
	);
	eleventyConfig.addWatchTarget(
		`${WORKSPACE_ROOT}/libs/components/src/lib/*/ACCESSIBILITY.md`
	);
	eleventyConfig.addWatchTarget(
		`${WORKSPACE_ROOT}/libs/components/src/lib/*/USE-CASES.md`
	);
	eleventyConfig.addWatchTarget(
		`${WORKSPACE_ROOT}/libs/eslint-plugin/src/rules/*.md`
	);
	eleventyConfig.addWatchTarget(`${WORKSPACE_ROOT}docs/`);
	eleventyConfig.addWatchTarget(`${WORKSPACE_ROOT}assets/`);

	eleventyConfig.addFilter('camelCase', camelCase);
	eleventyConfig.addFilter('pascalCase', pascalCase);
	eleventyConfig.addFilter('pascalSnakeCase', pascalSnakeCase);
	eleventyConfig.addFilter('capitalCase', capitalCase);
	eleventyConfig.addFilter('constantCase', constantCase);
	eleventyConfig.addFilter('dotCase', dotCase);
	eleventyConfig.addFilter('kebabCase', kebabCase);
	eleventyConfig.addFilter('pathCase', pathCase);
	eleventyConfig.addFilter('sentenceCase', sentenceCase);
	eleventyConfig.addFilter('snakeCase', snakeCase);
	eleventyConfig.addFilter('trainCase', trainCase);

	eleventyConfig.addFilter('cssmin', function (code) {
		return new CleanCSS({}).minify(code).styles;
	});

	eleventyConfig.addFilter('includeMd', (filePath) => {
		if (!filePath || !filePath.endsWith('.md')) return '';

		let markdownPath;
		if (path.isAbsolute(filePath)) {
			markdownPath = filePath;
		} else if (filePath.startsWith('./libs/components/src/lib/')) {
			markdownPath = path.resolve(
				WORKSPACE_ROOT,
				filePath.replaceAll('../', '')
			);
		} else {
			return '';
		}

		if (!fs.existsSync(markdownPath)) return '';
		return fs.readFileSync(markdownPath, 'utf8');
	});

	eleventyConfig.addFilter('cleanLLM', (content) => {
		if (!content) return '';

		return (
			content
				// Remove HTML tags and attributes
				.replace(/<[^>]*>/g, '')
				// Remove all markdown code blocks (```...```)
				.replace(/```[\s\S]*?```/gs, '')
				// Remove ```html preview ... ``` code blocks
				.replace(/```*```/gs, '')
				// Remove other code blocks (empty or with preview commands)
				.replace(/```\s*preview[^`]*```/gs, '')
				// Remove empty code blocks
				.replace(/```\s*```/gs, '')
				// Remove multiple consecutive newlines
				.replace(/\n{4,}/g, '\n\n')
				// Trim whitespace
				.trim()
		);
	});

	eleventyConfig.addFilter('onlyPublicPages', onlyPublicPages);
	eleventyConfig.addFilter('githubEditLink', githubEditLinkFromPath);
	eleventyConfig.addFilter('componentSlug', componentSlug);
	eleventyConfig.addFilter('isNavItemActive', isNavItemActive);
	eleventyConfig.addFilter('onlyNavPages', (entries) =>
		entries.filter((entry) => Boolean(entry.data.title))
	);

	eleventyConfig.addNunjucksGlobal('getManifest', (slug) => {
		return manifestsBySlug.get(slug);
	});

	eleventyConfig.addNunjucksGlobal('getMetadata', (tagName) => {
		return metadataByTag.get(tagName);
	});

	eleventyConfig.addFilter('has', (object, propName) => {
		return Object.prototype.hasOwnProperty.call(object, propName);
	});

	eleventyConfig.addFilter('hasAny', (object, ...propNames) => {
		for (const name of propNames) {
			if (Object.keys(object).includes(name)) {
				return true;
			}
		}
		return false;
	});

	eleventyConfig.addGlobalData('componentsNavigation', componentsNav);

	eleventyConfig.addGlobalData('componentsNew', components);

	eleventyConfig.addGlobalData(
		'componentCode',
		components.filter((c) => c.documentation.code)
	);

	eleventyConfig.addGlobalData(
		'componentGuidelines',
		components.filter((c) => c.documentation.guidelines)
	);

	eleventyConfig.addGlobalData(
		'componentUseCases',
		components.filter((c) => c.documentation.useCases)
	);

	eleventyConfig.addGlobalData(
		'componentVariations',
		components.filter((c) => c.documentation.variations)
	);

	eleventyConfig.addGlobalData(
		'componentAccessibility',
		components.filter((c) => c.documentation.accessibility)
	);

	eleventyConfig.addGlobalData(
		'componentsLegacy',
		components.filter((c) => c.documentation.legacy)
	);

	eleventyConfig.addShortcode('clientSideNavigationHint', function () {
		return markdownLibrary.render(
			fs.readFileSync(
				`${DOCS_DIR}/shortcodes/client-side-navigation-hint.md`,
				'utf-8'
			)
		);
	});

	eleventyConfig.addShortcode('packageInstallation', packageInstallation);

	eleventyConfig.on('eleventy.before', resetExampleIndex);

	const runEsbuild = (inputFile, outputFile, watch) => {
		const args = [
			'esbuild',
			inputFile,
			'--bundle',
			`--outfile=${outputFile}`,
			'--format=esm',
		];
		if (watch) {
			args.push('--watch');
		}
		return (watch ? spawn : spawnSync)('pnpm', args, {
			windowsHide: true,
			stdio: [process.stdin, process.stdout, process.stderr],
		});
	};
	let isWatcherStarted = false;
	eleventyConfig.on('eleventy.before', async ({ runMode }) => {
		if (isWatcherStarted) {
			return;
		}
		const shouldWatch = runMode === 'serve';
		runEsbuild(
			'../../libs/components/dist/index.js',
			'tmp/components-bundle.js',
			shouldWatch
		);
		runEsbuild(
			'assets/scripts/locales-bundle.js',
			'tmp/locales-bundle.js',
			shouldWatch
		);
		isWatcherStarted = shouldWatch;
	});

	eleventyConfig.on('eleventy.after', async ({ dir, runMode }) => {
		if (runMode === 'serve') {
			spawnSync('pnpm', ['pagefind', '--site', dir.output], {
				windowsHide: true,
				stdio: [process.stdin, process.stdout, process.stderr],
			});
		}
	});

	return {
		dir: {
			input: INPUT_DIR,
			includes: '_includes',
			layouts: '_layouts',
			output: OUTPUT_DIR,
		},
	};
};
