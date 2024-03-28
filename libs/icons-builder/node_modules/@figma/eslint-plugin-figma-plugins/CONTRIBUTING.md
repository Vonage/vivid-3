# Contributing

If you notice any problems with this linter, please [file an issue](https://github.com/figma/rest-api-spec/issues). We welcome PRs!

For bug reports and feature requests for Figma or the Figma Plugin API itself, please [contact Figma support](https://help.figma.com/hc/en-us/requests/new).

## Local development

### Building the package

To rebuild both the lint plugin and documentation:

```
npm run build
```

To rebuild the lint plugin when source files change:

```
npm run watch
```

Any consuming repo will need to re-install the package using the process described [above](#install-the-package).

### Documentation

This plugin uses [eslint-doc-generator](https://github.com/bmish/eslint-doc-generator) to produce docs for each rule, as well as parts of the [README](./README.md).

To automatically re-build documentation for rules:

```
npm run update:eslint-docs
```

### Tests

Tests are implemented in the [test/](./test) directory using [@typescript-eslint/RuleTester](https://typescript-eslint.io/packages/rule-tester/). The test harness is [ts-jest]().

To run tests, run:

```
npm run tests
```

To run an individual test, you can run Jest with the `-t` parameter, followed by the string handle for the test. The handle is declared in each test file. Example:

```
npx jest -t 'await-requires-async'
```

Jest has an issue with printing errors emitted from eslint rules [due to a bug](https://github.com/jestjs/jest/issues/10577). If you are seeing errors like `TypeError: Converting circular structure to JSON`, then run this instead:

```
npm run test-workaround
```

This enables the `--detect-open-handles` Jest option. Tests will run slower, but you'll see the real cause of the errors.

### Manual testing

You may want to run a local version of this plugin against your own plugin code.

First, clone this repo. Then add the following to your Figma plugin's `package.json`, replacing `/path/to/local/clone` with an actual filesystem path:

```
{
  ...
  "devDependencies": {
    "@figma/eslint-plugin-figma-plugins": "file:/path/to/local/clone",
    ...
  }
}
```

#### Update node_modules

Once you've updated your `package.json`, run `npm install` to pull down the latest changes.