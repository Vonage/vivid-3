# VHeader



## Props

| Name                 | Type      | Description                               |
| -------------------- | --------- | ----------------------------------------- |
| **alternate**        | `boolean` | applies scheme alternate to header region |
| **elevation-shadow** | `boolean` | header elevation shadow                   |

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

| Name             | Description                                                               |
| ---------------- | ------------------------------------------------------------------------- |
| **action-items** | Nodes assigned to action-items slot will be set at the end of the header. |
| **app-content**  | Content vertically aligned with header.                                   |
| **default**      | Default slot.                                                             |
