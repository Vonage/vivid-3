---
title: Browser Support
order: 2
---

# Browser Support

Users have access to hundreds of versions of browsers, so instead of assessing them all individually we've come up with a rating system which defines different levels of browser support and the testing requirements for each level.

We've assigned the highest ratings to the browsers that are most commonly used according to [usage stats](https://gs.statcounter.com/browser-market-share).

## Priority Definitions

**A = Fully support**

- Visual and functional testing is required
- All content must be available
- Layout must comply with the design, unless technical needs prevent this
- All functionality must be available and work as expected

**B = Partial support**

- Only functional testing is required
- All content must be available
- User should be able to carry out the main function of the page (eg. place an order, read an article)
- Layout / presentations does not have to match the design, but it should retain it's functionality

**C = No support**

- Testing is not required

## Browser Ratings

### Desktop

| Browser                                              | Grading |
| ---------------------------------------------------- | ------- |
| Chrome, latest / previous (MacOS & Windows)          | A       |
| Edge, latest / previous version (Windows)            | A       |
| Firefox, latest / previous version (MacOS & Windows) | A       |
| Safari (MacOS), latest / previous version            | A       |
| All other browsers & versions                        | C       |

### Mobile

| Browser                                    | Grading |
| ------------------------------------------ | ------- |
| Safari (iPhone), latest / previous version | A       |
| Safari (iPad), latest / previous version   | A       |
| Chrome (Mobile), latest / previous version | A       |
| Samsung Internet, latest version           | B       |
| All other browsers & versions              | C       |

## Notes

**Check support first**

Although we recommend to test and support only the latest and previous browser version, it is recommended to check (using [can I use](https://caniuse.com/)) before using a new browser feature, that could be essential for the user experience, is supported by all our supported browsers.

**Progressive enhancement**

For non-essential features, you can follow the principles of progressive enhancement and use features that are not yet supported by all browsers, in the knowledge that full support is on its way.

**Review frequency**

This policy will be reviewed at the start of each year to assess analytics data and emerging trends.
