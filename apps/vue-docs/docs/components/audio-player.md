# VAudioPlayer



## Props

| Name                         | Type                                      | Description                                                                                    |
| ---------------------------- | ----------------------------------------- | ---------------------------------------------------------------------------------------------- |
| **connotation**              | *Enum*:<br/>`accent`<br/>`cta`            | Sets the color of the audio player                                                             |
| **current-time**             | `number`                                  |                                                                                                |
| **disabled**                 | `boolean`                                 | Sets the disabled state of the audio player                                                    |
| **duration**                 | `number`                                  |                                                                                                |
| **duration-fallback**        | `boolean`                                 | Enables fallback logic to fetch and decode audio buffer for duration when metadata is missing. |
| **notime**                   | `boolean`                                 | Hides the time stamp                                                                           |
| **pause-button-aria-label**  | `string`                                  |                                                                                                |
| **paused**                   | `boolean`                                 |                                                                                                |
| **play-button-aria-label**   | `string`                                  |                                                                                                |
| **playback-rate**            | `number`                                  |                                                                                                |
| **playback-rates**           | `string`                                  | Comma-separated string of numbers to define playback speeds                                    |
| **skip-backward-aria-label** | `string`                                  |                                                                                                |
| **skip-by**                  | *Enum*:<br/>`0`<br/>`5`<br/>`10`<br/>`30` | Allows the audio to skip back or forward                                                       |
| **skip-forward-aria-label**  | `string`                                  |                                                                                                |
| **slider-aria-label**        | `string`                                  |                                                                                                |
| **src**                      | `string`                                  | Sets the audio source URL                                                                      |

## Events

| Name        | Event Type               | Description                                                                                                                                                |
| ----------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **blur**    | `FocusEvent`             | Fires when the element loses focus.                                                                                                                        |
| **click**   | `MouseEvent`             | Fires when a pointing device button (such as a mouse's primary mouse button) is both pressed and released while the pointer is located inside the element. |
| **focus**   | `FocusEvent`             | Fires when the element receives focus.                                                                                                                     |
| **input**   | `Event`                  | Fires when the value of an element has been changed.                                                                                                       |
| **keydown** | `KeyboardEvent`          | Fires when a key is pressed.                                                                                                                               |
| **keyup**   | `KeyboardEvent`          | Fires when a key is released.                                                                                                                              |
| **pause**   | `CustomEvent<undefined>` | Fires when the audio playback is paused.                                                                                                                   |
| **play**    | `CustomEvent<undefined>` | Fires when the audio playback is started.                                                                                                                  |

## Methods

| Name      | Type         | Description |
| --------- | ------------ | ----------- |
| **pause** | `() => void` |             |
| **play**  | `() => void` |             |
