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

## Indicator Icon Set
With the `indicatorIconSet` attribute you can choose which icon set to use. 

- Type: `'chevron'` | `'binary'`
- Default: `'chevron'`

```html preview
 <vwc-expansion-panel heading="chevron" indicatorIconSet="chevron">
   <vwc-text font-face="body-1">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
            standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
            a type specimen book.
        </vwc-text>
  </vwc-expansion-panel>
  <vwc-expansion-panel heading="binary" indicatorIconSet="binary">
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

## Size
Use the `size` attribute to change the expansion panel's size.

- Type: `'base-small'` | `'base'` | `'base-large'`
- Default: `'base'`

```html preview
 <vwc-expansion-panel heading="base-small" size="base-small">
   <vwc-text font-face="body-1">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
            standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
            a type specimen book.
        </vwc-text>
  </vwc-expansion-panel>
   <vwc-expansion-panel heading="base" size="base">
   <vwc-text font-face="body-1">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
            standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
            a type specimen book.
        </vwc-text>
  </vwc-expansion-panel>
   <vwc-expansion-panel heading="base-large" size="base-large">
   <vwc-text font-face="body-1">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
            standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
            a type specimen book.
        </vwc-text>
  </vwc-expansion-panel>
  ```

## Outlined
Wrap the expansion panel with an `vwc-elevation` component to get an outlined style.
  
```html preview
<vwc-elevation dp="0">
  <vwc-expansion-panel heading="Campaign Details">
    <vwc-text font-face="body-1">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
            standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
            a type specimen book.
     </vwc-text>
  </vwc-expansion-panel>
</vwc-elevation>
```

  ## Methods

| Method       | Type       | Description                                      |
| ------------ | ---------- | ------------------------------------------------ |
| `hide`       | `(): void` | Closes the expansion panel from the open state.  |
| `show`       | `(): void` | Opens the expansion panel from the closed state. |
| `toggleOpen` | `(): void` | Toggles the expansion panel.                     |