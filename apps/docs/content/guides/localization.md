---
title: Localization
order: 3
---

# Localization

Vivid supports localization, which includes translation of visible and accessible text, as well as formatting of dates and numbers, by providing different locale files for each supported language.

The default locale of Vivid is English (United States).

## Changing the Locale

Use the `setLocale` function to change the locale:

```js
// Change the locale to Chinese (Simplified, People's Republic of China)
import zhCN from '@vonage/vivid/locales/zh-CN';
import { setLocale } from '@vonage/vivid';

setLocale(zhCN);
```

### Supported Locales

Vivid supports the following locales:

| Locale                                           | BCP-47 code | Import path                   |
| ------------------------------------------------ | ----------- | ----------------------------- |
| English (United Kingdom)                         | `en-GB`     | `@vonage/vivid/locales/en-GB` |
| English (United States)                          | `en-US`     | `@vonage/vivid/locales/en-US` |
| German (Germany)                                 | `de-DE`     | `@vonage/vivid/locales/de-DE` |
| Japanese (Japan)                                 | `ja-JP`     | `@vonage/vivid/locales/ja-JP` |
| Chinese (Simplified, People's Republic of China) | `zh-CN`     | `@vonage/vivid/locales/zh-CN` |
