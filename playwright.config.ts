import { PlaywrightTestConfig, devices } from '@playwright/test';
import { visualRegressionPlugin } from '@web/test-runner-visual-regression/plugin';

interface PlaywrightTestConfigWithRegression extends PlaywrightTestConfig {
    plugins: any[];
}

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
    ],
};
export default config;
