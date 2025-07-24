## Default Configuration

```html preview
<vwc-audio-player
	src="https://freetestdata.com/wp-content/uploads/2021/09/Free_Test_Data_2MB_MP3.mp3"
></vwc-audio-player>
```

## Hidden Time Stamp

The `notime` attributes removes the time stamp from the rendered component.

```html preview
<vwc-audio-player
	notime
	src="https://freetestdata.com/wp-content/uploads/2021/09/Free_Test_Data_2MB_MP3.mp3"
></vwc-audio-player>
```

## Skip By

Use the `skip-by` attribute to add skip buttons to the Audio Player. The attribute accepts `30`, `10`, `5` and `0` values which refer to the number of seconds to skip. Setting the value to `0` (default) remove the buttons from the rendered component.

```html preview
<vwc-audio-player skip-by="5" src="./test-audio.mp3"></vwc-audio-player>

<vwc-audio-player
	skip-by="5"
	src="https://api.qa7.vocal-qa.com/crec/api/audio/recording/1081941695?access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoiODEyMzE3IiwidXNlcl9pZCI6IjEwMDU3Nzc0Iiwic2Vzc2lvbl9pZCI6IjViMTE4ZTYwLWM4MjktNGYyOC1hMDZlLTNmMjAyMDEwOTdhMCIsImV4cCI6MTc1Mjc0ODcyMiwiYXVkIjpbImdhdGV3YXkiXSwiYXV0aG9yaXRpZXMiOlsiVVNFUiJdLCJjbGllbnRfaWQiOiJtb2JpbGUiLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwidXNlcl9uYW1lIjoiam9lX2Njcl90ZXN0X2FhIiwicm9sZV9pZCI6IkFDQ09VTlRfQURNSU5JU1RSQVRPUiIsInN1YiI6ImpvZV9jY3JfdGVzdF9hYSIsImlhdCI6MTc1Mjc0MTUyMiwianRpIjoiYzJkMjliZTAtNmVmZi00OGJiLTljOTEtNmQ3YzhmOThkMjI5In0.2EGaMahlPg7eFgBpywlUvn-pdQ5kwE33kdXOEccHjyU"
></vwc-audio-player>

<vwc-audio-player
	skip-by="10"
	src="https://freetestdata.com/wp-content/uploads/2021/09/Free_Test_Data_2MB_MP3.mp3"
></vwc-audio-player>

<vwc-audio-player
	skip-by="30"
	src="https://freetestdata.com/wp-content/uploads/2021/09/Free_Test_Data_2MB_MP3.mp3"
></vwc-audio-player>
```

## Playback Rates

Playback rates can be modified by passing a comma separated string of numbers to the playback-rates attribute. The playback rates option can be removed by passing an empty string or not including the attribute at all.

```html preview 270px
<vwc-audio-player
	playback-rates="0.5, 1, 1.5, 2"
	src="https://freetestdata.com/wp-content/uploads/2021/09/Free_Test_Data_2MB_MP3.mp3"
>
</vwc-audio-player>
```

## Connotation

The `connotation` attribute sets the audio-player's color. In the example below it is set to `cta`.

```html preview
<vwc-audio-player
	connotation="cta"
	src="https://freetestdata.com/wp-content/uploads/2021/09/Free_Test_Data_2MB_MP3.mp3"
></vwc-audio-player>
```

## Disabled

The `disabled` attribute disables the audio-player.

```html preview
<vwc-audio-player
	disabled
	src="https://freetestdata.com/wp-content/uploads/2021/09/Free_Test_Data_2MB_MP3.mp3ßß"
></vwc-audio-player>
```
