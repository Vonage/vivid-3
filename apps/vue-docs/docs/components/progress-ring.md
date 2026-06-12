# VProgressRing



## Props

| Name            | Type                                                                                  | Description                      |
| --------------- | ------------------------------------------------------------------------------------- | -------------------------------- |
| **connotation** | *Enum*:<br/>`accent`<br/>`cta`<br/>`success`<br/>`alert`                              |                                  |
| **max**         | `number`                                                                              | The maximum value                |
| **min**         | `number`                                                                              | The minimum value                |
| **paused**      | `boolean`                                                                             | Indicates the progress is paused |
| **size**        | *Enum*:<br/>0<br/>1<br/>-1<br/>2<br/>3<br/>4<br/>5<br/>-6<br/>-5<br/>-4<br/>-3<br/>-2 |                                  |
| **value**       | `number`                                                                              | The value of the progress        |

## Events

| Name        | Event Type      | Description                                                                                                                                                |
| ----------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **blur**    | `FocusEvent`    | Fires when the element loses focus.                                                                                                                        |
| **click**   | `MouseEvent`    | Fires when a pointing device button (such as a mouse's primary mouse button) is both pressed and released while the pointer is located inside the element. |
| **focus**   | `FocusEvent`    | Fires when the element receives focus.                                                                                                                     |
| **input**   | `Event`         | Fires when the value of an element has been changed.                                                                                                       |
| **keydown** | `KeyboardEvent` | Fires when a key is pressed.                                                                                                                               |
| **keyup**   | `KeyboardEvent` | Fires when a key is released.                                                                                                                              |
