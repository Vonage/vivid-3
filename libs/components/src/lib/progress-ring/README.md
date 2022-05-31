# progress-ring

Progress-ring is used to display the length of time a process will take or to visualize percentage value (referred to as a determinate state) and to represent an unspecified wait time (referred to as an indeterminate state).

```js
<script type="module">
    import '@vonage/vivid/progress-ring';
</script>
```

```html preview
<vwc-progress-ring></vwc-progress-ring>
```

## Properties

### Min/Max

Use `min`, `max` in order to determine the range of the progress.

- Type: `number`
- Default: `undefined`

```html preview blocks
<vwc-progress-ring min="0" max="50" value="12.5"></vwc-progress-ring>
<vwc-progress-ring min="0" max="50" value="50"></vwc-progress-ring>
<vwc-progress-ring min="0" max="100" value="50"></vwc-progress-ring>
```

### Value

Use `value` in order to set the state of the progress. Omitting the attribute or setting it for a non-number value will set the state to `indetermintate`.

- Type: `number` | `string`
- Default: `undefined`

```html preview blocks
<vwc-progress-ring value="12.5"></vwc-progress-ring>
<vwc-progress-ring value="45"></vwc-progress-ring>
<vwc-progress-ring value="73"></vwc-progress-ring>
<vwc-progress-ring value="100"></vwc-progress-ring>
```

### Connotation

Use `connotation` in order to set the color the progress.

- Type: `'primary'` | `'cta'` | `'success'` | `'alert'`
- Default: `'primary'`

```html preview blocks
<vwc-progress-ring connotation="accent"></vwc-progress-ring>
<vwc-progress-ring connotation="cta"></vwc-progress-ring>
<vwc-progress-ring connotation="success"></vwc-progress-ring>
<vwc-progress-ring connotation="alert"></vwc-progress-ring>
```

### Paused

Use the `paused` attribute to show a disabled state of the progress.

- Type: `boolean`
- Default: `false`

```html preview blocks
<h2>Determinate</h2>
<vwc-progress-ring min="0" max="50" value="25" paused></vwc-progress-ring>
<h2>Indeterminate</h2>
<vwc-progress-ring min="0" max="50" paused></vwc-progress-ring>
```

### Density

Use the `density` attribute/property to set the progress ring's size.

- Type: `-5` | `-4` | `-3` | `-2` | `-1` | `0` | `1` | `2` | `3`
- Default: `0`

```html preview blocks
<vwc-progress-ring min="0" max="50" value="50" density="-5"></vwc-progress-ring>
<vwc-progress-ring min="0" max="50" value="50" density="-4"></vwc-progress-ring>
<vwc-progress-ring min="0" max="50" value="50" density="-3"></vwc-progress-ring>
<vwc-progress-ring min="0" max="50" value="50" density="-2"></vwc-progress-ring>
<vwc-progress-ring min="0" max="50" value="50" density="-1"></vwc-progress-ring>
<vwc-progress-ring min="0" max="50" value="50" density="0"></vwc-progress-ring>
<vwc-progress-ring min="0" max="50" value="50" density="1"></vwc-progress-ring>
<vwc-progress-ring min="0" max="50" value="50" density="2"></vwc-progress-ring>
<vwc-progress-ring min="0" max="50" value="50" density="3"></vwc-progress-ring>
```

## Example Usage

### Determinate State

Set the `min`, `max` and `value` in order to show the determinate state.

In the example below, we set the value to `12.5` while the range is `0` to `50`.  This means, 25% of the progress bar will be filled.

```html preview
    <vwc-progress-ring min="0" max="50" value="12.5"></vwc-progress-ring>
```

### Indeterminate

Remove `value` or set it to be a non-number value (e.g. `indeterminate`) to show an indeterminate state.

```html preview blocks
        <vwc-progress-ring min="0" max="50"></vwc-progress-ring>
        <vwc-progress-ring min="0" max="50" value="indeterminate"></vwc-progress-ring>
    </vwc-layout>
```
