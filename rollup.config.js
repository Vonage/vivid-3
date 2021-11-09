"use strict";
exports.__esModule = true;
var fs = require("fs");
var path = require("path");
function getFoldersInAFolder(workingFolder) {
    if (workingFolder === void 0) { workingFolder = './src/components'; }
    var testFolders = [];
    var testsFolder = path.join(__dirname, workingFolder);
    fs.readdirSync(testsFolder)
        .forEach(function (testFolder) {
        var absolutePath = path.join(testsFolder, testFolder);
        if (fs.statSync(absolutePath)
            .isDirectory()) {
            testFolders.push(testFolder);
        }
    });
    return testFolders;
}
var components = getFoldersInAFolder('./src/components');
console.log(components);
// export default {
//     input: 'src/index.js',
//     output: {
//         dir: 'output',
//         format: 'cjs'
//     },
//     plugins: [typescript()]
// };
