# avatar

Represents a avatar custom element.

```js
<script type="module">
    import '@vonage/vivid/avatar';
</script>
```

```html preview
<vwc-avatar></vwc-avatar>
```

## Members


### Appearance

Set the `appearance` attribute to change the avatar's appearance.

- Type: `'filled'` | `'outlined'` | `'ghost'`
- Default: `'filled'`

```html preview
<vwc-avatar appearance="filled"></vwc-avatar>
<vwc-avatar appearance="outlined"></vwc-avatar>
<vwc-avatar appearance="ghost"></vwc-avatar>
```


### Connotation
The `connotation` attribute sets the colors according to the wanted connotation.

Type: `'accent'` | `'cta'`
- Default: `'accent'`

```html preview
<vwc-avatar connotation="accent"></vwc-avatar>
<vwc-avatar connotation="cta"></vwc-avatar>
<vwc-avatar connotation="accent" appearance="outlined"></vwc-avatar>
<vwc-avatar connotation="cta" appearance="outlined"></vwc-avatar>
```

### Text
the `text`attribute is set for 2 initials letters
```html preview
<vwc-avatar connotation="accent" text="rb"></vwc-avatar>
```

### Shape

Use the `shape` attribute to change the avatar's edges.

- Type: `'rounded'` | `'pill'`
- Default: `'rounded'`

```html preview
<vwc-avatar shape="rounded"></vwc-avatar>
<vwc-avatar shape="pill"></vwc-avatar>
```

### Density

Use the `density` attribute/property to set avatar's size.

- Type: `-2` | `-1` | `0` | `1` | `2`
- Default: `0`

```html preview
<vwc-avatar density="-2" shape="pill"></vwc-avatar>
<vwc-avatar density="-1" shape="pill"></vwc-avatar>
<vwc-avatar density="0" shape="pill"></vwc-avatar>
<vwc-avatar density="1" shape="pill"></vwc-avatar>
<vwc-avatar density="3" shape="pill"></vwc-avatar>
```


### Image

Use the `image` attribute to change the avatar's edges.

```html preview
<vwc-avatar shape="pill">
<img src="https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="woman"/>
</vwc-avatar>
<vwc-avatar>
<img src="https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="woman"/>
</vwc-avatar>
<vwc-avatar shape="pill"  appearance="outlined" density="3">
<img src="https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="woman"/>
</vwc-avatar>
```


## Slots

## CSS Variables
