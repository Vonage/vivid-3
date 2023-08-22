# Localization

Localization is the process of adapting a product to a specific locale or market, including translating text, formatting dates, numbers, and more.

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
|--------------------------------------------------|-------------|-------------------------------|
| English (United States)                          | `en-US`     | `@vonage/vivid/locales/en-US` |
| English (United Kingdom)                         | `en-GB`     | `@vonage/vivid/locales/en-GB` |
| Chinese (Simplified, People's Republic of China) | `zh-CN`     | `@vonage/vivid/locales/zh-CN` |
| Japanese (Japan)                                 | `ja-JP`     | `@vonage/vivid/locales/ja-JP` |
