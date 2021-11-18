import { PlaywrightTestConfig, devices } from '@playwright/test';
import { visualRegressionPlugin } from '@web/test-runner-visual-regression/plugin';
import {specTypescriptConfig} from './config/rollup/rollup.config.spec';
import {fromRollup} from "@web/dev-server-rollup";
import typescript from "@rollup/plugin-typescript";

interface PlaywrightTestConfigWithRegression extends PlaywrightTestConfig {
    plugins: any[];
}

const tsPlugin = fromRollup(typescript);
const config: PlaywrightTestConfigWithRegression = {
    testMatch: 'src/**/*.test.ts',
    projects: [
        {
            name: 'Chrome Stable',
            use: {
                browserName: 'chromium',
                channel: 'chrome',
            },
        },
        {
            name: 'Desktop Safari',
            use: {
                browserName: 'webkit',
                viewport: { width: 1200, height: 750 },
            }
        },
        {
            name: 'Desktop Firefox',
            use: {
                browserName: 'firefox',
                viewport: { width: 800, height: 600 },
            }
        },
    ],
    plugins: [
        visualRegressionPlugin({
            update: process.argv.includes('--update-visual-baseline'),
        }),
        tsPlugin(specTypescriptConfig)
    ],
};
export default config;
