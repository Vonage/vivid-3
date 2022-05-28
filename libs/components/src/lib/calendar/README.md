# calendar

Represents a calendar custom element.

```js
<script type="module">
    import '@vonage/vivid/calendar';
</script>
```

```html preview
<vwc-calendar></vwc-calendar>
```

## Datetime

Use the `datetime` attribute to set date within a week of choice.

- Type: any [`Date()` constructor acceptable parameter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date#parameters)
- Default: `undefined` (will use the current date)

```html preview
<vwc-calendar datetime="2022-01-01"></vwc-calendar>
```

## Start Day

Use the `start-day` attribute (or `startDay` property) to set the first day of the week (e.g. work week starts on Monday).

- Type: `'sunday'` | `'monday'`
- Default: `undefined` (programmatically defaults to `'monday'` if not specified)

```html preview
<vwc-calendar start-day="sunday"></vwc-calendar>
```

## Locales

Use `locales` to set a locale string or array of locale strings that contain one or more language or locale tags. If you include more than one locale string, list them in descending order of priority so that the first entry is the preferred locale. If you omit this parameter, the default locale of the JavaScript runtime is used. This parameter must conform to BCP 47 standards; see the [Intl.Collator object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator) for details. e.g. `en-US` | `en-US, he-IL`

- Type: `String` | `String[]`
- Default: `undefined` (will use the current locale)

```html preview
<vwc-calendar locales="he-IL" start-day="sunday" style="direction: rtl"></vwc-calendar>
```

## Hour 12

`hour12` sets the convention of displayed time in which the day runs from midnight to midnight and is divided into 24 or 12 hours.
Unless provided, choice will be set according to local time preference (e.g. US = 12, IL = 24).

- Type: `Boolean`
- Default: `false`

```html preview
<vwc-calendar hour12></vwc-calendar>
```

## Methods

### Event Context

- Type: function
- Returns: `{ day: number, hour: number }` | `null`

Accepts event reference and returns an object containing _day_ & _hour_  if applicable.
