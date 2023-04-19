# Fonts and Tokens

---

Vivid uses **Montserrat** and **Roboto Mono** Google fonts.

**Vonage** products should use the brand-specific **Spezia** font families.

## Spezia Variable

To use the **Spezia** webfont kit in your project, import the following file:

```js
'node_modules/@vonage/styles/fonts/spezia-variable.css';
```

To avoid FOIT (Flash Of Invisible Text), you also should preload the fonts in your HTML `<head>` section:

```html
<head>
	<link rel="preload" href="https://fonts.resources.vonage.com/fonts/v2/SpeziaCompleteVariableUprightWeb.woff2" type="font/woff2" as="font" crossorigin="anonymous" >
	<link rel="preload" href="https://fonts.resources.vonage.com/fonts/v2/SpeziaMonoCompleteVariableWeb.woff2" type="font/woff2" as="font" crossorigin="anonymous" >
</head>
```

---

## Have questions?

Still looking for answers, ask us in [#ask-vivid](https://vonage.slack.com/archives/C013F0YKH99) slack channel.
