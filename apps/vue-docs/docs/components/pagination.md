# VPagination



## Props

| Name               | Type                                                       | Description                           |
| ------------------ | ---------------------------------------------------------- | ------------------------------------- |
| **nav-icons**      | `boolean`                                                  |                                       |
| **selected-index** | `number`                                                   |                                       |
| **shape**          | *Enum*:<br/>`rounded`<br/>`pill`                           | The shape the pagination should have. |
| **size**           | *Enum*:<br/>`condensed`<br/>`normal`<br/>`super-condensed` | The size the pagination should have.  |
| **total**          | `number`                                                   |                                       |

## Events

| Name                  | Event Type                                                              | Description                                                                                                                                                |
| --------------------- | ----------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **blur**              | `FocusEvent`                                                            | Fires when the element loses focus.                                                                                                                        |
| **click**             | `MouseEvent`                                                            | Fires when a pointing device button (such as a mouse's primary mouse button) is both pressed and released while the pointer is located inside the element. |
| **focus**             | `FocusEvent`                                                            | Fires when the element receives focus.                                                                                                                     |
| **input**             | `Event`                                                                 | Fires when the value of an element has been changed.                                                                                                       |
| **keydown**           | `KeyboardEvent`                                                         | Fires when a key is pressed.                                                                                                                               |
| **keyup**             | `KeyboardEvent`                                                         | Fires when a key is released.                                                                                                                              |
| **pagination-change** | `CustomEvent<{selectedIndex: number, total: number, oldIndex: number}>` | Fires when the page changes.                                                                                                                               |
