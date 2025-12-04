import { spawnSync } from 'node:child_process';
import { setTimeout } from 'node:timers/promises';

const PLAYWRIGHT_VERSION = '1.57.0';
const IMAGE_NAME = `mcr.microsoft.com/playwright:v${PLAYWRIGHT_VERSION}-noble`;
const CONTAINER_NAME = 'vivid-playwright';
const SERVER_PORT = 3000;
const MAX_RETRIES = 60;
const RETRY_DELAY = 1000;
const READINESS_DELAY = 2000;

const runResult = spawnSync(
	'docker',
	[
		'run',
		'--name',
		CONTAINER_NAME,
		'-d',
		'--add-host=hostmachine:host-gateway',
		'-p',
		`${SERVER_PORT}:${SERVER_PORT}`,
		'--rm',
		'--init',
		'--ipc=host',
		IMAGE_NAME,
		'/bin/sh',
		'-c',
		`npx -y playwright@${PLAYWRIGHT_VERSION} run-server --port ${SERVER_PORT} --host 0.0.0.0`,
	],
	{ stdio: 'inherit' }
);

if (runResult.status !== 0) {
	console.error('Failed to start Docker container');
	process.exit(1);
}

const checkContainerRunning = (): boolean => {
	const containerCheck = spawnSync(
		'docker',
		['ps', '--filter', `name=${CONTAINER_NAME}`, '--format', '{{.Names}}'],
		{ stdio: 'pipe' }
	);
	return (
		containerCheck.status === 0 &&
		containerCheck.stdout.toString().includes(CONTAINER_NAME)
	);
};

const getContainerLogs = (): string => {
	const logs = spawnSync('docker', ['logs', CONTAINER_NAME], {
		stdio: 'pipe',
	});
	return logs.stdout?.toString() || '';
};

const checkServerReady = (): boolean => {
	// Check from inside the container
	const wsCheck = spawnSync(
		'docker',
		[
			'exec',
			CONTAINER_NAME,
			'sh',
			'-c',
			`curl -f -s http://localhost:${SERVER_PORT} > /dev/null 2>&1 && echo "ready" || exit 1`,
		],
		{ stdio: 'pipe' }
	);

	if (wsCheck.status === 0 && wsCheck.stdout.toString().includes('ready')) {
		// Also verify from host side
		const hostCheck = spawnSync(
			'sh',
			[
				'-c',
				`curl -f -s http://localhost:${SERVER_PORT} > /dev/null 2>&1 || exit 1`,
			],
			{ stdio: 'pipe' }
		);
		return hostCheck.status === 0;
	}
	return false;
};

// Wait for the Playwright server to be ready (blocking)
const waitForServer = async (): Promise<void> => {
	for (let i = 0; i < MAX_RETRIES; i++) {
		if (!checkContainerRunning()) {
			console.error('Docker container is not running');
			const logs = getContainerLogs();
			if (logs) {
				console.error('Container logs:', logs);
			}
			process.exit(1);
		}

		if (checkServerReady()) {
			// Add a small delay to ensure WebSocket server is fully ready
			await setTimeout(READINESS_DELAY);
			// Verify one more time after delay
			if (checkServerReady()) {
				console.log('Playwright server is ready');
				return;
			}
		}

		if (i === MAX_RETRIES - 1) {
			console.error('Playwright server failed to start within timeout');
			const logs = getContainerLogs();
			if (logs) {
				console.error('Container logs:', logs);
			}
			process.exit(1);
		}

		await setTimeout(RETRY_DELAY);
	}
};

// Start the async wait and monitoring
(async () => {
	await waitForServer();

	const cleanup = () => {
		spawnSync('docker', ['stop', CONTAINER_NAME], { stdio: 'inherit' });
	};

	const watchedPid = parseInt(process.argv[2]);
	const MONITOR_INTERVAL = 1000;

	setInterval(() => {
		try {
			// Check if parent process is still alive
			process.kill(watchedPid, 0);

			// Also check if container is still running
			if (!checkContainerRunning()) {
				console.error('Docker container stopped unexpectedly');
				cleanup();
				process.exit(1);
			}
		} catch (e) {
			cleanup();
			process.exit(0);
		}
	}, MONITOR_INTERVAL);
})().catch((error) => {
	console.error('Error in monitor script:', error);
	process.exit(1);
});
