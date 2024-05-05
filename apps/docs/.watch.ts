import { watchDependencies } from '../../libs/multi-deps-watch/src/index';

function proceduralDepsWatch() {
	const projects = {
		styles: {
			script: 'npx nx run styles:build',
			dependencies: ['build'],
			watchPaths: ['./libs/styles/**/*.scss'],
		},
		build: {
			script: 'npx nx run components:build',
			dependencies: ['bundle'],
			watchPaths: ['libs/components/src/**/*.(ts|scss)'],
		},
		bundle: {
			script:
				'npx esbuild ./dist/libs/components/index.js --bundle --outfile=./dist/libs/components-bundle/index.js --format=esm',
			dependencies: [],
			watchPaths: [
				'./apps/docs/**/*.(html|md|njk|ts)',
				'libs/components/src/lib/**/README.md',
			],
		},
	};
	watchDependencies(projects);
}

proceduralDepsWatch();
