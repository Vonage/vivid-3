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

| Browser | Grading |
| ------ | ----- |
| Chrome, latest version (MacOS & Windows) | A |
| Edge, latest version (Windows) |	A |
| Firefox, latest version (MacOS & Windows) |	A |
| Safari (MacOS), latest version | A |
| All other browsers & versions |	C |

### Mobile

| Browser | Grading |
| ------ | ----- |
| Safari (iPhone), latest version |	A |
| Safari (iPad), latest version |	A |
| Chrome (Mobile), latest version |	A |
| Samsung Internet, latest version | B |
| All other browsers & versions |	C |

**Note:** 

Although we recommend to test and support only the latest browser version, it is recommended to check before using a new browser feature, that could be essential for the user experience, is supported by all our supported browsers.

For non-essential features, you can follow the principles of progressive enhancement and use features that are not yet supported by all browsers, in the knowledge that full support is on its way.