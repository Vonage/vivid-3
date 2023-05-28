# Accessibility Documentation

Vivid's a11y testst are based on [lighthouse](https://github.com/GoogleChrome/lighthouse).
As with the visual regression tests, they are dockerized and run on playwright.

## Writing the tests

Each component folder should contain a `{componentName}.a11y.ts` file.
The file will create a template with the component and interact with the page in order to achieve the desired scenario to test.
Playwright will then fire lighthouse a11y tests.

## Running the tests

### Local

Running the tests can be done locally by running:

`npx nx run components:e2e:a11y-local`

This will start the tests locally with the local playwright and chrome version.

### Dockerized

In order to avoid flakiness, we've setup a docker image to run the tests. This requires docker installed on your machine. [Click here to learn how to install docker](https://docs.docker.com/get-docker/).

After you have docker installed, run:

`npx nx run compoennts:e2e:a11y`

## Checking the tests

All tests must pass. The results can be found in the `lighthouse` folder directly under the project's root folder.
