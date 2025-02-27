import { defineWorkspace } from 'vitest/config';

const isCI = process.env['CI'] === 'true';
const isA11y = process.env['A11Y'] === 'true';

export default defineWorkspace([
    {
        extends: 'vite.config.ts',
        test: {
            name: 'a11y',
            globals: true,
            environment: 'jsdom',
            include: ['libs/components/src/**/*.a11y.spec.ts'],
            setupFiles: ['libs/components/vitest.a11y.setup.ts'],
        },
    },
    {
        extends: 'vite.config.ts',
        test: {
            name: 'browser',
            globals: true,
            include: ['libs/components/src/**/*.spec.ts'],
            exclude: ['libs/components/src/**/*.a11y.spec.ts'],
            setupFiles: ['libs/components/vitest.setup.ts'], 
            coverage: {
                reportsDirectory: '../../coverage/libs/components',
                provider: 'v8',
                include: ['src/**/*.ts'],
                exclude: ['src/**/*.spec.ts', 'src/**/*test*.ts', 'src/locales/**.*'],
                reporter: isCI
                    ? ['lcov', 'text']
                    : ['text', 'html', 'clover', 'json', 'lcov'],
            },
            browser: {
                name: 'chromium',
                provider: 'playwright',
                headless: isCI,
                enabled: true,
                instances: [
                    { browser: 'chromium' },
                ],
            },
        },
    }
]);