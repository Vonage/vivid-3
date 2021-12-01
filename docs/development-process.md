# Development Process
Please watch [the following video](https://drive.google.com/file/d/1pvSKmGAm-uoIfKyZBarrapwm5q_wzAs5/view) in order to understand the development process.

## Tl;Dw
1. Run `npm test:dev` to run the tests in watch mode
2. In order to isolate a test, set its `describe` to `fdescribe` or even a specific `it` to `fit`
3. From now on, every change you'll make will be reflected in the tests
4. In order to debug visually, 
   1. Make sure to that the `afterEach` that clears the DOM from the tests' artifacts is not active.
   2. Click on the "Debug" button at the top of the test browser
5. In webstorm, use `cmd` + `shift` + `t` in order to toggle between the test and the business logic file.
