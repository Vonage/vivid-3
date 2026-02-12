/* eslint-disable no-console */

const showDebugLogs = process.env.LOG_LEVEL === 'debug';

export const log = (...args: any[]) => {
	if (showDebugLogs) {
		console.error(...args);
	}
};

export const warn = (...args: any[]) => {
	console.error(...args);
};
