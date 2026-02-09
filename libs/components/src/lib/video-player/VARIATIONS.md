## Default Configuration

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VVideoPlayer } from '@vonage/vivid-vue';
</script>

<template>
	<VVideoPlayer src="//d2zihajmogu5jn.cloudfront.net/sintel/master.m3u8">
		<track kind="captions" src="/assets/images/captions.en.vtt" srclang="en" label="English" default />
		<track kind="subtitles" src="/assets/images/captions.jp.vtt" srclang="jp" label="Japanese" />
		<track kind="descriptions" src="/assets/images/descriptions.en.vtt" label="English" srclang="en" />
		<track kind="chapters" src="/assets/images/chapters.en.vtt" srclang="en" />
	</VVideoPlayer>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-video-player src="//d2zihajmogu5jn.cloudfront.net/sintel/master.m3u8">
	<track kind="captions" src="/assets/images/captions.en.vtt" srclang="en" label="English" default />
	<track kind="subtitles" src="/assets/images/captions.jp.vtt" srclang="jp" label="Japanese" />
	<track kind="descriptions" src="/assets/images/descriptions.en.vtt" label="English" srclang="en" />
	<track kind="chapters" src="/assets/images/chapters.en.vtt" srclang="en" />
</vwc-video-player>
```

</vwc-tab-panel>
</vwc-tabs>

## Poster

The poster image is displayed before the video has been interacted with. The `poster` attribute accepts a url string (absolute or relative) to an image.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VVideoPlayer } from '@vonage/vivid-vue';
</script>

<template>
	<VVideoPlayer poster="https://files.fosswire.com/2010/10/sintel-shot_600.jpg">
		<source src="//d2zihajmogu5jn.cloudfront.net/sintel/master.m3u8" type="application/x-mpegURL" />
		<track kind="captions" src="/assets/images/captions.en.vtt" srclang="en" label="English" default />
		<track kind="subtitles" src="/assets/images/captions.jp.vtt" srclang="jp" label="Japanese" />
		<track kind="descriptions" src="/assets/images/descriptions.en.vtt" label="English" srclang="en" />
		<track kind="chapters" src="/assets/images/chapters.en.vtt" srclang="en" />
	</VVideoPlayer>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-video-player poster="https://files.fosswire.com/2010/10/sintel-shot_600.jpg">
	<source src="//d2zihajmogu5jn.cloudfront.net/sintel/master.m3u8" type="application/x-mpegURL" />
	<track kind="captions" src="/assets/images/captions.en.vtt" srclang="en" label="English" default />
	<track kind="subtitles" src="/assets/images/captions.jp.vtt" srclang="jp" label="Japanese" />
	<track kind="descriptions" src="/assets/images/descriptions.en.vtt" label="English" srclang="en" />
	<track kind="chapters" src="/assets/images/chapters.en.vtt" srclang="en" />
</vwc-video-player>
```

</vwc-tab-panel>
</vwc-tabs>

## Playback Rates

Playback rates can be modified by passing a comma separated string of numbers to the `playback-rates` attribute.
It defaults to `0.5, 1, 1.5, 2`.

The playback rates option can be removed by passing an empty string.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VVideoPlayer } from '@vonage/vivid-vue';
</script>

<template>
	<VVideoPlayer playback-rates="0.5, 0.75, 1, 1.25, 1.5 1.75, 2, 2.5" poster="https://files.fosswire.com/2010/10/sintel-shot_600.jpg">
		<source src="//d2zihajmogu5jn.cloudfront.net/sintel/master.m3u8" type="application/x-mpegURL" />
		<track kind="captions" src="/assets/images/captions.en.vtt" srclang="en" label="English" default />
		<track kind="subtitles" src="/assets/images/captions.jp.vtt" srclang="jp" label="Japanese" />
		<track kind="descriptions" src="/assets/images/descriptions.en.vtt" label="English" srclang="en" />
		<track kind="chapters" src="/assets/images/chapters.en.vtt" srclang="en" />
	</VVideoPlayer>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-video-player playback-rates="0.5, 0.75, 1, 1.25, 1.5 1.75, 2, 2.5" poster="https://files.fosswire.com/2010/10/sintel-shot_600.jpg">
	<source src="//d2zihajmogu5jn.cloudfront.net/sintel/master.m3u8" type="application/x-mpegURL" />
	<track kind="captions" src="/assets/images/captions.en.vtt" srclang="en" label="English" default />
	<track kind="subtitles" src="/assets/images/captions.jp.vtt" srclang="jp" label="Japanese" />
	<track kind="descriptions" src="/assets/images/descriptions.en.vtt" label="English" srclang="en" />
	<track kind="chapters" src="/assets/images/chapters.en.vtt" srclang="en" />
</vwc-video-player>
```

</vwc-tab-panel>
</vwc-tabs>

## Skip By Buttons

By default, the skip backward/forward buttons are enabled and they skip by `10` seconds.
They can be set to skip by `0`, `5`, `10` and `30` seconds using the `skip-by` attribute.
Setting them to `0` removes the buttons.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VVideoPlayer } from '@vonage/vivid-vue';
</script>

<template>
	<VVideoPlayer skip-by="30" poster="https://files.fosswire.com/2010/10/sintel-shot_600.jpg">
		<source src="//d2zihajmogu5jn.cloudfront.net/sintel/master.m3u8" type="application/x-mpegURL" />
		<track kind="captions" src="/assets/images/captions.en.vtt" srclang="en" label="English" default />
		<track kind="subtitles" src="/assets/images/captions.jp.vtt" srclang="jp" label="Japanese" />
		<track kind="descriptions" src="/assets/images/descriptions.en.vtt" label="English" srclang="en" />
		<track kind="chapters" src="/assets/images/chapters.en.vtt" srclang="en" />
	</VVideoPlayer>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-video-player skip-by="30" poster="https://files.fosswire.com/2010/10/sintel-shot_600.jpg">
	<source src="//d2zihajmogu5jn.cloudfront.net/sintel/master.m3u8" type="application/x-mpegURL" />
	<track kind="captions" src="/assets/images/captions.en.vtt" srclang="en" label="English" default />
	<track kind="subtitles" src="/assets/images/captions.jp.vtt" srclang="jp" label="Japanese" />
	<track kind="descriptions" src="/assets/images/descriptions.en.vtt" label="English" srclang="en" />
	<track kind="chapters" src="/assets/images/chapters.en.vtt" srclang="en" />
</vwc-video-player>
```

</vwc-tab-panel>
</vwc-tabs>
