# Vivid Test Utils

A library to make it easier to interact with Vivid components in tests, that works with any frontend library and common testing frameworks.

## Motivation

Since Vivid is a Web Components library, writing tests can be more challenging. Depending on the testing framework used and how tests are set up, there can be various pitfalls and issues that slow down test development.

The library provides a unified way to select components, perform actions on them, and assert their state, that can be trusted to work.

Since the version of test utils are kept in sync with the Vivid version, these operations will also continue to work in the future, even when things change underneath.

## Testing Frameworks

The library supports the following testing frameworks:

- Playwright
- Cypress
- DOM: Can be used with a simulated DOM like JSDOM, e.g. in combination with Vue Test Utils or React Testing Library

The usage across all testing frameworks is the same. The only difference is in initialization and whether certain operations are asynchronous or not.

## Usage

### Installation

The library is provided as the `@vonage/vivid-test-utils` package. The version number is kept in sync with the Vivid library itself that it supports.

### Initialization

#### Playwright

```js
import { vividPlaywright } from '@vonage/vivid-test-utils/playwright';

// Create the vvd object using the Playwright page object and Playwright's expect function:
const vvd = vividPlaywright(page, expect);
```

#### Cypress

```js
import { vividCypress } from '@vonage/vivid-test-utils/cypress';

// Create the vvd object using the cy object:
const vvd = vividCypress(cy);
```

#### DOM with Vue Test Utils

If you run your tests in a simulated DOM environment, it may not provide all features needed by Vivid.

The library comes with a polyfill for JSDOM that fills these gaps. You can load it as follows, e.g. in a global test setup file:

```js
import '@vonage/vivid-test-utils/jsdom-polyfill';
```

```js
import { vividDOM } from '@vonage/vivid-test-utils/dom';

const wrapper = mount(Component, { attachTo: document.body });
// Create the vvd object using a Jest/Vitest or other Jasmine-style expect function and a root DOM node:
const vvd = vividDOM(expect, document.body);
```

### Selecting Components

```js
// Select with a component specific selector:
vvd.textField.byLabel('Email');
// Or by test ID, which will work for all components:
vvd.textField.byTestId('#email');
```

### Performing Actions

```js
// After selecting a component, you can perform component specific actions:
vvd.textField.byLabel('Email').fill('user@example.com');
```

When using Playwright or DOM, actions will need to be awaited.

### Asserting Component State

```js
// Use vvd.expect to make component specific assertions:
vvd.expect(vvd.textField.byLabel('Email')).toHaveValue('user@example.com');
// You can also assert the value of a specific prop:
vvd.expect(vvd.textField.byLabel('Email')).toHaveProp('appearance', 'ghost');
```

When using Playwright, expectations will need to be awaited.

### Selecting Multiple Components

```js
// The all selector returns a collection of components:
vvd.textField.all().nth(0).fill('user@example.com');
vvd.expect(vvd.textField.all()).toHaveCount(2);
```
