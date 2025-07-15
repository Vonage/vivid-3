## Usage

<vwc-tabs gutters="none">
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```js
import '@vonage/vivid/video-player';
```

or, if you need to use a unique prefix:

```js
import { registerVideoPlayer } from '@vonage/vivid';

registerVideoPlayer('your-prefix');
```

```html preview
<script type="module">
	import { registerVideoPlayer } from '@vonage/vivid';
	registerVideoPlayer('your-prefix');
</script>

<your-prefix-video-player
	poster="https://files.fosswire.com/2010/10/sintel-shot_600.jpg"
>
	<source
		src="//d2zihajmogu5jn.cloudfront.net/sintel/master.m3u8"
		type="application/x-mpegURL"
	/>
	<track
		kind="captions"
		src="/assets/images/captions.en.vtt"
		srclang="en"
		label="English"
		default
	/>
	<track
		kind="subtitles"
		src="/assets/images/captions.jp.vtt"
		srclang="jp"
		label="Japanese"
	/>
	<track
		kind="descriptions"
		src="/assets/images/descriptions.en.vtt"
		label="English"
		srclang="en"
	/>
	<track kind="chapters" src="/assets/images/chapters.en.vtt" srclang="en" />
</your-prefix-video-player>
```

</vwc-tab-panel>
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```html
<script setup lang="ts">
	import { VVideoPlayer } from '@vonage/vivid-vue';
</script>
<template>
	<VVideoPlayer poster="https://files.fosswire.com/2010/10/sintel-shot_600.jpg">
		<source
			src="//d2zihajmogu5jn.cloudfront.net/sintel/master.m3u8"
			type="application/x-mpegURL"
		/>
		<track
			kind="captions"
			src="/assets/images/captions.en.vtt"
			srclang="en"
			label="English"
			default
		/>
		<track
			kind="subtitles"
			src="/assets/images/captions.jp.vtt"
			srclang="jp"
			label="Japanese"
		/>
		<track
			kind="descriptions"
			src="/assets/images/descriptions.en.vtt"
			label="English"
			srclang="en"
		/>
		<track kind="chapters" src="/assets/images/chapters.en.vtt" srclang="en" />
	</VVideoPlayer>
</template>
```

</vwc-tab-panel>
</vwc-tabs>

## Src

The `src` attribute provides a video source to the component.

```html preview
<vwc-video-player src="//d2zihajmogu5jn.cloudfront.net/sintel/master.m3u8">
	<track
		kind="captions"
		src="/assets/images/captions.en.vtt"
		srclang="en"
		label="English"
		default
	/>
	<track
		kind="subtitles"
		src="/assets/images/captions.jp.vtt"
		srclang="jp"
		label="Japanese"
	/>
	<track
		kind="descriptions"
		src="/assets/images/descriptions.en.vtt"
		label="English"
		srclang="en"
	/>
	<track kind="chapters" src="/assets/images/chapters.en.vtt" srclang="en" />
</vwc-video-player>
```

### Supported Video Formats

Video player supports the most common video formats:

<div class="table-wrapper">

| Video format | Description                                                                                                                                |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **HLS**      | HTTP Live Streaming: (used in the example above) one of the most widely used video streaming protocols.                                    |
| **DASH**     | Dynamic Adaptive Streaming over HTTP                                                                                                       |
| **MP4**      | one of the most widely supported video formats and is typically used for web video playback.                                               |
| **WebM**     | open media file format designed for the web and widely supported by modern browsers.                                                       |
| **Ogg**      | a container format that can contain video streams compressed with Theora video codec and audio streams compressed with Vorbis audio codec. |

</div>

### Source element

A video source can alternatively be provided to the component using the `source` element.

```html
<source src="../elephantsdream/ed_hd.mp4" type="video/mp4" />
```

The most common and widely supported format is `mp4` (as in the exmaple below).
Multiple formats can be provided for greater browser compatibility by defining multiple `source` elements

```html
<vwc-video-player>
	<source src="../elephantsdream/ed_hd.mp4" type="video/mp4" />
	<source src="../elephantsdream/ed_hd.webm" type="video/webm" />
</vwc-video-player>
```

## Text tracks

