# VAccordion



## Props

| Name            | Type                             | Description                                                      |
| --------------- | -------------------------------- | ---------------------------------------------------------------- |
| **expand-mode** | *Enum*:<br/>`single`<br/>`multi` | Determines if multiple items or a single item can opened at once |

## Events

| Name        | Event Type                    | Description                                                                                                                                                |
| ----------- | ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **blur**    | `FocusEvent`                  | Fires when the element loses focus.                                                                                                                        |
| **change**  | `CustomEvent<string \| null>` | Fires a custom 'change' event when the active item changes                                                                                                 |
| **click**   | `MouseEvent`                  | Fires when a pointing device button (such as a mouse's primary mouse button) is both pressed and released while the pointer is located inside the element. |
| **focus**   | `FocusEvent`                  | Fires when the element receives focus.                                                                                                                     |
| **input**   | `Event`                       | Fires when the value of an element has been changed.                                                                                                       |
| **keydown** | `KeyboardEvent`               | Fires when a key is pressed.                                                                                                                               |
| **keyup**   | `KeyboardEvent`               | Fires when a key is released.                                                                                                                              |

## Slots

| Name        | Description   |
| ----------- | ------------- |
| **default** | Default slot. |

## Methods

| Name         | Type         | Description |
| ------------ | ------------ | ----------- |
| **closeAll** | `() => void` |             |
