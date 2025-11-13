## Default Configuration

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

## Hidden Time Stamp

The `notime` attributes removes the time stamp from the rendered component.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VAudioPlayer } from '@vonage/vivid-vue';
</script>
<template>
	<VAudioPlayer notime src="https://freetestdata.com/wp-content/uploads/2021/09/Free_Test_Data_2MB_MP3.mp3" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-audio-player notime src="https://freetestdata.com/wp-content/uploads/2021/09/Free_Test_Data_2MB_MP3.mp3"></vwc-audio-player>
```

</vwc-tab-panel>
</vwc-tabs>

## Skip By

Use the `skip-by` attribute to add skip buttons to the Audio Player. The attribute accepts `30`, `10`, `5` and `0` values which refer to the number of seconds to skip. Setting the value to `0` (default) remove the buttons from the rendered component.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VAudioPlayer } from '@vonage/vivid-vue';
</script>
<template>
	<VAudioPlayer skip-by="10" src="https://freetestdata.com/wp-content/uploads/2021/09/Free_Test_Data_2MB_MP3.mp3" />
	<VAudioPlayer skip-by="30" src="https://freetestdata.com/wp-content/uploads/2021/09/Free_Test_Data_2MB_MP3.mp3" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-audio-player skip-by="10" src="https://freetestdata.com/wp-content/uploads/2021/09/Free_Test_Data_2MB_MP3.mp3"></vwc-audio-player> <vwc-audio-player skip-by="30" src="https://freetestdata.com/wp-content/uploads/2021/09/Free_Test_Data_2MB_MP3.mp3"></vwc-audio-player>
```

</vwc-tab-panel>
</vwc-tabs>

## Playback Rates

Playback rates can be modified by passing a comma separated string of numbers to the playback-rates attribute. The playback rates option can be removed by passing an empty string or not including the attribute at all.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 270px
<script setup lang="ts">
import { VAudioPlayer } from '@vonage/vivid-vue';
</script>
<template>
	<VAudioPlayer playback-rates="0.5, 1, 1.5, 2" src="https://freetestdata.com/wp-content/uploads/2021/09/Free_Test_Data_2MB_MP3.mp3" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 270px
<vwc-audio-player playback-rates="0.5, 1, 1.5, 2" src="https://freetestdata.com/wp-content/uploads/2021/09/Free_Test_Data_2MB_MP3.mp3"></vwc-audio-player>
```

</vwc-tab-panel>
</vwc-tabs>

## Connotation

The `connotation` attribute sets the audio-player's color. In the example below it is set to `cta`.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VAudioPlayer } from '@vonage/vivid-vue';
</script>
<template>
	<VAudioPlayer connotation="cta" src="https://freetestdata.com/wp-content/uploads/2021/09/Free_Test_Data_2MB_MP3.mp3" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-audio-player connotation="cta" src="https://freetestdata.com/wp-content/uploads/2021/09/Free_Test_Data_2MB_MP3.mp3"></vwc-audio-player>
```

</vwc-tab-panel>
</vwc-tabs>

## Disabled

The `disabled` attribute disables the audio-player.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VAudioPlayer } from '@vonage/vivid-vue';
</script>
<template>
	<VAudioPlayer disabled src="https://freetestdata.com/wp-content/uploads/2021/09/Free_Test_Data_2MB_MP3.mp3" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-audio-player disabled src="https://freetestdata.com/wp-content/uploads/2021/09/Free_Test_Data_2MB_MP3.mp3"></vwc-audio-player>
```

</vwc-tab-panel>
</vwc-tabs>
