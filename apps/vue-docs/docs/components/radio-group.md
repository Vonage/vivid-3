# VRadioGroup



## Props

| Name            | Type                                    | Description                                                                                                                                                                                  |
| --------------- | --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **disabled**    | `boolean`                               | Whether the input element is disabled                                                                                                                                                        |
| **error-text**  | `string`                                |                                                                                                                                                                                              |
| **helper-text** | `string`                                | Provides additional information to help the user enter the correct information. To add HTML to the helper text, use the helper-text slot instead.                                            |
| **label**       | `string`                                | Label of the the Radio Group                                                                                                                                                                 |
| **name**        | `string`                                | The name of the radio group. Setting this value will set the name value for all child radio elements.                                                                                        |
| **orientation** | *Enum*:<br/>`horizontal`<br/>`vertical` | Sets axis on which the tabs are aligned                                                                                                                                                      |
| **readonly**    | `boolean`                               | When true, the child radios will be immutable by user interaction. See https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/readonly | readonly HTML attribute for more information. |
| **required**    | `boolean`                               | Sets the required state                                                                                                                                                                      |
| **value**       | `string`                                | The value of the checked radio                                                                                                                                                               |

## Events

| Name        | Event Type               | Description                                                                                                                                                |
| ----------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **blur**    | `FocusEvent`             | Fires when the element loses focus.                                                                                                                        |
| **change**  | `CustomEvent<undefined>` | Fires a custom 'change' event when the value changes                                                                                                       |
| **click**   | `MouseEvent`             | Fires when a pointing device button (such as a mouse's primary mouse button) is both pressed and released while the pointer is located inside the element. |
| **focus**   | `FocusEvent`             | Fires when the element receives focus.                                                                                                                     |
| **input**   | `Event`                  | Fires when the value of an element has been changed.                                                                                                       |
| **keydown** | `KeyboardEvent`          | Fires when a key is pressed.                                                                                                                               |
| **keyup**   | `KeyboardEvent`          | Fires when a key is released.                                                                                                                              |

## Slots

| Name            | Description                                                                      |
| --------------- | -------------------------------------------------------------------------------- |
| **default**     | Default slot.                                                                    |
| **helper-text** | Describes how to use the text-field. Alternative to the `helper-text` attribute. |

## Methods

| Name            | Type         | Description |
| --------------- | ------------ | ----------- |
| **nameChanged** | `() => void` |             |
