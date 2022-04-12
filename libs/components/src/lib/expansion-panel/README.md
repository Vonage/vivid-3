# vwc-expansion-panel

```js
<script type="module">
    import '@vonage/vivid/expansion-panel';
</script>
```

## Open
Use the `open` attribute to indicate whether the expansion panel is open.
Alternatively, you can use the `show()` and `hide()` methods as well as `toggleOpen`.
- Type: `boolean`
- Default: `false`

```html preview
 <vwc-expansion-panel heading="Click to toggle expansion panel" open>
    <vwc-text font-face="body-1">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    </vwc-text>
  </vwc-expansion-panel>
```

## Heading
Add the `heading` attribute to set the heading text.

- Type: `string`
- Default: `''`
  
```html preview
  <vwc-expansion-panel heading="Expansion panel with heading">
    <vwc-text font-face="body-1">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    </vwc-text>
  </vwc-expansion-panel>
```
## Indicator
Add the `no-indicator` attribute to remove the indicator icon from the heading.

- Type: `boolean`
- Default: `false`

```html preview
 <vwc-expansion-panel heading="With indicator">
    <vwc-text font-face="body-1">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    </vwc-text>
  </vwc-expansion-panel>
 <vwc-expansion-panel heading="Without indicator" no-indicator>
    <vwc-text font-face="body-1">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    </vwc-text>
  </vwc-expansion-panel>
```

## Icon
Add the `icon` attribute to add an icon to the heading. 

- Type: `string`
- Default: `''`

```html preview
 <vwc-expansion-panel heading="With Icon" icon="chat-solid">
    <vwc-text font-face="body-1">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    </vwc-text>
  </vwc-expansion-panel>
```

## Icon-Trailing
Add the `icon-trailing` attribute to add an icon to the right of the heading text.

- Type: `boolean`
- Default: `false`

```html preview
 <vwc-expansion-panel heading="With Icon-Trailing" icon="chat-solid" icon-trailing>
    <vwc-text font-face="body-1">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    </vwc-text>
  </vwc-expansion-panel>
```


## Meta
Add the `meta` attribute to add metadata to the heading. 

- Type: `string`
- Default: `''`

```html preview
 <vwc-expansion-panel heading="With Metadata" meta="meta-data">
    <vwc-text font-face="body-1">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    </vwc-text>
  </vwc-expansion-panel>
```

## Heading-Level
Use the `heading-level` attribute to change the expansion panel's size.

- Type: `2` | `3` | `4` | `5` | `6`
- Default: `3`

```html preview
 <vwc-expansion-panel heading="This is heading level <h2>" heading-level=2>
    <vwc-text font-face="body-1">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    </vwc-text>
  </vwc-expansion-panel>
  <vwc-expansion-panel heading="This is heading level <h3>" heading-level=3>
    <vwc-text font-face="body-1">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    </vwc-text>
  </vwc-expansion-panel>
  <vwc-expansion-panel heading="This is heading level <h4>" heading-level=4>
    <vwc-text font-face="body-1">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    </vwc-text>
  </vwc-expansion-panel>
  <vwc-expansion-panel heading="This is heading level <h5>" heading-level=5>
    <vwc-text font-face="body-1">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    </vwc-text>
  </vwc-expansion-panel>
  <vwc-expansion-panel heading="This is heading level <h6>" heading-level=6>
    <vwc-text font-face="body-1">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    </vwc-text>
  </vwc-expansion-panel>
  ```

  ## Methods

| Method       | Type       | Description                                      |
| ------------ | ---------- | ------------------------------------------------ |
| `hide`       | `(): void` | Closes the expansion panel from the open state.  |
| `show`       | `(): void` | Opens the expansion panel from the closed state. |
| `toggleOpen` | `(): void` | Toggles the expansion panel.                     |