import { spawnSync } from 'node:child_process';

const PLAYWRIGHT_VERSION = '1.57.0';
const IMAGE_NAME = `mcr.microsoft.com/playwright:v${PLAYWRIGHT_VERSION}-noble`;

spawnSync(
	'docker',
	[
		'run',
		'--name',
		'vivid-playwright',
		'-d',
		'--add-host=hostmachine:host-gateway',
		'-p',
		'3000:3000',
		'--rm',
		'--init',
		'--ipc=host',
		IMAGE_NAME,
		'/bin/sh',
		'-c',
		`npx -y playwright@${PLAYWRIGHT_VERSION} run-server --port 3000 --host 0.0.0.0`,
	],
	{ stdio: 'inherit' }
);

const cleanup = () => {
	spawnSync('docker', ['stop', 'vivid-playwright'], { stdio: 'inherit' });
};

const watchedPid = parseInt(process.argv[2]);

setInterval(() => {
	try {
		// Check if parent process is still alive
		process.kill(watchedPid, 0); // doesn't send signal, just checks
	} catch (e) {
		cleanup();
		process.exit(0);
	}
}, 1000);
