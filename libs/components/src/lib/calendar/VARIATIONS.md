## Setting the Displayed Week

By default, the Calendar displays the week based on today’s date.

Use the `datetime` attribute to control which week is shown.
This attribute accepts any value supported by the [JavaScript `Date()` constructor](). In the example below, `YYYY-MM-DD` formatted strings are used.

The week displayed is the week that includes the provided date.

```html preview
<vwc-select label="Set calendar date" class="selector">
	<vwc-option value="" selected text-secondary="Today"></vwc-option>
	<vwc-option value="1985-07-03" text="3 July 1985" text-secondary="Back to the Future is released"></vwc-option>
	<vwc-option value="1955-11-05" text="5 November 1955" text-secondary="Doc Brown invents time travel"></vwc-option>
	<vwc-option value="2015-10-21" text="21 October 2015" text-secondary="Doc travels to the future"></vwc-option>
</vwc-select>

<vwc-calendar class="calendar"></vwc-calendar>

<style>
	.calendar {
		max-inline-size: 100%;
		max-block-size: 550px;
	}

	.selector {
		inline-size: 200px;
		margin-block-end: 16px;
	}
</style>

<script>
	const selector = document.querySelector('.selector');
	const calendar = document.querySelector('.calendar');
	const todayOption = document.querySelector('vwc-option[value=""]');
	setTodayOption();

	selector.addEventListener('change', (e) => calendar.setAttribute('datetime', e.detail.value));

	function formatDate(dateStr) {
		const date = new Date(dateStr);
		const day = date.getDate();
		const month = date.toLocaleString('default', { month: 'long' });
		const year = date.getFullYear();
		return `${day} ${month} ${year}`;
	}

	function setTodayOption() {
		const today = new Date().toISOString().split('T')[0];
		const todayStr = formatDate(today);
		todayOption.setAttribute('text', todayStr);
		todayOption.setAttribute('value', today);
	}
</script>
```

## Sticky Mode

The `sticky-mode` attribute controls which parts of the Calendar remain fixed when scrolling:

- `all` → keeps both time column and day header sticky (**default**)
- `header` → keeps the day headers sticky
- `column` → keeps the time column sticky
- `none` → nothing is sticky

<vwc-note connotation="information">
	<vwc-icon slot="icon" name="info-line" label="Note:"></vwc-icon>
	
	**Sticky behavior** requires the Calendar (or it's container) to have a defined `width` and `height`. Without these, scrolling won’t occur and elements won’t stick.

</vwc-note>

```html preview
<vwc-select label="Select sticky mode" class="selector">
	<vwc-option value="all" selected text="All" text-secondary="Keeps both time column and day header sticky"></vwc-option>
	<vwc-option value="header" text="Header" text-secondary="Keeps the day headers sticky"></vwc-option>
	<vwc-option value="column" text="Column" text-secondary="Keeps the time column sticky"></vwc-option>
	<vwc-option value="none" text="None" text-secondary="Nothing is sticky"></vwc-option>
</vwc-select>

<vwc-calendar class="calendar"></vwc-calendar>

<style>
	.calendar {
		max-inline-size: 100%;
		max-block-size: 250px;
	}

	.calendar[sticky-mode='none'] {
		max-inline-size: auto;
		max-block-size: auto;
	}

	.selector {
		inline-size: 200px;
		margin-block-end: 16px;
	}
</style>

<script>
	const selector = document.querySelector('.selector');
	const calendar = document.querySelector('.calendar');

	selector.addEventListener('change', (e) => calendar.setAttribute('sticky-mode', e.detail.value));
</script>
```

## Modifying the Week View's Start Day

By default, the week view will start on **Monday**. Using the `start-day` attribute this can be changed to **Sunday** as in the example below.

```html preview
<vwc-calendar class="calendar" start-day="sunday"></vwc-calendar>

<style>
	.calendar {
		max-inline-size: 100%;
		max-block-size: 550px;
	}
</style>
```

## Displaying Times in 12 Hour Format

By default times are displayed using a 24 hour format. This can be changed to a 12 hour format using the `hour12` attribute.

```html preview
<vwc-calendar class="calendar" hour12></vwc-calendar>

<style>
	.calendar {
		max-inline-size: 100%;
		max-block-size: 550px;
	}
</style>
```

## Locales

The `locales` attribute lets you specify a **locale string** or an **array of locale strings** to control the language and regional formatting of the Calendar.

- If multiple locales are provided, list them in descending order of priority, with the first being the preferred locale.
- If omitted, the Calendar defaults to the **JavaScript runtime’s locale**.
- Locale strings must conform to [BCP 47](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator) standards. Eg. `en-US` or `en-US, he-IL`.

```html preview
<vwc-calendar class="calendar" locales="he-IL" start-day="sunday" style="direction: rtl"></vwc-calendar>

<style>
	.calendar {
		max-inline-size: 100%;
		max-block-size: 550px;
		margin-bottom: 16px;
	}
</style>
```
