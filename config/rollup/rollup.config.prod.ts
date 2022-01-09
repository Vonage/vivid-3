import * as fs from "fs";
import * as path from "path";
import rollupBaseConfig from "./rollup.config.base.ts";

function getFoldersInAFolder(workingFolder = "../../src/components") {
  const folders = [];
  const testsFolder = path.join(__dirname, workingFolder);
  fs.readdirSync(testsFolder).forEach((testFolder) => {
    const absolutePath = path.join(testsFolder, testFolder);
    if (fs.statSync(absolutePath).isDirectory()) {
      folders.push(testFolder);
    }
  });
  return folders;
}

const components = getFoldersInAFolder();
const input = components.reduce((inputObject, componentName) => {
  inputObject[`components/${componentName}/${componentName}`] = path.join(
    process.cwd(),
    `src/components/${componentName}/${componentName}.ts`
  );
  return inputObject;
}, {});

export default {
  input,
  output: {
    sourcemap: "hidden",
    dir: "dist",
    format: "esm",
    chunkFileNames: `components/[name]/chunks/[name]-[hash].js`,
  },
  ...rollupBaseConfig,
};
