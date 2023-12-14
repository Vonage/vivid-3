npx http-server -s &
npx playwright test -c ./libs/components/playwright.config.ts "$@"
