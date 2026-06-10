# VStatus



## Props

| Name            | Type                                                                                                                                                                                                                                                                                                                                                          | Description                                                                                                                                                                                                                |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **connotation** | *Enum*:<br/>`alert`<br/>`success`<br/>`warning`<br/>`information`                                                                                                                                                                                                                                                                                             | The connotation; determines icon and color.                                                                                                                                                                                |
| **icon**        | *Enum*:<br/>`10-sec-backward-line`<br/>`10-sec-backward-solid`<br/>`10-sec-forward-line`<br/>`10-sec-forward-solid`<br/>`30-sec-backward-line`<br/>`30-sec-backward-solid`<br/>`30-sec-forward-line`<br/>`30-sec-forward-solid`<br/>`5-sec-backward-line`<br/>`5-sec-backward-solid`<br/>`5-sec-forward-line`<br/>`5-sec-forward-solid`<br/>... 1268 more ... | A decorative icon the custom element should have. See the [Vivid Icon Gallery](/icons/icons-gallery/) for available icons and `icon-name`s See the Vivid Icon Gallery for available icons: https://icons.vivid.vonage.com/ |
| **status**      | `string`                                                                                                                                                                                                                                                                                                                                                      | The status title (e.g. "Positive", "Info", "Warning", "Alert").                                                                                                                                                            |

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

| Name        | Description                                                           |
| ----------- | --------------------------------------------------------------------- |
| **default** | Description text below the title.                                     |
| **icon**    | Optional custom icon. When not set, icon is derived from connotation. |
