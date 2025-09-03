---
title: Migrating From Vivid 2.x
order: 3
---

# Migrating From Vivid 2.x to Vivid 3.x

Vivid 3.x has been rewritten from scratch.<br />It comes with almost all components that are available in Vivid 2.x, and many new ones.
All of them are better in both code and semantics. All the components are aligned with the HTML spec and are more accessible.

If you are migrating to Vivid 3.x, you can install it alongside Vivid 2.x for an easy and gradual migration.

## Differences Between Vivid 2.x and Vivid 3.x

### General Naming Changes

|                                           | Before (Vivid 2.x)         | After (Vivid 3.x)                                              |
| ----------------------------------------- | -------------------------- | -------------------------------------------------------------- |
|                                           | `heading`                  | `headline`                                                     |
| icon                                      | `type`                     | `name`                                                         |
| icon                                      | `trailingIcon`             | `icon-leading` (default), `icon-trailing`                      |
| size                                      | `dense`, `enlarged`        | `super-condensed`, `condensed`, `normal`, `expanded`           |
| size (icon)                               | `small`, `medium`, `large` | scale from `-6` to `5`,<br/> `undefined`: default to font-size |
| sizes - in layout                         | `xs`, `md`, `lg`           | `small`, `medium`, `large`                                     |
| looks<br/>(`ghost`, `filled`, `outlined`) | `layout`                   | `appearance`                                                   |
| in some components                        | `dismissible`              | `removable`                                                    |

### Components Naming Changes

| Before (Vivid 2.x)                        | After (Vivid 3.x)  | Comments                            |
| ----------------------------------------- | ------------------ | ----------------------------------- |
| `chip`, `chip-set`<br/>`tag`, `tag-group` | `tag`, `tag-group` |                                     |
| `circular-progress`                       | `progress-ring`    |                                     |
| `dropdown`                                | `menu`             | use `header` + `action-items` slots |
| `icon-button`                             | `button`           |                                     |
| `linear-progress`                         | `progress`         |                                     |
| `snackbar`                                | `alert`            |                                     |
| `theme-switch`                            | `switch`           |                                     |
| `top-app-bar`, `top-app-bar fixed`        | `header`           |                                     |

### List & List Item Components Changes

In Vivid 3.x we created separate components for different uses for the former `list-item`.  
This is for better accessibility and HTML standards.

| Usage                                      | Before (Vivid 2.x)                                            | After (Vivid 3.x)                                                                                         |
| ------------------------------------------ | ------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| navigation                                 | `vwc-list`<br/>`vwc-list-item`<br/>`vwc-list-expansion-panel` | `nav`<br/> `nav-item`<br/> `nav-disclosure`                                                               |
| menu                                       | `vwc-list`<br/>`vwc-list-item`                                | `menu-item`<br/> `menu-item` with `role="menuitemcheckbox"` <br/> `menu-item` with `role="menuitemradio"` |
| List items                                 | `vwc-check-list-item`                                         | `menu-item` with `role="menuitemcheckbox"`                                                                |
|                                            | `vwc-radio-list-item`                                         | `menu-item` with `role="menuitemradio"`                                                                   |
| option<br/> Use inside `Select`/`Combobox` | `vwc-list-item`                                               | `option`                                                                                                  |

## Installing Vivid 3.x Alongside Vivid 2.x

### Step 1: Pre Installation

The project needs to import Vivid 2.x components individually and not as a whole package.

Before:

```json
"@vonage/vivid": "^2.x.x"
...
```

After:

```json
"@vonage/vvd-context": "^2.x.x",
"@vonage/vvd-core": "^2.x.x",
//import all Vivid 2.x components you are using in the project
"@vonage/vwc-accordion": "^2.x.x",
"@vonage/vwc-action-group": "^2.x.x",
"@vonage/vwc-audio": "^2.x.x",
"@vonage/vwc-button": "^2.x.x",
...
```

### Step 2: Make Sure Your Vivid 2.x Components Are Imported Correctly

Before:

```js
import { VWCButton } from '@vonage/vivid';
```

After:

```js
import { VWCButton } from '@vonage/vwc-button';
```

### Step 3: Install Vivid 3.x

You can now install Vivid 3.x as usual by following the Getting Started guides.

Make sure you follow the instructions for:

- Using a [custom prefix](/guides/prefix/) (e.g. `vwc-3`)
- Loading the Vivid 2.x compatibility styles (`@vonage/vivid/styles/tokens/vivid-2-compat.css`)

### Step 4: Moving the Vivid 2.x Class

You need to add the Vivid 2.x class `vvd-scheme-main` to a descendant element of the `vvd-root`.
This is needed to ensure that Vivid 2.x tokens are not overridden by Vivid 3.x tokens.

```html
<html class="vvd-root">
	<body class="vvd-scheme-main">
		...
	</body>
</html>
```

### Step 5: Start Using Components

You are now ready to start using Vivid 3.x components.
You will need to add the `vvd-component` class to every component to avoid a collision between Vivid 2.x and Vivid 3.x tokens.
If you are using Vivid Vue, this is done automatically for you.

```html
<vwc-3-button
	class="vvd-component"
	label="Scoped Vivid 3.x Button"
></vwc-3-button>
```

### Cleanup: Once the Migration Is Complete

After using Vivid 3.x **exclusively**, follow these steps:

- Remove Vivid 2.x from your package.json. You should only have `@vonage/vivid": "^3.x"`.
- Remove the `vvd-component` class from all the components.
- Remove the `vvd-scheme-main` class from the body.
- Remove the import of `vivid2-compat.css`.

## FAQ

<vwc-accordion>
  <vwc-accordion-item heading="'No matching version found for' Error">
    Vivid 3.x should be pulled from npm and not from GitHub packages. Check your .npmrc file to make sure you are not pulling from GitHub packages. We'd advise uninstalling all vivid components via npm uninstall or yarn remove and reinstalling them afterward.
  </vwc-accordion-item>
  <vwc-accordion-item heading="403 in CI after installing from npm">
    This is probably due to your lock file still pointing at the wrong registry. See uninstall of point one.
  </vwc-accordion-item>
  <vwc-accordion-item heading="Loading external CSS in Angular">
    Angular projects have an angular.json file. Inside you have the styles property. Add the Vivid style files paths to your angular.json file.
  </vwc-accordion-item>
</vwc-accordion>
