import { spawnSync } from 'node:child_process';

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
		'mcr.microsoft.com/playwright:v1.48.2-focal',
		'/bin/sh',
		'-c',
		'npx -y playwright@1.48.2 run-server --port 3000 --host 0.0.0.0',
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
		process.kill(watchedPid, 0);
	} catch (e) {
		cleanup();
		process.exit(0);
	}
}, 1000);
