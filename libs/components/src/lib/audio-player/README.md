## Usage

<vwc-tabs>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```js
import '@vonage/vivid/audio-player';
```
or, if you need to use a unique prefix:

```js
import { registerAudioPlayer } from '@vonage/vivid';

registerAudioPlayer('your-prefix');
```

```html preview
<script type="module">
	import { registerAudioPlayer } from '@vonage/vivid';
	registerAudioPlayer('your-prefix');
</script>

<your-prefix-audio-player
	src="https://freetestdata.com/wp-content/uploads/2021/09/Free_Test_Data_2MB_MP3.mp3"
></your-prefix-audio-player>
```

</vwc-tab-panel>
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```html
<script setup lang="ts">
	import { VAudioPlayer } from '@vonage/vivid-vue';
</script>
<template>
	<VAudioPlayer src="audio-file.mp3" />
</template>
```

</vwc-tab-panel>
</vwc-tabs>

## Knob Opacity

```html preview
<p>Native Audio Player</p>
<audio
	style="width: 90%;"
	src="https://freetestdata.com/wp-content/uploads/2021/09/Free_Test_Data_2MB_MP3.mp3"
	controls
></audio>
<p>Vivid Audio Player</p>
<vwc-audio-player
	style="max-inline-size: 500px;"
	src="https://freetestdata.com/wp-content/uploads/2021/09/Free_Test_Data_2MB_MP3.mp3"
></vwc-audio-player>
```

## Audio Source

Use the `src` attribute to add an audio track to the Audio Player.

```html preview
<vwc-audio-player
	src="https://freetestdata.com/wp-content/uploads/2021/09/Free_Test_Data_2MB_MP3.mp3"
></vwc-audio-player>
```

## Current Time

Use the `currentTime` property change or get the Audio Player's current time. The property accepts and returns a `number` representing the time in seconds.

```html preview
<vwc-audio-player
	id="audio"
	src="https://freetestdata.com/wp-content/uploads/2021/09/Free_Test_Data_2MB_MP3.mp3"
></vwc-audio-player>

<vwc-button
	id="current"
	label="Get current time"
	appearance="outlined"
></vwc-button>
<vwc-button id="skip" label="Skip to 30s" appearance="outlined"></vwc-button
>&nbsp; Current time: <span id="output"></span>

<script>
	const audio = document.getElementById('audio');
	const output = document.getElementById('output');

	document.getElementById('skip').addEventListener('click', () => {
		audio.currentTime = 30;
		output.innerHTML = parseInt(audio.currentTime) + 's';
	});

	document.getElementById('current').addEventListener('click', () => {
		output.innerHTML = parseInt(audio.currentTime) + 's';
	});
</script>
```

## Duration

The `duration` property indicates the duration of the loaded audio. The property is read only and returns a `number` representing the time in seconds.

```html preview
<vwc-audio-player
	notime
	id="audio"
	src="https://freetestdata.com/wp-content/uploads/2021/09/Free_Test_Data_2MB_MP3.mp3"
></vwc-audio-player>

<vwc-button
	id="duration"
	label="Get duration"
	appearance="outlined"
></vwc-button>
Duration of audio: <span id="output"></span>

<script>
	const audio = document.getElementById('audio');
	const output = document.getElementById('output');

	document.getElementById('duration').addEventListener('click', () => {
		output.innerHTML = parseInt(audio.duration) + 's';
	});
</script>
```

## Paused

The `paused` property indicates if the player is currently paused or not. The property is read only and returns a `boolean` value.

```html preview
<vwc-audio-player
	id="audio"
	src="https://freetestdata.com/wp-content/uploads/2021/09/Free_Test_Data_2MB_MP3.mp3"
></vwc-audio-player>

<vwc-button
	id="paused"
	label="Is the audio paused?"
	appearance="outlined"
></vwc-button>
<span id="output"></span>

<script>
	const audio = document.getElementById('audio');
	const output = document.getElementById('output');

	document.getElementById('paused').addEventListener('click', () => {
		output.innerHTML = audio.paused ? 'Yes' : 'No';
	});
</script>
```

## Play and Pause Methods

The audio can be played and paused programatically using the `play()` and `pause()` methods.

```html preview
<vwc-audio-player
	id="audio"
	src="https://freetestdata.com/wp-content/uploads/2021/09/Free_Test_Data_2MB_MP3.mp3"
></vwc-audio-player>

<vwc-button id="control" label="Play" appearance="outlined"></vwc-button>

<script>
	const audio = document.getElementById('audio');
	const control = document.getElementById('control');

	control.addEventListener('click', () => {
		if (audio.paused) {
			audio.play();
			control.label = 'Pause';
		} else {
			audio.pause();
			control.label = 'Play';
		}
	});
</script>
```

## Styles

### Inline Size (Width)

By default, Audio Player's `max-inline-size` is`100%`.
You can specify a different value with setting `max-inline-size` on the `vwc-audio-player.`

```html preview 250px
<vwc-audio-player
	playback-rates="0.75, 1, 1.5"
	skip-by="5"
	class="audio-player"
	src="https://freetestdata.com/wp-content/uploads/2021/09/Free_Test_Data_2MB_MP3.mp3"
></vwc-audio-player>

<style>
	.audio-player {
		max-inline-size: 350px;
	}
</style>
```

## API Reference

### Properties

| Name               | Type                           | Description                                                 |
| ------------------ | ------------------------------ | ----------------------------------------------------------- |
| **connotation**    | `accent` (default), `cta`      | Sets the color of the audio player                          |
| **currentTime**    | `number`                       | Get and set the current time                                |
| **disabled**       | `boolean`                      | Sets the disabled state of the audio player                 |
| **duration**       | `number`                       | Get the duration (in seconds) of the audio                  |
| **notime**         | `boolean`                      | Hides the time stamp                                        |
| **paused**         | `boolean`                      | Returns the paused state of the audio                       |
| **playback-rates** | `string`                       | Comma separated string of numbers to define playback speeds |
| **skip-by**        | `0` (default), `5`, `10`, `30` | Sets the amount of seconds to skip the audio by             |

### Methods

| Name      | Description      |
| --------- | ---------------- |
| **play**  | Plays the audio  |
| **pause** | Pauses the audio |
