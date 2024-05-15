# Audio Player

The `vwc-audio-player` component is used to play audio files. It is based on the [HTML5 audio element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio).

```js
<script type="module">import '@vonage/vivid/audio-player';</script>
```

## Members

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

### Skip by button

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

## CSS Variables

### Inline-size

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

### Minimum inline Size **Deprecated**

Use max-inline-size to set audio-player inline-size.

Use the `--audio-player-min-inline-size` variable to set the audio player's minimum inline size.

- Default: `200px`

```html preview
<vwc-audio-player
	src="https://download.samplelib.com/mp3/sample-6s.mp3"
	style="--audio-player-min-inline-size: 100px;"
></vwc-audio-player>
```
