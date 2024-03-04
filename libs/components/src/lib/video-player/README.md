# Video Player

The video player component allows a user to play and control video content.

```js
<script type="module">import '@vonage/vivid/video-player';</script>
```

## Members

### Src

A video source can be provided to the component using the `src` attribute.

- Type: `string`
- Default: `undefined`

```html preview
<style>
	html { max-inline-size: 800px }
</style>
<vwc-video-player src="/assets/images/ed_hd.mp4"></vwc-video-player>
```

#### Source element

A video source can alternatively be provided to the component using the `source` element.

```html
<source src="../elephantsdream/ed_hd.mp4" type="video/mp4">
```

The most common and widely supported format is `mp4` (as in the exmaple below).
Multiple formats can be provided for greater browser compatibility by defining multiple `source` elements

```html
<vwc-video-player>
    <source src="../elephantsdream/ed_hd.mp4" type="video/mp4">
    <source src="../elephantsdream/ed_hd.webm" type="video/webm">
 </vwc-video-player>
```

### Poster

The poster image is displayed before the video has been interacted with. The `poster` attribute accepts a url string (absolute or relative) to an image.

- Type: `string`
- Default: `undefined`

```html preview
<style>
	html { max-inline-size: 800px }
</style>
<vwc-video-player poster="/assets/images/ed-poster.jpeg" src="/assets/images/ed_hd.mp4">
</vwc-video-player>
```

### Captions

For accessibility, it is recommended to provide captions to accompany any spoken word video. This is to help deaf and hard-of-hearing audiences and users who want to play the video on mute.

Captions can be provided using the `track` element.

```html
<track src="../elephantsdream/captions.en.vtt" kind="captions" srclang="en" label="English" default>
```

The following attributes are available on the element:
| Attribute | Description |
| --- | --- |
| `src` | url string (relative or absolute) that points to the captions `.vtt` file |
| `kind` | denotes the type of track file, in this case `captions`, but it could be `subtitles`, `description` or `chapters` (see below) |
| `srclang` | indicates what language each subtitle files' contents are in
| `label` | to be shown in the menu when selecting the captions |
| `default` |  when set, the captions will be active when the video plays |

```html preview
<style>
	html { max-inline-size: 800px }
</style>
<vwc-video-player poster="/assets/images/ed-poster.jpeg">
    <source src="/assets/images/ed_hd.mp4" type="video/mp4">
    <track kind="captions" src="/assets/ui-tests/captions.en.vtt" srclang="en" label="English" default>
</vwc-video-player>
```

### Subtitles

Subtitles provide translation of content that cannot be understood by the viewer. For example speech or text that is not English in an English language film.

Subtitles can also be provided using the `track` element.

```html
<track src="../elephantsdream/subtitles.fr.vtt" kind="subtitles" srclang="fr" label="Française">
 <track src="../elephantsdream/subtitles.de.vtt" kind="subtitles" srclang="de" label="Deutsch">
```

```html preview
<style>
	html { max-inline-size: 800px }
</style>
<vwc-video-player poster="/assets/images/ed-poster.jpeg">
    <source src="/assets/images/ed_hd.mp4" type="video/mp4">
    <track kind="subtitles" src="/assets/ui-tests/captions.en.vtt" srclang="en" label="English" default>
    <track kind="subtitles" src="/assets/ui-tests/captions.en.vtt" srclang="fr" label="French">
    <track kind="subtitles" src="/assets/ui-tests/captions.en.vttt" srclang="de" label="German">
</vwc-video-player>
```

### Audio description

To cater for blind and partially sighted users, a description track can be provided for screen readers. They are a textual description of the video content.

Descriptions can also be provided using the `track` element.

```html
<track src="../elephantsdream/description.en.vtt" kind="descriptions" srclang="en" label="English">
```

```html preview
<style>
	html { max-inline-size: 800px }
</style>
<vwc-video-player poster="/assets/images/ed-poster.jpeg">
    <source src="/assets/images/ed_hd.mp4" type="video/mp4">
    <track kind="descriptions" src="/assets/ui-tests/descriptions.en.vtt" label="English" srclang="en">
    <track kind="captions" src="//d2zihajmogu5jn.cloudfront.net/elephantsdream/captions.en.vtt" srclang="en" label="English">
</vwc-video-player>
```

### Chapters

Chapter titles are intended to be used when the user is navigating the media resource.

Chapters can also be provided using the `track` element.

```html
<track src="../elephantsdream/chapters.en.vtt" kind="chapters" srclang="en">
```

```html preview
<style>
	html { max-inline-size: 800px }
</style>
<vwc-video-player poster="/assets/images/ed-poster.jpeg">
    <source src="/assets/images/ed_hd.mp4" type="video/mp4">
    <track kind="chapters" src="/assets/ui-tests/chapters.en.vtt" srclang="en">
</vwc-video-player>
```

### Playback rates

Playback rates can be modified by passing a comma separated string of numbers to the `playback-rates` attribute.
The playback rates option can be removed by passing an empty string.

- Type: `string`
- Default: `'0.5, 1, 1.5, 2'` 

```html preview
<style>
	html { max-inline-size: 800px }
</style>
<vwc-video-player playback-rates="0.5, 0.75, 1, 1.25, 1.5 1.75, 2, 2.5" poster="/assets/images/ed-poster.jpeg">
    <source src="/assets/images/ed_hd.mp4" type="video/mp4">
</vwc-video-player>
```

### Skip by button

By default, the skip backward/forward buttons are enabled and they skip by `10` seconds.
They can be set to skip by `0`, `5`, `10` and `30` seconds using the `skip-by` attribute. 
Setting them to `0` removes the buttons.

- Type: `'0' | '5' | '10' | '30'`
- Default: `'10'`

```html preview
<style>
	html { max-inline-size: 800px }
</style>
<vwc-video-player skip-by="30" poster="/assets/images/ed-poster.jpeg">
    <source src="/assets/images/ed_hd.mp4" type="video/mp4">
</vwc-video-player>
```

### Auto play / loop

Both `autoplay` and `loop` attributes are boolean. When `autoplay` is set, the video will play automatically as soon as it loads, the sound will be muted.

When `loop` is set, the video will restart automatically when it reaches the end.

- Type: `boolean`
- Default: `false`

```html preview
<style>
	html { max-inline-size: 800px }
</style>
<script>
    function addAuto() {
        document.getElementById('video').autoplay = true;;
    }
</script>
<vwc-video-player autoplay loop>
    <source src="/assets/images/ed_hd.mp4" type="video/mp4">
</vwc-video-player>
```

## Events

<div class="table-wrapper">

| Name | Description |
| ---- | ----------- |
| `play` | Fired when the video is played |
| `pause` | Fired when the video is paused |
| `ended` | Fired when the video is ended |

</div>
