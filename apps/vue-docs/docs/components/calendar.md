# VCalendar



## Props

| Name            | Type                                                   | Description                               |
| --------------- | ------------------------------------------------------ | ----------------------------------------- |
| **datetime**    | *Enum*:<br/>string<br/>Date                            | Sets the week to display                  |
| **hour12**      | `boolean`                                              | Displays a time in 12 hour format         |
| **locales**     | *Enum*:<br/>string<br/>string[]                        | Sets the locale to be displayed           |
| **start-day**   | *Enum*:<br/>`sunday`<br/>`monday`                      | Sets the first day of the week to display |
| **sticky-mode** | *Enum*:<br/>`none`<br/>`header`<br/>`column`<br/>`all` | Set the `sticky-mode` attribute           |

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

| Name        | Description                                                  |
| ----------- | ------------------------------------------------------------ |
| **day-0**   | Assign elements to corresponding day column using this slot. |
| **day-1**   | Assign elements to corresponding day column using this slot. |
| **day-2**   | Assign elements to corresponding day column using this slot. |
| **day-3**   | Assign elements to corresponding day column using this slot. |
| **day-4**   | Assign elements to corresponding day column using this slot. |
| **day-5**   | Assign elements to corresponding day column using this slot. |
| **day-6**   | Assign elements to corresponding day column using this slot. |
| **default** | Default slot.                                                |
