const del = require("rollup-plugin-delete");
const typescript = require("@rollup/plugin-typescript");
const {nodeResolve} = require("@rollup/plugin-node-resolve");

module.exports = {
    basePath: process.cwd(),
    frameworks: ['jasmine'],
    files: [
        {
            pattern: 'src/**/*.spec.ts',
            watched: false
        }
    ],
    exclude: [],
    reporters: ['progress'],
    port: 9876,
    colors: true,
    autoWatch: true,
    browsers: ['Chrome', 'ChromeHeadless', 'Firefox', 'SafariNative'],
    concurrency: Infinity,
    preprocessors: {
        'src/**/*.spec.ts': ["rollup"]
    },
    coverageReporter: {
        dir: `coverage/`,
        reporters: [
            {
                type: 'cobertura', subdir: 'report-cobertura', file: 'coverage.xml'
            },
            {
                type: 'lcovonly', subdir: 'report-lcov', file: 'lcov.info'
            }
        ]
    },
    rollupPreprocessor: {
        plugins: [typescript({ tsconfig: './config/typescript/tsconfig.spec.json'}), nodeResolve()],
        output: {
            format: 'iife',
            name: 'testFile',
            sourcemap: 'inline',
        },
    },
};
