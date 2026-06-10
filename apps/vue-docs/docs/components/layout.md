# VLayout

[--layout-grid-template-columns=repeat([the `auto-sizing` mapped value],
minmax([the `column-basis` mapped value], 1fr))] - Controls the `grid-template-columns` of the layout.

## Props

| Name               | Type                                                     | Description                                                                   |
| ------------------ | -------------------------------------------------------- | ----------------------------------------------------------------------------- |
| **auto-sizing**    | *Enum*:<br/>`fill`<br/>`fit`                             | Controls how the grid's behaves with empty column tracks                      |
| **column-basis**   | *Enum*:<br/>`small`<br/>`medium`<br/>`large`<br/>`block` | Controls the `min-width` of columns                                           |
| **column-spacing** | *Enum*:<br/>`small`<br/>`medium`<br/>`large`             | Controls the size of the spacing between columns                              |
| **gutters**        | *Enum*:<br/>`small`<br/>`medium`<br/>`large`             | Controls the amount of margin around the component                            |
| **row-spacing**    | *Enum*:<br/>`small`<br/>`medium`<br/>`large`             | sets the initial preferred spacing of a row from predefined available options |

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
