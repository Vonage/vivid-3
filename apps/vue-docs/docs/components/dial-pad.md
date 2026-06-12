# VDialPad

Base class for dial-pad

## Props

| Name                      | Type                                 | Description                                                                                                                                                                                                                          |
| ------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **autofocus**             | `boolean`                            | Indicates that an element should be focused on page load, or when the Dialog that it is part of is displayed. When `no-input` attribute is specified, it will be the first digit button. Otherwise, the text field will be focused.` |
| **call-active**           | `boolean`                            | Controls the active state of the call                                                                                                                                                                                                |
| **call-button-label**     | `string`                             | Controls the call button label                                                                                                                                                                                                       |
| **delete-aria-label**     | `string`                             | The aria-label for the delete button                                                                                                                                                                                                 |
| **disabled**              | `boolean`                            | Controls the disabled state of the dial pad                                                                                                                                                                                          |
| **end-call-button-label** | `string`                             | Controls the end call button label                                                                                                                                                                                                   |
| **helper-text**           | `string`                             | Controls the helper text displayed below the phone input element                                                                                                                                                                     |
| **no-call**               | `boolean`                            | Removes the call button and functionality                                                                                                                                                                                            |
| **no-input**              | `boolean`                            | Removes the phone input element                                                                                                                                                                                                      |
| **pattern**               | `string`                             | Regular expression to validate the value of the input element                                                                                                                                                                        |
| **pending**               | `boolean`                            | Controls the pending state                                                                                                                                                                                                           |
| **placeholder**           | `string`                             | Indicates the placeholder's text.                                                                                                                                                                                                    |
| **size**                  | *Enum*:<br/>`condensed`<br/>`normal` | Controls the vertical size of the dial pad                                                                                                                                                                                           |
| **value**                 | `string`                             | Value of the phone input element                                                                                                                                                                                                     |

## Events

| Name             | Event Type                 | Description                                                                                                                                                |
| ---------------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **blur**         | `CustomEvent<undefined>`   | Emitted when the text field loses focus                                                                                                                    |
| **change**       | `CustomEvent<undefined>`   | Emitted when the text field value changes                                                                                                                  |
| **click**        | `MouseEvent`               | Fires when a pointing device button (such as a mouse's primary mouse button) is both pressed and released while the pointer is located inside the element. |
| **dial**         | `CustomEvent<undefined>`   | Emitted when the call button is clicked                                                                                                                    |
| **end-call**     | `CustomEvent<undefined>`   | Emitted when the end call button is clicked                                                                                                                |
| **focus**        | `CustomEvent<undefined>`   | Emitted when the text field receives focus                                                                                                                 |
| **input**        | `CustomEvent<undefined>`   | Emitted when the text field value changes                                                                                                                  |
| **keydown**      | `KeyboardEvent`            | Fires when a key is pressed.                                                                                                                               |
| **keypad-click** | `CustomEvent<HTMLElement>` | Emitted when a digit button is clicked                                                                                                                     |
| **keyup**        | `KeyboardEvent`            | Fires when a key is released.                                                                                                                              |

## Methods

| Name             | Type                                           | Description                                                                                                                                         |
| ---------------- | ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| **focus**        | `() => void`                                   | Moves focus into the Dial Pad. If `no-input` attribute is specified, it will be the first digit button. Otherwise, the input field will be focused. |
| **valueChanged** | `(_oldValue: string,newValue: string) => void` |                                                                                                                                                     |
