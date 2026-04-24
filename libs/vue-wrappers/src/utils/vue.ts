import { version } from 'vue';

export const isVue2 = version.startsWith('2');

export const getListeners = (
	instance: any
): Record<string, EventHandler | EventHandler[]> =>
	isVue2 ? (instance.$listeners ?? {}) : {};

type EventHandler = (...args: any[]) => any;
