// vite.config.ts
import * as path from "path";
import * as fs from "fs";
import { viteStaticCopy } from "file:///Users/jstaylor/Documents/Development/fresh-202507/vivid-3/node_modules/vite-plugin-static-copy/dist/index.js";
import { defineConfig, mergeConfig } from "file:///Users/jstaylor/Documents/Development/fresh-202507/vivid-3/node_modules/vite/dist/node/index.js";
import dts from "file:///Users/jstaylor/Documents/Development/fresh-202507/vivid-3/node_modules/vite-plugin-dts/dist/index.mjs";
import { NodePackageImporter } from "file:///Users/jstaylor/Documents/Development/fresh-202507/vivid-3/node_modules/sass/sass.node.mjs";
import vitestBaseConfig from "file:///Users/jstaylor/Documents/Development/fresh-202507/vivid-3/libs/vitest-config/dist/jsdom-config.mjs";
var __vite_injected_original_dirname = "/Users/jstaylor/Documents/Development/fresh-202507/vivid-3/libs/components";
function generateRollupInput() {
  function getListOfComponents() {
    return getFoldersInAFolder("./src/lib/");
  }
  function convertComponentsToRollupInput(components2) {
    return components2.reduce(
      (inputObject, componentName) => {
        inputObject[`${componentName}/index`] = path.join(
          process.cwd(),
          `src/lib/${componentName}/index.ts`
        );
        return inputObject;
      },
      {}
    );
  }
  function getFoldersInAFolder(workingFolder = "./src/lib/") {
    const folders = [];
    const fullWorkingFolderPath = path.join(__vite_injected_original_dirname, workingFolder);
    fs.readdirSync(fullWorkingFolderPath).forEach((testFolder) => {
      if (testFolder === "common") return;
      const absolutePath = path.join(fullWorkingFolderPath, testFolder);
      if (fs.statSync(absolutePath).isDirectory()) {
        folders.push(testFolder);
      }
    });
    return folders;
  }
  const components = getListOfComponents();
  const input2 = convertComponentsToRollupInput(components);
  const locales = fs.readdirSync(path.join(__vite_injected_original_dirname, "./src/locales"));
  locales.forEach((locale) => {
    input2[`locales/${path.parse(locale).name}`] = path.join(
      process.cwd(),
      `src/locales/${locale}`
    );
  });
  input2.index = path.join(process.cwd(), "src/index.ts");
  return input2;
}
var input = generateRollupInput();
var packageVersion = JSON.parse(
  fs.readFileSync(path.join(__vite_injected_original_dirname, "package.json"), "utf-8")
).version;
var isWatchMode = process.env.WATCH_MODE === "true";
var vite_config_default = mergeConfig(
  vitestBaseConfig,
  defineConfig({
    test: {
      setupFiles: ["vitest.setup.ts"],
      pool: "threads",
      poolOptions: {
        threads: {
          useAtomics: true
        }
      }
    },
    plugins: [
      viteStaticCopy({
        targets: [
          {
            src: "./api-extractor.json",
            dest: "."
          },
          {
            src: "./custom-elements.json",
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
            src: `${new URL(await import.meta.resolve("@repo/styles/dist")).pathname}/*`,
            dest: "./styles"
          }
        ]
      }),
      !isWatchMode ? dts({
        skipDiagnostics: true
      }) : void 0
    ],
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
    },
    define: {
      __PACKAGE_VERSION__: JSON.stringify(packageVersion)
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
          importers: [new NodePackageImporter()]
        }
      }
    }
  })
);
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvanN0YXlsb3IvRG9jdW1lbnRzL0RldmVsb3BtZW50L2ZyZXNoLTIwMjUwNy92aXZpZC0zL2xpYnMvY29tcG9uZW50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2pzdGF5bG9yL0RvY3VtZW50cy9EZXZlbG9wbWVudC9mcmVzaC0yMDI1MDcvdml2aWQtMy9saWJzL2NvbXBvbmVudHMvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2pzdGF5bG9yL0RvY3VtZW50cy9EZXZlbG9wbWVudC9mcmVzaC0yMDI1MDcvdml2aWQtMy9saWJzL2NvbXBvbmVudHMvdml0ZS5jb25maWcudHNcIjsvLy8gPHJlZmVyZW5jZSB0eXBlcz1cInZpdGVzdC9jb25maWdcIiAvPlxuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzJztcbmltcG9ydCB7IHZpdGVTdGF0aWNDb3B5IH0gZnJvbSAndml0ZS1wbHVnaW4tc3RhdGljLWNvcHknO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBtZXJnZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IGR0cyBmcm9tICd2aXRlLXBsdWdpbi1kdHMnO1xuaW1wb3J0IHsgTm9kZVBhY2thZ2VJbXBvcnRlciB9IGZyb20gJ3Nhc3MnO1xuaW1wb3J0IHZpdGVzdEJhc2VDb25maWcgZnJvbSAnQHJlcG8vdml0ZXN0LWNvbmZpZy91aSc7XG5cbmZ1bmN0aW9uIGdlbmVyYXRlUm9sbHVwSW5wdXQoKSB7XG5cdGZ1bmN0aW9uIGdldExpc3RPZkNvbXBvbmVudHMoKSB7XG5cdFx0cmV0dXJuIGdldEZvbGRlcnNJbkFGb2xkZXIoJy4vc3JjL2xpYi8nKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGNvbnZlcnRDb21wb25lbnRzVG9Sb2xsdXBJbnB1dChjb21wb25lbnRzOiBzdHJpbmdbXSkge1xuXHRcdHJldHVybiBjb21wb25lbnRzLnJlZHVjZTxSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+Pihcblx0XHRcdChpbnB1dE9iamVjdCwgY29tcG9uZW50TmFtZSkgPT4ge1xuXHRcdFx0XHRpbnB1dE9iamVjdFtgJHtjb21wb25lbnROYW1lfS9pbmRleGBdID0gcGF0aC5qb2luKFxuXHRcdFx0XHRcdHByb2Nlc3MuY3dkKCksXG5cdFx0XHRcdFx0YHNyYy9saWIvJHtjb21wb25lbnROYW1lfS9pbmRleC50c2Bcblx0XHRcdFx0KTtcblx0XHRcdFx0cmV0dXJuIGlucHV0T2JqZWN0O1xuXHRcdFx0fSxcblx0XHRcdHt9XG5cdFx0KTtcblx0fVxuXG5cdGZ1bmN0aW9uIGdldEZvbGRlcnNJbkFGb2xkZXIod29ya2luZ0ZvbGRlciA9ICcuL3NyYy9saWIvJykge1xuXHRcdGNvbnN0IGZvbGRlcnM6IHN0cmluZ1tdID0gW107XG5cdFx0Y29uc3QgZnVsbFdvcmtpbmdGb2xkZXJQYXRoID0gcGF0aC5qb2luKF9fZGlybmFtZSwgd29ya2luZ0ZvbGRlcik7XG5cdFx0ZnMucmVhZGRpclN5bmMoZnVsbFdvcmtpbmdGb2xkZXJQYXRoKS5mb3JFYWNoKCh0ZXN0Rm9sZGVyKSA9PiB7XG5cdFx0XHRpZiAodGVzdEZvbGRlciA9PT0gJ2NvbW1vbicpIHJldHVybjtcblx0XHRcdGNvbnN0IGFic29sdXRlUGF0aCA9IHBhdGguam9pbihmdWxsV29ya2luZ0ZvbGRlclBhdGgsIHRlc3RGb2xkZXIpO1xuXHRcdFx0aWYgKGZzLnN0YXRTeW5jKGFic29sdXRlUGF0aCkuaXNEaXJlY3RvcnkoKSkge1xuXHRcdFx0XHRmb2xkZXJzLnB1c2godGVzdEZvbGRlcik7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0cmV0dXJuIGZvbGRlcnM7XG5cdH1cblxuXHRjb25zdCBjb21wb25lbnRzID0gZ2V0TGlzdE9mQ29tcG9uZW50cygpO1xuXHRjb25zdCBpbnB1dCA9IGNvbnZlcnRDb21wb25lbnRzVG9Sb2xsdXBJbnB1dChjb21wb25lbnRzKTtcblxuXHRjb25zdCBsb2NhbGVzID0gZnMucmVhZGRpclN5bmMocGF0aC5qb2luKF9fZGlybmFtZSwgJy4vc3JjL2xvY2FsZXMnKSk7XG5cdGxvY2FsZXMuZm9yRWFjaCgobG9jYWxlKSA9PiB7XG5cdFx0aW5wdXRbYGxvY2FsZXMvJHtwYXRoLnBhcnNlKGxvY2FsZSkubmFtZX1gXSA9IHBhdGguam9pbihcblx0XHRcdHByb2Nlc3MuY3dkKCksXG5cdFx0XHRgc3JjL2xvY2FsZXMvJHtsb2NhbGV9YFxuXHRcdCk7XG5cdH0pO1xuXG5cdGlucHV0LmluZGV4ID0gcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksICdzcmMvaW5kZXgudHMnKTtcblxuXHRyZXR1cm4gaW5wdXQ7XG59XG5cbmNvbnN0IGlucHV0ID0gZ2VuZXJhdGVSb2xsdXBJbnB1dCgpO1xuXG5jb25zdCBwYWNrYWdlVmVyc2lvbiA9IEpTT04ucGFyc2UoXG5cdGZzLnJlYWRGaWxlU3luYyhwYXRoLmpvaW4oX19kaXJuYW1lLCAncGFja2FnZS5qc29uJyksICd1dGYtOCcpXG4pLnZlcnNpb247XG5cbmNvbnN0IGlzV2F0Y2hNb2RlID0gcHJvY2Vzcy5lbnYuV0FUQ0hfTU9ERSA9PT0gJ3RydWUnO1xuXG5leHBvcnQgZGVmYXVsdCBtZXJnZUNvbmZpZyhcblx0dml0ZXN0QmFzZUNvbmZpZyxcblx0ZGVmaW5lQ29uZmlnKHtcblx0XHR0ZXN0OiB7XG5cdFx0XHRzZXR1cEZpbGVzOiBbJ3ZpdGVzdC5zZXR1cC50cyddLFxuXG5cdFx0XHRwb29sOiAndGhyZWFkcycsXG5cdFx0XHRwb29sT3B0aW9uczoge1xuXHRcdFx0XHR0aHJlYWRzOiB7XG5cdFx0XHRcdFx0dXNlQXRvbWljczogdHJ1ZSxcblx0XHRcdFx0fSxcblx0XHRcdH0sXG5cdFx0fSxcblxuXHRcdHBsdWdpbnM6IFtcblx0XHRcdHZpdGVTdGF0aWNDb3B5KHtcblx0XHRcdFx0dGFyZ2V0czogW1xuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHNyYzogJy4vYXBpLWV4dHJhY3Rvci5qc29uJyxcblx0XHRcdFx0XHRcdGRlc3Q6ICcuJyxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHNyYzogJy4vY3VzdG9tLWVsZW1lbnRzLmpzb24nLFxuXHRcdFx0XHRcdFx0ZGVzdDogJy4nLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0c3JjOiAnLi8ubnBtaWdub3JlJyxcblx0XHRcdFx0XHRcdGRlc3Q6ICcuJyxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHNyYzogJy4vUkVBRE1FLm1kJyxcblx0XHRcdFx0XHRcdGRlc3Q6ICcuJyxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHNyYzogYCR7XG5cdFx0XHRcdFx0XHRcdG5ldyBVUkwoYXdhaXQgaW1wb3J0Lm1ldGEucmVzb2x2ZSgnQHJlcG8vc3R5bGVzL2Rpc3QnKSkucGF0aG5hbWVcblx0XHRcdFx0XHRcdH0vKmAsXG5cdFx0XHRcdFx0XHRkZXN0OiAnLi9zdHlsZXMnLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdF0sXG5cdFx0XHR9KSxcblx0XHRcdCFpc1dhdGNoTW9kZVxuXHRcdFx0XHQ/IGR0cyh7XG5cdFx0XHRcdFx0XHRza2lwRGlhZ25vc3RpY3M6IHRydWUsXG5cdFx0XHRcdCAgfSlcblx0XHRcdFx0OiB1bmRlZmluZWQsXG5cdFx0XSxcblx0XHRidWlsZDoge1xuXHRcdFx0ZW1wdHlPdXREaXI6IHRydWUsXG5cdFx0XHRsaWI6IHtcblx0XHRcdFx0ZW50cnk6IGlucHV0LFxuXHRcdFx0XHRuYW1lOiAnY29tcG9uZW50cycsXG5cdFx0XHRcdGZvcm1hdHM6IFsnZXMnLCAnY2pzJ10sXG5cdFx0XHR9LFxuXHRcdFx0bWluaWZ5OiBmYWxzZSxcblx0XHRcdGNzc01pbmlmeTogdHJ1ZSxcblx0XHRcdHRhcmdldDogJ2VzbmV4dCcsXG5cdFx0XHRyb2xsdXBPcHRpb25zOiB7XG5cdFx0XHRcdGlucHV0LFxuXHRcdFx0XHRvdXRwdXQ6IFtcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRmb3JtYXQ6ICdlcycsXG5cdFx0XHRcdFx0XHRjaHVua0ZpbGVOYW1lczogJ3NoYXJlZC9bbmFtZV0uanMnLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0Zm9ybWF0OiAnY2pzJyxcblx0XHRcdFx0XHRcdGNodW5rRmlsZU5hbWVzOiAnc2hhcmVkL1tuYW1lXS5janMnLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdF0sXG5cdFx0XHR9LFxuXHRcdFx0d2F0Y2g6IGlzV2F0Y2hNb2RlXG5cdFx0XHRcdD8ge1xuXHRcdFx0XHRcdFx0ZXhjbHVkZTogWycqKi8qLm1kJ10sXG5cdFx0XHRcdCAgfVxuXHRcdFx0XHQ6IG51bGwsXG5cdFx0fSxcblx0XHRkZWZpbmU6IHtcblx0XHRcdF9fUEFDS0FHRV9WRVJTSU9OX186IEpTT04uc3RyaW5naWZ5KHBhY2thZ2VWZXJzaW9uKSxcblx0XHR9LFxuXHRcdGNzczoge1xuXHRcdFx0cHJlcHJvY2Vzc29yT3B0aW9uczoge1xuXHRcdFx0XHRzY3NzOiB7XG5cdFx0XHRcdFx0YXBpOiAnbW9kZXJuLWNvbXBpbGVyJyxcblx0XHRcdFx0XHRpbXBvcnRlcnM6IFtuZXcgTm9kZVBhY2thZ2VJbXBvcnRlcigpXSxcblx0XHRcdFx0fSxcblx0XHRcdH0sXG5cdFx0fSxcblx0fSlcbik7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQ0EsWUFBWSxVQUFVO0FBQ3RCLFlBQVksUUFBUTtBQUNwQixTQUFTLHNCQUFzQjtBQUMvQixTQUFTLGNBQWMsbUJBQW1CO0FBQzFDLE9BQU8sU0FBUztBQUNoQixTQUFTLDJCQUEyQjtBQUNwQyxPQUFPLHNCQUFzQjtBQVA3QixJQUFNLG1DQUFtQztB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QUNkO0FBQUEsUUFDQSxRQUFRO0FBQUEsVUFDUDtBQUFBLFlBQ0MsUUFBUTtBQUFBLFlBQ1IsZ0JBQWdCO0FBQUEsVUFDakI7QUFBQSxVQUNBO0FBQUEsWUFDQyxRQUFRO0FBQUEsWUFDUixnQkFBZ0I7QUFBQSxVQUNqQjtBQUFBLFFBQ0Q7QUFBQSxNQUNEO0FBQUEsTUFDQSxPQUFPLGNBQ0o7QUFBQSxRQUNBLFNBQVMsQ0FBQyxTQUFTO0FBQUEsTUFDbkIsSUFDQTtBQUFBLElBQ0o7QUFBQSxJQUNBLFFBQVE7QUFBQSxNQUNQLHFCQUFxQixLQUFLLFVBQVUsY0FBYztBQUFBLElBQ25EO0FBQUEsSUFDQSxLQUFLO0FBQUEsTUFDSixxQkFBcUI7QUFBQSxRQUNwQixNQUFNO0FBQUEsVUFDTCxLQUFLO0FBQUEsVUFDTCxXQUFXLENBQUMsSUFBSSxvQkFBb0IsQ0FBQztBQUFBLFFBQ3RDO0FBQUEsTUFDRDtBQUFBLElBQ0Q7QUFBQSxFQUNELENBQUM7QUFDRjsiLAogICJuYW1lcyI6IFsiY29tcG9uZW50cyIsICJpbnB1dCJdCn0K
