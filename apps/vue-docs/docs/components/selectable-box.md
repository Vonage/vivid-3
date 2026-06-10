# VSelectableBox



## Props

| Name                  | Type                                                                | Description                                            |
| --------------------- | ------------------------------------------------------------------- | ------------------------------------------------------ |
| **checked**           | `boolean`                                                           | Controls the checked state                             |
| **clickable-box**     | `boolean`                                                           | Sets the whole box to be clickable                     |
| **connotation**       | *Enum*:<br/>`accent`<br/>`cta`                                      | Controls the color of the box and its control          |
| **control-placement** | *Enum*:<br/>`end`<br/>`start`<br/>`start-stacked`<br/>`end-stacked` | Controls where the control should be placed in the box |
| **control-type**      | *Enum*:<br/>`checkbox`<br/>`radio`                                  | Controls the type of control in the box                |
| **disabled**          | `boolean`                                                           | Controls the disabled state of the box and its control |
| **tight**             | `boolean`                                                           | Removes the padding from the boxes content area        |

## Events

| Name        | Event Type               | Description                                                                                                                                                |
| ----------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **blur**    | `FocusEvent`             | Fires when the element loses focus.                                                                                                                        |
| **change**  | `CustomEvent<undefined>` | Fired when the checked state changes                                                                                                                       |
| **click**   | `MouseEvent`             | Fires when a pointing device button (such as a mouse's primary mouse button) is both pressed and released while the pointer is located inside the element. |
| **focus**   | `FocusEvent`             | Fires when the element receives focus.                                                                                                                     |
| **input**   | `Event`                  | Fires when the value of an element has been changed.                                                                                                       |
| **keydown** | `KeyboardEvent`          | Fires when a key is pressed.                                                                                                                               |
| **keyup**   | `KeyboardEvent`          | Fires when a key is released.                                                                                                                              |

## Slots

| Name        | Description             |
| ----------- | ----------------------- |
| **default** | Slot for box's content. |
