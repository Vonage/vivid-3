# VTreeView



## Props

| Name                       | Type                                                         | Description                                                         |
| -------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------------- |
| **current-selected**       | *Enum*:<br/>HTMLElement<br/>@vonage/vivid#VwcTreeItemElement | The currently selected tree item                                    |
| **render-collapsed-nodes** | `boolean`                                                    | When true, the control will be appear expanded by user interaction. |

## Events

| Name        | Event Type      | Description                                                                                                                                                |
| ----------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **blur**    | `FocusEvent`    | Fires when the element loses focus.                                                                                                                        |
| **click**   | `MouseEvent`    | Fires when a pointing device button (such as a mouse's primary mouse button) is both pressed and released while the pointer is located inside the element. |
| **focus**   | `FocusEvent`    | Fires when the element receives focus.                                                                                                                     |
| **input**   | `Event`         | Fires when the value of an element has been changed.                                                                                                       |
| **keydown** | `KeyboardEvent` | Fires when a key is pressed.                                                                                                                               |
| **keyup**   | `KeyboardEvent` | Fires when a key is released.                                                                                                                              |

## Slots

| Name        | Description   |
| ----------- | ------------- |
| **default** | Default slot. |
