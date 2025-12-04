import { spawn } from 'node:child_process';
import path from 'node:path';

// Helper script to launch Playwright in a Docker container and shut it down properly when process is sigkilled.

const dirname = path.dirname(new URL(import.meta.url).pathname);

const monitorProcess = spawn(
	'pnpm',
	['tsx', path.join(dirname, 'playwrightDockerMonitor.ts'), `${process.pid}`],
	{
		detached: true,
		stdio: ['ignore', 'pipe', 'pipe'],
	}
);

monitorProcess.stdout?.on('data', (data) => {
	process.stdout.write(data);
});

monitorProcess.stderr?.on('data', (data) => {
	process.stderr.write(data);
});

monitorProcess.on('error', (error) => {
	console.error('Failed to start monitor script:', error);
	process.exit(1);
});

monitorProcess.unref();

// Keep the process alive so the monitor script can watch it
// The monitor will clean up the Docker container when this process exits
// Keep stdin open to prevent the process from exiting
if (process.stdin.isTTY) {
	process.stdin.resume();
} else {
	// If not a TTY, keep the event loop alive with a minimal interval
	const keepAlive = setInterval(() => {}, 1000);

	process.on('SIGINT', () => {
		clearInterval(keepAlive);
		process.exit(0);
	});

	process.on('SIGTERM', () => {
		clearInterval(keepAlive);
		process.exit(0);
	});
}
