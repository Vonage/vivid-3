# Audio Player

The `vwc-audio-player` component is used to play audio files. It is based on the [HTML5 audio element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio).

```js
<script type="module">import '@vonage/vivid/audio-player';</script>
```

## Members

### Play()

Use the play method to start the audio if loaded.

```html preview
<vwc-audio-player
	src="https://download.samplelib.com/mp3/sample-6s.mp3"
></vwc-audio-player>
<vwc-button label="play"></vwc-button>
<script>
	const button = document.querySelector('vwc-button');
	const player = document.querySelector('vwc-audio-player');
	button.addEventListener('click', () => {
		player.play();
	});
</script>
```

### Pause()

Use the pause method to pause the audio if playing.

```html preview
<vwc-audio-player
	src="https://download.samplelib.com/mp3/sample-6s.mp3"
></vwc-audio-player>
<vwc-button label="play"></vwc-button>
<script>
	const button = document.querySelector('vwc-button');
	const player = document.querySelector('vwc-audio-player');
	button.addEventListener('click', () => {
		if (player.paused) {
			player.play();
			button.label = 'pause';
		} else {
			player.pause();
			button.label = 'play';
		}
	});
</script>
```

### Src

Use the `src` attribute to add source to the audio-player.

- Type: `string`
- Default: ``

```html preview
<vwc-audio-player
	src="https://download.samplelib.com/mp3/sample-6s.mp3"
></vwc-audio-player>
```

### No Time

Use the `notime` attribute to remove the time stamp from the audio-player.

- Type: `boolean`
- Default: `false`

```html preview
<vwc-audio-player
	src="https://download.samplelib.com/mp3/sample-6s.mp3"
	notime
></vwc-audio-player>
```

### Skip by

By default, the skip backward/forward buttons are not showing.
They can be set to skip by `0`, `5`, `10` and `30` seconds using the `skip-by` attribute.
Setting them to `0` removes the buttons.

- Type: `'5' | '10' | '30'`
- Default: `'0' = not showing`

```html preview
<vwc-audio-player
	src="https://download.samplelib.com/mp3/sample-6s.mp3"
	skip-by="5"
></vwc-audio-player>
```

### Connotation

Use the `connotation` attribute to set the audio-player's color.

- Type: `'accent'` | `'cta'`
- Default: `'accent'`

```html preview
<vwc-audio-player
	src="https://download.samplelib.com/mp3/sample-6s.mp3"
	connotation="cta"
></vwc-audio-player>
```

### Disabled

Use the `disabled` attribute to disable the audio-player.

- Type: `boolean`
- Default: `false`

```html preview
<vwc-audio-player
	src="https://download.samplelib.com/mp3/sample-6s.mp3"
	disabled
></vwc-audio-player>
```
### CurrentTime

Use the `currentTime` property change or get the audio player's current time.

- Type: `number`
- Default: `undefined`

### Paused (readonly)

Use the `paused` property indicates if the player is currently paused or not.

- Type: `boolean`
- Default: `true`

### Duration (readonly)

Use the `duration` property indicates the duration of the loaded audio.

- Type: `number`
- Default: `undefined`

## CSS Variables

### Max-Inline-size

By default, audio-player `max-inline-size` is set to `350px`.
You can specify a different value or set it to `initial` for full width or taking parent width.

```html preview
<style>
	.audio-player {
		max-inline-size: initial;
	}
</style>
<vwc-audio-player
	class="audio-player"
	src="https://download.samplelib.com/mp3/sample-6s.mp3"
></vwc-audio-player>
```

### Minimum inline Size

`--audio-player-min-inline-size` css-variable is deprecated (as of 05/24) and is replaced with `max-inline-size`.  
`--audio-player-min-inline-size` is still functional in the component but will be removed in a future major release.  
This will be communicated when it's removal becomes a release candidate at the end of the support period.
