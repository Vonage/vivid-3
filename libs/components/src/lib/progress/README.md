# progress

Progress is used to display the length of time a process will take or to visualize percentage value (referred to as a determinate state) and to represent an unspecified wait time (referred to as an indeterminate state).

```js
<script type="module">import '@vonage/vivid/progress';</script>
```

## API

### Min/Max

Use `min`, `max` in order to determine the range of the progress.

- Type: `number`
- Default: `undefined`

```html preview
<vwc-progress min="0" max="50" value="12.5"></vwc-progress>
```

### Value

Use `value` in order to set the state of the progress. String value will set the state to `indetermintate`.

- Type: `number` | `string`
- Default: `undefined`

```html preview
<vwc-progress min="0" max="50" value="12.5"></vwc-progress>
```

### Paused

Use the `paused` attribute to show a disabled state of the progress.

- Type: `boolean`
- Default: `false`

**Determinate**

```html preview
<vwc-progress min="0" max="50" value="25" paused></vwc-progress>
```

**Indeterminate**

```html preview
<vwc-progress min="0" max="50" value="indeterminate" paused></vwc-progress>
```

### Reverse

Use the `reverse` attribute to set the progress from right to left.

- Type: `boolean`
- Default: `false`

```html preview blocks
<vwc-progress min="0" max="50" value="25" reverse></vwc-progress>
<vwc-progress min="0" max="50" value="indeterminate" reverse></vwc-progress>
```

### Connotation

- Type: `'accent'` | `'cta'` | `'success'` | `'alert'` | `'pacific'`
- Default: `'accent'`

```html preview blocks
<vwc-progress min="0" max="100" value="25" connotation="accent"></vwc-progress>
<vwc-progress min="0" max="100" value="25" connotation="cta"></vwc-progress>
<vwc-progress min="0" max="100" value="25" connotation="success"></vwc-progress>
<vwc-progress min="0" max="100" value="25" connotation="alert"></vwc-progress>
<vwc-progress min="0" max="100" value="25" connotation="pacific"></vwc-progress>
```

### Shape

Use the `shape` attribute in order to set `rounded` and `sharp` borders.

- Type: `'rounded'` | `'sharp'`
- Default: `'rounded'`

```html preview blocks
<vwc-progress min="0" max="50" value="25" shape="rounded"></vwc-progress>
<vwc-progress min="0" max="50" value="25"></vwc-progress>
```

## Example Usage

### Determinate State

Set the `min`, `max` and `value` in order to show the determinate state.

In the example below, we set the value to `12.5` while the range is `0` to `50`.  This means, 25% of the progress bar will be filled.

```html preview
<vwc-progress min="0" max="50" value="12.5"></vwc-progress>
```

### Indeterminate

Set `value` to be a non-number value (e.g. `indeterminate`) to show an indeterminate state.

```html preview
<vwc-progress min="0" max="50" value="indeterminate"></vwc-progress>
```
