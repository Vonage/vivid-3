# VTabs



## Props

| Name                 | Type                                    | Description                                                                            |
| -------------------- | --------------------------------------- | -------------------------------------------------------------------------------------- |
| **activeid**         | `string`                                | Match with an `id` set on a Tab to mark it as active on initial load                   |
| **activeindicator**  | `boolean`                               | Deprecated attribute. It has no effect.                                                |
| **connotation**      | *Enum*:<br/>`accent`<br/>`cta`          | Sets the connotation color of the active tab                                           |
| **gutters**          | *Enum*:<br/>`none`<br/>`small`          | Sets the spacing inside the Tab Panels                                                 |
| **orientation**      | *Enum*:<br/>`horizontal`<br/>`vertical` | The orientation                                                                        |
| **scrollable-panel** | `boolean`                               | Sets whether the Tab Panel will be scrollable (if content height exceeds `block-size`) |
| **tabs-layout**      | *Enum*:<br/>`align-start`<br/>`stretch` | Controls the layout of the tabs.                                                       |

## Events

| Name        | Event Type                 | Description                                                                                                                                                |
| ----------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **blur**    | `FocusEvent`               | Fires when the element loses focus.                                                                                                                        |
| **change**  | `CustomEvent<HTMLElement>` | Fires a custom 'change' event when a tab is clicked or during keyboard navigation                                                                          |
| **click**   | `MouseEvent`               | Fires when a pointing device button (such as a mouse's primary mouse button) is both pressed and released while the pointer is located inside the element. |
| **focus**   | `FocusEvent`               | Fires when the element receives focus.                                                                                                                     |
| **input**   | `Event`                    | Fires when the value of an element has been changed.                                                                                                       |
| **keydown** | `KeyboardEvent`            | Fires when a key is pressed.                                                                                                                               |
| **keyup**   | `KeyboardEvent`            | Fires when a key is released.                                                                                                                              |

## Slots

| Name             | Description                                        |
| ---------------- | -------------------------------------------------- |
| **action-items** | Slot for action items such as buttons or controls. |
| **default**      | Default slot for tab and tab-panel elements.       |

## Methods

| Name       | Type                           | Description                                                                         |
| ---------- | ------------------------------ | ----------------------------------------------------------------------------------- |
| **adjust** | `(adjustment: number) => void` | Adjusts the active index by numerical increments. Only enabled tabs are considered. |
