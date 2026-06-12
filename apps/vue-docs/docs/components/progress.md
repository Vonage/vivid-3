# VProgress



## Props

| Name            | Type                                                                   | Description                                  |
| --------------- | ---------------------------------------------------------------------- | -------------------------------------------- |
| **connotation** | *Enum*:<br/>`accent`<br/>`cta`<br/>`success`<br/>`alert`<br/>`pacific` | Sets the connotation                         |
| **max**         | `number`                                                               | The maximum value                            |
| **min**         | `number`                                                               | The minimum value                            |
| **paused**      | `boolean`                                                              | Indicates the progress is paused             |
| **reverse**     | `boolean`                                                              | Sets the progress to show from right to left |
| **shape**       | *Enum*:<br/>`rounded`<br/>`sharp`                                      | Sets the border radius                       |
| **value**       | `number`                                                               | The value of the progress                    |

## Events

| Name        | Event Type      | Description                                                                                                                                                |
| ----------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **blur**    | `FocusEvent`    | Fires when the element loses focus.                                                                                                                        |
| **click**   | `MouseEvent`    | Fires when a pointing device button (such as a mouse's primary mouse button) is both pressed and released while the pointer is located inside the element. |
| **focus**   | `FocusEvent`    | Fires when the element receives focus.                                                                                                                     |
| **input**   | `Event`         | Fires when the value of an element has been changed.                                                                                                       |
| **keydown** | `KeyboardEvent` | Fires when a key is pressed.                                                                                                                               |
| **keyup**   | `KeyboardEvent` | Fires when a key is released.                                                                                                                              |
