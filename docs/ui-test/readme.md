# Visual Tests Documentation

Vivid's visual tests consist of two parts:

1. Automated snippets extraction from our documentation (visual regression)
2. Functional tests inside each component

Vivid's visual tests run on chrome, firefox and webkit (Safari).

## Tests consistency

In order to maintain the tests' consistency and reduce flakiness, the tests are dockerized. Running the tests inside a container makes sure tests don't fail for small Operating System differences like fonts and pixel interpretations.

## Writing the tests

Each component folder should contain a `ui.test.ts` file.
The file must be updated with the `componentName` and snapshot path `'./snapshots/componentName.png'`.
PRO TIP: utilizing the _component_ generator (`npx turbo gen component`) will populate basic `ui.test.ts` to get you up and running with ui-tests.

## Running the tests

### Local

Running the tests can be done locally by running:

`npx turbo run @vonage/vivid#e2e:ui`

This will start the tests locally with the local playwright and browsers versions.

**Note:** that this might result in flaky tests because of versions mismatch

**Note:** that this will result in failed tests in the first run because the snapshots for your setup do not exist

**Note:** do not push new snapshots. There are only 3 snapshots used for CI purposes - and these are the checked out linux snapshots in each component.

You can run the tests with docker instead by running:

`npx turbo run @vonage/vivid#e2e:docker:ui`

This will launch playwright in a docker container in remote connection mode, and the UI locally. This is the recommended way to run the tests locally, as it will ensure consistency with the CI environment.

### Updating snapshots

When you drop the `:ui` suffix from the command, it will run the playwright normally. Use the `--update-snapshots` flag to update the snapshots. For example:

`npx turbo run @vonage/vivid#e2e:docker -- --update-snapshots <optionally specify component name to run only that component>`

### Development notes

When you run the Playwright UI and want to see code changes reflected without restarting the command, you can run `npx turbo run @vonage/vivid#dev:bundled`.

This will watch for changes and rebuild the components.

### Running the docs tests

The visual tests for the documentation are run separately from the components. They are run the same way as the components, but with a different command: `npx turbo run @repo/docs#e2e`. The config file is located in `./apps/docs/playwright.config.ts`.

## Checking the tests

All tests must pass. The results of failed tests can be found in the `test-results` folder in the project. Inside you will find a folder per failed test, each with 3 files: `actual.png`, `expected.png` and `diff.png`.
