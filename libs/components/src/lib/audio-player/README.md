# Audio Player

The `vwc-audio-player` component is used to play audio files. It is based on the [HTML5 audio element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio).

```js
<script type="module">
    import '@vonage/vivid/audio-player';
</script>
```

## Members

### Src

Use the `src` attribute to add source to the audio-player.

- Type: `string`
- Default: ``

```html preview
<vwc-audio-player src="https://download.samplelib.com/mp3/sample-6s.mp3"></vwc-audio-player>
```


### Time stamp

Use the `timestamp` attribute to add timestamp to the audio-player.

- Type: `boolean`
- Default: `false`

```html preview
<vwc-audio-player src="https://download.samplelib.com/mp3/sample-6s.mp3" timestamp></vwc-audio-player>
```

### No Seek

Use the `noseek` attribute to remove the seek from the audio-player.

- Type: `boolean`
- Default: `false`

```html preview
<vwc-audio-player src="https://download.samplelib.com/mp3/sample-6s.mp3" noseek></vwc-audio-player>
```

<!-- ### Connotation

Use the `connotation` attribute to set the audio-player's color.

- Type: `'accent'` | `'cta'`
- Default: `'accent'`

```html preview
<vwc-audio-player src="https://download.samplelib.com/mp3/sample-6s.mp3" type="audio/mpeg" connotation="cta"></vwc-audio-player>
``` -->

### Disabled

Use the `disabled` attribute to disable the audio-player.

- Type: `boolean`
- Default: `false`

```html preview
<vwc-audio-player src="https://download.samplelib.com/mp3/sample-6s.mp3" disabled></vwc-audio-player>
```