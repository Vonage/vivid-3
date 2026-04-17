/// <reference types="vitest" />
import { defineConfig } from 'vite';

export default defineConfig({
	build: {
		chunkSizeWarningLimit: 1000,
	},
});
