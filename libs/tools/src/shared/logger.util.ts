/* eslint-disable no-console */

import chalk from 'chalk';

const LogLevel = {
	debug: 1,
	info: 2,
	warn: 3,
	error: 4,
};
type LogLevelKey = keyof typeof LogLevel;

const envLogLevel = process.env.LOG_LEVEL ?? '';

const logLevel = LogLevel.hasOwnProperty(envLogLevel)
	? LogLevel[envLogLevel as LogLevelKey]
	: LogLevel.info;

export interface Logger {
	log(...message: any[]): void;
	success(...message: any[]): void;
	error(...message: any[]): void;
	info(...message: any[]): void;
	warning(...message: any[]): void;
	debug(...message: any[]): void;
}

export const logger: Logger = {
	log(...message) {
		console.error('log', ...message);
	},
	debug(...messages: any[]) {
		if (logLevel > LogLevel.debug) return;
		console.error(chalk.black.bgGray('[DEBUG]'), ...messages);
	},
	info(...messages: any[]) {
		if (logLevel > LogLevel.info) return;
		console.error(chalk.white.bgBlue('[INFO]'), ...messages);
	},
	success(...messages: any[]) {
		if (logLevel > LogLevel.info) return;
		console.error(chalk.white.bgGreen('[SUCCESS]'), ...messages);
	},
	warning(...messages: any[]) {
		if (logLevel > LogLevel.warn) return;
		console.error(chalk.white.bgYellow('[WARNING]'), ...messages);
	},
	error(...messages: any[]) {
		if (logLevel > LogLevel.error) return;
		console.error(chalk.white.bgRed('[ERROR]'), ...messages);
	},
};
