module.exports = {
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: process.cwd(),


    // frameworks to use
    // available frameworks: https://www.npmjs.com/search?q=keywords:karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        {
            pattern: 'src/**/*.ts',
            type: 'js'
        }
    ],


    // list of files / patterns to exclude
    exclude: [],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://www.npmjs.com/search?q=keywords:karma-preprocessor
    preprocessors: {
        'src/**/*.spec.ts': ["esbuild"]
    },

    esbuild: {
        format: "esm",
        target: "es2018",
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://www.npmjs.com/search?q=keywords:karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://www.npmjs.com/search?q=keywords:karma-launcher
    browsers: ['Chrome', 'ChromeHeadless', 'Firefox', 'SafariNative'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser instances should be started simultaneously
    concurrency: Infinity,

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
    }
};
