# progress-ring

Progress-ring is used to display the length of time a process will take or to visualize percentage value (referred to as a determinate state) and to represent an unspecified wait time (referred to as an indeterminate state).

```js
<script type="module">import '@vonage/vivid/progress-ring';</script>
```

```html preview
<vwc-progress-ring min="0" max="100" value="25"></vwc-progress-ring>
<vwc-progress-ring min="0" max="100" value="ii"></vwc-progress-ring>
```


## API

### Min/Max
Use `min`, `max` in order to determine the range of the progress.

- Type: `number`
- Default: `undefined`

```html preview
    <vwc-progress-ring min="0" max="50" value="12.5"></vwc-progress-ring>
```

### Value
Use `value` in order to set the state of the progress. String value will set the state to `indetermintate`.

- Type: `number` | `string`
- Default: `undefined`

```html preview
    <vwc-progress-ring min="0" max="50" value="12.5"></vwc-progress-ring>
```

### Paused
Use the `paused` attribute to show a disabled state of the progress.

- Type: `boolean`
- Default: `false`

```html preview
    <h2>Determinate</h2>
    <vwc-progress-ring min="0" max="50" value="25" paused></vwc-progress-ring>
    <br/>
    <br/>
    <h2>Indeterminate</h2>
    <vwc-progress-ring min="0" max="50" value="indeterminate" paused></vwc-progress-ring>
```

### Size
Use the `size` attribute in order to select from 3 different sizes.

- Type: `'base-small'` | `'base'` | `'base-large'`
- Default: `'base'`

```html preview
    <vwc-progress-ring min="0" max="50" value="50" size="base-small"></vwc-progress-ring>
    <br/>
    <br/>
    <vwc-progress-ring min="0" max="50" value="50"></vwc-progress-ring>
    <br/>
    <br/>
    <vwc-progress-ring min="0" max="50" value="50" size="base-large"></vwc-progress-ring>
```

## Example Usage

### Determinate State
Set the `min`, `max` and `value` in order to show the determinate state.

In the example below, we set the value to `12.5` while the range is `0` to `50`.  This means, 25% of the progress bar will be filled.
```html preview
    <vwc-progress-ring min="0" max="50" value="12.5"></vwc-progress-ring>
```

### Indeterminate
Set `value` to be a non-number value (e.g. `indeterminate`) to show an indeterminate state.
```html preview
    <vwc-progress-ring min="0" max="50" value="indeterminate"></vwc-progress-ring>
```
