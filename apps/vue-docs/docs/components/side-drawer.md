# VSideDrawer



## Props

| Name          | Type      | Description                               |
| ------------- | --------- | ----------------------------------------- |
| **alternate** | `boolean` | applies scheme alternate region           |
| **modal**     | `boolean` | sets the side drawer's type to modal      |
| **open**      | `boolean` | indicates whether the side drawer is open |
| **trailing**  | `boolean` | sets the side of the side drawer          |

## Events

| Name        | Event Type               | Description                                                                                                                                                |
| ----------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **blur**    | `FocusEvent`             | Fires when the element loses focus.                                                                                                                        |
| **cancel**  | `CustomEvent<undefined>` | Fired when the user requests to close the side-drawer. You can prevent the side drawer from closing by calling `.preventDefault()` on the event.           |
| **click**   | `MouseEvent`             | Fires when a pointing device button (such as a mouse's primary mouse button) is both pressed and released while the pointer is located inside the element. |
| **close**   | `CustomEvent<undefined>` | Fired when the side drawer is closed.                                                                                                                      |
| **focus**   | `FocusEvent`             | Fires when the element receives focus.                                                                                                                     |
| **input**   | `Event`                  | Fires when the value of an element has been changed.                                                                                                       |
| **keydown** | `KeyboardEvent`          | Fires when a key is pressed.                                                                                                                               |
| **keyup**   | `KeyboardEvent`          | Fires when a key is released.                                                                                                                              |
| **open**    | `CustomEvent<undefined>` | Fired when the side drawer is opened.                                                                                                                      |

## Slots

| Name            | Description                                                                             |
| --------------- | --------------------------------------------------------------------------------------- |
| **app-content** | Sets assigned nodes to the main application content, the side drawer is opened next to. |
| **default**     | Sets assigned nodes to the side drawer itself.                                          |