Text tracks are a feature of HTML5 for displaying time-triggered text to the end-user. They can come in the form of Captions, Subtitles, Audio descriptions and Chapters.

Timed text requires a text file in [WebVTT format](https://developer.mozilla.org/en-US/docs/Web/API/WebVTT_API). This format defines a list of "cues" that have a start time, an end time, and text to display.

Text tracks can be provided using the `track` element.

```html
<track
	src="../elephantsdream/captions.en.vtt"
	kind="captions"
	srclang="en"
	label="English"
	default
/>
```

```html preview
<vwc-video-player
	poster="https://files.fosswire.com/2010/10/sintel-shot_600.jpg"
>
	<source
		src="//d2zihajmogu5jn.cloudfront.net/sintel/master.m3u8"
		type="application/x-mpegURL"
	/>
	<track
		kind="captions"
		src="/assets/images/captions.en.vtt"
		srclang="en"
		label="English"
		default
	/>
	<track
		kind="subtitles"
		src="/assets/images/captions.jp.vtt"
		srclang="jp"
		label="Japanese"
	/>
	<track
		kind="descriptions"
		src="/assets/images/descriptions.en.vtt"
		label="English"
		srclang="en"
	/>
	<track kind="chapters" src="/assets/images/chapters.en.vtt" srclang="en" />
</vwc-video-player>
```

### Track element API

<div class="table-wrapper">

| Attribute   | Description                                                                                                                   |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **src**     | url string (relative or absolute) that points to the captions file                                                            |
| **kind**    | denotes the type of track file, in this case `captions`, but it could be `subtitles`, `description` or `chapters` (see below) |
| **srclang** | indicates what language each subtitle files' contents are in                                                                  |
| **label**   | to be shown in the menu when selecting the captions                                                                           |
| **default** | when set, the captions will be active when the video plays                                                                    |

</div>

### Types of text track

<div class="table-wrapper">

| Track type            | Description                                                                                                                                                                                   |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Captions**          | For accessibility, it is recommended to provide captions to accompany any spoken word video. This is to help deaf and hard-of-hearing audiences and users who want to play the video on mute. |
| **Subtitles**         | Provide translation of content that cannot be understood by the viewer. For example speech or text that is not English in an English language film.                                           |
| **Audio description** | To cater for blind and partially sighted users, a description track can be provided for screen readers. They are a textual description of the video content.                                  |
| **Chapters**          | Chapters are intended to be used when the user is navigating the media resource.                                                                                                              |

</div>

## Auto play / loop

Both `autoplay` and `loop` attributes are boolean. When `autoplay` is set, the video will play automatically as soon as it loads, the sound will be muted.

When `loop` is set, the video will restart automatically when it reaches the end.

```html preview
<vwc-video-player autoplay loop>
	<source
		src="https://d2zihajmogu5jn.cloudfront.net/elephantsdream/hls/ed_hd.m3u8"
		type="application/x-mpegURL"
	/>
</vwc-video-player>
```

## API Reference

### Properties

<div class="table-wrapper">

| Name               | Type                                                                   | Description                                                 |
| ------------------ | ---------------------------------------------------------------------- | ----------------------------------------------------------- |
| **autoplay**       | `boolean`                                                              | Sets the video to start playing automatically after loading |
| **loop**           | `boolean`                                                              | Sets the video to loop                                      |
| **playback-rates** | comma separated `string` of numeric values. `0.5, 1, 1.5, 2` (default) | Sets the possible playback rates                            |
| **poster**         | `string`                                                               | Reference to poster image's source                          |
| **skip-by**        | `0`, `5`, `10` (default), `30`                                         | Sets the amount to skip                                     |
| **src**            | `string`                                                               | Reference to the video's source                             |

</div>

### Events

<div class="table-wrapper">

| Name      | Type                     | Bubbles | Composed | Description                    |
| --------- | ------------------------ | ------- | -------- | ------------------------------ |
| **play**  | `CustomEvent<undefined>` | Yes     | Yes      | Fired when the video is played |
| **pause** | `CustomEvent<undefined>` | Yes     | Yes      | Fired when the video is paused |
| **ended** | `CustomEvent<undefined>` | Yes     | Yes      | Fired when the video is ended  |

</div>
