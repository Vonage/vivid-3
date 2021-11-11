const del = require("rollup-plugin-delete");
const typescript = require("@rollup/plugin-typescript");
const {nodeResolve} = require("@rollup/plugin-node-resolve");
const istanbul = require('./scripts/rollup-plugin-istanbul.cjs');

module.exports = function (config) {

    config.set({
        basePath: process.cwd(),
        frameworks: ['jasmine'],
        files: [
            {
                pattern: 'src/**/*.spec.ts',
                watched: false
            }
        ],
        exclude: [],
        reporters: config.coverage ? ['coverage', 'progress'] : ['progress'],
        port: 9876,
        colors: true,
        autoWatch: true,
        browsers: ['Chrome', 'ChromeHeadless', 'Firefox', 'SafariNative'],
        concurrency: Infinity,
        preprocessors: {
            'src/**/*.spec.ts': ["rollup"],
        },
        coverageReporter: {
            dir: `coverage/`,
            includeAllSources: true,
            reporters: [
                {
                    type: 'cobertura', subdir: 'report-cobertura', file: 'coverage.xml'
                },
                {
                    type: 'lcovonly', subdir: 'report-lcov', file: 'lcov.info'
                },
                {
                    type: 'html'
                }
            ]
        },
        rollupPreprocessor: {
            plugins: [
                del({targets: 'dist/*'}),
                typescript({tsconfig: './config/typescript/tsconfig.spec.json'}),
                istanbul({
                    exclude: ['src/**/*.spec.ts', 'node_modules/**/*']
                }),
                nodeResolve()],
            output: {
                format: 'iife',
                name: 'testFile',
                sourcemap: 'inline',
            },
        },
    });
};
