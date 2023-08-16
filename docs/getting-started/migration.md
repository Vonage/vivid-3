# Migration guide from VIVID 2 to VIVID 3

You are a vivid user, familiar with most of the components and now on the verge of upgrading to the latest version.

vivid.3.x can be installed alongside vivid.2.x allowing you to migrate easily and gradually to vivid.3.x.

This is a step-by-step guide for integrating vivid-3.x alongside vivid-2.

<vwc-note connotation="information" icon="info-solid" headline="Using Vue.js?">
	<div>Consider using the official <a href="https://vonage.github.io/vivid-vue/" target="_blank" rel="noopener noreferrer">wrappers for Vivid Vue</a>, which will ease the migration process.</div>
</vwc-note>

## Step 1: Pre Installation

The project needs to import vivid@2 components individually and not as a whole package.

Before:

```json
"@vonage/vivid": "^2.x.x"
...
```

After:

```json
"@vonage/vvd-context": "^2.x.x",
"@vonage/vvd-core": "^2.x.x",
//import all vivid 2 components you are using in the project
"@vonage/vwc-accordion": "^2.x.x",
"@vonage/vwc-action-group": "^2.x.x",
"@vonage/vwc-audio": "^2.x.x",
"@vonage/vwc-button": "^2.x.x",
...
```

### Make sure your vivid-2 components are imported correctly.

Before:

```js
import { VWCButton } from '@vonage/vivid';
```

After:

```js
import { VWCButton } from '@vonage/vwc-button';
```

## Step 2: Install vivid@3.x

```json
npm install @vonage/vivid@latest
```

Before:

```json
"@vonage/vvd-context": "^2.x.x",
"@vonage/vvd-core": "^2.x.x",
//import all vivid 2 components you are using in the project
"@vonage/vwc-accordion": "^2.x.x",
"@vonage/vwc-action-group": "^2.x.x",
"@vonage/vwc-audio": "^2.x.x",
"@vonage/vwc-button": "^2.x.x",
...
```

After:

```json
"@vonage/vivid": "^3.x.x",
"@vonage/vvd-context": "^2.x.x",
"@vonage/vvd-core": "^2.x.x",
//import all vivid 2 components you are using in the project
"@vonage/vwc-accordion": "^2.x.x",
"@vonage/vwc-action-group": "^2.x.x",
"@vonage/vwc-audio": "^2.x.x",
"@vonage/vwc-button": "^2.x.x",
...
```

## Step 3: Import style

There are various ways to import css to a project. The way to import them will depend on how your project is built.

### Import tokens

Add the tokens to your app.

```js
'node_modules/@vonage/vivid/styles/tokens/theme-light.css';
// or alternatively (only one of them is needed).
'node_modules/@vonage/vivid/styles/tokens/theme-dark.css';
```

### Import compatibility css

Additionally, you will need to import the compatibility css.

```js
'node_modules/@vonage/vivid/styles/tokens/vivid-2-compat.css';
```

## Step 4: Setting Vivid Class

To add fonts and tokens to the component you need to add the class `vvd-root` to your app.

```html
<html class="vvd-root">
	...
</html>
```

It is recommended to add the class to the [:root](https://developer.mozilla.org/en-US/docs/Web/CSS/:root) element, this is the easiest way to make your app benefit from tokens and fonts.

Alternatively, you can add it to any other wrapping element in order to restrict the style's scope to specific parts of your application, but please note that this may negatively impact font scaling.

Wherever you choose to add the class, you will need to add vivid-2's `vvd-scheme-main` to a descendant element. If you are using the `:root` element, you can add it to the body.

```html
<html class="vvd-root">
	<body class="vvd-scheme-main">
		...
	</body>
</html>
```

## Step 5: Adding the Spezia Font

[Follow the instructions](docs/getting-started/fonts-and-tokens) to set the Spezia Font.

## Step 6: Setting custom prefix

Read about the vivid 3.x [scroped elements](docs/getting-started/advanced/#scoped-elements).

Register the first vivid-3 component that you wish to migrate from vivid-2.

```js
import { registerButton } from '@vonage/vivid';
registerButton('vwc-3');
```

## Step 7: Start using components

Now it's time to use the components with the prefix you have set. It is necessary to add the `vvd-component` class to every component to avoid a collision between vivid-2 and vivid-3 token.

```html
<vwc-3-button
	class="vvd-component"
	label="scoped vivid-3 button"
></vwc-3-button>
```

## Step 8: Extra - Typography and Theming

[Follow the instructions](docs/getting-started/dvanced#styles-optional) to align with vivid typography.

## Step 9: Done!

After using vivid-3 **exclusively**, follow these steps:

- Remove vivid-2 import from package.json. You should only have `@vonage/vivid": "^3.x"`.
- Remove the `vvd-component` class from all the components.
- Remove the `vvd-scheme-main` class from the body.
- Remove the import of `vivid2-compat.css`.
- All registered components should be removed and imported directly.
- Rename all prefixes to `vwc`.

vivid-3 component when you have vivid-2 installed in the project:

```js
import { registerButton } from '@vonage/vivid';
registerButton('vwc-3');

<vwc-3-button
	class="vvd-component"
	label="scoped vivid-3 button"
></vwc-3-button>;
```

Only vivid-3 in the project:

```js
import '@vonage/vivid/button';

<vwc-button label="vivid-3 button"></vwc-button>;
```

You are good to go with vivid-3 and gradually integrate more and more components to vivid-3.
For any question or problem you are more that welcome to reach us at the #ask-vivid slack channel.

## FAQ

Still looking for answers, ask us in [#ask-vivid](https://vonage.slack.com/archives/C013F0YKH99) slack channel.

<vwc-accordion>
  <vwc-accordion-item heading="'No matching version found for' Error">
    vivid-3 should be pulled from npmjs and not from github packages . Check your .npmrc file to make sure you are not pulling from github packages . I'd advice uninstalling all vivid components via npm uninstall or yarn remove and reinstalling them afterwards.
  </vwc-accordion-item>
  <vwc-accordion-item heading="403 in CI after installing from npmjs">
    This is probably due to your lock file still pointing at the wrong registry. See uninstall of point one.
  </vwc-accordion-item>
  <vwc-accordion-item heading="Loading external CSS in angular">
    Angular projects have an angular.json file. Inside you have the  styles property. Add the vivid style files paths to your angular.json file.
  </vwc-accordion-item>
</vwc-accordion>
