# progress

Progress is used to display the length of time a process will take or to visualize percentage value (referred to as a determinate state) and to represent an unspecified wait time (referred to as an indeterminate state).

```js
<script type="module">import '@vonage/vivid/progress';</script>
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

## API
### Connotation
- Type: `'primary'` | `'cta'` | `'success'` | `'alert'` | `'pacific'`
- Default: `'primary'`

```html preview
    <vwc-progress min="0" max="100" value="25" connotation="primary"></vwc-progress>
    <vwc-progress min="0" max="100" value="25" connotation="cta"></vwc-progress>
    <vwc-progress min="0" max="100" value="25" connotation="success"></vwc-progress>
    <vwc-progress min="0" max="100" value="25" connotation="alert"></vwc-progress>
    <vwc-progress min="0" max="100" value="25" connotation="pacific"></vwc-progress>
```

### Paused
- Type: `boolean`
- Default: `false`

Use the `paused` attribute to show a disabled state of the progress.
```html preview
    <vwc-progress min="0" max="50" value="25" paused></vwc-progress>
    <vwc-progress min="0" max="50" value="indeterminate" paused></vwc-progress>
```

### Min/Max
- Type: `number`
- Default: `undefined`

Use `min`, `max` in order to determine the range of the progress.

### Value
- Type: `number` | `string`
- Default: `undefined`

Use `value` in order to set the state of the progress. String value will set the state to `indetermintate`.
