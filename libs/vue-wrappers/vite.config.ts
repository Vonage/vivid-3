import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [eslint()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    dedupe: ['vue'],
  },
  optimizeDeps: {
    exclude: ['vue', '@vonage/vivid'],
  },
  build: {
    lib: {
      name: 'vivid-vue',
      entry: path.resolve(__dirname, 'src/index.ts'),
      fileName: format => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['vue', '@vonage/vivid'],
      output: {
        globals: {
          vue: 'Vue',
          '@vonage/vivid': 'Vivid',
        },
        inlineDynamicImports: true,
      },
    },
  },
});
