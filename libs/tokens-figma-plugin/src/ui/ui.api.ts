import type { MainAPI } from '@main/main.api';
import { client } from 'figwire/ui';

export const mainApiClient = client<MainAPI>();

export type UiAPI = typeof mainApiClient;
