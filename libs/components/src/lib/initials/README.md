# initials
This is in the docs only for now.  
Will be removed after development.


## Members
### Text

#### longer text
- If more than 2 words - only the 2 words initials will appear.

```html preview
<vwc-initials text="john doe vivid avatar"></vwc-initials>
```

#### one word
- Should present one letter if only one word (not working yet...)

```html preview
<vwc-initials text="avatar"></vwc-initials>
```

#### no text inserted
- if no text is added - no initials are set.  
- What about the title? Is it OK to leave it empty?
- 
```html preview
<vwc-initials text=""></vwc-initials>
```
#### dashed text
```html preview
<vwc-initials text="john-doe avatar"></vwc-initials>
```
