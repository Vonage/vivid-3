## Implementation

It's generally a good idea to include an `aria-label` attribute on elements that are important for a user to be able to interact with or understand its purpose.
You could use an aria-label attribute like "Profile avatar" or "User profile picture" to describe the purpose of the avatar. You should **always** use an aria-label attribute when rendering avatar as a link (using `href` attribute) or a button (using `clickable` attribute).

When using `icon` slot, always provide a `label` property. [Read more](/components/icon/accessibility/#informative-vs-decorative-icons) in the Icon component guidelines.

If your avatar is purely decorative and is not interactive, then you can use the `role="presentation"` attribute to indicate that the element is purely decorative, and should be ignored by assistive technologies such as screen readers.
