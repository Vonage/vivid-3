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
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
            standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
            a type specimen book.
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
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
            standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
            a type specimen book.
        </vwc-text>
  </vwc-expansion-panel>
```
## Leading toggle
With the `leadingToggle` attribute you can choose if the toggle is placed to the left or to the right of the heading. 

- Type: `boolean`
- Default: `false`

```html preview
 <vwc-expansion-panel heading="chevron" leadingToggle>
   <vwc-text font-face="body-1">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
            standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
            a type specimen book.
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
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
            standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
            a type specimen book.
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
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
            standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
            a type specimen book.
        </vwc-text>
  </vwc-expansion-panel>
  <vwc-expansion-panel heading="This is heading <h3>" headingLevel=3>
   <vwc-text font-face="body-1">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
            standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
            a type specimen book.
        </vwc-text>
  </vwc-expansion-panel>
  <vwc-expansion-panel heading="This is heading <h4>" headingLevel=4>
   <vwc-text font-face="body-1">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
            standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
            a type specimen book.
        </vwc-text>
  </vwc-expansion-panel>
  <vwc-expansion-panel heading="This is heading <h5>" headingLevel=5>
   <vwc-text font-face="body-1">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
            standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
            a type specimen book.
        </vwc-text>
  </vwc-expansion-panel>
  <vwc-expansion-panel heading="This is heading <h6>" headingLevel=6>
   <vwc-text font-face="body-1">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
            standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
            a type specimen book.
        </vwc-text>
  </vwc-expansion-panel>
  ```

  ## Methods

| Method       | Type       | Description                                      |
| ------------ | ---------- | ------------------------------------------------ |
| `hide`       | `(): void` | Closes the expansion panel from the open state.  |
| `show`       | `(): void` | Opens the expansion panel from the closed state. |
| `toggleOpen` | `(): void` | Toggles the expansion panel.                     |