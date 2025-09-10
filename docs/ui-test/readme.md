# Visual Tests Documentation

Vivid's visual tests consist of two parts:

1. Visual regression tests that take screenshots of components and compare them to a set of baseline images (snapshots)
2. Functional tests for each component

Vivid's visual tests run on chrome, firefox and webkit (Safari).

## Tests consistency

In order to maintain the tests' consistency and reduce flakiness, the tests are dockerized. Running the tests inside a container makes sure tests don't fail for small Operating System differences like fonts and pixel interpretations.

## Writing the tests

Each component folder should contain a `ui.test.ts` file.

## Running the tests

### Local

You can run the tests by running:

`npx turbo run @vonage/vivid#e2e:docker:ui`

This will launch playwright in a docker container in remote connection mode, and the UI locally. This is the recommended way to run the tests locally, as it will ensure consistency with the CI environment.

Without `:docker`, the tests will run locally without a container.

### Updating snapshots

When you drop the `:ui` suffix from the command, it will run playwright normally. Use the `--update-snapshots` flag to update the snapshots. For example:

`npx turbo run @vonage/vivid#e2e:docker -- --update-snapshots <optionally specify component name to run only that component>`

### Development notes

#### Reflect changes without restarting

When you run the Playwright UI and want to see code changes reflected without restarting the command, you can run `npx turbo run @vonage/vivid#dev:bundled`.

This will watch for changes and rebuild the components.

#### Useful playwright command line options

- `--repeat-each <number>`: useful to check for flakiness
- `--project <project name, e.g. "Desktop Safari">`: run a specific browser
- `--debug`: allows stepping through the tests with a visible browser window (only works without `:docker`)

### Running the docs tests

The visual tests for the documentation are run separately from the components. They are run the same way as the components, but with a different command: `npx turbo run @repo/docs#e2e`. The config file is located in `./apps/docs/playwright.config.ts`.

## Checking the tests

The results of failed tests can be found in the `test-results` folder in the project. Inside you will find a folder per failed test, each with 3 files: `actual.png`, `expected.png` and `diff.png`.

If the tests fail in CI, you can download this folder from the CI job artifacts.
