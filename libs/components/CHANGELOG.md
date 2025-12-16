# Change Log - @vonage/vivid

This log was last generated on Thu, 26 Jan 2023 14:40:25 GMT and should not be manually modified.

<!-- Start content -->

## [5.7.0](https://github.com/Vonage/vivid-3/compare/vivid-v5.6.0...vivid-v5.7.0) (2025-12-15)


### Miscellaneous Chores

* **vivid:** Synchronize vivid versions

## [5.6.0](https://github.com/Vonage/vivid-3/compare/vivid-v5.5.0...vivid-v5.6.0) (2025-12-05)


### Features

* **components:** adjust position of the contextual-help slot (VIV-2976) ([#2601](https://github.com/Vonage/vivid-3/issues/2601)) ([fd8cf69](https://github.com/Vonage/vivid-3/commit/fd8cf69e5bdc4281c91b7a8fe79c5c569b9473ae))
* **data-grid:** ensure sort state is announced on header cell focus (VIV-2796) ([#2603](https://github.com/Vonage/vivid-3/issues/2603)) ([c13a47a](https://github.com/Vonage/vivid-3/commit/c13a47acc7ec071d4bc753a7dbb7003d1fb77716))
* **popup:** support smarter placement with shift middleware (VIV-2986) ([#2620](https://github.com/Vonage/vivid-3/issues/2620)) ([6a8a150](https://github.com/Vonage/vivid-3/commit/6a8a150b7317ed711ae23d9ca11eb88d03895f7d))


### Bug Fixes

* **icon:** icons loading twice (VIV-2901) ([#2618](https://github.com/Vonage/vivid-3/issues/2618)) ([321b4d9](https://github.com/Vonage/vivid-3/commit/321b4d92804b4a210327efd0b7dc23cef311ebff))

## [5.5.0](https://github.com/Vonage/vivid-3/compare/vivid-v5.4.0...vivid-v5.5.0) (2025-11-13)


### Features

* **color-picker, simple-color-picker:** add tooltips to swatches and buttons (VIV-2970) ([#2590](https://github.com/Vonage/vivid-3/issues/2590)) ([cdffaa4](https://github.com/Vonage/vivid-3/commit/cdffaa42513e59dc1d4b3b4d37503c34c05d3300))
* **dial-pad:** add long press on '0' button to render '+' (VIV-2876) ([#2585](https://github.com/Vonage/vivid-3/issues/2585)) ([feed143](https://github.com/Vonage/vivid-3/commit/feed14364c62c27c2685f3116ca5a70b91d041fb))


### Bug Fixes

* **color-picker, simple-color-picker:** accessibility fixes (VIV-2984) ([#2597](https://github.com/Vonage/vivid-3/issues/2597)) ([058057c](https://github.com/Vonage/vivid-3/commit/058057cb7d0de97c2d6622a733b8f24fa937a091))
* **color-picker, simple-color-picker:** add tooltips to swatches and buttons (VIV-2970) ([cdffaa4](https://github.com/Vonage/vivid-3/commit/cdffaa42513e59dc1d4b3b4d37503c34c05d3300))
* **color-picker:** accessibility fixes(VIV-2891) ([#2584](https://github.com/Vonage/vivid-3/issues/2584)) ([c97b0f8](https://github.com/Vonage/vivid-3/commit/c97b0f885fba22a62925610491286fe6ac6e1237))
* **icon:** do not cache aborted requests (VIV-2880) ([#2588](https://github.com/Vonage/vivid-3/issues/2588)) ([420a2bf](https://github.com/Vonage/vivid-3/commit/420a2bff8cd2e9d77e968b975c0725a0908be118))
* **select:** sync focus styles on options with combobox & menu in select widget (VIV-2877)  ([#2589](https://github.com/Vonage/vivid-3/issues/2589)) ([5e29acf](https://github.com/Vonage/vivid-3/commit/5e29acf781caa0aca6e501bd169ec7606da37e0f))
* **tag, tag-group:** apply accessibility suggestions (VIV-2849) ([#2573](https://github.com/Vonage/vivid-3/issues/2573)) ([7acea8e](https://github.com/Vonage/vivid-3/commit/7acea8e455152adc6bd1a32fb8cf9b05078ef9eb))

## [5.4.0](https://github.com/Vonage/vivid-3/compare/vivid-v5.3.0...vivid-v5.4.0) (2025-10-27)


### Features

* **searchable-select:** add "select all" option (VIV-2730) ([#2562](https://github.com/Vonage/vivid-3/issues/2562)) ([332f3a8](https://github.com/Vonage/vivid-3/commit/332f3a8167805a24b37cdd5785409b65c4a55d5b))


### Bug Fixes

* **deps:** update dependency ramda to ^0.32.0 ([e2da27e](https://github.com/Vonage/vivid-3/commit/e2da27e0add58a09f5e92e9562b7a2b879db3440))
* **deps:** update dependency ramda to ^0.32.0 (VIV-000) ([#2522](https://github.com/Vonage/vivid-3/issues/2522)) ([e2da27e](https://github.com/Vonage/vivid-3/commit/e2da27e0add58a09f5e92e9562b7a2b879db3440))
* **dialog:** fix issue with scrollable-body modal in Safari (VIV-2884) ([#2569](https://github.com/Vonage/vivid-3/issues/2569)) ([aacc04a](https://github.com/Vonage/vivid-3/commit/aacc04a5c2f548c4710961b2eca58dbce9877c99))
* **menu:** fix menu closing on change from non-default slots (VIV-2897) ([#2574](https://github.com/Vonage/vivid-3/issues/2574)) ([225f819](https://github.com/Vonage/vivid-3/commit/225f81981afc2c8e950d983f20c47ba8d377d654))
* **select:** fix placeholder not appearing in certain cases (VIV-2902) ([#2576](https://github.com/Vonage/vivid-3/issues/2576)) ([4c3a279](https://github.com/Vonage/vivid-3/commit/4c3a279262cf94013ad98629e20ed809de33a8cb))

## [5.3.0](https://github.com/Vonage/vivid-3/compare/vivid-v5.2.0...vivid-v5.3.0) (2025-10-16)


### Features

* **selectable-box:** adds selected background css variable (VIV-2888) ([#2552](https://github.com/Vonage/vivid-3/issues/2552)) ([e92c1c2](https://github.com/Vonage/vivid-3/commit/e92c1c2b3fb4cb1537439a0e238f4b7571af7a00))


### Bug Fixes

* **simple-color-picker:** Fix missing 'swatches' type (VIV-2873) ([#2550](https://github.com/Vonage/vivid-3/issues/2550)) ([4d636c4](https://github.com/Vonage/vivid-3/commit/4d636c4d4f817fc1d647811fc5eb3c168303dd8c))

## [5.2.0](https://github.com/Vonage/vivid-3/compare/vivid-v5.1.0...vivid-v5.2.0) (2025-09-26)


### Features

* **components:** add contextual-help slot to all form elements (VIV-2756) ([#2528](https://github.com/Vonage/vivid-3/issues/2528)) ([67a41da](https://github.com/Vonage/vivid-3/commit/67a41da2a7adcfbe84c3ac1307b508e1a007f382))
* **menu:** adds offset attribute to menu (VIV-2839) ([#2534](https://github.com/Vonage/vivid-3/issues/2534)) ([d4da333](https://github.com/Vonage/vivid-3/commit/d4da333c5826d1f4db2be48be68008273dd04c9a))


### Bug Fixes

* **audio-player:** fix audio-player controls reset after playback ends (VIV-2777)  ([#2533](https://github.com/Vonage/vivid-3/issues/2533)) ([b4c570a](https://github.com/Vonage/vivid-3/commit/b4c570a85828b620b3ffc36233d94c18ef88bdfa))
* **dial-pad:** add additional error screen reader announcement on validation (VIV-2785) ([#2536](https://github.com/Vonage/vivid-3/issues/2536)) ([0e74e98](https://github.com/Vonage/vivid-3/commit/0e74e984a2eadaf418dc10812bcb14bac133bb3a))

## [5.1.0](https://github.com/Vonage/vivid-3/compare/vivid-v5.0.0...vivid-v5.1.0) (2025-09-12)


### Features

* **components:** add contextual-help component and mixin (VIV-2755) ([#2507](https://github.com/Vonage/vivid-3/issues/2507)) ([1fa9168](https://github.com/Vonage/vivid-3/commit/1fa91680b32f1beb1468ab9e032705136e6c6346))
* **components:** prevent hover state on touchscreen devices (VIV-2778) ([#2525](https://github.com/Vonage/vivid-3/issues/2525)) ([157929d](https://github.com/Vonage/vivid-3/commit/157929db1438a45ffc4c374834bd3644d3b047f8))
* **empty-state:** icon border in empty state changed add transparency (VIV-2799) ([#2529](https://github.com/Vonage/vivid-3/issues/2529)) ([1449a78](https://github.com/Vonage/vivid-3/commit/1449a78b67efc00d40574da1e977ab008dc98587))
* icon border in empty state changed add transparenct ([1449a78](https://github.com/Vonage/vivid-3/commit/1449a78b67efc00d40574da1e977ab008dc98587))
* **option:** add `text-secondary` attribute (VIV-2747) ([#2526](https://github.com/Vonage/vivid-3/issues/2526)) ([05f0da7](https://github.com/Vonage/vivid-3/commit/05f0da79f2a2289a7106dd1e19854151c74464d5))
* **option:** add `trailing-meta` slot (VIV-2792) ([#2524](https://github.com/Vonage/vivid-3/issues/2524)) ([6948f2b](https://github.com/Vonage/vivid-3/commit/6948f2be5e71e15f19fedf60c00bad98dea5ccb7))
* **simple-color-picker:** add new component (VIV-2790) ([#2520](https://github.com/Vonage/vivid-3/issues/2520)) ([9c87b14](https://github.com/Vonage/vivid-3/commit/9c87b142b0f3383a825b8c4214d86a3f83d0fcc7))


### Bug Fixes

* **button:** accessible disabled button (VIV-2798) ([#2517](https://github.com/Vonage/vivid-3/issues/2517)) ([01583f9](https://github.com/Vonage/vivid-3/commit/01583f91add49cb093bac256fe4e1e340948b77a))
* **file-picker:** fix file validation not updating (VIV-2784) ([#2521](https://github.com/Vonage/vivid-3/issues/2521)) ([b4406ec](https://github.com/Vonage/vivid-3/commit/b4406ecc9f36e2d0521c976fab4ba159dcf8f020))
* **tabs:** fix activeid being reset (VIV-2795) ([#2514](https://github.com/Vonage/vivid-3/issues/2514)) ([246f952](https://github.com/Vonage/vivid-3/commit/246f952ede4b88bfac91b38023c8ba7f7570c51d))

## [5.0.0](https://github.com/Vonage/vivid-3/compare/vivid-v4.31.0...vivid-v5.0.0) (2025-08-27)


### ⚠ BREAKING CHANGES

* **menu:** change default value for 'trigger' attribute to 'auto' (VIV-2674) ([#2496](https://github.com/Vonage/vivid-3/issues/2496))
* **calendar:** make 'all' value as default for 'sticky-mode ' attribute (VIV-2677) ([#2497](https://github.com/Vonage/vivid-3/issues/2497))
* **components:** rename delegated ARIA attributes (VIV-2726) ([#2494](https://github.com/Vonage/vivid-3/issues/2494))
* **file-picker:** add interactive feedback (VIV-1989)  ([#2495](https://github.com/Vonage/vivid-3/issues/2495))
* **selectable-box:** remove clickable prop (VIV-2675) ([#2476](https://github.com/Vonage/vivid-3/issues/2476))

### Features

* **calendar:** make 'all' value as default for 'sticky-mode ' attribute (VIV-2677) ([#2497](https://github.com/Vonage/vivid-3/issues/2497)) ([fa07f02](https://github.com/Vonage/vivid-3/commit/fa07f0286fba79d288619257578b99620e6bc5eb))
* **components:** rename delegated ARIA attributes (VIV-2726) ([#2494](https://github.com/Vonage/vivid-3/issues/2494)) ([d7e84fb](https://github.com/Vonage/vivid-3/commit/d7e84fbf151bd7e628d5107a63d6b8828ab4fb2f))
* **file-picker:** add interactive feedback (VIV-1989)  ([#2495](https://github.com/Vonage/vivid-3/issues/2495)) ([c78d4c4](https://github.com/Vonage/vivid-3/commit/c78d4c4556c44ef76cc65f9e990192a5c6aec954))
* **menu:** change default value for 'trigger' attribute to 'auto' (VIV-2674) ([#2496](https://github.com/Vonage/vivid-3/issues/2496)) ([cc012a9](https://github.com/Vonage/vivid-3/commit/cc012a90d00a45815a6b4d4322df91edc1834530))
* **selectable-box:** remove clickable prop (VIV-2675) ([#2476](https://github.com/Vonage/vivid-3/issues/2476)) ([4f44dab](https://github.com/Vonage/vivid-3/commit/4f44dab1954b288b193d5e6fc1ebc04498158c50))

## [4.31.0](https://github.com/Vonage/vivid-3/compare/vivid-v4.30.1...vivid-v4.31.0) (2025-08-22)


### Features

* **toggletip:** adds localised aria-label to anchor element (VIV-2787) ([#2505](https://github.com/Vonage/vivid-3/issues/2505)) ([a5f8ec5](https://github.com/Vonage/vivid-3/commit/a5f8ec505ed98d49835713fe0db298d1a8fc3368))


### Bug Fixes

* **checkbox:** fix appearance when checked and indeterminate (VIV-2761) ([#2504](https://github.com/Vonage/vivid-3/issues/2504)) ([c32e91b](https://github.com/Vonage/vivid-3/commit/c32e91ba5eb1e4c230e894dd2bab21af19c5db57))

## [4.30.1](https://github.com/Vonage/vivid-3/compare/vivid-v4.30.0...vivid-v4.30.1) (2025-08-19)


### Bug Fixes

* **badge:** fix connotation type missing announcement (VIV-2780) ([#2498](https://github.com/Vonage/vivid-3/issues/2498)) ([9da1f44](https://github.com/Vonage/vivid-3/commit/9da1f44e83afe8b8a4ae0242c49904b04aa398fc))
* **date-picker, time-picker, date-time-picker:** fix presentation value not updating after invalid input (VIV-2781) ([#2499](https://github.com/Vonage/vivid-3/issues/2499)) ([f8515a3](https://github.com/Vonage/vivid-3/commit/f8515a3280af4e67c3cc8d6d87c3eaa73741e1d9))
* make remove button focusable in tag ([a780453](https://github.com/Vonage/vivid-3/commit/a7804532273a5ba13871f838b50233051e82ed1a))
* **tag:** make remove button focusable (VIV-000) ([#2481](https://github.com/Vonage/vivid-3/issues/2481)) ([a780453](https://github.com/Vonage/vivid-3/commit/a7804532273a5ba13871f838b50233051e82ed1a))

## [4.30.0](https://github.com/Vonage/vivid-3/compare/vivid-v4.29.0...vivid-v4.30.0) (2025-08-13)


### Features

* **accordion-item:** add support for 'ghost', 'ghost-light'  and 'filled' appearances (VIV-2709) ([#2473](https://github.com/Vonage/vivid-3/issues/2473)) ([c6cd73b](https://github.com/Vonage/vivid-3/commit/c6cd73b462f20873ae217ce58f44fe49c34768bd))
* **selectable-box:** add control-placement attribute (VIV-2742) ([#2489](https://github.com/Vonage/vivid-3/issues/2489)) ([52d10e9](https://github.com/Vonage/vivid-3/commit/52d10e916851f70059d47bea6f69862cf310cb79))
* **split-button:** add outlined-light appearance (VIV-2751) ([#2493](https://github.com/Vonage/vivid-3/issues/2493)) ([d5fa90b](https://github.com/Vonage/vivid-3/commit/d5fa90b19cb469a3e50f3e5bae8cc4978a8b566c))
* **tag:** add support for subtle-light appearance (VIV-2741)  ([#2468](https://github.com/Vonage/vivid-3/issues/2468)) ([24a16cd](https://github.com/Vonage/vivid-3/commit/24a16cd276481176266bc44a3ad9c3508ff59c1b))


### Bug Fixes

* **date-picker:** fix focus bug on opening calendar (VIV-2758) ([#2490](https://github.com/Vonage/vivid-3/issues/2490)) ([9fdedf8](https://github.com/Vonage/vivid-3/commit/9fdedf869cef34cbeeca86313cd977995dda5674))
* **time-picker:** fix time picker focus on button click (VIV-2759) ([#2477](https://github.com/Vonage/vivid-3/issues/2477)) ([40dc979](https://github.com/Vonage/vivid-3/commit/40dc9794ceb19d083f63fbd543411f3c78f75cce))

## [4.29.0](https://github.com/Vonage/vivid-3/compare/vivid-v4.28.0...vivid-v4.29.0) (2025-07-25)


### Features

* **data-grid:** add fixed columns attribute (VIV-2637) ([#2459](https://github.com/Vonage/vivid-3/issues/2459)) ([ddcaa8c](https://github.com/Vonage/vivid-3/commit/ddcaa8c62451e39f02bb3216d2a956a4e4ff9b4f))
* **date-picker, date-time-picker:** adjust the contrast of the selected day’s color to comply with accessibility standards (VIV-2719)  ([#2463](https://github.com/Vonage/vivid-3/issues/2463)) ([76dde1b](https://github.com/Vonage/vivid-3/commit/76dde1bc229c07c87e0059ca76e7a5e576a9ef16))
* **divider:** add appearance prop to divider (VIV-2684) ([#2466](https://github.com/Vonage/vivid-3/issues/2466)) ([3618acc](https://github.com/Vonage/vivid-3/commit/3618acc6a0c0cb079e681ac3a0f994151c3b59f5))
* **searchable-select:** add  label attribute  support for option (VIV-2735) ([#2451](https://github.com/Vonage/vivid-3/issues/2451)) ([0073b8b](https://github.com/Vonage/vivid-3/commit/0073b8bd99903a5427f790d5ec6236f4ca98d8ed))


### Bug Fixes

* **audio-player:** fix duration bar and skip controls not working correctly (VIV-2728)  ([#2445](https://github.com/Vonage/vivid-3/issues/2445)) ([c2549ed](https://github.com/Vonage/vivid-3/commit/c2549ed19cbcd379c5a67b7c67afd42091f54af5))
* **combobox:** Fix contrast accessibility issue (VIV-2731) ([#2447](https://github.com/Vonage/vivid-3/issues/2447)) ([0008705](https://github.com/Vonage/vivid-3/commit/00087058c4f81fb6a376656891e212488c1c2578))
* **data-grid:** announce sortable column header as a button (VIV-2736) ([#2449](https://github.com/Vonage/vivid-3/issues/2449)) ([8ae2c72](https://github.com/Vonage/vivid-3/commit/8ae2c7217567663d188aeced22fc68c4f384fa77))
* **date-time-picker:** input event does not not update the value on typing (VIV-2715)  ([#2433](https://github.com/Vonage/vivid-3/issues/2433)) ([77625cc](https://github.com/Vonage/vivid-3/commit/77625cce90751c0690f2c8e0f9ad3b302f2578e5))
* **divider:** apply aria attributes to the host (VIV-2737) ([#2446](https://github.com/Vonage/vivid-3/issues/2446)) ([877fa59](https://github.com/Vonage/vivid-3/commit/877fa59a7efab676ffd3932a472fa8e9197e9ed2))
* **option:** fix value not being reflected (VIV-2748) ([#2457](https://github.com/Vonage/vivid-3/issues/2457)) ([bc8442c](https://github.com/Vonage/vivid-3/commit/bc8442c5f92ce4f64638eb5bf4b31fe9e9f3ac7c))
* **searchable-select:** add CSS fallback for option-tag background (VIV-2753) ([#2465](https://github.com/Vonage/vivid-3/issues/2465)) ([2732df3](https://github.com/Vonage/vivid-3/commit/2732df318756c64c3ffbef7eafa313e67c8510ed))
* **searchable-select:** display focus indicator on list items (VIV-2732) ([#2450](https://github.com/Vonage/vivid-3/issues/2450)) ([2ed4ee5](https://github.com/Vonage/vivid-3/commit/2ed4ee5c5ab4b2db8b561abe951a42a9df3463fb))
* **tooltip:** tooltip anchor a11y (VIV-2748) ([#2456](https://github.com/Vonage/vivid-3/issues/2456)) ([8aa8b40](https://github.com/Vonage/vivid-3/commit/8aa8b40afa7e135f5d62bb1825859762e4f22961))

## [4.28.0](https://github.com/Vonage/vivid-3/compare/vivid-v4.27.0...vivid-v4.28.0) (2025-07-09)


### Features

* **menu-item:** update styles to match option component  (VIV-2685)  ([#2438](https://github.com/Vonage/vivid-3/issues/2438)) ([027e809](https://github.com/Vonage/vivid-3/commit/027e8091073ce2b0f391e38bfc87739ab452bfb5))


### Bug Fixes

* **date-time-picker:** fix accessibility issues (VIV-2692) ([#2427](https://github.com/Vonage/vivid-3/issues/2427)) ([5f284f3](https://github.com/Vonage/vivid-3/commit/5f284f33ffa249cb5a5078b63d1d6fdf658bf4b5))
* **number-field:** fix valueAsNumber missing in Vue (VIV-2748) ([#2444](https://github.com/Vonage/vivid-3/issues/2444)) ([13f005e](https://github.com/Vonage/vivid-3/commit/13f005e7c9f914251e0ec222e9e881eb3a94bc49))
* **time-picker:** display focus indicator on the list item (VIV-2733) ([#2441](https://github.com/Vonage/vivid-3/issues/2441)) ([843f19f](https://github.com/Vonage/vivid-3/commit/843f19fff4ef08c872b8a693a4ce1d489c8920f2))

## [4.27.0](https://github.com/Vonage/vivid-3/compare/vivid-v4.26.0...vivid-v4.27.0) (2025-06-26)


### Features

* **avatar:** add icon slot (VIV-2717) ([#2430](https://github.com/Vonage/vivid-3/issues/2430)) ([6983198](https://github.com/Vonage/vivid-3/commit/69831982e7c55d154059d26d04e625bc815ca0ce))
* **avatar:** support clickable options - link or button (VIV-2718) ([#2434](https://github.com/Vonage/vivid-3/issues/2434)) ([dd2115a](https://github.com/Vonage/vivid-3/commit/dd2115a98a6e95e07550d765036a89c526ac15c7))


### Bug Fixes

* **date-picker, date-range-picker, date-time-picker:** fix accessibility issues (VIV-2691) ([#2411](https://github.com/Vonage/vivid-3/issues/2411)) ([7a0e845](https://github.com/Vonage/vivid-3/commit/7a0e845e482394e6d1535c478edfa4789022020b))
* **pagination:** accessibility fixes (VIV-2695) ([#2416](https://github.com/Vonage/vivid-3/issues/2416)) ([d63c485](https://github.com/Vonage/vivid-3/commit/d63c4855ff2c39effd1c8a3fa83436c8b706fb73))
* **picker-field:** modify the clear button functionality to clear the selected value without closing the picker view (VIV-2696)  ([#2418](https://github.com/Vonage/vivid-3/issues/2418)) ([96025df](https://github.com/Vonage/vivid-3/commit/96025df08628ea7519b1a24bc9cfba188a0df14c))
* **searchable-select:** accessibility fixes (VIV-2697) ([#2422](https://github.com/Vonage/vivid-3/issues/2422)) ([28524cb](https://github.com/Vonage/vivid-3/commit/28524cb8075a7e8f55a8aa71b592b494f056b2ae))
* **select:** fix TypeError on disabled VSelect (VIV-2724) ([#2425](https://github.com/Vonage/vivid-3/issues/2425)) ([cdd4657](https://github.com/Vonage/vivid-3/commit/cdd46572d78d1117458cf4b71c3801813b73bfd9))
* **tag:** improve keyboard focus when removable (VIV-2720) ([#2429](https://github.com/Vonage/vivid-3/issues/2429)) ([375e86f](https://github.com/Vonage/vivid-3/commit/375e86f966bd6f51b80ca849710b40743ca2236a))

## [4.26.0](https://github.com/Vonage/vivid-3/compare/vivid-v4.25.0...vivid-v4.26.0) (2025-06-18)


### Features

* **accordion:** add heading and meta slots (VIV-2636) ([#2400](https://github.com/Vonage/vivid-3/issues/2400)) ([7c882de](https://github.com/Vonage/vivid-3/commit/7c882de93dcb2f5aebaf8615378da6aca3d1d45f))
* **calendar:** Set the default start-time alignment to 8 a.m. (VIV-2219) ([#2404](https://github.com/Vonage/vivid-3/issues/2404)) ([8e38721](https://github.com/Vonage/vivid-3/commit/8e387213d4018356b83eedbc63ec3e638df89e98))
* **checkbox:** make 'indeterminate' as a prop (VIV-2596) ([#2394](https://github.com/Vonage/vivid-3/issues/2394)) ([fee30af](https://github.com/Vonage/vivid-3/commit/fee30aff7e1f0e1da32f4576da89bfc0bb0e74e9))
* **dialog:** add inset variables for the non-modal dialog (VIV-2710) ([#2410](https://github.com/Vonage/vivid-3/issues/2410)) ([7f39bf1](https://github.com/Vonage/vivid-3/commit/7f39bf1a212cd220598715ba57023cad5006fcdb))
* **dialog:** add scrollable-body support to dialog (VIV-2638) ([#2414](https://github.com/Vonage/vivid-3/issues/2414)) ([715b6a5](https://github.com/Vonage/vivid-3/commit/715b6a50f0ce49d1b4334cd140bb4dc7fd39aa86))
* **time-picker, date-picker, date-range-picker:** add gap between helper-text and popup (VIV-2701) ([#2403](https://github.com/Vonage/vivid-3/issues/2403)) ([48caaed](https://github.com/Vonage/vivid-3/commit/48caaed1447fc96c610d4dcc4905101ab5f09ec5))


### Bug Fixes

* **accordion-item, nav-disclosure:** use line icon variant instead of solid (VIV-2705) ([#2406](https://github.com/Vonage/vivid-3/issues/2406)) ([fd85cab](https://github.com/Vonage/vivid-3/commit/fd85cab18d69f783ba465d26fbcb70dfc4d05654))
* **components:** Use data-vvd-component instead of role attribute (VIV-2604) ([#2393](https://github.com/Vonage/vivid-3/issues/2393)) ([9334f5f](https://github.com/Vonage/vivid-3/commit/9334f5f3ba956760756a2a389626e566d3dcf304))
* **data-grid:** fix sticky-header row property being overwritten by generate-header (VIV-2714) ([#2412](https://github.com/Vonage/vivid-3/issues/2412)) ([0368476](https://github.com/Vonage/vivid-3/commit/03684766e718ffeb79753fbbb61627dfb525e91d))
* **dialpad:** Add localized aria-label to delete/backspace button (VIV-2693) ([#2402](https://github.com/Vonage/vivid-3/issues/2402)) ([42cb3bd](https://github.com/Vonage/vivid-3/commit/42cb3bdd373c0f0bfaa9a5d6190135548302c76b))
* **number-field:** screen reader accessibility fixes (VIV-2694) ([#2405](https://github.com/Vonage/vivid-3/issues/2405)) ([72944ec](https://github.com/Vonage/vivid-3/commit/72944ec666cf03a0e31a5b636dacbe1dc07928cc))
* **pagination:** accessibility fixes (VIV-2695) ([#2416](https://github.com/Vonage/vivid-3/issues/2416)) ([d63c485](https://github.com/Vonage/vivid-3/commit/d63c4855ff2c39effd1c8a3fa83436c8b706fb73))
* **picker-field:** modify the clear button functionality to clear the selected value without closing the picker view (VIV-2696)  ([#2418](https://github.com/Vonage/vivid-3/issues/2418)) ([96025df](https://github.com/Vonage/vivid-3/commit/96025df08628ea7519b1a24bc9cfba188a0df14c))
* **searchable-select:** fix issue with tags being cut-off on smaller width (VIV-2689) ([#2401](https://github.com/Vonage/vivid-3/issues/2401)) ([a4cbd7d](https://github.com/Vonage/vivid-3/commit/a4cbd7dcfbd0d77e8b2f49ba94c05ce602a384df))
* **slider, range-slider:** remove focus transition (VIV-2690) ([#2397](https://github.com/Vonage/vivid-3/issues/2397)) ([e596b63](https://github.com/Vonage/vivid-3/commit/e596b638df15ffbf09fbbc642659ca05b03af83b))

## [4.25.0](https://github.com/Vonage/vivid-3/compare/vivid-v4.24.0...vivid-v4.25.0) (2025-06-02)


### Features

* **alert,banner:** Add accessible labels to connotation icons (VIV-2654) ([#2379](https://github.com/Vonage/vivid-3/issues/2379)) ([291d2a7](https://github.com/Vonage/vivid-3/commit/291d2a70b4e40b3ac07cb60f6aa0276649044f3d))
* **badge:** add size attribute and expanded size (VIV-2642) ([#2352](https://github.com/Vonage/vivid-3/issues/2352)) ([ec7b70d](https://github.com/Vonage/vivid-3/commit/ec7b70d09058fbf4fcde87c0d311d5b1ffa853aa))
* **card:** Clickable Card (link or button) (VIV-2586) ([#2345](https://github.com/Vonage/vivid-3/issues/2345)) ([07804ea](https://github.com/Vonage/vivid-3/commit/07804ea96014954351decce3e725d7a811090a19))
* **dial-pad:** adds focus method and autofocus property (VIV-2635)   ([#2342](https://github.com/Vonage/vivid-3/issues/2342)) ([d345a62](https://github.com/Vonage/vivid-3/commit/d345a628454b6644a4b1fcef11c70a690c667da6))
* **empty-state:** deprecate icon-decoration prop (VIV-2633) ([#2349](https://github.com/Vonage/vivid-3/issues/2349)) ([3da78bb](https://github.com/Vonage/vivid-3/commit/3da78bb64f86a1ff1c91c62445544ca188af3417))
* **icon:** adds a11y label (VIV-2647) ([#2360](https://github.com/Vonage/vivid-3/issues/2360)) ([06de87b](https://github.com/Vonage/vivid-3/commit/06de87b20cfb070c6d213e413eaa543a7d6d2a78))
* **menu-item:** replace role with control-type attribute (VIV-2602) ([#2381](https://github.com/Vonage/vivid-3/issues/2381)) ([795c34a](https://github.com/Vonage/vivid-3/commit/795c34a2426345c01c67c1a4c604bb7a289c8b19))
* **radio-group:** adds helper and error text (VIV-2398) ([#2269](https://github.com/Vonage/vivid-3/issues/2269)) ([06acbc6](https://github.com/Vonage/vivid-3/commit/06acbc639315be1347dbac4540226080a53ae7ff))


### Bug Fixes

* **alert:** announce alert's title to SR (VIV-2615) ([#2332](https://github.com/Vonage/vivid-3/issues/2332)) ([38659fb](https://github.com/Vonage/vivid-3/commit/38659fbe3f224c1260459aed9af854d7a5b4b715))
* **button:** ensure loading state is announced by screen reader (VIV-2620) ([#2338](https://github.com/Vonage/vivid-3/issues/2338)) ([340905c](https://github.com/Vonage/vivid-3/commit/340905c0b3eee1706268d01f0c34f05c0733d766))
* **button:** fix text alignment when cut off (VIV-2672) ([#2374](https://github.com/Vonage/vivid-3/issues/2374)) ([71c3845](https://github.com/Vonage/vivid-3/commit/71c384579d7b3da941aec43d206b8cf94ed81dc8))
* **checkbox:** correct error state background (VIV-2646) ([#2365](https://github.com/Vonage/vivid-3/issues/2365)) ([dd9a318](https://github.com/Vonage/vivid-3/commit/dd9a3184b47e9c1aa88c7d68098c2c420299d85c))
* **components:** fix semantic association with feedback messages and icon alt text (VIV-2630) ([#2351](https://github.com/Vonage/vivid-3/issues/2351)) ([4a2ceee](https://github.com/Vonage/vivid-3/commit/4a2ceee5de35dc9768ae703ba0bbdf5c0301d8e6))
* **data-grid-cell:** add visually-hidden information when cell is selected (VIV-2623) ([#2366](https://github.com/Vonage/vivid-3/issues/2366)) ([eb00697](https://github.com/Vonage/vivid-3/commit/eb0069784799cc91ec89563ddd9906aa980c2f7c))
* **dialog:** ensure headline is announced by screen reader (VIV-2622) ([#2347](https://github.com/Vonage/vivid-3/issues/2347)) ([f580ad7](https://github.com/Vonage/vivid-3/commit/f580ad799053a72541974aa6a23791291466e590))
* **divider:** hide divider from screen readers (VIV-2624) ([#2343](https://github.com/Vonage/vivid-3/issues/2343)) ([9a2a290](https://github.com/Vonage/vivid-3/commit/9a2a290c0b01b9fbd70025efaec092e5faf9646a))
* **menu-item:** add checkbox and radio roles and deprecate menuitemcheckbox and menuitemradio roles (VIV-2626) ([#2361](https://github.com/Vonage/vivid-3/issues/2361)) ([d58d334](https://github.com/Vonage/vivid-3/commit/d58d334cc14839e526a3cc7a79f67d9b83442e67))
* **menu-item:** revert role changes (VIV-2626) ([#2384](https://github.com/Vonage/vivid-3/issues/2384)) ([c0747de](https://github.com/Vonage/vivid-3/commit/c0747decc2f4642166b60af8e85b2b1eaf8a0ca9))
* **nav-item, nav-disclosure:** Replace 'aria-current' with synced 'current' attribute (VIV-2595) ([#2380](https://github.com/Vonage/vivid-3/issues/2380)) ([ca487d3](https://github.com/Vonage/vivid-3/commit/ca487d3f7ce3acfee05758dfd104cba4b14708ea))
* **radio-group:** add fieldset and legend instead of div and label (VIV-2628) ([#2348](https://github.com/Vonage/vivid-3/issues/2348)) ([1ff787c](https://github.com/Vonage/vivid-3/commit/1ff787c951d68767d5816409aa0e9f3f65bcdd37))
* **tab:** Replace aria-selected attribute with active (VIV-2597) ([#2373](https://github.com/Vonage/vivid-3/issues/2373)) ([22e93e6](https://github.com/Vonage/vivid-3/commit/22e93e615389675a8ddd634dd5f93d05f9d66384))
* **tab:** use button instead span in closing icon ([1f8ded4](https://github.com/Vonage/vivid-3/commit/1f8ded42982e84fd9f30bde31b79e0de5c8d54c4))
* **tab:** use button instead span in closing icon (VIV-2641) ([#2346](https://github.com/Vonage/vivid-3/issues/2346)) ([1f8ded4](https://github.com/Vonage/vivid-3/commit/1f8ded42982e84fd9f30bde31b79e0de5c8d54c4))
* **text-field, text-area:** properly announce character count with screen readers (VIV-2629) ([#2363](https://github.com/Vonage/vivid-3/issues/2363)) ([1f7df46](https://github.com/Vonage/vivid-3/commit/1f7df466df1a0193d0a2ba55d5ea4c21e023459c))
* **tooltip, toggletip:** semantic improvements (VIV-2631) ([#2337](https://github.com/Vonage/vivid-3/issues/2337)) ([46f782d](https://github.com/Vonage/vivid-3/commit/46f782d67d9514028c86a140076f35338e666b6d))
* **tree-view:** Use selected instead of aria-selected to check for selectedness of tree items (VIV-2598) ([#2367](https://github.com/Vonage/vivid-3/issues/2367)) ([382f40e](https://github.com/Vonage/vivid-3/commit/382f40efc1f8fef032be9499bfbb85e1957de4eb))

## [4.24.0](https://github.com/Vonage/vivid-3/compare/vivid-v4.23.0...vivid-v4.24.0) (2025-05-12)


### Features

* **searchable-select:** add max-items attribute (VIV-2404) ([#2316](https://github.com/Vonage/vivid-3/issues/2316)) ([e1b9a9e](https://github.com/Vonage/vivid-3/commit/e1b9a9e2700de22297565d1a5b8b3ce6be68c78c))


### Bug Fixes

* **data-grid-cell:** add button role announcement for screen readers (VIV-2606) ([#2325](https://github.com/Vonage/vivid-3/issues/2325)) ([9e3f1d4](https://github.com/Vonage/vivid-3/commit/9e3f1d46b3ab6eb59ab86fc729ee7388d5a4d4db))
* **dialog:** subtitle misalignment when non-dismissible (VIV-2612) ([#2322](https://github.com/Vonage/vivid-3/issues/2322)) ([982c3a6](https://github.com/Vonage/vivid-3/commit/982c3a6ec76fd0f3214921123b246fdb5f8f159a))
* **file-picker:** set error validity  with  rejected files (VIV-2434) ([#2309](https://github.com/Vonage/vivid-3/issues/2309)) ([25b9b8d](https://github.com/Vonage/vivid-3/commit/25b9b8dfa84639a472e0eb9adb9f05bdeeb40da4))
* **select:** announce label in multiple version when using screen reader (VIV-2613) ([#2324](https://github.com/Vonage/vivid-3/issues/2324)) ([e0ca7f9](https://github.com/Vonage/vivid-3/commit/e0ca7f9ebce543ff59f328cef7e8da024b6f73c6))
* **switch:** fix dot placement issue (VIV-2614) ([#2327](https://github.com/Vonage/vivid-3/issues/2327)) ([0f07bb8](https://github.com/Vonage/vivid-3/commit/0f07bb897635d575022d343c9e6726c748514151))
* **tabs:** scroll shadow shown incorrectly when tab is removed (VIV-2279) ([#2285](https://github.com/Vonage/vivid-3/issues/2285)) ([3630651](https://github.com/Vonage/vivid-3/commit/36306511ad9ce0fa35ba21000ceeb307cdfe3361))

## [4.23.0](https://github.com/Vonage/vivid-3/compare/vivid-v4.22.0...vivid-v4.23.0) (2025-04-30)


### Features

* **audio player:** handle Infinity duration (VIV-2569) ([#2297](https://github.com/Vonage/vivid-3/issues/2297)) ([0963431](https://github.com/Vonage/vivid-3/commit/0963431b132878b13fb87e77352cd043fff5b32c))
* **components:** forward all ARIA attributes (VIV-2432) ([#2289](https://github.com/Vonage/vivid-3/issues/2289)) ([15ca28f](https://github.com/Vonage/vivid-3/commit/15ca28f079c0eee40cde4911d51bba3db5670427))


### Bug Fixes

* **menu:** error when no menu item children (VIV-2568) ([#2302](https://github.com/Vonage/vivid-3/issues/2302)) ([05f99e3](https://github.com/Vonage/vivid-3/commit/05f99e305548efe00dfa933978e4aea0af88909d))
* **option:** updates focus state color (VIV-2570) ([#2306](https://github.com/Vonage/vivid-3/issues/2306)) ([c755068](https://github.com/Vonage/vivid-3/commit/c7550680b2f0ee43e29cee5c8247154c5cf94b56))
* **searchable-select:** fix error when parent uses transform (VIV-2417) ([#2294](https://github.com/Vonage/vivid-3/issues/2294)) ([602335d](https://github.com/Vonage/vivid-3/commit/602335d3506d26cc3641acc987261f658d7e4205))
* updates focus state color for option ([c755068](https://github.com/Vonage/vivid-3/commit/c7550680b2f0ee43e29cee5c8247154c5cf94b56))

## [4.22.0](https://github.com/Vonage/vivid-3/compare/vivid-v4.21.1...vivid-v4.22.0) (2025-04-22)


### Features

* **checkbox,radio,selectable-box:** adjustment of cta checkbox and radio unselected styles (VIV-2399) ([#2287](https://github.com/Vonage/vivid-3/issues/2287)) ([1d89a1f](https://github.com/Vonage/vivid-3/commit/1d89a1fbbc640e89cfd9dbdbaeb935a146a248cf))
* **file-picker:** add rejectedFiles property (VIV-2556) ([#2284](https://github.com/Vonage/vivid-3/issues/2284)) ([4093bce](https://github.com/Vonage/vivid-3/commit/4093bcef5b584e88aca4aaeed58f4e1c6af322cc))
* **icons:** updating the icon set to 4.6.5 (VIV-2492) ([#2280](https://github.com/Vonage/vivid-3/issues/2280)) ([982f6d7](https://github.com/Vonage/vivid-3/commit/982f6d7716a52f9118c877466222ba82512d5844))
* **searchable-select:** allow specifying tag connotation (VIV-2555) ([#2293](https://github.com/Vonage/vivid-3/issues/2293)) ([9b7c0e5](https://github.com/Vonage/vivid-3/commit/9b7c0e56dbec51310fccf40360e514c49b810557))


### Bug Fixes

* **alert:** refine the correct spacing between dismiss icon and divider according to the current design (VIV-2561) ([#2288](https://github.com/Vonage/vivid-3/issues/2288)) ([c9e27eb](https://github.com/Vonage/vivid-3/commit/c9e27ebbee7decdccf648bd140e1ad509f2aef90))
* **menu-item:** fix missing aria-checked (VIV-2553) ([#2272](https://github.com/Vonage/vivid-3/issues/2272)) ([aac6ffc](https://github.com/Vonage/vivid-3/commit/aac6ffcd6babb152613ea676951baaa59acb0e91))
* **pickers:** clear value on invalid input (VIV-2400) ([#2290](https://github.com/Vonage/vivid-3/issues/2290)) ([889f092](https://github.com/Vonage/vivid-3/commit/889f092412e13f2dad5561b3a13e0865ffc6e481))
* **searchable-select:** empty state message inherits font size (VIV-2416) ([#2292](https://github.com/Vonage/vivid-3/issues/2292)) ([f158088](https://github.com/Vonage/vivid-3/commit/f1580881f28c1f8416c7aaedd60327299c92eb2a))

## [4.21.1](https://github.com/Vonage/vivid-3/compare/vivid-v4.21.0...vivid-v4.21.1) (2025-04-10)


### Miscellaneous Chores

* **vivid:** Synchronize vivid versions

## [4.21.0](https://github.com/Vonage/vivid-3/compare/vivid-v4.20.0...vivid-v4.21.0) (2025-04-09)


### Features

* **tabs:** add a css-var for adding block-size (VIV-2195) ([#2274](https://github.com/Vonage/vivid-3/issues/2274)) ([53e48b0](https://github.com/Vonage/vivid-3/commit/53e48b03a1f78f03014515cb84c07e3b29ecfb58))

## [4.20.0](https://github.com/Vonage/vivid-3/compare/vivid-v4.19.0...vivid-v4.20.0) (2025-04-08)


### Features

* **components:** new focus style (VIV-2350) ([#2186](https://github.com/Vonage/vivid-3/issues/2186)) ([45dc79e](https://github.com/Vonage/vivid-3/commit/45dc79e71dee6ab870eab9f09656d87bc8fed433))
* **components:** use string unions for enumerated properties (VIV-2380) ([#2257](https://github.com/Vonage/vivid-3/issues/2257)) ([6646ad3](https://github.com/Vonage/vivid-3/commit/6646ad37bdfc22d8269ddbbeb258d392cacc6e02))


### Bug Fixes

* **searchable-select:** fix text selection (VIV-2415) ([#2263](https://github.com/Vonage/vivid-3/issues/2263)) ([ec27aa6](https://github.com/Vonage/vivid-3/commit/ec27aa608290185bf6b0733b0bcfee9f78bc8416))
* **select:** condensed border radius (VIV-2495) ([#2264](https://github.com/Vonage/vivid-3/issues/2264)) ([4159548](https://github.com/Vonage/vivid-3/commit/415954836514ae2c34d5e8ac7ba0b77430e4777e))
* **vue-wrappers:** fix missing indeterminate prop of checkbox (VIV-2557) ([#2275](https://github.com/Vonage/vivid-3/issues/2275)) ([a9ec182](https://github.com/Vonage/vivid-3/commit/a9ec1824bfa18f68dba0acfbd3930955dc109956))

## [4.19.0](https://github.com/Vonage/vivid-3/compare/vivid-v4.18.0...vivid-v4.19.0) (2025-03-31)


### Features

* **components:** support HTMLElementTagNameMap (VIV-2382) ([#2247](https://github.com/Vonage/vivid-3/issues/2247)) ([9f24f11](https://github.com/Vonage/vivid-3/commit/9f24f11018d944042bda3945cb9be40dad5ff349))
* **searchable-select:** support async option loading (VIV-2412) ([#2231](https://github.com/Vonage/vivid-3/issues/2231)) ([51d748e](https://github.com/Vonage/vivid-3/commit/51d748e1e0c9f76091d6003e97df4ab60d000630))
* **vue-wrappers:** improve typings (VIV-2381) ([#2240](https://github.com/Vonage/vivid-3/issues/2240)) ([10e9628](https://github.com/Vonage/vivid-3/commit/10e9628bef6fb84354fa8cfc9d1af27505eae1ba))


### Bug Fixes

* **alert:** not announced correctly in screen reader (VIV-1970) ([#2235](https://github.com/Vonage/vivid-3/issues/2235)) ([e2af9d8](https://github.com/Vonage/vivid-3/commit/e2af9d81679426a4dcc86d7af4f356b9c49f490f))
* **pagination:** fix constraining of selectedIndex (VIV-2431) ([#2236](https://github.com/Vonage/vivid-3/issues/2236)) ([18aea63](https://github.com/Vonage/vivid-3/commit/18aea639ce44640873254726afb3774638bcb900))
* **rich-text-editor:** split scss to files (VIV-2392) ([#2228](https://github.com/Vonage/vivid-3/issues/2228)) ([14f6715](https://github.com/Vonage/vivid-3/commit/14f67159aa61cce1d32cfba935a67f9c3178ccaa))

## [4.18.0](https://github.com/Vonage/vivid-3/compare/vivid-v4.17.0...vivid-v4.18.0) (2025-03-17)


### Features

* **combobox, searchable-select:** popup closes when chevron icon is clicked (VIV-2367) ([#2191](https://github.com/Vonage/vivid-3/issues/2191)) ([7070a79](https://github.com/Vonage/vivid-3/commit/7070a79d1f2daca31f2f4e2a8ba93cab3adf5691))
* **date-time-picker:** add component (VIV-2338) ([#2165](https://github.com/Vonage/vivid-3/issues/2165)) ([7c4b65d](https://github.com/Vonage/vivid-3/commit/7c4b65dc4129b87774b2b31d41cc717c27d4087f))
* **rich-text-editor:** can set selection from the component (VIV-2386) ([#2200](https://github.com/Vonage/vivid-3/issues/2200)) ([f1f04b6](https://github.com/Vonage/vivid-3/commit/f1f04b656801cf159d43caa0e7ccc77e27a19a73))


### Bug Fixes

* **combobox:** helper text color and placement (VIV-000) ([#2209](https://github.com/Vonage/vivid-3/issues/2209)) ([198da5d](https://github.com/Vonage/vivid-3/commit/198da5d576913f8404cd1dec62ee521ed0f946ba))
* **radio, radio-group:** accessible voice announcing the group and selected radio (VIV-2047)  ([#2204](https://github.com/Vonage/vivid-3/issues/2204)) ([b336218](https://github.com/Vonage/vivid-3/commit/b336218392523fd68386a9c445f751a269eb0529))

## [4.17.0](https://github.com/Vonage/vivid-3/compare/vivid-v4.16.2...vivid-v4.17.0) (2025-03-10)


### Features

* **calendar:** sticky options for header & column (VIV-2217) ([#2156](https://github.com/Vonage/vivid-3/issues/2156)) ([e5cf63b](https://github.com/Vonage/vivid-3/commit/e5cf63b1551a5f54a3df9fc387c7f6a885309e40))
* **components:** export component classes (VIV-1956) ([#2185](https://github.com/Vonage/vivid-3/issues/2185)) ([a9f8631](https://github.com/Vonage/vivid-3/commit/a9f86318ac7e0c836a298efb27151e0f79e9f592))
* **components:** expose version number (VIV-000) ([#2192](https://github.com/Vonage/vivid-3/issues/2192)) ([49d8c23](https://github.com/Vonage/vivid-3/commit/49d8c2386c52b890374486374ec95cfdd9fa428c))
* **rich-text-editor:** basic visual interface (VIV-2135) ([#2196](https://github.com/Vonage/vivid-3/issues/2196)) ([c922bbb](https://github.com/Vonage/vivid-3/commit/c922bbbeac16451f4729f3246c4bb866f2b437e7))
* **rich-text-editor:** consumer can now fetch the selection via the selection interface (VIV-2386) ([#2197](https://github.com/Vonage/vivid-3/issues/2197)) ([7f755c6](https://github.com/Vonage/vivid-3/commit/7f755c638f3fc30c92e759b2f0c37201cd8fb248))
* **rich-text-editor:** ProseMirrorFacade consumer can now set selection (VIV-2386) ([#2199](https://github.com/Vonage/vivid-3/issues/2199)) ([6a73faa](https://github.com/Vonage/vivid-3/commit/6a73faa19aa587e1f226283f639dae3a83ad772c))
* **rich-text-editor:** value property and attribute (VIV-2378) ([#2183](https://github.com/Vonage/vivid-3/issues/2183)) ([123baf8](https://github.com/Vonage/vivid-3/commit/123baf8cf25e1dea3c7c9f0da2dc9f199874e52d))


### Bug Fixes

* **menu-item:** handle menu-item getting checked synchronously (VIV-2352) ([#2164](https://github.com/Vonage/vivid-3/issues/2164)) ([f9328d1](https://github.com/Vonage/vivid-3/commit/f9328d1d6b8342626e5b8bf199d3396180991833))
* **menu:** fix scrolling to top on first open (VIV-2357) ([#2195](https://github.com/Vonage/vivid-3/issues/2195)) ([6885eec](https://github.com/Vonage/vivid-3/commit/6885eecd7eb727da40cb502877df99e21785631a))
* **searchable-select:** fix component being autofocused in Chrome (VIV-2337) ([#2180](https://github.com/Vonage/vivid-3/issues/2180)) ([366baef](https://github.com/Vonage/vivid-3/commit/366baef49a721be0f4fe8ca1ca4fd4fe55287937))

## [4.16.2](https://github.com/Vonage/vivid-3/compare/vivid-v4.16.1...vivid-v4.16.2) (2025-02-20)


### Bug Fixes

* **searchable-select:** fixed-dropdown menu layout issue (VIV-2291) ([#2149](https://github.com/Vonage/vivid-3/issues/2149)) ([2f85b87](https://github.com/Vonage/vivid-3/commit/2f85b87aa191a71df5d761a6338cd58263672d3f))

## [4.16.1](https://github.com/Vonage/vivid-3/compare/vivid-v4.16.0...vivid-v4.16.1) (2025-02-18)


### Bug Fixes

* **file-picker:** set aria-label on base (VIV-2326) ([#2132](https://github.com/Vonage/vivid-3/issues/2132)) ([21e923a](https://github.com/Vonage/vivid-3/commit/21e923a61ab297df63270f237c883277c27be7a4))

## [4.16.0](https://github.com/Vonage/vivid-3/compare/vivid-v4.15.0...vivid-v4.16.0) (2025-02-14)


### Bug Fixes

* **slider, range-slider:** handle zero step (VIV-2271) ([#2134](https://github.com/Vonage/vivid-3/issues/2134)) ([6650690](https://github.com/Vonage/vivid-3/commit/6650690b09bea10567ccfcb58c84948f7d7f69a4))

## [4.15.0](https://github.com/Vonage/vivid-3/compare/vivid-v4.14.4...vivid-v4.15.0) (2025-02-13)


### Features

* **combobox:** helper, success & error text (VIV-2268) ([#2127](https://github.com/Vonage/vivid-3/issues/2127)) ([faa0c13](https://github.com/Vonage/vivid-3/commit/faa0c13a71d96098abf8fda554313cc69ae06e93))


### Bug Fixes

* button type defaults to submit when a wrong type is passed ([4e890b5](https://github.com/Vonage/vivid-3/commit/4e890b5468a3d2b49c1323524af2d9b5af3ffa70))
* **button:** type defaults to submit when invalid type is passed (VIV-2297) ([#2126](https://github.com/Vonage/vivid-3/issues/2126)) ([4e890b5](https://github.com/Vonage/vivid-3/commit/4e890b5468a3d2b49c1323524af2d9b5af3ffa70))
* **tabs:** fix connotation not updating when tab is added (VIV-2334) ([#2136](https://github.com/Vonage/vivid-3/issues/2136)) ([df47e5f](https://github.com/Vonage/vivid-3/commit/df47e5f61dbfc95da1eaf859ee799ca69c88e420))

## [4.14.4](https://github.com/Vonage/vivid-3/compare/vivid-v4.14.3...vivid-v4.14.4) (2025-02-04)


### Bug Fixes

* **icon:** fix missing icon type (VIV-2303) ([#2119](https://github.com/Vonage/vivid-3/issues/2119)) ([f54a197](https://github.com/Vonage/vivid-3/commit/f54a197ce4c186fb27bb990e722d9d450010e675))

## [4.14.3](https://github.com/Vonage/vivid-3/compare/vivid-v4.14.2...vivid-v4.14.3) (2025-02-04)


### Bug Fixes

* **audio-player:** change slider knob design- visible on hover/focus only (VIV-1990) ([#2090](https://github.com/Vonage/vivid-3/issues/2090)) ([b1b19c4](https://github.com/Vonage/vivid-3/commit/b1b19c4395c8a4190919cbe1328bd43fb2fb4258))
* **button:** add default type - submit, same as native (VIV-2281) ([#2111](https://github.com/Vonage/vivid-3/issues/2111)) ([7a15709](https://github.com/Vonage/vivid-3/commit/7a1570953bec1d5ca9f028e738145fe8e4ae3145))
* **combobox:** icon attr, icon slot and meta slot (VIV-2268) ([#2099](https://github.com/Vonage/vivid-3/issues/2099)) ([642ed59](https://github.com/Vonage/vivid-3/commit/642ed599881f621786010fd9bab02c6f1aa7310d))
* **combobox:** shape and scale (VIV-2268) ([#2095](https://github.com/Vonage/vivid-3/issues/2095)) ([de9c900](https://github.com/Vonage/vivid-3/commit/de9c9003543661a0f4cd71488516d29d0d45a88c))
* **file-picker:** change uploaded file error message (VIV-2284) ([#2106](https://github.com/Vonage/vivid-3/issues/2106)) ([551659b](https://github.com/Vonage/vivid-3/commit/551659b0bbdfaa335326372b3776f4f853a66cb5))
* **switch:** aria-label is correctly handled (VIV-2292) ([#2101](https://github.com/Vonage/vivid-3/issues/2101)) ([9062387](https://github.com/Vonage/vivid-3/commit/90623878ecc767249034b94abd407760d84b2dc6))

## [4.14.2](https://github.com/Vonage/vivid-3/compare/vivid-v4.14.1...vivid-v4.14.2) (2025-01-28)


### Bug Fixes

* **data-grid:** fix error on createElement (VIV-2289) ([#2094](https://github.com/Vonage/vivid-3/issues/2094)) ([4b17c6c](https://github.com/Vonage/vivid-3/commit/4b17c6c65ccb9ef1d53fd5aeec6569dc52b5466a))
* **divider:** orientation attribute issue (VIV-2290) ([#2098](https://github.com/Vonage/vivid-3/issues/2098)) ([32a3df2](https://github.com/Vonage/vivid-3/commit/32a3df23b276d18eed3beb0134ae7e324d6f4c83))

## [4.14.1](https://github.com/Vonage/vivid-3/compare/vivid-v4.14.0...vivid-v4.14.1) (2025-01-22)


### Bug Fixes

* **combobox:** suppresses browser generated autocomplete on input (VIV-2273) ([#2086](https://github.com/Vonage/vivid-3/issues/2086)) ([6eda008](https://github.com/Vonage/vivid-3/commit/6eda008d3f158650ee39cb9364baa25fb1dd9282))
* **dialog:** prevent scroll to top when opened as Modal (VIV-2248) ([#2069](https://github.com/Vonage/vivid-3/issues/2069)) ([8543e65](https://github.com/Vonage/vivid-3/commit/8543e658958ee4ecfc4c573dab938603295b4285))
* **layout:** column basis medium and large in mobile (VIV-2049) ([#2065](https://github.com/Vonage/vivid-3/issues/2065)) ([55801dc](https://github.com/Vonage/vivid-3/commit/55801dcc2e5d5ed029aa5bde35c13974b0c2dfb8))
* **menu:** add default value to inline-size in small screens (VIV-2006) ([#2078](https://github.com/Vonage/vivid-3/issues/2078)) ([a9e8481](https://github.com/Vonage/vivid-3/commit/a9e84814498db5c75f644d0c5086275145cbba64))
* **radio:** radio required validation sync with spec (VIV-2265) ([#2070](https://github.com/Vonage/vivid-3/issues/2070)) ([5fb9b52](https://github.com/Vonage/vivid-3/commit/5fb9b5294dc6d4bd4f6586daece53cbde5f2df07))
* **tabs:** shadow does not appear when removing tabs and last tab is active (VIV-2278) ([#2075](https://github.com/Vonage/vivid-3/issues/2075)) ([8b7e27c](https://github.com/Vonage/vivid-3/commit/8b7e27cb6d34ac90e4d2cd95f9a3fd94a81c7f90))
* **video-player:** control panel design fixes (VIV-2246, VIV-2275) ([#2074](https://github.com/Vonage/vivid-3/issues/2074)) ([f031ef4](https://github.com/Vonage/vivid-3/commit/f031ef46f0083a689c8d55be35985dc1c3a2dd1c))
* **vue-wrappers:** fix type definitions (VIV-2274) ([#2088](https://github.com/Vonage/vivid-3/issues/2088)) ([538f16c](https://github.com/Vonage/vivid-3/commit/538f16cae1ee9da65198605729dcf283ea35fe23))

## [4.14.0](https://github.com/Vonage/vivid-3/compare/vivid-v4.13.0...vivid-v4.14.0) (2024-12-18)


### Features

* **file-picker:** add styled scrollbar & fix files-list height (VIV-2236) ([#2029](https://github.com/Vonage/vivid-3/issues/2029)) ([ee96006](https://github.com/Vonage/vivid-3/commit/ee960063e8bcf8755cfe872e124cf80b70a3de3f))


### Bug Fixes

* **button:** remove class icon-only with drop-down indicator (VIV-2240) ([#2050](https://github.com/Vonage/vivid-3/issues/2050)) ([60cf096](https://github.com/Vonage/vivid-3/commit/60cf0968968511f13dfcb80d66c97b394672ddd1))

## [4.13.0](https://github.com/Vonage/vivid-3/compare/vivid-v4.12.1...vivid-v4.13.0) (2024-12-02)


### Features

* **components:** add styled scrollbar (VIV-2214) ([#2028](https://github.com/Vonage/vivid-3/issues/2028)) ([de5f2ee](https://github.com/Vonage/vivid-3/commit/de5f2eeda8f9e0bd7700eb75f43b5434f72b786c))
* **file-picker:** custom internal error messages (VIV-1998) ([#2030](https://github.com/Vonage/vivid-3/issues/2030)) ([c1ac9a2](https://github.com/Vonage/vivid-3/commit/c1ac9a2404a3d760cca18113c7ebd8db98318a02))
* **menu:** move focus into menu on open (VIV-2196) ([#2033](https://github.com/Vonage/vivid-3/issues/2033)) ([74134fd](https://github.com/Vonage/vivid-3/commit/74134fd47d455a5e2869bde68122e8ff947c3fd2))
* **tabs:** add tabs-layout (VIV-2197) ([#2021](https://github.com/Vonage/vivid-3/issues/2021)) ([d46cc8d](https://github.com/Vonage/vivid-3/commit/d46cc8dbc7cf837a8f46ff174d191c0b85802aa1))


### Bug Fixes

* **button:** text-align when drop-down indicator and ellipsis (VIV-2244)  ([#2034](https://github.com/Vonage/vivid-3/issues/2034)) ([6660782](https://github.com/Vonage/vivid-3/commit/66607825e9b970305998a0f28c064a1a0ee8a65d))
* **popup:** fix miscalculated position in certain cases (VIV-000) ([#2022](https://github.com/Vonage/vivid-3/issues/2022)) ([321436b](https://github.com/Vonage/vivid-3/commit/321436b3d8907e96eb7be96a0c3b8d4cc43f98c0))
* **vue-wrappers:** fix type of tabs gutters (VIV-000) ([#2024](https://github.com/Vonage/vivid-3/issues/2024)) ([67ddf86](https://github.com/Vonage/vivid-3/commit/67ddf866665fd6c6a73b47f919792b91316ba007))

## [4.12.1](https://github.com/Vonage/vivid-3/compare/vivid-v4.12.0...vivid-v4.12.1) (2024-11-20)


### Bug Fixes

* **audio-player:** change color in disable state (VIV-2221) ([#2011](https://github.com/Vonage/vivid-3/issues/2011)) ([10c1f1c](https://github.com/Vonage/vivid-3/commit/10c1f1c4714e5b287e5f8eabcd517538b417e594))
* **searchable-select:** open when clicked (VIV-2206) ([#2015](https://github.com/Vonage/vivid-3/issues/2015)) ([91fdee9](https://github.com/Vonage/vivid-3/commit/91fdee93fcd24295419cc60f7df840074e4a35bb))
* **time-picker, date-picker, date-range-picker:** update formatted value when format changes (VIV-2209) ([#2005](https://github.com/Vonage/vivid-3/issues/2005)) ([ed94617](https://github.com/Vonage/vivid-3/commit/ed94617abaeadcc50033e55aef144875ddbcfb38))
* **video-player:** align menu style it menu component (VIV-2222) ([#2012](https://github.com/Vonage/vivid-3/issues/2012)) ([e419e06](https://github.com/Vonage/vivid-3/commit/e419e0641676d95beef5a8018a2861c0bdf903b0))

## [4.12.0](https://github.com/Vonage/vivid-3/compare/vivid-v4.11.0...vivid-v4.12.0) (2024-11-14)


### Features

* **popup:** add popover attribute when strategy is fixed (VIV-2181) ([#1993](https://github.com/Vonage/vivid-3/issues/1993)) ([c54fc7a](https://github.com/Vonage/vivid-3/commit/c54fc7aeaddec7269e5db6ead84d4e9fd8c453ee))


### Bug Fixes

* **button:** fix button typings (VIV-000) ([#2001](https://github.com/Vonage/vivid-3/issues/2001)) ([2495865](https://github.com/Vonage/vivid-3/commit/24958659afe40d83cd9a6deabff8323015bb4fdf))

## [4.11.0](https://github.com/Vonage/vivid-3/compare/vivid-v4.10.0...vivid-v4.11.0) (2024-11-13)


### Features

* **appearance, badge:** add subtle-light to badge (VIV-1992) ([#1954](https://github.com/Vonage/vivid-3/issues/1954)) ([ffcab5f](https://github.com/Vonage/vivid-3/commit/ffcab5f4e37522193d408fd1524220ee1315bb72))
* **file-picker:** add single file mode (VIV-1988) ([#1974](https://github.com/Vonage/vivid-3/issues/1974)) ([352694f](https://github.com/Vonage/vivid-3/commit/352694f14ff2d6d499f783a8a34c5d9551a96c18))
* **file-picker:** adjust styles for better user interaction (VIV-1997) ([#1980](https://github.com/Vonage/vivid-3/issues/1980)) ([f080334](https://github.com/Vonage/vivid-3/commit/f0803340def2ff97f1bcdc953e5afcc79c892a12))
* **file-picker:** support clearing files (VIV-1995) ([#1983](https://github.com/Vonage/vivid-3/issues/1983)) ([94d6f49](https://github.com/Vonage/vivid-3/commit/94d6f49ed4d60d8e1c3b168bdb6608e3aceda5fb))
* **tabs:** support action-items slot (VIV-2031) ([#1960](https://github.com/Vonage/vivid-3/issues/1960)) ([7058fd1](https://github.com/Vonage/vivid-3/commit/7058fd1b79452965c8dcabd6f03e2990f4edf433))


### Bug Fixes

* **button:** adds announcement connotation to button types (VIV-2203) ([#1970](https://github.com/Vonage/vivid-3/issues/1970)) ([b5854bf](https://github.com/Vonage/vivid-3/commit/b5854bf1848638344afb17ee31f0b417b2458581))
* **checkbox:** fix indeterminate setting checked (VIV-000) ([#1998](https://github.com/Vonage/vivid-3/issues/1998)) ([800f1fe](https://github.com/Vonage/vivid-3/commit/800f1fe22381d314371693f60b53167ddd3305ff))

## [4.10.0](https://github.com/Vonage/vivid-3/compare/vivid-v4.9.0...vivid-v4.10.0) (2024-10-23)


### Features

* **button:** content align to start when drop-down indicator is set (VIV-2200) ([#1962](https://github.com/Vonage/vivid-3/issues/1962)) ([b1c3a11](https://github.com/Vonage/vivid-3/commit/b1c3a11ffc4d95651601cabfde61e680e14b3d36))
* **dialog:** add `no-dismiss-on-esc`, `no-dismiss-button` and `non-dismissible` members (VIV-1907) ([#1871](https://github.com/Vonage/vivid-3/issues/1871)) ([af258af](https://github.com/Vonage/vivid-3/commit/af258af36f7ed8bff5112d3f462da6386024ddf5))


### Bug Fixes

* **audio-player:** change menu position-strategy to absolute (VIV-2192) ([#1945](https://github.com/Vonage/vivid-3/issues/1945)) ([3a6f054](https://github.com/Vonage/vivid-3/commit/3a6f0543795ef30ccf70287e098bb55b25b71c81))
* **checkbox:** aria-checked now properly conveys and controls checkbox state (VIV-1598) ([#1956](https://github.com/Vonage/vivid-3/issues/1956)) ([79a13b1](https://github.com/Vonage/vivid-3/commit/79a13b1bf3778a54edd983f4c156b5444d78708d))
* **dial-pad:** prevent focus loss after removal of delete button (VIV-2126) ([#1912](https://github.com/Vonage/vivid-3/issues/1912)) ([fbc115e](https://github.com/Vonage/vivid-3/commit/fbc115e8f28c1c2da37d039593459a33301214f2))
* **icon:** cancel outstanding fetch when changing icon name (VIV-2186) ([#1959](https://github.com/Vonage/vivid-3/issues/1959)) ([3d2900c](https://github.com/Vonage/vivid-3/commit/3d2900cfd0fe9ceec2323608645e8ec9627f09ef))
* **icon:** fix missing announcement in connotation type (VIV-000) ([#1951](https://github.com/Vonage/vivid-3/issues/1951)) ([436e606](https://github.com/Vonage/vivid-3/commit/436e6069fa1a2c984abd0bebbcff3c23164d3b2c))
* **menu-item:** remove border-radius from focus state (VIV-2160) ([#1957](https://github.com/Vonage/vivid-3/issues/1957)) ([570f635](https://github.com/Vonage/vivid-3/commit/570f635f73a4ba5beed8f3218bf42d13eac2696f))
* **text-field:** reflects inputmode onto input element (VIV-000) ([#1947](https://github.com/Vonage/vivid-3/issues/1947)) ([99e360e](https://github.com/Vonage/vivid-3/commit/99e360eea165d7253b224525ec7f064e5f2404fd))

## [4.9.0](https://github.com/Vonage/vivid-3/compare/vivid-v4.8.0...vivid-v4.9.0) (2024-10-10)


### Features

* **dialog, side-drawer:** add cancel event (VIV-1899) ([#1869](https://github.com/Vonage/vivid-3/issues/1869)) ([dde379c](https://github.com/Vonage/vivid-3/commit/dde379c23fd0d5473b5839d32dc04b34c19392af))

## [4.8.0](https://github.com/Vonage/vivid-3/compare/vivid-v4.7.0...vivid-v4.8.0) (2024-10-09)


### Features

* **select:** match option scale when condensed is set (VIV-2067) ([#1938](https://github.com/Vonage/vivid-3/issues/1938)) ([6836184](https://github.com/Vonage/vivid-3/commit/6836184a8ca1dd1489fbd74eedbd2689626c4e10))


### Bug Fixes

* **avatar, button, split-button:** change outline color in appearance outlined (VIV-2009) ([#1924](https://github.com/Vonage/vivid-3/issues/1924)) ([362a592](https://github.com/Vonage/vivid-3/commit/362a5928a3f2a258b7572b4619e9366048c88e57))
* **data-grid:** set back inline-size to cell slot unless its header with sort (VIV-2189) ([#1941](https://github.com/Vonage/vivid-3/issues/1941)) ([5e600d0](https://github.com/Vonage/vivid-3/commit/5e600d018f28d1e0ca5b0215dfc3b0b4458c621f))

## [4.7.0](https://github.com/Vonage/vivid-3/compare/vivid-v4.6.0...vivid-v4.7.0) (2024-10-07)


### Features

* **searchable-select:** component accessibility (VIV-2127) ([#1927](https://github.com/Vonage/vivid-3/issues/1927)) ([5b85539](https://github.com/Vonage/vivid-3/commit/5b85539d7c08aa7be4fe8301c577f1946831bcee))
* **searchable-select:** update tag appearance (VIV-2161) ([#1928](https://github.com/Vonage/vivid-3/issues/1928)) ([6bf7236](https://github.com/Vonage/vivid-3/commit/6bf7236c11e54e77166b0ee26439fac8fd7b5cba))


### Bug Fixes

* **searchable-select:** fix error when attempting to move focus to tag counter (VIV-2176) ([#1931](https://github.com/Vonage/vivid-3/issues/1931)) ([47b4580](https://github.com/Vonage/vivid-3/commit/47b45805d678caa1ca1eaf82ff8ad02140a5a79a))

## [4.6.0](https://github.com/Vonage/vivid-3/compare/vivid-v4.5.0...vivid-v4.6.0) (2024-10-03)


### Features

* **menu:** add position-strategy to allow positioning menu absolute rather then fixed (VIV-2135) ([#1918](https://github.com/Vonage/vivid-3/issues/1918)) ([55d2b87](https://github.com/Vonage/vivid-3/commit/55d2b8729e486b1487a7d45b69d57ed608d9eca0))
* **number-field:** scale condensed (VIV-1835) ([#1906](https://github.com/Vonage/vivid-3/issues/1906)) ([fc81c6e](https://github.com/Vonage/vivid-3/commit/fc81c6e091bac87586363a3e6ddc1512bc5c4604))
* **searchable-select:** add component (VIV-1793) ([#1882](https://github.com/Vonage/vivid-3/issues/1882)) ([c352df7](https://github.com/Vonage/vivid-3/commit/c352df7eb365071de7a4dec89d802cf2e93a4197))
* **searchable-select:** highlight matched search text (VIV-2045) ([#1914](https://github.com/Vonage/vivid-3/issues/1914)) ([d3353b3](https://github.com/Vonage/vivid-3/commit/d3353b36c3bfef36316aae882c5a5e1652625aea))
* **searchable-select:** scroll to highlighted option (VIV-2162) ([#1925](https://github.com/Vonage/vivid-3/issues/1925)) ([aac1b9c](https://github.com/Vonage/vivid-3/commit/aac1b9ca3f859988d1a2df2fc94998f7b14fbe5e))
* **searchable-select:** support form association (VIV-2046) ([#1919](https://github.com/Vonage/vivid-3/issues/1919)) ([750a20e](https://github.com/Vonage/vivid-3/commit/750a20e3eb6bd456411e68c6d2fce04c2468bdf8))
* **searchable-select:** support tag icons (VIV-2044) ([#1917](https://github.com/Vonage/vivid-3/issues/1917)) ([f8d5f25](https://github.com/Vonage/vivid-3/commit/f8d5f25ef62746bf7d021b44305a525b3ac0a513))
* **select:** add scale attribute with condensed (VIV-1836) ([#1901](https://github.com/Vonage/vivid-3/issues/1901)) ([0138a54](https://github.com/Vonage/vivid-3/commit/0138a547688c98e5acd85efcca3353c93400f1ec))
* **tab:** adds closable attribute and close event (VIV-2030) ([#1915](https://github.com/Vonage/vivid-3/issues/1915)) ([1249285](https://github.com/Vonage/vivid-3/commit/1249285de696f0856cdb36a4a85352b91a08fc87))
* **tabs:** export tab-panel as part (VIV-2004) ([#1903](https://github.com/Vonage/vivid-3/issues/1903)) ([d86cf91](https://github.com/Vonage/vivid-3/commit/d86cf917bcb753d8de710dce491c92adfbee9fa2))
* **text-field:** add scale attribute with condensed (VIV-1813) ([#1899](https://github.com/Vonage/vivid-3/issues/1899)) ([cc373cd](https://github.com/Vonage/vivid-3/commit/cc373cd823f0bde4d44ee74ee706282809f1c35e))


### Bug Fixes

* **dial-pad:** action-slot alignment (VIV-000) ([#1922](https://github.com/Vonage/vivid-3/issues/1922)) ([6f90b07](https://github.com/Vonage/vivid-3/commit/6f90b07a1d9874809c510982d54abb0dc81a89ae))
* **dial-pad:** fix input, blur, change and focus events leak (VIV-2065) ([#1911](https://github.com/Vonage/vivid-3/issues/1911)) ([5dce670](https://github.com/Vonage/vivid-3/commit/5dce670b71b28fc678ee395d3889bef22b1c4c11))
* **selectable box:** screen-reader accessibility when box is clickable (VIV-000) ([#1907](https://github.com/Vonage/vivid-3/issues/1907)) ([512cc7c](https://github.com/Vonage/vivid-3/commit/512cc7ca395d7bebe6a246345ac75f8d379c0289))

## [4.5.0](https://github.com/Vonage/vivid-3/compare/vivid-v4.4.0...vivid-v4.5.0) (2024-09-04)


### Features

* **components:** support tree shaking (VIV-1672) ([#1875](https://github.com/Vonage/vivid-3/issues/1875)) ([0aa396c](https://github.com/Vonage/vivid-3/commit/0aa396c86536ac2e27429163a45aa2293c454c88))
* **data-grid:** position grid sort icon near text (VIV-1958) ([#1884](https://github.com/Vonage/vivid-3/issues/1884)) ([b16ce63](https://github.com/Vonage/vivid-3/commit/b16ce639cbdf1acb7acc8e65ceca08d9e277fde2))
* **fab:** adds condensed size (VIV-1964) ([#1886](https://github.com/Vonage/vivid-3/issues/1886)) ([5df80a0](https://github.com/Vonage/vivid-3/commit/5df80a0fca1c8f96fe30973375767f410363d474))
* **icon:** adds warning connotation (VIV-1979) ([#1885](https://github.com/Vonage/vivid-3/issues/1885)) ([b1b78a9](https://github.com/Vonage/vivid-3/commit/b1b78a99830a0881010d8ebdaa3d8c092cff92ea))
* **select:** auto add aria-label when setting a label (VIV-1978) ([#1893](https://github.com/Vonage/vivid-3/issues/1893)) ([3af0875](https://github.com/Vonage/vivid-3/commit/3af08755cfcfb4a68157a8dfd9607c077c40f75a))
* **tabs:** add shadow when horizontal tabs has scroll (VIV-1946) ([#1889](https://github.com/Vonage/vivid-3/issues/1889)) ([e5caa7a](https://github.com/Vonage/vivid-3/commit/e5caa7a161bf891f7580e71e26269d72e6ef0031))


### Bug Fixes

* address combobox a11y errors ([dabd18c](https://github.com/Vonage/vivid-3/commit/dabd18cfd90f516d6a2a3dca9fe241af92065032))
* **audio-player:** stops playing when removed from DOM (VIV-1967) ([#1880](https://github.com/Vonage/vivid-3/issues/1880)) ([12355d3](https://github.com/Vonage/vivid-3/commit/12355d3488ceabdeb21bd626279ed5b504fc1000))
* **combobox:** aria-expanded and aria-controls attributes corrected (VIV-1976) ([#1881](https://github.com/Vonage/vivid-3/issues/1881)) ([dabd18c](https://github.com/Vonage/vivid-3/commit/dabd18cfd90f516d6a2a3dca9fe241af92065032))
* **dialog:** stop escape press propagation (VIV-1950) ([#1883](https://github.com/Vonage/vivid-3/issues/1883)) ([553f921](https://github.com/Vonage/vivid-3/commit/553f921d57ea93f491662a9146e2034df9dfcc80))
* **nav, nav-disclosure:** add fallback background-color for selected (VIV-1966) ([#1876](https://github.com/Vonage/vivid-3/issues/1876)) ([9a8f769](https://github.com/Vonage/vivid-3/commit/9a8f769ef7e1d928681d54defa8e2b4b46274712))

## [4.4.0](https://github.com/Vonage/vivid-3/compare/vivid-v4.3.0...vivid-v4.4.0) (2024-07-31)


### Features

* **accordion-item:** add css variable for meta-data custom max-inline-size (VIV-1951) ([#1865](https://github.com/Vonage/vivid-3/issues/1865)) ([a711d16](https://github.com/Vonage/vivid-3/commit/a711d169af0173ae71e3f6bdea80a27851550119))
* **dialog:** improve api with modal attribute (VIV-1657) ([#1853](https://github.com/Vonage/vivid-3/issues/1853)) ([daf06bc](https://github.com/Vonage/vivid-3/commit/daf06bc64d1e52895780fe501f09e2d1d5570fa5))
* **empty-state:** adding connotation and design variation (VIV-1378) ([#1863](https://github.com/Vonage/vivid-3/issues/1863)) ([953db49](https://github.com/Vonage/vivid-3/commit/953db49c4576e6943dffeed51c5cb32e850e29fb))
* **slider, range-slider:** add pin feature (VIV-1611) ([#1736](https://github.com/Vonage/vivid-3/issues/1736)) ([74944b4](https://github.com/Vonage/vivid-3/commit/74944b47cc7d23c0102b111384ede8e71623ef05))


### Bug Fixes

* **date-picker:** align button padding to design (VIV-1828) ([#1856](https://github.com/Vonage/vivid-3/issues/1856)) ([b987b69](https://github.com/Vonage/vivid-3/commit/b987b696941754b9e29dec0c78308eade622be3c))
* **file-picker:** add background color to uploaded items in list (VIV-1823) ([#1857](https://github.com/Vonage/vivid-3/issues/1857)) ([9c1a929](https://github.com/Vonage/vivid-3/commit/9c1a929c4b9b278d38c2b04b4dd35b1fe5ac8f79))
* **menu:** change padding of header + footer slots (VIV-000) ([#1868](https://github.com/Vonage/vivid-3/issues/1868)) ([18808db](https://github.com/Vonage/vivid-3/commit/18808db750ee941dd77a8d36ef45038aa1c08a2e))
* **time-picker:** center time columns (VIV-1903) ([#1864](https://github.com/Vonage/vivid-3/issues/1864)) ([92ea017](https://github.com/Vonage/vivid-3/commit/92ea017454efd62a7b028e3a3f1a1efd3fbb7a54))

## [4.3.0](https://github.com/Vonage/vivid-3/compare/vivid-v4.2.0...vivid-v4.3.0) (2024-07-18)


### Features

* **button:** add dropdown-indicator option (VIV-1741) ([#1702](https://github.com/Vonage/vivid-3/issues/1702)) ([5caaf84](https://github.com/Vonage/vivid-3/commit/5caaf841352343b147a033f8082d36edfe2a074b))
* **switch:** add announcement connotation (VIV-1756) ([#1848](https://github.com/Vonage/vivid-3/issues/1848)) ([edf18f8](https://github.com/Vonage/vivid-3/commit/edf18f872b140af806e8da04460fd36879ce4244))


### Bug Fixes

* **alert:** adds main slot margin when heading/text is present (VIV-1871) ([#1851](https://github.com/Vonage/vivid-3/issues/1851)) ([1f7cdaa](https://github.com/Vonage/vivid-3/commit/1f7cdaae22acfba2e9a3b554c427aea44dab7637))
* **fab:** removes elevation (border) when disabled (VIV-1908) ([#1854](https://github.com/Vonage/vivid-3/issues/1854)) ([f5af75d](https://github.com/Vonage/vivid-3/commit/f5af75d22d9f5aef14ca360a52af1d1787d81611))
* remove elevation from disabled fab ([f5af75d](https://github.com/Vonage/vivid-3/commit/f5af75d22d9f5aef14ca360a52af1d1787d81611))

## [4.2.0](https://github.com/Vonage/vivid-3/compare/vivid-v4.1.0...vivid-v4.2.0) (2024-07-11)


### Features

* **menu-item:** emit click event on activation (VIV-1859) ([#1844](https://github.com/Vonage/vivid-3/issues/1844)) ([cc58852](https://github.com/Vonage/vivid-3/commit/cc5885241afda538702b22cef4b5ceffc66973ac))

## [4.1.0](https://github.com/Vonage/vivid-3/compare/vivid-v4.0.0...vivid-v4.1.0) (2024-07-08)


### Features

* **alert:** add announcement connotation (VIV-1830) ([#1840](https://github.com/Vonage/vivid-3/issues/1840)) ([b1a980f](https://github.com/Vonage/vivid-3/commit/b1a980fae03f3232b2a7b2d3d15a45c2a024d3a4))
* **note:** add announcement connotation (VIV-1829) ([#1839](https://github.com/Vonage/vivid-3/issues/1839)) ([9202a3d](https://github.com/Vonage/vivid-3/commit/9202a3d8ae8e69229e95aeccf19874909de93163))


### Bug Fixes

* **audio-player:** hide menu when playback rates are not set (VIV-1845) ([#1815](https://github.com/Vonage/vivid-3/issues/1815)) ([f0e32d1](https://github.com/Vonage/vivid-3/commit/f0e32d1584f24f52c3a16ef8a999f52f309543e4))
* **badge:** centers text inside badge (VIV-1824) ([#1841](https://github.com/Vonage/vivid-3/issues/1841)) ([8be57da](https://github.com/Vonage/vivid-3/commit/8be57da6eef2b433fe001f498d5d76f0b85e5d5c))
* **number-field:** fix not updating validation after min/max change (VIV-1842) ([5afde52](https://github.com/Vonage/vivid-3/commit/5afde52660594af06e8a18f63facdc312561b4e3))
* **number-field:** update validation after min/max change (VIV-1842) ([#1833](https://github.com/Vonage/vivid-3/issues/1833)) ([5afde52](https://github.com/Vonage/vivid-3/commit/5afde52660594af06e8a18f63facdc312561b4e3))
* **select:** fix text color (VIV-1851) ([#1835](https://github.com/Vonage/vivid-3/issues/1835)) ([4e04daa](https://github.com/Vonage/vivid-3/commit/4e04daa157948d13192534b5f0a667dc8b64ff86))
* **select:** reset form clears selected value if placeholder exists (VIV-1841) ([#1831](https://github.com/Vonage/vivid-3/issues/1831)) ([1faa01b](https://github.com/Vonage/vivid-3/commit/1faa01be71cf220ccb1fc0c6302e86f6e63469fd))

## [4.0.0](https://github.com/Vonage/vivid-3/compare/vivid-v3.60.0...vivid-v4.0.0) (2024-07-01)


### ⚠ BREAKING CHANGES

* **tooltip:** sets default max width (VIV-1799) ([#1798](https://github.com/Vonage/vivid-3/issues/1798))
* **data-grid-cell:** change default value of block-size and white-space (VIV-1797) ([#1793](https://github.com/Vonage/vivid-3/issues/1793))
* **audio-player:** remove css-variable for min-inline-size and max-inline-size on host (VIV-1800) ([#1803](https://github.com/Vonage/vivid-3/issues/1803))
* **vue-wrappers:** forward form values by DOM prop name (VIV-1798) ([#1789](https://github.com/Vonage/vivid-3/issues/1789))
* **vue-wrappers:** forward form values by DOM prop name (VIV-1798)
* **tabs:** change gutters default to small (VIV-1796) ([#1804](https://github.com/Vonage/vivid-3/issues/1804))
* **docs:** refine docs for v-4 (VIV-000) ([#1813](https://github.com/Vonage/vivid-3/issues/1813))
* **toggletip:** add max-inline-size of 30ch & css-variable for custom size (VIV-1846) ([#1814](https://github.com/Vonage/vivid-3/issues/1814))

### Features

* **audio-player:** remove css-variable for min-inline-size and max-inline-size on host (VIV-1800) ([#1803](https://github.com/Vonage/vivid-3/issues/1803)) ([06ee68a](https://github.com/Vonage/vivid-3/commit/06ee68a6918612569f61a866716c1b1b96f1d1d6))
* **data-grid-cell:** change default value of block-size and white-space (VIV-1797) ([#1793](https://github.com/Vonage/vivid-3/issues/1793)) ([06ee68a](https://github.com/Vonage/vivid-3/commit/06ee68a6918612569f61a866716c1b1b96f1d1d6))
* **toggletip:** add max-inline-size of 30ch & css-variable for custom size (VIV-1846) ([#1814](https://github.com/Vonage/vivid-3/issues/1814)) ([06ee68a](https://github.com/Vonage/vivid-3/commit/06ee68a6918612569f61a866716c1b1b96f1d1d6))
* **tooltip:** sets default max width (VIV-1799) ([#1798](https://github.com/Vonage/vivid-3/issues/1798)) ([06ee68a](https://github.com/Vonage/vivid-3/commit/06ee68a6918612569f61a866716c1b1b96f1d1d6))
* **vue-wrappers:** forward form values by DOM prop name (VIV-1798) ([06ee68a](https://github.com/Vonage/vivid-3/commit/06ee68a6918612569f61a866716c1b1b96f1d1d6))
* **vue-wrappers:** forward form values by DOM prop name (VIV-1798) ([#1789](https://github.com/Vonage/vivid-3/issues/1789)) ([06ee68a](https://github.com/Vonage/vivid-3/commit/06ee68a6918612569f61a866716c1b1b96f1d1d6))


### Bug Fixes

* **tabs:** change gutters default to small (VIV-1796) ([#1804](https://github.com/Vonage/vivid-3/issues/1804)) ([06ee68a](https://github.com/Vonage/vivid-3/commit/06ee68a6918612569f61a866716c1b1b96f1d1d6))


### Miscellaneous Chores

* **docs:** refine docs for v-4 (VIV-000) ([#1813](https://github.com/Vonage/vivid-3/issues/1813)) ([06ee68a](https://github.com/Vonage/vivid-3/commit/06ee68a6918612569f61a866716c1b1b96f1d1d6))

## [3.60.0](https://github.com/Vonage/vivid-3/compare/vivid-v3.59.0...vivid-v3.60.0) (2024-07-01)


### Features

* **buttons:** add outline-light appearance (VIV-1775) ([#1791](https://github.com/Vonage/vivid-3/issues/1791)) ([6eebefe](https://github.com/Vonage/vivid-3/commit/6eebefe99566c5df57546757d822453d6ca3264c))


### Bug Fixes

* **audio-player:** keep paused state while dragging (VIV-1787) ([#1792](https://github.com/Vonage/vivid-3/issues/1792)) ([90d7a58](https://github.com/Vonage/vivid-3/commit/90d7a58667bc68802a152ce53459513d0297783a))
* disabled buttons in number field ([219bba7](https://github.com/Vonage/vivid-3/commit/219bba7a6797c13854d10e486ae2e57c8574db89))
* **number-field:** disabled buttons in number field (VIV-1817) ([#1779](https://github.com/Vonage/vivid-3/issues/1779)) ([219bba7](https://github.com/Vonage/vivid-3/commit/219bba7a6797c13854d10e486ae2e57c8574db89))
* **select:** fix initial select validity (VIV-1822) ([#1794](https://github.com/Vonage/vivid-3/issues/1794)) ([e8ea809](https://github.com/Vonage/vivid-3/commit/e8ea809fc047b43e5beccfd615ae51d9ee368d59))
* **text-area:** row="1" min-height (VIV-1647) ([#1783](https://github.com/Vonage/vivid-3/issues/1783)) ([db7277a](https://github.com/Vonage/vivid-3/commit/db7277afc00bf38bb433464ef0785b543a7dc28d))

## [3.59.0](https://github.com/Vonage/vivid-3/compare/vivid-v3.58.0...vivid-v3.59.0) (2024-06-18)


### Features

* **audio-player:** implement playback rates selector (VIV-1713) ([#1754](https://github.com/Vonage/vivid-3/issues/1754)) ([7a46449](https://github.com/Vonage/vivid-3/commit/7a4644989a76f86317edfcfea96225907721626a))
* **button, split-button:** add announcement connotation (VIV-1650) ([#1755](https://github.com/Vonage/vivid-3/issues/1755)) ([017d16d](https://github.com/Vonage/vivid-3/commit/017d16da438a8999f7282f4130343741670b2798))
* **combobox:** adds ghost appearance to combobox (VIV-1784) ([#1749](https://github.com/Vonage/vivid-3/issues/1749)) ([d9bc74e](https://github.com/Vonage/vivid-3/commit/d9bc74e93f48a40ec5f99aa54d7f116bb84809aa))
* **components:** annotate event types (VIV-1762) ([#1764](https://github.com/Vonage/vivid-3/issues/1764)) ([7b01636](https://github.com/Vonage/vivid-3/commit/7b0163647584348c43f72c7a2c7240e6bfd6bb86))
* **number-field:** support locales with comma (VIV-1771) ([#1733](https://github.com/Vonage/vivid-3/issues/1733)) ([e6f1b85](https://github.com/Vonage/vivid-3/commit/e6f1b850e49d720cfcd38f2ac33e931d5c568245))


### Bug Fixes

* **appearance:** change ghost text-color from 500 to 600 (VIV-1774) ([#1716](https://github.com/Vonage/vivid-3/issues/1716)) ([17eb547](https://github.com/Vonage/vivid-3/commit/17eb547b031fe065c34476f97b5365696f4e9a07))
* **banner:** add padding-block (VIV-1819) ([#1750](https://github.com/Vonage/vivid-3/issues/1750)) ([b8c8bbc](https://github.com/Vonage/vivid-3/commit/b8c8bbc23fcd8a339b9216eaef6d9b1fbcefacea))
* **button:** pending position when icon-trailing (VIV-1810) ([#1770](https://github.com/Vonage/vivid-3/issues/1770)) ([e72c357](https://github.com/Vonage/vivid-3/commit/e72c357348a3f3cc4624d739546c88a3d0e720c2))
* **tree-item:** remove un-needed bottom margin (VIV-1818) ([#1769](https://github.com/Vonage/vivid-3/issues/1769)) ([c74701f](https://github.com/Vonage/vivid-3/commit/c74701f6abcd9c40cc09511b38371c31f14203f9))

## [3.58.0](https://github.com/Vonage/vivid-3/compare/vivid-v3.57.0...vivid-v3.58.0) (2024-06-04)


### Features

* **audio-player:** expose currentTime ([4f2c817](https://github.com/Vonage/vivid-3/commit/4f2c8177040df808e930e6a865c379991c00414f))
* **audio-player:** expose duration ([4f2c817](https://github.com/Vonage/vivid-3/commit/4f2c8177040df808e930e6a865c379991c00414f))
* **audio-player:** expose paused ([4f2c817](https://github.com/Vonage/vivid-3/commit/4f2c8177040df808e930e6a865c379991c00414f))
* **audio-player:** expose play and pause methods ([4f2c817](https://github.com/Vonage/vivid-3/commit/4f2c8177040df808e930e6a865c379991c00414f))
* **badge:** add announcement connotation (VIV-1649) ([#1740](https://github.com/Vonage/vivid-3/issues/1740)) ([6545e04](https://github.com/Vonage/vivid-3/commit/6545e047b53dfc532a67f9ab253563eb1e4d3940))
* **tooltip:** add max-inline-size variable (VIV-1660) ([#1725](https://github.com/Vonage/vivid-3/issues/1725)) ([e50f367](https://github.com/Vonage/vivid-3/commit/e50f3677edff6916e301e77ff404ea0acd178116))


### Bug Fixes

* **combobox:** adds options gap (VIV-1768) ([#1719](https://github.com/Vonage/vivid-3/issues/1719)) ([df2db60](https://github.com/Vonage/vivid-3/commit/df2db6048d79fc6e4fd2db37dbc7d210f314cede))
* **select:** design alignment (VIV-1755) ([#1731](https://github.com/Vonage/vivid-3/issues/1731)) ([b59e5cf](https://github.com/Vonage/vivid-3/commit/b59e5cf40554d5137ae0bab0aea21210189ae7e1))
* **slider:** new marker design (VIV-1766) ([#1732](https://github.com/Vonage/vivid-3/issues/1732)) ([af7e4ab](https://github.com/Vonage/vivid-3/commit/af7e4aba121d300ff23878b193fbed2d386fddde))
* **tab:** change tab padding to margin (VIV-1790) ([#1735](https://github.com/Vonage/vivid-3/issues/1735)) ([a6748df](https://github.com/Vonage/vivid-3/commit/a6748dfb9f9f27879f662fac4d4abd5ede9cebdc))
* **text-field:** remove pointer event to focus ring in old browsers (VIV-1788) ([#1741](https://github.com/Vonage/vivid-3/issues/1741)) ([4d75920](https://github.com/Vonage/vivid-3/commit/4d7592048bafe30ac461a3dd33174a86bc6ace8a))
* **video-player:** responsive control bar (VIV-1681) ([#1709](https://github.com/Vonage/vivid-3/issues/1709)) ([486031c](https://github.com/Vonage/vivid-3/commit/486031ccda40a6fb02905807744d7f9136339c12))

## [3.57.0](https://github.com/Vonage/vivid-3/compare/vivid-v3.56.0...vivid-v3.57.0) (2024-05-22)


### Features

* **fab:** announcement connotation (VIV-1726) ([#1718](https://github.com/Vonage/vivid-3/issues/1718)) ([a873069](https://github.com/Vonage/vivid-3/commit/a873069357e6f1dd5d438cee8c6b2139cd4ba1c1))

## [3.56.0](https://github.com/Vonage/vivid-3/compare/vivid-v3.55.0...vivid-v3.56.0) (2024-05-20)


### Features

* **buttons:** add ghost-light appearance (VIV-1767) ([#1712](https://github.com/Vonage/vivid-3/issues/1712)) ([cc7f9cc](https://github.com/Vonage/vivid-3/commit/cc7f9cc400a1b39ab2d6cb3fcd851bda2aa3fee2))
* **components:** add de-DE locale (VIV-1761) ([#1713](https://github.com/Vonage/vivid-3/issues/1713)) ([27f3164](https://github.com/Vonage/vivid-3/commit/27f31643682062793203ba7c7745edfe8e404225))


### Bug Fixes

* **audio-player:** css for responsive extended audio (VIV-1745) ([#1681](https://github.com/Vonage/vivid-3/issues/1681)) ([667b2ba](https://github.com/Vonage/vivid-3/commit/667b2bafb0c7cc0f43ac0a0580c74cf2feb2a396))
* **menu-item:** fix disabled style (VIV-1772) ([#1714](https://github.com/Vonage/vivid-3/issues/1714)) ([faa3084](https://github.com/Vonage/vivid-3/commit/faa3084d5dce78e914f4d95d8c4277f0ec536fb0))

## [3.55.0](https://github.com/Vonage/vivid-3/compare/vivid-v3.54.0...vivid-v3.55.0) (2024-05-09)


### Features

* **combobox:** add fixed-dropdown support (VIV-1739) ([#1700](https://github.com/Vonage/vivid-3/issues/1700)) ([4d99336](https://github.com/Vonage/vivid-3/commit/4d993363b7f515de147406a49cb0362d8b798135))
* **dial-pad:** input features and fixes (VIV-1744) ([#1682](https://github.com/Vonage/vivid-3/issues/1682)) ([7089b30](https://github.com/Vonage/vivid-3/commit/7089b30460ef4025afedba31559c444e9108707b))


### Bug Fixes

* **accordion-item:** convert trailing icon to be 16px when condensed (VIV-1727) ([#1694](https://github.com/Vonage/vivid-3/issues/1694)) ([cee119d](https://github.com/Vonage/vivid-3/commit/cee119d885c4e34f7995d120d4cc8eccd853c19e))
* **dial-pad:** disables delete button when call-active is set (VIV-1685) ([#1696](https://github.com/Vonage/vivid-3/issues/1696)) ([3549919](https://github.com/Vonage/vivid-3/commit/35499198d305e016f561e9b7e0258e4dc89ba192))
* **dial-pad:** keep underline when action-item are focused (VIV-1751) ([#1698](https://github.com/Vonage/vivid-3/issues/1698)) ([eac2f7b](https://github.com/Vonage/vivid-3/commit/eac2f7b7bc8c48b570f6a4f66f7102eb17a420f4))
* icon - set aria-busy when icon is loading ([a809066](https://github.com/Vonage/vivid-3/commit/a809066269f99b9f2cae10a06b96474f844be3ef))
* **icon:** set aria-busy when icon is loading (VIV-1749) ([#1697](https://github.com/Vonage/vivid-3/issues/1697)) ([a809066](https://github.com/Vonage/vivid-3/commit/a809066269f99b9f2cae10a06b96474f844be3ef))
* **menu:** make auto-dismiss dismiss on focusout (VIV-1747) ([#1690](https://github.com/Vonage/vivid-3/issues/1690)) ([c3d2c41](https://github.com/Vonage/vivid-3/commit/c3d2c414a5564ef446dd0e1b0a542ef5e1ff61ef))

## [3.54.0](https://github.com/Vonage/vivid-3/compare/vivid-v3.53.0...vivid-v3.54.0) (2024-04-30)


### Features

* **audio-player:** skip buttons (VIV-1645) ([#1656](https://github.com/Vonage/vivid-3/issues/1656)) ([37d5e68](https://github.com/Vonage/vivid-3/commit/37d5e687cca8e42f01deb828acb35093d14fae84))
* **dial pad:** add attributes to button (VIV-1743) ([#1677](https://github.com/Vonage/vivid-3/issues/1677)) ([bd2a0d1](https://github.com/Vonage/vivid-3/commit/bd2a0d140793cc63e51be204c8837eee155130a4))
* **icon:** update icons set version to 4.5.6 (VIV-1651)  ([#1667](https://github.com/Vonage/vivid-3/issues/1667)) ([8f8106a](https://github.com/Vonage/vivid-3/commit/8f8106a783a26e46718389140b14bd88bcee7c37))
* **menu:** support auto trigger (VIV-1469) ([#1659](https://github.com/Vonage/vivid-3/issues/1659)) ([beea145](https://github.com/Vonage/vivid-3/commit/beea145a57aad8f256508c0334ff199f1fb3e43a))
* **nav-item, nav-disclosure:** add cta connotation (VIV-1670) ([#1672](https://github.com/Vonage/vivid-3/issues/1672)) ([c9bfdad](https://github.com/Vonage/vivid-3/commit/c9bfdadfad8fcba2e86f3da02a8baf379f344aad))
* **nav-item, nav-disclosure:** add ghost-light appearance (VIV-1466) ([#1512](https://github.com/Vonage/vivid-3/issues/1512)) ([e87e674](https://github.com/Vonage/vivid-3/commit/e87e674e37bd32a64f738c3254f094fdaedb0cc6))
* **text-field:** use helper-text as accessible description (VIV-1592) ([#1673](https://github.com/Vonage/vivid-3/issues/1673)) ([bb64da9](https://github.com/Vonage/vivid-3/commit/bb64da98864b3d226a968cb996d6db9a0e5c4217))
* **vue-wrappers:** allow using original attribute instead of v-model (VIV-1640) ([#1648](https://github.com/Vonage/vivid-3/issues/1648)) ([2a18adb](https://github.com/Vonage/vivid-3/commit/2a18adb4ff850c0b07d6ae665f2dffcc10e239b0))


### Bug Fixes

* **a11y:** error message announcement in form elements (VIV-1593) ([#1662](https://github.com/Vonage/vivid-3/issues/1662)) ([3bc7707](https://github.com/Vonage/vivid-3/commit/3bc77075dab84984cb359730be5d059e13db651a))
* **icon:** fix icon size `0` not working when set as prop (VIV-1705) ([#1657](https://github.com/Vonage/vivid-3/issues/1657)) ([80775df](https://github.com/Vonage/vivid-3/commit/80775df71c4134685dffb3674d0e4815da42059b))
* **menu:** fix setting tabindex on anchor (VIV-1706) ([#1670](https://github.com/Vonage/vivid-3/issues/1670)) ([1022111](https://github.com/Vonage/vivid-3/commit/1022111ce30a96e2c85028d627c9564e4c349d78))
* **select:** add hover state to ghost appearance (VIV-1714) ([#1664](https://github.com/Vonage/vivid-3/issues/1664)) ([4408795](https://github.com/Vonage/vivid-3/commit/440879531c3f3f5536b6ec770f72036b5e871f54))
* **video-player:** change font & icons to vivid (VIV-1680) ([#1674](https://github.com/Vonage/vivid-3/issues/1674)) ([08ae243](https://github.com/Vonage/vivid-3/commit/08ae2439b68ad3354780fcaee19dcd6bb0088fe3))

## [3.53.0](https://github.com/Vonage/vivid-3/compare/vivid-v3.52.0...vivid-v3.53.0) (2024-04-04)


### Features

* **data-grid:** support dynamic row height (VIV-1602) ([#1641](https://github.com/Vonage/vivid-3/issues/1641)) ([012cd9f](https://github.com/Vonage/vivid-3/commit/012cd9fbbe987991744d3790435cd9a39fca2ab2))
* **dial pad:** new composed component (VIV-1512) ([#1629](https://github.com/Vonage/vivid-3/issues/1629)) ([67af9e0](https://github.com/Vonage/vivid-3/commit/67af9e03ac346d617a2e7cb9fefd3deff9a5cad9))
* **helper-text:** allow setting helper-text via slot (VIV-1616) ([#1636](https://github.com/Vonage/vivid-3/issues/1636)) ([53f3a34](https://github.com/Vonage/vivid-3/commit/53f3a349fb1ea8093482fb3b79e1836ed16f6481))
* **text-field:** custom for dialpad (VIV-1618) ([#1640](https://github.com/Vonage/vivid-3/issues/1640)) ([72bd8a2](https://github.com/Vonage/vivid-3/commit/72bd8a2b38a0a4745bdc03f94845734ea9f27391))
* **video-player:** add component (VIV-1486) ([#1594](https://github.com/Vonage/vivid-3/issues/1594)) ([9bb162f](https://github.com/Vonage/vivid-3/commit/9bb162f4e419131b0cdd524a8365498d09046506))


### Bug Fixes

* **banner:** warning connotation when removable (VIV-1431) ([#1647](https://github.com/Vonage/vivid-3/issues/1647)) ([8fe6bab](https://github.com/Vonage/vivid-3/commit/8fe6bab0326f092a63fa7fdb74423900fba5596c))
* **button:** fix stacked in pill shape border-radius (VIV-1667) ([#1650](https://github.com/Vonage/vivid-3/issues/1650)) ([17c6325](https://github.com/Vonage/vivid-3/commit/17c6325f5a5f2092d7084ca015c2480114229f90))
* **components:** reset white-space for floating elements (VIV-1588) ([#1644](https://github.com/Vonage/vivid-3/issues/1644)) ([0f44c2b](https://github.com/Vonage/vivid-3/commit/0f44c2b039b0e32d79922a95738e99ed33c084fa))

## [3.52.0](https://github.com/Vonage/vivid-3/compare/vivid-v3.51.0...vivid-v3.52.0) (2024-03-20)


### Features

* **button, split-button:** show active state when expanded (VIV-1562) ([#1607](https://github.com/Vonage/vivid-3/issues/1607)) ([b3e9982](https://github.com/Vonage/vivid-3/commit/b3e99826306c46a81babbe43aa28b25efcc47ec9))
* **menu-item:** cta connotation (VIV-1626) ([#1627](https://github.com/Vonage/vivid-3/issues/1627)) ([2cd52f2](https://github.com/Vonage/vivid-3/commit/2cd52f2f1aedd9b8a6b23ef374837963855ac45f))
* **range-slider:** add component (VIV-1488) ([#1584](https://github.com/Vonage/vivid-3/issues/1584)) ([0074811](https://github.com/Vonage/vivid-3/commit/00748113cc8e562e791e56c7ac6961f2a5e6138f))


### Bug Fixes

* **appearance:** changes in listitem appearance colors (VIV-1648) ([#1637](https://github.com/Vonage/vivid-3/issues/1637)) ([0369950](https://github.com/Vonage/vivid-3/commit/03699503daa75a856173f24178a4d553bc6adc79))
* **components:** fix validation in Safari versions before 16.4 (VIV-1568) ([#1608](https://github.com/Vonage/vivid-3/issues/1608)) ([65e342d](https://github.com/Vonage/vivid-3/commit/65e342d1fa9761e893324c0b02cbd0205504672d))
* **data-grid:** links inside data-grid (VIV-1587) ([#1614](https://github.com/Vonage/vivid-3/issues/1614)) ([83a685b](https://github.com/Vonage/vivid-3/commit/83a685ba94548a3f3be13586b3c2b4268fd9f95e))
* **docs:** fix example height (VIV-000) ([#1605](https://github.com/Vonage/vivid-3/issues/1605)) ([5537b64](https://github.com/Vonage/vivid-3/commit/5537b649c0d5e3fcb2e686497e15ca8d9018d5e8))
* **docs:** fix example height (VIV-000) ([#1609](https://github.com/Vonage/vivid-3/issues/1609)) ([455a49a](https://github.com/Vonage/vivid-3/commit/455a49af7d5e1d9aaa42f503e47a21b9de9e0dd4))
* **fab:** inline-padding in normal size (VIV-1623) ([#1638](https://github.com/Vonage/vivid-3/issues/1638)) ([a5214e2](https://github.com/Vonage/vivid-3/commit/a5214e2ffb6ae770023984ee9b7bff401780cd98))
* **icons:** add aria-hidden to all icons by default (VIV-1551) ([#1613](https://github.com/Vonage/vivid-3/issues/1613)) ([aa3ec2f](https://github.com/Vonage/vivid-3/commit/aa3ec2f249aca4d71cc332a5322be77c49491629))
* **menu-item:** fix font-size (VIV-1589) ([#1604](https://github.com/Vonage/vivid-3/issues/1604)) ([26a28e3](https://github.com/Vonage/vivid-3/commit/26a28e3427a2a6c192b72e4cd8e807dbef2b7f99))
* **menu:** fix auto-dismiss emitting close when opening (VIV-1603) ([#1622](https://github.com/Vonage/vivid-3/issues/1622)) ([c837c88](https://github.com/Vonage/vivid-3/commit/c837c88f8470fb7911c529087ad7123cdb880fc7))
* **text-area:** style resize knob (VIV-1620) ([#1626](https://github.com/Vonage/vivid-3/issues/1626)) ([9c9a9fc](https://github.com/Vonage/vivid-3/commit/9c9a9fc80d5bce9681aa9041a0fea9691c074f5a))
* **text-field:** remove browser autofill style (VIV-1641) ([#1634](https://github.com/Vonage/vivid-3/issues/1634)) ([a1cf144](https://github.com/Vonage/vivid-3/commit/a1cf144af90e01d4730ff7fbec643f8eef805ce1))

## [3.51.0](https://github.com/Vonage/vivid-3/compare/vivid-v3.50.1...vivid-v3.51.0) (2024-02-26)


### Features

* **button:** add link option (VIV-1544) ([#1590](https://github.com/Vonage/vivid-3/issues/1590)) ([14d3143](https://github.com/Vonage/vivid-3/commit/14d31431608d105df17a48049c7166a056cf952a))
* **tooltip, toggletip, menu:** add anchor slot (VIV-1539) ([#1567](https://github.com/Vonage/vivid-3/issues/1567)) ([db96306](https://github.com/Vonage/vivid-3/commit/db96306076a87f8715161a5c86029500ffdb4b8e))


### Bug Fixes

* **alert:** add media query to set min-inline-size to auto (VIV-1564) ([#1529](https://github.com/Vonage/vivid-3/issues/1529)) ([7a19f93](https://github.com/Vonage/vivid-3/commit/7a19f932d6fee8f99d6dc60aae9c3de2343da9c6))
* **docs:** fix broken links (VIV-1584) ([#1600](https://github.com/Vonage/vivid-3/issues/1600)) ([2740e05](https://github.com/Vonage/vivid-3/commit/2740e05f9dad3feef5dacc39f0af87ecf803d142))
* **menu-item:** secondary text color in disable state (VIV-1579) ([#1598](https://github.com/Vonage/vivid-3/issues/1598)) ([f9a926d](https://github.com/Vonage/vivid-3/commit/f9a926dafa70c41a611c2830377c95f149122712))
* **switch:** fix hover color (VIV-1583) ([#1602](https://github.com/Vonage/vivid-3/issues/1602)) ([44d06f4](https://github.com/Vonage/vivid-3/commit/44d06f4c1969ae2edd5f47f2ccfa3c8537c21c42))
* **tag, avatar, badge:** align accent connotation to design (VIV-1567) ([#1596](https://github.com/Vonage/vivid-3/issues/1596)) ([fc01ca1](https://github.com/Vonage/vivid-3/commit/fc01ca15d83b71337eb356d9f65b7c08229b5a13))

## [3.50.1](https://github.com/Vonage/vivid-3/compare/vivid-v3.50.0...vivid-v3.50.1) (2024-02-21)


### Bug Fixes

* **accordion-item:** text-select in the accordion content (VIV-1515) ([#1581](https://github.com/Vonage/vivid-3/issues/1581)) ([d9c2ef7](https://github.com/Vonage/vivid-3/commit/d9c2ef777a67d01d6b7f74c8773ec4d4c585c577))
* **alert:** add icon slot (VIV-1515) ([#1580](https://github.com/Vonage/vivid-3/issues/1580)) ([263d1c0](https://github.com/Vonage/vivid-3/commit/263d1c0a2d17c7139b4452e10fe0c18798248005))
* **components:** import styles correctly (VIV-000) ([#1575](https://github.com/Vonage/vivid-3/issues/1575)) ([6132a22](https://github.com/Vonage/vivid-3/commit/6132a227625274af66a5eba3c6c1449407a0ae86))
* **file-picker:** add to vue-wrappers (VIV-1530) ([#1589](https://github.com/Vonage/vivid-3/issues/1589)) ([10f278b](https://github.com/Vonage/vivid-3/commit/10f278b40c7fa09481201fc3f19b2f786bbaa036))
* **menu-item:** unchecked checkbox & radio color (VIV-1549) ([#1587](https://github.com/Vonage/vivid-3/issues/1587)) ([1fb9a01](https://github.com/Vonage/vivid-3/commit/1fb9a01ffae57cf22c4103f6068779c1d79f90fc))
* **select, checkbox:** error & success style (VIV-1458) ([#1541](https://github.com/Vonage/vivid-3/issues/1541)) ([07ad525](https://github.com/Vonage/vivid-3/commit/07ad525521b92fcfaf6f7a1e817129294e57e0b3))
* **selectable-box:** update new png (VIV-000) ([#1586](https://github.com/Vonage/vivid-3/issues/1586)) ([0ca10b0](https://github.com/Vonage/vivid-3/commit/0ca10b0f6b701f6bee9f962af27d43767c2ad640))

## [3.50.0](https://github.com/Vonage/vivid-3/compare/vivid-v3.49.0...vivid-v3.50.0) (2024-02-08)


### Features

* **time-picker:** add component (VIV-1321) ([#1539](https://github.com/Vonage/vivid-3/issues/1539)) ([eccef79](https://github.com/Vonage/vivid-3/commit/eccef79c1bb18ebeb099194e43f63826fee3be05))

## [3.49.0](https://github.com/Vonage/vivid-3/compare/vivid-v3.48.0...vivid-v3.49.0) (2024-02-07)


### Features

* **lib:** add cjs output to vivid (VIV-1518) ([#1557](https://github.com/Vonage/vivid-3/issues/1557)) ([c3fd27e](https://github.com/Vonage/vivid-3/commit/c3fd27ef1a24a7148a5256a47504c81c83766d78))


### Bug Fixes

* **alert:** change display inline to contents (VIV-1534) ([#1558](https://github.com/Vonage/vivid-3/issues/1558)) ([834d237](https://github.com/Vonage/vivid-3/commit/834d2375eb0d34aa682174d8b487a726db2e6512))
* **breadcrumb:** breadcrumb missing from docs (VIV-000) ([#1562](https://github.com/Vonage/vivid-3/issues/1562)) ([17182d8](https://github.com/Vonage/vivid-3/commit/17182d82aa0eec51764eda38fedc4f1f0fb82c56))
* **button:** improve button accessibility (VIV-1505) ([#1559](https://github.com/Vonage/vivid-3/issues/1559)) ([78a21cf](https://github.com/Vonage/vivid-3/commit/78a21cf7f70e978f9f1ce4e76d7b230295a6788b))
* **text-field:** fix focus and blur events bubbling (VIV-1538) ([#1564](https://github.com/Vonage/vivid-3/issues/1564)) ([85dc16b](https://github.com/Vonage/vivid-3/commit/85dc16b2e8c3828a752a7e2911be2e4006028a54))

## [3.48.0](https://github.com/Vonage/vivid-3/compare/vivid-v3.47.0...vivid-v3.48.0) (2024-01-31)


### Features

* **menu-item:** slot trailing-meta (VIV-1522) ([#1554](https://github.com/Vonage/vivid-3/issues/1554)) ([cdd6e37](https://github.com/Vonage/vivid-3/commit/cdd6e37ee056979ce73d55bfb0f4d4dec56f2e69))
* **tabs:** add tab scroll panel as property (VIV-1528) ([#1555](https://github.com/Vonage/vivid-3/issues/1555)) ([73450ff](https://github.com/Vonage/vivid-3/commit/73450ffa84e1df4a40f6a2acbbe4438fe8c2ec45))

## [3.47.0](https://github.com/Vonage/vivid-3/compare/vivid-v3.46.0...vivid-v3.47.0) (2024-01-24)


### Features

* **components:** minify css (VIV-1376) ([#1545](https://github.com/Vonage/vivid-3/issues/1545)) ([13d12c4](https://github.com/Vonage/vivid-3/commit/13d12c4e0a60d6aae85d667d31d6f32fa93e1f5b))
* **vue-wrappers:** support slot attribute syntax (VIV-1508) ([#1544](https://github.com/Vonage/vivid-3/issues/1544)) ([fc2d72f](https://github.com/Vonage/vivid-3/commit/fc2d72f4da72f22437b0ef999f1c20f34db013f2))


### Bug Fixes

* **date-picker, date-range-picker:** add event for click on clear (VIV-1478) ([#1543](https://github.com/Vonage/vivid-3/issues/1543)) ([2752907](https://github.com/Vonage/vivid-3/commit/275290782e0c429cbb74691f1d7d3342564294c9))
* **slider:** change disable design and focus pattern  (VIV-1438) ([#1536](https://github.com/Vonage/vivid-3/issues/1536)) ([73b70fc](https://github.com/Vonage/vivid-3/commit/73b70fc96ebf5e50b4a881706fb3b92be3f42231))

## [3.46.0](https://github.com/Vonage/vivid-3/compare/vivid-v3.45.0...vivid-v3.46.0) (2024-01-15)


### Features

* **split-button, vue-wrappers:** add split-button to vivid-vue (VIV-1497) ([#1530](https://github.com/Vonage/vivid-3/issues/1530)) ([aec0bc8](https://github.com/Vonage/vivid-3/commit/aec0bc8f4f1adcf60896567a0037ee579dced762))


### Bug Fixes

* **data-grid:** hover on rows (VIV-1455) ([#1525](https://github.com/Vonage/vivid-3/issues/1525)) ([fdc7d54](https://github.com/Vonage/vivid-3/commit/fdc7d5496894268a98fd492725a82a214aa390fe))
* **dialog:** fix dialog polyfill (VIV-1491) ([#1524](https://github.com/Vonage/vivid-3/issues/1524)) ([fe667fa](https://github.com/Vonage/vivid-3/commit/fe667fa9246103aa7d7d5241d0a487cee7a139ad))
* **vue-wrappers:** fix text-area missing props (VIV-1503) ([#1533](https://github.com/Vonage/vivid-3/issues/1533)) ([62a7bfb](https://github.com/Vonage/vivid-3/commit/62a7bfbe988165292e82e793fea5e5cfdb851762))

## [3.45.0](https://github.com/Vonage/vivid-3/compare/vivid-v3.44.0...vivid-v3.45.0) (2024-01-08)


### Features

* **alert:** add option for non-fixed alert (VIV-1315) ([#1509](https://github.com/Vonage/vivid-3/issues/1509)) ([238147f](https://github.com/Vonage/vivid-3/commit/238147f0054d366d6f3a2cd45264653e875f4fcc))
* **data-grid:** add cell-click event (VIV-1443) ([#1510](https://github.com/Vonage/vivid-3/issues/1510)) ([0b80835](https://github.com/Vonage/vivid-3/commit/0b80835aaf9ca083b2020f10f7701d70db895bb4))
* **split-button:** icon slot (VIV-1442) ([#1523](https://github.com/Vonage/vivid-3/issues/1523)) ([7ccfc11](https://github.com/Vonage/vivid-3/commit/7ccfc1189d9c3ee1a8952d9404e6de9b7e7f3e5b))
* **tabs:** add gutters attribute (VIV-1422) ([#1486](https://github.com/Vonage/vivid-3/issues/1486)) ([ca03b53](https://github.com/Vonage/vivid-3/commit/ca03b53a4cb17cbb39e463b996eec77d88345019))


### Bug Fixes

* **banner:** fix control being focusable (VIV-1414) ([#1503](https://github.com/Vonage/vivid-3/issues/1503)) ([a3271bd](https://github.com/Vonage/vivid-3/commit/a3271bd27ddf2dd015f8daf5c84b0ff9af40baa8))
* **button, split-button, avatar:** change condensed & super-condensed to 4px border-radius (VIV-1464) ([#1508](https://github.com/Vonage/vivid-3/issues/1508)) ([866ddbe](https://github.com/Vonage/vivid-3/commit/866ddbed44aeab38c9d9122d91287a6ae8369c38))
* **data-grid:** add scroll preview (VIV-1448) ([#1515](https://github.com/Vonage/vivid-3/issues/1515)) ([987f51a](https://github.com/Vonage/vivid-3/commit/987f51a4469d7812cf3f57d1f0af7404099dcd6c))
* **data-grid:** set header if there's no data (VIV-1435) ([#1522](https://github.com/Vonage/vivid-3/issues/1522)) ([620dc0a](https://github.com/Vonage/vivid-3/commit/620dc0ac0ebf4dbc505323b0d36193b22788d0c1))
* **popup, tooltip, toggletip:** fix anchored components not handling being reconnected to DOM (VIV-1412) ([#1516](https://github.com/Vonage/vivid-3/issues/1516)) ([da2cb0e](https://github.com/Vonage/vivid-3/commit/da2cb0e2ec750c4a9a56f3b4c33e218f5cf36a76))
* **tabs:** add panel scroll support when height set on tabs (VIV-1468) ([#1514](https://github.com/Vonage/vivid-3/issues/1514)) ([a1beb85](https://github.com/Vonage/vivid-3/commit/a1beb853519b721d08022f5aaa730f5c4ca8003b))

## [3.44.0](https://github.com/Vonage/vivid-3/compare/vivid-v3.43.0...vivid-v3.44.0) (2023-12-20)


### Features

* **dialog:** add non-dismissive attribute (VIV-1351) ([#1453](https://github.com/Vonage/vivid-3/issues/1453)) ([2f5e24b](https://github.com/Vonage/vivid-3/commit/2f5e24bb6818177be42a816eabc69d3b47fc7c7c))


### Bug Fixes

* **date-picker, date-range-picker:** fix popup not being anchored (VIV-1439) ([#1496](https://github.com/Vonage/vivid-3/issues/1496)) ([a148062](https://github.com/Vonage/vivid-3/commit/a148062a2aa024c5cd34cb14ae6dc0a800d071bd))
* **menu-item:** prevent click event when disabled (VIV-1440) ([#1488](https://github.com/Vonage/vivid-3/issues/1488)) ([c3d05dd](https://github.com/Vonage/vivid-3/commit/c3d05dd8de06728d3802df50e4e8ff7b27763174))
* **menu:** accessible name with aria-label attribute (VIV-1395) ([#1477](https://github.com/Vonage/vivid-3/issues/1477)) ([9512b1c](https://github.com/Vonage/vivid-3/commit/9512b1c681553e4ee044e835c94e5696a60e97dd))
* prevent click event on menu-item when disabled ([c3d05dd](https://github.com/Vonage/vivid-3/commit/c3d05dd8de06728d3802df50e4e8ff7b27763174))
* **select, radio:** document input and change events and add tests (VIV-1402) ([#1484](https://github.com/Vonage/vivid-3/issues/1484)) ([6c254b3](https://github.com/Vonage/vivid-3/commit/6c254b3e77e3dd1dabcab26d6cf0309c11e889ab))
* **side-drawer:** add block-size to content (VIV-1352) ([#1481](https://github.com/Vonage/vivid-3/issues/1481)) ([6bca42d](https://github.com/Vonage/vivid-3/commit/6bca42da68a28f2f19a8ed49c0f87bf1a0d01e54))
* **text-field, number-field:** success and error colors for ghost appearance (VIV-1360) ([#1497](https://github.com/Vonage/vivid-3/issues/1497)) ([09728b6](https://github.com/Vonage/vivid-3/commit/09728b64b94eba87e9974da293a48254affea80e))
* **text-field:** fix input styles getting overridden by css resets (VIV-1433) ([#1498](https://github.com/Vonage/vivid-3/issues/1498)) ([7246dc8](https://github.com/Vonage/vivid-3/commit/7246dc8d3c13f23d8e7dd62e2ee9e649d2d0efb6))
* **vue-wrappers:** fix missing presentation role for menu item (VIV-1463) ([#1507](https://github.com/Vonage/vivid-3/issues/1507)) ([6013902](https://github.com/Vonage/vivid-3/commit/6013902d586ef150531c7c5a6bc0b7d08b340d08))

## [3.43.0](https://github.com/Vonage/vivid-3/compare/vivid-v3.42.1...vivid-v3.43.0) (2023-12-11)


### Miscellaneous Chores

* **vivid:** Synchronize vivid versions

## [3.42.1](https://github.com/Vonage/vivid-3/compare/vivid-v3.42.0...vivid-v3.42.1) (2023-12-06)


### Bug Fixes

* **nav-item, nav-disclosure:** add padding-block (VIV-1334) ([#1476](https://github.com/Vonage/vivid-3/issues/1476)) ([8b0f66d](https://github.com/Vonage/vivid-3/commit/8b0f66dc6ae61ad5afb1a1221e59faa58d165fd9))
* **note:** adjust accent background color to other connotations (VIV-1397) ([#1473](https://github.com/Vonage/vivid-3/issues/1473)) ([3110f92](https://github.com/Vonage/vivid-3/commit/3110f92683d0c4fb868d04e1f3aa8cda2373742e))
* **tag:** selected state colors (VIV-1425) ([#1472](https://github.com/Vonage/vivid-3/issues/1472)) ([83da9cb](https://github.com/Vonage/vivid-3/commit/83da9cba2f8886e559d42229248513d66da23528))

## [3.42.0](https://github.com/Vonage/vivid-3/compare/vivid-v3.41.0...vivid-v3.42.0) (2023-11-30)


### Features

* **checkbox:** add input event and documentation (VIV-1240) ([#1457](https://github.com/Vonage/vivid-3/issues/1457)) ([f05d348](https://github.com/Vonage/vivid-3/commit/f05d348c6d1094a7d0c7e0ef2056d9ff92b22adf))
* **selectable-box:** deprecates clickable prop in favour of clickable-box ([21b6ec6](https://github.com/Vonage/vivid-3/commit/21b6ec6ae3a0385028ccaeb8213a40cb434ef4df))
* **split-button:** add success and alert connotations (VIV-1404) ([#1459](https://github.com/Vonage/vivid-3/issues/1459)) ([4cf7a14](https://github.com/Vonage/vivid-3/commit/4cf7a14c05aba28a2c800a17d0c1087e7a5c5a9b))
* **ui-tests:** pass arguments to docker container (VIV-1332) ([#1462](https://github.com/Vonage/vivid-3/issues/1462)) ([29ee6f9](https://github.com/Vonage/vivid-3/commit/29ee6f9c8aaa3ecc43f63da99afbbaa38c9cc06b))


### Bug Fixes

* **avatar:** add missing color for subtle appearance (VIV-1409) ([#1470](https://github.com/Vonage/vivid-3/issues/1470)) ([d29423e](https://github.com/Vonage/vivid-3/commit/d29423e641fbe366e5340ed7f888bd054365b624))
* **calendar:** small a11y fixes (VIV-1390) ([#1464](https://github.com/Vonage/vivid-3/issues/1464)) ([8f2124e](https://github.com/Vonage/vivid-3/commit/8f2124e6e924fccf8a52a0dcd26f926f0a75c630))
* **date-picker,date-range-picker,slider:** fix component being focusable in safari (VIV-1331) ([#1463](https://github.com/Vonage/vivid-3/issues/1463)) ([1d54c78](https://github.com/Vonage/vivid-3/commit/1d54c7843d259eb9641b73ace60d1d99a66c8853))
* **date-picker:** wrap button with span for role="gridcell" (VIV-1391) ([#1456](https://github.com/Vonage/vivid-3/issues/1456)) ([9b2337c](https://github.com/Vonage/vivid-3/commit/9b2337c385f7e6ef11227c5a68205a9932ea389a))
* **selectable-box:** ui focus test (VIV-000) ([#1471](https://github.com/Vonage/vivid-3/issues/1471)) ([02a6927](https://github.com/Vonage/vivid-3/commit/02a692797d43cd2739a9fae581bcc43d78f4e583))
* **tabs:** indicator border-radius (VIV-1419) ([#1465](https://github.com/Vonage/vivid-3/issues/1465)) ([250fa92](https://github.com/Vonage/vivid-3/commit/250fa92860d992cdacea61ba75f7327ca11d750c))

## [3.41.0](https://github.com/Vonage/vivid-3/compare/vivid-v3.40.0...vivid-v3.41.0) (2023-11-22)


### Features

* **audio-player:** new component (VIV-942) ([#1411](https://github.com/Vonage/vivid-3/issues/1411)) ([e1f31e1](https://github.com/Vonage/vivid-3/commit/e1f31e1af90e210f9ae68f94d3594d50b0706483))
* **badge:** add min-inline-size (VIV-1403) ([#1448](https://github.com/Vonage/vivid-3/issues/1448)) ([dc85c29](https://github.com/Vonage/vivid-3/commit/dc85c29c4c7f4621e09376541acdd4bef61c753b))
* **card:** add appearance (VIV-1161) ([#1439](https://github.com/Vonage/vivid-3/issues/1439)) ([9a8d7d8](https://github.com/Vonage/vivid-3/commit/9a8d7d868787af1d18fab3687f3f397ac4bd4fff))
* **split-button:** add attribute for indicator aria-label and localize default (VIV-1261) ([#1432](https://github.com/Vonage/vivid-3/issues/1432)) ([bb4cb62](https://github.com/Vonage/vivid-3/commit/bb4cb62ee205bb7330b94e12c9202fa651754d25))


### Bug Fixes

* a11y error on tabs ([6b3750b](https://github.com/Vonage/vivid-3/commit/6b3750b7c456afcd4c0ed41e0878cc61004bd61f))
* **alert:** accessability (VIV-1381) ([#1443](https://github.com/Vonage/vivid-3/issues/1443)) ([f27706b](https://github.com/Vonage/vivid-3/commit/f27706b33eac482f59c2d5c7b32e25e8f4cb5e26))
* **banner:** accessibility (VIV-1384) ([#1444](https://github.com/Vonage/vivid-3/issues/1444)) ([0eb3c99](https://github.com/Vonage/vivid-3/commit/0eb3c99a1d0881ba25c83ee2705973a284c9b2d1))
* **button:** correct padding and size when only slotted icon (VIV-1398) ([#1442](https://github.com/Vonage/vivid-3/issues/1442)) ([e1a31a9](https://github.com/Vonage/vivid-3/commit/e1a31a9740af4ed196bfaaf48b7186e16f4a82a2))
* **menu-item:** update checkbox and radio icons to fit figma (VIV-1318) ([#1397](https://github.com/Vonage/vivid-3/issues/1397)) ([3fac98c](https://github.com/Vonage/vivid-3/commit/3fac98cf82dc90e1ba4e8636d78fca24b96739d9))
* **selectable-box:** keypress when not clickable (VIV-1380) ([#1436](https://github.com/Vonage/vivid-3/issues/1436)) ([e3932cd](https://github.com/Vonage/vivid-3/commit/e3932cdf880fe4ee363e34fe4b6f9e65d257e8ef))
* **select:** aria-label repeating the label text in screenreader and not updating when changed dynamically (VIV-1379) ([#1440](https://github.com/Vonage/vivid-3/issues/1440)) ([040652f](https://github.com/Vonage/vivid-3/commit/040652f8d86c4af9008259619d273d703d56a453))
* **side-drawer:** side drawer accessibility (VIV-1270) ([#1433](https://github.com/Vonage/vivid-3/issues/1433)) ([a60905c](https://github.com/Vonage/vivid-3/commit/a60905cd4312d9f1022b530fc80633b875dbce93))
* **switch:** read-only and disabled style (VIV-1382) ([#1445](https://github.com/Vonage/vivid-3/issues/1445)) ([ab8b776](https://github.com/Vonage/vivid-3/commit/ab8b77618e70622d79c2298655fa0b17814ac35a))
* **tabs:** a11y error on tabs (VIV-1394) ([#1455](https://github.com/Vonage/vivid-3/issues/1455)) ([6b3750b](https://github.com/Vonage/vivid-3/commit/6b3750b7c456afcd4c0ed41e0878cc61004bd61f))
* **text-field:** fix errors in non-DOM or JSDOM environments (VIV-1393) ([#1451](https://github.com/Vonage/vivid-3/issues/1451)) ([92c20c1](https://github.com/Vonage/vivid-3/commit/92c20c1b089800a3daceb8f17f7d81b8605642ea))

## [3.40.0](https://github.com/Vonage/vivid-3/compare/vivid-v3.39.0...vivid-v3.40.0) (2023-10-31)


### Features

* **data-grid-cell:** emit sort event on enter and space (VIV-1233) ([#1430](https://github.com/Vonage/vivid-3/issues/1430)) ([42e641f](https://github.com/Vonage/vivid-3/commit/42e641fda7997296aa1c1384bde57c4b058fb88e))
* **date-range-picker:** dual calendar view (VIV-1339) ([#1415](https://github.com/Vonage/vivid-3/issues/1415)) ([b3b2233](https://github.com/Vonage/vivid-3/commit/b3b2233e637348959755623b2d260c01616f5ccd))
* **selectable-box:** add component (VIV-1173) ([#1417](https://github.com/Vonage/vivid-3/issues/1417)) ([fb52330](https://github.com/Vonage/vivid-3/commit/fb523309a558ad86526688693c2063073a9ce725))
* **slider:** add cta connotation (VIV-1373) ([#1429](https://github.com/Vonage/vivid-3/issues/1429)) ([7791d80](https://github.com/Vonage/vivid-3/commit/7791d80c4b2d7190ee886b817fca99598d722111))


### Bug Fixes

* **a11y:** adds a11y attributes to fulfil axe tests (VIV-1361) ([#1426](https://github.com/Vonage/vivid-3/issues/1426)) ([3a2246c](https://github.com/Vonage/vivid-3/commit/3a2246c9a662d93a18e6de9ec909f9458ee94d40))
* **banner:** set display: block to host (VIV-1357) ([#1419](https://github.com/Vonage/vivid-3/issues/1419)) ([a2b5a45](https://github.com/Vonage/vivid-3/commit/a2b5a45eb353c3a6485a8dec0f7199a3520bc590))
* **checkbox:** add display: flex to host (VIV-1293) ([#1423](https://github.com/Vonage/vivid-3/issues/1423)) ([75dcfe5](https://github.com/Vonage/vivid-3/commit/75dcfe550703f22755009bb7d2ef37a4002d0c3c))
* **components:** fix min/maxlength validation (VIV-1174) ([#1420](https://github.com/Vonage/vivid-3/issues/1420)) ([d940074](https://github.com/Vonage/vivid-3/commit/d940074730a23cb0c88e4c55cc4cd3a3d0eb7dd5))
* **data-grid:** fix focus appearance (VIV-1336) ([#1422](https://github.com/Vonage/vivid-3/issues/1422)) ([006b561](https://github.com/Vonage/vivid-3/commit/006b561f4c87ce3665f26b4a7a62773a1f14fe93))
* **data-grid:** sticky header background color when row-select (VIV-1365) ([#1421](https://github.com/Vonage/vivid-3/issues/1421)) ([8eb17d9](https://github.com/Vonage/vivid-3/commit/8eb17d9c740a2810f663c7b13705a933e077dd1e))
* **menu:** fix error when there are no menu items (VIV-1368) ([#1424](https://github.com/Vonage/vivid-3/issues/1424)) ([4eb89c3](https://github.com/Vonage/vivid-3/commit/4eb89c3745af25ea1bf76c4466a34a843caf0815))
* **text-field:** fix text field not supporting autofill from certain password managers (VIV-1353) ([#1408](https://github.com/Vonage/vivid-3/issues/1408)) ([2dfb1a0](https://github.com/Vonage/vivid-3/commit/2dfb1a005eb5105e0d716320cec3cf903043d46c))

## [3.39.0](https://github.com/Vonage/vivid-3/compare/vivid-v3.38.0...vivid-v3.39.0) (2023-10-17)


### Features

* **menu-item:** support tick-only appearance (VIV-1222) ([#1404](https://github.com/Vonage/vivid-3/issues/1404)) ([ac3c132](https://github.com/Vonage/vivid-3/commit/ac3c13288f35648c42789a49591adef7318873ea))

## [3.38.0](https://github.com/Vonage/vivid-3/compare/vivid-v3.37.0...vivid-v3.38.0) (2023-10-11)


### Features

* **button:** add icon slot (VIV-1340) ([#1403](https://github.com/Vonage/vivid-3/issues/1403)) ([8ba169c](https://github.com/Vonage/vivid-3/commit/8ba169c6934a5b224714af9d726b44338a48cd57))
* **date-picker:** update design (VIV-1327) ([#1385](https://github.com/Vonage/vivid-3/issues/1385)) ([d074936](https://github.com/Vonage/vivid-3/commit/d0749364cd89ec3448483d7048703e608ac1f886))
* **date-range-picker:** add component (VIV-1283) ([#1395](https://github.com/Vonage/vivid-3/issues/1395)) ([b07e852](https://github.com/Vonage/vivid-3/commit/b07e852ef774361cb97733853892396dd80890e9))
* **file-picker:** add support for form association (VIV-802) ([#1381](https://github.com/Vonage/vivid-3/issues/1381)) ([3a843dd](https://github.com/Vonage/vivid-3/commit/3a843dda45b60db2bd56c9c1309dca1766830696))
* **nav-item:** add icon slot(VIV-1303) ([#1390](https://github.com/Vonage/vivid-3/issues/1390)) ([9b0cea7](https://github.com/Vonage/vivid-3/commit/9b0cea7a00322c6483a54ae31f08231c06b143c1))
* **note:** add icon slot (VIV-1337) ([#1393](https://github.com/Vonage/vivid-3/issues/1393)) ([f35dbdd](https://github.com/Vonage/vivid-3/commit/f35dbdd1f9615d97171aa228cf52f5534b66834e))


### Bug Fixes

* **data-grid:** update divider color (VIV-1291) ([#1398](https://github.com/Vonage/vivid-3/issues/1398)) ([a77039c](https://github.com/Vonage/vivid-3/commit/a77039c0ad413b07b957d8f166a0ace34e366cca))
* **dialog:** prevent close when clicking inside and mouseup outside (VIV-1346) ([#1399](https://github.com/Vonage/vivid-3/issues/1399)) ([adc427e](https://github.com/Vonage/vivid-3/commit/adc427e370c5120a9aa3b383871c5bea4137c2d2))
* **disabled:** adds a consistent cursor to disabled elements (VIV-999) ([#1401](https://github.com/Vonage/vivid-3/issues/1401)) ([588f2f3](https://github.com/Vonage/vivid-3/commit/588f2f3b9a74167484c9ac382b171090eed5458c))
* **pagination:** fix numbers getting cut off when &gt; 999 pages (VIV-1320) ([#1400](https://github.com/Vonage/vivid-3/issues/1400)) ([782ce59](https://github.com/Vonage/vivid-3/commit/782ce59b3a8b57d2cb4a21f9b41bc342a2921677))

## [3.37.0](https://github.com/Vonage/vivid-3/compare/vivid-v3.36.0...vivid-v3.37.0) (2023-09-25)


### Features

* **accordion-item and tree-item:** add icon slot (VIV-1323) ([#1383](https://github.com/Vonage/vivid-3/issues/1383)) ([1b3954f](https://github.com/Vonage/vivid-3/commit/1b3954fa804fc0fae49b1dee1d53231faab9021d))
* **banner and badge:** add icon slot (VIV-1302) ([#1386](https://github.com/Vonage/vivid-3/issues/1386)) ([fec4495](https://github.com/Vonage/vivid-3/commit/fec4495663ae1743367e4da0f9e9f614d61ceddd))
* **date-picker:** add support for form association (VIV-1272) ([#1377](https://github.com/Vonage/vivid-3/issues/1377)) ([070ad49](https://github.com/Vonage/vivid-3/commit/070ad49ad8317e24c92d007347d3e64d13d1a31a))
* **fab:** add icon slot and slot observer in affix pattern (VIV-1310) ([#1380](https://github.com/Vonage/vivid-3/issues/1380)) ([3f22512](https://github.com/Vonage/vivid-3/commit/3f22512721217aa042bb7bb2bd738aa11ca2d123))
* **number-field:** add error text handling to number-field (VIV-1316) ([#1391](https://github.com/Vonage/vivid-3/issues/1391)) ([ff143ae](https://github.com/Vonage/vivid-3/commit/ff143ae3a4cd25d627d5c259eaa0e8552c5eedc5))


### Bug Fixes

* **menu:** align chevron when submenu (VIV-1330) ([#1387](https://github.com/Vonage/vivid-3/issues/1387)) ([62647db](https://github.com/Vonage/vivid-3/commit/62647db05a4b58558503a171c17c53a12a73e710))
* **nav-disclosure, fab, tab:** add slot annotations (VIV-000) ([#1378](https://github.com/Vonage/vivid-3/issues/1378)) ([b948664](https://github.com/Vonage/vivid-3/commit/b948664517990165b0ac437585abb452b1294e15))
* **number-field:** can now accept decimals and negative values from user (VIV-1326) ([#1384](https://github.com/Vonage/vivid-3/issues/1384)) ([6f946e4](https://github.com/Vonage/vivid-3/commit/6f946e40dd715b6be171a25574adeeafee42bb34))

## [3.36.0](https://github.com/Vonage/vivid-3/compare/vivid-v3.35.0...vivid-v3.36.0) (2023-09-13)


### Features

* **menu-item:** add submenu (VIV-1230) ([#1359](https://github.com/Vonage/vivid-3/issues/1359)) ([f915c01](https://github.com/Vonage/vivid-3/commit/f915c01d7972f97b315748fdbcad166d351fe2f3))
* **nav-disclosure:** add icon slot (VIV-1289) ([#1367](https://github.com/Vonage/vivid-3/issues/1367)) ([8181b3a](https://github.com/Vonage/vivid-3/commit/8181b3a8e933ab25bece1e56ab8b9d83f19d07cf))
* **tab, tag:** add icon slot (VIV-1305) ([#1372](https://github.com/Vonage/vivid-3/issues/1372)) ([fb9e5f9](https://github.com/Vonage/vivid-3/commit/fb9e5f927f463d739cd9adf492a04a94418c9c27))


### Bug Fixes

* **form-elements:** fix validation logic (VIV-1287) ([#1358](https://github.com/Vonage/vivid-3/issues/1358)) ([99df5e4](https://github.com/Vonage/vivid-3/commit/99df5e491f9d0857b76bb405983b54869ba0589d))
* **tabs:** style (VIV-1170) ([#1369](https://github.com/Vonage/vivid-3/issues/1369)) ([4ab33c8](https://github.com/Vonage/vivid-3/commit/4ab33c8395e48058b6a1debbbbddf5ce2c6e21b2))
* **tree-item:** fix hover contrast ([95caf59](https://github.com/Vonage/vivid-3/commit/95caf591c91b567ee5444fc8c87b230185b0f54b))
* **tree-item:** fix hover contrast (VIV-1267) ([#1370](https://github.com/Vonage/vivid-3/issues/1370)) ([95caf59](https://github.com/Vonage/vivid-3/commit/95caf591c91b567ee5444fc8c87b230185b0f54b))

## [3.35.0](https://github.com/Vonage/vivid-3/compare/vivid-v3.34.0...vivid-v3.35.0) (2023-09-06)


### Features

* **avatar:** add subtle appearance (VIV-1229) ([#1365](https://github.com/Vonage/vivid-3/issues/1365)) ([95eb886](https://github.com/Vonage/vivid-3/commit/95eb88698ecf80a11a37b7932ad15694103059a9))


### Bug Fixes

* **progress-ring:** add missing size attr (VIV-1298) ([#1363](https://github.com/Vonage/vivid-3/issues/1363)) ([71d501f](https://github.com/Vonage/vivid-3/commit/71d501ffd08af4256d82a03e45e29b07e74bfa44))

## [3.34.0](https://github.com/Vonage/vivid-3/compare/vivid-v3.33.0...vivid-v3.34.0) (2023-09-04)


### Features

* **date-picker:** add min and max attributes (VIV-1273) ([#1353](https://github.com/Vonage/vivid-3/issues/1353)) ([a2df190](https://github.com/Vonage/vivid-3/commit/a2df190a60f82597987168c53dcc62feeb23ee88))
* **listbox:** add shape and orientation (VIV-863) ([#1345](https://github.com/Vonage/vivid-3/issues/1345)) ([a8e2297](https://github.com/Vonage/vivid-3/commit/a8e2297eef3ca98676490ba2f2b6b3e59487e133))
* **text-field:** leading action-items slot (VIV-1239)  ([#1351](https://github.com/Vonage/vivid-3/issues/1351)) ([6705702](https://github.com/Vonage/vivid-3/commit/6705702faa6759e4f3795b9d00abbc7c6aa7e94a))


### Bug Fixes

* **menu-item:** add default menuitem role (VIV-1219) ([#1360](https://github.com/Vonage/vivid-3/issues/1360)) ([ddd25f9](https://github.com/Vonage/vivid-3/commit/ddd25f953c288d036263b7efe39fed912d1627b9))
* **menu:** hide body if no menu-items are slotted (VIV-1269) ([#1355](https://github.com/Vonage/vivid-3/issues/1355)) ([c031c79](https://github.com/Vonage/vivid-3/commit/c031c79768a0c0079dc61fd01eed470b5773410b))
* **menu:** set inline-size of max-content (VIV-1255) ([#1313](https://github.com/Vonage/vivid-3/issues/1313)) ([772f624](https://github.com/Vonage/vivid-3/commit/772f624d63aa5e7ddd134dc84ebbded54a899ae6))

## [3.33.0](https://github.com/Vonage/vivid-3/compare/vivid-v3.32.0...vivid-v3.33.0) (2023-08-24)


### Features

* **checkbox:** add default slot (VIV-1088) ([#1340](https://github.com/Vonage/vivid-3/issues/1340)) ([7ba1088](https://github.com/Vonage/vivid-3/commit/7ba1088c7c9559e17e4b8a7f7ee3c9fc9f949b19))
* **docs:** add locale switcher (VIV-1274) ([#1342](https://github.com/Vonage/vivid-3/issues/1342)) ([1e0a12f](https://github.com/Vonage/vivid-3/commit/1e0a12fc1dcc6d722f85d1898e5598b050715f0c))


### Bug Fixes

* **number-field:** add wrapper for focus issues(VIV-1280) ([#1352](https://github.com/Vonage/vivid-3/issues/1352)) ([3d0fe55](https://github.com/Vonage/vivid-3/commit/3d0fe55371f34312add4a270386c3fc1ca71fac7))

## [3.32.0](https://github.com/Vonage/vivid-3/compare/vivid-v3.31.0...vivid-v3.32.0) (2023-08-22)


### Features

* **date-picker:** add date-picker component (VIV-1244) ([#1324](https://github.com/Vonage/vivid-3/issues/1324)) ([977467b](https://github.com/Vonage/vivid-3/commit/977467bc0c36a9fb2fb84d7153b9fb1fdc467014))
* **select:** add placeholder (VIV-1242) ([#1333](https://github.com/Vonage/vivid-3/issues/1333)) ([f420941](https://github.com/Vonage/vivid-3/commit/f4209412ebbdd4e38a36dca3fad2ccc3a0a0b4d0))


### Bug Fixes

* **button:** title not getting its value (VIV-1271) ([#1336](https://github.com/Vonage/vivid-3/issues/1336)) ([3a370b3](https://github.com/Vonage/vivid-3/commit/3a370b3068f4df2af738a3f74fe60c6e1dafe4b9))
* **date-picker:** ui -tests (VIV-000) ([#1344](https://github.com/Vonage/vivid-3/issues/1344)) ([40be4d7](https://github.com/Vonage/vivid-3/commit/40be4d79c1f6bbf2cb7b6ee82619e571d290df19))

## [3.31.0](https://github.com/Vonage/vivid-3/compare/vivid-v3.30.0...vivid-v3.31.0) (2023-08-17)


### Features

* **nav-disclosure:** add aria-current (VIV-893) ([#1321](https://github.com/Vonage/vivid-3/issues/1321)) ([ce987d2](https://github.com/Vonage/vivid-3/commit/ce987d2755433aeed6911f5d723730100ca92ef9))
* **pagination:** add shape (VIV-1062) ([#1328](https://github.com/Vonage/vivid-3/issues/1328)) ([8f02493](https://github.com/Vonage/vivid-3/commit/8f024935ca5dc723612661729ccbf5484d7d6edc))


### Bug Fixes

* **button:** button full width (VIV-1266) ([#1335](https://github.com/Vonage/vivid-3/issues/1335)) ([29ac010](https://github.com/Vonage/vivid-3/commit/29ac01036f36083cef15e806a0019e24c41bfc62))
* **focus:** hide native focus-visible outline (VIV-1257) ([#1327](https://github.com/Vonage/vivid-3/issues/1327)) ([d81a227](https://github.com/Vonage/vivid-3/commit/d81a2272b89af2eadfe3e7ebe1800812ee39c7b2))
* **pagination:** outline  use-case (VIV-1063) ([#1331](https://github.com/Vonage/vivid-3/issues/1331)) ([4902c92](https://github.com/Vonage/vivid-3/commit/4902c923f009f720f77785d0aed9942ad779cf1c))

## [3.30.0](https://github.com/Vonage/vivid-3/compare/vivid-v3.29.0...vivid-v3.30.0) (2023-08-14)


### Features

* **split-button:** add new component (VIV-786) ([#1297](https://github.com/Vonage/vivid-3/issues/1297)) ([f5576ee](https://github.com/Vonage/vivid-3/commit/f5576eef4a579235f7c41975019f9a6a9a89c120))

## [3.29.0](https://github.com/Vonage/vivid-3/compare/vivid-v3.28.2...vivid-v3.29.0) (2023-08-09)


### Features

* **menu:** add non-bubbling open and close events (VIV-1258) ([#1320](https://github.com/Vonage/vivid-3/issues/1320)) ([043713c](https://github.com/Vonage/vivid-3/commit/043713ced6cb2241bfafc7ae228d614a853ce55e))


### Bug Fixes

* **menu:** add slot annotations (VIV-000) ([#1317](https://github.com/Vonage/vivid-3/issues/1317)) ([29c6bd3](https://github.com/Vonage/vivid-3/commit/29c6bd3f97ab1bbcb38adbad1141341c79855699))

## [3.28.2](https://github.com/Vonage/vivid-3/compare/vivid-v3.28.1...vivid-v3.28.2) (2023-08-07)


### Bug Fixes

* **cd:** add postinstall to the build process (VIV-000) ([#1315](https://github.com/Vonage/vivid-3/issues/1315)) ([59ddc63](https://github.com/Vonage/vivid-3/commit/59ddc63920433a4116d011005040ae67252439a0))

## [3.28.1](https://github.com/Vonage/vivid-3/compare/vivid-v3.28.0...vivid-v3.28.1) (2023-08-07)


### Bug Fixes

* **menu-item:** add meta slot annotation (VIV-000) ([#1298](https://github.com/Vonage/vivid-3/issues/1298)) ([7c9342c](https://github.com/Vonage/vivid-3/commit/7c9342c40b3cefd69f3cf48205fb855836654798))

## [3.28.0](https://github.com/Vonage/vivid-3/compare/vivid-v3.27.0...vivid-v3.28.0) (2023-08-07)


### Features

* **data-grid:** custom columns widths (VIV-1252) ([#1312](https://github.com/Vonage/vivid-3/issues/1312)) ([0b0bfa9](https://github.com/Vonage/vivid-3/commit/0b0bfa979a43fae8dbc2abd62c9bc4af6cdd8771))


### Bug Fixes

* **menu:** HTMLelement anchor support and fix on first time added (VIV-1245) (VIV-1246) ([#1293](https://github.com/Vonage/vivid-3/issues/1293)) ([5bb206f](https://github.com/Vonage/vivid-3/commit/5bb206f0952ae9f72c0c4eaf15aa65786b75f3a2))

## [3.27.0](https://github.com/Vonage/vivid-3/compare/vivid-v3.26.0...vivid-v3.27.0) (2023-08-02)


### Features

* **file-picker:** add file-picker component (VIV-962) ([#1284](https://github.com/Vonage/vivid-3/issues/1284)) ([e268879](https://github.com/Vonage/vivid-3/commit/e2688796f0cb87d2e392071494d0a2d8ea8b8bed))
* **menu:** add header and action items slots (VIV-947) ([#1285](https://github.com/Vonage/vivid-3/issues/1285)) ([dc11870](https://github.com/Vonage/vivid-3/commit/dc11870b4749ea9e8edacfe15b26d7fa6c0dfccd))


### Bug Fixes

* **button:** set title on button when is set on host (VIV-1249) ([#1294](https://github.com/Vonage/vivid-3/issues/1294)) ([6ba8bc1](https://github.com/Vonage/vivid-3/commit/6ba8bc1b0ca27053146efe83015f94ec10968187))
* **menu-item:** make the slot available to all roles (VIV-1236) ([#1292](https://github.com/Vonage/vivid-3/issues/1292)) ([f0c74a8](https://github.com/Vonage/vivid-3/commit/f0c74a84ffc40d5a4708700b4077e63d382680fc))
* **nav-item:** word-break (VIV-1238) ([#1290](https://github.com/Vonage/vivid-3/issues/1290)) ([dada919](https://github.com/Vonage/vivid-3/commit/dada9197f136aa6242065fe23940bcc21eeb29a3))

## [3.26.0](https://github.com/Vonage/vivid-3/compare/vivid-v3.25.0...vivid-v3.26.0) (2023-07-25)


### Features

* **data-grid:** add sorting design and usage example (VIV-1072) ([#1278](https://github.com/Vonage/vivid-3/issues/1278)) ([b3d2821](https://github.com/Vonage/vivid-3/commit/b3d28215cf882a4bce1490d1459e5cc837b84060))
* **data-grid:** enable sorting with rows data (VIV-1223) ([#1281](https://github.com/Vonage/vivid-3/issues/1281)) ([83094fb](https://github.com/Vonage/vivid-3/commit/83094fb8a8478d6cc27b3cf87bf5239213a43388))


### Bug Fixes

* **elevation, listbox:** remove export from underlying components (VIV-1221) ([#1279](https://github.com/Vonage/vivid-3/issues/1279)) ([a21e8d9](https://github.com/Vonage/vivid-3/commit/a21e8d9902a019bbda3103da0a49f5b4caa38661))
* **select:** change popup position to static when multiple (VIV-1218) ([#1283](https://github.com/Vonage/vivid-3/issues/1283)) ([bc3a6f6](https://github.com/Vonage/vivid-3/commit/bc3a6f66bcc549d7e98a43df397166c337b80b96))
* **text-filed:** nicer visual focus with slotted action items (VIV-1224) ([#1280](https://github.com/Vonage/vivid-3/issues/1280)) ([39c628b](https://github.com/Vonage/vivid-3/commit/39c628b955446f50db7572e72ad9685ca72db0f3))

## [3.25.0](https://github.com/Vonage/vivid-3/compare/vivid-v3.24.0...vivid-v3.25.0) (2023-07-20)


### Features

* **menu-item:** allow default action when role is presentation (VIV-1183) ([#1272](https://github.com/Vonage/vivid-3/issues/1272)) ([b5be287](https://github.com/Vonage/vivid-3/commit/b5be287a56205084b18f14629c1b49c8cd230137))
* **text field:** add action-items slot (VIV-1188) ([#1270](https://github.com/Vonage/vivid-3/issues/1270)) ([ebbd0e4](https://github.com/Vonage/vivid-3/commit/ebbd0e4d9c4a176a9ebc1284eb43bcdc35b79102))


### Bug Fixes

* **action-group:** remove popup example (VIV-1206) ([#1265](https://github.com/Vonage/vivid-3/issues/1265)) ([8d4bce9](https://github.com/Vonage/vivid-3/commit/8d4bce999e4b3c657df9084b64a28ff3a76a11f6))
* **checkbox:** add [@internal](https://github.com/internal) (VIV-1207) ([#1266](https://github.com/Vonage/vivid-3/issues/1266)) ([513ce17](https://github.com/Vonage/vivid-3/commit/513ce173b7a8711e1fa0105a2c0be19fb94e6552))
* **components:** fix wrong appearance definition (VIV-1210) ([#1271](https://github.com/Vonage/vivid-3/issues/1271)) ([b747f5a](https://github.com/Vonage/vivid-3/commit/b747f5ad8080a4b9de102e6c3c34f389e51cb59b))
* **data-grid:** prevent non-enumarable in columndefs (VIV-1208) ([#1268](https://github.com/Vonage/vivid-3/issues/1268)) ([820d368](https://github.com/Vonage/vivid-3/commit/820d36843b104dbc8b008435b8798f96ec83a723))
* **dialog:** fix modal dialog not being fixed (VIV-1193) ([#1256](https://github.com/Vonage/vivid-3/issues/1256)) ([7d991c7](https://github.com/Vonage/vivid-3/commit/7d991c79c97529b3291ab269644f4ba7ce6daaa6))
* **elevation:** adding isolation (VIV-1217) ([#1277](https://github.com/Vonage/vivid-3/issues/1277)) ([3e2db8b](https://github.com/Vonage/vivid-3/commit/3e2db8ba34f69ae36f24e69a91f6676204564972))
* **nav-disclosure:** prevent toggle event from bubbling (VIV-1216) ([#1275](https://github.com/Vonage/vivid-3/issues/1275)) ([e0f1f79](https://github.com/Vonage/vivid-3/commit/e0f1f79e8485b2915abee512cdadf7138c15ebfe))

## [3.24.0](https://github.com/Vonage/vivid-3/compare/vivid-v3.23.0...vivid-v3.24.0) (2023-07-13)


### Features

* **data-grid:** enable generateHeader for manually added rows (VIV-1205) ([#1262](https://github.com/Vonage/vivid-3/issues/1262)) ([01a13df](https://github.com/Vonage/vivid-3/commit/01a13df4a6b66a98eced316b703ae176641daea2))

## [3.23.0](https://github.com/Vonage/vivid-3/compare/vivid-v3.22.1...vivid-v3.23.0) (2023-07-13)


### Features

* **dialog:** add action-items slot (VIV-1141) ([#1236](https://github.com/Vonage/vivid-3/issues/1236)) ([78797be](https://github.com/Vonage/vivid-3/commit/78797be849dc4cb811f8dbfb05753db067957a6c))
* **icon:** update icons set to 4.2.2 (VIV-1178) ([#1258](https://github.com/Vonage/vivid-3/issues/1258)) ([44816e4](https://github.com/Vonage/vivid-3/commit/44816e45c7935a65ecc40a27c16f14bfba99b397))


### Bug Fixes

* **docs:** refine docs (VIV-1197) ([#1260](https://github.com/Vonage/vivid-3/issues/1260)) ([6d97ddb](https://github.com/Vonage/vivid-3/commit/6d97ddb17ea84957c084cafa7629dbf83e72661f))
* **popup:** add namespace to open and close events (VIV-1198) ([#1259](https://github.com/Vonage/vivid-3/issues/1259)) ([7d4ffe4](https://github.com/Vonage/vivid-3/commit/7d4ffe4f8f1c03ba064f576df299becdc52f5e86))
* **text-area:** fix base width (VIV-1061) ([#1249](https://github.com/Vonage/vivid-3/issues/1249)) ([bc8f893](https://github.com/Vonage/vivid-3/commit/bc8f8937d6e23d74d25a8a2ad7d7b1078bc6e57f))

## [3.22.1](https://github.com/Vonage/vivid-3/compare/vivid-v3.22.0...vivid-v3.22.1) (2023-07-10)


### Bug Fixes

* **data-grid:** add scroll (VIV-1180) ([#1248](https://github.com/Vonage/vivid-3/issues/1248)) ([c2d6620](https://github.com/Vonage/vivid-3/commit/c2d6620e68010b806cd5fd5d70c9aacca958b4cd))
* **data-grid:** cell ellipsis and sticky header background-color variable (VIV-1118) ([#1239](https://github.com/Vonage/vivid-3/issues/1239)) ([d1d49fe](https://github.com/Vonage/vivid-3/commit/d1d49fe532cdd1b26c5aebea134cecd5c5dbe3c2))
* **tabs:** tabs now scroll only inside the tabs (VIV-1191) ([#1253](https://github.com/Vonage/vivid-3/issues/1253)) ([7181483](https://github.com/Vonage/vivid-3/commit/7181483792498528b3ea8ef6165bc197ba31c260))
* **tsdoc:** lint warnings (VIV-1182) ([#1245](https://github.com/Vonage/vivid-3/issues/1245)) ([8aed786](https://github.com/Vonage/vivid-3/commit/8aed78620bdeca27ee5bdf8632112d590349a8a3))

## [3.22.0](https://github.com/Vonage/vivid-3/compare/vivid-v3.21.2...vivid-v3.22.0) (2023-07-04)


### Features

* **radio:** add connotation (VIV-1123) ([#1235](https://github.com/Vonage/vivid-3/issues/1235)) ([e2b0a25](https://github.com/Vonage/vivid-3/commit/e2b0a25b0487f99f0d1eabd2d3d72050e2f5c439))
* **tabs:** scroll to active tab (VIV-1172) ([#1238](https://github.com/Vonage/vivid-3/issues/1238)) ([284a55d](https://github.com/Vonage/vivid-3/commit/284a55da878a49861f1829aa096da4046c8282fc))


### Bug Fixes

* **tabs:** prevent tab-panel blowout (VIV-1240) ([#1240](https://github.com/Vonage/vivid-3/issues/1240)) ([df1aa84](https://github.com/Vonage/vivid-3/commit/df1aa84a89cbbff7bfb9ebc3152a7c57807ff1b4))

## [3.21.2](https://github.com/Vonage/vivid-3/compare/vivid-v3.21.1...vivid-v3.21.2) (2023-06-29)


### Bug Fixes

* **tabs:** horizontal and vertical scroll (VIV-1171) ([#1230](https://github.com/Vonage/vivid-3/issues/1230)) ([dc895b5](https://github.com/Vonage/vivid-3/commit/dc895b516e083b416067394529f4667e17ad718c))

## [3.21.1](https://github.com/Vonage/vivid-3/compare/vivid-v3.21.0...vivid-v3.21.1) (2023-06-28)


### Bug Fixes

* **components:** add missing annotations (VIV-000) ([#1231](https://github.com/Vonage/vivid-3/issues/1231)) ([d670fbf](https://github.com/Vonage/vivid-3/commit/d670fbfa9266caa1394097b3914f5df859f7bb15))

## [3.21.0](https://github.com/Vonage/vivid-3/compare/vivid-v3.20.0...vivid-v3.21.0) (2023-06-28)


### Features

* **icon:** faster icon load time (VIV-1166) ([#1227](https://github.com/Vonage/vivid-3/issues/1227)) ([446bdb3](https://github.com/Vonage/vivid-3/commit/446bdb30cf03f89e4177e35bf17258fcaf599f46))
* **icon:** update icons set to 4.2.1 (VIV-1158) ([#1228](https://github.com/Vonage/vivid-3/issues/1228)) ([5e6ed8d](https://github.com/Vonage/vivid-3/commit/5e6ed8d0b8d92e29e7efa9c8d132bb23b5fe3e68))
* **nav-item:** add meta slot (VIV-1097) ([#1173](https://github.com/Vonage/vivid-3/issues/1173)) ([3ebc8a5](https://github.com/Vonage/vivid-3/commit/3ebc8a5798b3420d8b4d689dbf9e9e01fb6c913b))
* **tab:** rounded shape (VIV-1129) ([#1229](https://github.com/Vonage/vivid-3/issues/1229)) ([cb37450](https://github.com/Vonage/vivid-3/commit/cb37450aa4b0eec778af8f4450fe094e81b8bdcd))


### Bug Fixes

* **combobox:** add properties documentation (VIV-1142) ([#1219](https://github.com/Vonage/vivid-3/issues/1219)) ([481be3f](https://github.com/Vonage/vivid-3/commit/481be3f0d18747b31848bd77458b7eb2b11143e9))
* **menu:** block-size (VIV-1165) ([#1225](https://github.com/Vonage/vivid-3/issues/1225)) ([d7ac062](https://github.com/Vonage/vivid-3/commit/d7ac06255737fc5304f8be8c0ffa493ada3d6e13))

## [3.20.0](https://github.com/Vonage/vivid-3/compare/vivid-v3.19.0...vivid-v3.20.0) (2023-06-23)


### Features

* **option:** add icon slot to option (VIV-1055) ([#1224](https://github.com/Vonage/vivid-3/issues/1224)) ([99d29b2](https://github.com/Vonage/vivid-3/commit/99d29b252907b2cc0092b3998538bafb6aff4f48))
* **tabs:** cta connotation (VIV-1127) ([#1205](https://github.com/Vonage/vivid-3/issues/1205)) ([3fb238c](https://github.com/Vonage/vivid-3/commit/3fb238c54cf3dafbc3fee539c06c6bd6fb230541))


### Bug Fixes

* **popup:** arrow position issue (VIV-1052) ([#1197](https://github.com/Vonage/vivid-3/issues/1197)) ([276ea63](https://github.com/Vonage/vivid-3/commit/276ea63f936905e831afae8d49a64de584c1064c))

## [3.19.0](https://github.com/Vonage/vivid-3/compare/vivid-v3.18.1...vivid-v3.19.0) (2023-06-21)


### Features

* **select:** add icon slot to select (VIV-1054) ([#1166](https://github.com/Vonage/vivid-3/issues/1166)) ([0b8a23c](https://github.com/Vonage/vivid-3/commit/0b8a23ce366fbbdca99dcd63e1684265b4c9d884))


### Bug Fixes

* **header:** enable setting bg-color (VIV-1156) ([#1217](https://github.com/Vonage/vivid-3/issues/1217)) ([51b6c4f](https://github.com/Vonage/vivid-3/commit/51b6c4fa4932dfbf284696499549fd4ac2e12e83))

## [3.18.1](https://github.com/Vonage/vivid-3/compare/vivid-v3.18.0...vivid-v3.18.1) (2023-06-20)


### Bug Fixes

* **card:** inner wrapper height inherit(VIV-1151) ([#1213](https://github.com/Vonage/vivid-3/issues/1213)) ([c7081ee](https://github.com/Vonage/vivid-3/commit/c7081eed7acb90f2a8aab9bdb952b9f14b064cb2))
* **components:** align icon vertically (VIV-1146) ([#1211](https://github.com/Vonage/vivid-3/issues/1211)) ([9267cb9](https://github.com/Vonage/vivid-3/commit/9267cb94fd13398bb11aed8852061e38086ddd57))

## [3.18.0](https://github.com/Vonage/vivid-3/compare/vivid-v3.17.0...vivid-v3.18.0) (2023-06-19)


### Features

* **menu:** add `auto-dismiss` attribute (VIV-1144) ([#1207](https://github.com/Vonage/vivid-3/issues/1207)) ([ef95a11](https://github.com/Vonage/vivid-3/commit/ef95a11e127e502a1a728a0f69add303fd105858))


### Bug Fixes

* **button:** update pending state (VIV-1113) ([#1190](https://github.com/Vonage/vivid-3/issues/1190)) ([cd34e91](https://github.com/Vonage/vivid-3/commit/cd34e913d5eeeec77a41d752d94db535387cdc1a))

## [3.17.0](https://github.com/Vonage/vivid-3/compare/vivid-v3.16.1...vivid-v3.17.0) (2023-06-12)


### Features

* **checkbox:** cta connotation (VIV-1124) ([#1203](https://github.com/Vonage/vivid-3/issues/1203)) ([ba57146](https://github.com/Vonage/vivid-3/commit/ba57146f005bdfef31e7df64ab229fc992a46c49))
* **select:** select fixed dropdown (VIV-1135) ([#1201](https://github.com/Vonage/vivid-3/issues/1201)) ([9fab89a](https://github.com/Vonage/vivid-3/commit/9fab89ab2f8999a2798ae335214396481a828653))


### Bug Fixes

* **components:** updated CSS for disabled & readonly (VIV-1114) ([#1187](https://github.com/Vonage/vivid-3/issues/1187)) ([4c7f150](https://github.com/Vonage/vivid-3/commit/4c7f150f3602c4acb06f9ef7b248767d055a8c9f))

## [3.16.1](https://github.com/Vonage/vivid-3/compare/vivid-v3.16.0...vivid-v3.16.1) (2023-06-07)


### Bug Fixes

* **tabs:** indicator position in vertical mode (VIV-1132) ([#1199](https://github.com/Vonage/vivid-3/issues/1199)) ([3b74efa](https://github.com/Vonage/vivid-3/commit/3b74efa64dffc8aa0a9b29060bdf725b4eea097b))

## [3.16.0](https://github.com/Vonage/vivid-3/compare/vivid-v3.15.0...vivid-v3.16.0) (2023-06-07)


### Features

* **toggletip:** enable adding anchor element after anchor prop set (VIV-1115) ([#1186](https://github.com/Vonage/vivid-3/issues/1186)) ([4c70b7c](https://github.com/Vonage/vivid-3/commit/4c70b7caacb827a8bb36fc5da82c8f993f5bde98))
* **tooltip:** enable adding anchor element after anchor prop set (VIV-1115) ([#1186](https://github.com/Vonage/vivid-3/issues/1186)) ([4c70b7c](https://github.com/Vonage/vivid-3/commit/4c70b7caacb827a8bb36fc5da82c8f993f5bde98))

## [3.15.0](https://github.com/Vonage/vivid-3/compare/vivid-v3.14.0...vivid-v3.15.0) (2023-06-06)


### Features

* **checkbox:** add helper text and error success message (VIV-1087) ([#1192](https://github.com/Vonage/vivid-3/issues/1192)) ([df9bf51](https://github.com/Vonage/vivid-3/commit/df9bf51ce99b2a81b7d6d8c6c465db25a7d5303b))
* **data-grid:** data grid row selection (VIV-1069) ([#1189](https://github.com/Vonage/vivid-3/issues/1189)) ([ba17b4a](https://github.com/Vonage/vivid-3/commit/ba17b4a99ceaee198de5ae30c7ee22ff33e7aa08))
* **empty-state:** add empty-state (VIV-1060) ([#1169](https://github.com/Vonage/vivid-3/issues/1169)) ([50effb4](https://github.com/Vonage/vivid-3/commit/50effb48c14a7b2964598ec597e54a9d44738668))
* **icon:** update icons set to 4.2.0 (VIV-1122) ([#1195](https://github.com/Vonage/vivid-3/issues/1195)) ([bb6d652](https://github.com/Vonage/vivid-3/commit/bb6d652d2eab473a3cc54b34d3c98c23d4d0789e))
* **nav-disclosure:** add meta slot (VIV-1103) ([#1174](https://github.com/Vonage/vivid-3/issues/1174)) ([5cd00e0](https://github.com/Vonage/vivid-3/commit/5cd00e00d433c9fcbb4bf061ef631156f73eb49a))
* **progress-ring:** -6 size (VIV-1112) ([#1188](https://github.com/Vonage/vivid-3/issues/1188)) ([5086870](https://github.com/Vonage/vivid-3/commit/50868702667b006ea15fb3133147544dd132aa75))
* **tab:** add trailing icon option (VIV-1109) ([#1182](https://github.com/Vonage/vivid-3/issues/1182)) ([be6d65a](https://github.com/Vonage/vivid-3/commit/be6d65a17842604b3263a6b5f046063734a09feb))
* **text-area:** add a char counter (VIV-833) ([#1183](https://github.com/Vonage/vivid-3/issues/1183)) ([b91f6be](https://github.com/Vonage/vivid-3/commit/b91f6bec016a4fb1b797ccb16cbabdc515eda949))


### Bug Fixes

* **icon:** fix icon color (VIV-1101) ([#1175](https://github.com/Vonage/vivid-3/issues/1175)) ([d968318](https://github.com/Vonage/vivid-3/commit/d96831876e38e29bd320ee179a4c3c7f8f87730e))
* **pagination:** add missing export (VIV-000) ([#1191](https://github.com/Vonage/vivid-3/issues/1191)) ([93b56fe](https://github.com/Vonage/vivid-3/commit/93b56fe6158af33a001243341d94a870e5ce3faa))
* **pagination:** add missing import (VIV-000) ([93b56fe](https://github.com/Vonage/vivid-3/commit/93b56fe6158af33a001243341d94a870e5ce3faa))
* **select:** fix select a11y violations (VIV-1099) ([#1179](https://github.com/Vonage/vivid-3/issues/1179)) ([99a5846](https://github.com/Vonage/vivid-3/commit/99a5846085e4fcd1834f8b261c90080ddcee3bd2))

## [3.14.0](https://github.com/Vonage/vivid-3/compare/vivid-v3.13.0...vivid-v3.14.0) (2023-05-30)


### Features

* **data-grid:** data grid cell selection (VIV-1071) ([#1162](https://github.com/Vonage/vivid-3/issues/1162)) ([fc8a607](https://github.com/Vonage/vivid-3/commit/fc8a607ddad903e3fac25a5a2e252d3e08fac1f5))
* **elevation:** moving style to :before pseudo element (VIV-1098) ([#1172](https://github.com/Vonage/vivid-3/issues/1172)) ([9eaeb27](https://github.com/Vonage/vivid-3/commit/9eaeb273129e16db71427bd13d122f0ea994b024))
* **icon:** upgrade icons version (VIV-1094) ([#1168](https://github.com/Vonage/vivid-3/issues/1168)) ([550c8d0](https://github.com/Vonage/vivid-3/commit/550c8d0f525cd4d7cbfba31d23d8157cffd3c769))
* **menu-item:** add slot (VIV-1078) ([#1161](https://github.com/Vonage/vivid-3/issues/1161)) ([d8cc899](https://github.com/Vonage/vivid-3/commit/d8cc89964da80661be8bbdf216a03921496ea798))
* **select:** add meta slot (VIV-1053) ([#1165](https://github.com/Vonage/vivid-3/issues/1165)) ([0836ac6](https://github.com/Vonage/vivid-3/commit/0836ac61d74298f97024793c7817f2e0e3ecc973))
* **select:** success and error message (VIV-1181) ([#1181](https://github.com/Vonage/vivid-3/issues/1181)) ([5e35fa6](https://github.com/Vonage/vivid-3/commit/5e35fa614efacd39a38e16defc8a2bde8bb426cc))
* **tokens:** Add granular component tokens (VIV-1059) ([#1147](https://github.com/Vonage/vivid-3/issues/1147)) ([08d5cd6](https://github.com/Vonage/vivid-3/commit/08d5cd673e0153ef804a6068126862d44201af72))


### Bug Fixes

* **accessibility:** add reference to aria-label in form elements (VIV-959) ([#1170](https://github.com/Vonage/vivid-3/issues/1170)) ([e9a287d](https://github.com/Vonage/vivid-3/commit/e9a287db982cbef3d8d226f6b7bb9f0e177f863c))
* **alert:** complete component (VIV-1038) ([#1164](https://github.com/Vonage/vivid-3/issues/1164)) ([67a54a9](https://github.com/Vonage/vivid-3/commit/67a54a91041f43d542bb928f015c8186ffb73968))
* **tag:** change in style (VIV-1081) ([#1167](https://github.com/Vonage/vivid-3/issues/1167)) ([3ca3134](https://github.com/Vonage/vivid-3/commit/3ca313428e2982ee3bb013c56b71ef9b1373bdc5))
* **tests:** flaky select ui test (VIV-000) ([#1178](https://github.com/Vonage/vivid-3/issues/1178)) ([0121831](https://github.com/Vonage/vivid-3/commit/012183196d8b92a1988bd5baffe4e47315d54d22))

## [3.13.0](https://github.com/Vonage/vivid-3/compare/vivid-v3.12.0...vivid-v3.13.0) (2023-05-17)


### Features

* **components:** toggletip (VIV-865) ([#1137](https://github.com/Vonage/vivid-3/issues/1137)) ([ec3dc40](https://github.com/Vonage/vivid-3/commit/ec3dc4067331cd281185b3e4d71933da852ce8f6))
* **menu-item:** text wrap (VIV-1058) ([#1157](https://github.com/Vonage/vivid-3/issues/1157)) ([b60eb52](https://github.com/Vonage/vivid-3/commit/b60eb52118c0b3ade9763aa1e35db4dae5f735e4))


### Bug Fixes

* **layout:** export RowSpacing property ([befda12](https://github.com/Vonage/vivid-3/commit/befda127cd35ac8d9d6bc2e45b20653328a7488a))
* **layout:** export RowSpacing property (VIV-1076) ([#1155](https://github.com/Vonage/vivid-3/issues/1155)) ([befda12](https://github.com/Vonage/vivid-3/commit/befda127cd35ac8d9d6bc2e45b20653328a7488a))
* **tabs:** make sure `activeid` is always set (VIV-1040) ([#1145](https://github.com/Vonage/vivid-3/issues/1145)) ([5898002](https://github.com/Vonage/vivid-3/commit/5898002bc6f8add7dfb6a3341108bba4d8925062))

## [3.12.0](https://github.com/Vonage/vivid-3/compare/vivid-v3.11.0...vivid-v3.12.0) (2023-05-10)


### Features

* **menu-item:** allow icon and checkbox or radio-button (VIV-1044) ([#1152](https://github.com/Vonage/vivid-3/issues/1152)) ([e7021dd](https://github.com/Vonage/vivid-3/commit/e7021dd27a28dc7b2892a355ea560501c7796a5c))
* **progress:** line color change (VIV-1036) ([#1149](https://github.com/Vonage/vivid-3/issues/1149)) ([d6c40c1](https://github.com/Vonage/vivid-3/commit/d6c40c1ca7b801cc60b8cdf2762801dae202ea8d))

## [3.11.0](https://github.com/Vonage/vivid-3/compare/vivid-v3.10.0...vivid-v3.11.0) (2023-05-08)


### Features

* **appearance:** selected & checked in option and menu-item (VIV-1043) ([#1141](https://github.com/Vonage/vivid-3/issues/1141)) ([aef0304](https://github.com/Vonage/vivid-3/commit/aef03046621c6f7206ee26e526a62ae6766f9fbd))
* **button:** text line break (VIV-1034) ([#1133](https://github.com/Vonage/vivid-3/issues/1133)) ([40e1732](https://github.com/Vonage/vivid-3/commit/40e1732d5e30f9d2457f7967f70148493d88b351))
* **layout:** customized rows and gaps (VIV-1046) ([#1143](https://github.com/Vonage/vivid-3/issues/1143)) ([9a997a5](https://github.com/Vonage/vivid-3/commit/9a997a5329a9f203b86038630df35bcd162cc82b))
* **pagination:** create the pagination component (VIV-964) ([#1146](https://github.com/Vonage/vivid-3/issues/1146)) ([cc18146](https://github.com/Vonage/vivid-3/commit/cc18146018be217ef67571440b6b907657699a0f))


### Bug Fixes

* **banner:** centering content (VIV-1049) ([#1138](https://github.com/Vonage/vivid-3/issues/1138)) ([7fe2caa](https://github.com/Vonage/vivid-3/commit/7fe2caad99e7abf061465344e3d0a4f84ddfdc14))
* **dialog:** drop-shadow tone (VIV-1064) ([#1148](https://github.com/Vonage/vivid-3/issues/1148)) ([99afea9](https://github.com/Vonage/vivid-3/commit/99afea98de0d1d1b20ba1a72b0352e5967b4c123))
* **tag:** active state color (VIV-1016) ([#1142](https://github.com/Vonage/vivid-3/issues/1142)) ([5918ad9](https://github.com/Vonage/vivid-3/commit/5918ad9785bb4308fbeaf141fc33c7326ba33c67))
* **tooltip:** dynamically changing anchor now works as expected (VIV-1045) ([#1139](https://github.com/Vonage/vivid-3/issues/1139)) ([d8b61ca](https://github.com/Vonage/vivid-3/commit/d8b61ca52cb6d35a5361d289ccaade7d50bc8bbf))

## [3.10.0](https://github.com/Vonage/vivid-3/compare/vivid-v3.9.0...vivid-v3.10.0) (2023-04-27)


### Features

* **alert:** migrate component (VIV-1009) ([#1117](https://github.com/Vonage/vivid-3/issues/1117)) ([2de6df1](https://github.com/Vonage/vivid-3/commit/2de6df17ef721b9f08f9b54224e7c3c48f395b61))
* **text-area:** add a way to manually set text-area in error state (VIV-990) ([#1126](https://github.com/Vonage/vivid-3/issues/1126)) ([1532007](https://github.com/Vonage/vivid-3/commit/1532007b935e65bf81c438d1a9c84c9839f509f9))


### Bug Fixes

* **components:** slider change event (VIV-985) ([#1121](https://github.com/Vonage/vivid-3/issues/1121)) ([1bcd85f](https://github.com/Vonage/vivid-3/commit/1bcd85f6261591aa5e0f020851608050aded5aac))
* **tooltip:** hide on Escape (VIV-1017) ([#1129](https://github.com/Vonage/vivid-3/issues/1129)) ([5a926cb](https://github.com/Vonage/vivid-3/commit/5a926cbc822f51028c49f475333bf9822f73d6c4))

## [3.9.0](https://github.com/Vonage/vivid-3/compare/vivid-v3.8.0...vivid-v3.9.0) (2023-04-24)


### Features

* **button:** size and shape in stacked (VIV-1012) ([#1123](https://github.com/Vonage/vivid-3/issues/1123)) ([7f9f8b1](https://github.com/Vonage/vivid-3/commit/7f9f8b1e433fb5348832a7a01e64464fdbdd5c5b))
* **components:** add a way to manually set text-field in error state (VIV-970) ([#1103](https://github.com/Vonage/vivid-3/issues/1103)) ([6af1f2e](https://github.com/Vonage/vivid-3/commit/6af1f2ea5a6b6c90791c0eb3df0c4e73558cc780))
* **popup:** set default z-index of 10 (VIV-1023) ([#1132](https://github.com/Vonage/vivid-3/issues/1132)) ([601dd6f](https://github.com/Vonage/vivid-3/commit/601dd6fca13e0f9778c9657cc7f2b6bb073b93fa))


### Bug Fixes

* **calendar:** failing test on Windows (VIV-000) ([#1125](https://github.com/Vonage/vivid-3/issues/1125)) ([1a4463f](https://github.com/Vonage/vivid-3/commit/1a4463f4e34b121bd32cec6e95f03e993387b198))
* **components:** paused progress with `pacific` connotation (VIV-1003) ([#1122](https://github.com/Vonage/vivid-3/issues/1122)) ([6adc292](https://github.com/Vonage/vivid-3/commit/6adc292c6f74cfb40d2cd5baec54d843ac0ca53c))
* **note:** align-items start in slot (VIV-1024) ([#1127](https://github.com/Vonage/vivid-3/issues/1127)) ([8781633](https://github.com/Vonage/vivid-3/commit/87816330901ebcfe63ec3a84b62f5989145fbc46))
* **popup:** popup inside select (VIV-984) ([#1119](https://github.com/Vonage/vivid-3/issues/1119)) ([11c95b7](https://github.com/Vonage/vivid-3/commit/11c95b7476e8b685f06c90730adffea07211363c))
* **tooltip:** allow setting anchor to an HTMLElement (VIV-1032) ([#1130](https://github.com/Vonage/vivid-3/issues/1130)) ([5f4e34a](https://github.com/Vonage/vivid-3/commit/5f4e34aa1cf6b8747f188a9e4ed0c744481f5a8d))
* **tooltip:** set auto as initial width ([29b10cc](https://github.com/Vonage/vivid-3/commit/29b10cc04ff61a4bf8bda3d2986d03572976cd19))
* **tooltip:** set auto as initial width (VIV-1027) ([#1131](https://github.com/Vonage/vivid-3/issues/1131)) ([29b10cc](https://github.com/Vonage/vivid-3/commit/29b10cc04ff61a4bf8bda3d2986d03572976cd19))

## [3.8.0](https://github.com/Vonage/vivid-3/compare/vivid-v3.7.0...vivid-v3.8.0) (2023-04-18)


### Features

* **button:** add super-condensed size (VIV-871) ([#1115](https://github.com/Vonage/vivid-3/issues/1115)) ([42ee3dc](https://github.com/Vonage/vivid-3/commit/42ee3dcdb816ebcba6f1c139e2865c66bac4f7df))
* **icon:** update icons set to version 4.1.0 (VIV-987) ([#1111](https://github.com/Vonage/vivid-3/issues/1111)) ([2b378c6](https://github.com/Vonage/vivid-3/commit/2b378c641c71135c744dede5d24bda29d8238a7f))
* **icon:** update icons set version (VIV-1011) ([#1120](https://github.com/Vonage/vivid-3/issues/1120)) ([0d05674](https://github.com/Vonage/vivid-3/commit/0d056741e9bd1d30e4deefc616711ada294bf4de))
* **select:** add helper text (VIV-980) ([#1109](https://github.com/Vonage/vivid-3/issues/1109)) ([bd6baa1](https://github.com/Vonage/vivid-3/commit/bd6baa13116de053375d06b416ba6c246570431a))
* **tag-group:** add tag group component (VIV-945) ([#1114](https://github.com/Vonage/vivid-3/issues/1114)) ([1e3cf55](https://github.com/Vonage/vivid-3/commit/1e3cf5585a391d50fb1c44d35b263036fa34aa87))
* **tag:** migrate tag component (VIV-944) ([#1100](https://github.com/Vonage/vivid-3/issues/1100)) ([ee15a08](https://github.com/Vonage/vivid-3/commit/ee15a08e445bafc05487d0b1d14e5ffad07db3bf))


### Bug Fixes

* **badge:** docs (VIV-981) ([#1106](https://github.com/Vonage/vivid-3/issues/1106)) ([1c920e2](https://github.com/Vonage/vivid-3/commit/1c920e2bb55e079979178a99eafaa0288125f157))
* **components:** arrow position for popup (VIV-960) ([#1097](https://github.com/Vonage/vivid-3/issues/1097)) ([4a29828](https://github.com/Vonage/vivid-3/commit/4a29828b8e8dfeab63588434f91d69902e9a1a96))
* **components:** focus indicator when textarea is resized (VIV-905) ([#1099](https://github.com/Vonage/vivid-3/issues/1099)) ([c1889b0](https://github.com/Vonage/vivid-3/commit/c1889b006be89f1d1303a1a8a8e346092d63eefc))
* **components:** text-area resize (VIV-1004) ([#1113](https://github.com/Vonage/vivid-3/issues/1113)) ([b0b7985](https://github.com/Vonage/vivid-3/commit/b0b79858b17d57816926b1984e362a58674b5dca))
* **docs:** hamburger button (VIV-1002) ([#1112](https://github.com/Vonage/vivid-3/issues/1112)) ([0393110](https://github.com/Vonage/vivid-3/commit/0393110e294916d90b7381b161e369efa36db00c))
* **select:** set a default max-height ([729b42c](https://github.com/Vonage/vivid-3/commit/729b42c4ed8a53bfe847bf1c9b3c08b5a8367bf8))
* **select:** set a default max-height (VIV-1014) ([#1118](https://github.com/Vonage/vivid-3/issues/1118)) ([729b42c](https://github.com/Vonage/vivid-3/commit/729b42c4ed8a53bfe847bf1c9b3c08b5a8367bf8))

## [3.7.0](https://github.com/Vonage/vivid-3/compare/vivid-v3.6.0...vivid-v3.7.0) (2023-04-03)


### Features

* **accordion-item:** add size condensed (VIV-883) ([#1093](https://github.com/Vonage/vivid-3/issues/1093)) ([1977ae5](https://github.com/Vonage/vivid-3/commit/1977ae51ff8a73fb4ab8f5c27a94a187c6242701))

## [3.6.0](https://github.com/Vonage/vivid-3/compare/vivid-v3.5.0...vivid-v3.6.0) (2023-03-30)


### Features

* **avatar:** duotone appearance and deprecate outline ([#1074](https://github.com/Vonage/vivid-3/issues/1074)) ([277a19c](https://github.com/Vonage/vivid-3/commit/277a19c7a116afb2a97504786e98dc9c43023526))
* **components:** VIV-881 button pending state ([#1088](https://github.com/Vonage/vivid-3/issues/1088)) ([370fb80](https://github.com/Vonage/vivid-3/commit/370fb80349febf1aee33051f0df87a1af832725e))
* **icon:** update icons version (VIV-951) ([#1091](https://github.com/Vonage/vivid-3/issues/1091)) ([e43a3c9](https://github.com/Vonage/vivid-3/commit/e43a3c9a25edd081c9920ff0224c4d0b1010759d))
* **select:** add icon ([#1076](https://github.com/Vonage/vivid-3/issues/1076)) ([1fccb13](https://github.com/Vonage/vivid-3/commit/1fccb13eaa782195309a4ca400b1b6b556f41f76))


### Bug Fixes

* **doc:** tiny sample fix ([#1086](https://github.com/Vonage/vivid-3/issues/1086)) ([e73decd](https://github.com/Vonage/vivid-3/commit/e73decdc2b06f26e9cd40e7f7b982c33c8a66db8))


### Performance Improvements

* **components:** action group role as group (VIV-897) ([#837](https://github.com/Vonage/vivid-3/issues/837)) ([4e976fc](https://github.com/Vonage/vivid-3/commit/4e976fc023ed129488f47250a2908e2e540222bb))

## [3.5.0](https://github.com/Vonage/vivid-3/compare/vivid-v3.4.0...vivid-v3.5.0) (2023-03-26)


### Features

* **data-grid:** adds selection-mode attribute to the grid ([#1077](https://github.com/Vonage/vivid-3/issues/1077)) ([2bceba8](https://github.com/Vonage/vivid-3/commit/2bceba8d05d7b524d34f3c626c0378b54cdd9edd))


### Bug Fixes

* **components:** proper role for menu anchor ([#1044](https://github.com/Vonage/vivid-3/issues/1044)) ([fa1f12a](https://github.com/Vonage/vivid-3/commit/fa1f12a4afdcfbfbefc02f373e4da4908ab72d68))
* **dialog:** border-radius inherit for slot main ([#1082](https://github.com/Vonage/vivid-3/issues/1082)) ([54aa3a4](https://github.com/Vonage/vivid-3/commit/54aa3a4eeb39ad6d214a98a8559e7c7323048f7c))
* **dialog:** header separator and body full width ([#1071](https://github.com/Vonage/vivid-3/issues/1071)) ([ea56f26](https://github.com/Vonage/vivid-3/commit/ea56f26040abf6fa7b25f5b79dad7c26c173a774))

## [3.4.0](https://github.com/Vonage/vivid-3/compare/vivid-v3.3.0...vivid-v3.4.0) (2023-03-15)


### Features

* **documentation:** live samples ([#1030](https://github.com/Vonage/vivid-3/issues/1030)) ([ed4a88c](https://github.com/Vonage/vivid-3/commit/ed4a88c369937e89d1b6dd3f0e67960363a6eb45))


### Bug Fixes

* **appearance:** duotone color change ([#1051](https://github.com/Vonage/vivid-3/issues/1051)) ([29f58fe](https://github.com/Vonage/vivid-3/commit/29f58fed4737e70b287e09e9b3ff0e7f932ded77))
* **public-contract:** export public contract constant types ([#1066](https://github.com/Vonage/vivid-3/issues/1066)) ([5d30baa](https://github.com/Vonage/vivid-3/commit/5d30baa7e1403a02d01939b0d7a078e990e2433a))
* **select:** options width and selected-value ellipsis ([#1049](https://github.com/Vonage/vivid-3/issues/1049)) ([91c1148](https://github.com/Vonage/vivid-3/commit/91c11483a74ff60b17bfb7c880c41154d5ca9c79))
* **tabs:** style fixes ([#1072](https://github.com/Vonage/vivid-3/issues/1072)) ([d8d4660](https://github.com/Vonage/vivid-3/commit/d8d46609275127566ad7d0131920dd632e091d0d))

## [3.3.0](https://github.com/Vonage/vivid-3/compare/vivid-v3.2.0...vivid-v3.3.0) (2023-03-08)


### Features

* **select:** add label handling to option component ([#1047](https://github.com/Vonage/vivid-3/issues/1047)) ([560f7cd](https://github.com/Vonage/vivid-3/commit/560f7cd8e34d8d1685c0fa08ae4cc29690b0e8d6))


### Bug Fixes

* **components:** circular dependency in tree-item ([#1053](https://github.com/Vonage/vivid-3/issues/1053)) ([72984b9](https://github.com/Vonage/vivid-3/commit/72984b99b1f2cc727da222fee67d52490d9acb49))

## [3.2.0](https://github.com/Vonage/vivid-3/compare/vivid-v3.1.3...vivid-v3.2.0) (2023-02-19)


### Features

* **tree:** add component ([#987](https://github.com/Vonage/vivid-3/issues/987)) ([a840e43](https://github.com/Vonage/vivid-3/commit/a840e43c830f5eb55b1fbb808a84a5da1c565391))

## [3.1.3](https://github.com/Vonage/vivid-3/compare/vivid-v3.1.2...vivid-v3.1.3) (2023-02-16)


### Bug Fixes

* **documentation:** getting started ([#1007](https://github.com/Vonage/vivid-3/issues/1007)) ([8da7500](https://github.com/Vonage/vivid-3/commit/8da7500eb681ca6d85aaa206da2c77eb859ec435))

## [3.1.2](https://github.com/Vonage/vivid-3/compare/vivid-v3.1.1...vivid-v3.1.2) (2023-02-15)


### Bug Fixes

* **components:** add number field to public exports ([#1028](https://github.com/Vonage/vivid-3/issues/1028)) ([24c1f17](https://github.com/Vonage/vivid-3/commit/24c1f17675182a84b14a6785532524360f1da835))

## [3.1.1](https://github.com/Vonage/vivid-3/compare/vivid-v3.1.0...vivid-v3.1.1) (2023-02-09)


### Bug Fixes

* **dialog:** remove filter ([#1018](https://github.com/Vonage/vivid-3/issues/1018)) ([53bc8c2](https://github.com/Vonage/vivid-3/commit/53bc8c28383451e4745436ed12365378db3e8411))
* **text-field:** show outline in ios-16 ([#1013](https://github.com/Vonage/vivid-3/issues/1013)) ([cc2b662](https://github.com/Vonage/vivid-3/commit/cc2b66244cde86826f9f77e2864df655fd712491))

## [3.1.0](https://github.com/Vonage/vivid-3/compare/vivid-v3.0.1...vivid-v3.1.0) (2023-02-03)


### Features

* **data-grid:** port data grid component from fast ([#947](https://github.com/Vonage/vivid-3/issues/947)) ([c85c865](https://github.com/Vonage/vivid-3/commit/c85c865425612b920c9af2160c303606e21c2fd0))


### Bug Fixes

* **components:** remove popover polyfill ([#1004](https://github.com/Vonage/vivid-3/issues/1004)) ([337151c](https://github.com/Vonage/vivid-3/commit/337151c64fd48131a8e2d8a2055feea0b9fa53e8))

## 3.0.0 (2023-01-30)


### ⚠ BREAKING CHANGES

* **components:** fast-based accordion ([#930](https://github.com/Vonage/vivid-3/issues/930))

### Features

* **components:** fast-based accordion ([#930](https://github.com/Vonage/vivid-3/issues/930)) ([e228c60](https://github.com/Vonage/vivid-3/commit/e228c60bcb8982d06f0a7bac24dc3149cdd84574))

## 3.0.0-next.139

Thu, 26 Jan 2023 14:40:25 GMT

### Changes

- assign slotted to grid area (rachel.tannenbaum@vonage.com)

## 3.0.0-next.138

Tue, 24 Jan 2023 06:50:45 GMT

### Changes

- fix(dialog): max-inline-size variable and dialog scream color (rachel.tannenbaum@vonage.com)

## 3.0.0-next.137

Sun, 22 Jan 2023 12:09:10 GMT

### Changes

- progress ring stroke width (rachel.tannenbaum@vonage.com)

## 3.0.0-next.136

Tue, 17 Jan 2023 16:12:04 GMT

### Changes

- new component migration - select (rachel.tannenbaum@vonage.com)

## 3.0.0-next.135

Mon, 16 Jan 2023 13:29:19 GMT

### Changes

- tabs migration to fast (yinon@hotmail.com)
- menu item support secondary text (yinon@hotmail.com)

## 3.0.0-next.134

Thu, 12 Jan 2023 07:26:00 GMT

### Changes

- remove default connotation based icon (rachel.tannenbaum@vonage.com)

## 3.0.0-next.133

Wed, 11 Jan 2023 20:23:02 GMT

### Changes

- fix icon vertical alignment (rachel.tannenbaum@vonage.com)

## 3.0.0-next.132

Wed, 11 Jan 2023 06:39:43 GMT

### Changes

- dialog subtitle (rachel.tannenbaum@vonage.com)

## 3.0.0-next.131

Sun, 08 Jan 2023 11:03:35 GMT

### Changes

- change the member name to initials (rachel.tannenbaum@vonage.com)

## 3.0.0-next.130

Thu, 05 Jan 2023 11:32:29 GMT

### Changes

- feat(components): combobox new component (rina.oksman@vonage.com)

## 3.0.0-next.129

Mon, 02 Jan 2023 10:04:07 GMT

### Changes

- Montserrat as default font (rachel.tannenbaum@vonage.com)

## 3.0.0-next.128

Tue, 27 Dec 2022 16:08:19 GMT

### Changes

- refactor UI style to align with v2.x design spec (yinon@hotmail.com)

## 3.0.0-next.127

Tue, 27 Dec 2022 14:59:58 GMT

### Changes

- fix text-field & text area-ghost appearance missing shades (yinon@hotmail.com)

## 3.0.0-next.126

Tue, 27 Dec 2022 14:28:03 GMT

### Changes

- resolve components issues with custom density (yinon@hotmail.com)

## 3.0.0-next.125

Tue, 27 Dec 2022 14:15:03 GMT

### Changes

- style listbox disabled option inheritance (yinon.oved@vonage.com)

## 3.0.0-next.124

Sun, 25 Dec 2022 15:29:14 GMT

### Changes

- add light dismiss support to popup (rina.oksman@vonage.com)

## 3.0.0-next.123

Wed, 21 Dec 2022 15:15:42 GMT

### Changes

- Remove exports from package.json (yonatan.kra@vonage.com)

## 3.0.0-next.122

Sun, 18 Dec 2022 17:21:02 GMT

### Changes

- export header component from package (yinon.oved@vonage.com)

## 3.0.0-next.121

Fri, 16 Dec 2022 11:38:04 GMT

### Changes

- export component definition and design system (yinon.oved@vonage.com)

## 3.0.0-next.120

Wed, 14 Dec 2022 16:38:10 GMT

### Changes

- change prefix override interface (yinon@hotmail.com)

## 3.0.0-next.119

Wed, 14 Dec 2022 14:20:15 GMT

### Changes

- add absolute strategy (rina.oksman@vonage.com)

## 3.0.0-next.118

Tue, 13 Dec 2022 14:06:36 GMT

### Changes

- code style enforce string single quotes (yinon.oved@vonage.com)

## 3.0.0-next.117

Tue, 13 Dec 2022 13:34:41 GMT

### Changes

- replace hardcoded tags with contextual tags (olaf-k@users.noreply.github.com)

## 3.0.0-next.116

Mon, 12 Dec 2022 12:23:32 GMT

### Changes

- anchor can recieve  HTMLElement (rina.oksman@vonage.com)

## 3.0.0-next.115

Mon, 12 Dec 2022 11:29:26 GMT

### Changes

- dialog icon placement side option added (rachel.tannenbaum@vonage.com)

## 3.0.0-next.114

Thu, 08 Dec 2022 11:19:53 GMT

### Changes

- nameing avatar main slot (rachel.tannenbaum@vonage.com)

## 3.0.0-next.113

Thu, 08 Dec 2022 10:58:26 GMT

### Changes

- ensuring correct card text align (rachel.tannenbaum@vonage.com)

## 3.0.0-next.112

Thu, 08 Dec 2022 07:12:10 GMT

### Changes

- duotone appearance & warning connotation conditioned to an outline lighter shade (yinon@hotmail.com)

## 3.0.0-next.111

Mon, 05 Dec 2022 11:11:21 GMT

### Changes

- make button inline size fluid to its container (yinon@hotmail.com)

## 3.0.0-next.110

Sun, 04 Dec 2022 15:36:59 GMT

### Changes

- enable custom prefix for custom-elements (yinon@hotmail.com)

## 3.0.0-next.109

Sun, 04 Dec 2022 13:39:56 GMT

### Changes

- badge support overflow clipping (yinon@hotmail.com)

## 3.0.0-next.108

Tue, 29 Nov 2022 15:41:17 GMT

### Changes

- icon component support svg slot assignment (yinon@hotmail.com)

## 3.0.0-next.107

Mon, 28 Nov 2022 21:11:08 GMT

### Changes

- icon & progress-ring support full integer sizing spectrum (yinon@hotmail.com)
- icon type property renamed (to name) (yinon@hotmail.com)

## 3.0.0-next.106

Sun, 27 Nov 2022 16:54:42 GMT

### Changes

- map warning connotation to custom semantic variables (yinon@hotmail.com)

## 3.0.0-next.105

Sun, 27 Nov 2022 13:41:49 GMT

### Changes

- refactor tooltip (rina.oksman@vonage.com)

## 3.0.0-next.104

Tue, 22 Nov 2022 08:33:47 GMT

### Changes

- style gutters and gaps in list items (yinon@hotmail.com)

## 3.0.0-next.103

Mon, 21 Nov 2022 13:45:33 GMT

### Changes

- typography style unset root's font size to resolve to 16px (yinon@hotmail.com)
- calendar css style to enable dark-theme background (yinon@hotmail.com)

## 3.0.0-next.102

Sun, 20 Nov 2022 21:47:05 GMT

### Changes

- package generated customElements.json & TS meta (yinon@hotmail.com)

## 3.0.0-next.101

Wed, 16 Nov 2022 09:48:24 GMT

### Changes

- refine progress ring documentation code snippets (yinon@hotmail.com)

## 3.0.0-next.100

Tue, 15 Nov 2022 13:38:58 GMT

### Changes

- change density to size and extended to expanded (rachel.tannenbaum@vonage.com)

## 3.0.0-next.99

Tue, 15 Nov 2022 08:30:44 GMT

### Changes

- fix radio isInsideRadioGroup (olaf-k@users.noreply.github.com)

## 3.0.0-next.98

Mon, 14 Nov 2022 13:05:26 GMT

### Changes

- option class - align property with naming convetion (yinon@hotmail.com)

## 3.0.0-next.97

Thu, 10 Nov 2022 15:01:26 GMT

### Changes

- unify appearance to apply cross components (yinon@hotmail.com)

## 3.0.0-next.96

Wed, 09 Nov 2022 08:48:48 GMT

### Changes

- fix radio-group mouse focus (olaf-k@users.noreply.github.com)

## 3.0.0-next.95

Tue, 08 Nov 2022 19:42:09 GMT

### Changes

- Switch Component (yonatan.kra@vonage.com)

## 3.0.0-next.94

Tue, 08 Nov 2022 16:43:27 GMT

### Changes

- new slider component (olaf-k@users.noreply.github.com)

## 3.0.0-next.93

Mon, 07 Nov 2022 11:12:14 GMT

### Changes

- add new listbox component (rina.oksman@vonage.com)

## 3.0.0-next.92

Sun, 06 Nov 2022 10:45:46 GMT

### Changes

- implement a new design in note component (yinon@hotmail.com)

## 3.0.0-next.91

Thu, 03 Nov 2022 17:25:45 GMT

### Changes

- remove block padding from nav item (yinon@hotmail.com)

## 3.0.0-next.90

Thu, 03 Nov 2022 17:18:16 GMT

### Changes

- support components status indication (yinon@hotmail.com)

## 3.0.0-next.89

Thu, 03 Nov 2022 13:37:29 GMT

### Changes

- change banner's dismiss button to theme alternate to comply with contrast rules (yinon@hotmail.com)

## 3.0.0-next.88

Thu, 03 Nov 2022 12:07:37 GMT

### Changes

- omit desnity from text-field and number-field (rachel.tannenbaum@vonage.com)

## 3.0.0-next.87

Thu, 03 Nov 2022 08:51:02 GMT

### Changes

- fix READMEs (olaf-k@users.noreply.github.com)

## 3.0.0-next.86

Wed, 02 Nov 2022 14:09:27 GMT

### Changes

- replace components hardcoded block size length with scss variables generated by tokens (yinon@hotmail.com)

## 3.0.0-next.85

Wed, 02 Nov 2022 12:59:11 GMT

### Changes

- add selected & hover state to all selected states integrating components (yinon@hotmail.com)

## 3.0.0-next.84

Mon, 31 Oct 2022 12:51:28 GMT

### Changes

- add option component (rina.oksman@vonage.com)

## 3.0.0-next.83

Sat, 29 Oct 2022 09:45:57 GMT

### Changes

- Add radio button component (olaf-k@users.noreply.github.com)

## 3.0.0-next.82

Thu, 27 Oct 2022 06:36:37 GMT

### Changes

- refactor tokens to include public properties (yinon@hotmail.com)

## 3.0.0-next.81

Mon, 24 Oct 2022 13:21:28 GMT

### Changes

- Success Message for Form Elements (yonatan.kra@vonage.com)

## 3.0.0-next.80

Wed, 19 Oct 2022 08:48:12 GMT

### Changes

- new image for visual tests with Chromium (olaf-k@users.noreply.github.com)

## 3.0.0-next.79

Wed, 19 Oct 2022 05:40:47 GMT

### Changes

- avatar initials (rachel.tannenbaum@vonage.com)

## 3.0.0-next.78

Tue, 18 Oct 2022 13:56:39 GMT

### Changes

- improve components library usage documentation (yinon@hotmail.com)

## 3.0.0-next.77

Mon, 17 Oct 2022 07:21:57 GMT

### Changes

- prevent checkbox and radio shrinking (olaf-k@users.noreply.github.com)

## 3.0.0-next.76

Thu, 13 Oct 2022 10:40:38 GMT

### Changes

- Prevent events on disabled and readonly fields (yonatan.kra@vonage.com)

## 3.0.0-next.75

Thu, 13 Oct 2022 08:25:56 GMT

### Changes

- Add radio button component (olaf-k@users.noreply.github.com)

## 3.0.0-next.74

Wed, 12 Oct 2022 15:27:47 GMT

### Changes

- correct style of appearance select state (yinon@hotmail.com)

## 3.0.0-next.73

Wed, 12 Oct 2022 06:55:48 GMT

### Changes

- Add the number-field component (yonatan.kra@vonage.com)

## 3.0.0-next.72

Fri, 07 Oct 2022 08:59:54 GMT

### Changes

- add icon-only support for badge (yinon@hotmail.com)

## 3.0.0-next.71

Thu, 06 Oct 2022 14:03:22 GMT

### Changes

- remove role toolbar from header component part (yinon@hotmail.com)

## 3.0.0-next.70

Thu, 06 Oct 2022 13:50:21 GMT

### Changes

- stabilize anchored menu visual regresstion test (yinon@hotmail.com)

## 3.0.0-next.69

Sun, 02 Oct 2022 09:05:08 GMT

### Changes

- describe fonts as assets author responsibility (yinon@hotmail.com)

## 3.0.0-next.68

Sun, 02 Oct 2022 06:55:00 GMT

### Changes

- refine checkbox component style (yinon@hotmail.com)

## 3.0.0-next.67

Fri, 30 Sep 2022 16:34:19 GMT

### Changes

- checkbox size consistency (olaf-k@users.noreply.github.com)

## 3.0.0-next.66

Sun, 25 Sep 2022 05:00:21 GMT

### Changes

- menu migration to fast (yinon@hotmail.com)

## 3.0.0-next.65

Thu, 22 Sep 2022 09:22:38 GMT

### Changes

- add focus delegation to interactive elements (yinon@hotmail.com)

## 3.0.0-next.64

Wed, 21 Sep 2022 09:22:43 GMT

### Changes

- improve breadcrumb item focus indication style (yinon@hotmail.com)

## 3.0.0-next.63

Tue, 20 Sep 2022 01:19:01 GMT

### Changes

- update icon set to 4.0.30 (yinon@hotmail.com)

## 3.0.0-next.62

Sat, 17 Sep 2022 18:35:47 GMT

### Changes

- popup fire open & close events (yinon@hotmail.com)

## 3.0.0-next.61

Sat, 17 Sep 2022 18:16:46 GMT

### Changes

- revert accidental popup light dismiss merge (yinon@hotmail.com)

## 3.0.0-next.60

Thu, 15 Sep 2022 09:42:43 GMT

### Changes

- add dispatch events to side drawer (rina.oksman@vonage.com)

## 3.0.0-next.59

Thu, 15 Sep 2022 08:34:27 GMT

### Changes

- fix text area vertical padding (yinon@hotmail.com)

## 3.0.0-next.58

Sun, 11 Sep 2022 12:51:47 GMT

### Changes

- refactor styles to separate concerns from styles to tokens (yinon@hotmail.com)

## 3.0.0-next.57

Sat, 10 Sep 2022 18:25:22 GMT

### Changes

- define icon size in text field (yinon@hotmail.com)

## 3.0.0-next.56

Fri, 09 Sep 2022 16:43:16 GMT

### Changes

- deterministic layout size in action group doc (yinon@hotmail.com)

## 3.0.0-next.55

Fri, 09 Sep 2022 10:25:02 GMT

### Changes

- Add the text-area component (yonatan.kra@vonage.com)

## 3.0.0-next.54

Thu, 08 Sep 2022 11:03:56 GMT

### Changes

- modify typography styles for desktop (yinon@hotmail.com)

## 3.0.0-next.53

Wed, 07 Sep 2022 15:12:01 GMT

### Changes

- Prevent styles injection to the DOM (yonatan.kra@vonage.com)

## 3.0.0-next.52

Mon, 05 Sep 2022 17:51:29 GMT

### Changes

- bug fix for icon connotation and setup its ui-test (yinon@hotmail.com)

## 3.0.0-next.51

Thu, 01 Sep 2022 13:29:47 GMT

### Changes

- design tokens renamed (yinon@hotmail.com)

## 3.0.0-next.50

Fri, 26 Aug 2022 16:38:16 GMT

### Changes

- font assets coupled with their css (yinon@hotmail.com)

## 3.0.0-next.49

Fri, 26 Aug 2022 15:17:22 GMT

### Changes

- fix icon size in fab extended density (yinon@hotmail.com)

## 3.0.0-next.48

Tue, 23 Aug 2022 12:15:37 GMT

### Changes

- fix missing typography in components styles (yinon@hotmail.com)

## 3.0.0-next.47

Thu, 18 Aug 2022 07:38:07 GMT

### Changes

- text component obsoletion (yinon@hotmail.com)

## 3.0.0-next.46

Wed, 17 Aug 2022 20:28:05 GMT

### Changes

- menu migration to fast (yinon@hotmail.com)

## 3.0.0-next.45

Thu, 11 Aug 2022 09:45:13 GMT

### Changes

- rename sidenav to nav (yinon@hotmail.com)

## 3.0.0-next.44

Sun, 07 Aug 2022 06:26:56 GMT

### Changes

- fix progress ring density mapping (yinon@hotmail.com)

## 3.0.0-next.43

Wed, 03 Aug 2022 13:04:51 GMT

### Changes

- align progress ring default size to baseline (yinon@hotmail.com)

## 3.0.0-next.42

Tue, 02 Aug 2022 13:37:38 GMT

### Changes

- update popup and tooltip corner to placement (rina.oksman@vonage.com)

## 3.0.0-next.41

Thu, 28 Jul 2022 11:25:13 GMT

### Changes

- fix(layout): inline & block gutters (rachel.tannenbaum@vonage.com)

## 3.0.0-next.40

Mon, 25 Jul 2022 12:18:19 GMT

### Changes

- fix banner docs and slots (rina.oksman@vonage.com)

## 3.0.0-next.39

Sun, 24 Jul 2022 12:28:54 GMT

### Changes

- Added dialog content slot (yonatan.kra@vonage.com)

## 3.0.0-next.38

Fri, 22 Jul 2022 15:03:10 GMT

### Changes

- docs(components): point out a11y caveats with icon only actions (yinon@hotmail.com)

## 3.0.0-next.37

Thu, 21 Jul 2022 07:53:29 GMT

### Changes

- dialog sizes (rachel.tannenbaum@vonage.com)

## 3.0.0-next.36

Tue, 19 Jul 2022 10:25:25 GMT

### Changes

- update docs and change action-items slot (rina.oksman@vonage.com)

## 3.0.0-next.35

Tue, 19 Jul 2022 10:09:52 GMT

### Changes

- change position end to trailing (rina.oksman@vonage.com)

## 3.0.0-next.34

Tue, 19 Jul 2022 09:24:45 GMT

### Changes

- refactor(components): rename text hierarchy terminology (yinon@hotmail.com)

## 3.0.0-next.33

Sun, 17 Jul 2022 12:13:48 GMT

### Changes

- add nav disclosure component (rina.oksman@vonage.com)

## 3.0.0-next.32

Sun, 17 Jul 2022 10:27:51 GMT

### Changes

- Migrate dialog component to fast (yonatan.kra@vonage.com)

## 3.0.0-next.31

Sun, 17 Jul 2022 08:57:35 GMT

### Changes

- divider component (rachel.tannenbaum@vonage.com)

## 3.0.0-next.30

Mon, 11 Jul 2022 12:53:41 GMT

### Changes

- remove inert and blocking elements polyfills from side drawer as browsers support increased (yinon@hotmail.com)
- refactor(components): breadcrumb item disable focus delegation (yinon@hotmail.com)

## 3.0.0-next.29

Thu, 07 Jul 2022 09:15:29 GMT

### Changes

- changes to layout components (header & side drawer) to allow more freedom when integrated within unknown app scenarios (yinon@hotmail.com)

## 3.0.0-next.28

Wed, 06 Jul 2022 14:29:33 GMT

### Changes

- Change template to nav and add axe test (yonatan.kra@vonage.com)

## 3.0.0-next.27

Fri, 01 Jul 2022 20:53:00 GMT

### Changes

- refactor(components): outline removal condition (yinon@hotmail.com)

## 3.0.0-next.26

Fri, 01 Jul 2022 14:50:40 GMT

### Changes

- start validating only after a blur (yonatan.kra@vonage.com)
- fab support for default surface  (yinon@hotmail.com)

## 3.0.0-next.25

Sun, 26 Jun 2022 20:34:06 GMT

### Changes

- FAB support for extended size (yinon@hotmail.com)
- docs(components): action group popup usage example (yinon@hotmail.com)

## 3.0.0-next.24

Sun, 26 Jun 2022 08:53:00 GMT

### Changes

- fixes the size property and inline size css on text field (yinon@hotmail.com)
- chore(components): fix side drawer scrim z-index calc (yinon@hotmail.com)
- migrate checkbox to fast foundation (yinon@hotmail.com)
- chore(components): refactor card to block flow (yinon@hotmail.com)
- update code block rendering style in docs  (yinon@hotmail.com)
- action group tight member removes padding (yinon@hotmail.com)

## 3.0.0-next.21

Sun, 19 Jun 2022 14:36:21 GMT

### Changes

- improve visual regression tests performance by setting size to viewport (yinon@hotmail.com)
- omit elevation from docs, as is redundant considering card (yinon@hotmail.com)
- migrate calendar to vivid@next (yinon@hotmail.com)
- migrate calendar event to fast element (yinon@hotmail.com)
- display focus ring on keyboard focus only (yinon@hotmail.com)
- text field support autocomplete and name (yonatan.kra@vonage.com)
- rename primary to accent (yinon@hotmail.com)
- refactor FAB size to normal (40px) (yinon@hotmail.com)
- card - rename default slot to 'main' (rachel.tannenbaum@vonage.com)

## 3.0.0-next.19

Tue, 31 May 2022 17:06:10 GMT

### Changes

- export text field & action group from package (yinon@hotmail.com)
- card improved css flow display properties (yinon@hotmail.com)

## 3.0.0-next.18

Mon, 30 May 2022 12:41:42 GMT

### Changes

- package export text field (yinon@hotmail.com)

## 3.0.0-next.17

Mon, 30 May 2022 12:17:41 GMT

### Changes

- add text field component (yonatan.kra@vonage.com)

## 3.0.0-next.16

Sat, 28 May 2022 17:55:16 GMT

### Changes

- formatted documentation pages (yinon@hotmail.com)
- align components variable prefix (yinon@hotmail.com)
- Create the note component (yonatan.kra@vonage.com)
- popup inline-size changed to fit-content  (yinon@hotmail.com)

## 3.0.0-next.15

Tue, 17 May 2022 05:25:52 GMT

### Changes

- refactor(components): progress ring size API (yonatan.kra@vonage.com)

## 3.0.0-next.14

Sun, 15 May 2022 05:41:39 GMT

### Changes

- rename size (for block size members) to density due to its being a reserved name in input element (yinon@hotmail.com)

## 3.0.0-next.13

Wed, 11 May 2022 10:21:34 GMT

### Changes

- redefine size interface to distingish block and inline sizing (yinon@hotmail.com)

## 3.0.0-next.12

Mon, 09 May 2022 06:08:08 GMT

### Changes

- Add beachball config file (yonatan.kra@vonage.com)

## 3.0.0

Sun, 08 May 2022 13:14:22 GMT

### Minor changes

- add card component (rachel.tannenbaum@vonage.com)

## 3.0.0-next.12

Sun, 08 May 2022 09:32:52 GMT

### Changes

- attributes default assignments removed due to DOM mutations (yinon@hotmail.com)

## 3.0.0-next.11

Sun, 08 May 2022 08:45:31 GMT

### Changes

- Breadcrumb design updates (yonatan.kra@vonage.com)

## 3.0.0-next.10

Wed, 04 May 2022 19:25:42 GMT

### Changes

- remove styles from dependency list (yonatan.kra@vonage.com)

## 3.0.0-next.9

Wed, 04 May 2022 18:32:51 GMT

### Changes

- Target only on merge (yonatan.kra@vonage.com)

## 3.0.0-next.8

Wed, 04 May 2022 18:08:08 GMT

### Changes

- Update test and publish (yonatan.kra@vonage.com)

## 3.0.0-next.7

Tue, 03 May 2022 20:34:28 GMT

### Changes

- banner removable now works (yonatan.kra@vonage.com)
- add the banner component (yonatan.kra@vonage.com)
- fix(components): update color tokens & states (rachel.tannenbaum@vonage.com)
- change banner API (yonatan.kra@vonage.com)
- fix md (rina.oksman@vonage.com)
- add progress-ring component (yonatan.kra@vonage.com)
- remove hide and open (rina.oksman@vonage.com)
- migrate accordion (rina.oksman@vonage.com)
- remove hide and show (rina.oksman@vonage.com)
- elevation avoid default dp attribute mutating the dom (yinon@hotmail.com)
- add the progress component (yonatan.kra@vonage.com)
- Update icon size (yonatan.kra@vonage.com)

## 3.0.0

## 3.0.0-next.3

Fri, 18 Mar 2022 08:18:37 GMT

### Changes

- Add the breadcrumb component (yonatan.kra@vonage.com)
- add the breacdcrumbs item component (yonatan.kra@vonage.com)
- chore(text-anchor): feature underlying vivid anchor (yonatan.kra@vonage.com)
- new nav-item component. part of the nav component scope (yinon@hotmail.com)
- update test (rina.oksman@vonage.com)

## 3.0.0-next.2

Fri, 04 Mar 2022 07:18:22 GMT

### Changes

- Merge branch 'main' into refactor(elevation)_migrate_to_fast_element (rina.oksman@vonage.com)
