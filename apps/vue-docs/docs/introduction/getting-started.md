# Getting Started

## Installation

Add the NPM package to your repository:

::: code-group

```sh [npm]
npm install -D @vonage/vivid-vue
```

```sh [yarn]
yarn add -D @vonage/vivid-vue
```

```sh [pnpm]
pnpm install -D @vonage/vivid-vue
```

:::

## Setup

See the steps below for your version of Vue.

It is recommended to set a [custom component prefix](https://vivid.deno.dev/getting-started/advanced#scoped-elements) unique to your app. This will prevent conflicts if multiple instances or versions of Vivid are used in the same page.

You can find more information on the optional styles that come with Vivid [here](https://vivid.deno.dev/getting-started/advanced).

If you are migrating from Vivid 2.x, please see the [migration guide](https://vivid.deno.dev/getting-started/vivid-2-migration).


### Vue 3

Use the `vivid3` plugin to initialize the library.

```ts
<!--@include: ./examples/main-vue3.ts -->
```

The plugin accepts the following options:

| Option                      | Type                          | Default   | Description                                                                                                   |
|-----------------------------|-------------------------------|-----------|---------------------------------------------------------------------------------------------------------------|
| tokens                      | `'light \| 'dark' \| 'none'`  | `'light'` | The theme of tokens to use.                                                                                   |
| font                        | `'oss' \| 'spezia' \| 'none'` | `'oss'`   | Use `'spezia'` to load the brand-specific Spezia font.                                                        |
| customComponentPrefix       | `string`                      | `'vvd3'`  | The prefix to use for custom components.                                                                      |
| styles                      | `Style[]`                     | `[]`      | An array of optional styles to use.                                                                           |
| addRootClassTo              | `'root' \| 'app' \| 'none'`   | `'root'`  | Where to apply the `vvd-root` class to.<br/> - `root`: The `<html>` element<br/> - `app`: The `App` component |

#### Loading optional styles

To load optional styles, pass them to the `styles` option.

```ts
<!--@include: ./examples/main-vue3-optional-styles.ts -->
```

### Vue 2

#### Adding the vvd-root class

The Vivid tokens require a `vvd-root` class to be present. It is recommended to add it on the `<html>` element, but it can also be added to the App component to scope it to the application.

::: code-group

```html [Global]
<!-- index.html -->
<!doctype html>
<html lang="en" class="vvd-root">
<!-- ... -->
```

```vue [App scoped]
<!--@include: ./examples/ScopedRootClass.vue -->
```

:::

#### Importing the styles

Modify your `App.vue` file to import the Vivid styles.

::: code-group

```vue [CSS]
<!--@include: ./examples/AppWithCSS.vue -->
```

```vue [SCSS]
<!--@include: ./examples/AppWithSCSS.vue -->
```

:::

#### Setting custom component prefix (optional)

To set a custom component prefix, use the `setCustomComponentPrefix` function in your `main.ts` file.

```ts
<!--@include: ./examples/main-vue2.ts -->
```

## Usage

You are now ready to use the components in your application.

```vue
<!--@include: ./examples/Usage.vue -->
```