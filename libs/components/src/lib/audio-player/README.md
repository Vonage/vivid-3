## Usage

<vwc-tabs gutters="none" activeid="vue-tab">
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```js
import { registerAudioPlayer } from '@vonage/vivid';

registerAudioPlayer('your-prefix');
```

```html preview
<script type="module">
	import { registerAudioPlayer } from '@vonage/vivid';
	registerAudioPlayer('your-prefix');
</script>

<your-prefix-audio-player src="https://freetestdata.com/wp-content/uploads/2021/09/Free_Test_Data_2MB_MP3.mp3"></your-prefix-audio-player>
```

</vwc-tab-panel>
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VAudioPlayer } from '@vonage/vivid-vue';
</script>
<template>
	<VAudioPlayer src="https://freetestdata.com/wp-content/uploads/2021/09/Free_Test_Data_2MB_MP3.mp3" />
</template>
```

</vwc-tab-panel>
</vwc-tabs>

## Audio Source

Use the `src` attribute to add an audio track to the Audio Player.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VAudioPlayer } from '@vonage/vivid-vue';
</script>
<template>
	<VAudioPlayer src="https://freetestdata.com/wp-content/uploads/2021/09/Free_Test_Data_2MB_MP3.mp3" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-audio-player src="https://freetestdata.com/wp-content/uploads/2021/09/Free_Test_Data_2MB_MP3.mp3"></vwc-audio-player>
```

</vwc-tab-panel>
</vwc-tabs>

## Current Time

Use the `currentTime` property change or get the Audio Player's current time. The property accepts and returns a `number` representing the time in seconds.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<template>
	<VAudioPlayer ref="audioPlayer" src="https://freetestdata.com/wp-content/uploads/2021/09/Free_Test_Data_2MB_MP3.mp3" />

	<div class="container">
		<VButton label="Get current time" appearance="outlined" @click="getCurrentTime" />
		<VButton label="Skip to 30s" appearance="outlined" @click="skipTo30s" />
		<span>&nbsp; Current time: <span ref="outputSpan">0s</span></span>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { VAudioPlayer, VButton } from '@vonage/vivid-vue';

const audioPlayer = ref<InstanceType<typeof VAudioPlayer> | null>(null);
const outputSpan = ref<HTMLSpanElement | null>(null);

const skipTo30s = () => {
	if (audioPlayer.value?.element && outputSpan.value) {
		audioPlayer.value.element.currentTime = 30;
		outputSpan.value.innerHTML = Math.floor(audioPlayer.value.element.currentTime) + 's';
	}
};

const getCurrentTime = () => {
	if (audioPlayer.value?.element && outputSpan.value) {
		outputSpan.value.innerHTML = Math.floor(audioPlayer.value.element.currentTime) + 's';
	}
};
</script>

