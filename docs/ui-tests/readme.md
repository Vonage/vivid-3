# Visual Tests Documentation

Vivid's visual tests consist of two parts:
1. Automated snippets extraction from our documentation (visual regression) - TBD
2. Functional tests inside each component

Vivid's visual tests run on chrome, firefox and webkit (Safari).

## Running the tests

### Local

Running the tests can be done locally by running:

`npm run ui-tests:local`

This will start the tests locally with the local playwright and browsers versions.

**Note that this might result in flaky tests because of versions mismatch**

**Note that this will result in failed tests in the first run because the snapshots for your setup do not exist** 

### Docker

In order to avoid flakiness, we've setup a docker image to run the tests. This requires docker installed on your machine.

After you have docker installed, run:

`npm run ui-tests:build`

In order to build the image. 

Once the image is built, you can run:

`npm run ui-tests`

This will run the tests for you.

If you wish to update the visual snapshots (i.e. you've changed the design and want it to reflect in the saved snapshots) run:

`npm run ui-tests:update`

## Updating the docker image

The docker image comes with the browsers and playwright ready for action.  If, for some reason, there's a need to update the playwright version, a new version should be published to the docker hub. In this case, use the following commands:

1. you'd probably need to login to docker hub (`docker login`).
2. Update the tag and push to the repository.
```
docker tag vivid-visual-tests-img drizzt99/vonage:1.x.x
docker push drizzt99/vonage:1.x.x  
```
3. Update the relevant `yml` files that are using this image to use the new version.




