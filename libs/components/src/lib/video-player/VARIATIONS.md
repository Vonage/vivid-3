## Default Configuration

```html preview
<vwc-video-player
	src="https://d2zihajmogu5jn.cloudfront.net/big-buck-bunny/master.m3u8"
></vwc-video-player>
```

## Poster

The poster image is displayed before the video has been interacted with. The `poster` attribute accepts a url string (absolute or relative) to an image.

```html preview
<vwc-video-player
	poster="https://d2zihajmogu5jn.cloudfront.net/big-buck-bunny/bbb.png"
	src="https://d2zihajmogu5jn.cloudfront.net/big-buck-bunny/master.m3u8"
>
</vwc-video-player>
```

## Playback Rates

Playback rates can be modified by passing a comma separated string of numbers to the `playback-rates` attribute.
The playback rates option can be removed by passing an empty string.

```html preview
<vwc-video-player
	playback-rates="0.5, 0.75, 1, 1.25, 1.5 1.75, 2, 2.5"
	poster="/assets/images/steel_hi.jpg"
>
	<source
		src="https://d2zihajmogu5jn.cloudfront.net/tears-of-steel/playlist.m3u8"
		type="application/x-mpegURL"
	/>
</vwc-video-player>
```

## Skip By Buttons

By default, the skip backward/forward buttons are enabled and they skip by `10` seconds.
They can be set to skip by `0`, `5`, `10` and `30` seconds using the `skip-by` attribute.
Setting them to `0` removes the buttons.

```html preview
<vwc-video-player skip-by="30" poster="/assets/images/steel_hi.jpg">
	<source
		src="https://d2zihajmogu5jn.cloudfront.net/tears-of-steel/playlist.m3u8"
		type="application/x-mpegURL"
	/>
</vwc-video-player>
```
