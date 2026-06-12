# VCalendarEvent



## Props

| Name              | Type                                                                                                        | Description                                                          |
| ----------------- | ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| **appearance**    | *Enum*:<br/>`filled`<br/>`duotone`<br/>`subtle`                                                             | Sets the event's appearance                                          |
| **connotation**   | *Enum*:<br/>`alert`<br/>`accent`<br/>`cta`<br/>`success`<br/>`warning`<br/>`information`<br/>`announcement` | Sets the first day of the week to display                            |
| **description**   | `string`                                                                                                    | Sets the event description                                           |
| **duration**      | `number`                                                                                                    | Sets the event duration (e.g. `2` = 2 hours)                         |
| **heading**       | `string`                                                                                                    | Sets the event heading                                               |
| **overlap-count** | `number`                                                                                                    | Sets the stacking context of the event when it overlaps with another |
| **start**         | `number`                                                                                                    | Sets the event start time (e.g. `14` = 2pm)                          |

## Events

| Name        | Event Type      | Description                                                                                                                                                |
| ----------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **blur**    | `FocusEvent`    | Fires when the element loses focus.                                                                                                                        |
| **click**   | `MouseEvent`    | Fires when a pointing device button (such as a mouse's primary mouse button) is both pressed and released while the pointer is located inside the element. |
| **focus**   | `FocusEvent`    | Fires when the element receives focus.                                                                                                                     |
| **input**   | `Event`         | Fires when the value of an element has been changed.                                                                                                       |
| **keydown** | `KeyboardEvent` | Fires when a key is pressed.                                                                                                                               |
| **keyup**   | `KeyboardEvent` | Fires when a key is released.                                                                                                                              |
