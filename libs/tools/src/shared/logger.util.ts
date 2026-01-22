import chalk from 'chalk';

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
		// eslint-disable-next-line no-console
		console.log('log', ...message);
	},
	success(...messages: any[]) {
		// eslint-disable-next-line no-console
		console.log(chalk.white.bgGreen('[SUCCESS]'), ...messages);
	},
	error(...messages: any[]) {
		// eslint-disable-next-line no-console
		console.log(chalk.white.bgRed('[ERROR]'), ...messages);
	},
	info(...messages: any[]) {
		// eslint-disable-next-line no-console
		console.log(chalk.white.bgBlue('[INFO]'), ...messages);
	},
	warning(...messages: any[]) {
		// eslint-disable-next-line no-console
		console.log(chalk.white.bgYellow('[WARNING]'), ...messages);
	},
	debug(...messages: any[]) {
		// eslint-disable-next-line no-console
		console.log(chalk.black.bgGray('[DEBUG]'), ...messages);
	},
};
