# VIcon



## Props

| Name            | Type                                                                                                                                                                                                                                                                                                                                                          | Description                                                                                                                                                                                      |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **connotation** | *Enum*:<br/>`alert`<br/>`accent`<br/>`cta`<br/>`success`<br/>`warning`<br/>`information`<br/>`announcement`                                                                                                                                                                                                                                                   | The connotation the icon should have.                                                                                                                                                            |
| **label**       | `string`                                                                                                                                                                                                                                                                                                                                                      | Provides a (screen reader only) descriptive label for the icon.                                                                                                                                  |
| **name**        | *Enum*:<br/>`10-sec-backward-line`<br/>`10-sec-backward-solid`<br/>`10-sec-forward-line`<br/>`10-sec-forward-solid`<br/>`30-sec-backward-line`<br/>`30-sec-backward-solid`<br/>`30-sec-forward-line`<br/>`30-sec-forward-solid`<br/>`5-sec-backward-line`<br/>`5-sec-backward-solid`<br/>`5-sec-forward-line`<br/>`5-sec-forward-solid`<br/>... 1268 more ... | Indicates which icon to resolve. See the Vivid Icon Gallery for available icons: https://icons.vivid.vonage.com/ See the Vivid Icon Gallery for available icons: https://icons.vivid.vonage.com/ |
| **size**        | *Enum*:<br/>0<br/>1<br/>-1<br/>2<br/>3<br/>4<br/>5<br/>-6<br/>-5<br/>-4<br/>-3<br/>-2                                                                                                                                                                                                                                                                         |                                                                                                                                                                                                  |

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

| Name        | Description   |
| ----------- | ------------- |
| **default** | Default slot. |
