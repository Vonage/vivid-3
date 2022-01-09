import * as fs from "fs";
import * as path from "path";
import rollupBaseConfig from "./rollup.config.base.ts";

function getFoldersInAFolder(workingFolder = "../../src/components") {
  const testFolders = [];
  const testsFolder = path.join(__dirname, workingFolder);
  fs.readdirSync(testsFolder).forEach((testFolder) => {
    const absolutePath = path.join(testsFolder, testFolder);
    if (fs.statSync(absolutePath).isDirectory()) {
      testFolders.push(testFolder);
    }
  });
  return testFolders;
}

const components = getFoldersInAFolder();
const input = components.reduce((inputObject, componentName) => {
  inputObject[`components/${componentName}/index`] = path.join(
    process.cwd(),
    `src/components/${componentName}/index.ts`
  );
  return inputObject;
}, {});

export default {
  input,
  output: {
    sourcemap: "hidden",
    dir: "dist",
    format: "esm",
    chunkFileNames: `components/[name]/chunks/index.js`,
  },
  ...rollupBaseConfig,
};
