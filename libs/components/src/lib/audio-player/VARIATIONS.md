## Default Configuration

```html preview
<vwc-audio-player
	src="//www2.cs.uic.edu/~i101/SoundFiles/CantinaBand60.wav"
></vwc-audio-player>
```

## Hidden Time Stamp

The `notime` attributes removes the time stamp from the rendered component.

```html preview
<vwc-audio-player
	notime
	src="//www2.cs.uic.edu/~i101/SoundFiles/CantinaBand60.wav"
></vwc-audio-player>
```

## Skip By

Use the `skip-by` attribute to add skip buttons to the Audio Player. The attribute accepts `30`, `10`, `5` and `0` values which refer to the number of seconds to skip. Setting the value to `0` (default) remove the buttons from the rendered component.

```html preview
<vwc-audio-player
	skip-by="5"
	src="//www2.cs.uic.edu/~i101/SoundFiles/CantinaBand60.wav"
></vwc-audio-player>

<vwc-audio-player
	skip-by="10"
	src="//www2.cs.uic.edu/~i101/SoundFiles/CantinaBand60.wav"
></vwc-audio-player>

<vwc-audio-player
	skip-by="30"
	src="//www2.cs.uic.edu/~i101/SoundFiles/CantinaBand60.wav"
></vwc-audio-player>
```

## Playback Rates

Playback rates can be modified by passing a comma separated string of numbers to the playback-rates attribute. The playback rates option can be removed by passing an empty string or not including the attribute at all.

```html preview 270px
<vwc-audio-player
	playback-rates="0.5, 1, 1.5, 2"
	src="//www2.cs.uic.edu/~i101/SoundFiles/CantinaBand60.wav"
>
</vwc-audio-player>
```

## Connotation

The `connotation` attribute sets the audio-player's color. In the example below it is set to `cta`.

```html preview
<vwc-audio-player
	connotation="cta"
	src="//www2.cs.uic.edu/~i101/SoundFiles/CantinaBand60.wav"
></vwc-audio-player>
```

## Disabled

The `disabled` attribute disables the audio-player.

```html preview
<vwc-audio-player
	disabled
	src="//www2.cs.uic.edu/~i101/SoundFiles/CantinaBand60.wav"
></vwc-audio-player>
```
