# VTreeItem



## Props

| Name         | Type                                                                                                                                                                                                                                                                                                                                                          | Description                                                                                                                                                                                                                |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **disabled** | `boolean`                                                                                                                                                                                                                                                                                                                                                     | When true, the control will be immutable by user interaction. See https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/disabled | disabled HTML attribute for more information.                                    |
| **expanded** | `boolean`                                                                                                                                                                                                                                                                                                                                                     | When true, the control will be appear expanded by user interaction.                                                                                                                                                        |
| **icon**     | *Enum*:<br/>`10-sec-backward-line`<br/>`10-sec-backward-solid`<br/>`10-sec-forward-line`<br/>`10-sec-forward-solid`<br/>`30-sec-backward-line`<br/>`30-sec-backward-solid`<br/>`30-sec-forward-line`<br/>`30-sec-forward-solid`<br/>`5-sec-backward-line`<br/>`5-sec-backward-solid`<br/>`5-sec-forward-line`<br/>`5-sec-forward-solid`<br/>... 1268 more ... | A decorative icon the custom element should have. See the [Vivid Icon Gallery](/icons/icons-gallery/) for available icons and `icon-name`s See the Vivid Icon Gallery for available icons: https://icons.vivid.vonage.com/ |
| **selected** | `boolean`                                                                                                                                                                                                                                                                                                                                                     | When true, the control will appear selected by user interaction.                                                                                                                                                           |
| **text**     | `string`                                                                                                                                                                                                                                                                                                                                                      | Indicates the text's text.                                                                                                                                                                                                 |

## Events

| Name                | Event Type                 | Description                                                                                                                                                |
| ------------------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **blur**            | `FocusEvent`               | Fires when the element loses focus.                                                                                                                        |
| **click**           | `MouseEvent`               | Fires when a pointing device button (such as a mouse's primary mouse button) is both pressed and released while the pointer is located inside the element. |
| **expanded-change** | `CustomEvent<HTMLElement>` | Fires a custom 'expanded-change' event when the expanded state changes                                                                                     |
| **focus**           | `FocusEvent`               | Fires when the element receives focus.                                                                                                                     |
| **input**           | `Event`                    | Fires when the value of an element has been changed.                                                                                                       |
| **keydown**         | `KeyboardEvent`            | Fires when a key is pressed.                                                                                                                               |
| **keyup**           | `KeyboardEvent`            | Fires when a key is released.                                                                                                                              |
| **selected-change** | `CustomEvent<HTMLElement>` | Fires a custom 'selected-change' event when the selected state changes                                                                                     |

## Slots

| Name     | Description                                        |
| -------- | -------------------------------------------------- |
| **icon** | The preferred way to add an icon to the component. |
| **item** | To specify a child tree item.                      |

## Methods

| Name             | Type         | Description |
| ---------------- | ------------ | ----------- |
| **itemsChanged** | `() => void` |             |
