// libs/components/vite.config.ts
import * as path from "path";
import * as fs from "fs";
import { viteStaticCopy } from "file:///Users/jstaylor/Documents/Development/fresh/vivid-3/node_modules/vite-plugin-static-copy/dist/index.js";
import { defineConfig } from "file:///Users/jstaylor/Documents/Development/fresh/vivid-3/node_modules/vite/dist/node/index.js";
import { nxViteTsPaths } from "file:///Users/jstaylor/Documents/Development/fresh/vivid-3/node_modules/@nx/vite/plugins/nx-tsconfig-paths.plugin.js";
import dts from "file:///Users/jstaylor/Documents/Development/fresh/vivid-3/node_modules/vite-plugin-dts/dist/index.mjs";
var __vite_injected_original_dirname = "/Users/jstaylor/Documents/Development/fresh/vivid-3/libs/components";
function getFoldersInAFolder(workingFolder = "./src/lib/") {
  const folders = [];
  const testsFolder = path.join(__vite_injected_original_dirname, workingFolder);
  fs.readdirSync(testsFolder).forEach((testFolder) => {
    if (testFolder === "common") return;
    const absolutePath = path.join(testsFolder, testFolder);
    if (fs.statSync(absolutePath).isDirectory()) {
      folders.push(testFolder);
    }
  });
  return folders;
}
var components = getFoldersInAFolder();
var input = components.reduce((inputObject, componentName) => {
  inputObject[`${componentName}/index`] = path.join(
    process.cwd(),
    `libs/components/src/lib/${componentName}/index.ts`
  );
  return inputObject;
}, {});
var locales = fs.readdirSync(path.join(__vite_injected_original_dirname, "./src/locales"));
locales.forEach((locale) => {
  input[`locales/${path.parse(locale).name}`] = path.join(
    process.cwd(),
    `libs/components/src/locales/${locale}`
  );
});
input.index = path.join(process.cwd(), "libs/components/src/index.ts");
var isWatchMode = process.env.WATCH === "true";
var vite_config_default = defineConfig({
  cacheDir: "../../../node_modules/.vite/components",
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: "./api-extractor.json",
          dest: "."
        },
        {
          src: "./.npmignore",
          dest: "."
        },
        {
          src: "./README.md",
          dest: "."
        },
        {
          src: "../../dist/libs/styles/tokens/**/*.css",
          dest: "./styles/tokens"
        },
        {
          src: "../../dist/libs/styles/fonts/**/*.{css,woff,woff2}",
          dest: "./styles/fonts"
        },
        {
          src: "../../dist/libs/styles/core/**/*.css",
          dest: "./styles/core"
        }
      ]
    }),
    dts({
      entryRoot: "src",
      tsConfigFilePath: path.join(__vite_injected_original_dirname, "tsconfig.lib.json"),
      skipDiagnostics: true
    }),
    nxViteTsPaths()
  ],
  worker: {
    plugins: [nxViteTsPaths()]
  },
  build: {
    emptyOutDir: true,
    lib: {
      entry: input,
      name: "components",
      formats: ["es", "cjs"]
    },
    minify: false,
    cssMinify: true,
    target: "esnext",
    rollupOptions: {
      input,
      output: [
        {
          format: "es",
          chunkFileNames: "shared/[name].js"
        },
        {
          format: "cjs",
          chunkFileNames: "shared/[name].cjs"
        }
      ]
    },
    watch: isWatchMode ? {
      exclude: ["**/*.md"]
    } : null
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibGlicy9jb21wb25lbnRzL3ZpdGUuY29uZmlnLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2pzdGF5bG9yL0RvY3VtZW50cy9EZXZlbG9wbWVudC9mcmVzaC92aXZpZC0zL2xpYnMvY29tcG9uZW50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2pzdGF5bG9yL0RvY3VtZW50cy9EZXZlbG9wbWVudC9mcmVzaC92aXZpZC0zL2xpYnMvY29tcG9uZW50cy92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvanN0YXlsb3IvRG9jdW1lbnRzL0RldmVsb3BtZW50L2ZyZXNoL3ZpdmlkLTMvbGlicy9jb21wb25lbnRzL3ZpdGUuY29uZmlnLnRzXCI7Ly8vIDxyZWZlcmVuY2UgdHlwZXM9XCJ2aXRlc3RcIiAvPlxuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzJztcblxuaW1wb3J0IHsgdml0ZVN0YXRpY0NvcHkgfSBmcm9tICd2aXRlLXBsdWdpbi1zdGF0aWMtY29weSc7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcblxuaW1wb3J0IHsgbnhWaXRlVHNQYXRocyB9IGZyb20gJ0BueC92aXRlL3BsdWdpbnMvbngtdHNjb25maWctcGF0aHMucGx1Z2luJztcbmltcG9ydCBkdHMgZnJvbSAndml0ZS1wbHVnaW4tZHRzJztcblxuZnVuY3Rpb24gZ2V0Rm9sZGVyc0luQUZvbGRlcih3b3JraW5nRm9sZGVyID0gJy4vc3JjL2xpYi8nKSB7XG5cdGNvbnN0IGZvbGRlcnMgPSBbXTtcblx0Y29uc3QgdGVzdHNGb2xkZXIgPSBwYXRoLmpvaW4oX19kaXJuYW1lLCB3b3JraW5nRm9sZGVyKTtcblx0ZnMucmVhZGRpclN5bmModGVzdHNGb2xkZXIpLmZvckVhY2goKHRlc3RGb2xkZXIpID0+IHtcblx0XHRpZiAodGVzdEZvbGRlciA9PT0gJ2NvbW1vbicpIHJldHVybjtcblx0XHRjb25zdCBhYnNvbHV0ZVBhdGggPSBwYXRoLmpvaW4odGVzdHNGb2xkZXIsIHRlc3RGb2xkZXIpO1xuXHRcdGlmIChmcy5zdGF0U3luYyhhYnNvbHV0ZVBhdGgpLmlzRGlyZWN0b3J5KCkpIHtcblx0XHRcdGZvbGRlcnMucHVzaCh0ZXN0Rm9sZGVyKTtcblx0XHR9XG5cdH0pO1xuXHRyZXR1cm4gZm9sZGVycztcbn1cblxuY29uc3QgY29tcG9uZW50cyA9IGdldEZvbGRlcnNJbkFGb2xkZXIoKTtcbmNvbnN0IGlucHV0ID0gY29tcG9uZW50cy5yZWR1Y2UoKGlucHV0T2JqZWN0LCBjb21wb25lbnROYW1lKSA9PiB7XG5cdGlucHV0T2JqZWN0W2Ake2NvbXBvbmVudE5hbWV9L2luZGV4YF0gPSBwYXRoLmpvaW4oXG5cdFx0cHJvY2Vzcy5jd2QoKSxcblx0XHRgbGlicy9jb21wb25lbnRzL3NyYy9saWIvJHtjb21wb25lbnROYW1lfS9pbmRleC50c2Bcblx0KTtcblx0cmV0dXJuIGlucHV0T2JqZWN0O1xufSwge30pO1xuXG5jb25zdCBsb2NhbGVzID0gZnMucmVhZGRpclN5bmMocGF0aC5qb2luKF9fZGlybmFtZSwgJy4vc3JjL2xvY2FsZXMnKSk7XG5sb2NhbGVzLmZvckVhY2goKGxvY2FsZSkgPT4ge1xuXHRpbnB1dFtgbG9jYWxlcy8ke3BhdGgucGFyc2UobG9jYWxlKS5uYW1lfWBdID0gcGF0aC5qb2luKFxuXHRcdHByb2Nlc3MuY3dkKCksXG5cdFx0YGxpYnMvY29tcG9uZW50cy9zcmMvbG9jYWxlcy8ke2xvY2FsZX1gXG5cdCk7XG59KTtcblxuaW5wdXQuaW5kZXggPSBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgJ2xpYnMvY29tcG9uZW50cy9zcmMvaW5kZXgudHMnKTtcblxuY29uc3QgaXNXYXRjaE1vZGUgPSBwcm9jZXNzLmVudi5XQVRDSCA9PT0gJ3RydWUnO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuXHRjYWNoZURpcjogJy4uLy4uLy4uL25vZGVfbW9kdWxlcy8udml0ZS9jb21wb25lbnRzJyxcblxuXHRwbHVnaW5zOiBbXG5cdFx0dml0ZVN0YXRpY0NvcHkoe1xuXHRcdFx0dGFyZ2V0czogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0c3JjOiAnLi9hcGktZXh0cmFjdG9yLmpzb24nLFxuXHRcdFx0XHRcdGRlc3Q6ICcuJyxcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHNyYzogJy4vLm5wbWlnbm9yZScsXG5cdFx0XHRcdFx0ZGVzdDogJy4nLFxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0c3JjOiAnLi9SRUFETUUubWQnLFxuXHRcdFx0XHRcdGRlc3Q6ICcuJyxcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHNyYzogJy4uLy4uL2Rpc3QvbGlicy9zdHlsZXMvdG9rZW5zLyoqLyouY3NzJyxcblx0XHRcdFx0XHRkZXN0OiAnLi9zdHlsZXMvdG9rZW5zJyxcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHNyYzogJy4uLy4uL2Rpc3QvbGlicy9zdHlsZXMvZm9udHMvKiovKi57Y3NzLHdvZmYsd29mZjJ9Jyxcblx0XHRcdFx0XHRkZXN0OiAnLi9zdHlsZXMvZm9udHMnLFxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0c3JjOiAnLi4vLi4vZGlzdC9saWJzL3N0eWxlcy9jb3JlLyoqLyouY3NzJyxcblx0XHRcdFx0XHRkZXN0OiAnLi9zdHlsZXMvY29yZScsXG5cdFx0XHRcdH0sXG5cdFx0XHRdLFxuXHRcdH0pLFxuXHRcdGR0cyh7XG5cdFx0XHRlbnRyeVJvb3Q6ICdzcmMnLFxuXHRcdFx0dHNDb25maWdGaWxlUGF0aDogcGF0aC5qb2luKF9fZGlybmFtZSwgJ3RzY29uZmlnLmxpYi5qc29uJyksXG5cdFx0XHRza2lwRGlhZ25vc3RpY3M6IHRydWUsXG5cdFx0fSksXG5cblx0XHRueFZpdGVUc1BhdGhzKCksXG5cdF0sXG5cblx0d29ya2VyOiB7XG5cdFx0cGx1Z2luczogW254Vml0ZVRzUGF0aHMoKV0sXG5cdH0sXG5cblx0YnVpbGQ6IHtcblx0XHRlbXB0eU91dERpcjogdHJ1ZSxcblx0XHRsaWI6IHtcblx0XHRcdGVudHJ5OiBpbnB1dCxcblx0XHRcdG5hbWU6ICdjb21wb25lbnRzJyxcblx0XHRcdGZvcm1hdHM6IFsnZXMnLCAnY2pzJ10sXG5cdFx0fSxcblx0XHRtaW5pZnk6IGZhbHNlLFxuXHRcdGNzc01pbmlmeTogdHJ1ZSxcblx0XHR0YXJnZXQ6ICdlc25leHQnLFxuXHRcdHJvbGx1cE9wdGlvbnM6IHtcblx0XHRcdGlucHV0LFxuXHRcdFx0b3V0cHV0OiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRmb3JtYXQ6ICdlcycsXG5cdFx0XHRcdFx0Y2h1bmtGaWxlTmFtZXM6ICdzaGFyZWQvW25hbWVdLmpzJyxcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGZvcm1hdDogJ2NqcycsXG5cdFx0XHRcdFx0Y2h1bmtGaWxlTmFtZXM6ICdzaGFyZWQvW25hbWVdLmNqcycsXG5cdFx0XHRcdH0sXG5cdFx0XHRdLFxuXHRcdH0sXG5cdFx0d2F0Y2g6IGlzV2F0Y2hNb2RlXG5cdFx0XHQ/IHtcblx0XHRcdFx0XHRleGNsdWRlOiBbJyoqLyoubWQnXSxcblx0XHRcdCAgfVxuXHRcdFx0OiBudWxsLFxuXHR9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQ0EsWUFBWSxVQUFVO0FBQ3RCLFlBQVksUUFBUTtBQUVwQixTQUFTLHNCQUFzQjtBQUMvQixTQUFTLG9CQUFvQjtBQUU3QixTQUFTLHFCQUFxQjtBQUM5QixPQUFPLFNBQVM7QUFSaEIsSUFBTSxtQ0FBbUM7QUFVekMsU0FBUyxvQkFBb0IsZ0JBQWdCLGNBQWM7QUFDMUQsUUFBTSxVQUFV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
