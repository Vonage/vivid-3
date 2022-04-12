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
  <vwc-expansion-panel heading="Campaign Details">
   <vwc-text font-face="body-1">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </vwc-text>
  </vwc-expansion-panel>
```
## Indicator
With the `no-indicator` attribute you can remove the indicator icon from the heading.

- Type: `boolean`
- Default: `false`

```html preview
 <vwc-expansion-panel heading="with indicator">
   <vwc-text font-face="body-1">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </vwc-text>
  </vwc-expansion-panel>
 <vwc-expansion-panel heading="without indicator" no-indicator>
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
 <vwc-expansion-panel heading="This is an expansion panel" icon="chat-solid">
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
 <vwc-expansion-panel heading="This is an expansion panel" meta="meta-data">
   <vwc-text font-face="body-1">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </vwc-text>
  </vwc-expansion-panel>
```

## Heading Level
Use the `headingLevel` attribute to change the expansion panel's size.

- Type: `2` | `3` | `4` | `5` | `6`
- Default: `3`

```html preview
 <vwc-expansion-panel heading="This is heading <h2>" headingLevel=2>
   <vwc-text font-face="body-1">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </vwc-text>
  </vwc-expansion-panel>
  <vwc-expansion-panel heading="This is heading <h3>" headingLevel=3>
   <vwc-text font-face="body-1">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </vwc-text>
  </vwc-expansion-panel>
  <vwc-expansion-panel heading="This is heading <h4>" headingLevel=4>
   <vwc-text font-face="body-1">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </vwc-text>
  </vwc-expansion-panel>
  <vwc-expansion-panel heading="This is heading <h5>" headingLevel=5>
   <vwc-text font-face="body-1">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </vwc-text>
  </vwc-expansion-panel>
  <vwc-expansion-panel heading="This is heading <h6>" headingLevel=6>
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