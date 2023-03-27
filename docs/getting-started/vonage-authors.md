# Vonage Authors

This guide provides extra details for Vonage users when installing vivid@3.x.

If you have [vivid@2.x](mailto:vivid@2.x) installed in your project, make sure to follow the instructions for [integrating vivid@3 alongside vivid@2](#integrating-vivid@3-alongside-vivid@2).

## Prerequisites

### Font

Vivid uses _Montserrat_ and _Roboto Mono_ Google fonts.

**Vonage** products should use the brand-specific _Spezia_ font families.

To obtain the _Spezia_ webfont kit, go to this repository: [https://github.com/Vonage/spezia-webfont-kit](https://github.com/Vonage/spezia-webfont-kit)

Download the font and add it to your project.

Make sure it is added to the correct path as indicated in the CSS file (or update the path in the CSS below).

```
assets/fonts/Spezia_Web_Complete/VariableFont/Complete
```

In your CSS file, add the following code to specify & load the font family:

<vwc-note connotation="warning" headline="The @font-face declaration must be placed at the top of the CSS file."></vwc-note>

```css
@font-face {
 font-family: SpeziaCompleteVariableUpright;
 font-stretch: 50% 200%;
 font-weight: 1 1000;
 src: url('assets/fonts/Spezia_Web_Complete/VariableFont/Complete/SpeziaCompleteVariableUprightWeb.woff2') format('woff2');
}

@font-face {
 font-family: SpeziaCompleteVariableItalic;
 font-stretch: 50% 200%;
 font-weight: 1 1000;
 src: url('assets/fonts/Spezia_Web_Complete/VariableFont/Complete/SpeziaCompleteVariableItalicWeb.woff2') format('woff2');
}

@font-face {
 font-family: SpeziaMonoCompleteVariable;
 font-stretch: 50% 200%;
 font-weight: 1 1000;
 src: url('assets/fonts/Spezia_Web_Complete/VariableFont/Complete/SpeziaMonoCompleteVariableWeb.woff2') format('woff2');
}
```


Now that we have the _Spezia_ font families set up - we need to override Vivid's default typefaces by applying the following to the css:

```css
.vvd-root {
 /* override typefaces */
 --vvd-typography-headline: 500 condensed calc(var(--vvd-size-font-scale-base, 16px) * 4.125)/1.3333333333333333 SpeziaCompleteVariableUpright;
 --vvd-typography-subtitle: 500 condensed calc(var(--vvd-size-font-scale-base, 16px) * 3.25)/1.3076923076923077 SpeziaCompleteVariableUpright;
 --vvd-typography-heading-1: 500 condensed calc(var(--vvd-size-font-scale-base, 16px) * 2.5)/1.3 SpeziaCompleteVariableUpright;
 --vvd-typography-heading-2: 500 condensed calc(var(--vvd-size-font-scale-base, 16px) * 2)/1.375 SpeziaCompleteVariableUpright;
 --vvd-typography-heading-3: 500 condensed calc(var(--vvd-size-font-scale-base, 16px) * 1.625)/1.3846153846153846 SpeziaCompleteVariableUpright;
 --vvd-typography-heading-4: 500 condensed calc(var(--vvd-size-font-scale-base, 16px) * 1.25)/1.4 SpeziaCompleteVariableUpright;
 --vvd-typography-base: 400 ultra-condensed calc(var(--vvd-size-font-scale-base, 16px) * 0.875)/1.4285714285714286 SpeziaCompleteVariableUpright;
 --vvd-typography-base-bold: 600 ultra-condensed calc(var(--vvd-size-font-scale-base, 16px) * 0.875)/1.4285714285714286 SpeziaCompleteVariableUpright;
 --vvd-typography-base-code: 400 ultra-condensed calc(var(--vvd-size-font-scale-base, 16px) * 0.875)/1.4285714285714286 SpeziaMonoCompleteVariable;
 --vvd-typography-base-condensed: 400 ultra-condensed calc(var(--vvd-size-font-scale-base, 16px) * 0.75)/1.3333333333333333 SpeziaCompleteVariableUpright;
 --vvd-typography-base-condensed-bold: 600 ultra-condensed calc(var(--vvd-size-font-scale-base, 16px) * 0.75)/1.3333333333333333 SpeziaCompleteVariableUpright;
 --vvd-typography-base-extended: 400 ultra-condensed calc(var(--vvd-size-font-scale-base, 16px))/1.5 SpeziaCompleteVariableUpright;
 --vvd-typography-base-extended-bold: 600 ultra-condensed calc(var(--vvd-size-font-scale-base, 16px))/1.5 SpeziaCompleteVariableUpright;
 /* If vivid typography css core style is included in application, setting the '--vvd-size-font-scale-base'
 css variable as derivative will flexibly update font-size by the user preference */
}
```

## Have fun using vivid@3 components

### Have questions?

Still looking for answers, ask us in [#ask-vivid slack channel](https://vonage.slack.com/archives/C013F0YKH99).
