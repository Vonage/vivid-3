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

### Playback Rates
Playback rates can be modified by passing a comma separated string of numbers to the `playback-rates` attribute. The playback rates option can be removed by passing an empty string.

```html preview
<vwc-audio-player
	src="https://download.samplelib.com/mp3/sample-6s.mp3"
	playback-rates
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

### Inline Size
TODO: rephrase :)  
I had to add a default inline-size of 350px to prevent a breaking change.
the value causes two lines of control when skip buttons or playback-rates are one.
Devs can change it by setting a new value on `vwc-audio` like 100% or a fixed width.  
Maybe we can add this as breaking change that will be added to audio as width 100%, and the css variable `--audio-player-min-inline-size` is not needed anymore :)

```html preview
<style>
.custom-width {inline-size: 100%}
</style>
<vwc-audio-player class="custom-width"
	src="https://download.samplelib.com/mp3/sample-6s.mp3"
	playback-rates
	skip-by="10"
></vwc-audio-player>
```

### Minimum inline Size

Use the `--audio-player-min-inline-size` variable to set the audio player's minimum inline size.

- Default: `200px`

```html preview
<vwc-audio-player
	src="https://download.samplelib.com/mp3/sample-6s.mp3"
	style="--audio-player-min-inline-size: 100px;"
></vwc-audio-player>
```
