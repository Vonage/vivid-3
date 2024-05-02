import { watchDependencies } from "./multi-dependent-watch.mjs";
import childProcess from 'child_process';
import chokidar from 'chokidar';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

function mockChokdiarChange(chokdiarWatchMock, { changedFilePath, stats }) {
	const watcher = chokdiarWatchMock.mock.results[0].value;
	watcher.emit('change', changedFilePath, stats);
}

describe('watchDependencies', () => {
	function emitChangeEvent({
		changedFilePath = "./libs/styles/main.scss",
		stats= { isDirectory: () => false }
	}) {
		mockChokdiarChange(chokdiarWatchMock, { changedFilePath, stats });
	}

	function closeRunningProcess(processIndex = 0) {
		const processOnSpy = processSpawnMock.mock.results[0].value;
		processOnSpy.on.mock.calls[processIndex][1]('Code');
		return processOnSpy;
	}

	const projects = {
		"styles": {
			script: "npx nx run styles:build",
			dependencies: [],
			watchPaths: ["./libs/styles/**/*.scss"]
		},
		"build": {
			script: "npx nx run build:build",
			dependencies: [],
			watchPaths: ["./libs/build/**/*.ts"]
		},
		"docs": {
			script: "npx nx run docs:build",
			dependencies: [],
			watchPaths: ["./libs/build/**/*.docs"]
		}
	};
	let processSpawnMock;
	let chokdiarWatchMock;

	beforeEach(() => {
		processSpawnMock = vi.spyOn(childProcess, 'spawn')
			.mockReturnValue({
				stdout: {
					on: vi.fn()
				},
				stderr: {
					on: vi.fn()
				},
				kill: vi.fn(),
				on: vi.fn()
			});

		chokdiarWatchMock = vi.spyOn(chokidar, 'watch');

		vi.spyOn(console, 'log');
		vi.spyOn(console, 'error');
	});

	afterEach(() => {
		processSpawnMock.mockRestore();
		chokdiarWatchMock.mockRestore();
		console.log.mockRestore();
		console.error.mockRestore();
	});

	it('should log out that a change was detected in the process', () => {
		watchDependencies(projects);

		console.log.mockReset();
		emitChangeEvent({});

		expect(console.log).toHaveBeenCalledWith('Changes detected in styles');
	});

	it('should log that a change was detected in an project that is not in the config', () => {
		watchDependencies(projects);
		console.log.mockReset();

    const changedFilePath = "./libs/clear/main.scss";
		mockChokdiarChange(chokdiarWatchMock, { changedFilePath });

		expect(console.log).toHaveBeenCalledWith('Change detected in an unmonitored file: ./libs/clear/main.scss');
	});

	it('should start a process when its files change', () => {

    watchDependencies(projects);

    emitChangeEvent({});

		expect(processSpawnMock).toHaveBeenCalledWith('sh', ['-c', projects['styles'].script]);
  });

	it('should log the spawned process output', () => {

		watchDependencies(projects);

		emitChangeEvent({});
		console.log.mockReset();
		const processOnSpy = processSpawnMock.mock.results[0].value;
		processOnSpy.stdout.on.mock.calls[0][1]('Tested');

		expect(console.log).toHaveBeenCalledWith('styles: Tested');

	});

	it('should log the spawned process errors', () => {

		watchDependencies(projects);

		emitChangeEvent({});
		console.error.mockReset();
		const processOnSpy = processSpawnMock.mock.results[0].value;
		processOnSpy.stderr.on.mock.calls[0][1]('Error');

		expect(console.error).toHaveBeenCalledWith('styles: Error');

	});

	it('should log the process closed on close', () => {
		watchDependencies(projects);

		emitChangeEvent({});
		console.log.mockReset();
		closeRunningProcess();

		expect(console.log).toHaveBeenCalledWith(`styles exited with code: Code`);
	});

	it('should allow the process to restart after it is closed', () => {
		watchDependencies(projects);

		emitChangeEvent({});
		closeRunningProcess();

		emitChangeEvent({});

		expect(processSpawnMock).toHaveBeenCalledTimes(2);
	});

	it('should run the dependencies after the process closes', () => {
		const projects = {
			"styles": {
				script: "npx nx run styles:build",
				dependencies: ["build"],
				watchPaths: ["./libs/styles/**/*.scss"]
			},
			"build": {
				script: "npx nx run build:build",
				dependencies: ["docs"],
				watchPaths: ["./libs/build/**/*.build"]
			},
			"docs": {
				script: "npx nx run docs:build",
				dependencies: [],
				watchPaths: ["./libs/build/**/*.docs"]
			},
		};
		watchDependencies(projects);

		emitChangeEvent({});
		closeRunningProcess();
		closeRunningProcess(1);

		expect(processSpawnMock.mock.calls[0]).toEqual(['sh', ['-c', projects['styles'].script]]);
		expect(processSpawnMock.mock.calls[1]).toEqual(['sh', ['-c', projects['build'].script]]);
		expect(processSpawnMock.mock.calls[2]).toEqual(['sh', ['-c', projects['docs'].script]]);
	});

	it('should kill a running process if there were changes to it and restart it', () => {
		watchDependencies(projects);

		emitChangeEvent({});
		emitChangeEvent({});
		const processOnSpy = processSpawnMock.mock.results[0].value;

		expect(processOnSpy.kill).toHaveBeenCalledTimes(1);
		expect(processSpawnMock).toHaveBeenCalledTimes(2);
		expect(processSpawnMock.mock.calls[0]).toEqual(['sh', ['-c', projects['styles'].script]]);
		expect(processSpawnMock.mock.calls[1]).toEqual(['sh', ['-c', projects['styles'].script]]);
	});

	it('should kill a running processes dependencies if it restarts', () => {
		projects.styles.dependencies.push('build');
		projects.build.dependencies.push('docs');
		watchDependencies(projects);

		emitChangeEvent({});
		const processOnSpy = closeRunningProcess();
		processOnSpy.kill.mockReset();
		emitChangeEvent({});

		expect(processOnSpy.kill).toHaveBeenCalledTimes(1);
		expect(console.log).toHaveBeenCalledWith('Stopping build...')
	});
});


// TODO::handle "Failed tasks:"
// On error => emit an event + stop child processes (don't forget to use in 11ty)
// TODO::use in 11ty
// * Kick it up from the config
// * Listen to error events and handle them
// TODO::Handle renamed/deleted folders
// TODO::debounce the change event handler
// TODO::Right now supports only one dependency - might we want more?
