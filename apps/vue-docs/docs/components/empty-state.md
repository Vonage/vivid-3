# VEmptyState

An empty state element. Used when there is no data to display to the user.

## Props

| Name                | Type                                                                                                                                                                                                                                                                                                                                                          | Description                                                                                                                                                                                                             |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **connotation**     | *Enum*:<br/>`alert`<br/>`accent`<br/>`cta`<br/>`success`<br/>`warning`<br/>`information`                                                                                                                                                                                                                                                                      | The connotation the button should have.                                                                                                                                                                                 |
| **headline**        | `string`                                                                                                                                                                                                                                                                                                                                                      | An optional headline for the empty state.                                                                                                                                                                               |
| **icon**            | *Enum*:<br/>`10-sec-backward-line`<br/>`10-sec-backward-solid`<br/>`10-sec-forward-line`<br/>`10-sec-forward-solid`<br/>`30-sec-backward-line`<br/>`30-sec-backward-solid`<br/>`30-sec-forward-line`<br/>`30-sec-forward-solid`<br/>`5-sec-backward-line`<br/>`5-sec-backward-solid`<br/>`5-sec-forward-line`<br/>`5-sec-forward-solid`<br/>... 1268 more ... | A decorative icon the Empty State should have. See the [Vivid Icon Gallery](/icons/icons-gallery/) for available icons and `icon-name`s See the Vivid Icon Gallery for available icons: https://icons.vivid.vonage.com/ |
| **icon-decoration** | *Enum*:<br/>`filled`<br/>`outlined`                                                                                                                                                                                                                                                                                                                           | Has no effect on the component                                                                                                                                                                                          |

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

| Name             | Description                                                            |
| ---------------- | ---------------------------------------------------------------------- |
| **action-items** | Slot to add action items to the empty state                            |
| **default**      | The default slot controls the body text of the empty state             |
| **graphic**      | The graphic slot allows overriding the icon with a custom illustration |
