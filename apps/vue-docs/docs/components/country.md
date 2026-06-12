# VCountry



## Props

| Name      | Type     | Description                                                                                                                                                                                               |
| --------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **code**  | `string` | ISO 3166-1 alpha-2 country code (e.g. "GB", "UK", "US"). When set, the component shows the matching flag (from [flag-icons](https://github.com/lipis/flag-icons)) and the code (e.g. "UK") automatically. |
| **label** | `string` | Optional text to show instead of the country code (e.g. "Saint Helena" for "SH"). Useful for less familiar codes.                                                                                         |

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

| Name     | Description                                                                                                                          |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| **icon** | Optional custom flag or graphic. When `code` is set and no content is slotted, a default flag icon (Vivid/Vonage icon set) is shown. |
