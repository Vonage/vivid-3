import typescript from "@rollup/plugin-typescript";
import * as fs from 'fs';
import * as path from 'path';

function getFoldersInAFolder(workingFolder = './src/components') {
    const testFolders = [];
    const testsFolder = path.join(__dirname, workingFolder);
    fs.readdirSync(testsFolder)
        .forEach((testFolder) => {
            const absolutePath = path.join(testsFolder, testFolder);
            if (fs.statSync(absolutePath)
                .isDirectory()) {
                testFolders.push(testFolder);
            }
        });
    return testFolders;
}

const components = getFoldersInAFolder('./src/components');
const input = components.reduce((inputObject, componentName) => {
    inputObject[`components/${componentName}/${componentName}`] = path.join(process.cwd(), `src/components/${componentName}/${componentName}.ts`);
    return inputObject;
}, {});

export default {
    input,
    output: {
        dir: 'output',
        format: 'esm'
    },
    plugins: [typescript()]
};
