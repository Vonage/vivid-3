# VVideoPlayer

Base class for video-player

## Props

| Name               | Type                                      | Description                                                 |
| ------------------ | ----------------------------------------- | ----------------------------------------------------------- |
| **autoplay**       | `boolean`                                 | Sets the video to start playing automatically after loading |
| **loop**           | `boolean`                                 | Sets the video to loop                                      |
| **playback-rates** | `string`                                  | Sets the possible playback rates                            |
| **poster**         | `string`                                  | Reference to poster image's source                          |
| **skip-by**        | *Enum*:<br/>`0`<br/>`5`<br/>`10`<br/>`30` | Sets the amount to skip                                     |
| **src**            | `string`                                  | Reference to the video's source                             |

## Events

| Name        | Event Type               | Description                                                                                                                                                |
| ----------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **blur**    | `FocusEvent`             | Fires when the element loses focus.                                                                                                                        |
| **click**   | `MouseEvent`             | Fires when a pointing device button (such as a mouse's primary mouse button) is both pressed and released while the pointer is located inside the element. |
| **ended**   | `CustomEvent<undefined>` | Fired when the video is ended                                                                                                                              |
| **focus**   | `FocusEvent`             | Fires when the element receives focus.                                                                                                                     |
| **input**   | `Event`                  | Fires when the value of an element has been changed.                                                                                                       |
| **keydown** | `KeyboardEvent`          | Fires when a key is pressed.                                                                                                                               |
| **keyup**   | `KeyboardEvent`          | Fires when a key is released.                                                                                                                              |
| **pause**   | `CustomEvent<undefined>` | Fired when the video is paused                                                                                                                             |
| **play**    | `CustomEvent<undefined>` | Fired when the video is played                                                                                                                             |

## Slots

| Name        | Description  |
| ----------- | ------------ |
| **default** | Default slot |
