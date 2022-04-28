# Visual Tests Documentation

Vivid's visual tests consist of two parts:
1. Automated snippets extraction from our documentation (visual regression)
2. Functional tests inside each component

Vivid's visual tests run on chrome, firefox and webkit (Safari).

## Tests consistency

In order to maintain the tests consistency and reduce flakiness, the tests are dockerized. Running the tests inside a container make sure tests don't fail for small Operating System differences like fonts and pixel interpretations. 

Our docker image runs the tests on the 3 browser on the Linux OS.

## Writing the tests

Each component folder should contain a `ui.test.ts` file.
The file must be updated with the `componentName` and snapshot path `'./snapshots/componentName.png'`.
PRO TIP: utilizing the _component_ generator (`npm run nx workspace-generator vivid-component my-component`) will populate basic `ui.test.ts` to get you up and running with ui-tests.

## Running the tests

### Local

Running the tests can be done locally by running:

`npx http-server -s & npx playwright test`

This will start the tests locally with the local playwright and browsers versions.

**Note:** that this might result in flaky tests because of versions mismatch

**Note:** that this will result in failed tests in the first run because the snapshots for your setup do not exist

**Note:** do not push new snapshots. There are only 3 snapshots used for CI purposes - and these are the checked out linux snapshots in each component. 

### Dev/Watch Mode

You can also run the tests locally in watch mode:
`npx nx run components:e2e:watch`

This will spin up the dev server and watch for changes in the code to restart the tests. 

A useful scenario would be to develop a single component:
1. Start the tests using `npx nx run components:e2e:watch`
2. Setup your component's to be the only test to run: `test => test.only`
3. Add `await page.pause();` inside the test case.

### Why Docker?

In order to avoid flakiness, we've setup a docker image to run the tests. This requires docker installed on your machine. [Click here to learn how to install docker](https://docs.docker.com/get-docker/).

After you have docker installed, run:

`npm run nx e2e components`

If you need to rebuild the docker image run:

`npx nx run components:e2e --task=build`

This will run the tests for you.

If you wish to update the visual snapshots (i.e. you've changed the design and want it to reflect in the saved snapshots) run:

`npx nx run components:e2e --task=update`

## Updating the docker image

The docker image comes with the browsers and playwright ready for action.  If, for some reason, there's a need to update the playwright version, a new version should be published to the docker hub. In this case, use the following commands:

1. you'd probably need to login to docker hub (`docker login`).
2. Update the tag and push to the repository.
```
docker tag vivid-visual-tests-img drizzt99/vonage:1.x.x
docker push drizzt99/vonage:1.x.x  
```
3. Update the relevant `yml` files that are using this image to use the new version.

## Checking the tests

All tests must pass. The results of failed tests can be found in the `test-results` folder directly under the project's root folder.  Inside you will find a folder per failed test, each with 3 files: `actual.png`, `expected.png` and `diff.png`.

