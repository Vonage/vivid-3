# VTooltip



## Props

| Name          | Type                                                                                                                                                                                      | Description                                               |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| **anchor**    | *Enum*:<br/>string<br/>HTMLElement                                                                                                                                                        | ID or direct reference to the component's anchor element. |
| **open**      | `boolean`                                                                                                                                                                                 |                                                           |
| **placement** | *Enum*:<br/>`top`<br/>`bottom`<br/>`left`<br/>`right`<br/>`top-start`<br/>`top-end`<br/>`bottom-start`<br/>`bottom-end`<br/>`left-end`<br/>`left-start`<br/>`right-end`<br/>`right-start` |                                                           |
| **text**      | `string`                                                                                                                                                                                  | Text content of the Tooltip                               |

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

| Name       | Description                                     |
| ---------- | ----------------------------------------------- |
| **anchor** | Used to set the anchor element for the tooltip. |