<style scoped>
.container {
	display: inline-flex;
	gap: 4px;
	align-items: center;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-audio-player id="audio" src="https://freetestdata.com/wp-content/uploads/2021/09/Free_Test_Data_2MB_MP3.mp3"></vwc-audio-player>

<div class="container">
	<vwc-button id="current" label="Get current time" appearance="outlined"></vwc-button>
	<vwc-button id="skip" label="Skip to 30s" appearance="outlined"></vwc-button>
	<span>&nbsp; Current time: <span id="output">0s</span></span>
</div>

<script>
	const audio = document.getElementById('audio');
	const output = document.getElementById('output');

	document.getElementById('skip').addEventListener('click', () => {
		audio.currentTime = 30;
		output.innerHTML = Math.floor(audio.currentTime) + 's';
	});

	document.getElementById('current').addEventListener('click', () => {
		output.innerHTML = Math.floor(audio.currentTime) + 's';
	});
</script>

<style>
	.container {
		display: inline-flex;
		gap: 4px;
		align-items: center;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

## Duration

The `duration` property indicates the duration of the loaded audio. The property is read only and returns a `number` representing the time in seconds.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { ref } from 'vue';
import { useTemplateRef } from 'vue';
import { VAudioPlayer, VButton } from '@vonage/vivid-vue';

const audioPlayer = useTemplateRef<InstanceType<typeof VAudioPlayer>>('audio-player');
const outputSpan = ref<HTMLSpanElement | null>(null);

const getDuration = () => {
	if (audioPlayer.value?.element) {
		outputSpan.value.innerHTML = parseInt(audioPlayer.value.element.duration.toString()) + 's';
	}
};
</script>
<template>
	<VAudioPlayer ref="audio-player" notime src="https://freetestdata.com/wp-content/uploads/2021/09/Free_Test_Data_2MB_MP3.mp3" />
	<VButton label="Get duration" appearance="outlined" @click="getDuration" />
	Duration of audio: <span ref="outputSpan"></span>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-audio-player notime id="audio" src="https://freetestdata.com/wp-content/uploads/2021/09/Free_Test_Data_2MB_MP3.mp3"></vwc-audio-player>

<vwc-button id="duration" label="Get duration" appearance="outlined"></vwc-button>
Duration of audio: <span id="output"></span>

<script>
	const audio = document.getElementById('audio');
	const output = document.getElementById('output');

	document.getElementById('duration').addEventListener('click', () => {
		output.innerHTML = parseInt(audio.duration) + 's';
	});
</script>
```

</vwc-tab-panel>
</vwc-tabs>

## Duration Fallback

The `duration-fallback` attribute enables fallback logic to fetch and decode audio buffer for duration when metadata is missing.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VAudioPlayer } from '@vonage/vivid-vue';
</script>
<template>
	<VAudioPlayer duration-fallback src="https://freetestdata.com/wp-content/uploads/2021/09/Free_Test_Data_2MB_MP3.mp3" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-audio-player duration-fallback src="https://freetestdata.com/wp-content/uploads/2021/09/Free_Test_Data_2MB_MP3.mp3"></vwc-audio-player>
```

</vwc-tab-panel>
</vwc-tabs>

## Paused

The `paused` property indicates if the player is currently paused or not. The property is read only and returns a `boolean` value.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { ref } from 'vue';
import { useTemplateRef } from 'vue';
import { VAudioPlayer, VButton } from '@vonage/vivid-vue';

const audioPlayer = useTemplateRef<InstanceType<typeof VAudioPlayer>>('audio-player');
const outputSpan = ref<HTMLSpanElement | null>(null);

const checkPaused = () => {
	if (audioPlayer.value?.element) {
		outputSpan.value.innerHTML = audioPlayer.value.element.paused ? 'Yes' : 'No';
	}
};
</script>
<template>
	<VAudioPlayer ref="audio-player" src="https://freetestdata.com/wp-content/uploads/2021/09/Free_Test_Data_2MB_MP3.mp3" />
	<VButton label="Is the audio paused?" appearance="outlined" @click="checkPaused" />
	&nbsp;<span ref="outputSpan"></span>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-audio-player id="audio" src="https://freetestdata.com/wp-content/uploads/2021/09/Free_Test_Data_2MB_MP3.mp3"></vwc-audio-player>

<vwc-button id="paused" label="Is the audio paused?" appearance="outlined"></vwc-button>
<span id="output"></span>

<script>
	const audio = document.getElementById('audio');
	const output = document.getElementById('output');

	document.getElementById('paused').addEventListener('click', () => {
		output.innerHTML = audio.paused ? 'Yes' : 'No';
	});
</script>
```

</vwc-tab-panel>
</vwc-tabs>

## Play and Pause Methods

The audio can be played and paused programatically using the `play()` and `pause()` methods.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { ref } from 'vue';
import { useTemplateRef } from 'vue';
import { VAudioPlayer, VButton } from '@vonage/vivid-vue';

const audioPlayer = useTemplateRef<InstanceType<typeof VAudioPlayer>>('audio-player');
const buttonLabel = ref('Play');

const togglePlayPause = () => {
	if (audioPlayer.value?.element) {
		if (audioPlayer.value.element.paused) {
			audioPlayer.value.play();
			buttonLabel.value = 'Pause';
		} else {
			audioPlayer.value.pause();
			buttonLabel.value = 'Play';
		}
	}
};
</script>
<template>
	<VAudioPlayer ref="audio-player" src="https://freetestdata.com/wp-content/uploads/2021/09/Free_Test_Data_2MB_MP3.mp3" />
	<VButton :label="buttonLabel" appearance="outlined" @click="togglePlayPause" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-audio-player id="audio" src="https://freetestdata.com/wp-content/uploads/2021/09/Free_Test_Data_2MB_MP3.mp3"></vwc-audio-player>

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

</vwc-tab-panel>
</vwc-tabs>

## Styles

### Inline Size (Width)

By default, Audio Player's `max-inline-size` is`100%`.
You can specify a different value with setting `max-inline-size` on the `vwc-audio-player.`

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 250px
<script setup lang="ts">
import { VAudioPlayer } from '@vonage/vivid-vue';
</script>
<template>
	<VAudioPlayer playback-rates="0.75, 1, 1.5" skip-by="5" class="audio-player" src="https://freetestdata.com/wp-content/uploads/2021/09/Free_Test_Data_2MB_MP3.mp3" />
</template>

<style scoped>
.audio-player {
	max-inline-size: 350px;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 250px
<vwc-audio-player playback-rates="0.75, 1, 1.5" skip-by="5" class="audio-player" src="https://freetestdata.com/wp-content/uploads/2021/09/Free_Test_Data_2MB_MP3.mp3"></vwc-audio-player>

<style>
	.audio-player {
		max-inline-size: 350px;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

## API Reference

### Properties

| Name                  | Type                           | Description                                                                                    |
| --------------------- | ------------------------------ | ---------------------------------------------------------------------------------------------- |
| **connotation**       | `accent` (default), `cta`      | Sets the color of the audio player                                                             |
| **currentTime**       | `number`                       | Get and set the current time                                                                   |
| **disabled**          | `boolean`                      | Sets the disabled state of the audio player                                                    |
| **duration**          | `number`                       | Get the duration (in seconds) of the audio                                                     |
| **notime**            | `boolean`                      | Hides the time stamp                                                                           |
| **paused**            | `boolean`                      | Returns the paused state of the audio                                                          |
| **playback-rates**    | `string`                       | Comma separated string of numbers to define playback speeds                                    |
| **skip-by**           | `0` (default), `5`, `10`, `30` | Sets the amount of seconds to skip the audio by                                                |
| **duration-fallback** | `boolean`, Default: `false`    | Enables fallback logic to fetch and decode audio buffer for duration when metadata is missing. |

### Methods

| Name      | Description      |
| --------- | ---------------- |
| **play**  | Plays the audio  |
| **pause** | Pauses the audio |
