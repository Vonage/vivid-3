// libs/components/vite.config.ts
import * as path from "path";
import * as fs from "fs";
import { viteStaticCopy } from "file:///Users/RTannenbaum/projects/vivid-3/node_modules/vite-plugin-static-copy/dist/index.js";
import { defineConfig } from "file:///Users/RTannenbaum/projects/vivid-3/node_modules/vite/dist/node/index.js";
import { nxViteTsPaths } from "file:///Users/RTannenbaum/projects/vivid-3/node_modules/@nx/vite/plugins/nx-tsconfig-paths.plugin.js";
import dts from "file:///Users/RTannenbaum/projects/vivid-3/node_modules/vite-plugin-dts/dist/index.mjs";
var __vite_injected_original_dirname = "/Users/RTannenbaum/projects/vivid-3/libs/components";
function getFoldersInAFolder(workingFolder = "./src/lib/") {
  const folders = [];
  const testsFolder = path.join(__vite_injected_original_dirname, workingFolder);
  fs.readdirSync(testsFolder).forEach((testFolder) => {
    if (testFolder === "common")
      return;
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
var vite_config_default = defineConfig({
  cacheDir: "../../../node_modules/.vite/components",
  plugins: [
    viteStaticCopy({
      targets: [
        {
          "src": "./api-extractor.json",
          "dest": "."
        },
        {
          "src": "./.npmignore",
          "dest": "."
        },
        {
          "src": "./README.md",
          "dest": "."
        },
        {
          "src": "../../dist/libs/styles/tokens/**/*.css",
          "dest": "./styles/tokens"
        },
        {
          "src": "../../dist/libs/styles/fonts/**/*.{css,woff,woff2}",
          "dest": "./styles/fonts"
        },
        {
          "src": "../../dist/libs/styles/core/**/*.css",
          "dest": "./styles/core"
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
    plugins: [
      nxViteTsPaths()
    ]
  },
  build: {
    lib: {
      entry: input,
      name: "components",
      formats: ["es"]
    },
    minify: false,
    target: "esnext",
    rollupOptions: {
      input,
      output: {
        format: "esm",
        chunkFileNames: "shared/[name].js"
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibGlicy9jb21wb25lbnRzL3ZpdGUuY29uZmlnLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL1JUYW5uZW5iYXVtL3Byb2plY3RzL3ZpdmlkLTMvbGlicy9jb21wb25lbnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvUlRhbm5lbmJhdW0vcHJvamVjdHMvdml2aWQtMy9saWJzL2NvbXBvbmVudHMvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL1JUYW5uZW5iYXVtL3Byb2plY3RzL3ZpdmlkLTMvbGlicy9jb21wb25lbnRzL3ZpdGUuY29uZmlnLnRzXCI7Ly8vIDxyZWZlcmVuY2UgdHlwZXM9XCJ2aXRlc3RcIiAvPlxuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzJztcblxuaW1wb3J0IHsgdml0ZVN0YXRpY0NvcHkgfSBmcm9tICd2aXRlLXBsdWdpbi1zdGF0aWMtY29weSc7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcblxuaW1wb3J0IHsgbnhWaXRlVHNQYXRocyB9IGZyb20gJ0BueC92aXRlL3BsdWdpbnMvbngtdHNjb25maWctcGF0aHMucGx1Z2luJztcbmltcG9ydCBkdHMgZnJvbSAndml0ZS1wbHVnaW4tZHRzJztcblxuZnVuY3Rpb24gZ2V0Rm9sZGVyc0luQUZvbGRlcih3b3JraW5nRm9sZGVyID0gJy4vc3JjL2xpYi8nKSB7XG5cdGNvbnN0IGZvbGRlcnMgPSBbXTtcblx0Y29uc3QgdGVzdHNGb2xkZXIgPSBwYXRoLmpvaW4oX19kaXJuYW1lLCB3b3JraW5nRm9sZGVyKTtcblx0ZnMucmVhZGRpclN5bmModGVzdHNGb2xkZXIpLmZvckVhY2goKHRlc3RGb2xkZXIpID0+IHtcblx0XHRpZiAodGVzdEZvbGRlciA9PT0gJ2NvbW1vbicpIHJldHVybjtcblx0XHRjb25zdCBhYnNvbHV0ZVBhdGggPSBwYXRoLmpvaW4odGVzdHNGb2xkZXIsIHRlc3RGb2xkZXIpO1xuXHRcdGlmIChmcy5zdGF0U3luYyhhYnNvbHV0ZVBhdGgpLmlzRGlyZWN0b3J5KCkpIHtcblx0XHRcdGZvbGRlcnMucHVzaCh0ZXN0Rm9sZGVyKTtcblx0XHR9XG5cdH0pO1xuXHRyZXR1cm4gZm9sZGVycztcbn1cblxuY29uc3QgY29tcG9uZW50cyA9IGdldEZvbGRlcnNJbkFGb2xkZXIoKTtcbmNvbnN0IGlucHV0ID0gY29tcG9uZW50cy5yZWR1Y2UoKGlucHV0T2JqZWN0LCBjb21wb25lbnROYW1lKSA9PiB7XG5cdGlucHV0T2JqZWN0W2Ake2NvbXBvbmVudE5hbWV9L2luZGV4YF0gPSBwYXRoLmpvaW4oXG5cdFx0cHJvY2Vzcy5jd2QoKSxcblx0XHRgbGlicy9jb21wb25lbnRzL3NyYy9saWIvJHtjb21wb25lbnROYW1lfS9pbmRleC50c2Bcblx0KTtcblx0cmV0dXJuIGlucHV0T2JqZWN0O1xufSwge30pO1xuXG5jb25zdCBsb2NhbGVzID0gZnMucmVhZGRpclN5bmMocGF0aC5qb2luKF9fZGlybmFtZSwgJy4vc3JjL2xvY2FsZXMnKSk7XG5sb2NhbGVzLmZvckVhY2goKGxvY2FsZSkgPT4ge1xuXHRpbnB1dFtgbG9jYWxlcy8ke3BhdGgucGFyc2UobG9jYWxlKS5uYW1lfWBdID0gcGF0aC5qb2luKFxuXHRcdHByb2Nlc3MuY3dkKCksXG5cdFx0YGxpYnMvY29tcG9uZW50cy9zcmMvbG9jYWxlcy8ke2xvY2FsZX1gXG5cdCk7XG59KTtcblxuaW5wdXQuaW5kZXggPSBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgJ2xpYnMvY29tcG9uZW50cy9zcmMvaW5kZXgudHMnKTtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcblx0Y2FjaGVEaXI6ICcuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnZpdGUvY29tcG9uZW50cycsXG5cblx0cGx1Z2luczogW1xuXHRcdHZpdGVTdGF0aWNDb3B5KHtcblx0XHRcdHRhcmdldHM6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdCdzcmMnOiAnLi9hcGktZXh0cmFjdG9yLmpzb24nLFxuXHRcdFx0XHRcdCdkZXN0JzogJy4nXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHQnc3JjJzogJy4vLm5wbWlnbm9yZScsXG5cdFx0XHRcdFx0J2Rlc3QnOiAnLidcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdCdzcmMnOiAnLi9SRUFETUUubWQnLFxuXHRcdFx0XHRcdCdkZXN0JzogJy4nXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHQnc3JjJzogJy4uLy4uL2Rpc3QvbGlicy9zdHlsZXMvdG9rZW5zLyoqLyouY3NzJyxcblx0XHRcdFx0XHQnZGVzdCc6ICcuL3N0eWxlcy90b2tlbnMnXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHQnc3JjJzogJy4uLy4uL2Rpc3QvbGlicy9zdHlsZXMvZm9udHMvKiovKi57Y3NzLHdvZmYsd29mZjJ9Jyxcblx0XHRcdFx0XHQnZGVzdCc6ICcuL3N0eWxlcy9mb250cydcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdCdzcmMnOiAnLi4vLi4vZGlzdC9saWJzL3N0eWxlcy9jb3JlLyoqLyouY3NzJyxcblx0XHRcdFx0XHQnZGVzdCc6ICcuL3N0eWxlcy9jb3JlJ1xuXHRcdFx0XHR9XG5cdFx0XHRdXG5cdFx0fSksXG5cdFx0ZHRzKHtcblx0XHRcdGVudHJ5Um9vdDogJ3NyYycsXG5cdFx0XHR0c0NvbmZpZ0ZpbGVQYXRoOiBwYXRoLmpvaW4oX19kaXJuYW1lLCAndHNjb25maWcubGliLmpzb24nKSxcblx0XHRcdHNraXBEaWFnbm9zdGljczogdHJ1ZSxcblx0XHR9KSxcblxuXHRcdG54Vml0ZVRzUGF0aHMoKSxcblx0XSxcblxuXHR3b3JrZXI6IHtcblx0XHRwbHVnaW5zOiBbXG5cdFx0XHRueFZpdGVUc1BhdGhzKCksXG5cdFx0XSxcblx0fSxcblxuXHRidWlsZDoge1xuXHRcdGxpYjoge1xuXHRcdFx0ZW50cnk6IGlucHV0LFxuXHRcdFx0bmFtZTogJ2NvbXBvbmVudHMnLFxuXHRcdFx0Zm9ybWF0czogWydlcyddLFxuXHRcdH0sXG5cdFx0bWluaWZ5OiBmYWxzZSxcblx0XHR0YXJnZXQ6ICdlc25leHQnLFxuXHRcdHJvbGx1cE9wdGlvbnM6IHtcblx0XHRcdGlucHV0LFxuXHRcdFx0b3V0cHV0OiB7XG5cdFx0XHRcdGZvcm1hdDogJ2VzbScsXG5cdFx0XHRcdGNodW5rRmlsZU5hbWVzOiAnc2hhcmVkL1tuYW1lXS5qcydcblx0XHRcdH1cblx0XHR9LFxuXHR9XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFDQSxZQUFZLFVBQVU7QUFDdEIsWUFBWSxRQUFRO0FBRXBCLFNBQVMsc0JBQXNCO0FBQy9CLFNBQVMsb0JBQW9CO0FBRTdCLFNBQVMscUJBQXFCO0FBQzlCLE9BQU8sU0FBUztBQVJoQixJQUFNLG1DQUFtQztBQVV6QyxTQUFTLG9CQUFvQixnQkFBZ0IsY0FBYztBQUMxRCxRQUFNLFVBQVUsQ0FBQztBQUNqQixRQUFNLGNBQW1CLFVBQUssa0NBQVcsYUFBYTtBQUN0RCxFQUFHLGVBQVksV0FBVyxFQUFFLFFBQVEsQ0FBQyxlQUFlO0FBQ25ELFFBQUksZUFBZTtBQUFVO0FBQzdCLFVBQU0sZUFBb0IsVUFBSyxhQUFhLFVBQVU7QUFDdEQsUUFBTyxZQUFTLFlBQVksRUFBRSxZQUFZLEdBQUc7QUFDNUMsY0FBUSxLQUFLLFVBQVU7QUFBQSxJQUN4QjtBQUFBLEVBQ0QsQ0FBQztBQUNELFNBQU87QUFDUjtBQUVBLElBQU0sYUFBYSxvQkFBb0I7QUFDdkMsSUFBTSxRQUFRLFdBQVcsT0FBTyxDQUFDLGFBQWEsa0JBQWtCO0FBQy9ELGNBQVksR0FBRyxxQkFBcUIsSUFBUztBQUFBLElBQzVDLFFBQVEsSUFBSTtBQUFBLElBQ1osMkJBQTJCO0FBQUEsRUFDNUI7QUFDQSxTQUFPO0FBQ1IsR0FBRyxDQUFDLENBQUM7QUFFTCxJQUFNLFVBQWEsZUFBaUIsVUFBSyxrQ0FBVyxlQUFlLENBQUM7QUFDcEUsUUFBUSxRQUFRLENBQUMsV0FBVztBQUMzQixRQUFNLFdBQWdCLFdBQU0sTUFBTSxFQUFFLE1BQU0sSUFBUztBQUFBLElBQ2xELFFBQVEsSUFBSTtBQUFBLElBQ1osK0JBQStCO0FBQUEsRUFDaEM7QUFDRCxDQUFDO0FBRUQsTUFBTSxRQUFhLFVBQUssUUFBUSxJQUFJLEdBQUcsOEJBQThCO0FBRXJFLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzNCLFVBQVU7QUFBQSxFQUVWLFNBQVM7QUFBQSxJQUNSLGVBQWU7QUFBQSxNQUNkLFNBQVM7QUFBQSxRQUNSO0FBQUEsVUFDQyxPQUFPO0FBQUEsVUFDUCxRQUFRO0FBQUEsUUFDVDtBQUFBLFFBQ0E7QUFBQSxVQUNDLE9BQU87QUFBQSxVQUNQLFFBQVE7QUFBQSxRQUNUO0FBQUEsUUFDQTtBQUFBLFVBQ0MsT0FBTztBQUFBLFVBQ1AsUUFBUTtBQUFBLFFBQ1Q7QUFBQSxRQUNBO0FBQUEsVUFDQyxPQUFPO0FBQUEsVUFDUCxRQUFRO0FBQUEsUUFDVDtBQUFBLFFBQ0E7QUFBQSxVQUNDLE9BQU87QUFBQSxVQUNQLFFBQVE7QUFBQSxRQUNUO0FBQUEsUUFDQTtBQUFBLFVBQ0MsT0FBTztBQUFBLFVBQ1AsUUFBUTtBQUFBLFFBQ1Q7QUFBQSxNQUNEO0FBQUEsSUFDRCxDQUFDO0FBQUEsSUFDRCxJQUFJO0FBQUEsTUFDSCxXQUFXO0FBQUEsTUFDWCxrQkFBdUIsVUFBSyxrQ0FBVyxtQkFBbUI7QUFBQSxNQUMxRCxpQkFBaUI7QUFBQSxJQUNsQixDQUFDO0FBQUEsSUFFRCxjQUFjO0FBQUEsRUFDZjtBQUFBLEVBRUEsUUFBUTtBQUFBLElBQ1AsU0FBUztBQUFBLE1BQ1IsY0FBYztBQUFBLElBQ2Y7QUFBQSxFQUNEO0FBQUEsRUFFQSxPQUFPO0FBQUEsSUFDTixLQUFLO0FBQUEsTUFDSixPQUFPO0FBQUEsTUFDUCxNQUFNO0FBQUEsTUFDTixTQUFTLENBQUMsSUFBSTtBQUFBLElBQ2Y7QUFBQSxJQUNBLFFBQVE7QUFBQSxJQUNSLFFBQVE7QUFBQSxJQUNSLGVBQWU7QUFBQSxNQUNkO0FBQUEsTUFDQSxRQUFRO0FBQUEsUUFDUCxRQUFRO0FBQUEsUUFDUixnQkFBZ0I7QUFBQSxNQUNqQjtBQUFBLElBQ0Q7QUFBQSxFQUNEO0FBQ0QsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
