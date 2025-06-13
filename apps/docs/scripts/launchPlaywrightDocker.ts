import { spawn } from 'node:child_process';
import path from 'node:path';

// Helper script to launch Playwright in a Docker container and shut it down properly when process is sigkilled.

const dirname = path.dirname(new URL(import.meta.url).pathname);

spawn(
	'npx',
	['tsx', path.join(dirname, 'playwrightDockerMonitor.ts'), `${process.pid}`],
	{
		detached: true,
		stdio: 'ignore',
	}
).unref();

setInterval(() => {
	// keep the process running
}, 1000);
